import { Polybase } from "@polybase/client";
// import { Auth } from "@polybase/auth";
import * as eth from "@polybase/eth";

// const auth = new Auth();
const db = new Polybase({
  defaultNamespace:
    "pk/0xf868433a12a9d57e355176a00ee6b5c80ed1fe2c939d81062e0251081994f039d1ce57a55e66571da21ef0466200304dfb18ad7200533c44e83a036b5c088a42/LW3-hackathon",
});

const createUser = async (
  userAddress: `0x${string}`,
  spaceId: string,
  tokenContract: `0x${string}`,
  tokenId: string
) => {
  try {
    db.signer(async (data) => {
      const accounts = await eth.requestAccounts();

      // If there is more than one account, you may wish to ask the user which
      // account they would like to use
      const account = accounts[0];

      return {
        h: "eth-personal-sign",
        sig: await eth.sign(data, account),
      };
    });

    console.log(tokenContract, tokenId);

    await db
      .collection("User2")
      .create([userAddress, spaceId, tokenContract, tokenId]);
  } catch (error) {
    console.log(error);
  }
};

const setERC6551Acc = async (
  userAddress: `0x${string}`,
  erc6551Acc: `0x${string}`
) => {
  try {
    db.signer(async (data) => {
      const accounts = await eth.requestAccounts();

      // If there is more than one account, you may wish to ask the user which
      // account they would like to use
      const account = accounts[0];

      return {
        h: "eth-personal-sign",
        sig: await eth.sign(data, account),
      };
    });

    await db
      .collection("User2")
      .record(userAddress)
      .call("setERC6551", [erc6551Acc]);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (userAddress: string) => {
  try {
    const { data } = await db.collection("User2").record(userAddress).get();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userAddress: `0x${string}`) => {
  try {
    db.signer(async (data) => {
      const accounts = await eth.requestAccounts();

      // If there is more than one account, you may wish to ask the user which
      // account they would like to use
      const account = accounts[0];

      return {
        h: "eth-personal-sign",
        sig: await eth.sign(data, account),
      };
    });

    await db.collection("User2").record(userAddress).call("del");
  } catch (error) {
    console.log(error);
  }
};

export { createUser, setERC6551Acc, getUser, deleteUser };
