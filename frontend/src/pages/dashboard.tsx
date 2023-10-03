import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import img from "@assets/nft.jpg";
import Card from "@/components/Card";

export default function Dashboard() {
  const [selectedTab, setSlectedTab] = useState("nfts");
  return (
    <div className=" w-full min-h-screen">
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
            <Card img={img} title={"NFT 1"} desc={"NFT Details"} />
          </TabPanel>
          <TabPanel
            className=" mt-5 flex items-center flex-wrap max-w-6xl mx-auto gap-5 justify-center w-full"
            value={"assets"}
          >
                <Card img={img} title={"NFT 1"} desc={"NFT Details"} />
                <Card img={img} title={"NFT 1"} desc={"NFT Details"} />
                <Card img={img} title={"NFT 1"} desc={"NFT Details"} />

          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
