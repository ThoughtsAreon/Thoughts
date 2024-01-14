// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./IThoughtEdition.sol";

interface IThoughtEditionFactory {
    struct AuthorDetails {
        string userName;
        string name;
        address walletAddress;
        string description;
    }

    event CloneDeployed(address indexed factory, address indexed owner, address indexed clone);
    event AuthorRegistered(string indexed userName, address indexed authorAddress, string name);
    function createEdition(string memory title, string memory imageURI, string memory contentURI, uint256 price, address paymentERC20Addr) external returns (address clone);
    function getAuthorEditionsCount(address author) external view returns (uint256);
    function getAuthorEdition(address author, uint256 index) external view returns (address);
    function getAuthorEditions(address author) external view returns (address[] memory);
    function registerClaim(address buyer) external;
    function getClaimedEditions(address buyer) external view returns (address[] memory);
    function setBlacklisted(address edition, bool val) external;
}