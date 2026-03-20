import { getLeaderboard } from "@/services/placeService";
import { Trophy, ThumbsUp, ThumbsDown } from "lucide-react";

export const revalidate = 0;

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  return (
    <div className="w-full max-w-3xl flex flex-col items-center pt-10">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Liderlik Tablosu</h1>
        <p className="text-zinc-400">Tüm zamanların en çok sevilen mekanları.</p>
      </div>

      <div className="w-full space-y-4">
        {leaderboard.map((place: any, index: number) => (
          <div 
            key={place.id}
            className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex-shrink-0 w-12 text-center text-2xl font-bold text-emerald-400/80">
              #{index + 1}
            </div>
            <img 
              src={place.imageUrl} 
              alt={place.name} 
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-zinc-100">{place.name}</h3>
              <p className="text-sm text-zinc-400">Önerildiği Tarih: {place.recommendedOn}</p>
            </div>
            <div className="flex flex-col items-end gap-1 px-4">
              <div className="flex text-emerald-400 items-center gap-2 font-medium">
                <ThumbsUp className="w-4 h-4" /> {place.upvotes}
              </div>
              <div className="flex text-rose-400 items-center gap-2 font-medium">
                <ThumbsDown className="w-4 h-4" /> {place.downvotes}
              </div>
            </div>
          </div>
        ))}
        {leaderboard.length === 0 && (
          <p className="text-zinc-500 text-center py-10">Henüz hiç kimse oylama yapmamış.</p>
        )}
      </div>
    </div>
  );
}
