import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { 
  SiteSettings, ServiceItem, ProjectItem, BlogPost, 
  LeadItem, TestimonialItem, SliderItem, ReferenceItem, 
  MediaItem, MailItem, AdminUser, DatabaseSchema 
} from "./types";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      settings: {
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
        instagramUrl: "https://instagram.com/aymuhendislik",
        linkedinUrl: "https://linkedin.com/company/aymuhendislik"
      },
      services: [],
      projects: [],
      blogPosts: [],
      testimonials: [],
      sliders: [],
      references: [],
      media: [],
      leads: [],
      mails: [],
      adminUser: {
        id: "u-1",
        username: "admin",
        name: "Sistem Yöneticisi",
        passwordHash: bcrypt.hashSync("admin123", 10),
        role: "admin",
        createdAt: new Date().toISOString().split("T")[0]
      },
      adminUsers: [
        {
          id: "u-1",
          username: "admin",
          name: "Sistem Yöneticisi",
          passwordHash: bcrypt.hashSync("admin123", 10),
          role: "admin",
          createdAt: new Date().toISOString().split("T")[0]
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed.adminUsers && parsed.users) {
      parsed.adminUsers = parsed.users;
    }
    if (!parsed.adminUsers || parsed.adminUsers.length === 0) {
      parsed.adminUsers = [
        {
          id: "u-1",
          username: "admin",
          name: "Sistem Yöneticisi",
          passwordHash: bcrypt.hashSync("admin123", 10),
          role: "admin",
          createdAt: new Date().toISOString().split("T")[0]
        }
      ];
    }
    if (!parsed.adminUser) {
      parsed.adminUser = parsed.adminUsers[0];
    }
    if (!parsed.services) parsed.services = [];
    if (!parsed.projects) parsed.projects = [];
    if (!parsed.blogPosts) parsed.blogPosts = [];
    if (!parsed.testimonials) parsed.testimonials = [];
    if (!parsed.sliders) parsed.sliders = [];
    if (!parsed.references) parsed.references = [];
    if (!parsed.media) parsed.media = [];
    if (!parsed.leads) parsed.leads = [];
    if (!parsed.mails) parsed.mails = [];
    return parsed;
  } catch (err) {
    console.error("Error reading db.json:", err);
    return {} as DatabaseSchema;
  }
}

export function getDb(): DatabaseSchema {
  return ensureDbFile();
}

function writeDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing db.json:", err);
  }
}

// ==========================================
// 1. SETTINGS
// ==========================================
export function getSettings(): SiteSettings {
  const db = getDb();
  return db.settings || {};
}

export function updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  db.settings = { ...db.settings, ...newSettings };
  writeDb(db);
  return db.settings;
}

// ==========================================
// 2. SLIDERS
// ==========================================
export function getSliders(): SliderItem[] {
  const db = getDb();
  return (db.sliders || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function saveSlider(slide: SliderItem): SliderItem {
  const db = getDb();
  if (!db.sliders) db.sliders = [];
  const index = db.sliders.findIndex((s) => s.id === slide.id);
  if (index >= 0) {
    db.sliders[index] = slide;
  } else {
    db.sliders.push(slide);
  }
  writeDb(db);
  return slide;
}

export function deleteSlider(id: string): boolean {
  const db = getDb();
  if (!db.sliders) return false;
  const initialLen = db.sliders.length;
  db.sliders = db.sliders.filter((s) => s.id !== id);
  writeDb(db);
  return db.sliders.length < initialLen;
}

// ==========================================
// 3. REFERENCES
// ==========================================
export function getReferences(): ReferenceItem[] {
  const db = getDb();
  return (db.references || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function saveReference(ref: ReferenceItem): ReferenceItem {
  const db = getDb();
  if (!db.references) db.references = [];
  const index = db.references.findIndex((r) => r.id === ref.id);
  if (index >= 0) {
    db.references[index] = ref;
  } else {
    db.references.push(ref);
  }
  writeDb(db);
  return ref;
}

export function deleteReference(id: string): boolean {
  const db = getDb();
  if (!db.references) return false;
  const initialLen = db.references.length;
  db.references = db.references.filter((r) => r.id !== id);
  writeDb(db);
  return db.references.length < initialLen;
}

// ==========================================
// 4. MEDIA
// ==========================================
export function getMedia(): MediaItem[] {
  const db = getDb();
  return (db.media || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addMedia(item: Omit<MediaItem, "id" | "createdAt">): MediaItem {
  const db = getDb();
  const newMedia: MediaItem = {
    ...item,
    id: `media-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0]
  };
  if (!db.media) db.media = [];
  db.media.unshift(newMedia);
  writeDb(db);
  return newMedia;
}

export const saveMedia = addMedia;

export function deleteMedia(id: string): boolean {
  const db = getDb();
  if (!db.media) return false;
  const initialLen = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  writeDb(db);
  return db.media.length < initialLen;
}

// ==========================================
// 5. SERVICES
// ==========================================
export function getServices(): ServiceItem[] {
  const db = getDb();
  return (db.services || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const db = getDb();
  return (db.services || []).find((s) => s.slug === slug);
}

export function getServiceById(id: string): ServiceItem | undefined {
  const db = getDb();
  return (db.services || []).find((s) => s.id === id);
}

export function saveService(service: ServiceItem): ServiceItem {
  const db = getDb();
  if (!db.services) db.services = [];
  const index = db.services.findIndex((s) => s.id === service.id);
  if (index >= 0) {
    db.services[index] = service;
  } else {
    db.services.push(service);
  }
  writeDb(db);
  return service;
}

export function deleteService(id: string): boolean {
  const db = getDb();
  if (!db.services) return false;
  const initialLen = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  writeDb(db);
  return db.services.length < initialLen;
}

// ==========================================
// 6. PROJECTS
// ==========================================
export function getProjects(): ProjectItem[] {
  const db = getDb();
  return (db.projects || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const db = getDb();
  return (db.projects || []).find((p) => p.slug === slug);
}

export function getProjectById(id: string): ProjectItem | undefined {
  const db = getDb();
  return (db.projects || []).find((p) => p.id === id);
}

export function saveProject(project: ProjectItem): ProjectItem {
  const db = getDb();
  if (!db.projects) db.projects = [];
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = project;
  } else {
    db.projects.push(project);
  }
  writeDb(db);
  return project;
}

export function deleteProject(id: string): boolean {
  const db = getDb();
  if (!db.projects) return false;
  const initialLen = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  writeDb(db);
  return db.projects.length < initialLen;
}

// ==========================================
// 7. BLOG POSTS
// ==========================================
export function getBlogPosts(): BlogPost[] {
  const db = getDb();
  return (db.blogPosts || []).filter(b => b.isPublished).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export function getAllBlogPostsAdmin(): BlogPost[] {
  const db = getDb();
  return db.blogPosts || [];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const db = getDb();
  return (db.blogPosts || []).find((p) => p.slug === slug);
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const db = getDb();
  return (db.blogPosts || []).find((p) => p.id === id);
}

export function saveBlogPost(post: BlogPost): BlogPost {
  const db = getDb();
  if (!db.blogPosts) db.blogPosts = [];
  const index = db.blogPosts.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    db.blogPosts[index] = post;
  } else {
    db.blogPosts.push(post);
  }
  writeDb(db);
  return post;
}

export function deleteBlogPost(id: string): boolean {
  const db = getDb();
  if (!db.blogPosts) return false;
  const initialLen = db.blogPosts.length;
  db.blogPosts = db.blogPosts.filter((p) => p.id !== id);
  writeDb(db);
  return db.blogPosts.length < initialLen;
}

// ==========================================
// 8. TESTIMONIALS
// ==========================================
export function getTestimonials(): TestimonialItem[] {
  const db = getDb();
  return db.testimonials || [];
}

export function saveTestimonial(testimonial: TestimonialItem): TestimonialItem {
  const db = getDb();
  if (!db.testimonials) db.testimonials = [];
  const index = db.testimonials.findIndex((t) => t.id === testimonial.id);
  if (index >= 0) {
    db.testimonials[index] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }
  writeDb(db);
  return testimonial;
}

export function deleteTestimonial(id: string): boolean {
  const db = getDb();
  if (!db.testimonials) return false;
  const initialLen = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  writeDb(db);
  return db.testimonials.length < initialLen;
}

// ==========================================
// 9. LEADS
// ==========================================
export function getLeads(): LeadItem[] {
  const db = getDb();
  return (db.leads || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function saveLead(lead: Omit<LeadItem, "id" | "createdAt" | "status" | "isRead">): LeadItem {
  const db = getDb();
  const newLead: LeadItem = {
    ...lead,
    id: `lead-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
    isRead: false
  };
  if (!db.leads) db.leads = [];
  db.leads.unshift(newLead);
  writeDb(db);
  return newLead;
}

export const createLead = saveLead;

export function updateLeadStatus(id: string, status?: LeadItem["status"], isRead?: boolean): boolean {
  const db = getDb();
  if (!db.leads) return false;
  const lead = db.leads.find((l) => l.id === id);
  if (lead) {
    if (status) lead.status = status;
    if (isRead !== undefined) lead.isRead = isRead;
    writeDb(db);
    return true;
  }
  return false;
}

export function deleteLead(id: string): boolean {
  const db = getDb();
  if (!db.leads) return false;
  const initialLen = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  writeDb(db);
  return db.leads.length < initialLen;
}

// ==========================================
// 10. MAILS
// ==========================================
export function getMails(): MailItem[] {
  const db = getDb();
  return (db.mails || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function saveMail(mail: Omit<MailItem, "id" | "date" | "isRead" | "folder">): MailItem {
  const db = getDb();
  const newMail: MailItem = {
    ...mail,
    id: `mail-${Date.now()}`,
    date: new Date().toISOString(),
    isRead: false,
    folder: "inbox"
  };
  if (!db.mails) db.mails = [];
  db.mails.unshift(newMail);
  writeDb(db);
  return newMail;
}

export function updateMailStatus(id: string, folder: MailItem["folder"]): boolean {
  const db = getDb();
  if (!db.mails) return false;
  const mail = db.mails.find((m) => m.id === id);
  if (mail) {
    mail.folder = folder;
    writeDb(db);
    return true;
  }
  return false;
}

export function markMailAsRead(id: string): boolean {
  const db = getDb();
  if (!db.mails) return false;
  const mail = db.mails.find((m) => m.id === id);
  if (mail) {
    mail.isRead = true;
    writeDb(db);
    return true;
  }
  return false;
}

export function deleteMail(id: string): boolean {
  const db = getDb();
  if (!db.mails) return false;
  const initialLen = db.mails.length;
  db.mails = db.mails.filter((m) => m.id !== id);
  writeDb(db);
  return db.mails.length < initialLen;
}

// ==========================================
// 11. USERS & AUTH
// ==========================================
export function getUsers(): AdminUser[] {
  const db = getDb();
  return db.adminUsers || [db.adminUser];
}

export function getUserByUsername(username: string): AdminUser | undefined {
  const db = getDb();
  const users = db.adminUsers || [db.adminUser];
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function getUserById(id: string): AdminUser | undefined {
  const db = getDb();
  const users = db.adminUsers || [db.adminUser];
  return users.find((u) => u.id === id);
}

export function verifyAdminCredentials(username: string, passwordPlain: string): AdminUser | null {
  const user = getUserByUsername(username);
  if (!user) return null;
  const isValid = bcrypt.compareSync(passwordPlain, user.passwordHash);
  if (!isValid) return null;
  return user;
}

export function createUser(data: { username: string; name: string; passwordPlain: string; role?: 'admin' | 'editor' }): AdminUser {
  const db = getDb();
  if (!db.adminUsers) db.adminUsers = [db.adminUser];
  
  const existing = db.adminUsers.find(u => u.username.toLowerCase() === data.username.toLowerCase());
  if (existing) {
    throw new Error("UNIQUE constraint failed: username already exists");
  }

  const newUser: AdminUser = {
    id: `user-${Date.now()}`,
    username: data.username,
    name: data.name,
    passwordHash: bcrypt.hashSync(data.passwordPlain, 10),
    role: data.role || "admin",
    createdAt: new Date().toISOString().split("T")[0]
  };

  db.adminUsers.push(newUser);
  writeDb(db);
  return newUser;
}

export function updateUser(id: string, updates: { username?: string; name?: string; role?: 'admin' | 'editor'; newPasswordPlain?: string }): AdminUser | undefined {
  const db = getDb();
  if (!db.adminUsers) db.adminUsers = [db.adminUser];
  
  const index = db.adminUsers.findIndex((u) => u.id === id);
  if (index >= 0) {
    const current = db.adminUsers[index];
    const updatedUser: AdminUser = {
      ...current,
      username: updates.username || current.username,
      name: updates.name || current.name,
      role: updates.role || current.role,
      passwordHash: updates.newPasswordPlain ? bcrypt.hashSync(updates.newPasswordPlain, 10) : current.passwordHash
    };
    db.adminUsers[index] = updatedUser;
    if (db.adminUser.id === id) {
      db.adminUser = updatedUser;
    }
    writeDb(db);
    return updatedUser;
  }
  return undefined;
}

export function deleteUser(id: string): { success: boolean; error?: string } {
  const db = getDb();
  if (!db.adminUsers) return { success: false, error: "Kullanıcı bulunamadı" };
  if (db.adminUsers.length <= 1) {
    return { success: false, error: "Sistemde en az bir yönetici bulunmalıdır." };
  }
  const initialLen = db.adminUsers.length;
  db.adminUsers = db.adminUsers.filter((u) => u.id !== id);
  writeDb(db);
  return { success: db.adminUsers.length < initialLen };
}
