import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  bsc,
  bscTestnet,
  arbitrumNova,
  polygonMumbai,
  sepolia
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const { chains, publicClient } = configureChains(
  [
    mainnet,
    polygon,
    // polygonMumbai,
    // optimism,
    arbitrum,
    // base,
    // zora,
    bsc,
    bscTestnet,
    arbitrumNova,
    sepolia
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Guardians of the CrossChain Galaxy",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});



export default function App({ Component, pageProps }: AppProps) {
  const path = usePathname();
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
          {/* {path !== "/chat" && <Navbar />} */}
          <Navbar />
          <Component {...pageProps} />
  
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
