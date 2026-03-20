import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Gezgin | Günün Keşfi",
  description: "Her gün yeni bir mekan keşfet, oyla ve liderler tablosunu belirle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${outfit.className} bg-slate-950 text-slate-50 min-h-screen selection:bg-emerald-500/30 overflow-x-hidden relative`}>
        {/* Animated Background Mesh Gradients */}
        <div className="fixed inset-0 z-[-1] min-h-screen w-full bg-slate-950">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[128px] opacity-60"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>
        
        <Navbar />
        <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto flex flex-col items-center min-h-[calc(100vh-80px)] z-10 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
