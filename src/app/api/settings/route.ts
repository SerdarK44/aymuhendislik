import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const updated = updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: "Ayarlar güncellenemedi" }, { status: 500 });
  }
}
