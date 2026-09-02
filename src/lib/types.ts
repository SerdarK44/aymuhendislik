export interface SiteSettings {
  companyName: string;
  slogan: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
  licenseNo: string;
  aboutShort: string;
  aboutFull: string;
  yearsExperience: number;
  completedProjects: number;
  happyClients: number;
  certifiedStaff: number;
  googleMapsUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}

export interface SliderItem {
  id: string;
  image: string;
  label: string;
  headline: string;
  sub: string;
  order: number;
}

export interface ReferenceItem {
  id: string;
  name: string;
  logo: string;
  order: number;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  filename: string;
  folder?: string; // 'slider' | 'referans' | 'logo' | 'hizmet' | 'proje' | 'blog' | 'genel'
  size?: string;
  mimeType?: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  isFeatured: boolean;
  order: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  completionDate: string;
  description: string;
  client: string;
  image: string;
  gallery?: string[];
  isFeatured: boolean;
  order?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  isPublished: boolean;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  buildingType?: string;
  squareMeters?: string;
  message?: string;
  status: 'new' | 'read' | 'contacted' | 'completed' | 'cancelled';
  isRead?: boolean;
  createdAt: string;
}

export interface MailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'trash';
  attachments?: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  companyOrBuilding: string;
  rating: number;
  comment: string;
  projectType: string;
  date: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  role?: 'admin' | 'editor';
  createdAt?: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  sliders?: SliderItem[];
  references?: ReferenceItem[];
  media?: MediaItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  blogPosts: BlogPost[];
  leads: LeadItem[];
  mails?: MailItem[];
  testimonials: TestimonialItem[];
  adminUser: AdminUser;
  adminUsers?: AdminUser[];
}