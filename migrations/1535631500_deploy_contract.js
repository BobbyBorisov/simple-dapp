const storageContract = artifacts.require('./StorageContract')

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
    deployer.deploy(storageContract)
};
