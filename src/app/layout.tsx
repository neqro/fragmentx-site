import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FragmentX — Fully On-Chain Generative NFT",
  description: "10,000 fully on-chain geometric glitch NFTs. 3 tiers. Free mint.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark text-white font-mono antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
