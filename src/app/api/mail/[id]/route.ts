import { NextResponse } from "next/server";
import { getMails, saveMail, deleteMail } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const mails = getMails();
  const mail = mails.find(m => m.id === id);

  if (!mail) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.isRead !== undefined) mail.isRead = body.isRead;
  saveMail(mail);
  return NextResponse.json(mail);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  deleteMail((await params).id);
  return NextResponse.json({ success: true });
}