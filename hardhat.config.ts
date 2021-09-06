import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-typechain";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import NETWORKS_CONFIG from './networks.private.json';
import apikeys from './apikeys.private.json';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: apikeys.etherscan,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 20, 
  },
  networks: {
    hardhat: {
      // fix metamask
      chainId: 1337,
    },
    ...NETWORKS_CONFIG,
  },
  namedAccounts: {
    deployer: 0,
    purchaser: 1,
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
    timeout: 1000*60*2,
  }
};

export default config;

