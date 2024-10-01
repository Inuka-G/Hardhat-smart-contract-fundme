import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY: any = process.env.PRIVATE_KEY
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  }
};

export default config;
