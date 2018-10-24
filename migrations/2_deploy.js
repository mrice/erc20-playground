var RiceFamilyToken = artifacts.require("./RiceFamilyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(RiceFamilyToken);
};