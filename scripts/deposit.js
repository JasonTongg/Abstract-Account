const { EntryPoint__factory } = require("@account-abstraction/contracts");
const hre = require("hardhat");

const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PM_ADDRESS = "0x0A61DEfe814e78eB8eB95aFb4d18Ab24Ae85E443";

async function main() {
	const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

    await entryPoint.depositTo(PM_ADDRESS, {
		value: hre.ethers.parseEther("1"),
	});

    console.log(`Deposit to ${PM_ADDRESS} successfull`);
}

main().catch((error) => {
	console.error(error);
	process.exitCde = 1;
});
