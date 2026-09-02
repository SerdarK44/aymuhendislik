import { NextResponse } from "next/server";
import { updateLeadStatus, deleteLead } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  
  const success = updateLeadStatus(id, body.status, body.isRead);
  if (!success) return NextResponse.json({ error: "Talep bulunamadı" }, { status: 404 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const success = deleteLead(id);
  if (!success) return NextResponse.json({ error: "Talep bulunamadı veya silinemedi" }, { status: 404 });

  return NextResponse.json({ success: true });
}