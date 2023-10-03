import { Abi } from "viem";

export const contractABI: Abi = [
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const contractAddress = "0x9Cc7F1F85D83022bf1263343A758F56f0f215b60";
