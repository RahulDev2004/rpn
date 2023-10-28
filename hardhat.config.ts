import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/c8krbmtqR1jjT66O03bDCBeiafvxmMTB",
      accounts: [
        "ffa3bc8ac0ebea5071eadc1b025408ef071726b814147677a7f96c5c7eb5848b"
      ]
    }
  }
};

export default config;
