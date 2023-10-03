import { contractABI, contractAddress } from "@/utils/constants";
import React from "react";
import { useContractRead } from "wagmi";

export default function Register() {
  const { data, isLoading, error } = useContractRead({
    abi: contractABI,
    address: contractAddress,
    functionName: "dasd",
    args: ["", ""],
  });

  if (isLoading)
    return (
      <div className=" text-center max-w-4xl min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );

  // if (error)
  //   return (
  //     <div className=" max-w-4xl mx-auto text-red-500 text-center min-h-screen flex items-center justify-center text-lg">
  //       Error: {error?.message}
  //     </div>
  //   );

  // console.log(data);
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className=" w-6/12 border border-borderPrimary mx-auto p-12 rounded-2xl flex items-center justify-center">
        register
      </div>
    </div>
  );
}
