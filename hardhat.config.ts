import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";
import networks from "./networks";
import dotenv from "dotenv";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.API_KEY_ETHERSCAN,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 20,
  },
  networks: {
    hardhat: {
      // fix metamask
      chainId: 1337,
    },
    ...networks,
  },
  namedAccounts: {
    deployer: 0,
    purchaser: 1,
    fractionalToken: {
      1: '0xfd8D7dBECd5c083dDe2b828F96be5d16D1188235',
      4: '0xfd8D7dBECd5c083dDe2b828F96be5d16D1188235'
    }
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  mocha: {
    // 2 min timeout
    timeout: 1000 * 60 * 2,
  },
};

export default config;
