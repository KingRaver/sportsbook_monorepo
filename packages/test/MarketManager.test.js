const { expect } = require("chai");
const hre = require("hardhat");
const { getContract, parseEther, zeroAddress } = require("viem");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("MarketManager", function () {
    async function deployContracts() {
        const [owner, user] = await hre.viem.getWalletClients();
        const publicClient = await hre.viem.getPublicClient();

        const positionToken = await hre.viem.deployContract("PositionToken");
        const marketManager = await hre.viem.deployContract("MarketManager", [
            positionToken.address
        ]);

        return { marketManager, positionToken, owner, user, publicClient };
    }

    describe("Market Creation", function () {
        it("Should create market", async function () {
            const { marketManager, publicClient } = await loadFixture(deployContracts);

            const marketId = "test-001";
            const hash = await marketManager.write.createMarket([
                marketId,
                "soccer",
                "Next goal",
                parseEther("1.0"),
                BigInt(Math.floor(Date.now() / 1000) + 3600),
                zeroAddress
            ]);
            await publicClient.waitForTransactionReceipt({ hash });

            const market = await marketManager.read.markets([marketId]);
            expect(market.id).to.equal(marketId);
            expect(market.sport).to.equal("soccer");
        });
    });

    describe("Position Opening", function () {
        it("Should open position", async function () {
            const { marketManager, positionToken, user, publicClient } = await loadFixture(
                deployContracts
            );

            const marketId = "test-position";
            const createHash = await marketManager.write.createMarket([
                marketId,
                "soccer",
                "Test market",
                parseEther("1.0"),
                BigInt(Math.floor(Date.now() / 1000) + 3600),
                zeroAddress
            ]);
            await publicClient.waitForTransactionReceipt({ hash: createHash });

            const stake = parseEther("0.01");
            const odds = parseEther("1.9");
            const marketManagerAsUser = getContract({
                address: marketManager.address,
                abi: marketManager.abi,
                client: { public: publicClient, wallet: user }
            });

            const txHash = await marketManagerAsUser.write.openPosition(
                ["quote-123", marketId, "home", stake, odds],
                { value: parseEther("0.02038") }
            );
            await publicClient.waitForTransactionReceipt({ hash: txHash });

            const balance = await positionToken.read.balanceOf([
                user.account.address,
                1n
            ]);
            expect(balance).to.equal(1n);
        });
    });
});
