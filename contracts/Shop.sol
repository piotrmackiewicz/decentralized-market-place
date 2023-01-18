// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";

contract Shop {
    uint256 private id;
    address private owner;
    string private name;
    address payable private paymentAddress;
    uint256 private offersCount;
    mapping(uint256 => Offer) private offers;
    uint256 private salesCount;
    mapping(uint256 => Sale) private sales;
    bool private offersSuspended;

    struct Offer {
        uint256 id;
        // contentId is equal to IPFS file id
        string contentId;
        uint256 quantity;
        uint256 price;
        uint256 category;
        bool archived;
    }

    struct Sale {
        uint256 id;
        uint256 offerId;
        address buyer;
        uint256 price;
        uint256 quantity;
    }

    event OfferCreated(
        uint256 id,
        uint256 shopId,
        string title,
        string description,
        string[] images,
        uint256 quantity,
        uint256 price,
        uint256 category
    );

    event SaleCreated(
        uint256 id,
        uint256 offerId,
        address buyer,
        uint256 price,
        uint256 quantity,
        uint256 newQuantity
    );

    event OffersSuspended();

    event OffersUnsuspended();

    event OfferArchived(uint256 id);

    event OfferPriceChanged(uint256 id, uint256 price);

    event OfferContentChanged(
        uint256 id,
        string title,
        string description,
        string contentId
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(
        uint256 _id,
        address _owner,
        string memory _name,
        address payable _paymentAddress
    ) {
        id = _id;
        owner = _owner;
        name = _name;
        paymentAddress = _paymentAddress;
        offersCount = 0;
        salesCount = 0;
        offersSuspended = false;
    }

    function getId() public view returns (uint256) {
        return id;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getPaymentAddress() public view returns (address payable) {
        return paymentAddress;
    }

    function getOffersCount() public view returns (uint256) {
        return offersCount;
    }

    function getSalesCount() public view returns (uint256) {
        return salesCount;
    }

    function getIsOffersSuspended() public view returns (bool) {
        return offersSuspended;
    }

    function getOffer(uint256 _id) public view returns (Offer memory) {
        return offers[_id];
    }

    function getSale(uint256 _id) public view returns (Sale memory) {
        return sales[_id];
    }

    function suspend() public onlyOwner {
        offersSuspended = true;
        emit OffersSuspended();
    }

    function unsuspend() public onlyOwner {
        offersSuspended = false;
        emit OffersUnsuspended();
    }

    function createOffer(
        string memory _title,
        string memory _description,
        string[] memory _images,
        string memory _contentId,
        uint256 _quantity,
        uint256 _price,
        uint256 _category
    ) public onlyOwner {
        offers[offersCount] = Offer({
            id: offersCount,
            contentId: _contentId,
            quantity: _quantity,
            price: _price,
            category: _category,
            archived: false
        });
        emit OfferCreated(
            offersCount,
            id,
            _title,
            _description,
            _images,
            _quantity,
            _price,
            _category
        );
        offersCount++;
    }

    function changeOfferPrice(uint256 _id, uint256 newPrice) public onlyOwner {
        offers[_id].price = newPrice;
        emit OfferPriceChanged(_id, newPrice);
    }

    function changeOfferContent(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _contentId
    ) public onlyOwner {
        offers[_id].contentId = _contentId;
        emit OfferContentChanged(_id, _title, _description, _contentId);
    }

    function archiveOffer(uint256 _id) public onlyOwner {
        offers[_id].archived = true;
        emit OfferArchived(_id);
    }

    receive() external payable {}

    function buyProduct(uint256 _offerId, uint256 _quantity) public payable {
        Offer storage offer = offers[_offerId];
        require(!offersSuspended, "Offers are suspended");
        require(!offer.archived, "Offer is archived");
        require(offer.quantity >= _quantity, "Not enough quantity");
        require(
            msg.value == SafeMath.mul(offer.price, _quantity),
            "Invalid Ether amount"
        );
        (bool sent, ) = paymentAddress.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        uint256 newQuantity = SafeMath.sub(offer.quantity, _quantity);
        offer.quantity = newQuantity;
        sales[salesCount] = Sale({
            id: salesCount,
            offerId: offer.id,
            buyer: msg.sender,
            price: offer.price,
            quantity: _quantity
        });
        emit SaleCreated(
            salesCount,
            offer.id,
            msg.sender,
            offer.price,
            _quantity,
            newQuantity
        );
        salesCount++;
    }
}
