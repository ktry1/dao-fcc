const {PROPOSALS_FILE, developmentChains, VOTING_PERIOD} = require("../helper-hardhat-config");
const {mineBlocks} = require("../utils/move-blocks");

const fs = require("fs");
const { network, ethers } = require("hardhat");
const index = 0;

async function main(proposalIndex){
    const proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE));
    const proposalId = proposals[network.config.chainId][proposalIndex];
    const voteWay = 1;
    const reason = "just for fun";
    const governor = await ethers.getContract("GovernorContract");
    const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
    await voteTx.wait(1);
    
    if(developmentChains.includes(network.name)){
        mineBlocks(VOTING_PERIOD + 1);
    }
    console.log("Ready to execute!");
    const state = await governor.state(proposalId);
    console.log(`State is ${state}`);

}

main(index)
.then(()=>{process.exit(0)})
.catch((error)=>{
    console.log(error);
    process.exit(1);
});