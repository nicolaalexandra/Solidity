const {expect} = require('chai')
const {ethers} = require('hardhat')
const hre = require("hardhat");

describe("Ale", function(){

    let token;
    let owner;
    let recipient;
    const otherAddress = "0xbD82a2DA7A3F547D316be8572D5F7Ba77eF71A0A";

    beforeEach(async function(){
        const alexandraToken = await hre.ethers.getContractFactory("AlexandraToken");
        token = await alexandraToken.deploy(10);
        [owner, recipient] = await ethers.getSigners();
    });

    it("should return the total supply", async function () {

        //await token.deployed();

        const totalSupply = await token.totalSupply();

        let expected = BigInt("10000000000000000000");
        expect(totalSupply).to.equal(expected);
    });

    it("can transfer successfully", async function(){

        // check initial balances
        let ownerBalance = await token.balanceOf(owner.address);
        let recipientBalance = await token.balanceOf(recipient.address);
        expect(ownerBalance).to.equal(BigInt("10000000000000000000"));
        expect(recipientBalance).to.equal(0);

        await token.transfer(recipient.address, 2); // send tokens

        ownerBalance = await token.balanceOf(owner.address);
        recipientBalance = await token.balanceOf(recipient.address);
        expect(ownerBalance).to.equal(BigInt("9999999999999999998"));
        expect(recipientBalance).to.equal(2);
    });

    it("try to transfer more than having", async function(){

        await expect(token.transfer(recipient.address, BigInt("10000000000000000001"))).to.be.revertedWith('ERC20: transfer amount exceeds balance')
    });

    it("transfer from owner to recipient and then to someone else", async function(){

        await token.transfer(recipient.address, 2);
        expect(await token.balanceOf(recipient.address)).to.equal(2);

        // now send to someone else
        await token.connect(recipient).transfer(otherAddress, 1);

        expect(await token.balanceOf(recipient.address)).to.equal(1);
        expect(await token.balanceOf(otherAddress)).to.equal(1);
    });

    it("transfer on behalf of the owner", async function(){
       // await token.transfer(recipient.address,10);
        await token.approve(recipient.address,5); // recipient can spend 5 on behalf of the owner

        await token.connect(recipient).transferFrom(owner.address, otherAddress,3);

        expect(await token.balanceOf(recipient.address)).to.equal(0);
        expect(await token.balanceOf(otherAddress)).to.equal(3);

        // try to send more than you can
        await expect(token.connect(recipient).transferFrom(owner.address,otherAddress, 10)).to.be.revertedWith('ERC20: insufficient allowance')
    });
});