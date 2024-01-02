var ERC721Contract = artifacts.require("./standard/Observability.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC721Contract);
};
