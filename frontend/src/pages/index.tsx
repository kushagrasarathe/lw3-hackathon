import {
  resolveDomain,
  resolveDomainETH,
  revResolve,
  revResolveETH,
} from "@/components/spaceID";
import { Inter } from "next/font/google";
import * as React from "react";
import { useNetwork } from "wagmi";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { chain } = useNetwork();

  // React.useEffect(() => {
  //   resolveDomain("0xdhruv.eth");
  //   revResolve("0x4e659bc3fc954631785d4a9363646322b080dfc4");
  // }, [chain]);

  // 0x842bf693112a0e70f3198ea0d93cf5231d1e7dd3 -> worldfirst.arb
  //  71089.bnb

  // get the Address and check the current chain
  return (
    // bg-gradient-to-r from-cyan-50 to-cyan-100
    <div className=" z-30  ">
      {/* // hero */}
      {/* bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-300 to-violet-400 */}
      <main className=" hero  mt-32 relative md:w-11/12 mx-auto  min-h-screen flex flex-col items-center justify-center w-full">
        <div className="   -mt-24 relative h-full flex items-center justify-between  w-full font-bold tracking-wide">
          <div className=" w-full z-20 text-center ">
            {/* <div className=" z-10 self-start text-start font-bold mb-3 text-5xl tracking-wide ml-10 bg-clip-text drop-shadow-lg text-transparent bg-bttom bg-[url('../assets/bg.jpg')]">
              SecureID
            </div> */}
            {/* <div className=" self-start text-[150px]">BUT WITH</div> */}
            <div className=" relative flex flex-col items-center justify-center max-w-7xl mx-auto">
              <div className=" font-extrabold mb-8 tracking-wide text-7xl text-[120px]">
                {/* <span className="text-transparent  drop-shadow-lg bg-clip-text bg-gradient-to-r from-sky-500 to-[#1fb4b0] "> */}
                <span className=" bg-clip-text drop-shadow-lg text-transparent bg-top bg-[url('../assets/bg.jpg')]">
                  Smart{" "}
                </span>
                {/* <span className=" bg-clip-text text-transparent bg-center bg-[url('../assets/hero-bg.gif')]"> */}
                <span className=" bg-clip-text drop-shadow-lg text-transparent bg-bottom bg-[url('../assets/bg.jpg')]">
                  Accounts
                </span>
              </div>
              <div className=" absolute bottom-0 right-48  bg-clip-text drop-shadow-lg text-transparent bg-top bg-[url('../assets/bg.jpg')] tracking-wide text-2xl text-end mt-4">
                Powered by SpaceID
              </div>
            </div>
            <p className=" max-w-3xl text-xl tracking-wide font-semibold text-center mx-auto mt-5">
              Connecting Universes: ERC6551 Tokens, Interstellar Transfers and
              Decentralized Space Messaging
            </p>
            <Link href={'/register'} className=" text-white font-normal tracking-wide text-lg mt-5 self-start z-20 bg-[#130f06] cursor-pointer rounded-md active:scale-95 transition-all ease-in-out px-3 py-2 ">
              {/* <span className="text-transparent font-normal tracking-wide text-lg bg-clip-text bg-gradient-to-r from-black -400 to-black -600"> */}
              Get Started
              {/* </span> */}
            </Link>
          </div>
          {/* <Image
            className=" opacity-0 blur-sm mt-10 max-w-4xl absolute top-1/2 left-1/2 transform rotate-[18deg] -translate-x-1/2 -translate-y-1/2 z-0"
            // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
            src={bg}
            alt="bg"
          /> */}
        </div>
        {/* // className=" mask opacity-100 blur-sm mt-10 max-w-4xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" */}
        {/* <Image
          className=" mask max-w-2xl absolute top-60 left-96 z-0 "
          // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
          src={mask}
          alt="bg"
        /> */}
        {/* <Image
          className=" mask max-w-2xl absolute top-[49vh] right-[-80px] z-0 "
          // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
          src={mask}
          alt="bg"
        /> */}
      </main>
      <div>
        <div
          className=" z-0  w-full fixed bottom-0 pattern-cross pattern-indigo-500 pattern-bg-white 
          pattern-size-6 pattern-opacity-5 min-h-screen"
        ></div>
        <div className="  min-h-screen flex flex-col w-6/12 mx-auto items-center justify-center ">
          <h1 className=" z-20 text-4xl self-start mb-8 font-semibold tracking-wider">
            SecureID Features
          </h1>
          <div className=" z-20 gap-3 grid grid-cols-6  ">
            <div className=" shadow-xl p-5 rounded-lg col-span-6 bg-cyan-300">
              <h1 className=" text-2xl font-semibold tracking-wider mb-3">
                ERC6551 Tokens
              </h1>
              <p className=" text-lg tracking-wide">
                SecureID uses ERC6551 to enable smart-contract wallets for
                SpaceID owners.
              </p>
            </div>
            <div className="shadow-xl p-5 rounded-lg col-span-4 bg-indigo-600 text-white ">
              <h1 className=" text-2xl font-semibold tracking-wider mb-3">
                Interstellar Transfers
              </h1>
              <p className=" text-lg tracking-wide">
                SecureID supports crosschain asset transfers, you can share
                assets with anoyone by just using your SpaceID
              </p>
            </div>
            <div className="shadow-xl p-5 rounded-lg col-span-2 bg-amber-300">
              <h1 className=" text-2xl font-semibold tracking-wider mb-3">
                Decentralized Messaging
              </h1>
              <p className=" text-lg tracking-wide">
                You can also send messages and vibe with other SpaceID users :D
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
