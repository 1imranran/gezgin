"use client";

import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

interface PlaceCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  onVote: (isUpvote: boolean) => Promise<void>;
}

export default function PlaceCard({ id, name, description, imageUrl, upvotes: initUp, downvotes: initDown, onVote }: PlaceCardProps) {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [votes, setVotes] = useState({ up: initUp, down: initDown });

  const handleVote = async (isUpvote: boolean) => {
    if (voted) return;
    setVoted(isUpvote ? "up" : "down");
    setVotes(prev => ({
      up: isUpvote ? prev.up + 1 : prev.up,
      down: !isUpvote ? prev.down + 1 : prev.down
    }));
    await onVote(isUpvote);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-zinc-900/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5 max-w-2xl w-full group/card"
    >
      <div className="h-80 w-full relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay transition-opacity duration-500 group-hover/card:opacity-100 opacity-0" />
        <h2 className="absolute bottom-6 left-8 text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">{name}</h2>
      </div>
      
      <div className="p-8 sm:p-10">
        <p className="text-zinc-300/90 text-lg leading-relaxed mb-10 font-light">{description}</p>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex gap-4">
            <button 
              onClick={() => handleVote(true)}
              disabled={voted !== null}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                voted === "up" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" 
                : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-transparent"
              } disabled:cursor-not-allowed`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{votes.up}</span>
            </button>
            <button 
              onClick={() => handleVote(false)}
              disabled={voted !== null}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                voted === "down" 
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/50" 
                : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-transparent"
              } disabled:cursor-not-allowed`}
            >
              <ThumbsDown className="w-5 h-5" />
              <span>{votes.down}</span>
            </button>
          </div>
          {voted && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-4 py-2 rounded-full"
            >
              Oyunuz kaydedildi!
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
