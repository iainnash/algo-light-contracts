import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  AlgoLite,
  AlgoLiteFactory,
  AlgoLiteSale,
  AlgoLiteSaleFactory,
  TestToken,
  TestTokenFactory,
} from "../typechain";

describe("AlgoLiteSale", () => {
  describe("with a serial", () => {
    let signer: SignerWithAddress;
    let signerAddress: string;
    let algoLiteInstance: AlgoLite;
    let algoLiteSaleInstance: AlgoLiteSale;
    let testTokenInstance: TestToken;
    beforeEach(async () => {
      const { AlgoLite, AlgoLiteSale, TestToken } = await deployments.fixture([
        "TestToken",
        "AlgoLite",
        "AlgoLiteSale",
      ]);
      signer = (await ethers.getSigners())[0];
      signerAddress = await signer.getAddress();

      algoLiteInstance = AlgoLiteFactory.connect(AlgoLite.address, signer);
      algoLiteSaleInstance = AlgoLiteSaleFactory.connect(
        AlgoLiteSale.address,
        signer
      );
      testTokenInstance = TestTokenFactory.connect(TestToken.address, signer);
    });

    it("sells for ETH", async () => {
      await algoLiteInstance.setApprovedMinters([algoLiteSaleInstance.address]);
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      await algoLiteSaleInstance.purchase({
        value: ethers.utils.parseEther("0.1"),
      });
    });
    it("sells for tokens", async () => {
      await algoLiteInstance.setApprovedMinters([algoLiteSaleInstance.address]);
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      expect((await testTokenInstance.balanceOf(signerAddress)).gt("0")).to.be
        .true;
      await testTokenInstance.approve(
        algoLiteSaleInstance.address,
        ethers.utils.parseEther("10")
      );
      await algoLiteSaleInstance.purchaseWithToken();
    });
    it("allows user withdraw of sales tokens", async () => {
      const [_, signer1, signer2] = await ethers.getSigners();

      await algoLiteInstance.setApprovedMinters([algoLiteSaleInstance.address]);
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      expect((await testTokenInstance.balanceOf(signerAddress)).gt("0")).to.be
        .true;
      await testTokenInstance.transfer(
        await signer1.getAddress(),
        ethers.utils.parseEther("400")
      );
      await testTokenInstance.transfer(
        await signer2.getAddress(),
        ethers.utils.parseEther("400")
      );
      await testTokenInstance.approve(
        algoLiteSaleInstance.address,
        ethers.utils.parseEther("10000")
      );
      await algoLiteSaleInstance.purchaseWithToken();
      const startAmount = await testTokenInstance.balanceOf(
        await signer1.getAddress()
      );

      await algoLiteSaleInstance.connect(signer1).withdrawMasterTokens();
      const endAmount = await testTokenInstance.balanceOf(
        await signer1.getAddress()
      );
      console.log({
        startAmount: ethers.utils.formatEther(startAmount),
        endAmount: ethers.utils.formatEther(endAmount),
      });
      expect(endAmount.sub(startAmount).toString()).to.be.equal(
        "400400400400400400"
      );
    });
  });
});
