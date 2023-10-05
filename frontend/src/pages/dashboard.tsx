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
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      getUserData(address);
      getUserNFTs(`0xB72a04B01BB80DfD6a42ea8E0907B892286113F2`);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  const getUserData = async (address: `0x${string}`) => {
    const data = await getUser(address);
    setSpaceID(data?.spaceId);
    if (!walletClient) return;
    if (!chain) return;
    const tokenboundClient = new TokenboundClient({
      walletClient,
      chainId: chain?.id,
    });

    const tokenBoundAccount = tokenboundClient.getAccount({
      tokenContract: data.tokenContract,
      tokenId: data.tokenId,
    });

    console.log(tokenBoundAccount);
    if (tokenBoundAccount) {
      setErc6551Account(tokenBoundAccount);
    }
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
      <h1 className=" text-center mt-24 text-lg">
        User Current SpaceID:{" "}
        <span className=" underline">{spaceID && spaceID}</span>
      </h1>
      <h1 className=" text-center mt-4 text-lg">
        ERC6551 tokenBoundAccount:{" "}
        <span className=" underline">{erc6551Account && erc6551Account}</span>
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
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                {/* <span className="sr-only text-lg text-black">Loading...</span> */}
              </div>
            )}
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
