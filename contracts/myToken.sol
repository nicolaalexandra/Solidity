pragma solidity ^0.5.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract myToken is ERC20{ // we inherit from ERC20

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(uint initialSupply) ERC20("Alexandra's token", "Ale"){
        // msg.sender - the id of the person calling the function
        // solidity does not represent decimal values => scale
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _mint(msg.sender,initialSupply, initialSupply * 10 ** decimals()); // what does mint do?
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE){
        _mint(to,amount);
    }
}
