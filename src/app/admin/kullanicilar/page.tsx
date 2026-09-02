"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users, UserPlus, Key, ShieldCheck, Trash2, Edit2, X, 
  Lock, CheckCircle2, AlertCircle, ShieldAlert, User
} from "lucide-react";

interface UserItem {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  // Create form
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<'admin' | 'editor'>("admin");
  const [createError, setCreateError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit form
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState<'admin' | 'editor'>("admin");
  const [editPassword, setEditPassword] = useState("");
  const [editError, setEditError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          name: newName,
          password: newPassword,
          role: newRole,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCreateModalOpen(false);
        setNewUsername("");
        setNewName("");
        setNewPassword("");
        setNewRole("admin");
        fetchUsers();
      } else {
        setCreateError(data.error || "Kullanıcı oluşturulamadı.");
      }
    } catch (err) {
      setCreateError("Sunucu hatası oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (u: UserItem) => {
    setEditingUser(u);
    setEditName(u.name);
    setEditRole(u.role || "admin");
    setEditPassword("");
    setEditError("");
    setEditModalOpen(true);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: editName,
          role: editRole,
          newPassword: editPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEditModalOpen(false);
        fetchUsers();
      } else {
        setEditError(data.error || "Güncelleme başarısız.");
      }
    } catch (err) {
      setEditError("Sunucu hatası oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string, username: string) => {
    if (!confirm(`"${username}" kullanıcısını silmek istediğinizden emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchUsers();
      } else {
        alert(data.error || "Silinemedi.");
      }
    } catch (err) {
      alert("Hata oluştu.");
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-500" />
            Kullanıcılar & Güvenlik Yetkileri
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            SQLite veritabanındaki yöneticileri yönetin, yeni yetkili ekleyin veya şifreleri Bcrypt ile güncelleyin.
          </p>
        </div>
        <button
          onClick={() => {
            setCreateError("");
            setCreateModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yeni Kullanıcı Ekle</span>
        </button>
      </div>

      {/* Security Info Card */}
      <div className="mb-8 p-5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-2xl border border-stone-700 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              SQLite Veritabanı & Bcrypt Şifreleme Aktif
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                10-Round Salt
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Tüm kullanıcı parolaları veritabanında tek yönlü matematiksel hash olarak saklanır ve asla geri dönüştürülemez.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-stone-400 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700 shrink-0">
          data/aymuhendislik.sqlite
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-bold text-ink-900 text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-500" />
            Kayıtlı Yöneticiler ({users.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-stone-400 text-sm">Yükleniyor...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3.5">Kullanıcı</th>
                  <th className="px-6 py-3.5">Kullanıcı Adı</th>
                  <th className="px-6 py-3.5">Yetki / Rol</th>
                  <th className="px-6 py-3.5">Kayıt Tarihi</th>
                  <th className="px-6 py-3.5 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center font-bold text-sm">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-ink-900">{u.name}</div>
                          <div className="text-[10px] text-stone-400 font-mono">ID: {u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-ink-800">
                      @{u.username}
                    </td>
                    <td className="px-6 py-4">
                      {u.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                          👑 Süper Yönetici
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[10px]">
                          ✏️ İçerik Editörü
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-stone-500 font-mono text-[11px]">
                      {u.createdAt || "2026-08"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(u)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-brand-50 hover:text-brand-700 text-stone-700 font-bold flex items-center gap-1 transition-colors"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Şifre & Düzenle</span>
                        </button>
                        {users.length > 1 && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.username)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                            title="Kullanıcıyı Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-500" />
                Yeni Yönetici / Editör Ekle
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Örn: Serdar Ay"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Kullanıcı Adı (Giriş İçin) *
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Örn: serdaray"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Şifre (Min. 6 Karakter) *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <p className="text-[10px] text-stone-400 mt-1">Şifre veritabanında Bcrypt hash olarak saklanacaktır.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Yetkilendirme Rolü *
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="admin">👑 Süper Yönetici (Tüm Yetkiler + Kullanıcı Yönetimi)</option>
                  <option value="editor">✏️ İçerik Editörü (Blog, Projeler, Medya Düzenleme)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-all disabled:opacity-50"
                >
                  {submitting ? "Kaydediliyor..." : "Kullanıcıyı Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User & Change Password Modal */}
      {editModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900 flex items-center gap-2">
                <Key className="w-5 h-5 text-brand-500" />
                Kullanıcı Düzenle & Şifre Değiştir
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Kullanıcı Adı (Değiştirilemez)
                </label>
                <input
                  type="text"
                  disabled
                  value={editingUser.username}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-sm text-stone-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Yetki / Rol
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="admin">👑 Süper Yönetici</option>
                  <option value="editor">✏️ İçerik Editörü</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">
                  Yeni Şifre Belirle (Değiştirmek istemiyorsanız boş bırakın)
                </label>
                <input
                  type="password"
                  minLength={6}
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Yeni şifreyi girin..."
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50/50 text-sm text-ink-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-all disabled:opacity-50"
                >
                  {submitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
