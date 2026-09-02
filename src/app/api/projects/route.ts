import { NextResponse } from "next/server";
import { getProjects, saveProject, deleteProject } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newProject = {
      ...body,
      id: body.id || "prj-" + Date.now()
    };
    const saved = saveProject(newProject);
    return NextResponse.json({ success: true, project: saved });
  } catch (error) {
    return NextResponse.json({ error: "Proje kaydedilemedi" }, { status: 500 });
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
    deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Proje silinemedi" }, { status: 500 });
  }
}
