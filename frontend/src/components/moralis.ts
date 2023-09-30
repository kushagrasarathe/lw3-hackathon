import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {
  ARB_CONTRACT,
  BNB_CONTRACT,
  ENS_CONTRACT,
} from "@/constants/contracts";
import { EvmChainish } from "moralis/common-core";

Moralis.start({
  apiKey: "8jm7oAF328P1mSXJmbLRqybViO1jTvakuRCqNjhqwqXu96FeJxFPT290ezEXmfbA",
});
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
  const eth_response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: EvmChain.ETHEREUM,
  });

  const eth_result = eth_response.toJSON().result;
  const eth_result_final = await eth_result.filter((token) => {
    return (
      `${token.token_address.toLowerCase()}` == `${ENS_CONTRACT.toLowerCase()}`
    );
  });

  const bnb_response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: EvmChain.BSC,
  });

  const bnb_result = bnb_response.toJSON().result;
  const bnb_result_final = bnb_result.filter((token) => {
    return token.token_address.toLowerCase() == BNB_CONTRACT.toLowerCase();
  });

  const arb_response = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain: EvmChain.ARBITRUM,
  });

  const arb_result = arb_response.toJSON().result;
  const arb_result_final = arb_result.filter((token) => {
    return token.token_address.toLowerCase() == ARB_CONTRACT.toLowerCase();
  });

  console.log({
    eth_result_final,
    arb_result_final,
    bnb_result_final,
  });

  // console.log({
  //   eth_result,
  //   arb_result,
  //   bnb_result,
  // });

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

export { getSpaceIDMetadata, getSpaceIDTokensAll, getSpaceIDTokensChain };
