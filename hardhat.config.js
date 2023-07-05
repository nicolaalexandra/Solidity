/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");

//const { INFURA_API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli: {
      url: process.env.ALCHEMY_GOERLI_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    },

    mainnet:{
      url: process.env.ALCHEMY_MAINNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey: process.env.ETHER_SCAN_API_KEY
  }

};