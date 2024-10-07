import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { network } from "hardhat";
import { developmentChainsID, networkConfig } from "../hardhat-helper-config";
import { verify } from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;
  let ethUsdPriceFeedAddress: string;
  if (developmentChainsID.includes(chainId)) {
    const mockContract = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = mockContract.address;
  } else {
    ethUsdPriceFeedAddress =
      networkConfig[chainId as keyof typeof networkConfig].ethPriceFeedAddress;
  }
  console.log(ethUsdPriceFeedAddress);
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    // ARGS for the constructor of the contract fundMe
    args: args,
    log: true,
    waitConfirmations: 1,
  });

  if (!developmentChainsID.includes(chainId) && process.env.ETHERSCAN_API_KEY) {
    await verify(fundMe.address, args);
  }
};
func.tags = ["all", "fundMe"];
export default func;
