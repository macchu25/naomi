"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  QrCode,
  MoreHorizontal,
  ChevronRight,
  Check,
  Copy,
  X,
  Send,
  Loader2,
  Sparkles,
  ShoppingBag,
  Heart,
  Play,
  Plane,
  Mail,
} from "lucide-react";

// ==========================================
// Custom SVG Icons
// ==========================================
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.883 2.89 2.89 0 0 1-2.887-2.883 2.896 2.896 0 0 1 2.887-2.884c.313 0 .61.05.889.141V9.458a6.34 6.34 0 0 0-.889-.063 6.336 6.336 0 0 0-6.333 6.333A6.336 6.336 0 0 0 9.473 22.06a6.336 6.336 0 0 0 6.333-6.333V9.096a8.214 8.214 0 0 0 4.783 1.523v-3.49a4.83 4.83 0 0 1-1-.443z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// ==========================================
// Main Page Component
// ==========================================
export default function Page() {
  // Theme state: 'ocean' (Hikari Maeve - default) or 'cyber' (Maya Johnson)
  const [activeTheme, setActiveTheme] = useState<"ocean" | "cyber">("ocean");
  
  // Modal state
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Click Feedback
  const playHaptic = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Audio not permitted
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const openDialog = (title: string, content: React.ReactNode) => {
    playHaptic();
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeDialog = () => {
    setIsModalOpen(false);
  };

  // Share Dialog
  const handleShareClick = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://naomi.link";
    const title = activeTheme === "ocean" ? "𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆ | Official Links" : "Maya Johnson | Official Links";

    const content = (
      <div>
        <p className="text-sm text-slate-400 mb-6 text-center">
          Share this profile with your friends &amp; followers
        </p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              showToast("Link copied to clipboard!");
              closeDialog();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/40 text-slate-200 hover:text-white transition-all transform hover:-translate-y-0.5"
          >
            <Copy className="w-5 h-5 mb-1.5" />
            <span className="text-[11px] font-medium">Copy</span>
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title + " " + url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/40 text-slate-200 hover:text-white transition-all transform hover:-translate-y-0.5"
          >
            <TwitterIcon className="w-5 h-5 mb-1.5" />
            <span className="text-[11px] font-medium">Twitter</span>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/40 text-slate-200 hover:text-white transition-all transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5 mb-1.5" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/40 text-slate-200 hover:text-white transition-all transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5 mb-1.5" />
            <span className="text-[11px] font-medium">Telegram</span>
          </a>
        </div>

        <div className="flex items-center gap-2 p-1.5 pl-3.5 bg-white/[0.06] border border-white/10 rounded-xl">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none truncate"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              showToast("Link copied to clipboard!");
              closeDialog();
            }}
            className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    );

    openDialog("Share Profile", content);
  };

  // QR Code Dialog
  const handleQRClick = () => {
    const qrContent = (
      <div className="flex flex-col items-center py-2">
        <p className="text-sm text-slate-400 mb-4 text-center">
          Scan to open {activeTheme === "ocean" ? "𝓝𝓪𝓸𝓶𝓲's" : "Maya Johnson's"} Bio
        </p>
        <div className="p-4 bg-white rounded-2xl shadow-2xl mb-4">
          <svg className="w-40 h-40" viewBox="0 0 100 100" fill="#000000" shapeRendering="crispEdges">
            <rect x="5" y="5" width="28" height="28" rx="4" fill="#000000" />
            <rect x="9" y="9" width="20" height="20" rx="2" fill="#ffffff" />
            <rect x="13" y="13" width="12" height="12" rx="2" fill="#000000" />
            <rect x="67" y="5" width="28" height="28" rx="4" fill="#000000" />
            <rect x="71" y="9" width="20" height="20" rx="2" fill="#ffffff" />
            <rect x="75" y="13" width="12" height="12" rx="2" fill="#000000" />
            <rect x="5" y="67" width="28" height="28" rx="4" fill="#000000" />
            <rect x="9" y="71" width="20" height="20" rx="2" fill="#ffffff" />
            <rect x="13" y="75" width="12" height="12" rx="2" fill="#000000" />
            <rect x="37" y="7" width="6" height="6" rx="1" />
            <rect x="47" y="7" width="6" height="6" rx="1" />
            <rect x="57" y="7" width="6" height="6" rx="1" />
            <rect x="37" y="17" width="6" height="6" rx="1" />
            <rect x="51" y="17" width="6" height="6" rx="1" />
            <rect x="7" y="37" width="6" height="6" rx="1" />
            <rect x="17" y="37" width="6" height="6" rx="1" />
            <rect x="27" y="37" width="6" height="6" rx="1" />
            <rect x="37" y="37" width="6" height="6" rx="1" />
            <rect x="47" y="37" width="6" height="6" rx="1" />
            <rect x="67" y="37" width="6" height="6" rx="1" />
            <rect x="77" y="37" width="6" height="6" rx="1" />
            <rect x="87" y="37" width="6" height="6" rx="1" />
            <rect x="17" y="47" width="6" height="6" rx="1" />
            <rect x="27" y="47" width="6" height="6" rx="1" />
            <rect x="47" y="47" width="6" height="6" rx="1" />
            <rect x="57" y="47" width="6" height="6" rx="1" />
            <rect x="77" y="47" width="6" height="6" rx="1" />
            <rect x="7" y="57" width="6" height="6" rx="1" />
            <rect x="37" y="57" width="6" height="6" rx="1" />
            <rect x="47" y="57" width="6" height="6" rx="1" />
            <rect x="67" y="57" width="6" height="6" rx="1" />
            <rect x="87" y="57" width="6" height="6" rx="1" />
            <rect x="37" y="67" width="6" height="6" rx="1" />
            <rect x="57" y="67" width="6" height="6" rx="1" />
            <rect x="77" y="67" width="6" height="6" rx="1" />
            <rect x="47" y="77" width="6" height="6" rx="1" />
            <rect x="67" y="77" width="6" height="6" rx="1" />
            <rect x="87" y="77" width="6" height="6" rx="1" />
            <rect x="37" y="87" width="6" height="6" rx="1" />
            <rect x="57" y="87" width="6" height="6" rx="1" />
            <rect x="77" y="87" width="6" height="6" rx="1" />
          </svg>
        </div>
        <span className="text-xs text-slate-500">Fast access &bull; Compatible with all mobile cameras</span>
      </div>
    );

    openDialog("Scan QR Code", qrContent);
  };

  // Hikari Maeve Button Click
  const handleHikariLinkClick = (title: string, desc: string, url: string) => {
    const content = (
      <div>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {desc}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-teal-500 via-sky-600 to-blue-700 text-white font-semibold text-sm shadow-lg shadow-sky-900/30 hover:shadow-sky-900/50 hover:opacity-95 transition-all uppercase tracking-wider"
        >
          Open Link
        </a>
      </div>
    );
    openDialog(title, content);
  };

  // Hikari Maeve 4 Link Pill Items
  const hikariButtons = [
    {
      title: "FASHION STORE",
      desc: "Explore Hikari's curated seasonal collections, bespoke minimalist apparel, sustainable linens, and styling essentials.",
      url: "https://store.hikarimaeve.com",
    },
    {
      title: "INSPIRATION",
      desc: "Daily moodboards, lookbooks, Tokyo & Paris street fashion captures, and color harmony palettes.",
      url: "https://inspiration.hikarimaeve.com",
    },
    {
      title: "BEAUTY TIPS",
      desc: "Gentle skincare routines, dewy glass skin rituals, summer sunscreen favorites, and everyday effortless makeup tutorials.",
      url: "https://beauty.hikarimaeve.com",
    },
    {
      title: "FREE E-BOOK",
      desc: "Download 'Capsule Wardrobe Secrets: 30 Outfits from 10 Minimal Pieces' — completely free instant digital PDF guide.",
      url: "https://ebook.hikarimaeve.com",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden">
      
      {/* ========================================================
          THEME 1: OCEAN LINEN CHIC (HIKARI MAEVE) - MẪU MỚI
          ======================================================== */}
      {activeTheme === "ocean" && (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-start">
          {/* Full-bleed Luxury Crumpled Ocean Linen Texture Background */}
          <div
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hikari_bg.jpg')",
            }}
          >
            {/* Subtle Vignette & Wave Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b384f]/40 via-transparent to-[#082b3d]/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.15),_transparent_70%)]" />
          </div>

          {/* Main Content Container - Enlarged & Centered for Web */}
          <main className="relative z-10 w-full max-w-[560px] sm:max-w-[600px] mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-16 flex flex-col items-center">
            
            {/* Profile Avatar with Elegant Thin White Border */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-6 sm:mb-7 flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden border-[2.5px] sm:border-[3px] border-white/90 shadow-[0_12px_36px_rgba(5,30,50,0.35)]">
                <Image
                  src="/naomi_avatar_square.jpg"
                  alt="𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆"
                  fill
                  sizes="(max-width: 640px) 160px, 192px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Name - Enlarged */}
            <h1 className="text-[32px] sm:text-[44px] font-semibold text-white tracking-wide text-center drop-shadow-[0_2px_14px_rgba(5,30,45,0.65)] mb-2">
              𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆
            </h1>

            {/* Subtitle / Category - Scaled Up */}
            <p className="text-sm sm:text-[15px] font-light text-sky-100/90 tracking-[0.24em] text-center mb-10 uppercase">
              Fashion | Lifestyle | Solo Trips
            </p>

            {/* 4 Social Pill Buttons Stacked Vertically - Enlarged for Web */}
            <section className="w-full flex flex-col gap-4 sm:gap-5 mb-9" aria-label="Social media channels">
              {/* Facebook Button */}
              <a
                href="https://www.facebook.com/nocmaw"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4.5 sm:py-5 px-7 sm:px-8 rounded-full bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/60 shadow-[0_8px_24px_rgba(10,45,70,0.2)] hover:shadow-[0_14px_34px_rgba(10,45,70,0.32)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer overflow-hidden flex items-center justify-center gap-3.5"
              >
                <FacebookIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#1b4353] group-hover:scale-110 transition-transform" />
                <span className="relative z-10 font-sans font-semibold text-[15px] sm:text-[16.5px] text-[#1b4353] group-hover:text-[#0f2c38] tracking-[0.22em] uppercase transition-colors">
                  FACEBOOK
                </span>
                <span className="absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 pointer-events-none" />
              </a>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/naya.ng_09/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4.5 sm:py-5 px-7 sm:px-8 rounded-full bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/60 shadow-[0_8px_24px_rgba(10,45,70,0.2)] hover:shadow-[0_14px_34px_rgba(10,45,70,0.32)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer overflow-hidden flex items-center justify-center gap-3.5"
              >
                <InstagramIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#1b4353] group-hover:scale-110 transition-transform" />
                <span className="relative z-10 font-sans font-semibold text-[15px] sm:text-[16.5px] text-[#1b4353] group-hover:text-[#0f2c38] tracking-[0.22em] uppercase transition-colors">
                  INSTAGRAM
                </span>
                <span className="absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 pointer-events-none" />
              </a>

              {/* TikTok Button */}
              <a
                href="https://www.tiktok.com/@naya.ng09"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4.5 sm:py-5 px-7 sm:px-8 rounded-full bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/60 shadow-[0_8px_24px_rgba(10,45,70,0.2)] hover:shadow-[0_14px_34px_rgba(10,45,70,0.32)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer overflow-hidden flex items-center justify-center gap-3.5"
              >
                <TikTokIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#1b4353] group-hover:scale-110 transition-transform" />
                <span className="relative z-10 font-sans font-semibold text-[15px] sm:text-[16.5px] text-[#1b4353] group-hover:text-[#0f2c38] tracking-[0.22em] uppercase transition-colors">
                  TIKTOK
                </span>
                <span className="absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 pointer-events-none" />
              </a>

              {/* Email Button */}
              <a
                href="mailto:nocmaw@gmail.com"
                className="group relative w-full py-4.5 sm:py-5 px-7 sm:px-8 rounded-full bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/60 shadow-[0_8px_24px_rgba(10,45,70,0.2)] hover:shadow-[0_14px_34px_rgba(10,45,70,0.32)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer overflow-hidden flex items-center justify-center gap-3.5"
              >
                <MailIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#1b4353] group-hover:scale-110 transition-transform" />
                <span className="relative z-10 font-sans font-semibold text-[15px] sm:text-[16.5px] text-[#1b4353] group-hover:text-[#0f2c38] tracking-[0.22em] uppercase transition-colors">
                  EMAIL
                </span>
                <span className="absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 pointer-events-none" />
              </a>
            </section>

            {/* Quote / Tagline - Scaled Up */}
            <p className="text-center text-sm sm:text-base font-normal text-sky-100/95 tracking-wide leading-relaxed mt-2 mb-10 max-w-[360px] sm:max-w-[420px] drop-shadow-sm">
              Fashion inspo for the girl who&apos;s always on the go
            </p>

            {/* Footer */}
            <p className="text-xs sm:text-[13px] text-sky-200/60 mt-10 tracking-widest">
              &copy; {new Date().getFullYear()} 𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆
            </p>
          </main>
        </div>
      )}

      {/* ========================================================
          THEME 2: CYBER DARK (MAYA JOHNSON) - MẪU TRƯỚC ĐÓ
          ======================================================== */}
      {activeTheme === "cyber" && (
        <div className="relative min-h-screen w-full bg-[#07040d] text-slate-100 flex flex-col items-center justify-start">
          {/* Dynamic Ambient Background Lighting */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className="absolute w-[580px] h-[580px] -top-36 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-800/40 via-purple-950/30 to-transparent blur-[120px] animate-float-orb-slow" />
            <div className="absolute w-[520px] h-[520px] top-[35%] left-[15%] rounded-full bg-gradient-to-br from-pink-600/30 via-purple-700/20 to-transparent blur-[120px] animate-float-orb-mid" />
            <div className="absolute w-[600px] h-[600px] -bottom-40 right-[10%] rounded-full bg-gradient-to-br from-indigo-600/30 via-purple-900/20 to-transparent blur-[120px] animate-float-orb-deep" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
          </div>

          <main className="relative z-10 w-full max-w-[580px] mx-auto px-4 sm:px-6 pt-7 pb-16 flex flex-col">
            {/* Top Bar with Switcher */}
            <nav className="flex items-center justify-between pb-6">
              <button
                onClick={() => {
                  playHaptic();
                  setActiveTheme("ocean");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900/40 hover:bg-purple-800/60 backdrop-blur-md border border-purple-500/30 text-purple-200 text-xs font-medium tracking-wide transition-all shadow-sm hover:scale-105"
                title="Switch back to 𝓝𝓪𝓸𝓶𝓲 (Ocean) Theme"
              >
                <span>🌊 Đổi sang 𝓝𝓪𝓸𝓶𝓲 (Xanh)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQRClick}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white hover:bg-purple-600/25 transition-all"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareClick}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white hover:bg-purple-600/25 transition-all"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </nav>

            {/* Maya Johnson Profile */}
            <header className="flex flex-col items-center text-center pt-2 pb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 flex items-center justify-center">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 blur-xl opacity-70 animate-pulse-glow" />
                <div className="relative w-full h-full rounded-full p-[3.5px] avatar-conic shadow-2xl animate-rotate-ring">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 animate-counter-rotate">
                    <Image
                      src="/avatar.jpg"
                      alt="Maya Johnson"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <h1 className="font-heading text-2xl sm:text-[27px] font-bold text-white tracking-tight mb-1">
                Maya Johnson
              </h1>
              <p className="text-sm font-semibold text-pink-400 mb-3 tracking-wide">
                Content Creator &amp; Digital Influencer
              </p>
              <p className="text-xs sm:text-[13.5px] text-slate-400 leading-relaxed mb-6 max-w-sm">
                Sharing my journey and inspiring you to live your best life. 💜
              </p>
            </header>

            {/* Maya Link Cards */}
            <section className="flex flex-col gap-3.5 mb-7">
              <div
                onClick={() => handleHikariLinkClick("My Amazon Storefront", "Curated beauty & outfits", "https://amazon.com")}
                className="cursor-pointer flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-hero-gradient border border-white/25 shadow-lg text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-white">My Amazon Storefront</h2>
                  <p className="text-xs text-white/90">My favorite finds &amp; must haves</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/90" />
              </div>

              <div
                onClick={() => handleHikariLinkClick("LTK (Shop My Looks)", "Daily outfit links", "https://shopltk.com")}
                className="cursor-pointer flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#160e26]/80 border border-purple-500/20 text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-white">LTK (Shop My Looks)</h2>
                  <p className="text-xs text-slate-400">Shop my outfits</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </div>
            </section>
          </main>
        </div>
      )}

      {/* ========================================================
          GLOBAL MODAL DIALOG
          ======================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4"
          onClick={closeDialog}
        >
          <div
            className="relative w-full max-w-md bg-[#102433] border border-sky-500/30 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl text-white transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-2 mb-4 sm:hidden" />

            <button
              onClick={closeDialog}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <h3 className="font-cinzel text-xl font-bold tracking-wider text-white mb-1">
                {modalTitle}
              </h3>
            </div>

            <div>{modalContent}</div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0a2333]/95 backdrop-blur-md border border-sky-400/40 text-white text-xs sm:text-sm font-medium shadow-2xl shadow-sky-950/50">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
