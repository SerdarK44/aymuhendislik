# Çoklu Dil Desteği (TR / EN) Tamamlandı 🇹🇷 🇬🇧

Ay Mühendislik web sitesine kapsamlı, modern ve kullanıcı dostu Türkçe & İngilizce (`TR` / `EN`) çoklu dil altyapısı başarıyla entegre edildi.

---

## 🚀 Yapılan İşlemler ve Eklenen Özellikler

### 1. Dinamik Dil Değiştirici (Language Switcher)
- **Masaüstü (Desktop):** Header/Navbar sağ üst alanında şık `TR | EN` hap buton eklendi. Aktif dil vurgusu ve yumuşak geçiş efektleri sağlandı.
- **Mobil (Mobile Drawer):** Mobil menü drawer'ı içerisine hem TR hem de EN butonları içeren özel bir dil seçim alanı eklendi.
- **Kalıcılık (Persistence):** Kullanıcının seçtiği dil `ay_lang` cookie'si ve `localStorage` üzerinde saklanır; sayfa yenilense de seçim korunur.

### 2. Kapsamlı UI Çeviri Sözlüğü (`src/lib/i18n/translations.ts`)
- **Navigasyon:** Ana Sayfa / Home, Hizmetler / Services, Projeler / Projects, Kurumsal / About, İletişim / Contact, Teklif Al / Get Quote, Müşteri Hizmetleri & Keşif vb.
- **Lead / Teklif Modalı:** Tüm form etiketleri, keşif chip seçenekleri, yer tutucular (placeholders), güvenlik bildirimleri ve başarı mesajları iki dilde uyarlandı.
- **İletişim Formu:** Ad, telefon, e-posta, proje konusu açılır menüsü, mesaj alanı, doğrulama ve başarı mesajları.
- **Hızlı Mobil İletişim Çubuğu (MobileQuickBar):** Hemen Ara / Call Now, WhatsApp Teklif / WhatsApp (İngilizce seçildiğinde otomatik İngilizce açılış mesajı).
- **Footer:** Şirket künyesi, kurumsal linkler, EPDK yetki metni, telif hakları.

### 3. İçerik ve Proje Çevirileri (`src/lib/i18n/contentTranslations.ts`)
- **Hizmetler (Services):** RMS İstasyonları, Endüstriyel Tesisat, Kaskad Kazan Dairesi, CAD Projelendirme vb. başlık ve açıklamaları uluslararası mühendislik standartlarına (ASME/EN) uygun profesyonel İngilizce terminolojiyle haritalandı.
- **Projeler (Projects):** Referans fabrika dönüşümleri ve kazan dairesi projeleri İngilizce başlık, açıklama ve kategoriyle sunuldu.
- **Neden Biz (Why Us):** Güvenlik, sıfır hata, mühendislik güvencesi başlıkları ve sayaçlar.
- **Sıkça Sorulan Sorular (FAQs):** Sorular ve mühendislik yanıtları bilingual hale getirildi.

### 4. Alt Sayfaların (Subpages) Entegrasyonu
- `/hakkimizda` (About Us): Kurumsal hikaye, değerler kartları ve yetkinlik maddeleri.
- `/iletisim` (Contact): Çalışma saatleri, ofis bilgileri, adres yol tarifi butonu ve iletişim formu.
- `/hizmetler` (Services): Tüm hizmet kartları ve keşif aksiyon butonları.
- `/projeler` (Projects): Referans filtreleme, teslim tarihleri ve lokasyon bilgileri.
- `/blog` (Engineering Insights): Teknik bilgi bankası ve makale okuma bağlantıları.

---

## 🛠️ Doğrulama & Derleme
- `npm run build` Turbopack ile çalıştırıldı.
- 21 route'un tamamı 0 hata ile derlendi (TypeScript ve JSX kontrolü tam).
- `.gitignore` dosyası güncellenerek build çıktıları `.next/` dizini temizlendi.
- Kodlar GitHub `origin main` dalına başarıyla pushlandı.

---

## 🌐 Canlı Sunucu (VPS) Güncelleme Komutu

Değişiklikleri canlı sunucunuzda yayına almak için sunucu terminalinde tek satırlık komutu çalıştırmanız yeterlidir:

```bash
cd /var/www/aymuhendislik && git pull origin main && npm run build && pm2 restart aymuhendislik
```
