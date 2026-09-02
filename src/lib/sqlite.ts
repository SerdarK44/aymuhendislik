import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import { 
  SiteSettings, ServiceItem, ProjectItem, BlogPost, 
  LeadItem, TestimonialItem, SliderItem, ReferenceItem, 
  MediaItem, MailItem, AdminUser 
} from "./types";

const DB_DIR = path.join(process.cwd(), "data");
const SQLITE_FILE = path.join(DB_DIR, "aymuhendislik.sqlite");
const JSON_BACKUP = path.join(DB_DIR, "db.json");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let dbInstance: Database.Database | null = null;

export function getSqliteDb(): Database.Database {
  if (dbInstance) return dbInstance;

  dbInstance = new Database(SQLITE_FILE);
  // Enable WAL mode for high performance and concurrency
  dbInstance.pragma("journal_mode = WAL");

  initTables(dbInstance);
  seedIfEmpty(dbInstance);
  ensureDefaultMedia(dbInstance);

  return dbInstance;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      data_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_desc TEXT,
      description TEXT,
      icon TEXT,
      image TEXT,
      features_json TEXT,
      is_featured INTEGER DEFAULT 0,
      service_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT,
      location TEXT,
      completion_date TEXT,
      description TEXT,
      client TEXT,
      image TEXT,
      is_featured INTEGER DEFAULT 0,
      project_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      publish_date TEXT,
      read_time TEXT,
      cover_image TEXT,
      tags_json TEXT,
      is_published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service_type TEXT,
      building_type TEXT,
      square_meters TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT NOT NULL,
      is_read INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      company_or_building TEXT,
      rating INTEGER DEFAULT 5,
      comment TEXT NOT NULL,
      project_type TEXT,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS sliders (
      id TEXT PRIMARY KEY,
      image TEXT NOT NULL,
      label TEXT,
      headline TEXT NOT NULL,
      sub TEXT,
      slide_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS references_table (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT NOT NULL,
      ref_order INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      filename TEXT NOT NULL,
      folder TEXT DEFAULT 'genel',
      size TEXT,
      mime_type TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS mails (
      id TEXT PRIMARY KEY,
      sender TEXT NOT NULL,
      sender_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      date TEXT NOT NULL,
      is_read INTEGER DEFAULT 1,
      folder TEXT DEFAULT 'sent',
      attachments_json TEXT
    );
  `);
}

function ensureDefaultMedia(db: Database.Database) {
  const mediaCount = db.prepare("SELECT COUNT(*) as count FROM media").get() as { count: number };
  
  if (mediaCount.count === 0) {
    const defaultMedia: MediaItem[] = [
      {
        id: "med-1",
        title: "Endüstriyel Doğalgaz & RMS İstasyonu",
        url: "/images/1.png",
        filename: "1.png",
        folder: "slider",
        size: "340 KB",
        mimeType: "image/png",
        createdAt: "2026-08-20"
      },
      {
        id: "med-2",
        title: "Yetkili CAD Doğalgaz Proje Çizimi",
        url: "/images/2.png",
        filename: "2.png",
        folder: "slider",
        size: "420 KB",
        mimeType: "image/png",
        createdAt: "2026-08-20"
      },
      {
        id: "med-3",
        title: "Merkezi Kaskad Kazan Dairesi",
        url: "/images/3jpg.jpg",
        filename: "3jpg.jpg",
        folder: "hizmet",
        size: "280 KB",
        mimeType: "image/jpeg",
        createdAt: "2026-08-20"
      },
      {
        id: "med-4",
        title: "Bireysel Kombi ve Daire Tesisatı",
        url: "/images/4.jpg",
        filename: "4.jpg",
        folder: "slider",
        size: "310 KB",
        mimeType: "image/jpeg",
        createdAt: "2026-08-20"
      },
      {
        id: "med-5",
        title: "Radyant Fabrika & Kafe Isıtma",
        url: "/images/5.jpg",
        filename: "5.jpg",
        folder: "hizmet",
        size: "295 KB",
        mimeType: "image/jpeg",
        createdAt: "2026-08-20"
      },
      {
        id: "med-6",
        title: "Ay Mühendislik Kurumsal Logo (Tam)",
        url: "/logo/logo_tam.png",
        filename: "logo_tam.png",
        folder: "logo",
        size: "120 KB",
        mimeType: "image/png",
        createdAt: "2026-08-20"
      },
      {
        id: "med-7",
        title: "Ay Mühendislik İkon Logo",
        url: "/logo/logo_tek.png",
        filename: "logo_tek.png",
        folder: "logo",
        size: "85 KB",
        mimeType: "image/png",
        createdAt: "2026-08-20"
      },
      {
        id: "med-8",
        title: "Ağaoğlu İnşaat Referans Logo",
        url: "/images/referanslar/agaoglu_logo.svg",
        filename: "agaoglu_logo.svg",
        folder: "referans",
        size: "15 KB",
        mimeType: "image/svg+xml",
        createdAt: "2026-08-20"
      },
      {
        id: "med-9",
        title: "İGDAŞ Yetkili Firma Logo",
        url: "/images/referanslar/d.png",
        filename: "d.png",
        folder: "referans",
        size: "45 KB",
        mimeType: "image/png",
        createdAt: "2026-08-20"
      },
      {
        id: "med-10",
        title: "RAMS Global Referans Logo",
        url: "/images/referanslar/fsd.jpg",
        filename: "fsd.jpg",
        folder: "referans",
        size: "52 KB",
        mimeType: "image/jpeg",
        createdAt: "2026-08-20"
      },
      {
        id: "med-11",
        title: "Torunlar GYO Referans Logo",
        url: "/images/referanslar/images.jpg",
        filename: "images.jpg",
        folder: "referans",
        size: "48 KB",
        mimeType: "image/jpeg",
        createdAt: "2026-08-20"
      },
      {
        id: "med-12",
        title: "Nef İnşaat Referans Logo",
        url: "/images/referanslar/nef.png",
        filename: "nef.png",
        folder: "referans",
        size: "50 KB",
        mimeType: "image/png",
        createdAt: "2026-08-20"
      }
    ];

    const insertMed = db.prepare(`
      INSERT OR REPLACE INTO media (id, title, url, filename, folder, size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    defaultMedia.forEach((m) => {
      insertMed.run(m.id, m.title, m.url, m.filename, m.folder, m.size, m.mimeType, m.createdAt);
    });
  }

  // Also auto-index any uploaded files in public/uploads if not in table
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    const checkStmt = db.prepare("SELECT id FROM media WHERE filename = ? OR url = ?");
    const insertStmt = db.prepare(`
      INSERT INTO media (id, title, url, filename, folder, size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const f of files) {
      const fileUrl = `/uploads/${f}`;
      const existing = checkStmt.get(f, fileUrl);
      if (!existing) {
        const filePath = path.join(uploadsDir, f);
        const stats = fs.statSync(filePath);
        const ext = path.extname(f).toLowerCase();
        let mime = "image/jpeg";
        if (ext === ".png") mime = "image/png";
        else if (ext === ".webp") mime = "image/webp";
        else if (ext === ".svg") mime = "image/svg+xml";
        else if (ext === ".gif") mime = "image/gif";

        insertStmt.run(
          "med-up-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
          f.replace(/\.[^/.]+$/, ""),
          fileUrl,
          f,
          "genel",
          `${(stats.size / 1024).toFixed(1)} KB`,
          mime,
          new Date(stats.mtime).toISOString().split("T")[0]
        );
      }
    }
  }
}

function seedIfEmpty(db: Database.Database) {
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (userCount.count > 0) return; // Already initialized

  let seedData: any = null;
  if (fs.existsSync(JSON_BACKUP)) {
    try {
      const content = fs.readFileSync(JSON_BACKUP, "utf-8");
      seedData = JSON.parse(content);
    } catch (e) {
      console.error("Could not parse json backup during seeding", e);
    }
  }

  // 1. Seed Users
  const defaultHash = bcrypt.hashSync("admin123", 10);
  const adminUser = seedData?.adminUser || {
    id: "admin-1",
    username: "admin",
    name: "Ay Mühendislik Yönetici",
    passwordHash: defaultHash,
    role: "admin",
    createdAt: new Date().toISOString().split("T")[0]
  };

  db.prepare(`
    INSERT OR REPLACE INTO users (id, username, name, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    adminUser.id || "admin-1",
    adminUser.username || "admin",
    adminUser.name || "Ay Mühendislik Yönetici",
    adminUser.passwordHash || defaultHash,
    adminUser.role || "admin",
    adminUser.createdAt || new Date().toISOString().split("T")[0]
  );

  // 2. Seed Settings
  if (seedData?.settings) {
    db.prepare("INSERT OR REPLACE INTO settings (id, data_json) VALUES ('main', ?)").run(
      JSON.stringify(seedData.settings)
    );
  }

  // 3. Seed Services
  if (seedData?.services && Array.isArray(seedData.services)) {
    const insertSrv = db.prepare(`
      INSERT OR REPLACE INTO services (id, slug, title, short_desc, description, icon, image, features_json, is_featured, service_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.services.forEach((s: ServiceItem, idx: number) => {
      insertSrv.run(
        s.id, s.slug, s.title, s.shortDesc || "", s.description || "",
        s.icon || "Wrench", s.image || "/images/1.png",
        JSON.stringify(s.features || []),
        s.isFeatured ? 1 : 0,
        s.order || idx + 1
      );
    });
  }

  // 4. Seed Projects
  if (seedData?.projects && Array.isArray(seedData.projects)) {
    const insertPrj = db.prepare(`
      INSERT OR REPLACE INTO projects (id, slug, title, category, location, completion_date, description, client, image, is_featured, project_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.projects.forEach((p: ProjectItem, idx: number) => {
      insertPrj.run(
        p.id, p.slug, p.title, p.category || "", p.location || "",
        p.completionDate || "", p.description || "", p.client || "",
        p.image || "/images/1.png", p.isFeatured ? 1 : 0, p.order || idx + 1
      );
    });
  }

  // 5. Seed Blog Posts
  if (seedData?.blogPosts && Array.isArray(seedData.blogPosts)) {
    const insertBlog = db.prepare(`
      INSERT OR REPLACE INTO blog_posts (id, slug, title, excerpt, content, author, publish_date, read_time, cover_image, tags_json, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.blogPosts.forEach((b: BlogPost) => {
      insertBlog.run(
        b.id, b.slug, b.title, b.excerpt || "", b.content || "",
        b.author || "Müh. Serdar Ay", b.publishDate || "", b.readTime || "5 dk okuma",
        b.coverImage || "/images/2.png", JSON.stringify(b.tags || []),
        b.isPublished ? 1 : 0
      );
    });
  }

  // 6. Seed Leads
  if (seedData?.leads && Array.isArray(seedData.leads)) {
    const insertLead = db.prepare(`
      INSERT OR REPLACE INTO leads (id, name, phone, email, service_type, building_type, square_meters, message, status, created_at, is_read)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.leads.forEach((l: LeadItem) => {
      insertLead.run(
        l.id, l.name, l.phone, l.email || "", l.serviceType || "",
        l.buildingType || "", l.squareMeters || "", l.message || "",
        l.status || "new", l.createdAt || new Date().toISOString(),
        l.isRead ? 1 : 0
      );
    });
  }

  // 7. Seed Testimonials
  if (seedData?.testimonials && Array.isArray(seedData.testimonials)) {
    const insertTst = db.prepare(`
      INSERT OR REPLACE INTO testimonials (id, client_name, company_or_building, rating, comment, project_type, date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.testimonials.forEach((t: TestimonialItem) => {
      insertTst.run(
        t.id, t.clientName, t.companyOrBuilding || "", t.rating || 5,
        t.comment, t.projectType || "", t.date || ""
      );
    });
  }

  // 8. Seed Sliders
  if (seedData?.sliders && Array.isArray(seedData.sliders)) {
    const insertSlide = db.prepare(`
      INSERT OR REPLACE INTO sliders (id, image, label, headline, sub, slide_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    seedData.sliders.forEach((s: SliderItem, idx: number) => {
      insertSlide.run(
        s.id, s.image, s.label || "", s.headline, s.sub || "", s.order || idx + 1
      );
    });
  }

  // 9. Seed References
  if (seedData?.references && Array.isArray(seedData.references)) {
    const insertRef = db.prepare(`
      INSERT OR REPLACE INTO references_table (id, name, logo, ref_order)
      VALUES (?, ?, ?, ?)
    `);
    seedData.references.forEach((r: ReferenceItem, idx: number) => {
      insertRef.run(r.id, r.name, r.logo, r.order || idx + 1);
    });
  }

  // 10. Seed Media
  if (seedData?.media && Array.isArray(seedData.media)) {
    const insertMed = db.prepare(`
      INSERT OR REPLACE INTO media (id, title, url, filename, folder, size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.media.forEach((m: MediaItem) => {
      insertMed.run(
        m.id, m.title, m.url, m.filename, m.folder || "genel",
        m.size || "", m.mimeType || "", m.createdAt || ""
      );
    });
  }

  // 11. Seed Mails
  if (seedData?.mails && Array.isArray(seedData.mails)) {
    const insertMail = db.prepare(`
      INSERT OR REPLACE INTO mails (id, sender, sender_email, subject, body, date, is_read, folder, attachments_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedData.mails.forEach((m: MailItem) => {
      insertMail.run(
        m.id, m.sender, m.senderEmail, m.subject, m.body,
        m.date, m.isRead ? 1 : 0, m.folder, JSON.stringify(m.attachments || [])
      );
    });
  }
}
