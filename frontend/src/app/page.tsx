"use client";

import CheckIp from "@/components/check";
import Configure from "@/components/configure";
import GetMyIp from "@/components/getMyIp";
import { Separator } from "@/components/ui/separator";
import { WalletSection } from "@/components/wallet";

// wallet dependencies
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, localhost, Chain, sepolia } from "wagmi/chains";

const localnet: Chain = {
  id: 31337,
  name: "Localnet",
  nativeCurrency: {
    name: "Localnet Ethereum",
    symbol: "TestETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545/"],
    },
    public: {
      http: ["http://127.0.0.1:8545/"],
    },
  },
  network: "localhost",
};

// wallet configuration
const chains = [arbitrum, mainnet, polygon, localhost, localnet, sepolia];
const projectId = "c0600099e322ffe6c736e09570097b2f";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Home() {
  return (
    <main>
      <WagmiConfig config={wagmiConfig}>
        <div className="p-6">
          <WalletSection />
          <Separator className="my-6" />
          <Configure/>
          <Separator className="my-6" />
          <GetMyIp/>
          <Separator className="my-6" />
          <CheckIp/>
        </div>
      </WagmiConfig>

      {/* web3 modal dialog box */}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </main>
  );
}
