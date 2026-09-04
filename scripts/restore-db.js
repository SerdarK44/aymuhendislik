const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "../data/db.json");
const bakFile = path.join(__dirname, "../data/db.json.bak");

if (!fs.existsSync(bakFile)) {
  console.log("Yedek dosya (data/db.json.bak) bulunamadi. Mevcut data/db.json korundu.");
  process.exit(0);
}

try {
  const currentData = JSON.parse(fs.readFileSync(dbFile, "utf8"));
  const bakData = JSON.parse(fs.readFileSync(bakFile, "utf8"));

  // Merge settings: take user's bakData settings, fill in missing defaults from currentData
  const mergedSettings = {
    ...currentData.settings,
    ...bakData.settings,
  };

  // Ensure facebookUrl is removed
  delete mergedSettings.facebookUrl;

  // Clean 7/24 & emergency wording from settings if present
  if (mergedSettings.whyUsItem4Title === "7/24 Acil Müdahale" || !mergedSettings.whyUsItem4Title) {
    mergedSettings.whyUsItem4Title = "Periyodik Bakım & Servis";
    mergedSettings.whyUsItem4Desc = "Projelerinizin devreye alınmasından sonra da periyodik kontrol ve teknik servis desteği sağlıyoruz.";
  }
  if (mergedSettings.workingHours && mergedSettings.workingHours.includes("7/24")) {
    mergedSettings.workingHours = "Pzt - Cmt: 08:30 - 19:00 (Pazar: Randevulu Keşif)";
  }

  // Update FAQ 6 if it contains emergency question
  if (mergedSettings.faqs && Array.isArray(mergedSettings.faqs)) {
    mergedSettings.faqs = mergedSettings.faqs.map((faq) => {
      if (faq.id === "faq-6" || (faq.q && faq.q.includes("Acil durumlar"))) {
        return {
          id: "faq-6",
          q: "Proje tamamlandıktan sonra periyodik bakım ve teknik servis desteği sağlıyor musunuz?",
          a: "Evet. Ay Mühendislik olarak devreye aldığımız tüm endüstriyel tesisler, RMS istasyonları ve merkezi kazan sistemleri için periyodik muayene, sızdırmazlık testleri, brülör ayarları ve düzenli bakım hizmeti sunuyoruz.",
          tag: "Bakım & Servis"
        };
      }
      return faq;
    });
  }

  const mergedDb = {
    settings: mergedSettings,
    services: bakData.services && bakData.services.length > 0 ? bakData.services : currentData.services,
    projects: bakData.projects && bakData.projects.length > 0 ? bakData.projects : currentData.projects,
    blogPosts: bakData.blogPosts && bakData.blogPosts.length > 0 ? bakData.blogPosts : currentData.blogPosts,
    testimonials:
      bakData.testimonials && bakData.testimonials.length > 0
        ? bakData.testimonials
        : currentData.testimonials,
    sliders: bakData.sliders && bakData.sliders.length > 0 ? bakData.sliders : currentData.sliders,
    references:
      bakData.references && bakData.references.length > 0 ? bakData.references : currentData.references,
    media: bakData.media || currentData.media || [],
    leads: bakData.leads || currentData.leads || [],
    mails: bakData.mails || currentData.mails || [],
    adminUser: bakData.adminUser || currentData.adminUser,
    adminUsers: bakData.adminUsers || currentData.adminUsers,
  };

  fs.writeFileSync(dbFile, JSON.stringify(mergedDb, null, 2), "utf8");
  console.log("SUCCESS: CMS verileriniz db.json.bak dosyasindan basariyla geri yuklendi!");
} catch (err) {
  console.error("Geri yukleme sirasinda hata olustu:", err);
  process.exit(1);
}
