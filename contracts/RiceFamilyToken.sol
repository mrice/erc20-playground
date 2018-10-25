pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract RiceFamilyToken is StandardToken, Ownable {
    constructor() public {
        totalSupply_ = 100000000000;
        balances[msg.sender] = totalSupply_;
    }
}