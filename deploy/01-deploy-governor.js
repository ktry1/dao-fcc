const {deployments,getNamedAccounts, ethers} = require("hardhat");


module.exports = async({deployments,getNamedAccounts})=>{
    const {deployer} = await getNamedAccounts();
    const {deploy} = deployments;
    
    const governanceToken = await deploy("GovernanceToken", {
        from:deployer,
        args:[50000000000],
        log:true,
    });



    const delegate = async (governanceTokenAddress, delegatedAccount)=>{
        const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
        const tx = await governanceToken.delegate(delegatedAccount);
        await tx.wait(1);
        const numCheckpoints = await governanceToken.numCheckpoints(delegatedAccount); 
        console.log(`Number of checkpoints for the user is ${numCheckpoints}`);
    }

    await delegate(governanceToken.address, deployer);
    console.log("delegated");
}