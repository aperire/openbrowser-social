const { getSigner, Social } = require("../social");
const { testAccounts } = require("./testAccounts");
const { randomstring } = require("randomstring");

const MATIC_PROVIDER = "https://rpc-mumbai.maticvigil.com";

let socialObjArray = [];

const createSocialObjects = (testAccounts) => {
    for (let i = 0; i < testAccounts.length; i++) {
        let signer = getSigner(testAccounts[i], MATIC_PROVIDER);
        let social = new Social(signer);
        socialObjArray.push(social);
    }
    console.log(socialObjArray);
}

const createAccounts = async () => {
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

