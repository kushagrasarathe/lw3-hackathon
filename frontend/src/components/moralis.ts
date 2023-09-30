import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {
  ARB_CONTRACT,
  BNB_CONTRACT,
  ENS_CONTRACT,
} from "@/constants/contracts";
import { EvmChainish } from "moralis/common-core";

interface TokenReturnTyepe {
  token_address: string;
  contract_type: string;
  name: string;
  symbol: string;
  possible_spam: boolean;
  verified_collection: boolean;
}

async function getSpaceIDTokensAll(address: `0x${string}`): Promise<{
  eth_result: TokenReturnTyepe[];
  arb_result: TokenReturnTyepe[];
  bnb_result: TokenReturnTyepe[];
}> {
  await Moralis.start({
    apiKey: "YOUR_API_KEY",
  });

  const eth_response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: EvmChain.ETHEREUM,
  });

  const eth_result = eth_response.toJSON().result;
  eth_result.filter((token) => {
    token.token_address == ENS_CONTRACT;
  });

  const bnb_response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: EvmChain.BSC,
  });

  const bnb_result = bnb_response.toJSON().result;
  bnb_result.filter((token) => {
    token.token_address == BNB_CONTRACT;
  });

  const arb_response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: EvmChain.ARBITRUM,
  });

  const arb_result = arb_response.toJSON().result;
  arb_result.filter((token) => {
    token.token_address == ARB_CONTRACT;
  });

  return {
    eth_result,
    arb_result,
    bnb_result,
  };
}

async function getSpaceIDTokensChain(
  address: `0x${string}`,
  chain: any
): Promise<TokenReturnTyepe[] | undefined> {
  await Moralis.start({
    apiKey: "YOUR_API_KEY",
  });

  const response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: chain,
  });

  let contractAddress: `0x${string}`;

  if (chain == EvmChain.ETHEREUM) {
    contractAddress = ENS_CONTRACT;
  } else if (chain == EvmChain.BSC) {
    contractAddress = BNB_CONTRACT;
  } else if (chain == EvmChain.ARBITRUM) {
    contractAddress = ARB_CONTRACT;
  } else {
    return;
  }

  const result = response.toJSON().result;
  result.filter((token) => {
    token.token_address == contractAddress;
  });

  return result;
}

async function getSpaceIDMetadata(
  address: `0x${string}`,
  tokenId: string,
  chain: any
): Promise<any> {
  await Moralis.start({
    apiKey: "YOUR_API_KEY",
  });

  const response = await Moralis.EvmApi.nft.getNFTMetadata({
    address,
    chain: chain,
    tokenId,
  });

  const result = response?.toJSON();
  return result;
}
