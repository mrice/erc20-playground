pragma solidity ^0.4.24;

contract Chores { 
    mapping(address => string) public children;
    uint256 public childCount;

    function addChild(address _address, string _name) 
        public
    {
        children[_address] = _name;
        childCount++;
    }

}