const { assert } = require('chai');
//const { ethers } = require("hardhat");
const LOGIC_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; //randomly created ropsten address

let proxy,
    proxyAddr,
    deployer,
    deployerAddr,
    signer1;

describe("ContractLogic testing...", () => {
  before(async () => {
    const Proxy = await ethers.getContractFactory('ContractProxy');
    //proxy = await Proxy.deploy();
    proxy = await Proxy.deploy(LOGIC_ADDRESS);
    await proxy.deployed();
    proxyAddr = proxy.address;

    deployer = ethers.provider.getSigner(0);
    deployerAddr = await deployer.getAddress();

    signer1 = ethers.provider.getSigner(1);
  });
  it("deployment should have the correct address stored as the implementation", async() => {
    assert.equal(await proxy.owner(), LOGIC_ADDRESS);
  });
  it('deployment should allow the address to be viewable', async() => {
    assert.equal(await proxy.owner(), deployerAddr);
  });
//});

describe("Potential Transactions with ContractProxy contract", () => {
  before(() => {
    proxyAddr = proxy.address;
  });
  it("sent transactions from them throw an exception", async() => {
    let ex;
    try {
      await deployer.sendTransaction({
        to: proxyAddr,
        values: ethers.utils.parseEther('1.0')
      });
    } catch (_ex) {
      ex = _ex;
    }
    assert(ex, "sent transaction should've reverted!");
  });
  it("sent transactions from them should be rejected by deployer", async() => {
    let ex;
    try {
      await signer1.transferEther({
        to: proxyAddr,
        value: ethers.utils.parseEther('1.0')
      });
    } catch (_ex) {
      ex = _ex;
    }
    assert(ex, "sent transaction should've reverted!");
  });
});

  describe("Fallback function interactions", () => {
    it("transaction runs when deployer pushes random data through", async () => {
      let ex;
      try {
        await deployer.sendTransaction({
          to: proxyAddr,
          data: '0x321d2bd630ef856c8c1432aa7517adac9cd3cc43c93dc73a482ee9bcf84bb509'
        });
      } catch (_ex) {
        ex = _ex;
      }
      assert(!ex, "Transaction should've run!");
    });
    it("transaction doesn't run when a non-deployer pushes random data through", async() => {
      let ex;
      try {
        await signer1.transferEther({
          to: proxyAddr,
          data: '0x321d2bd630ef856c8c1432aa7517adac9cd3cc43c93dc73a482ee9bcf84bb509'
        });
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, 'Transaction should have reverted!');
    });
  });
});
