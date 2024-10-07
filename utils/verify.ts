import { run } from "hardhat";

export const verify = async (contractAddress: any, args: any) => {
  // args for contract constructor
  console.log("Verifying contract at address:", contractAddress);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.includes("Contract source code already verified")) {
      console.log("Contract already verified");
    } else {
      console.log(e);
    }
  }
};
