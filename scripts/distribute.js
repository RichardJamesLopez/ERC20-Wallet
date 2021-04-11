const ADDRESS = "0xBe93e68757FabBdb552857E8b5dc81b49CBBDF87"; // TODO: add your ERC20 address
const hre = require("hardhat");

async function main() {
  const token = await hre.ethers.getContractAt("Token", ADDRESS);
  const amount = ethers.utils.parseEther("100");

  const friends = [
    "vitaliksropstenwallet.eth",
    "ethereum.eth",
    "doteth.eth",
    "0xD81918bb192481F6cb1497d99cF44C6Ad6ec5482",
    "pbwaffles.eth",
    "0x81AF761CAAC747f0c987D35e29A1878a9D372dFb"
  ];

  for(let i = 0; i < friends.length; i++) {
    await token.transfer(friends[i], amount);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
