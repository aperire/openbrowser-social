// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Social {
    // Accounts
    mapping(string => address) public nameOwnerMap;
    mapping(address => UserAccount) public userAccountMap;

    // Posts
    PostInfo[] public postInfoArray;
    mapping(string => PostInfo[]) hashTagPostInfoMap;
    mapping(string => PostInfo[]) userPostInfoMap;

    struct UserAccount {
        string name;
        string pfpHash;
        string bio;
        address owner;
    }

    struct PostInfo {
        string text;
        string mediaHash;
        string mediaSource;
        uint256 postedTimestamp;
        string[] hashTagArray;
        string name;
    }

    /*
    Array Length
    */
    function getPostInfoArrayLen() public view returns (uint256) {
        return postInfoArray.length;
    }

    function getHashTagPostInfoLen(string memory _hashTag)
        public
        view
        returns (uint256)
    {
        return hashTagPostInfoMap[_hashTag].length;
    }

    function getUserPostInfoLen(string memory _name)
        public
        view
        returns (uint256)
    {
        return userPostInfoMap[_name].length;
    }

    /*
    Account Management
    */
    function createAccount(
        string memory _name,
        string memory _pfpHash,
        string memory _bio
    ) public {
        require(
            userAccountMap[msg.sender].owner == address(0),
            "Account exists"
        );
        require(nameOwnerMap[_name] == address(0), "Name exists");

        UserAccount memory userAccount = UserAccount(
            _name,
            _pfpHash,
            _bio,
            msg.sender
        );

        nameOwnerMap[_name] = msg.sender;
        userAccountMap[msg.sender] = userAccount;
    }

    function editAccount(string memory _pfpHash, string memory _bio) public {
        UserAccount storage userAccount = userAccountMap[msg.sender];
        userAccount.pfpHash = _pfpHash;
        userAccount.bio = _bio;
    }

    function transferAccountOwnership(address _newOwner) public {
        require(msg.sender != _newOwner, "Cannot transfer to same address");

        UserAccount memory userAccount = userAccountMap[msg.sender];
        userAccountMap[msg.sender] = UserAccount("", "", "", address(0));
        userAccountMap[_newOwner] = userAccount;
    }

    /*
    Post Management
    */
    function createPost(
        string memory _text,
        string memory _mediaHash,
        string memory _mediaSource,
        string[] memory _hashTagArray
    ) public {
        string memory name = userAccountMap[msg.sender].name;
        require(nameOwnerMap[name] == msg.sender, "Create Account");
        PostInfo memory postInfo = PostInfo(
            _text, _mediaHash, _mediaSource, block.timestamp, _hashTagArray, name
        );
        postInfoArray.push(postInfo);

        for (uint256 i = 0; i < _hashTagArray.length; i++) {
            string memory hashTag = _hashTagArray[i];
            hashTagPostInfoMap[hashTag].push(postInfo);
        }

        userPostInfoMap[name].push(postInfo);
    }
}
