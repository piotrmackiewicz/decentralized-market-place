// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./Shop.sol";

contract Market {
    address private owner;
    mapping(uint256 => address) private shops;
    uint256 private shopsCount = 0;

    string[] private categories;

    event CategoryCreated(uint256 id, string name);

    event ShopCreated(
        uint256 id,
        address shopAddress,
        address owner,
        string name,
        address payable paymentAddress
    );

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getCategories() public view returns (string[] memory) {
        return categories;
    }

    function createCategory(string memory _name) public {
        require(msg.sender == owner, "Not deployer");
        emit CategoryCreated(categories.length, _name);
        categories.push(_name);
    }

    function createStore(string memory _name, address payable _paymentAddress)
        public
    {
        Shop shop = new Shop(shopsCount, msg.sender, _name, _paymentAddress);
        shops[shopsCount] = address(shop);
        emit ShopCreated(
            shopsCount,
            address(shop),
            msg.sender,
            _name,
            _paymentAddress
        );
        shopsCount++;
    }

    function getShopsCount() public view returns (uint256) {
        return shopsCount;
    }

    function getShopAddress(uint256 id) public view returns (address) {
        return shops[id];
    }
}
