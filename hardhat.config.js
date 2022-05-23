require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: "0.8.4",
  // networks: {
  //   mumbai: {
  //     url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
  //     accounts: [`0x${process.env.PRIVATE_KEY_DEV}`],
  //   },
  //   mainnet: {
  //     url: `https://polygon-mainnet.infura.io/v3/${process.env.PROJECT_ID}`,
  //     accounts: [`0x${process.env.PRIVATE_KEY_DEV}`],
  //   },
  // },
};
