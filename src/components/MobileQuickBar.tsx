"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageSquare, Flame } from "lucide-react";

export default function MobileQuickBar({ phone, whatsapp }: { phone?: string; whatsapp?: string }) {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const phoneNum = phone || "0 (216) 456 78 90";
  const cleanPhone = phoneNum.replace(/\s+/g, "");
  const waNum = whatsapp || "905329998877";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-2 shadow-2xl shadow-stone-900/20">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-600 active:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-600/20 transition-transform active:scale-95"
        >
          <Phone className="w-4 h-4" />
          <span>Hemen Ara</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${waNum}?text=${encodeURIComponent("Merhaba, Ay Mühendislik web sitenizden ulaşıyorum. Doğalgaz projemiz için ücretsiz keşif ve teklif almak istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] active:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#25D366]/20 transition-transform active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Teklif</span>
        </a>
      </div>
    </div>
  );
}
