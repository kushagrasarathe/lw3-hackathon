import { ConnectButton } from "@rainbow-me/rainbowkit";
import mask from "@assets/mask.png";
import Image from "next/image";

const routes = [
  {
    label: "Create",
    path: "",
  },
  //   {
  //     label: "",
  //     path: "",
  //   },
];

export default function Navbar() {
  return (
    <div className=" fixed top-0 shadow- bg-[#fcfcff] bg-opacity-20 backdrop-blur-md z-50 w-full flex items-center justify-around pt-8 pb-3">
      <div className=" relative flex z-20">
        <div className=" z-10 text-start font-bold mb-3 text-3xl tracking-wide ml-20 bg-clip-text drop-shadow-lg text-transparent bg-center bg-[url('../assets/bg.jpg')]">
          Secure
          <span className=" bg-clip-text drop-shadow-lg text-transparent bg-center bg-[url('../assets/bg.jpg')]">
            ID
          </span>
        </div>
        <Image
          className=" maskNav absolute -top-3 left-24 z-0 "
          // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
          src={mask}
          alt="bg"
        />
      </div>
      <ConnectButton />
    </div>
  );
}
