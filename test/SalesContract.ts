import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  AlgoLight,
  AlgoLightFactory,
  AlgoLightSale,
  AlgoLightSaleFactory,
  TestToken,
  TestTokenFactory,
} from "../typechain";

describe("AlgoLight", () => {
  describe("with a serial", () => {
    let signer: SignerWithAddress;
    let signerAddress: string;
    let algoLightInstance: AlgoLight;
    let algoLightSaleInstance: AlgoLightSale;
    let testTokenInstance: TestToken;
    beforeEach(async () => {
      const { AlgoLight, AlgoLightSale, TestToken } = await deployments.fixture(
        ["TestToken", "AlgoLight", "AlgoLightSale"]
      );
      signer = (await ethers.getSigners())[0];
      signerAddress = await signer.getAddress();

      algoLightInstance = AlgoLightFactory.connect(AlgoLight.address, signer);
      algoLightSaleInstance = AlgoLightSaleFactory.connect(
        AlgoLightSale.address,
        signer
      );
      testTokenInstance = TestTokenFactory.connect(TestToken.address, signer);
    });

    it("sells for ETH", async () => {
      await algoLightInstance.setApprovedMinters([
        algoLightSaleInstance.address,
      ]);
      await algoLightSaleInstance.setSaleNumbers(10, 10);
      await algoLightSaleInstance.purchase({
        value: ethers.utils.parseEther("0.1"),
      });
    });
    it("sells for tokens", async () => {
      await algoLightInstance.setApprovedMinters([
        algoLightSaleInstance.address,
      ]);
      await algoLightSaleInstance.setSaleNumbers(10, 10);
      expect((await testTokenInstance.balanceOf(signerAddress)).gt("0")).to.be
        .true;
      await testTokenInstance.approve(
        algoLightSaleInstance.address,
        ethers.utils.parseEther("10")
      );
      await algoLightSaleInstance.purchaseWithToken();
    });
    it("allows user withdraw of sales tokens", async () => {
      const [_, signer1, signer2] = await ethers.getSigners();

      await algoLightInstance.setApprovedMinters([
        algoLightSaleInstance.address,
      ]);
      await algoLightSaleInstance.setSaleNumbers(10, 10);
      expect((await testTokenInstance.balanceOf(signerAddress)).gt("0")).to.be
        .true;
      console.log("transferring");
      await testTokenInstance.transfer(
        await signer1.getAddress(),
        ethers.utils.parseEther("10")
      );
      await testTokenInstance.transfer(
        await signer2.getAddress(),
        ethers.utils.parseEther("100")
      );
      await testTokenInstance.approve(
        algoLightSaleInstance.address,
        ethers.utils.parseEther("10")
      );
      console.log("transfers doen");
      expect(await algoLightSaleInstance.purchaseWithToken())
        .to.emit("TestToken", "Transfer")
        .withArgs(
          signerAddress,
          ethers.constants.AddressZero,
          ethers.utils.parseEther("1")
        );
      const startAmount = await testTokenInstance.balanceOf(
        await signer1.getAddress()
      );
      console.log(startAmount.toString());

      await algoLightSaleInstance.connect(signer1).withdrawMasterTokens();
      // expect(
      //   (await testTokenInstance.balanceOf(await signer1.getAddress()))
      //     .sub(startAmount)
      //     .gt("0")
      // ).to.be.true;
    });
  });
});
