import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AlgoLite, AlgoLite__factory } from "../typechain";

describe("AlgoLite", () => {
  describe("with a serial", () => {
    let signer: SignerWithAddress;
    let signerAddress: string;
    let algoLiteInstance: AlgoLite;
    beforeEach(async () => {
      const { AlgoLite } = await deployments.fixture(["AlgoLite"]);
      algoLiteInstance = await AlgoLite__factory.connect(
        AlgoLite.address,
        signer
      );

      signer = (await ethers.getSigners())[0];
      signerAddress = await signer.getAddress();
    });

    it("goes first", () => {
      // TODO(iain): figure out deployemtn race condition to remove dummy test
      // fixes bug in next test with deployment delay issue
      expect(true).to.be.true;
    });

    it("returns interfaces correctly", async () => {
      expect(await algoLiteInstance.supportsInterface("0x2a55205a")).to.be.true;
      expect(await algoLiteInstance.supportsInterface("0x01ffc9a7")).to.be.true;
      expect(await algoLiteInstance.supportsInterface("0x80ac58cd")).to.be.true;
    });

    it("specifies correct base URL", async () => {
      await expect(algoLiteInstance.tokenURI(1)).to.be.revertedWith("NO TOKEN");
      const tx = await algoLiteInstance.mint(signerAddress);
      const receipt = await tx.wait();
      const transfer = receipt.events?.find((x) => x.event === "Transfer");
      // @ts-ignore
      const tokenId = transfer?.args[2];
      console.log("minted token ", tokenId.toNumber());
      const uri = await algoLiteInstance.tokenURI(tokenId);
      expect(uri).to.be.equal(
        `https://buo7dhteahrnurg7h3oysx3ldezloaopronrtnyssqfbvqsamqfa.arweave.net/DR3xnmQB4tpE3z7diV9rGTK3Ac-Lmxm3EpQKGsJAZAo/${tokenId}.json`
      );
    });
    it("sets initial uri correctly", async () => {
      const uri = await algoLiteInstance.tokenURI(0);
      expect(uri).to.be.equal(
        "https://buo7dhteahrnurg7h3oysx3ldezloaopronrtnyssqfbvqsamqfa.arweave.net/DR3xnmQB4tpE3z7diV9rGTK3Ac-Lmxm3EpQKGsJAZAo/0.json"
      );
    });

    it("mints randomly", async () => {
      console.log("starts minting randomly");
      const tx = await algoLiteInstance.mint(signerAddress);
      console.log("on mint");
      const receipt = await tx.wait();
      const transfer = receipt.events?.find((x) => x.event === "Transfer");
      // @ts-ignore
      const tokenId = transfer?.args[2];
      console.log("minted token ", tokenId.toNumber());
      console.log("ends minting randomly");
      expect(await algoLiteInstance.ownerOf(tokenId)).to.be.equal(
        signerAddress
      );
    });
    it("mints genesis to owner", async () => {
      expect(await algoLiteInstance.balanceOf(signerAddress)).to.be.eq(1);
      expect(await algoLiteInstance.ownerOf(0)).to.be.eq(signerAddress);
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
      ).to.be.revertedWith("not approved");
      await algoLiteInstance.setIsApprovedMinter(
        await signer1.getAddress(),
        true
      );
      await algoLiteInstance.connect(signer1).mint(await signer1.getAddress());
      expect(
        await algoLiteInstance.balanceOf(await signer1.getAddress())
      ).to.be.equal(1);
    });
  });
  describe("with a full set", () => {
    xit("mints a full set", async () => {
      const signerAddress = await (await ethers.getSigners())[0].getAddress();
      const algoLiteFactory = (await ethers.getContractFactory(
        "AlgoLite"
      )) as AlgoLite__factory;
      const algoLiteInstance = await algoLiteFactory.deploy(
        "Algo-Lite Full",
        "ALIGHTFULL",
        "https://bar.com/co",
        2400,
        signerAddress
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
