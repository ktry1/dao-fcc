// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable{

    uint256 private s_storedValue;

    event ValueUpdate(uint256);

    function storeValue(uint256 newValue) public onlyOwner{
        s_storedValue = newValue;
    }

    function getValue() public view returns(uint256){
        return s_storedValue;
    }
}