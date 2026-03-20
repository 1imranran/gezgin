import { getArchivedPlaces } from "@/services/placeService";
import { History } from "lucide-react";

export const revalidate = 0;

export default async function ArchivePage() {
  const archive = await getArchivedPlaces();

  return (
    <div className="w-full max-w-4xl flex flex-col items-center pt-10">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <History className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Arşiv</h1>
        <p className="text-zinc-400">Geçmişte önerilmiş tüm mekanları keşfedin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {archive.map((place: any) => (
          <div 
            key={place.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="h-48 w-full relative">
              <img 
                src={place.imageUrl} 
                alt={place.name} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                {place.recommendedOn}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-zinc-100 mb-2">{place.name}</h3>
              <p className="text-sm text-zinc-400 line-clamp-2">{place.description}</p>
            </div>
          </div>
        ))}
        {archive.length === 0 && (
          <p className="text-zinc-500 text-center py-10 col-span-2">Geçmişte henüz hiç mekan önerilmemiş.</p>
        )}
      </div>
    </div>
  );
}
