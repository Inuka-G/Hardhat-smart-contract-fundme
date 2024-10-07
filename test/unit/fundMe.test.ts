import { deployments, ethers, getNamedAccounts } from "hardhat";
import { assert, expect } from "chai";
describe("FundMe", () => {
  let fundMe: any;
  let deployerData;
  let MockV3Aggregator: any;
  beforeEach(async () => {
    // fixture is deploying  all deploy scripts using tags
    await deployments.fixture(["all"]);
    const { deployer } = await getNamedAccounts();
    deployerData = deployer;
    // alternatively use ethers.getSigners() to get all signers
    // get the contract instance
    fundMe = await ethers.getContractAt("FundMe", deployer);
    MockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployer);
  });
  describe("constructor", () => {
    it("check the aggregator address correctly ", async () => {
      const response = await fundMe.priceFeedContract;
      assert.equal(response.address, MockV3Aggregator.address);
    });
  });
  describe("fund", () => {
    it("Fails if eth not enough", async () => {
      // when testing for failed transactions, use expect

      await fundMe.fund({ value: 0 });
        await expect(fundMe.fund({ value: 0 })).to.be.revertedWith(
          "Didnt sent enough ETH"
        );
    });
  });
});
