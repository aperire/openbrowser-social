const { getSigner, Social } = require("../social");
const { testAccounts } = require("./testAccounts");
var randomstring = require("randomstring");
const fs = require("fs");
const { ethers } = require("ethers");

const MATIC_PROVIDER = "https://rpc-mumbai.maticvigil.com";

const getBalance = async(address) => {
    let balance = await ethers.getDefaultProvider(MATIC_PROVIDER).getBalance(address);
    balance = ethers.utils.formatEther(balance)
    return balance;
}

const getAddressArray = (testAccounts) => {
    let addressArray = [];
    for (let i = 0; i < testAccounts.length; i++) {
        let signer = getSigner(testAccounts[i], MATIC_PROVIDER);
        addressArray.push(signer.address)
    }
    return addressArray;
}

const createSocialObjects = (testAccounts) => {
    let socialObjArray = [];
    for (let i = 0; i < testAccounts.length; i++) {
        let signer = getSigner(testAccounts[i], MATIC_PROVIDER);
        let social = new Social(signer);
        socialObjArray.push(social);
    }
    return socialObjArray;
}

const createAccounts = async (socialObjArray) => {
    for (let i = 0; i < socialObjArray.length; i++) {
        let social = socialObjArray[i];
        let tx = await social.createAccount(
            `account${i}`,
            randomstring.generate(10),
            randomstring.generate(10)
        );
        console.log(tx);
    }
}

const createPosts = async (socialObj, address, numPostsPerAccount) => {
    let social = socialObj;

    for (let i=0; i<numPostsPerAccount; i++) {
        let tx = await social.createPost(
            `${i}: ${randomstring.generate(10)}`,
            randomstring.generate(15),
            "rand",
            [
                randomstring.generate(5),
                randomstring.generate(5),
                randomstring.generate(5),
            ]   
        );
        console.log(`TX${i}: ${address}`);
    }
}

const runTest = async(testAccounts, numPostsPerAccount) => {
    // 1. Create Objects
    let socialObjArray = createSocialObjects(testAccounts);
    let addressArray = getAddressArray(testAccounts);

    // 2. Create Accounts
    // let createAccountTx = await createAccounts(socialObjArray);
    // console.log("Accounts Created");

    let txGasLogGlobal = [];
    // 3. Create Posts
    for (let i = 0; i<testAccounts.length; i++) {
        let creatPostFunction = await createPosts(socialObjArray[i], addressArray[i], numPostsPerAccount);
    }
}

runTest(testAccounts, 1000);

