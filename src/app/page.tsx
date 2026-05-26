import { MintButton } from "@/components/MintButton";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="scan-line fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 flex flex-col items-center gap-12">

        <div className="text-center">
          <h1 className="glitch-text text-5xl sm:text-7xl font-bold tracking-tighter mb-4" data-text="FRAGMENT X">
            FRAGMENT X
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Fully On-Chain Generative Glitch Art
          </p>
        </div>

        <div className="flex gap-6 sm:gap-12 text-center">
          {[
            { label: "Supply",  value: "10,000" },
            { label: "Price",   value: "0.00015 ETH" },
            { label: "Royalty", value: "5%" },
            { label: "Wallet",  value: "5 max" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-white font-bold text-lg sm:text-2xl">{s.value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="w-full">
          <MintButton />
        </div>

        <div className="w-full max-w-md grid grid-cols-3 gap-4 text-center">
          {[
            { name: "Common",    pct: "75%", count: "7,500", border: "border-blue-800",   text: "text-blue-400"   },
            { name: "Rare",      pct: "20%", count: "2,000", border: "border-purple-800", text: "text-purple-400" },
            { name: "Legendary", pct: "5%",  count: "500",   border: "border-amber-800",  text: "text-amber-400"  },
          ].map((t) => (
            <div key={t.name} className={`bg-card border ${t.border} rounded-xl p-4`}>
              <p className={`text-xs font-bold ${t.text} mb-1`}>{t.name}</p>
              <p className="text-white text-xl font-bold">{t.pct}</p>
              <p className="text-gray-500 text-xs mt-1">{t.count} NFTs</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 text-sm text-gray-400 leading-relaxed">
          <p className="text-white font-bold mb-3">About FragmentX</p>
          <p>
            Fully on-chain generative NFT collection. Every image is produced entirely
            from the smart contract — no IPFS, no external servers. Each token is a unique
            composition of geometric fragments with glitch effects.
          </p>
          <div className="mt-4 flex gap-4">
            <a href={`https://etherscan.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs">Contract ↗</a>
            <a href="https://opensea.io/collection/fragmentx" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs">OpenSea ↗</a>
          </div>
        </div>

        <p className="text-gray-600 text-xs">© 2025 FragmentX. All rights reserved.</p>
      </div>
    </main>
  );
}
