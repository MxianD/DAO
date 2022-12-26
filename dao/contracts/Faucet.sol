pragma solidity ^0.4.24;

contract Faucet {
    // Define the amount of tokens that will be dispensed by the faucet
    uint256 public tokenAmount;

    // Define the address that will hold the tokens dispensed by the faucet
    address public tokenHolder;

    // Constructor function that is called when the contract is deployed
    constructor() public {
        tokenAmount = 100;
        tokenHolder = msg.sender;
    }

    // Function that allows users to claim tokens from the faucet
    function claim() public {
        // Check if the caller is the token holder
        require(
            msg.sender == tokenHolder,
            "Only the token holder can claim tokens from the faucet"
        );

        // Transfer the tokens to the caller
        tokenHolder.transfer(tokenAmount);
    }
}
