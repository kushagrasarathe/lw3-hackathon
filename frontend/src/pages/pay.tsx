"use client";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { onChange } from "@material-tailwind/react/types/components/select";
import React, { useState } from "react";

export default function Pay() {
  const [amount, setAmount] = useState<number | null>(null);
  const [receiver, setReceiver] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const parsedNumber = parseFloat(inputValue);

    if (!isNaN(parsedNumber)) {
      setAmount(parsedNumber);
    } else {
      setAmount(null);
    }
  };

  const handleReceiverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setReceiver(inputValue);
  };

  const handleTokenChange = (event: any) => {
    const newValue = event.target.value;

    if (newValue) {
      setSelectedToken(newValue);
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center ">
      <div className=" bg-white w-6/12 max-w-xl gap-y-5 flex flex-col items-center justify-center border border-borderPrimary rounded-xl p-8">
        <div className=" text-lg mb- self-start">
          Transfer funds to any SpaceID owner
        </div>
        <Input
          crossOrigin={false}
          size="lg"
          label="Enter receiver's SpaceID"
          name="receiver"
          type="text"
          value={receiver || ""}
          onChange={handleReceiverChange}
        />
        <label className=" self-start -mb-3" htmlFor="">
          {" "}
          Select Token
        </label>
        <select
          className=" w-full p-3 bg-transparent border border-gray-400 rounded-lg"
          value={selectedToken}
          onChange={handleTokenChange}
        >
          <option defaultChecked value="">
            Select an option
          </option>
          <option value="usdc">USDC</option>
          <option value="usdt">USDT</option>
          <option value="eth">ETH</option>
          <option value="matic">MATIC</option>
        </select>
        {/* {selectedToken && (
          <p className=" text-black text-xl">You selected: {selectedToken}</p>
        )} */}
        <Input
          crossOrigin={false}
          size="lg"
          label="Enter Amount"
          name="amount"
          type="number"
          value={amount || ""}
          onChange={handleAmountChange}
          className=" p-3 rounded-md bg-transparent border border-borderPrimary w-full ring-0 outline-none text-black"
        />

        <Button
          variant="gradient"
          color="blue"
          fullWidth
          className=" text-base text-white tracking-wide font-normal"
        >
          Transfer Funds
        </Button>
      </div>
    </div>
  );
}
