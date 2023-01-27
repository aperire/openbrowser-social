const { getSigner, Social } = require("./social.js");

// Get Signer using private key & provider
const PRIVATE_KEY = "0xd634ba22f6e979735b7f300eeaf89025f446fa9b7c5c3d08d578e659b81e9992";
const MATIC_PROVIDER = "https://rpc-mumbai.maticvigil.com";

const signer = getSigner(PRIVATE_KEY, MATIC_PROVIDER);
const address = signer.address;


// Initialize Social
const social = new Social(signer);

// Create Account
const createAccountTx = async (name, pfpHash, bio) => {
    let txHash = await social.createAccount(name, pfpHash, bio);
    console.log(txHash);
}

createAccountTx("yujin", "this", "hello");

