// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
import "./PriceConverter.sol";
error NotOwner();

contract FundMe {
    using PriceConverter for uint256;
    uint256 public constant MININUM_USD_VALUE = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) addressToAmount;
    adress public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate() >= MININUM_USD_VALUE,
            "Didnt sent enough ETH"
        );
        funders.push(msg.sender);
        addressToAmount[msg.sender] = msg.value;
    }

    function widthDraw() public onlyOwner {
        for (int i = 0; i < funders.length(); i++) {
            address funderAddress = funders[i];
            addressToAmount[funderAddress] = 0;
        }
        funders = new address[](0);

        // withdraw the balance to the owner
        // -----------------------------------------

        // msg.sender is the address that call the widthDraw function
        // address(this).balance is the balance(funds) of the contract
        // 3 ways can transfer native currency to a address
        // // transfer
        // payable(msg.sender.transfer(address(this).balance));
        // // send
        // bool isSuccess = payable(msg.sender.send(address(this).balance));
        // require(isSuccess, "Failed to send the funds");
        // call
        (bool isSucessCall /**return from calling func */, ) = payable(
            msg.sender.call{value: address(this).balance}("")
        );
        require(isSucessCall, "Failed to send the funds");
    }

    modifier onlyOwner() {
        // require(msg.sender == i_owner, "You are not the owner");

        // for more gas optimization use this
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

// route to fund() function
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}