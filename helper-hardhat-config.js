const path = require("path");
const networkConfig = {
  default: {
    name: "hardhat",
    fee: "100000000000000000",
    keyHash: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
  },
  31337: {
    name: "localhost",
    fee: "100000000000000000",
    keyHash: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
    ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  42: {
    name: "kovan",
    linkToken: "0xa36085F69e2889c224210F603D836748e7dC0088",
    ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    oracle: "0xc57b33452b4f7bb189bb5afae9cc4aba1f7a4fd8",
    jobId: "d5270d1c311941d0b08bead21fea7747",
    fee: "100000000000000000",
    fundAmount: "100000000000000000", // 0.1
    keepersUpdateInterval: "30",
  },
  4: {
    name: "rinkeby",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    callbackGasLimit: "500000", // 500,000 gas
    mintFee: "10000000000000000", // 0.01 ETH
    subscriptionId: "6656", 
  },
  1: {
    name: "mainnet",
    linkToken: "0x514910771af9ca656af840dff83e8264ecf986ca",
    fundAmount: "0",
    keepersUpdateInterval: "30",
  },
  5: {
    name: "goerli",
    linkToken: "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    fundAmount: "0",
  },
  137: {
    name: "polygon",
    linkToken: "0xb0897686c545045afc77cf20ec7a532e3120e0f1",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    oracle: "0x0a31078cd57d23bf9e8e8f1ba78356ca2090569e",
    jobId: "12b86114fa9e46bab3ca436f88e1a912",
    fee: "100000000000000",
    fundAmount: "100000000000000",
  },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const DECIMALS = 18;
const INITIAL_PRICE = 114042613440;
const MIN_DELAY = 3600;
const VOTING_PERIOD = 5;
const VOTING_DELAY = 1;
const QUORUM_PERCENTAGE = 4;
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const PROPOSED_STORE_VALUE = 75;
const FUNCTION = "storeValue";
const PROPOSALS_FILE = path.resolve("./proposals.json");

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  DECIMALS,
  INITIAL_PRICE,
  MIN_DELAY,
  VOTING_PERIOD,
  VOTING_DELAY,
  QUORUM_PERCENTAGE,
  ADDRESS_ZERO,
  PROPOSED_STORE_VALUE,
  FUNCTION,
  PROPOSALS_FILE
}
