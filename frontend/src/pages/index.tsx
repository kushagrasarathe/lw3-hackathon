import Image from "next/image";
import { Inter } from "next/font/google";
import { resolveDomainETH, revResolveETH } from "@/components/spaceID";
import Streamr from "@/components/streamer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  revResolveETH("0xB72a04B01BB80DfD6a42ea8E0907B892286113F2");

  return (
    <div>
      <Streamr/>
    </div>
  )
}
