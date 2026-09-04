export type Locale = "tr" | "en";

export interface Translations {
  nav: {
    home: string;
    services: string;
    projects: string;
    blog: string;
    about: string;
    contact: string;
    getQuote: string;
    customerService: string;
    menuOpen: string;
    menuClose: string;
  };
  common: {
    callNow: string;
    whatsapp: string;
    getFreeQuote: string;
    freeDiscovery: string;
    viewAll: string;
    details: string;
    close: string;
    loading: string;
    success: string;
    error: string;
    certifiedEngineers: string;
    experienceYears: string;
    projectsCount: string;
    happyClients: string;
    emergencyLine: string;
    workingHours: string;
    rightsReserved: string;
    authorizedFirm: string;
    developedBy: string;
  };
  quickBar: {
    call: string;
    whatsapp: string;
    quote: string;
  };
  modal: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    callDirectly: string;
    successTitle: string;
    successSubtitle: string;
    newRequestBtn: string;
    privacyNotice: string;
  };
  contactForm: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successMsg: string;
    errorMsg: string;
    subjects: {
      industrial: string;
      rms: string;
      cascade: string;
      cad: string;
      maintenance: string;
      other: string;
    };
  };
  footer: {
    companyDesc: string;
    servicesTitle: string;
    corporateTitle: string;
    contactTitle: string;
    about: string;
    projects: string;
    blog: string;
    contact: string;
    privacy: string;
    terms: string;
    cookies: string;
    adminLogin: string;
  };
  home: {
    ctaBadge: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    ctaPhoneButton: string;
    servicesBadge: string;
    servicesTitle: string;
    servicesSubtitle: string;
    projectsBadge: string;
    projectsTitle: string;
    projectsSubtitle: string;
    whyUsBadge: string;
    whyUsTitle: string;
    whyUsSubtitle: string;
    testimonialsBadge: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    blogBadge: string;
    blogTitle: string;
    blogSubtitle: string;
    faqBadge: string;
    faqTitle: string;
    faqSubtitle: string;
    faqCtaBadge: string;
    faqCtaTitle: string;
    faqCtaSubtitle: string;
  };
  pages: {
    aboutBadge: string;
    aboutTitle: string;
    aboutSubtitle: string;
    aboutStoryTitle: string;
    projectsBadge: string;
    projectsTitle: string;
    projectsSubtitle: string;
    servicesBadge: string;
    servicesTitle: string;
    servicesSubtitle: string;
    blogBadge: string;
    blogTitle: string;
    blogSubtitle: string;
    contactBadge: string;
    contactTitle: string;
    contactSubtitle: string;
    contactInfoTitle: string;
    contactPhoneTitle: string;
    contactEmailTitle: string;
    contactOfficeTitle: string;
    directionsBtn: string;
  };
  maintenance: {
    badge: string;
    defaultTitle: string;
    defaultMessage: string;
    estimatedTime: string;
    contactTitle: string;
    phoneLabel: string;
    whatsappLabel: string;
    emailLabel: string;
    adminLogin: string;
    rights: string;
  };
}

export const translations: Record<Locale, Translations> = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Rehber",
      about: "Hakkımızda",
      contact: "İletişim",
      getQuote: "Teklif Al",
      customerService: "Müşteri Hizmetleri & Keşif",
      menuOpen: "Menüyü Aç",
      menuClose: "Menüyü Kapat"
    },
    common: {
      callNow: "Hemen Ara",
      whatsapp: "WhatsApp",
      getFreeQuote: "Ücretsiz Teklif Al",
      freeDiscovery: "Ücretsiz Keşif",
      viewAll: "Tümünü İncele",
      details: "Detayları Gör",
      close: "Kapat",
      loading: "Yükleniyor...",
      success: "İşlem Başarılı",
      error: "Bir hata oluştu",
      certifiedEngineers: "Yetkili Mühendis Kadrosu",
      experienceYears: "Yıllık Mühendislik Güvencesi",
      projectsCount: "Başarılı Proje Teslimi",
      happyClients: "Memnun Müşteri",
      emergencyLine: "Keşif & Danışmanlık Hattı",
      workingHours: "Çalışma Saatleri",
      rightsReserved: "Tüm hakları saklıdır.",
      authorizedFirm: "EPDK & İGDAŞ Yetkili Mühendislik Firması",
      developedBy: "Serdar KÜLEK tarafından geliştirildi"
    },
    quickBar: {
      call: "Hemen Ara",
      whatsapp: "WhatsApp",
      quote: "Teklif Al"
    },
    modal: {
      badge: "Ücretsiz Mühendislik Keşfi",
      title: "Hızlı Teklif & Danışmanlık Alın",
      subtitle: "30 saniyede bilgilerinizi bırakın, uzman makine mühendislerimiz 24 saat içinde tesisinizi arasın.",
      nameLabel: "Adınız Soyadınız / Firma Ünvanı",
      namePlaceholder: "Örn: Ahmet Yılmaz / ABC Tekstil A.Ş.",
      phoneLabel: "İletişim Numaranız",
      phonePlaceholder: "0 (5XX) XXX XX XX",
      cityLabel: "Şehir / İlçe",
      cityPlaceholder: "Örn: İstanbul / İkitelli OSB",
      serviceLabel: "İlgilendiğiniz Mühendislik Hizmeti",
      servicePlaceholder: "Hizmet Seçiniz...",
      noteLabel: "Proje Detayı veya Sorunuz (Opsiyonel)",
      notePlaceholder: "Tesisinizin büyüklüğü, tüketim ihtiyacı veya proje detaylarını kısaca belirtebilirsiniz...",
      submitBtn: "Teklif Talebimi Gönder",
      submittingBtn: "Talebiniz İletiliyor...",
      callDirectly: "Doğrudan santral hattımızı arayabilirsiniz:",
      successTitle: "Talebiniz Başarıyla Alındı!",
      successSubtitle: "Mühendislerimiz talebinizi inceleyerek en kısa sürede sizinle iletişime geçecektir.",
      newRequestBtn: "Yeni Talep Gönder",
      privacyNotice: "Bilgileriniz KVKK kapsamında korunmakta olup yalnızca keşif ve teklif sürecinde kullanılır."
    },
    contactForm: {
      nameLabel: "Ad Soyad *",
      namePlaceholder: "Örn: Mustafa Kaya",
      phoneLabel: "Telefon *",
      phonePlaceholder: "05XX XXX XX XX",
      emailLabel: "E-Posta (Opsiyonel)",
      emailPlaceholder: "ornek@sirket.com",
      subjectLabel: "Proje Türü / Konu",
      subjectPlaceholder: "Konu Seçiniz...",
      messageLabel: "Mesajınız / Proje Detayı *",
      messagePlaceholder: "Tesisinizin özellikleri, doğalgaz hattı ihtiyacı veya keşif talebinizi yazabilirsiniz...",
      submitBtn: "Mesajı Gönder",
      submittingBtn: "Gönderiliyor...",
      successMsg: "Mesajınız başarıyla iletildi! Mühendislerimiz en kısa sürede tarafınıza dönüş sağlayacaktır.",
      errorMsg: "Mesaj gönderilirken bir hata oluştu. Lütfen doğrudan telefonla arayınız.",
      subjects: {
        industrial: "Endüstriyel Doğalgaz Tesisatı",
        rms: "RMS İstasyonu Kurulumu",
        cascade: "Merkezi Kaskad Kazan Dairesi",
        cad: "CAD Proje Çizimi & İGDAŞ Onayı",
        maintenance: "Periyodik Bakım & Kaçak Tespiti",
        other: "Diğer Özel Proje & Keşif"
      }
    },
    footer: {
      companyDesc: "EPDK ve Gaz Dağıtım Yetkili Mühendislik Firması. Tüm Türkiye genelinde büyük sanayi tesislerinden konutlara anahtar teslim doğalgaz mühendisliği.",
      servicesTitle: "Hizmetlerimiz",
      corporateTitle: "Kurumsal & Yasal",
      contactTitle: "İletişim",
      about: "Hakkımızda",
      projects: "Referanslarımız",
      blog: "Doğalgaz Rehberi",
      contact: "İletişim",
      privacy: "Gizlilik & KVKK",
      terms: "Şartlar & Koşullar",
      cookies: "Çerez Politikası",
      adminLogin: "Yönetici Girişi"
    },
    home: {
      ctaBadge: "İletişim & Keşif",
      ctaTitle: "Projenizi Birlikte Planlayalım",
      ctaSubtitle: "Ücretsiz keşif ve teknik değerlendirme için hemen bize ulaşın. Yetkili mühendislerimiz 24 saat içinde dönüş yapar.",
      ctaButton: "Ücretsiz Keşif Al",
      ctaPhoneButton: "Hemen Ara",
      servicesBadge: "Mühendislik Çözümlerimiz",
      servicesTitle: "Onaylı, Güvenli ve Yüksek Verimli Tesisat Hizmetleri",
      servicesSubtitle: "EPDK ve İGDAŞ yetkili makine mühendislerimizle projelendirmeden gaz açımına kadar anahtar teslim taahhüt.",
      projectsBadge: "Referanslarımız",
      projectsTitle: "Başarıyla Tamamlanan Endüstriyel & Bireysel Projeler",
      projectsSubtitle: "Türkiye genelinde sanayi fabrikalarından kaskad kazan dairelerine imza attığımız seçkin referanslarımız.",
      whyUsBadge: "Neden Biz",
      whyUsTitle: "Güvenli, Onaylı ve Hızlı Tesisat",
      whyUsSubtitle: "Doğalgaz hata kabul etmez. Sertifikalı mühendislik güvencesiyle, her projeyi TSE ve EPDK standartlarında teslim ediyoruz.",
      testimonialsBadge: "Müşteri Deneyimi",
      testimonialsTitle: "Müşterilerimizin Mühendislik Güvencemiz Hakkındaki Görüşleri",
      testimonialsSubtitle: "Sanayi tesislerinden apartman yönetimlerine yüzlerce memnun referans.",
      blogBadge: "Mühendislik Rehberi",
      blogTitle: "Doğalgaz ve Tesisat Bilgi Bankası",
      blogSubtitle: "Yasal şartnameler, tasarruf yöntemleri ve teknik detaylar hakkında uzman yazılarımız.",
      faqBadge: "Merak Edilenler",
      faqTitle: "Sıkça Sorulan Sorular",
      faqSubtitle: "Doğalgaz projelendirme, onay ve tesisat süreçleri hakkında merak edilen tüm teknik detaylar.",
      faqCtaBadge: "Özel Proje Danışmanlığı",
      faqCtaTitle: "Başka bir sorunuz veya özel bir projeniz mi var?",
      faqCtaSubtitle: "Uzman makine mühendislerimiz projenizi yerinde inceleyip tüm teknik detayları ücretsiz yanıtlasın."
    },
    pages: {
      aboutBadge: "16+ Yıllık Mühendislik Güvencesi",
      aboutTitle: "Biz Kimiz?",
      aboutSubtitle: "2008 yılından bu yana endüstriyel tesisler ve yaşam alanları için onaylı, güvenli ve verimli doğalgaz sistemleri projelendiriyor ve uyguluyoruz.",
      aboutStoryTitle: "Doğalgazda Mühendislik Güvencesi",
      projectsBadge: "1.450+ Başarılı Proje Teslimi",
      projectsTitle: "Referans Projelerimiz",
      projectsSubtitle: "Büyük sanayi tesislerinden toplu konutlara Türkiye genelinde başarıyla tamamladığımız doğalgaz ve mekanik projelerimiz.",
      servicesBadge: "Yetkili Doğalgaz Çözümleri",
      servicesTitle: "Mühendislik Çözümlerimiz",
      servicesSubtitle: "Tüm Türkiye genelinde sanayi tesislerinden konutlara anahtar teslim yetkili mühendislik ve taahhüt hizmetleri.",
      blogBadge: "Doğalgaz Rehberi & Mevzuat",
      blogTitle: "Mühendislik Rehberi & Teknik Bilgi Bankası",
      blogSubtitle: "Doğalgaz projelendirme, sanayi dönüşümü, enerji verimliliği ve EPDK mevzuatı hakkında rehber içeriklerimiz.",
      contactBadge: "Doğrudan İletişim",
      contactTitle: "Bizimle İletişime Geçin",
      contactSubtitle: "Doğalgaz projeniz için ücretsiz yerinde keşif veya teknik danışmanlık almak üzere bize dilediğiniz kanaldan ulaşabilirsiniz.",
      contactInfoTitle: "Merkez Ofis & Atölye",
      contactPhoneTitle: "Telefon & Santral",
      contactEmailTitle: "Kurumsal E-Posta",
      contactOfficeTitle: "Merkez Adres",
      directionsBtn: "Haritada Yol Tarifi Al"
    },
    maintenance: {
      badge: "Planlı Bakım & Güncelleme",
      defaultTitle: "Daha İyi Bir Deneyim İçin Bakımdayız",
      defaultMessage: "Sizlere daha hızlı, güvenli ve üstün standartlarda mühendislik hizmeti sunabilmek amacıyla sistemlerimizde altyapı çalışması yürütülmektedir. Çok kısa bir süre içerisinde yeniden yayında olacağız.",
      estimatedTime: "Tahmini Tamamlanma:",
      contactTitle: "Acil Keşif & Danışmanlık İçin Bize Ulaşın:",
      phoneLabel: "Santral / Keşif Hattı",
      whatsappLabel: "WhatsApp Danışma",
      emailLabel: "Kurumsal E-Posta",
      adminLogin: "Yetkili Girişi",
      rights: "Tüm hakları saklıdır.",
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      blog: "Insights",
      about: "About Us",
      contact: "Contact",
      getQuote: "Get Quote",
      customerService: "Client Services & Survey",
      menuOpen: "Open Menu",
      menuClose: "Close Menu"
    },
    common: {
      callNow: "Call Now",
      whatsapp: "WhatsApp",
      getFreeQuote: "Get Free Quote",
      freeDiscovery: "Free On-Site Survey",
      viewAll: "View All",
      details: "View Details",
      close: "Close",
      loading: "Loading...",
      success: "Successful",
      error: "An error occurred",
      certifiedEngineers: "Certified Engineering Team",
      experienceYears: "Years Engineering Assurance",
      projectsCount: "Successful Project Deliveries",
      happyClients: "Satisfied Clients",
      emergencyLine: "Direct Discovery & Consultation Line",
      workingHours: "Operating Hours",
      rightsReserved: "All rights reserved.",
      authorizedFirm: "EPDK & Gas Authority Certified Engineering Company",
      developedBy: "Developed by Serdar KÜLEK"
    },
    quickBar: {
      call: "Call",
      whatsapp: "WhatsApp",
      quote: "Get Quote"
    },
    modal: {
      badge: "Free Engineering Survey",
      title: "Get Fast Quote & Technical Consultation",
      subtitle: "Submit your details in 30 seconds; our certified mechanical engineers will contact you within 24 hours.",
      nameLabel: "Full Name / Company Name",
      namePlaceholder: "e.g. John Doe / Global Manufacturing Ltd.",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+90 (5XX) XXX XX XX",
      cityLabel: "City / District",
      cityPlaceholder: "e.g. Istanbul / Organized Industrial Zone",
      serviceLabel: "Requested Engineering Service",
      servicePlaceholder: "Select Service...",
      noteLabel: "Project Details or Inquiry (Optional)",
      notePlaceholder: "Briefly specify your facility size, gas consumption needs, or project scope...",
      submitBtn: "Submit Quote Request",
      submittingBtn: "Submitting Your Request...",
      callDirectly: "You can also call our central office directly:",
      successTitle: "Your Request Has Been Received!",
      successSubtitle: "Our mechanical engineers will evaluate your project details and contact you shortly.",
      newRequestBtn: "Submit Another Request",
      privacyNotice: "Your information is protected and will strictly be used for engineering survey and quotation purposes."
    },
    contactForm: {
      nameLabel: "Full Name *",
      namePlaceholder: "e.g. John Doe",
      phoneLabel: "Phone *",
      phonePlaceholder: "+90 5XX XXX XX XX",
      emailLabel: "Email (Optional)",
      emailPlaceholder: "contact@company.com",
      subjectLabel: "Project Type / Subject",
      subjectPlaceholder: "Select Subject...",
      messageLabel: "Your Message / Project Details *",
      messagePlaceholder: "Describe your facility specifications, gas piping requirements, or request an on-site survey...",
      submitBtn: "Send Message",
      submittingBtn: "Sending...",
      successMsg: "Your message has been delivered successfully! Our engineers will respond as soon as possible.",
      errorMsg: "An error occurred while sending your message. Please reach us directly via phone.",
      subjects: {
        industrial: "Industrial Natural Gas Systems",
        rms: "RMS Pressure Regulating Stations",
        cascade: "Commercial Cascade Boiler Room",
        cad: "CAD Design & Gas Authority Approval",
        maintenance: "Preventive Maintenance & Leak Detection",
        other: "Custom Project & Technical Survey"
      }
    },
    footer: {
      companyDesc: "Certified Gas Authority & EPDK Engineering Firm. Turnkey industrial and commercial natural gas engineering solutions nationwide.",
      servicesTitle: "Our Services",
      corporateTitle: "Corporate & Legal",
      contactTitle: "Contact Us",
      about: "About Us",
      projects: "Our References",
      blog: "Engineering Insights",
      contact: "Contact",
      privacy: "Privacy & GDPR",
      terms: "Terms & Conditions",
      cookies: "Cookie Policy",
      adminLogin: "Admin Portal"
    },
    home: {
      ctaBadge: "Contact & Discovery",
      ctaTitle: "Let's Plan Your Project Together",
      ctaSubtitle: "Contact us today for a complimentary on-site inspection and technical evaluation. Our engineers respond within 24 hours.",
      ctaButton: "Request Free Survey",
      ctaPhoneButton: "Call Directly",
      servicesBadge: "Our Engineering Solutions",
      servicesTitle: "Certified, Secure & High-Efficiency Gas Engineering",
      servicesSubtitle: "Turnkey EPC contracting from precision 3D CAD design to official gas commissioning with authorized engineers.",
      projectsBadge: "Our References",
      projectsTitle: "Proven Industrial & Commercial Project Deliveries",
      projectsSubtitle: "Our distinguished portfolio covering heavy industrial plants, factories, and central cascade boiler systems.",
      whyUsBadge: "Why Choose Us",
      whyUsTitle: "Safe, Certified and Accelerated Installation",
      whyUsSubtitle: "Natural gas permits zero margin for error. We execute every project strictly adhering to international ASME, EN, and national standards.",
      testimonialsBadge: "Client Testimonials",
      testimonialsTitle: "What Corporate Leaders Say About Our Engineering",
      testimonialsSubtitle: "Trusted by hundreds of manufacturing factories, industrial zones, and facilities across the region.",
      blogBadge: "Engineering Insights",
      blogTitle: "Gas Engineering & Technical Knowledgebase",
      blogSubtitle: "Expert articles on regulatory compliance, energy efficiency, safety protocols, and heating design.",
      faqBadge: "Knowledge Base",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "All technical questions regarding natural gas engineering, approvals, RMS stations, and commissioning answered.",
      faqCtaBadge: "Custom Project Consultation",
      faqCtaTitle: "Have another question or a specialized project?",
      faqCtaSubtitle: "Our certified mechanical engineers will inspect your facility on-site and answer all technical aspects free of charge."
    },
    pages: {
      aboutBadge: "16+ Years Engineering Assurance",
      aboutTitle: "Who We Are",
      aboutSubtitle: "Designing and building approved, secure, and energy-efficient natural gas infrastructure for industries and living spaces since 2008.",
      aboutStoryTitle: "Engineering Assurance in Natural Gas",
      projectsBadge: "1,450+ Completed Projects",
      projectsTitle: "Reference Projects",
      projectsSubtitle: "Turnkey natural gas and mechanical engineering projects completed with high precision across Turkey.",
      servicesBadge: "Authorized Gas Solutions",
      servicesTitle: "Engineering Solutions",
      servicesSubtitle: "Comprehensive, turnkey certified mechanical engineering and contracting solutions for industrial facilities and residential developments.",
      blogBadge: "Engineering Insights & Guidelines",
      blogTitle: "Engineering Knowledgebase & Technical Guides",
      blogSubtitle: "Authoritative guides on industrial gas conversions, energy efficiency, boiler cascades, and statutory compliance.",
      contactBadge: "Direct Contact & Survey",
      contactTitle: "Get in Touch With Us",
      contactSubtitle: "Reach out via any channel for a complimentary on-site discovery, project estimation, or technical advisory.",
      contactInfoTitle: "Central Office & Workshop",
      contactPhoneTitle: "Central Telephone",
      contactEmailTitle: "Corporate Email",
      contactOfficeTitle: "Headquarters Address",
      directionsBtn: "Get Directions on Google Maps"
    },
    maintenance: {
      badge: "Scheduled Maintenance & Upgrade",
      defaultTitle: "We Are Currently Under Maintenance",
      defaultMessage: "We are upgrading our digital infrastructure to deliver superior engineering solutions. We will be back online shortly. For urgent inquiries, please contact our team directly.",
      estimatedTime: "Estimated Completion:",
      contactTitle: "For Urgent Inquiries & Engineering Support:",
      phoneLabel: "Direct / Discovery Line",
      whatsappLabel: "WhatsApp Advisory",
      emailLabel: "Corporate Email",
      adminLogin: "Authorized Staff Login",
      rights: "All rights reserved.",
    }
  }
};
