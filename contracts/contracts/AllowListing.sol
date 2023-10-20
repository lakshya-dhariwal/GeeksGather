// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Allowlist {
    struct AllowlistInfo {
        address mod;
        mapping(address => bool) allowlisted;
        bool initialized; 
    }

    mapping(uint256 => AllowlistInfo) public allowlists;
    uint256 public allowlistCounter = 1; // Initialize the counter with 1

    function createAllowlist() public returns (uint256) {
        uint256 _id = allowlistCounter;
        require(!allowlists[_id].initialized, "Allowlist already exists");
        allowlists[_id].mod = msg.sender;
        allowlists[_id].initialized = true; // Mark the allowlist as initialized
        allowlistCounter++; // Incremen t the counter for the next allowlist
        return _id;
    }

    function addToAllowlist(uint256 _id, address _user) public {
        require(allowlists[_id].initialized, "Allowlist not initialized yet");
        require(!allowlists[_id].allowlisted[_user], "User is already in the allowlist");
        allowlists[_id].allowlisted[_user] = true;
    }

    function removeFromAllowlist(uint256 _id, address _user) public {
        require(allowlists[_id].initialized, "Allowlist not initialized yet");
        require(allowlists[_id].mod == msg.sender, "Only the mod can remove users");
        allowlists[_id].allowlisted[_user] = false;
    }

    function isEligible(uint256 _id, address _user) public view returns (bool) {
        require(allowlists[_id].initialized, "Allowlist not initialized yet");
        return allowlists[_id].allowlisted[_user];
    }
}
