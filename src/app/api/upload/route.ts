import { NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";
import fs from "fs";
import path from "path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"]);
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    // Size limit check
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Dosya boyutu 10MB'dan büyük olamaz." }, { status: 400 });
    }

    // Extension check
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: "Sadece resim formatları (.jpg, .png, .webp, .svg, .gif) yüklenebilir." }, { status: 400 });
    }

    // MIME type check
    if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Geçersiz dosya türü tespit edildi." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // SVG XSS check
    if (ext === ".svg") {
      const svgText = buffer.toString("utf-8");
      if (/<script|javascript:|on\w+\s*=/i.test(svgText)) {
        return NextResponse.json({ error: "Güvenlik uyarısı: SVG dosyası zararlı komut dosyası içeremez." }, { status: 400 });
      }
    }

    const sanitizedBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50);
    const filename = `upload-${Date.now()}-${sanitizedBase}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Yükleme başarısız oldu" }, { status: 500 });
  }
}
