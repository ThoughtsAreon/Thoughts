// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ThoughtEdition.sol";
import "./IThoughtEdition.sol";
import "./IThoughtEditionFactory.sol";
import "../standard/Clones.sol";
import "../standard/Ownable.sol";

contract ThoughtEditionFactory is Ownable, IThoughtEditionFactory {
    address public implementation;
    string private editionBaseURI;

    // Mapping to store the editions published by each author
    mapping(address => address[]) public authorToEditions;

    // Mapping to check an edition exists
    mapping(address => bool) public editionExists;

    // Mapping to store buyers of editions
    mapping(address => address[]) public buyerToEditions;

    // Mapping to track used salts
    mapping(bytes32 => bool) public salts;

    // Mapping to authors with their unique usernames
    mapping(string => IThoughtEditionFactory.AuthorDetails) public authors;

    // Mapping to author's address with their unique usernames
    mapping(address => string) public authorAddressToUserName;

    constructor(string memory _editionBaseURI) Ownable(msg.sender) {
        editionBaseURI = _editionBaseURI;
        // Set implementation contract.
        implementation = address(new ThoughtEdition(address(this), _editionBaseURI));
    }

    /// @notice Deploy a new writing edition clone with the sender as the owner.
    function createEdition(string memory title, string memory imageURI, string memory contentURI, uint256 price, address paymentERC20Addr) override external returns (address clone) {
        IThoughtEdition.ThoughtEdition memory edition = IThoughtEdition.ThoughtEdition({
                                                            title: title,
                                                            imageURI: imageURI,
                                                            contentURI: contentURI,
                                                            price: price, 
                                                            paymentERC20Addr: paymentERC20Addr,
                                                            createdAt: block.timestamp,
                                                            totalPurchased: 0
                                                        });
        clone = deployCloneAndInitialize(msg.sender, edition);
        editionExists[clone] = true;
    }

    // Function to create a new blog
    function deployCloneAndInitialize(address owner, IThoughtEdition.ThoughtEdition memory edition) internal returns (address clone) {
        // Generate a unique salt for deterministic deployment
        bytes32 salt = keccak256(abi.encodePacked(owner, edition.title, edition.createdAt, edition.contentURI));

        // Check if the salt has already been used
        require(!salts[salt], "Edition with the same salt already exists");

        // Mark the salt as used
        salts[salt] = true;

        // Use Clones.cloneDeterministic to create a new TaleEdition clone
        clone = Clones.cloneDeterministic(implementation, salt);

        // Initialize the blog with the provided parameters
        ThoughtEdition(clone).initialize(owner, edition);

        // Store the address of the created blog for the author
        authorToEditions[msg.sender].push(clone);

        emit CloneDeployed(msg.sender, owner, clone);

        return clone;
    }

    // Function to get the number of editions published by an author
    function getAuthorEditionsCount(address author) override external view returns (uint256) {
        return authorToEditions[author].length;
    }

    // Function to get the address of a specific edition published by an author
    function getAuthorEdition(address author, uint256 index) override external view returns (address) {
        require(index < authorToEditions[author].length, "Index out of range");
        return authorToEditions[author][index];
    }

    // Function to get the addresses of editions published by an author
    function getAuthorEditions(address author) override external view returns (address[] memory) {
        return authorToEditions[author];
    }

    // Function to check if a username is available
    function isUsernameAvailable(string memory userName) public view returns (bool) {
        return authors[userName].walletAddress == address(0);
    }

    // Function to fetch author details from userName
    function getAuthorDetails(string memory userName) public view returns (IThoughtEditionFactory.AuthorDetails memory) {
        return authors[userName];
    }

    // Function to fetch author details 
    function getAuthorDetailsByAddress() public view returns (IThoughtEditionFactory.AuthorDetails memory) {
        return authors[authorAddressToUserName[msg.sender]];
    }

    // Function to fetch author userName 
    function getAuthorUserName() public view returns (string memory) {
        return authorAddressToUserName[msg.sender];
    }

    // Function to register author
    function registerAuthor(string memory userName, string memory name, string memory description) public {
       require(isUsernameAvailable(userName), "Username is already taken");
        
        IThoughtEditionFactory.AuthorDetails memory author = IThoughtEditionFactory.AuthorDetails({
            userName: userName,
            name: name,
            walletAddress: msg.sender,
            description: description
        });

        authors[userName] = author;
        authorAddressToUserName[msg.sender] = userName;
        emit AuthorRegistered(userName, msg.sender, name);
    }

    // Funtion to register claim
    function registerClaim(address buyer) override external {
        require(editionExists[msg.sender],"This function can olny be called by edition contracts");
        buyerToEditions[buyer].push(msg.sender);
    }

    // Function to get claimed edtions
    function getClaimedEditions(address buyer) override external view returns (address[] memory) {
        return buyerToEditions[buyer];
    }

    // Function to blacklist an edition
    function setBlacklisted(address edition, bool val) override external onlyOwner { 
        IThoughtEdition editionContract = IThoughtEdition(edition);
        editionContract.setBlacklisted(val);
    }
}