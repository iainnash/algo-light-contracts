import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AlgoLight } from "../typechain";

describe("AlgoLight", () => {
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

  describe("with a serial", () => {
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
      expect(algoLightInstance.mint(signerAddress)).to.be.revertedWith('ERC721: token already minted');
    });
    it("only mints from approved accounts", async () => {});
  });
});
