pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract RiceFamilyToken is StandardToken, Ownable {
    constructor() public {
        //symbol = "RICE";
        //name = "RiceFamilyToken";
        //decimals = 18;
        totalSupply_ = 100000000000;

        owner = msg.sender;
        balances[owner] = totalSupply_;
        emit Transfer(address(0), owner, totalSupply_);
    }
}