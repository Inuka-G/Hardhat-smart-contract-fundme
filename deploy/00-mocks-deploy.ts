import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChainsID } from "../hardhat-helper-config";
const DECIMALS = "18";
const INITIAL_PRICE = "2000000000000000000000"; // 2000
const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: any = network.config.chainId;
  // If we are on a local development network, we need to deploy mocks!
  if (developmentChainsID.includes(chainId)) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });
    log("Mocks Deployed!");
    log("----------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );

    log("-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#");
  }
};
export default deployMocks;
deployMocks.tags = ["all", "mocks"];
