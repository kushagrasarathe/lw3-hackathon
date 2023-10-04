import { useEffect, useState } from "react";
import { useSubscribe } from "streamr-client-react";
const {
  StreamrClient,
  STREAMR_STORAGE_NODE_GERMANY,
} = require("streamr-client");
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, usePublicClient } from "wagmi";
const { StreamPermission } = require("streamr-client");

const Streamr = () => {
  const [data, setData] = useState();
  const { address, isConnected } = useAccount();
  const provider = usePublicClient();
  const client = new StreamrClient({
    auth: {
      ethereum: window.ethereum,
    },
    encryption: {
      litProtocolEnabled: true,
      litProtocolLogging: false,
    },
  });

  const startSubscribing = (stream: any) => {
    const streamId = stream;
    client.subscribe(
      {
        id: streamId,
        resend: {
          last: 10,
        },
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  };

  const createStream = async (chatName: string) => {
    const stream = await client.createStream({
      id: `${address}/${chatName}`,
    });
    await stream.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY);
    console.log(stream.id);
  };

  const getStream = async (streamId: any) => {
    const stream = await client.getStream(streamId);
    console.log(stream);
  };

  const writeAMessageToStream = async (streamId: string, message: any) => {
    const messages = await client.publish(streamId, message, {
      timestamp: new Date(1546300800123),
    });
    console.log(messages);
  };

  const grantPermissionToMessage = async (streamId: string, user: string) => {
    const permission = await client.setPermissions({
      streamId,
      assignments: [
        {
          user: user,
          permissions: [StreamPermission.PUBLISH, StreamPermission.SUBSCRIBE],
        },
      ],
    });
    console.log(permission);
  };

  const getAllPermissions = async () => {
    const permissions = await client.getPermissions(
      "0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389/chat"
    );
    console.log(permissions);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() =>
          startSubscribing("0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389/chat")
        }
      >
        subscribe
      </button>
      <button onClick={() => createStream("chat")}>create</button>
      <button
        onClick={() =>
          writeAMessageToStream(
            "0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389/chat",
            "ken"
          )
        }
      >
        write
      </button>
      <button
        onClick={() =>
          getStream("0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389/chat")
        }
      >
        get
      </button>
      <button
        onClick={() =>
          grantPermissionToMessage(
            "0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389/chat",
            "0x8d7A86A304890abaA30Ef6a2aAd037531C071D37"
          )
        }
      >
        grant
      </button>
      <button onClick={() => console.log(address)}>address</button>
      <button onClick={() => getAllPermissions()}>permissions</button>
    </div>
  );
};

export default Streamr;
