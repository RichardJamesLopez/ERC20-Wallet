//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
 * @title ERC20 Mint
 * @author Rich Cuellar-Lopez
 * @notice This contract was used to mint the tokens that are stored in the ContractProxy
 * ERC20 OpenZepplin contract args feed into the same contractLogic from OZ
 */


contract Token is ERC20 {
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }


    constructor(string memory _name, string memory _symbol, address _account, uint _totalSupply) ERC20(_name, _symbol) {
      owner = msg.sender;
      _mint(_account, _totalSupply); //supply is arbitrarily set for each one
  }
}
