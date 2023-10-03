"use client";

import { contractABI, contractAddress } from "@/utils/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useAccount, useContractRead } from "wagmi";

export default function Register() {
  const [selectedToken, setSelectedToken] = useState<string>("");

  const { data, isLoading, error } = useContractRead({
    abi: contractABI,
    address: contractAddress,
    functionName: "dasd",
    args: ["", ""],
  });

  const { address, isConnecting, isDisconnected } = useAccount();

  const handleTokenChange = (event: any) => {
    const newValue = event.target.value;

    if (newValue) {
      setSelectedToken(newValue);
    }
  };

  if (isLoading)
    return (
      <div className=" text-center max-w-4xl min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );

  // if (error)
  //   return (
  //     <div className=" max-w-4xl mx-auto text-red-500 text-center min-h-screen flex items-center justify-center text-lg">
  //       Error: {error?.message}
  //     </div>
  //   );

  // console.log(data);
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className=" max-w-xl bg-white w-6/12 border border-borderPrimary mx-auto p-8 rounded-2xl flex flex-col items-center justify-center">
        {!isDisconnected ? (
          <label className=" self-start w-full " htmlFor="space_id">
            Select Your SpaceID
            <select
              name="space_id"
              className=" mt-2 w-full p-3 bg-transparent border border-gray-400 rounded-lg"
              value={selectedToken}
              onChange={handleTokenChange}
            >
              <option defaultChecked value="">
                Select an option
              </option>
              <option value="usdc">USDC</option>
              <option value="usdt">USDT</option>
              <option value="eth">ETH</option>
              <option value="matic">MATIC</option>
            </select>
          </label>
        ) : (
          <div className=" flex flex-col items-center justify-center gap-y-2">
            <h1 className=" text-lg text-center">Please connect your wallet</h1>
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}
