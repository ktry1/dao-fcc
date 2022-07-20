const {deployments,getNamedAccounts, ethers} = require("hardhat");



module.exports = async({deployments,getNamedAccounts})=>{
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;
    
    const box = await deploy("Box", {
        from:deployer,
        args:[],
        log:true,
    });

    const timeLock = await ethers.getContract("TimeLock");
    const boxContract = await ethers.getContract("Box");
    const transferTx = await boxContract.transferOwnership(timeLock.address);
    await transferTx.wait(1);
    console.log("Ownership Transfered");
}