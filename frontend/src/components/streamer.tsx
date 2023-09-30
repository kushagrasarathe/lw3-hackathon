import { useEffect, useState } from "react";
import { useSubscribe } from "streamr-client-react";
import StreamrClient from "streamr-client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, usePublicClient } from "wagmi";

const Streamr = () => {
  const [data, setData] = useState();
  const { address, isConnected } = useAccount();
  const provider = usePublicClient();
  const client = new StreamrClient({
    auth: {
        ethereum: window.ethereum,
    },
  });

  const startSubscribing = () => {
    const streamId =
      "0x8ed334e44265a0c89b7739cb66a8f19675a5fc7a/ultrasound.money/fees/burn-categories";
    client.subscribe(streamId, (message: any) => {
      console.log(message);
    });
  };

  const createStream = async () => {
    const stream = await client.createStream({
      id: `${address}/fyi`,
    });
    console.log(stream.id);
  };

  return (
    <div>
      <ConnectButton />
      <button onClick={() => createStream()}>get</button>
    </div>
  );
};

export default Streamr;
