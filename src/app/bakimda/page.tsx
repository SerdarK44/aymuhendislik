import { Metadata } from "next";
import { getSettings } from "@/lib/db";
import MaintenanceView from "@/components/MaintenanceView";

export const metadata: Metadata = {
  title: "Bakım Modu | Ay Mühendislik",
  description: "Web sitemiz altyapı güncellemeleri nedeniyle kısa süreli planlı bakım çalışmasındadır.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function BakimdaPage() {
  const settings = getSettings();
  return <MaintenanceView settings={settings} />;
}
