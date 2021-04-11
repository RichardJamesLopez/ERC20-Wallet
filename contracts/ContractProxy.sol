//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.7.0;


/**
 * @title  Proxy Wallet
 * @author Rich Cuellar
 */
contract ContractProxy {
    address public delegateCallContract;

    /**
    * @dev useful event should the optional transfer of ownership be commented back in
    */
    //event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
    * @dev only one argument to set the address of the delegateCallContract (this Proxy Wallet); commented out other checks and mapping to testnet address that proved to be superfluous
    */
    constructor(address _implementationAddr) {
        delegateCallContract = _implementationAddr;
        //address msgSender = _msgSender();
        //delegateCallContract = msgSender;
        //emit OwnershipTransferred(address(0), msgSender);
      }

      /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

      /**
      * @dev Returns the address of the current owner. Checked by the modifier onlyOwner .
      */
    function owner() public view returns (address) {
         return msg.sender;
    }

    /**
    * @dev Manually sets the address to a potentially different owner.
    */
    function setDelegateCallContract(address contractAddress) public {
        delegateCallContract = contractAddress;
    }

    /**
    * @dev leaving optionality to transfer through bytecode.
    * @notice commented out as it is superfluous to other transfer functions in this and ContractLogic.sol contract
    */
    /*
    function delegateTransfer(address token, uint256 amount, address recipient)
        public {
        string memory sig = "deposit(address,uint256,address)";
        address(delegateCallContract).delegatecall(
            abi.encodeWithSignature(sig, token, amount, recipient)
        );
    }
    */
    function getImplementation() external view returns (address) {
      return delegateCallContract;
    }

    function _implementation() internal view  returns (address) {return delegateCallContract;
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

    receive() external payable {
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
