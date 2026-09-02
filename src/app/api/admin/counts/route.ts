import { NextResponse } from "next/server";
import { getLeads, getMails } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const leads = getLeads();
  const unreadLeads = leads.filter(l => l.status === 'new' && !l.isRead).length;
  
  const mails = getMails();
  const unreadMails = mails.filter(m => m.folder === 'inbox' && !m.isRead).length;

  return NextResponse.json({ talepler: unreadLeads, mail: unreadMails });
}