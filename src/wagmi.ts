"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "FragmentX",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "fragmentx",
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/4Q2FLPYBfwA7Tps_4Q3zCLkbqjiH3qy2"),
  },
  ssr: true,
});

export const CONTRACT_ADDRESS = "0x48aa484775f0beD6f78737578e855918Aa788cBE" as `0x${string}`;

export const CONTRACT_ABI = [
  { name: "mint", type: "function", stateMutability: "payable", inputs: [], outputs: [{ name: "tokenId", type: "uint256" }, { name: "tier", type: "uint8" }] },
  { name: "totalSupply", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint16" }] },
  { name: "mintOpen", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "bool" }] },
  { name: "mintedBy", type: "function", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint8" }] },
  { name: "remainingOf", type: "function", stateMutability: "view", inputs: [{ name: "tier", type: "uint8" }], outputs: [{ name: "", type: "uint16" }] },
  { name: "MINT_PRICE", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;
