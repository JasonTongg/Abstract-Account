const { EntryPoint__factory } = require("@account-abstraction/contracts");
const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
const EP_ADDRESS = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44";
const PM_ADDRESS = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";

async function main() {
	const [signer0, signer1] = await hre.ethers.getSigners();
	const address0 = await signer0.getAddress();

	const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

	const sender = await hre.ethers.getCreateAddress({
		from: FACTORY_ADDRESS,
		nonce: FACTORY_NONCE,
	});

	const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

	//use this init code if we only want to call execute function
	const initCode = "0x";

	//use this init code if we want to call createAccount function
	// const initCode = FACTORY_ADDRESS +
	// AccountFactory.interface
	// 	.encodeFunctionData("createAccount", [address0])
	// 	.slice(2);

	console.log({sender});

	//deposit to the entry point
	// await entryPoint.depositTo(PM_ADDRESS, {
	// 	value: hre.ethers.parseEther("100"),
	// });

	const Account = await hre.ethers.getContractFactory("Account");

	const userOp = {
		sender,
		nonce: await entryPoint.getNonce(sender, 0),
		initCode,
		callData: Account.interface.encodeFunctionData("execute"),
		callGasLimit: 400_000,
		verificationGasLimit: 400_000,
		preVerificationGas: 100_000,
		maxFeePerGas: hre.ethers.parseUnits("20", "gwei"),
		maxPriorityFeePerGas: hre.ethers.parseUnits("10", "gwei"),
		paymasterAndData: PM_ADDRESS,
		signature: "0x",
	};

	const userOpHash = await entryPoint.getUserOpHash(userOp);
	userOp.signature = signer0.signMessage(hre.ethers.getBytes(userOpHash))

	const tx = await entryPoint.handleOps([userOp], address0);
	const receipt = await tx.wait();
	console.log(receipt);
}

main().catch((error) => {
	console.error(error);
	process.exitCde = 1;
});
