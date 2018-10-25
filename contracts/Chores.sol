pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract Chores {
    mapping(address => string) public children;
    uint256 public childCount;
    IERC20 familyTokenContract;

    event AllowanceReleased(address child, uint tokens);

    function setFamilyTokenContract(address _location)
        public
    {
        //TODO - put some guards in this!
        familyTokenContract = IERC20(_location);
    }

    function addChild(address _address, string _name)
        public
    {
        children[_address] = _name;
        childCount++;
    }

    function releaseAllowance(address _child, uint tokens)
        public
    {
        bool result = familyTokenContract.transfer(_child, tokens);
        if (result) {
            emit AllowanceReleased(_child, tokens);
        }
    }

}