require('dotenv').config()

const config = {

  testnet: process.env.TESTNET,

  web3: {
    provider: process.env.PROVIDER
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: PROCESS.ENV.REDIS_PASSWORD
  },

  tokenLists: [,
    'https://raw.githubusercontent.com/pangolindex/tokenlists/main/pangolin.tokenlist.json',
    'https://raw.githubusercontent.com/DimensionDev/Mask-Token-List/gh-pages/latest/250/tokens.json',
    'https://unpkg.com/@crocoswap/default-token-list@3.2.1/build/sushiswap-default.tokenlist.json',
    'https://raw.githubusercontent.com/BoggedFinance/Bogged-Token-List/main/avax/tokenlist.json'
  ],

  wavax: {
    "chainId":43114,
    "name":"Wrapped AVAX",
    "symbol":"WAVAX",
    "address":"0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    "decimals":18,
    "logoURI":"https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png"
  },
  solidSEX: {
    "chainId":250,
    "name":"SOLIDsex: Tokenized veSOLID",
    "symbol":"SOLIDSEX",
    "address":"0x41adac6c1ff52c5e27568f27998d747f7b69795b",
    "decimals":18,
    "logoURI":"https://assets.coingecko.com/coins/images/23992/large/solidSEX.png"
  },
  usdc: {
    "chainId":43114,
    "name":"USD Coin",
    "symbol":"USDC",
    "address":"0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "decimals":6,
    "logoURI": "https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/logo.png"

  }

}


module.exports = config
