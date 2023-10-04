import React from 'react'
import { Chat } from "@pushprotocol/uiweb";
import { providers } from "ethers";

const Chatx = () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  return (
    <div>
        <input></input>
        <Chat
          account="0x72D7968514E5e6659CeBB5CABa7E02CFf8eda389"
          supportAddress="0x9B855D0Edb3111891a6A0059273904232c74815D"
          signer = {signer}
          env="dev"
        />
    </div>
  )
}

export default Chatx