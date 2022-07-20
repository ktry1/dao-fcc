const { ethers, network } = require("hardhat");

const { FUNCTION, PROPOSED_STORE_VALUE, developmentChains, MIN_DELAY } = require("../helper-hardhat-config"); 
const {moveTime} = require("../utils/move-time");
const {mineBlocks} = require("../utils/move-blocks");

const description = `Store the value ${PROPOSED_STORE_VALUE} in the box`;

 async function queueAndExecute() {
    const args = [PROPOSED_STORE_VALUE];
    const box = await ethers.getContract("Box");
    const encodedFunctionCall = box.interface.encodeFunctionData(FUNCTION, args);
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description));
    
    const governor = await ethers.getContract("GovernorContract");
    console.log("Queueing...");
    const queueTx = await governor.queue([box.address], [0], [encodedFunctionCall], descriptionHash); 
    await queueTx.wait(1);
    
    if (developmentChains.includes(network.name)){
        await moveTime(MIN_DELAY + 100);
        await mineBlocks(1);
    }

    console.log("Executing...");
    const executeTx = await governor.execute([box.address], [0], [encodedFunctionCall], descriptionHash);
    await executeTx.wait(1);

    const boxNewValue = await box.getValue();
    console.log(`New Box Value is ${boxNewValue.toString()}`);
}

queueAndExecute()
.then(()=>{process.exit(0)})
.catch((error)=>{
    console.log(error);
    process.exit(1);
});