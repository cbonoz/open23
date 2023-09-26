pragma solidity ^0.8.0;
// License
// SPDX-License-Identifier: MIT

contract DataContract {

  address public deployer; // deployer/owner of the contract
  uint256 public price; // list price
  string private cid; // either encrypted cid or customer encrypts data for security.
  bool public active; // if false, contract is inactive and no one can purchase access.
  address private adminAddress;  // address of admin who can validate the data.

  mapping(address => bool) public hasAccess;

  constructor(string memory _cid, uint256 _price, address _adminAddress) {
    deployer = msg.sender;
    cid = _cid;
    price = _price;
    active = true;
    adminAddress = _adminAddress;
  }

  event PurchaseEvent(address indexed _buyer, uint256 _price);

  function purchaseAccess() public payable returns (string memory) {
    require(active, "Contract was marked inactive by creator");
    if (price != 0 && !hasAccess[msg.sender]) {
      require(msg.value == price, "Incorrect price, please call contract with nonzero value");
      // Transfer fee to deployer.
      payable(deployer).transfer(msg.value);
      emit PurchaseEvent(msg.sender, price);
    }
    hasAccess[msg.sender] = true;
    return cid;
  }

  // get price
    function getPrice() public view returns (uint256) {
        return price;
    }

  function getCid() public view returns (string memory) {
    require(hasAccess[msg.sender], "Call purchaseAccess to get cid");
    return cid;
  }

  function changePrice(uint256 _newPrice) public {
    require(msg.sender == deployer);
    price = _newPrice;
  }

  function toggleActive() public {
    require(msg.sender == deployer);
    active = !active;
  }

}
