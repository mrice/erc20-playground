var RiceFamilyToken = artifacts.require("./RiceFamilyToken.sol");
var Chores = artifacts.require("./Chores.sol");

module.exports = function(deployer) {
  deployer.deploy(RiceFamilyToken);
  deployer.deploy(Chores);
};