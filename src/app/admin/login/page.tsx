"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = "/admin";
      } else {
        setError(data.error || "Geçersiz kullanıcı adı veya şifre.");
        setLoading(false);
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/80 flex items-center justify-center p-6 text-ink-900 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="group mb-4 inline-block transition-transform hover:scale-105">
            <div className="w-24 h-24 rounded-3xl bg-white border border-stone-200 shadow-md flex items-center justify-center p-3">
              <img 
                src="/logo/logo_tek.png" 
                alt="Ay Mühendislik Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Ay Mühendislik CMS</span>
          </div>
          <h1 className="text-2xl font-black text-ink-900">Yönetici Paneli Girişi</h1>
          <p className="text-xs text-stone-500 mt-1">Lütfen devam etmek için kimlik bilgilerinizi girin.</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/50 p-7 sm:p-8">
          {error && (
            <div className="mb-5 px-4 py-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-900 font-mono focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm text-ink-900 font-mono focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? "Giriş Yapılıyor..." : "Giriş Yap"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Web Sitesine Geri Dön</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}