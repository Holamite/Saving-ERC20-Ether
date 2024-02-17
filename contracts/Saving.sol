// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract Saving {
    address owner;
    address token;

    mapping (address => uint256) savingsETH;
    mapping (address => mapping(address => uint256)) savingsToken;

    constructor() {
        owner = msg.sender;
    }

       modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function saveEther() public payable{
        require(msg.sender != address(0), "Not an address zero");
        require(msg.value >=  0, "Can not save )0 value");

        savingsETH[msg.sender] += msg.value;
    }

    function withdrawEther(uint amount) external {
       require(amount == 0, "Can not withdraw 0 ether");
       require(savingsETH[msg.sender] >= amount, "Insufficient savings" );

       payable(msg.sender).transfer(amount);

       savingsETH[msg.sender] -= amount;
    }

    function saveToken( uint256 _amount) external{
        require(msg.sender != address(0), "Not an address zero");
        require(_amount >= 0, "Can not save )0 value");
        require(IERC20(token).balanceOf(msg.sender) >= _amount, "not enough token" );
        require(IERC20(token).transferFrom(msg.sender, address(this), _amount));

        savingsToken[msg.sender][token] += _amount;
    }

    function withdrawToken( uint256 _amount) external{
        require(msg.sender != address(0), "Address Zero detected");
       require(_amount >= 0, "can't withdraw zero value");
       require(IERC20(token).transfer(msg.sender, _amount), "Failed to withdraw");

       savingsToken[msg.sender][token] -= _amount;
    }

    function withdrawAllEther()external onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawAllToken() external onlyOwner{
        require(IERC20(token).transfer(owner, IERC20(token).balanceOf(address(this))), "Token transfer failed!");
    }
}