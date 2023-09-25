pragma solidity ^0.8.0;
// License
// SPDX-License-Identifier: MIT

contract DataContract {

  address public deployer;
  uint256 public price;
  string private cid; // TODO: move to private FEVM.
  bool public active;
  address private adminAddress;

  bool public isValidated;

  mapping(address => bool) public hasAccess;

  constructor(string memory _cid, uint256 _price, address _adminAddress) {
    deployer = msg.sender;
    cid = _cid;
    price = _price;
    active = true;
    adminAddress = _adminAddress;
  }

  function purchaseAccess() public payable returns (string memory) {
    require(active, "Contract was marked inactive by creator");
    if (price != 0 && !hasAccess[msg.sender]) {
      require(msg.value == price, "Incorrect price, please call contract with nonzero value");
      // Transfer to deployer.
      payable(deployer).transfer(msg.value);
    }
    hasAccess[msg.sender] = true;
    return cid;
  }

  // get price
    function getPrice() public view returns (uint256) {
        return price;
    }

  function getCid(address _address) public view returns (string memory) {
    require(hasAccess[_address], "Call purchaseAccess to get cid");
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
