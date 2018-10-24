const RiceFamilyToken = artifacts.require("RiceFamilyToken");

contract("RiceFamilyToken", function(accounts) {

  const ownerAccount = accounts[0];
  const otherAccount = accounts[1];

  it("deploys correctly", async()=> {
    const instance = await RiceFamilyToken.deployed();
    assert.isOk(instance, "should deploy correctly");
  });

  it("has the right supply", async() => {
    const instance = await RiceFamilyToken.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), 100000000000);
  });

  it("gave the owner the right supply", async() => {
    const instance = await RiceFamilyToken.deployed();
    const ownerBalance = await instance.balanceOf(ownerAccount);
    assert.equal(ownerBalance.toNumber(), 100000000000);
  });

  it("lets the owner transfer tokens around", async() => {
    const instance = await RiceFamilyToken.deployed();
    const tx = await instance.transfer.sendTransaction(otherAccount, 50000000000,
      {from: ownerAccount});

    const ownerBalance = await instance.balanceOf(ownerAccount);
    assert.equal(ownerBalance.toNumber(), 50000000000);

    const otherBalance = await instance.balanceOf(otherAccount);
    assert.equal(otherBalance.toNumber(), 50000000000);
  });

});