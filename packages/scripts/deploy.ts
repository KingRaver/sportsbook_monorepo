import * as fs from "fs";
import hre from "hardhat";
import * as path from "path";
import { formatEther, getContract, isAddress } from "viem";

async function main() {
    console.log("\n🚀 Deploying PredictionMarket Contract");
    console.log("═".repeat(60));

    // Get deployment parameters from environment
    const GNOSIS_SAFE_ADDRESS = process.env.GNOSIS_SAFE_ADDRESS;
    const USDT_ADDRESS = process.env.USDT_ADDRESS || "0x66e428c3f67a68a47b7bc798c2c77b519b79260d"; // Cronos Testnet default

    // Validation
    if (!GNOSIS_SAFE_ADDRESS) {
        throw new Error("❌ GNOSIS_SAFE_ADDRESS is required in .env file");
    }

    if (!isAddress(GNOSIS_SAFE_ADDRESS)) {
        throw new Error("❌ GNOSIS_SAFE_ADDRESS is not a valid Ethereum address");
    }

    if (!isAddress(USDT_ADDRESS)) {
        throw new Error("❌ USDT_ADDRESS is not a valid Ethereum address");
    }

    console.log("\n📋 Deployment Configuration:");
    console.log(`   Network:           ${hre.network.name}`);
    console.log(`   Gnosis Safe:       ${GNOSIS_SAFE_ADDRESS}`);
    console.log(`   USDT Address:      ${USDT_ADDRESS}`);

    // Get deployer account
    const publicClient = await hre.viem.getPublicClient();
    const [walletClient] = await hre.viem.getWalletClients();

    if (!walletClient?.account) {
        throw new Error("❌ No deployer account available");
    }

    const deployerAddress = walletClient.account.address;
    console.log(`   Deployer:          ${deployerAddress}`);

    // Get deployer balance
    const balance = await publicClient.getBalance({ address: deployerAddress });
    console.log(`   Balance:           ${formatEther(balance)} CRO`);

    if (balance === 0n) {
        throw new Error("❌ Deployer account has no balance. Fund your account with testnet CRO.");
    }

    // Deploy PredictionMarket contract
    console.log("\n1️⃣  Deploying PredictionMarket contract...");
    console.log("   Compiling...");

    const predictionMarketArtifact = await hre.artifacts.readArtifact("PredictionMarket");

    console.log("   Deploying...");
    const deployHash = await walletClient.deployContract({
        abi: predictionMarketArtifact.abi,
        bytecode: predictionMarketArtifact.bytecode as `0x${string}`,
        args: [GNOSIS_SAFE_ADDRESS, USDT_ADDRESS]
    });

    console.log("   Waiting for confirmation...");
    const receipt = await publicClient.waitForTransactionReceipt({
        hash: deployHash,
        confirmations: 1
    });

    if (receipt.status !== "success" || !receipt.contractAddress) {
        throw new Error("❌ Contract deployment failed");
    }

    const contractAddress = receipt.contractAddress;
    const predictionMarket = getContract({
        address: contractAddress,
        abi: predictionMarketArtifact.abi,
        client: { public: publicClient, wallet: walletClient }
    });

    console.log(`   ✅ Deployed at: ${contractAddress}`);
    console.log(`   Transaction:   ${receipt.transactionHash}`);
    console.log(`   Gas used:      ${receipt.gasUsed.toString()}`);

    // Verify deployment on chain
    console.log("\n2️⃣  Verifying contract on chain...");
    const code = await publicClient.getCode({ address: contractAddress });

    if (code === "0x") {
        throw new Error("❌ No contract code found at deployment address");
    }

    console.log("   ✅ Contract code verified");

    // Read contract details
    console.log("\n3️⃣  Verifying constructor parameters...");

    // Try to read stored values if contract has getters
    try {
        const storedGnosisSafe = await predictionMarket.read.gnosisSafe();
        const storedUSDT = await predictionMarket.read.usdt();

        console.log(`   ✅ Gnosis Safe stored: ${storedGnosisSafe}`);
        console.log(`   ✅ USDT stored:       ${storedUSDT}`);

        if (storedGnosisSafe.toLowerCase() !== GNOSIS_SAFE_ADDRESS.toLowerCase()) {
            console.warn("   ⚠️  WARNING: Gnosis Safe address mismatch");
        }

        if (storedUSDT.toLowerCase() !== USDT_ADDRESS.toLowerCase()) {
            console.warn("   ⚠️  WARNING: USDT address mismatch");
        }
    } catch (error) {
        console.log("   ℹ️  Could not verify stored values (contract may not expose getters)");
    }

    // Generate environment variables for frontend
    console.log("\n4️⃣  Generating environment variables...");

    const envVars = {
        NEXT_PUBLIC_CONTRACT_ADDRESS: contractAddress,
        NEXT_PUBLIC_USDT_ADDRESS: USDT_ADDRESS,
        NEXT_PUBLIC_GNOSIS_SAFE_ADDRESS: GNOSIS_SAFE_ADDRESS,
    };

    console.log("\n📝 Add these to your /apps/web/.env.local:");
    console.log("─".repeat(60));
    Object.entries(envVars).forEach(([key, value]) => {
        console.log(`${key}=${value}`);
    });
    console.log("─".repeat(60));

    // Save deployment info to file
    const deploymentInfo = {
        network: hre.network.name,
        chainId: await publicClient.getChainId(),
        contractAddress,
        gnosisSafe: GNOSIS_SAFE_ADDRESS,
        usdtAddress: USDT_ADDRESS,
        deployedBy: deployerAddress,
        deploymentTx: receipt.transactionHash,
        deploymentBlock: receipt.blockNumber,
        timestamp: new Date().toISOString(),
    };

    const deploymentPath = path.join(__dirname, "..", "deployment.json");
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));

    console.log(`\n💾 Full deployment info saved to: ${deploymentPath}`);

    // Final summary
    console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");
    console.log("═".repeat(60));
    console.log(`Contract Address:      ${contractAddress}`);
    console.log(`Network:               ${hre.network.name}`);
    console.log(`Deployment Block:      ${receipt.blockNumber}`);
    console.log(`Transaction Hash:      ${receipt.hash}`);
    console.log("═".repeat(60));

    // Mainnet warning
    if (hre.network.name === "cronos" || hre.network.name === "mainnet") {
        console.log("\n⚠️  MAINNET DEPLOYMENT DETECTED");
        console.log("   Please verify contract details before proceeding");
    }

    console.log("\n✅ Next steps:");
    console.log("   1. Copy the environment variables above to /apps/web/.env.local");
    console.log("   2. Update your homepage to link to /predict route");
    console.log("   3. Test betting on testnet first");
    console.log("   4. Deploy to production\n");
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Deployment failed:");
        console.error(error.message || error);
        process.exit(1);
    });
