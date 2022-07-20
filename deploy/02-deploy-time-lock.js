const {deployments,getNamedAccounts, ethers} = require("hardhat");
const {MIN_DELAY} = require("../helper-hardhat-config");

module.exports = async({deployments,getNamedAccounts})=>{
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;
    
    
    const timeLock = await deploy("TimeLock", {
        from:deployer,
        args:[MIN_DELAY,[],[]],
        log:true,
    });

}