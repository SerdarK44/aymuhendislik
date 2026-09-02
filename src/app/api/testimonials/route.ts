import { NextResponse } from "next/server";
import { getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getTestimonials());
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newTestimonial = {
      ...body,
      id: body.id || "tst-" + Date.now(),
      date: body.date || new Date().toISOString().split("T")[0]
    };
    const saved = saveTestimonial(newTestimonial);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (error) {
    return NextResponse.json({ error: "Yorum kaydedilemedi" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "ID zorunludur" }, { status: 400 });
    deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Silinemedi" }, { status: 500 });
  }
}
