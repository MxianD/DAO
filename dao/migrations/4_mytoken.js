var MyToken = artifacts.require("../contracts/MyToken");

module.exports = function(deployer) {
    // Deploy the METoken contract as our only task
    deployer.deploy(MyToken);
};