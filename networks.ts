import dotenv from "dotenv";

dotenv.config();

const networks: any = {};

if (process.env.DEV_MNEMONIC) {
  networks.mumbai = {
    chainId: 80001,
    url: "https://rpc-mumbai.maticvigil.com",
    accounts: {
      mnemonic: process.env.DEV_MNEMONIC,
    },
    gasPrice: 8000000000,
  };
  networks.polygon = {
    chainId: 137,
    url: "https://rpc-mainnet.maticvigil.com",
    accounts: {
      mnemonic: process.env.DEV_MNEMONIC,
    },
  };
  if (process.env.RINKEBY_RPC) {
    networks.rinkeby = {
      chainId: 4,
      url: process.env.RINKEBY_RPC,
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
      },
    };
  }
  if (process.env.MAINNET_RPC) {
    networks.mainnet = {
      chainId: 1,
      url: process.env.MAINNET_RPC,
      accounts: [ process.env.PROD_PRIVATE_KEY ],
    };
  }
}

export default networks;