import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  AlgoLite,
  AlgoLite__factory,
  AlgoLiteSale,
  AlgoLiteSale__factory,
  TestToken,
  TestToken__factory,
} from "../typechain";
import { formatEther, parseEther } from "@ethersproject/units";

describe("AlgoLiteSale", () => {
  describe("with a serial", () => {
    let signer: SignerWithAddress;
    let signerAddress: string;
    let algoLiteInstance: AlgoLite;
    let algoLiteSaleInstance: AlgoLiteSale;
    let testTokenInstance: TestToken;
    beforeEach(async () => {
      const { AlgoLite, TestToken } = await deployments.fixture([
        "AlgoLite",
        "TestToken",
      ]);
      signer = (await ethers.getSigners())[0];
      signerAddress = await signer.getAddress();

      algoLiteInstance = AlgoLite__factory.connect(AlgoLite.address, signer);
      algoLiteSaleInstance = await new AlgoLiteSale__factory(signer).deploy(
        AlgoLite.address,
        TestToken.address
      );
      testTokenInstance = TestToken__factory.connect(TestToken.address, signer);
    });

    it("sells for ETH", async () => {
      await algoLiteInstance.setIsApprovedMinter(
        algoLiteSaleInstance.address,
        true
      );
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      await algoLiteSaleInstance.purchase({
        value: ethers.utils.parseEther("0.1"),
      });
    });
    it("sells for tokens", async () => {
      const [_, signer1] = await ethers.getSigners();
      await algoLiteInstance.setIsApprovedMinter(
        algoLiteSaleInstance.address,
        true
      );
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      const initialBalance = await testTokenInstance.balanceOf(signerAddress);
      expect(initialBalance).to.be.equal("0");
      await testTokenInstance
        .connect(signer1)
        .approve(algoLiteSaleInstance.address, ethers.utils.parseEther("10"));
      await algoLiteSaleInstance.connect(signer1).purchaseWithTokens(1);
      expect(
        ethers.utils.formatEther(
          await testTokenInstance.balanceOf(signerAddress)
        )
      ).to.be.equal("1.0");
      await algoLiteSaleInstance.connect(signer1).purchaseWithTokens(8);
      expect(
        ethers.utils.formatEther(
          await testTokenInstance.balanceOf(signerAddress)
        )
      ).to.be.equal("9.0");
      await expect(
        algoLiteSaleInstance.purchaseWithTokens(2)
      ).to.be.revertedWith("No sale");
      const endBalance = await algoLiteInstance.balanceOf(signerAddress);
      console.log({
        initialBalance: ethers.utils.formatEther(initialBalance),
        endBalance: ethers.utils.formatEther(endBalance),
      });
    });
    it("allows purchase and withdraw of eth", async () => {
      const [_, signer1] = await ethers.getSigners();
      await algoLiteInstance.setIsApprovedMinter(
        algoLiteSaleInstance.address,
        true
      );
      await algoLiteSaleInstance.setSaleNumbers(10, 10);

      expect(
        await ethers.provider.getBalance(algoLiteSaleInstance.address)
      ).to.be.equal(0);
      await algoLiteSaleInstance
        .connect(signer1)
        .purchase({ value: ethers.utils.parseEther("0.1") });
      await algoLiteSaleInstance
        .connect(signer)
        .purchase({ value: ethers.utils.parseEther("0.1") });
      expect(
        await algoLiteInstance.balanceOf(await signer1.getAddress())
      ).to.be.equal(1);
      const originalBalance = await signer.getBalance();
      await algoLiteSaleInstance.withdrawEth();
      expect(
        parseFloat(
          formatEther((await signer.getBalance()).sub(originalBalance))
        )
      ).to.be.approximately(0.2, 0.01);
      expect(
        await ethers.provider.getBalance(algoLiteSaleInstance.address)
      ).to.be.equal(0);
    });
    it("sends tokens after purchase to owner (multisig)", async () => {
      const [_, signer1, signer2] = await ethers.getSigners();

      await algoLiteInstance.setIsApprovedMinter(
        algoLiteSaleInstance.address,
        true
      );
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      expect((await testTokenInstance.balanceOf(signerAddress)).eq("0")).to.be
        .true;
      await testTokenInstance
        .connect(signer1)
        .transfer(await signer2.getAddress(), ethers.utils.parseEther("400"));
      await testTokenInstance
        .connect(signer1)
        .approve(
          algoLiteSaleInstance.address,
          ethers.utils.parseEther("10000")
        );
      await testTokenInstance
        .connect(signer2)
        .approve(
          algoLiteSaleInstance.address,
          ethers.utils.parseEther("10000")
        );

      const startAmount = await testTokenInstance.balanceOf(signerAddress);
      expect(startAmount).to.be.equal(0);
      await algoLiteSaleInstance.connect(signer1).purchaseWithTokens(2);
      expect(
        await algoLiteInstance.balanceOf(await signer1.getAddress())
      ).to.be.equal(2);
      expect(
        await algoLiteInstance.balanceOf(await signer2.getAddress())
      ).to.be.equal(0);
      await algoLiteSaleInstance.connect(signer2).purchaseWithTokens(1);
      expect(
        await algoLiteInstance.balanceOf(await signer2.getAddress())
      ).to.be.equal(1);

      expect(
        ethers.utils.formatEther(
          await testTokenInstance.balanceOf(signerAddress)
        )
      ).to.equal("3.0");
    });
  });
});
