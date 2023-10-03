"use client";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";

export default function Pay() {
  const [amount, setAmount] = useState<number | null>(null);
  const [receiver, setReceiver] = useState<string | null>(null);

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
        <Select label="Select Version">
          <Option>Material Tailwind HTML</Option>
          <Option>Material Tailwind React</Option>
          <Option>Material Tailwind Vue</Option>
          <Option>Material Tailwind Angular</Option>
          <Option>Material Tailwind Svelte</Option>
        </Select>
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
