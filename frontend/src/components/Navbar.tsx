import { ConnectButton } from "@rainbow-me/rainbowkit";
import mask from "@assets/mask.png";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

const routes = [
  {
    label: "Register",
    path: "/register",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Chat",
    path: "/chat",
  },
  // {
  //   label: "",
  //   path: "",
  // },
];

export default function Navbar() {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div className=" fixedtop-0 bg-[#fed385] bg-[#fcfcff bg-opacity- backdrop-blur-md z-50 w-full flex items-center justify-between px-16 pt-8 pb-3">
      <div className=" text-3xl font-semibold">SecureID</div>
      <div className=" flex items-center justify-between gap-x-6">
        {!isDisconnected ? (
          <div className=" flex items-center justify-between gap-x-6">
            {routes.map((path, idx) => (
              <Link
                className=" tracking-wide text-lg hover:underline hover:transition-all"
                key={idx}
                href={path.path}
              >
                {path.label}
              </Link>
            ))}
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
}
