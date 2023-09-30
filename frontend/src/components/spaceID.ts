const SID = require("@siddomains/sidjs").default;
const SIDfunctions = require("@siddomains/sidjs");
const ethers = require("ethers");

async function resolveDomainBNBTest(name: string): Promise<{
  address: any;
}> {
  const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress("97"),
  });
  const address = await sid.name(name).getAddress(); // 0x123
  console.log("name: %s, address: %s", name, address);
  return address;
}

async function resolveDomainBNB(name: string): Promise<{
  address: any;
}> {
  const rpc = "https://binance.llamarpc.com";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress("56"),
  });
  const address = await sid.name(name).getAddress(); // 0x123
  console.log("name: %s, address: %s", name, address);
  return address;
}

async function resolveDomainARB(name: string): Promise<{
  arbitrum1_address: any;
  arbirum_nova_address: any;
}> {
  const rpc = "https://arb1.arbitrum.io/rpc"; //Arbitrum One rpc
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chainId = 42161; //Arbitrum One chain id
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress(chainId),
  });
  const arbitrum1_address = await sid.name(name).getAddress("ARB1");
  const arbirum_nova_address = await sid.name(name).getAddress("ARB_NOVA");

  console.log("name: %s,arb1 address: %s", name, arbitrum1_address);
  console.log("name: %s,arb_nova address: %s", name, arbirum_nova_address);
  return {
    arbitrum1_address,
    arbirum_nova_address,
  };
}

async function resolveDomianETH(name: `0x${string}`): Promise<{
  address: any;
}> {
  const rpc = "https://eth.llamarpc.com";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chainId = 1;
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress(chainId),
  });
  const address = await sid.name(name).getAddress();
  console.log("name: %s, address: %s", name, address);
  return address;
}

async function revResolveBNBTest(address: `0x${string}`): Promise<{
  address: any;
}> {
  const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chainId = "97";
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress(chainId),
  });

  const name = await sid.getName(address);
  console.log("name: %s, address: %s", name, address);
  return name;
}

async function revResolveBNB(address: `0x${string}`): Promise<{
  name: any;
}> {
  const rpc = "https://binance.llamarpc.com";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chainId = "56";
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress(chainId),
  });

  const name = await sid.getName(address);
  console.log("name: %s, address: %s", name, address);
  return name;
}

async function revResolveARB(address: `0x${string}`): Promise<{
  name: any;
}> {
  const rpc = "https://arb1.arbitrum.io/rpc";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chainId = 42161; //Arbitrum One chain id
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress(chainId),
  });
  const name = await sid.getName(address);
  console.log("name: %s, address: %s", name, address);
  return name;
}

async function revResolveETH(address: `0x${string}`): Promise<{
  name: any;
}> {
  const rpc = "https://eth.llamarpc.com";
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chainId = 1;
  const sid = new SID({
    provider,
    sidAddress: SIDfunctions.getSidAddress(chainId),
  });
  const name = await sid.getName(address);
  console.log("name: %s, address: %s", name, address);
  return name;
}
