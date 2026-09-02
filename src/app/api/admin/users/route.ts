import { NextResponse } from "next/server";
import { getUsers, createUser, updateUser, deleteUser, getUserById } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const users = getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  // Check if current user is admin
  const currentUser = getUserById(session.id);
  if (currentUser && currentUser.role !== "admin") {
    return NextResponse.json({ error: "Sadece Süper Yöneticiler yeni kullanıcı oluşturabilir." }, { status: 403 });
  }

  try {
    const { username, name, password, role } = await request.json();

    if (!username || !name || !password) {
      return NextResponse.json({ error: "Kullanıcı adı, isim ve şifre zorunludur." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır." }, { status: 400 });
    }

    const newUser = createUser({
      username,
      name,
      passwordPlain: password,
      role: role || "admin"
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });
  } catch (error: any) {
    console.error("Create user error:", error);
    if (error.message && error.message.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "Bu kullanıcı adı zaten kullanılıyor." }, { status: 400 });
    }
    return NextResponse.json({ error: "Kullanıcı oluşturulamadı." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const { id, username, name, role, newPassword } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Kullanıcı ID'si gereklidir." }, { status: 400 });
    }

    const currentUser = getUserById(session.id);
    // Editor can only update their own profile/password and cannot change their own role to admin
    if (currentUser?.role !== "admin" && session.id !== id) {
      return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 403 });
    }

    if (newPassword && newPassword.trim().length < 6) {
      return NextResponse.json({ error: "Yeni şifre en az 6 karakter olmalıdır." }, { status: 400 });
    }

    const updated = updateUser(id, {
      username,
      name,
      role: currentUser?.role === "admin" ? role : undefined,
      newPasswordPlain: newPassword
    });

    if (updated) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Kullanıcı güncellenemedi." }, { status: 400 });
    }
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Güncelleme sırasında hata oluştu." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const currentUser = getUserById(session.id);
  if (currentUser && currentUser.role !== "admin") {
    return NextResponse.json({ error: "Sadece Yöneticiler kullanıcı silebilir." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 });
    }

    if (id === session.id) {
      return NextResponse.json({ error: "Kendi aktif oturumunuzu silemezsiniz." }, { status: 400 });
    }

    const res = deleteUser(id);
    if (!res.success) {
      return NextResponse.json({ error: res.error || "Kullanıcı silinemedi." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Silinemedi." }, { status: 500 });
  }
}
