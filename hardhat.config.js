const path = require('path')
const {extendEnvironment} = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers')
require('hardhat-deploy')
require("@openzeppelin/hardhat-upgrades")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.4.26', // 编译器版本
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.12', // 编译器版本
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.17', // 编译器版本
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.GOERLI_KEY}`,
      accounts: [
      ],
      gas: 5100000,
      gasPrice: 130000000000,
    }
  },
  typechain: {
    outDir: "typechain/truffle",
    target: "truffle-v5",
  },
  gasReporter: {
    enabled: true
  }
}
