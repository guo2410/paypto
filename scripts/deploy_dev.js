const hre = require('hardhat')
const utils = hre.ethers.utils

async function main(){
    const [signer,originator,investor] = await hre.ethers.getSigners()

    const MingToken = await hre.ethers.getContractFactory("MingToken");
    const mingToken = await MingToken.deploy();
    
    const MingAirdrop = await hre.ethers.getContractFactory("MingAirdrop");
    const mingAirdrop = await MingAirdrop.deploy(mingToken.address,0x526320ec2b7724cd278a6e9ad887434b0ab04162268f8e9afb34918b8f28819b);
}

if (require.main === module) {
    // If this is run as a script, then call main. If it's imported (for tests), this block will not run
    main()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error)
        process.exit(1)
      })
  }