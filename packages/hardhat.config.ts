import "@nomicfoundation/hardhat-viem";
import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        cronos: {
            url: process.env.CRONOS_RPC_URL || "https://evm.cronos.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 25
        },
        "cronos-testnet": {
            url: process.env.CRONOS_TESTNET_RPC_URL || "https://evm-t3.cronos.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 338
        },
        hardhat: {
            chainId: 1337
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    etherscan: {
        apiKey: process.env.CRONOSCAN_API_KEY
    }
};

export default config;
