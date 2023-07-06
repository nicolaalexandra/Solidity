pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AlexandraToken is ERC20, AccessControl{ // we inherit from ERC20

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(uint initialSupply) ERC20("Alexandra's token", "Ale"){
        // msg.sender - the id of the person calling the function
        // solidity does not represent decimal values => scale
        //_grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        //_grantRole(MINTER_ROLE, msg.sender);
        _mint(msg.sender,initialSupply * 10 ** decimals()); // what does mint do?
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
