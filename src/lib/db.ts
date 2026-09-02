import bcrypt from "bcryptjs";
import { getSqliteDb } from "./sqlite";
import { 
  SiteSettings, ServiceItem, ProjectItem, BlogPost, 
  LeadItem, TestimonialItem, SliderItem, ReferenceItem, 
  MediaItem, MailItem, AdminUser 
} from "./types";

// ==========================================
// 1. SETTINGS
// ==========================================
export function getSettings(): SiteSettings {
  const db = getSqliteDb();
  const row = db.prepare("SELECT data_json FROM settings WHERE id = 'main'").get() as { data_json: string } | undefined;
  if (!row) {
    return {
      companyName: "Ay Mühendislik",
      slogan: "Endüstriyel & Bireysel Doğalgaz Mühendislik Çözümleri",
      heroBadge: "EPDK & Gaz Dağıtım Yetkili Mühendislik Firması",
      heroTitle: "Güvenli Enerji, Kusursuz Doğalgaz Mühendisliği",
      heroSubtitle: "Tüm Türkiye genelinde endüstriyel tesisler, OSB fabrikaları, toplu konutlar ve ticari yapılar için onaylı projelendirme, taahhüt ve anahtar teslim doğalgaz tesisat hizmetleri.",
      phone: "0 (216) 456 78 90",
      emergencyPhone: "0 (532) 999 88 77",
      whatsapp: "905329998877",
      email: "info@aymuhendislik.com.tr",
      address: "Tekstilkent Ticaret Merkezi G1 Blok No: 9 Esenler / İstanbul",
      city: "İstanbul (Tüm Türkiye)",
      workingHours: "Pzt - Cmt: 08:30 - 19:00 (7/24 Acil Müdahale Hattı Aktif)",
      licenseNo: "EPDK-MÜH-2024-8842 / İGDAŞ YETKİ NO: 34-10492",
      aboutShort: "Ay Mühendislik; 16 yılı aşkın tecrübesi, yetkili uzman makine mühendisleri ve mobil teknik kadrosuyla İstanbul Tekstilkent merkezli olarak Tüm Türkiye genelinde büyük sanayi tesislerinden konutlara kadar her ölçekte anahtar teslim doğalgaz mühendisliği sunar.",
      aboutFull: "Ay Mühendislik olarak kurulduğumuz günden bu yana doğalgazın güvenli, verimli ve yasal standartlara %100 uygun şekilde kullanılmasını sağlıyoruz. Merkezimiz İstanbul Esenler Tekstilkent'te bulunmakta olup Türkiye'nin 81 ilinde en prestijli sanayi kuruluşlarına, fabrikalarına, organize sanayi bölgelerine (OSB) ve binlerce konut/ticari yapıya mühendislik taahhüt hizmeti verdik. Tüm süreçlerimizde EPDK, TSE ve yerel gaz dağıtım şirketlerinin en katı güvenlik standartlarına uygun çalışıyoruz. Büyük endüstriyel fabrika dönüşümlerinden bireysel projelere kadar anahtar teslim hizmet sunuyoruz.",
      yearsExperience: 16,
      completedProjects: 1450,
      happyClients: 3200,
      certifiedStaff: 24,
      googleMapsUrl: "https://maps.app.goo.gl/bpbn5Dzx6ezDK5mD9",
      facebookUrl: "https://facebook.com/aymuhendislik",
      instagramUrl: "https://instagram.com/aymuhendislik",
      linkedinUrl: "https://linkedin.com/company/aymuhendislik"
    };
  }
  return JSON.parse(row.data_json);
}

export function updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const db = getSqliteDb();
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  db.prepare("INSERT OR REPLACE INTO settings (id, data_json) VALUES ('main', ?)").run(
    JSON.stringify(updated)
  );
  return updated;
}

// ==========================================
// 2. SLIDERS
// ==========================================
export function getSliders(): SliderItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM sliders ORDER BY slide_order ASC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    image: r.image,
    label: r.label,
    headline: r.headline,
    sub: r.sub,
    order: r.slide_order
  }));
}

export function saveSlider(slide: SliderItem): SliderItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO sliders (id, image, label, headline, sub, slide_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    slide.id, slide.image, slide.label || "", slide.headline, slide.sub || "", slide.order || 1
  );
  return slide;
}

export function deleteSlider(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM sliders WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 3. REFERENCES
// ==========================================
export function getReferences(): ReferenceItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM references_table ORDER BY ref_order ASC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    logo: r.logo,
    order: r.ref_order
  }));
}

export function saveReference(ref: ReferenceItem): ReferenceItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO references_table (id, name, logo, ref_order)
    VALUES (?, ?, ?, ?)
  `).run(
    ref.id, ref.name, ref.logo, ref.order || 1
  );
  return ref;
}

export function deleteReference(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM references_table WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 4. MEDIA
// ==========================================
export function getMedia(): MediaItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM media ORDER BY created_at DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    url: r.url,
    filename: r.filename,
    folder: r.folder,
    size: r.size,
    mimeType: r.mime_type,
    createdAt: r.created_at
  }));
}

export function saveMedia(item: MediaItem): MediaItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO media (id, title, url, filename, folder, size, mime_type, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    item.id, item.title, item.url, item.filename, item.folder || "genel",
    item.size || "", item.mimeType || "", item.createdAt || new Date().toISOString().split("T")[0]
  );
  return item;
}

export function deleteMedia(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM media WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 5. SERVICES
// ==========================================
export function getServices(): ServiceItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM services ORDER BY service_order ASC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    shortDesc: r.short_desc,
    description: r.description,
    icon: r.icon,
    image: r.image,
    features: JSON.parse(r.features_json || "[]"),
    isFeatured: r.is_featured === 1,
    order: r.service_order
  }));
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const db = getSqliteDb();
  const r = db.prepare("SELECT * FROM services WHERE slug = ?").get(slug) as any;
  if (!r) return undefined;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    shortDesc: r.short_desc,
    description: r.description,
    icon: r.icon,
    image: r.image,
    features: JSON.parse(r.features_json || "[]"),
    isFeatured: r.is_featured === 1,
    order: r.service_order
  };
}

export function saveService(service: ServiceItem): ServiceItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO services (id, slug, title, short_desc, description, icon, image, features_json, is_featured, service_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    service.id, service.slug, service.title, service.shortDesc || "", service.description || "",
    service.icon || "Wrench", service.image || "/images/1.png",
    JSON.stringify(service.features || []),
    service.isFeatured ? 1 : 0,
    service.order || 1
  );
  return service;
}

export function deleteService(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM services WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 6. PROJECTS
// ==========================================
export function getProjects(): ProjectItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM projects ORDER BY project_order ASC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    location: r.location,
    completionDate: r.completion_date,
    description: r.description,
    client: r.client,
    image: r.image,
    isFeatured: r.is_featured === 1,
    order: r.project_order
  }));
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const db = getSqliteDb();
  const r = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug) as any;
  if (!r) return undefined;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    location: r.location,
    completionDate: r.completion_date,
    description: r.description,
    client: r.client,
    image: r.image,
    isFeatured: r.is_featured === 1,
    order: r.project_order
  };
}

export function saveProject(project: ProjectItem): ProjectItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO projects (id, slug, title, category, location, completion_date, description, client, image, is_featured, project_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    project.id, project.slug, project.title, project.category || "", project.location || "",
    project.completionDate || "", project.description || "", project.client || "",
    project.image || "/images/1.png", project.isFeatured ? 1 : 0, project.order || 1
  );
  return project;
}

export function deleteProject(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 7. BLOG POSTS
// ==========================================
export function getBlogPosts(): BlogPost[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY publish_date DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    author: r.author,
    publishDate: r.publish_date,
    readTime: r.read_time,
    coverImage: r.cover_image,
    tags: JSON.parse(r.tags_json || "[]"),
    isPublished: r.is_published === 1
  }));
}

export function getAllBlogPostsAdmin(): BlogPost[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM blog_posts ORDER BY publish_date DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    author: r.author,
    publishDate: r.publish_date,
    readTime: r.read_time,
    coverImage: r.cover_image,
    tags: JSON.parse(r.tags_json || "[]"),
    isPublished: r.is_published === 1
  }));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const db = getSqliteDb();
  const r = db.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(slug) as any;
  if (!r) return undefined;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    author: r.author,
    publishDate: r.publish_date,
    readTime: r.read_time,
    coverImage: r.cover_image,
    tags: JSON.parse(r.tags_json || "[]"),
    isPublished: r.is_published === 1
  };
}

export function saveBlogPost(post: BlogPost): BlogPost {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO blog_posts (id, slug, title, excerpt, content, author, publish_date, read_time, cover_image, tags_json, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    post.id, post.slug, post.title, post.excerpt || "", post.content || "",
    post.author || "Müh. Serdar Ay", post.publishDate || "", post.readTime || "5 dk okuma",
    post.coverImage || "/images/2.png", JSON.stringify(post.tags || []),
    post.isPublished ? 1 : 0
  );
  return post;
}

export function deleteBlogPost(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 8. LEADS
// ==========================================
export function getLeads(): LeadItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    serviceType: r.service_type,
    buildingType: r.building_type,
    squareMeters: r.square_meters,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
    isRead: r.is_read === 1
  }));
}

export function createLead(lead: Omit<LeadItem, "id" | "status" | "createdAt">): LeadItem {
  const db = getSqliteDb();
  const newLead: LeadItem = {
    ...lead,
    id: "lead-" + Date.now(),
    status: "new",
    createdAt: new Date().toISOString(),
    isRead: false
  };

  db.prepare(`
    INSERT INTO leads (id, name, phone, email, service_type, building_type, square_meters, message, status, created_at, is_read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    newLead.id, newLead.name, newLead.phone, newLead.email || "",
    newLead.serviceType, newLead.buildingType || "", newLead.squareMeters || "",
    newLead.message || "", newLead.status, newLead.createdAt, 0
  );

  return newLead;
}

export function saveLead(lead: LeadItem): LeadItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO leads (id, name, phone, email, service_type, building_type, square_meters, message, status, created_at, is_read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    lead.id, lead.name, lead.phone, lead.email || "",
    lead.serviceType, lead.buildingType || "", lead.squareMeters || "",
    lead.message || "", lead.status, lead.createdAt || new Date().toISOString(),
    lead.isRead ? 1 : 0
  );
  return lead;
}

export function getDb() {
  const users = getUsers();
  const adminUser = getUserById(users[0]?.id || "admin-1") || {
    id: "admin-1",
    username: "admin",
    name: "Ay Mühendislik Yönetici",
    passwordHash: "",
    role: "admin",
    createdAt: "2026-08-20"
  };

  return {
    settings: getSettings(),
    services: getServices(),
    projects: getProjects(),
    blogPosts: getAllBlogPostsAdmin(),
    leads: getLeads(),
    testimonials: getTestimonials(),
    sliders: getSliders(),
    references: getReferences(),
    media: getMedia(),
    mails: getMails(),
    adminUser,
    adminUsers: users
  };
}

export function updateLeadStatus(id: string, status: LeadItem["status"]): boolean {
  const db = getSqliteDb();
  const info = db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, id);
  return info.changes > 0;
}

export function deleteLead(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM leads WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 9. TESTIMONIALS
// ==========================================
export function getTestimonials(): TestimonialItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM testimonials ORDER BY date DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    clientName: r.client_name,
    companyOrBuilding: r.company_or_building,
    rating: r.rating,
    comment: r.comment,
    projectType: r.project_type,
    date: r.date
  }));
}

export function saveTestimonial(t: TestimonialItem): TestimonialItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO testimonials (id, client_name, company_or_building, rating, comment, project_type, date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    t.id, t.clientName, t.companyOrBuilding || "", t.rating || 5,
    t.comment, t.projectType || "", t.date || ""
  );
  return t;
}

export function deleteTestimonial(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 10. MAILS
// ==========================================
export function getMails(): MailItem[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT * FROM mails ORDER BY date DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    sender: r.sender,
    senderEmail: r.sender_email,
    subject: r.subject,
    body: r.body,
    date: r.date,
    isRead: r.is_read === 1,
    folder: r.folder,
    attachments: JSON.parse(r.attachments_json || "[]")
  }));
}

export function saveMail(mail: MailItem): MailItem {
  const db = getSqliteDb();
  db.prepare(`
    INSERT OR REPLACE INTO mails (id, sender, sender_email, subject, body, date, is_read, folder, attachments_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    mail.id, mail.sender, mail.senderEmail, mail.subject, mail.body,
    mail.date, mail.isRead ? 1 : 0, mail.folder, JSON.stringify(mail.attachments || [])
  );
  return mail;
}

export function deleteMail(id: string): boolean {
  const db = getSqliteDb();
  const info = db.prepare("DELETE FROM mails WHERE id = ?").run(id);
  return info.changes > 0;
}

// ==========================================
// 11. USERS & ROLES (KULLANICI YÖNETİMİ)
// ==========================================
export function getUsers(): Omit<AdminUser, "passwordHash">[] {
  const db = getSqliteDb();
  const rows = db.prepare("SELECT id, username, name, role, created_at FROM users ORDER BY created_at ASC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    username: r.username,
    name: r.name,
    role: (r.role || "admin") as 'admin' | 'editor',
    createdAt: r.created_at
  }));
}

export function getUserById(id: string): AdminUser | null {
  const db = getSqliteDb();
  const r = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
  if (!r) return null;
  return {
    id: r.id,
    username: r.username,
    name: r.name,
    passwordHash: r.password_hash,
    role: r.role || "admin",
    createdAt: r.created_at
  };
}

export function createUser(data: { username: string; name: string; passwordPlain: string; role?: 'admin' | 'editor' }): AdminUser {
  const db = getSqliteDb();
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(data.passwordPlain, salt);
  const id = "usr-" + Date.now();
  const createdAt = new Date().toISOString().split("T")[0];
  const role = data.role || "admin";

  db.prepare(`
    INSERT INTO users (id, username, name, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, data.username.toLowerCase().trim(), data.name.trim(), passwordHash, role, createdAt);

  return {
    id,
    username: data.username.toLowerCase().trim(),
    name: data.name.trim(),
    passwordHash,
    role,
    createdAt
  };
}

export function updateUser(id: string, data: { username?: string; name?: string; role?: 'admin' | 'editor'; newPasswordPlain?: string }): boolean {
  const db = getSqliteDb();
  const user = getUserById(id);
  if (!user) return false;

  const username = data.username ? data.username.toLowerCase().trim() : user.username;
  const name = data.name ? data.name.trim() : user.name;
  const role = data.role || user.role || "admin";
  let passwordHash = user.passwordHash;

  if (data.newPasswordPlain && data.newPasswordPlain.trim().length >= 6) {
    const salt = bcrypt.genSaltSync(10);
    passwordHash = bcrypt.hashSync(data.newPasswordPlain.trim(), salt);
  }

  const info = db.prepare(`
    UPDATE users 
    SET username = ?, name = ?, role = ?, password_hash = ?
    WHERE id = ?
  `).run(username, name, role, passwordHash, id);

  return info.changes > 0;
}

export function deleteUser(id: string): { success: boolean; error?: string } {
  const db = getSqliteDb();
  const count = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (count.count <= 1) {
    return { success: false, error: "Sistemde en az bir yönetici kalmalıdır." };
  }

  const info = db.prepare("DELETE FROM users WHERE id = ?").run(id);
  return { success: info.changes > 0 };
}

export function verifyAdminCredentials(username: string, plainPassword: string): AdminUser | null {
  const db = getSqliteDb();
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username.toLowerCase().trim()) as any;
  if (!user) return null;

  const isValid = bcrypt.compareSync(plainPassword, user.password_hash);
  if (isValid) {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      passwordHash: user.password_hash,
      role: user.role || "admin",
      createdAt: user.created_at
    };
  }
  return null;
}
