const Web3 = require("web3");
const { MerkleTree } = require('merkletreejs')
const web3 = new Web3();

function generateEthAddresses(count) {
  const addresses = [];
  for (let i = 0; i < count; i++) {
    const address = web3.eth.accounts.create();
    addresses.push(address.address);
  }
  return addresses;
}

const airdropAddresses = generateEthAddresses(100);

console.log(airdropAddresses);

const leaves = airdropAddresses.map((address) => web3.utils.keccak256(address));
const tree = new MerkleTree(leaves, web3.utils.keccak256, { sortPairs: true });

const root = tree.getHexRoot();
console.log(root); // 输出默克尔根节点的哈希值

const leaf =  web3.utils.keccak256(airdropAddresses[1]);

const proof = tree.getProof(leaf);
console.log(tree.verify(proof, leaf, root));