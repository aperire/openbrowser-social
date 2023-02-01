const { ethers } = require("ethers");
const { contract } = require("./contract.js");

const getSigner = (PRIVATE_KEY, MATIC_PROVIDER) => {
    const provider = ethers.getDefaultProvider(MATIC_PROVIDER);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    return signer;
}

class Social {
    constructor(signer) {
        this.contract = new ethers.Contract(
            contract.address,
            contract.abi,
            signer
        );
    }
    // Assist
    getPostInfoArrayLen = async () => {
        const postInfoArrayLen = await this.contract.getPostInfoArrayLen();
        return postInfoArrayLen;
    }

    getHashTagPostInfoLen = async (hashTag) => {
        const hashTagPostInfoLen = await this.contract.getHashTagPostInfoLen(hashTag);
        return hashTagPostInfoLen;
    }

    getUserPostInfoLen = async (name) => {
        const userPostInfoLen = await this.contract.getUserPostInfoLen(name);
        return userPostInfoLen;
    }

    // View
    getNameOwner = async (name) => {
        const nameOwner = await this.contract.nameOwnerMap(name);
        return nameOwner;
    }

    getUserAccount = async (address) => {
        const userAccount = await this.contract.userAccountMap(address);
        return userAccount;
    }

    getPostInfoFromArray = async (index) => {
        const PostInfoHash = await this.contract.postInfoArray(index);
        return PostInfoHash;
    }

    getPostInfoFromHashtag = async (hashTag, index) => {
        const PostInfoHash = await this.contract.hashTagPostInfoMap(hashTag, index);
        return PostInfoHash;
    }

    getPostInfoFromName = async (name, index) => {
        const PostInfoHash = await this.contract.userPostInfoMap(name, index);
        return PostInfoHash
    }


    // Transactions
    createAccount = async (name, pfpHash, bio) => {
        const tx = await this.contract.createAccount(
            name, pfpHash, bio
        );
        const txHash = await tx.hash;
        await tx.wait();
        return txHash;
    }

    editAccount = async (pfpHash, bio) => {
        const tx = await this.contract.editAccount(
            pfpHash, bio
        );
        const txHash = await tx.hash;
        await tx.wait();
        return txHash;
    }

    transferAccountOwnership = async (newOwner) => {
        const tx = await this.contract.transferAccountOwnership(
            newOwner
        );
        const txHash = await tx.hash;
        await tx.wait();
        return txHash;
    }

    createPost = async (text, mediaHash, mediaSource, hashTagArray) => {
        const tx = await this.contract.createPost(
            text, mediaHash, mediaSource, hashTagArray
        );
        const txHash = await tx.hash;
        await tx.wait();
        return txHash;
    }
}

module.exports = { getSigner, Social };