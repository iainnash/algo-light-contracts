import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AlgoLight, AlgoLightFactory } from "../typechain";

describe("AlgoLight", () => {
  describe("with a serial", () => {
    let signer: SignerWithAddress;
    let signerAddress: string;
    let algoLightInstance: AlgoLight;
    beforeEach(async () => {
      const { AlgoLight } = await deployments.fixture(["AlgoLight"]);
      algoLightInstance = (await ethers.getContractAt(
        "AlgoLight",
        AlgoLight.address
      )) as AlgoLight;

      signer = (await ethers.getSigners())[0];
      signerAddress = await signer.getAddress();
    });

    it("mints randomly", async () => {
      const tx = await algoLightInstance.mint(signerAddress);
      const receipt = await tx.wait();
      const transfer = receipt.events?.find((x) => x.event === "Transfer");
      // @ts-ignore
      const tokenId = transfer?.args[2];
      console.log("minted token ", tokenId.toNumber());
      expect(await algoLightInstance.ownerOf(tokenId)).to.be.equal(
        signerAddress
      );
    });
    it("stops after mints are complete", async () => {
      for (let i = 0; i < 10; i++) {
        const tx = await algoLightInstance.mint(signerAddress);
        const receipt = await tx.wait();
        const transfer = receipt.events?.find((x) => x.event === "Transfer");
        // @ts-ignore
        const tokenId = transfer?.args[2];
        console.log("minted token ", tokenId.toNumber());
        expect(await algoLightInstance.ownerOf(tokenId)).to.be.equal(
          signerAddress
        );
      }
      expect(algoLightInstance.mint(signerAddress)).to.be.revertedWith(
        "Sold out"
      );
    });
    it("only mints from approved accounts", async () => {
      const [_, signer1] = await ethers.getSigners();

      expect(
        algoLightInstance.connect(signer1).mint(await signer1.getAddress())
      ).to.be.revertedWith("Not approved");
    });
  });
  describe("with a full set", () => {
    it("mints a full set", async () => {
      const signerAddress = await (await ethers.getSigners())[0].getAddress();
      const algoLightFactory = (await ethers.getContractFactory(
        "AlgoLight"
      )) as AlgoLightFactory;
      const algoLightInstance = await algoLightFactory.deploy(
        "Algo-Light Full",
        "ALIGHTFULL",
        "https://bar.com/co",
        2400
      );
      for (let i = 0; i < 2400; i++) {
        const tx = await algoLightInstance.mint(signerAddress);
        const receipt = await tx.wait();
        const transfer = receipt.events?.find((x) => x.event === "Transfer");
        // @ts-ignore
        const tokenId = transfer?.args[2];
        console.log("minted token ", tokenId.toNumber());
        expect(await algoLightInstance.ownerOf(tokenId)).to.be.equal(
          signerAddress
        );
      }
      expect(algoLightInstance.mint(signerAddress)).to.be.revertedWith(
        "Sold out"
      );
    });
  });
});
