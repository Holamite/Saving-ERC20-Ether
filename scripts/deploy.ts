import { ethers } from "hardhat";

async function main() {
  const InitialAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

  const ERC20 = await ethers.deployContract("ERC20Token", [
    InitialAddress,
    "HolamiteToken",
    "HOT",
  ]);

  await ERC20.waitForDeployment();

  console.log(`Contract has been deployed to ${ERC20.target}`);

  const saving = await ethers.deployContract("Saving");

  await saving.waitForDeployment();

  console.log(`Contract has been deployed to ${saving.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
