const hre = require("hardhat");

const ACCCOUNT_ADDRESS = "0x56639dB16Ac50A89228026e42a316B30179A5376";
const EP_ADDRESS = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44";
const PM_ADDRESS = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";

async function main() {
	const account = await hre.ethers.getContractAt("Account", ACCCOUNT_ADDRESS);
	const count = await account.count();
	console.log(count);

	console.log("Account balance", await hre.ethers.provider.getBalance(ACCCOUNT_ADDRESS));

	const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
	console.log("Entry point balance",await ep.balanceOf(ACCCOUNT_ADDRESS));
	console.log("Paymaster balance",await ep.balanceOf(PM_ADDRESS));
}

main().catch((error) => {
	console.error(error);
	process.exitCde = 1;
});
