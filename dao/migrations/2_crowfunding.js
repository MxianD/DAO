const crowd = artifacts.require("../contracts/Crowdfunding");

module.exports = function(deployer) {
    deployer.deploy(crowd);
};