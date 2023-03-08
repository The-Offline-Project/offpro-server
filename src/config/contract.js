const nearAPI = require("near-api-js");

const connectionConfig = {
  networkId: "testnet",
  // keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

// connect to NEAR
const nearConnection = async () =>
  await nearAPI.connect({
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
  });
// const nearConnection = async () => await connect(connectionConfig);

// create wallet connection
// ? this function requires three arguments including a public key and amount
const account = async () => await nearConnection("efarma_marketplace.testnet");
// console.log("🚀 ~ account", account);

// const walletConnection = () => new WalletConnection(nearConnection);

module.exports = {
  nearConnection,
  account,
};
