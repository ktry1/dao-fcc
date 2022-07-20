const { ethers, network } = require("hardhat");
const {PROPOSED_STORE_VALUE,FUNCTION, developmentChains, PROPOSALS_FILE, VOTING_DELAY} = require("../helper-hardhat-config");
const {mineBlocks} = require("../utils/move-blocks");
const fs = require("fs");


async function propose(value, functionToCall){
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");


    let ABI = [
        "function storeValue(uint256 newValue)"
    ];
    let iface = new ethers.utils.Interface(ABI);
    const calldata = iface.encodeFunctionData(functionToCall, [value]);

    const proposalTx = await governor.propose([box.address], [0], [calldata], `Store the value ${value} in the box`);
    const proposalReceipt = await proposalTx.wait(1);
    
    if(developmentChains.includes(network.name)){
       await mineBlocks(VOTING_DELAY + 1);
    }

    const proposalId = proposalReceipt.events[0].args.proposalId;

    let proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE,"utf8"));
    proposals[network.config.chainId.toString()].push(proposalId.toString());
    fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals));
    

}

propose(PROPOSED_STORE_VALUE, FUNCTION)
.then(()=>{process.exit(0)})
.catch((error)=>{
    console.log(error);
    process.exit(1);
});