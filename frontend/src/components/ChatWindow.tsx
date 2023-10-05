import React, { useState, useRef, useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { useAccount } from "wagmi";
import { useCanMessage } from "@xmtp/react-sdk";
import { useCallback } from "react";
import { providers } from "ethers";
import { Client } from "@xmtp/xmtp-js";
import Xmtpchat from "@/components/xmtpchat";
import { getUser } from "./polybase";

export default function ChatWindow() {
  const [peerAddress, setPeerAddress] = useState<any>();
  const convRef = useRef<any>(null);
  const clientRef = useRef<any>(null);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [xmtp_client, setxmtp_client] = useState<any>(null);
  const [users, setUsers] = useState<any>();
  const [chat, setChat] = useState<any>();
  const [messages, setMessages] = useState<any>();
  const [outgoingMessage, setOutgoingMessage] = useState<string>("");
  const [spaceId, setSpaceId] = useState<any>();

  useEffect(() => {
    if (clientRef) {
      setIsOnNetwork(true);
    }
    if (xmtp_client) {
      listConverstaions();
      // fetchAllMessages();
    } else {
      initXmtp();
    }
  }, [xmtp_client]);

  const initXmtp = async () => {
    // @ts-ignore
    const provider = new providers.Web3Provider(window?.ethereum);
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
    if (!xmtpClient) {
      initXmtp();
    }
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    console.log(conversation);
    console.log(conversation.messages());
    convRef.current = conversation;
    await listConverstaions();
  };

  const sendMessage = async () => {
    const xmtpClient = await xmtp_client;
    if (!xmtpClient) {
      initXmtp();
    }
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    await conversation.send(outgoingMessage);
    console.log(conversation);
    await fetchAllMessages(peerAddress);
    setOutgoingMessage("");
  };

  const fetchAllMessages = async (peerAddress: string) => {
    const xmtpClient = await xmtp_client;
    if (!xmtpClient) {
      initXmtp();
    }
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    const messages = await conversation.messages();
    console.log(messages);
    setMessages(messages);
  };

  const listConverstaions = async () => {
    const xmtpClient = await xmtp_client;
    if (!xmtpClient) {
      initXmtp();
    }
    const allConversations = await xmtpClient.conversations.list();
    // for (const conversation of allConversations) {
    //   console.log(`${conversation.peerAddress}`);
    //   setUsers(conversation.peerAddress);
    // }
    console.log(allConversations);
    setUsers(allConversations);
  };

  const setChats = async (e: any) => {
    setPeerAddress(e);
    await fetchAllMessages(e);
  };

  return (
    <div className="flex h-ful h-[90vh] antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-whit flex-shrink-0">
          {/* <div className="flex flex-row items-center justify-start h-12 w-full">
            <div className="ml-2 font-bold text-2xl">SecureID</div>
          </div> */}
          {/* <div className="flex flex-col items-center  border border-gray-200 mt- w-full py-6 px-4 rounded-lg">
            {/* <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">Aminos Co.</div>
            <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
          </div> */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-sm">
              <span className="font-bold">Active Chats</span>
              {/* <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                4
              </span> */}
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[70vh] overflow-y-auto">
              {/* <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                  M
                </div> */}
              <div className="ml-2 text-base font-semibold">
                {users &&
                  users.map((user: any) => {
                    return (
                      <button
                        onClick={() => setChats(user.peerAddress)}
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                      >
                        <span className=" text-base break-words max-w-[200px]">
                          {user.peerAddress}
                        </span>
                      </button>
                    );
                  })}
              </div>
              {/* <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                  2
                </div>*/}

              {/* <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"> */}
            </div>
            <div className="ml-2 text-base font-semibold text-start mt-6">
              Add Chat
            </div>
            {/* </button> */}
            <input
              type="text"
              onChange={(e) => setPeerAddress(e.target.value)}
              placeholder="enter user address"
              className="px-3 py-1 rounded-xl text-black border border-black"
            ></input>
            <button
              onClick={() => startAConversation()}
              className="px-3 py-1 rounded-xl border border-black mt-4"
            >
              add
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bggray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 flex-shrink-0">
                        A
                      </div> */}
                    {/* {messages ? (
                      messages.map((message: any) => {
                        return (
                          <div className="flex flex-row justify-between">
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl mt-3">
                              <div>{message.peerAddress !== peerAddress && message.content}</div>
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl mt-3">
                              <div>{message.peerAddress == peerAddress && message.content}</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )} */}

                    <div className="flex flex-row items-center">
                      <div>
                        {messages ? (
                          messages.map((message: any) => {
                            return (
                              <div>
                                {message.senderAddress != peerAddress &&
                                  message.content && (
                                    <div className="relative mr-3 text-sm text-black py-2 px-4 shadow rounded-xl">
                                      <div>{message.content}</div>
                                    </div>
                                  )}
                              </div>
                            );
                          })
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="relative mr-3 text-sm bg-black text-white py-2 px-4 shadow rounded-xl"> */}

                  <div className="flex flex-row items-center mt-20">
                    <div>
                      {messages ? (
                        messages.map((message: any) => {
                          return (
                            <div>
                              {message.senderAddress == peerAddress &&
                                message.content && (
                                  <div className="relative mr-3 text-sm bg-black text-white py-2 px-4 shadow rounded-xl">
                                    <div>{message.content}</div>
                                  </div>
                                )}
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-black text-white py-2 px-4 shadow rounded-xl">
                        <div>I&#39;m ok what about you?</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Enter your message here..."
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    onChange={(e) => setOutgoingMessage(e.target.value)}
                    value={outgoingMessage}
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => sendMessage()}
                  className="flex transition-all active:scale-95 ease-in-out items-center justify-center bg-black rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
