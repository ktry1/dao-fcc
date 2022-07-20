const {deployments,getNamedAccounts, ethers} = require("hardhat");
const {VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE} = require("../helper-hardhat-config");

module.exports = async({deployments,getNamedAccounts})=>{
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;
    
    const timeLockContract = await ethers.getContract("TimeLock");
    const governanceTokenContract = await ethers.getContract("GovernanceToken");

    
    const timeLock = await deploy("GovernorContract", {
        from:deployer,
        args:[governanceTokenContract.address, timeLockContract.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
        log:true,
        gasLimit: 30000000
    });

}