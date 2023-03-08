const { InMemorySigner } = require("near-api-js");
const nearAPI = require("near-api-js");

const { connect, keyStores, WalletConnection } = nearAPI;

let connectionConfig = {
  networkId: "testnet",
  // keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  contractName: "efarma_marketplace.testnet",
};

class NearApi {
  config;
  nearApi;
  isInitialized = false;
  keyStore;
  currentNetwork;
  inMemorySigner;
  walletConnection;

  constructor(nearNetwork) {
    this.keyStore = new keyStores.InMemoryKeyStore();
    this.inMemorySigner = new InMemorySigner(this.keyStore);
    this.currentNetwork = nearNetwork;
    this.config = {
      ...connectionConfig,
      // keyStore: this.keyStore,
    };
  }

  get keystore() {
    return this.keyStore;
  }

  async initialize() {
    this.nearApi = await connect(this.config, "my-app");
    this.walletConnection = new WalletConnection(this.nearApi);
    this.isInitialized = true;
    // console.log("🚀 ~ this.walletConnection", this.walletConnection);
  }

  get nativeApi() {
    if (this.nearApi == null) {
      throw new Error("Near API class needs to be initialized first.");
    }

    return this.nearApi;
  }

  printLogs(contractId, logs, prefix = "") {
    for (const log of logs) {
      console.log(`${prefix}BlockLog [${contractId}]: ${log}`);
    }
  }

  /**
   * Invoke a contract view function using the RPC API.
   * @see {@link https://docs.near.org/docs/develop/front-end/rpc#call-a-contract-function}
   *
   * @param contractId NEAR account where the contract is deployed
   * @param methodName The view-only method (no state mutations) name on the contract as it is written in the contract code
   * @param args Any arguments to the view contract method, wrapped in JSON
   * @param options.parse Parse the result of the call. Receives a Buffer (bytes array) and converts it to any object. By default result will be treated as json.
   * @param options.stringify Convert input arguments into a bytes array. By default the input is treated as a JSON.
   * @returns {Promise<any>}
   */
  async viewFunction(
    contractId,
    methodName,
    args = {},
    { parse = parseJsonFromRawResponse, stringify = bytesJsonStringify } = {},
  ) {
    const serializedArgs = stringify(args).toString("base64");

    const result = await this.nativeApi.connection.provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: methodName,
      args_base64: serializedArgs,
      finality: "optimistic",
    });
    if (result.logs) {
      this.printLogs(contractId, result.logs);
    }

    return result.result && result.result.length > 0 && parse(Buffer.from(result.result));
  }
}

module.exports = { NearApi };
