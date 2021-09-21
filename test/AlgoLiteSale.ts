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

      algoLiteInstance = AlgoLite__factory.connect(AlgoLite.address, signer);
      algoLiteSaleInstance = AlgoLiteSale__factory.connect(
        AlgoLiteSale.address,
        signer
      );
      testTokenInstance = TestToken__factory.connect(TestToken.address, signer);
    });

    it("sells for ETH", async () => {
      await algoLiteInstance.setIsApprovedMinter(algoLiteSaleInstance.address, true);
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      await algoLiteSaleInstance.purchase({
        value: ethers.utils.parseEther("0.1"),
      });
    });
    it("sells for tokens", async () => {
      await algoLiteInstance.setIsApprovedMinter(algoLiteSaleInstance.address, true);
      await algoLiteSaleInstance.setSaleNumbers(10, 10);
      expect((await testTokenInstance.balanceOf(signerAddress)).gt("0")).to.be
        .true;
      await testTokenInstance.approve(
        algoLiteSaleInstance.address,
        ethers.utils.parseEther("10")
      );
      await algoLiteSaleInstance.purchaseWithToken();
    });
    it("allows admin withdraw of sales tokens", async () => {
      const [_, signer1, signer2] = await ethers.getSigners();

      await algoLiteInstance.setIsApprovedMinter(algoLiteSaleInstance.address, true);
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
      await testTokenInstance.connect(signer2).approve(
        algoLiteSaleInstance.address,
        ethers.utils.parseEther("10000")
      );
      await algoLiteSaleInstance.purchaseWithToken();
      await algoLiteSaleInstance.purchaseWithToken();
      await algoLiteSaleInstance.connect(signer2).purchaseWithToken();
      const startAmount = await testTokenInstance.balanceOf(signerAddress);

      await algoLiteSaleInstance.connect(signer).withdrawMasterTokens();
      expect(
        ethers.utils.formatEther(
          (await testTokenInstance.balanceOf(signerAddress)).sub(startAmount)
        )
      ).to.equal("3.0");
    });
  });
});
