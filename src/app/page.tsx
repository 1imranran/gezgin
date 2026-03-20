import PlaceCard from "@/components/PlaceCard";
import { getTodayPlace } from "@/services/placeService";

export const revalidate = 0; // Disable static rendering to always fetch fresh data locally 

export default async function Home() {
  const place = await getTodayPlace();

  async function vote(isUpvote: boolean) {
    "use server";
    const { votePlace } = await import("@/services/placeService");
    await votePlace(place.id, isUpvote);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-10">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-3">Günün Önerisi</h1>
        <p className="text-zinc-400 text-lg max-w-lg mx-auto">
          Bugün keşfetmeniz için harika bir mekan seçtik. Beğenirseniz oy vermeyi unutmayın!
        </p>
      </div>

      <PlaceCard
        id={place.id}
        name={place.name}
        description={place.description}
        imageUrl={place.imageUrl}
        upvotes={place.upvotes}
        downvotes={place.downvotes}
        onVote={vote}
      />
    </div>
  );
}
