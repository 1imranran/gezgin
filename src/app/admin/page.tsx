import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { ShieldCheck, Plus, Trash } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  const places = await prisma.place.findMany({
    orderBy: { recommendedOn: 'desc' }
  });

  async function addPlace(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const recommendedOn = formData.get("recommendedOn") as string || format(new Date(), "yyyy-MM-dd");

    if (name && description && imageUrl) {
      await prisma.place.create({
        data: { name, description, imageUrl, recommendedOn }
      });
      revalidatePath("/admin");
      revalidatePath("/");
    }
  }

  async function deletePlace(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await prisma.place.delete({ where: { id } });
      revalidatePath("/admin");
      revalidatePath("/");
    }
  }

  return (
    <div className="w-full max-w-5xl flex flex-col pt-10">
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
        <ShieldCheck className="w-10 h-10 text-emerald-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Yönetim Paneli</h1>
          <p className="text-zinc-400">Yeni mekan ekle, mevcutları düzenle veya sil.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ring-1 ring-white/5">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" /> Yeni Mekan Ekle
            </h2>
            <form action={addPlace} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-1 block">Mekan Adı</label>
                <input required name="name" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="Örn: Bebek Sahili" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-1 block">Açıklama</label>
                <textarea required name="description" rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="Kısa bir tanıtım yazısı..." />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-1 block">Görsel URL</label>
                <input required name="imageUrl" type="url" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-1 block">Öneri Tarihi (Opsiyonel)</label>
                <input name="recommendedOn" type="date" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg py-3 mt-2 transition-colors">
                Kayıt Ekle
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ring-1 ring-white/5 h-full">
            <h2 className="text-xl font-bold text-white mb-6">Kayıtlı Mekanlar ({places.length})</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {places.map((place: any) => (
                <div key={place.id} className="bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={place.imageUrl} alt={place.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-zinc-100">{place.name}</h3>
                      <p className="text-sm text-zinc-400">Tarih: {place.recommendedOn} • Oy: {place.upvotes}</p>
                    </div>
                  </div>
                  <form action={deletePlace}>
                    <input type="hidden" name="id" value={place.id} />
                    <button type="submit" className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Trash className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
