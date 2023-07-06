const hre = require("hardhat");

async function main() {

    await hre.run("verify:verify", {
        address: "0x9aA8C8286B03C3963ed4A5210D7a927bE559d93E",
        constructorArguments: [50000000000]
    });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});