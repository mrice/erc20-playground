pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract RiceFamilyToken is ERC20, Ownable {
    constructor() public {
        _mint(msg.sender, 100000000000);
    }
}
