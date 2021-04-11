const { assert } = require("chai");


let contract,
  contractProxy,
  contractProxyAddress,
  ownerSigner,
  ownerAddr,
  buyerSigner,
  buyerAddr,
  tokenA,
  tokenB,
  tokenC,
  totalSupply,
  sentSupply,
  receivedSupply,
  remainingSupply;



  describe("ContractProxy testing...", () => {
    before(async () => {
      const ContractLogic = await ethers.getContractFactory('ContractLogic');
      let contractLogic = await ContractLogic.deploy();
      let contractLogicAddress = contractLogic.address;

      const ContractProxy = await ethers.getContractFactory('ContractProxy');
      //contractProxy = await ContractProxy.deploy();
      contractProxy = await ContractProxy.deploy(contractLogicAddress);
      contractProxyAddress = contractProxy.address;

      contract = ContractLogic.attach(contractProxyAddress);

      ownerSigner = ethers.provider.getSigner(0);
      ownerAddr = await ownerSigner.getAddress();
      //const totalSupply = ethers.utils.parseEther("2000");

    });
    describe("ERC20 tokens should be able to be sent to ContractLogic contract", () => {

        beforeEach(async() => {
          totalSupply = ethers.utils.parseEther("100"),
          sentSupply = ethers.utils.parseEther("20"),
          receivedSupply = ethers.utils.parseEther("20"),
          remainingSupply = totalSupply - sentSupply;


          const ERC20 = await ethers.getContractFactory('Token');
          tokenA = await ERC20.deploy('tokenA', 'A', contractProxyAddress, totalSupply),
          tokenB = await ERC20.deploy('tokenB', 'B', contractProxyAddress, totalSupply),
          tokenC = await ERC20.deploy('tokenC', 'C', contractProxyAddress, totalSupply);

          await tokenA.deployed();
          await tokenB.deployed();
          await tokenC.deployed();

          //await window.ethereum.enable()
          //const provider = new ethers.providers.Web3Provider(window.ethereum);
          buyerSigner = ethers.provider.getSigner(2);
          buyerAddr = await buyerSigner.getAddress();
          //console.log("Token Holder Address is: ", tokenA.balanceOf(contractProxyAddress));
          //console.log("Token Holder Address is: ", tokenB.balanceOf(buyerAddr));

        });
        it("should contain a balance of 10000 for all 3 tokens", async() => {
          assert.equal((await tokenA.balanceOf(contractProxyAddress)).toString(), totalSupply.toString());
          assert.equal((await tokenB.balanceOf(contractProxyAddress)).toString(), totalSupply.toString());
          assert.equal((await tokenC.balanceOf(contractProxyAddress)).toString(), totalSupply.toString());
          //console.log("ContractProxyAddress balance for TokenA is: ",  tokenA.balanceOf(contractProxyAddress).toString());

        });
        it("'incomplete test' should allow for transfers of above amounts to another address", async() => {
          console.log("     Console.log confirms the following are transacted: ")
          console.log("       Total Supply for TokenA is: ", totalSupply.toString());
          console.log("       Sent Supply for TokenA is: ", sentSupply.toString());
          console.log("       Sent Supply for TokenA is: ", remainingSupply.toString());
        });
        /*
        it("should allow for transfers to another address", async() => {
          await contract.transfer(tokenA.address, contractProxyAddress, buyerAddr, sentSupply);
          await contract.transfer(tokenB.address, contractProxyAddress, buyerAddr, sentSupply);
          await contract.transfer(tokenC.address, contractProxyAddress, buyerAddr, sentSupply);


          //await contract.transfer(tokenA.address, contractProxyAddress, buyerAddr, sentSupply);
          //assert.equal(await tokenA.balanceOf(contractProxyAddress).toString(), remainingSupply.toString());
          assert.equal(await tokenA.balanceOf(buyerAddr).toString(), receivedSupply.toString());
          //await contract.transfer(tokenB.address, contractProxyAddress, buyerAddr, sentSupply);
          //assert.equal(await tokenB.balanceOf(contractProxyAddress).toString(), remainingSupply.toString());
          assert.equal(await tokenB.balanceOf(buyerAddr).toString(), receivedSupply.toString());
          //await contract.transfer(tokenC.address, contractProxyAddress, buyerAddr, sentSupply);
          //assert.equal(await tokenC.balanceOf(contractProxyAddress).toString(), remainingSupply.toString());
          assert.equal(await tokenC.balanceOf(buyerAddr).toString(), receivedSupply.toString());
        });
        */
  });
});
