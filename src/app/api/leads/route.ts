import { NextResponse } from "next/server";
import { getLeads, createLead, updateLeadStatus, deleteLead } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

// Basic in-memory rate limiting for lead submission
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 10;
const ipRequests = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRecord = ipRequests.get(ip);

  if (!userRecord) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - userRecord.timestamp > RATE_LIMIT_WINDOW) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (userRecord.count >= MAX_REQUESTS) {
    return true;
  }

  userRecord.count += 1;
  return false;
}

function sanitizeText(input?: string): string {
  if (!input) return "";
  return String(input)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  const leads = getLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const rawName = sanitizeText(body.name);
    const rawPhone = sanitizeText(body.phone);
    const rawEmail = sanitizeText(body.email);
    const rawServiceType = sanitizeText(body.serviceType);
    const rawBuildingType = sanitizeText(body.buildingType);
    const rawSquareMeters = sanitizeText(body.squareMeters);
    const rawMessage = sanitizeText(body.message);

    if (!rawName || !rawPhone || !rawServiceType) {
      return NextResponse.json({ error: "İsim, telefon ve hizmet türü zorunludur." }, { status: 400 });
    }

    const lead = createLead({
      name: rawName.slice(0, 100),
      phone: rawPhone.slice(0, 30),
      email: rawEmail.slice(0, 100),
      serviceType: rawServiceType.slice(0, 100),
      buildingType: rawBuildingType.slice(0, 100),
      squareMeters: rawSquareMeters.slice(0, 30),
      message: rawMessage.slice(0, 2000)
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Teklif iletilemedi" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID ve durum zorunludur" }, { status: 400 });
    }
    const success = updateLeadStatus(id, status);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Durum güncellenemedi" }, { status: 500 });
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
    deleteLead(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Silinemedi" }, { status: 500 });
  }
}
