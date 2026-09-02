import { NextResponse } from "next/server";
import { getAllBlogPostsAdmin, saveBlogPost, deleteBlogPost } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const posts = getAllBlogPostsAdmin();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newPost = {
      ...body,
      id: body.id || "blg-" + Date.now(),
      publishDate: body.publishDate || new Date().toISOString().split("T")[0]
    };
    const saved = saveBlogPost(newPost);
    return NextResponse.json({ success: true, post: saved });
  } catch (error) {
    return NextResponse.json({ error: "Yazı kaydedilemedi" }, { status: 500 });
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
    deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Yazı silinemedi" }, { status: 500 });
  }
}
