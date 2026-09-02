import { NextResponse } from "next/server";
import { getMedia, saveMedia, deleteMedia } from "@/lib/db";
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

export async function GET() {
  const media = getMedia();
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    // Multipart form upload with file
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const customTitle = (formData.get("title") as string) || "";
      const folder = (formData.get("folder") as string) || "genel";

      if (!file) {
        return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
      }

      // Size check
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
      const filename = `media-${Date.now()}-${sanitizedBase}${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);

      const url = `/uploads/${filename}`;
      const formattedSize = `${(file.size / 1024).toFixed(1)} KB`;

      const newMedia = {
        id: "med-" + Date.now(),
        title: (customTitle || file.name.replace(/\.[^/.]+$/, "")).slice(0, 100),
        url,
        filename: file.name.slice(0, 100),
        folder: (folder || "genel").slice(0, 30),
        size: formattedSize,
        mimeType: file.type || "image/jpeg",
        createdAt: new Date().toISOString().split("T")[0],
      };

      const saved = saveMedia(newMedia);
      return NextResponse.json({ success: true, media: saved });
    } else {
      // JSON body (e.g. updating title/folder or registering existing image)
      const body = await request.json();
      const newMedia = {
        ...body,
        id: body.id || "med-" + Date.now(),
        title: String(body.title || "").slice(0, 100),
        folder: String(body.folder || "genel").slice(0, 30),
        createdAt: body.createdAt || new Date().toISOString().split("T")[0],
      };
      const saved = saveMedia(newMedia);
      return NextResponse.json({ success: true, media: saved });
    }
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: "Görsel kaydedilemedi" }, { status: 500 });
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

    deleteMedia(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Görsel silinemedi" }, { status: 500 });
  }
}
