// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

interface IThoughtEdition {
    struct ThoughtEdition {
        string title;
        string imageURI;
        string contentURI;
        uint256 price;
        address paymentERC20Addr;
        uint256 createdAt;
        uint256 totalPurchased;
    }

    event ThoughtEditionPurchased(address indexed clone, uint256 tokenId, address indexed recipient, uint256 price, address paymentERC20Addr);

    function initialize(address _owner, ThoughtEdition memory edition) external;
    function safeMint(address to) external;
    function purchase() external payable;
    function purchaseERC20() external;
    function setBaseURI(string memory uri) external;
    function getContentURI() external view returns (string memory);
    function getEdition() external view returns (ThoughtEdition memory);
    function setBlacklisted(bool val) external;
    function updateEdition(string memory _contentURI, string memory _imageURI) external;
}