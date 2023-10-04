import React, { useState, useRef, useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { useAccount } from "wagmi";
import { useCanMessage } from "@xmtp/react-sdk";
import { useCallback } from "react";
import { providers } from "ethers";
import { Client } from "@xmtp/xmtp-js";

const Xmtpchat = () => {
  const [peerAddress, setPeerAddress] = useState<any>();
  const convRef = useRef<any>(null);
  const clientRef = useRef<any>(null);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [xmtp_client, setxmtp_client] = useState<any>(null);

  useEffect(() => {
    if (clientRef) {
      setIsOnNetwork(true);
    }
  }, []);

  const startChat = async() => {

  }

  const initXmtp = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const [address] = await provider.listAccounts();
    const signer = provider.getSigner(address);
    const xmtp = await Client.create(signer, { env: "production" });

    if (await xmtp?.canMessage(peerAddress)) {
      const conversation = await xmtp.conversations.newConversation(
        peerAddress
      );
      convRef.current = conversation;
      console.log(convRef);
    } else {
      console.log("cant message because is not on the network.");
      //cant message because is not on the network.
    }
    // Set the XMTP client in state for later use
    setIsOnNetwork(!!xmtp.address);
    //Set the client in the ref
    clientRef.current = xmtp;
    setxmtp_client(xmtp);
  };

  const startAConversation = async function () {
    const xmtpClient = await xmtp_client;
    if(!xmtpClient){
      initXmtp()
    }
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    console.log(conversation);
    console.log(conversation.messages());
    convRef.current = conversation;
  };

  const sendMessage = async () => {
    const xmtpClient = await xmtp_client;
    if(!xmtpClient){
      initXmtp()
    }
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    await conversation.send("yoyo");
    console.log(conversation);
  };

  const fetchAllMessages = async () => {
    const xmtpClient = await xmtp_client;
    if(!xmtpClient){
      initXmtp()
    }
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    const messages = await conversation.messages();
    console.log(messages);
  };

  const listConverstaions = async () => {
    const xmtpClient = await xmtp_client;
    if (!xmtpClient) {
      initXmtp();
    }
    const allConversations = await xmtpClient.conversations.list();
    for (const conversation of allConversations) {
      console.log(`Saying GM to ${conversation.peerAddress}`);
    }
  };

  return (
    <div>
      <button
        onClick={() => startAConversation()}
        className="bg-blue-500 text-500 px-3 py-2 rounded-xl font-semibold text-white"
      >
        Connect to XMTP
      </button>
      <button onClick={() => sendMessage()}>send</button>
      <button onClick={() => fetchAllMessages()}>fetch</button>
      <button onClick={() => initXmtp()}>init</button>
      <button onClick={() => listConverstaions()}>list</button>
      <input type="text" onChange={(e) => setPeerAddress(e.target.value)}></input>
    </div>
  );
};

export default Xmtpchat;
