import { useEffect, useState } from "react";
import { useSubscribe } from "streamr-client-react";
import StreamrClient from "streamr-client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, usePublicClient } from "wagmi";
const { StreamPermission } = require('streamr-client');

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

  const getStream = async(streamId:any) => {
    const stream = await client.getStream(streamId);
    console.log(stream);
  }

  const writeAMessageToStream = async(streamId:string,message:any) => {
    await client.publish(streamId, message, { timestamp: new Date(1546300800123) });
  }

  const grantPermissionToMessage = async (user:string) => {
    await client.grantPermissions({
        user: user,
        permissions: [StreamPermission.PUBLISH],
      });
  }
 
  return (
    <div>
      <ConnectButton />
      <button onClick={() => createStream()}>get</button>
    </div>
  );
};

export default Streamr;
