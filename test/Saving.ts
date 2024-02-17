import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Saving", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySaving() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const tokenName = "Holamite";
    const tokenSymbol = "HOT";

    const ERC20 = await ethers.getContractFactory("ERC20Token");

    const erc20 = await ERC20.deploy(owner.address, tokenName, tokenSymbol);

    const Saving = await ethers.getContractFactory("Saving");
    const saving = await Saving.deploy(erc20.getAddress());

    return { saving, erc20, otherAccount, owner };
  }

  describe("Deployment", function () {
    it("Should not deploy ERC20 to be address(0)", async function () {
      const { erc20 } = await loadFixture(deploySaving);

      expect(erc20.target).to.not.equal(0);
    });

    it("Should not deploy Saving to be address(0)", async function () {
      const { saving } = await loadFixture(deploySaving);

      expect(saving.target).to.not.equal(0);
    });
  });

  // describe("saveEther", function () {
  //   it("Should be able to check if token is deposited", async function () {
  //     const { saving, erc20, otherAccount } = await loadFixture(deploySaving);
  //     const depositValue = ethers.parseUnits("1", 18);

  //     await erc20.transfer(otherAccount.address, depositValue);

  //     await erc20.connect(otherAccount).approve(saving.target, depositValue);
  //     await saving.connect(otherAccount).saveEther();

  //     // const userBalance = await saving.checkUserBalance(otherAccount.address);

  //     expect(otherAccount).to.equal(depositValue);
  //   });

  //   // it("Should be able to check if Owner can deposit token", async function () {
  //   //   const { saveERC20, erc20, owner } = await loadFixture(
  //   //     deployContractSaveERC20
  //   //   );
  //   //   const depositValue = ethers.parseUnits("1", 18);

  //   //   await erc20.approve(saveERC20.target, depositValue);

  //   //   await saveERC20.deposit(depositValue);

  //   //   const userBalance = await saveERC20.checkUserBalance(owner.address);

  //   //   expect(userBalance).to.equal(depositValue);
  //   // });

  //   // it("Should not be able deposit zero token value", async function () {
  //   //   const { saveERC20 } = await loadFixture(deployContractSaveERC20);

  //   //   expect(saveERC20.deposit(0)).to.be.revertedWith(
  //   //     "Zero token cannot be saved"
  //   //   );
  //   // });
  // });
});
