pragma solidity ^0.8.21;
// License
// SPDX-License-Identifier: MIT

contract DataContract {

  address public deployer; // deployer/owner of the contract
  uint256 public price; // initial list price
  string private cid; // either encrypted cid or customer encrypts data for security.
  bool public active; // if false, contract is inactive and no one can purchase access.
  address private adminAddress;  // address of admin who can validate the data.
  uint256 public totalPurchases; // total number of purchases

  mapping(address => bool) public hasAccess;

  constructor(string memory _cid, uint256 _price, address _adminAddress) {
    deployer = msg.sender;
    cid = _cid;
    price = _price;
    active = true;
    adminAddress = _adminAddress;
    totalPurchases = 0;
  }

  event PurchaseEvent(address indexed _buyer, uint256 _price);

  function purchaseAccess() public payable returns (string memory) {
    require(active, "Contract was marked inactive by creator");
    if (price != 0 && !hasAccess[msg.sender]) {
      require(msg.value == price, "Incorrect price, please call contract with nonzero value");
      // Transfer fee to deployer.
      payable(deployer).transfer(msg.value);
      emit PurchaseEvent(msg.sender, price);
      totalPurchases += 1;
    }
    hasAccess[msg.sender] = true;
    return cid;
  }

  function getMetadata() public view returns (string memory, uint256, bool, uint256) {
    return (hasAccess[msg.sender] ? cid : "", price, active, totalPurchases);
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
