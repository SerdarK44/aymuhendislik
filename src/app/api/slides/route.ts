import { NextResponse } from "next/server";
import { getSliders, saveSlider, deleteSlider } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const slides = getSliders();
  return NextResponse.json(slides);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newSlide = {
      ...body,
      id: body.id || "slide-" + Date.now(),
      order: Number(body.order) || 1
    };
    const saved = saveSlider(newSlide);
    return NextResponse.json({ success: true, slide: saved });
  } catch (error) {
    return NextResponse.json({ error: "Slayt kaydedilemedi" }, { status: 500 });
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
    deleteSlider(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Slayt silinemedi" }, { status: 500 });
  }
}
