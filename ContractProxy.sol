//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.7.0;


/**
 * @title  Proxy Wallet
 * @author Rich Cuellar-Lopez
 */
contract ContractProxy {
    address public delegateCallContract;
    address public owner;
    address public _delegateCallContract;

    /**
    * @dev only one argument to set the address of the delegateCallContract (this Proxy Wallet); commented out other checks and mapping to testnet address that proved to be superfluous
    */
    constructor(address _implementationAddr) {
        delegateCallContract = _implementationAddr;
        owner = msg.sender;
      }


    /**
    * @dev Manually sets the address to a potentially different owner.
    * @notice - this is new functionality to test
    */
    function setDelegateCallContract(address _newLogic) public {
       _delegateCallContract = _newLogic;
    }

    function setOwner(address _newOwner) public {
        owner = _newOwner;
    }

    /**
    * @dev Used the following bytecode in function in order to have an explicit fallback that is contract agnostic.
    @notice payable keyword is removed because we explicitly become payable with ETH through the receive function included
    */
    fallback() external {
            address fallbackAddr = delegateCallContract;

            assembly {
                calldatacopy(0, 0, calldatasize())
                let result := delegatecall(gas(), fallbackAddr, 0, calldatasize(), 0, 0)
                returndatacopy(0, 0, returndatasize())
                switch result
                case 0 { revert(0, returndatasize()) }
                default { return(0, returndatasize()) }
            }
        }

    /**
    @notice function is paired with a fallback function that is NOT payable
    */

    receive() external payable{
      }

      /**
      * @dev Different than the transfer ERC20 function in ContractLogic.sol
      * @ This function can be used in case we want to transact with ETH as gas in the wallet for other transactions. Can be paried with receive() function.
      */
    function transferEther(address payable _recipient,uint _amount)external returns (bool) {
        require(address(this).balance >= _amount, 'Not enough Ether in contract!');
        _recipient.transfer(_amount);
        return true;
      }
}
