import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Cinzel } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naomi.link"),
  title: "𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆ | Fashion, Lifestyle & Influencer",
  description: "Official link-in-bio for 𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆. Fashion store, style inspiration, beauty tips, and free e-book.",
  keywords: ["Naomi", "Fashion", "Lifestyle", "Influencer", "Linktree", "Style Inspo"],
  openGraph: {
    title: "𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆ | Official Bio Links",
    description: "Fashion inspo for the girl who's always on the go",
    images: [{ url: "/naomi_avatar_square.jpg", width: 800, height: 800, alt: "𝓝𝓪𝓸𝓶𝓲 ݁ ˖Ი𐑼⋆" }],
    type: "profile",
  },
  icons: {
    icon: "/naomi_avatar_square.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased selection:bg-sky-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
