"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CONTRACT_ADDRESS = "0x48aa484775f0beD6f78737578e855918Aa788cBE" as `0x${string}`;

const CONTRACT_ABI = [
  { name: "mint", type: "function", stateMutability: "payable", inputs: [], outputs: [{ name: "tokenId", type: "uint256" }, { name: "tier", type: "uint8" }] },
  { name: "totalSupply", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint16" }] },
  { name: "mintOpen", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "bool" }] },
  { name: "mintedBy", type: "function", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint8" }] },
  { name: "remainingOf", type: "function", stateMutability: "view", inputs: [{ name: "tier", type: "uint8" }], outputs: [{ name: "", type: "uint16" }] },
  { name: "MINT_PRICE", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

export function MintButton() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { data: totalSupply } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "totalSupply", query: { refetchInterval: 5000 } });
  const { data: mintOpen } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "mintOpen", query: { refetchInterval: 5000 } });
  const { data: mintPrice } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "MINT_PRICE" });
  const { data: alreadyMinted } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "mintedBy", args: address ? [address] : undefined, query: { enabled: !!address } });
  const { data: remCommon }    = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "remainingOf", args: [0], query: { refetchInterval: 5000 } });
  const { data: remRare }      = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "remainingOf", args: [1], query: { refetchInterval: 5000 } });
  const { data: remLegendary } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "remainingOf", args: [2], query: { refetchInterval: 5000 } });

  const { writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const supply = totalSupply ? Number(totalSupply) : 0;
  const pct    = Math.round((supply / 10000) * 100);
  const hasMinted = alreadyMinted && Number(alreadyMinted) >= 5;
  const price  = mintPrice ? formatEther(mintPrice) : "0.00015";

  function handleMint() {
    writeContract(
      { address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: "mint", value: mintPrice ?? parseEther("0.00015") },
      { onSuccess: (hash) => setTxHash(hash) }
    );
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="w-full flex justify-center">
        <ConnectButton />
      </div>

      <div className="w-full bg-card border border-border rounded-xl p-5">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Minted</span>
          <span>{supply.toLocaleString()} / 10,000</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">{pct}%</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { label: "Common",    rem: remCommon,    color: "text-blue-400"   },
          { label: "Rare",      rem: remRare,      color: "text-purple-400" },
          { label: "Legendary", rem: remLegendary, color: "text-amber-400"  },
        ].map((t) => (
          <div key={t.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className={`text-xs font-bold ${t.color}`}>{t.label}</p>
            <p className="text-lg font-bold text-white mt-1">{t.rem !== undefined ? Number(t.rem).toLocaleString() : "—"}</p>
            <p className="text-xs text-gray-500">remaining</p>
          </div>
        ))}
      </div>

      {isConnected ? (
        <div className="w-full flex flex-col gap-3">
          {hasMinted ? (
            <div className="w-full text-center py-4 rounded-xl border border-border text-gray-400 text-sm">Already minted — 5 per wallet max</div>
          ) : mintOpen === false ? (
            <div className="w-full text-center py-4 rounded-xl border border-border text-gray-400 text-sm">Mint not open yet</div>
          ) : (
            <button onClick={handleMint} disabled={isPending || isConfirming}
              className="w-full py-4 rounded-xl bg-accent hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white transition-colors text-sm tracking-widest uppercase">
              {isPending ? "Confirm in wallet…" : isConfirming ? "Confirming…" : isSuccess ? "Minted!" : `Mint — ${price} ETH`}
            </button>
          )}
          {isSuccess && txHash && (
            <div className="w-full bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-green-400 text-sm font-bold mb-1">✓ Mint successful!</p>
              <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-accent underline">View on Etherscan</a>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Connect your wallet to mint</p>
      )}
    </div>
  );
}
