import { NextResponse } from "next/server";
import { getMails, saveMail } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import crypto from "crypto";

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  return NextResponse.json(getMails().sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const mail = {
    id: crypto.randomUUID(),
    sender: "Ay Mühendislik",
    senderEmail: "info@aymuhendislik.com.tr",
    subject: body.subject,
    body: body.body,
    date: new Date().toISOString(),
    isRead: true,
    folder: "sent" as const,
    attachments: body.attachments || []
  };

  saveMail(mail);
  return NextResponse.json(mail);
}