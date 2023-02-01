const { getSigner, Social } = require("./social.js");

// Get Signer using private key & provider
const PRIVATE_KEY = "0xd634ba22f6e979735b7f300eeaf89025f446fa9b7c5c3d08d578e659b81e9992";
const MATIC_PROVIDER = "https://rpc-mumbai.maticvigil.com";

const signer = getSigner(PRIVATE_KEY, MATIC_PROVIDER);

// Initialize Social
const social = new Social(signer);

// Create Account
const createAccountTx = async (name, pfpHash, bio) => {
    let txHash = await social.createAccount(name, pfpHash, bio);
    console.log(txHash);
}

// Create Post
const createPost = async (text, mediaHash, mediaSource, hashTagArray) => {
    let txHash = await social.createPost(text, mediaHash, mediaSource, hashTagArray);
    console.log(txHash);
}

// Display Post with Account Name
const getAccountPosts = async (name) => {
    const postLength = await social.getUserPostInfoLen(name);

    let postArray = []
    for (let i = 0; i < postLength; i++) {
        let post = await social.getPostInfoFromName(name, i);
        postArray.push(post);
    }
    console.log(postArray);
}


// createAccountTx("yujin", "this", "hello");
// createPost(
//     "This is Yujin!", "https://kpopping.com/documents/06/3/800/IVE-Yujin-x-CLIO-2023-documents-1.jpeg?v=6c309", "uri", ["yujin", "kpop"]
// );

getAccountPosts("yujin");