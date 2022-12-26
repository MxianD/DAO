pragma solidity ^0.4.24;

import "../node_modules//openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract MyToken {
    using SafeERC20 for *;
    string public name = "My Token";
    string public symbol = "MYT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000;

    mapping(address => uint256) public balanceOf;
    address public owner;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() public {
        owner = msg.sender;
        balanceOf[owner] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(
            allowance[_from][msg.sender] >= _value,
            "Insufficient allowance"
        );
        balanceOf[_from] = balanceOf[_from] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;
        return true;
    }

    function getBalance(address _owner) public view returns (uint256 balance) {
        return balanceOf[_owner];
    }
}
