"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare } from "lucide-react";

export default function MobileQuickBar({ phone, whatsapp }: { phone?: string; whatsapp?: string }) {
  const pathname = usePathname();
  const [activePhone, setActivePhone] = useState(phone || "");
  const [activeWhatsapp, setActiveWhatsapp] = useState(whatsapp || "");

  useEffect(() => {
    if (phone) setActivePhone(phone);
    if (whatsapp) setActiveWhatsapp(whatsapp);

    // Dynamic client-side sync fallback
    if (!phone || !whatsapp) {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (data.phone) setActivePhone(data.phone);
            if (data.whatsapp) setActiveWhatsapp(data.whatsapp);
          }
        })
        .catch((err) => console.error("MobileQuickBar settings sync error:", err));
    }
  }, [phone, whatsapp]);

  // Hide on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // Sanitize phone for tel: link (only digits, ensure standard dialing)
  const rawPhone = (activePhone || "0 (216) 456 78 90").replace(/\D/g, "");
  const cleanPhone = rawPhone.startsWith("90") ? `+${rawPhone}` : (rawPhone.startsWith("0") ? rawPhone : `0${rawPhone}`);

  // Sanitize WhatsApp for wa.me link (must be full international format without + or spaces)
  let cleanWa = (activeWhatsapp || "905329998877").replace(/\D/g, "");
  if (cleanWa.startsWith("0")) {
    cleanWa = "9" + cleanWa;
  } else if (!cleanWa.startsWith("90") && cleanWa.length === 10) {
    cleanWa = "90" + cleanWa;
  }

  const whatsappMessage = encodeURIComponent(
    "Merhaba, Ay Mühendislik web sitenizden ulaşıyorum. Doğalgaz projemiz için ücretsiz keşif ve teklif almak istiyorum."
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-2 shadow-2xl shadow-stone-900/20">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-600 active:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-600/20 transition-transform active:scale-95 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <span>Hemen Ara</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanWa}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] active:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#25D366]/20 transition-transform active:scale-95 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Teklif</span>
        </a>
      </div>
    </div>
  );
}
