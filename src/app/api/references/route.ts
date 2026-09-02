import { NextResponse } from "next/server";
import { getReferences, saveReference, deleteReference } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const references = getReferences();
  return NextResponse.json(references);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newRef = {
      ...body,
      id: body.id || "ref-" + Date.now(),
      order: Number(body.order) || 1
    };
    const saved = saveReference(newRef);
    return NextResponse.json({ success: true, reference: saved });
  } catch (error) {
    return NextResponse.json({ error: "Referans kaydedilemedi" }, { status: 500 });
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
    deleteReference(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Referans silinemedi" }, { status: 500 });
  }
}
