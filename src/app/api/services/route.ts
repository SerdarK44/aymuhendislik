import { NextResponse } from "next/server";
import { getServices, saveService, deleteService } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const services = getServices();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newService = {
      ...body,
      id: body.id || "srv-" + Date.now()
    };
    const saved = saveService(newService);
    return NextResponse.json({ success: true, service: saved });
  } catch (error) {
    return NextResponse.json({ error: "Hizmet kaydedilemedi" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID gereklidir" }, { status: 400 });
    deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Hizmet silinemedi" }, { status: 500 });
  }
}
