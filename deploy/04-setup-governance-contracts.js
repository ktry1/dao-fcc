const {deployments,getNamedAccounts, ethers} = require("hardhat");
const {VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE, ADDRESS_ZERO} = require("../helper-hardhat-config");

module.exports = async({deployments,getNamedAccounts})=>{
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;

    const timeLock = await ethers.getContract("TimeLock",deployer);
    const governor = await ethers.getContract("GovernorContract",deployer);

    console.log("Setting up roles...");
    const proposerRole = await timeLock.PROPOSER_ROLE();
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    const proposerTx = await timeLock.grantRole(proposerRole,governor.address);
    await proposerTx.wait(1);
    const executorTx = await timeLock.grantRole(executorRole,ADDRESS_ZERO);
    await executorTx.wait(1);
    const revokeTx = await timeLock.revokeRole(adminRole, deployer);
}