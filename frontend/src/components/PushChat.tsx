// Import Push SDK & Ethers
import { PushAPI } from "@pushprotocol/restapi";
import { createSocketConnection, EVENTS } from "@pushprotocol/socket";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { providers } from "ethers";
import { ENV } from "@pushprotocol/socket/src/lib/constants";

const PushChat = () => {
  const [signer, setSigner] = useState<any>();

  const getWallet = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const [address] = await provider.listAccounts();
    const signer = provider.getSigner(address);
    console.log(signer);
    setSigner(signer);
    return signer;
  };

  const startChat = async (peerAddress:any) => {
    const signer = await getWallet();
    setSigner(signer)
    const userAddress = await PushAPI.initialize(signer, { env: ENV.STAGING });
    console.log(userAddress);
    const pushSDKSocket = createSocketConnection({
      user: signer._address,
      socketType: "chat",
      socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
      env: ENV.STAGING,
    });

    pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
      console.log(message);
    });

    return userAddress
  };

  const Message = async (peerAddress: string) => {
    const message = await signer.chat.send(peerAddress, {
      content: "Gm gm! It's a me... Mario",
    });
    console.log(message);
  };

  const fetchChats = async (peerAddress: any) => {
      const signer = await startChat(peerAddress)
      const chats = await signer.chat.history(peerAddress);
    console.log(chats);
  };

  const acceptRequest = async (peerAddress: any) => {
    const request = await signer.chat.accept(peerAddress);
    console.log(request);
  };

  return (
    <div>
      <button
        onClick={() => Message("0x9B855D0Edb3111891a6A0059273904232c74815D")}
      >
        message
      </button>
      <button
        onClick={() => fetchChats("0x9B855D0Edb3111891a6A0059273904232c74815D")}
      >
        fetch
      </button>
      <button
        onClick={() => acceptRequest("0x9B855D0Edb3111891a6A0059273904232c74815D")}
      >
        accept
      </button>
      <button
        onClick={() => startChat("0x9B855D0Edb3111891a6A0059273904232c74815D")}
      >
        start
      </button>
    </div>
  );
};

export default PushChat;
