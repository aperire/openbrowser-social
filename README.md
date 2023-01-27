# OpenBrowser Social Contract


### View Functions
`getNameOwner(name)`

Get owner address of name

`getUserAccount(address)`

Get UserAccount struct of address
```rs
struct UserAccount {
    string name;
    string pfpHash;
    string bio;
    address owner;
}
```

`getPostInfoFromArray(index)`

Get PostInfo struct from array
```rs
struct PostInfo {
        string text;
        string mediaHash;
        string mediaFtype;
        uint256 postedTimestamp;
        string[] hashTagArray;
        string name;
    }

```

`getPostInfoFromHashtag(hashTag, index)`
`getPostInfoFromName(name, index)`

### Transaction Functions
`createAccount(name, pfpHash, bio)`

`editAccount(pfpHash, bio)`

`transferAccountOwnership(newOwner)`

`createPost(text, mediaHash, mediaFtype, hashTagArray)`

