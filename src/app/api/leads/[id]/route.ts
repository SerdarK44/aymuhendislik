import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getSessionAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const leads = getLeads();
  const lead = leads.find(l => l.id === id);

  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.status) lead.status = body.status;
  if (body.isRead !== undefined) lead.isRead = body.isRead;

  saveLead(lead);
  return NextResponse.json(lead);
}