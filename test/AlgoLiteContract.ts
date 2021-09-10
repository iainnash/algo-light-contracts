import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AlgoLite, AlgoLiteFactory } from "../typechain";

describe("AlgoLite", () => {
  describe("with a serial", () => {
    let signer: SignerWithAddress;
    let signerAddress: string;
    let algoLiteInstance: AlgoLite;
    beforeEach(async () => {
      const { AlgoLite } = await deployments.fixture(["AlgoLite"]);
      algoLiteInstance = AlgoLiteFactory.connect(AlgoLite.address, signer);

      signer = (await ethers.getSigners())[0];
      signerAddress = await signer.getAddress();
    });

    it("mints randomly", async () => {
      const tx = await algoLiteInstance.mint(signerAddress);
      const receipt = await tx.wait();
      const transfer = receipt.events?.find((x) => x.event === "Transfer");
      // @ts-ignore
      const tokenId = transfer?.args[2];
      console.log("minted token ", tokenId.toNumber());
      expect(await algoLiteInstance.ownerOf(tokenId)).to.be.equal(
        signerAddress
      );
    });
    it("stops after mints are complete", async () => {
      for (let i = 0; i < 10; i++) {
        const tx = await algoLiteInstance.mint(signerAddress);
        const receipt = await tx.wait();
        const transfer = receipt.events?.find((x) => x.event === "Transfer");
        // @ts-ignore
        const tokenId = transfer?.args[2];
        console.log("minted token ", tokenId.toNumber());
        expect(await algoLiteInstance.ownerOf(tokenId)).to.be.equal(
          signerAddress
        );
      }
      expect(algoLiteInstance.mint(signerAddress)).to.be.revertedWith(
        "Sold out"
      );
    });
    it("only mints from approved accounts", async () => {
      const [_, signer1] = await ethers.getSigners();

      expect(
        algoLiteInstance.connect(signer1).mint(await signer1.getAddress())
      ).to.be.revertedWith("Not approved");
    });
  });
  describe("with a full set", () => {
    it("mints a full set", async () => {
      const signerAddress = await (await ethers.getSigners())[0].getAddress();
      const algoLiteFactory = (await ethers.getContractFactory(
        "AlgoLite"
      )) as AlgoLiteFactory;
      const algoLiteInstance = await algoLiteFactory.deploy(
        "Algo-Lite Full",
        "ALIGHTFULL",
        "https://bar.com/co",
        2400
      );
      for (let i = 0; i < 2400; i++) {
        const tx = await algoLiteInstance.mint(signerAddress);
        const receipt = await tx.wait();
        const transfer = receipt.events?.find((x) => x.event === "Transfer");
        // @ts-ignore
        const tokenId = transfer?.args[2];
        console.log("minted token ", tokenId.toNumber());
        expect(await algoLiteInstance.ownerOf(tokenId)).to.be.equal(
          signerAddress
        );
      }
      expect(algoLiteInstance.mint(signerAddress)).to.be.revertedWith(
        "Sold out"
      );
    });
  });
});
