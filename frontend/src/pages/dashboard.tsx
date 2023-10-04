import { TokenboundClient } from "@tokenbound/sdk";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import img from "@assets/nft.jpg";
import Card from "@/components/Card";
import { useAccount, useWalletClient, useNetwork } from "wagmi";
import { parseEther } from "viem";
import { getUser } from "@/components/polybase";
import Moralis from "moralis";

Moralis.start({
  apiKey: "8jm7oAF328P1mSXJmbLRqybViO1jTvakuRCqNjhqwqXu96FeJxFPT290ezEXmfbA",
});

export default function Dashboard() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  const [erc6551Account, setErc6551Account] = useState<`0x${string}`>();
  const [spaceID, setSpaceID] = useState<string>();
  const [nftData, setNftData] = useState<any[]>();

  const sendTransaction = async (
    to: `0x${string}`,
    value: number,
    data: string
  ) => {
    if (!walletClient) return;
    if (!chain) return;

    const tokenboundClient = new TokenboundClient({
      walletClient,
      chainId: chain?.id,
    });
    if (!erc6551Account) return;

    const executedCall = await tokenboundClient.executeCall({
      account: erc6551Account,
      to: to,
      value: parseEther(value.toString()),
      data: data,
    });

    console.log(executedCall);
  };

  useEffect(() => {
    if (address) {
      getUserData(address);
      getUserNFTs(`0xB72a04B01BB80DfD6a42ea8E0907B892286113F2`);
    }
  }, []);

  const getUserData = async (address: `0x${string}`) => {
    const data = await getUser(address);
    setSpaceID(data?.spaceId);
  };

  const getUserNFTs = async (address: `0x${string}`) => {
    const eth_response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain: chain?.id,
    });

    const eth_result = eth_response.toJSON().result;
    console.log(eth_result);
    setNftData(eth_result);
  };

  return (
    <div className=" w-full min-h-screen">
      <h1 className=" text-center mt-16 text-lg">
        User Current SpaceID:{" "}
        <span className=" underline">{spaceID && spaceID}</span>
      </h1>
      <div className=" text-center mt-4 text-lg">
        User Wallet Balance: <span className=" underline">500 USDC</span>
      </div>
      <Tabs className=" mt-12 " value="nfts">
        <TabsHeader className=" max-w-xl mx-auto">
          <Tab value={"nfts"}>
            <div className="flex items-center gap-2">NFTs</div>
          </Tab>
          <Tab value={"assets"}>
            <div className="flex items-center gap-2">Assets</div>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel
            className=" mt-5 flex items-center flex-wrap max-w-6xl mx-auto gap-5 justify-center w-full"
            value={"nfts"}
          >
            {nftData ? (
              nftData.map((nft) => (
                <Card img={img} title={nft.name} desc={"NFT Details"} />
              ))
            ) : (
              <a>No NFTs found</a>
            )}

            {/* <Card img={img} title={"NFT 1"} desc={"NFT Details"} /> */}
          </TabPanel>
          <TabPanel
            className=" mt-5 flex items-center flex-wrap max-w-6xl mx-auto gap-5 justify-center w-full"
            value={"assets"}
          >
            <Card img={img} title={"Asset 1"} desc={"Asset Details"} />
            <Card img={img} title={"Asset 2"} desc={"Asset Details"} />
            <Card img={img} title={"Asset 3"} desc={"Asset Details"} />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
