import Link from "next/link";
import { Compass } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-white font-extrabold text-2xl tracking-tighter hover:opacity-80 transition-opacity">
          <div className="bg-emerald-500/20 p-2 rounded-xl ring-1 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>
          Gezgin
        </Link>
        <div className="flex items-center gap-8 text-sm font-semibold text-zinc-300 tracking-wide">
          <Link href="/" className="hover:text-emerald-400 transition-colors drop-shadow-sm">Günün Keşfi</Link>
          <Link href="/leaderboard" className="hover:text-emerald-400 transition-colors drop-shadow-sm">Liderlik Tablosu</Link>
          <Link href="/archive" className="hover:text-emerald-400 transition-colors drop-shadow-sm">Arşiv</Link>
        </div>
      </div>
    </nav>
  );
}
