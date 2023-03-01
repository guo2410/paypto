// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MingAirdrop is Ownable {

    address public token;
    bytes32 public merkleRoot;
    mapping(address => bool) public claimed;

    event Claimed(address account);

    constructor(address _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function claim(
        address account,
        bytes32[] memory proof
    ) external {
        require(!claimed[account], "Airdrop already claimed");
        bytes32 leaf = keccak256(abi.encodePacked((msg.sender)));
        require(MerkleProof.verify(proof, merkleRoot, leaf),"Invaild proof");
        claimed[account] = true;

        require(IERC20(token).transfer(account, 1 * 10 ** 18), "Transfer failed");

        emit Claimed(account);
    }
}