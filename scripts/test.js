const hre = require("hardhat");

const ACCCOUNT_ADDRESS = "0x816e24a66943348d95b40f8437afc8ce5cfc42ab";
const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PM_ADDRESS = "0x0A61DEfe814e78eB8eB95aFb4d18Ab24Ae85E443";

async function main() {
	const account = await hre.ethers.getContractAt("Account", ACCCOUNT_ADDRESS);
	// const count = await account.executeCount();
	// console.log(count);

	// console.log("Account balance", await hre.ethers.provider.getBalance(ACCCOUNT_ADDRESS));

	const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
	// console.log("Entry point balance",await ep.balanceOf(ACCCOUNT_ADDRESS));
	console.log("Paymaster balance",await ep.balanceOf(PM_ADDRESS));
}

main().catch((error) => {
	console.error(error);
	process.exitCde = 1;
});
