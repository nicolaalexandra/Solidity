const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contract with acconut: ", deployer.address);
    console.log("Account balance: ", (await deployer.getBalance()).toString());

    const alexandraToken = await hre.ethers.getContractFactory("AlexandraToken");
    const token = await alexandraToken.deploy(50000000000);

    await token.deployed();

    console.log("Token address: ",token.address);

    await hre.run("verify:verify", {
        address: token.address,
        constructorArguments: [50000000000]
    });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});