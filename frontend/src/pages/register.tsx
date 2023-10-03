"use client";

import { getSpaceIDTokensChain } from "@/components/moralis";
import { revResolve } from "@/components/spaceID";
import { contractABI, contractAddress } from "@/utils/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenboundClient } from "@tokenbound/sdk";
import React, { useState, useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useWalletClient,
  useNetwork,
} from "wagmi";

export default function Register() {
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  const [spaceID, setSpaceID] = useState<string>();

  const [selectedToken, setSelectedToken] = useState<string>("");
  const [tokenData, setTokenData] = useState<{
    tokenContract: string;
    tokenId: string;
  }>();
  const [erc6551Account, setErc6551Account] = useState<`0x${string}`>();

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

  useEffect(() => {
    getSpaceId();
  }, [chain]);

  const getSpaceId = async () => {
    try {
      if (!address) return;
      const data = await revResolve(
        `0xB72a04B01BB80DfD6a42ea8E0907B892286113F2`
      );
      if (data) {
        if (typeof data !== "string") return;
        setSpaceID(data);
        getIDData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIDData = async (idName: string) => {
    try {
      if (!address) return;
      const nftData = await getSpaceIDTokensChain(
        `0xB72a04B01BB80DfD6a42ea8E0907B892286113F2`,
        chain?.id
      );
      if (!nftData) return;
      setTokenData({
        tokenContract: nftData[0].token_address,
        tokenId: nftData[0].token_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registerERC6551 = async () => {
    try {
      if (!walletClient) return;

      const tokenboundClient = new TokenboundClient({
        walletClient,
        chainId: 1,
      });

      if (!tokenData) {
        console.log("TOKEN DATA NOT FOUND");
        return;
      }
      console.log("Creating the Account");
      const account = await tokenboundClient.createAccount({
        tokenContract: tokenData?.tokenContract,
        tokenId: tokenData?.tokenId,
      });

      console.log(account);
      setErc6551Account(account);

      // We have to store this relation somewhere of Space ID with the tokenData and ERC6551 account
    } catch (error) {
      console.log(error);
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
            <br />
            {spaceID && spaceID}
            <br />
            <button
              onClick={() => {
                registerERC6551();
              }}
            >
              Register
            </button>
            {/* {tokenData && tokenData.tokenContract}
            <br />
            {tokenData && tokenData.tokenId} */}
            {/* <select
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
            </select> */}
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
