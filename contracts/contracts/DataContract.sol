pragma solidity ^0.8.0;
// License
// SPDX-License-Identifier: MIT

contract DataContract {

  address public deployer;
  uint256 public fee;
  string private url; // TODO: move to private FEVM.
  bool public active;
  mapping(address => bool) public hasAccess;

  constructor(string memory _url, uint256 _fee) {
    deployer = msg.sender;
    url = _url;
    fee = _fee;
    active = true;
  }

  function purchaseAccess() public payable {
    require(active, "Contract was marked inactive by creator");
    require(msg.value == fee, "Incorrect fee amount");
    // Transfer to deployer.
    payable(deployer).transfer(msg.value);
    hasAccess[msg.sender] = true;
  }

  // get fee
    function getFee() public view returns (uint256) {
        return fee;
    }

  function getUrl(address _address) public view returns (string memory) {
    require(hasAccess[_address], "Call purchaseAccess to get url");
    return url;
  }

  function changeFee(uint256 _newFee) public {
    require(msg.sender == deployer);
    fee = _newFee;
  }

  function toggleActive() public {
    require(msg.sender == deployer);
    active = !active;
  }

}
