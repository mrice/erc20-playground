const RiceFamilyToken = artifacts.require("./RiceFamilyToken");
const Chores = artifacts.require("./Chores");

contract("Chores", async(accounts) => {

  const dad = accounts[0];
  const mia = accounts[1];
  const kaia = accounts[2];
  const max = accounts[3];
  const weeklyTokenAllowance = 1 * 7 * 3; //one token per day for three children

  let familyTokenContractInstance, choresInstance;
  let choresContractAddr;

  beforeEach ("configure contracts", async() => {
    choresInstance = await Chores.new();
    familyTokenContractInstance = await RiceFamilyToken.new();
    choresContractAddr = Chores.address;
    await choresInstance.addChild.sendTransaction(mia, "mia", {from: dad});
    await choresInstance.addChild.sendTransaction(kaia, "kaia", {from: dad});
    await choresInstance.addChild.sendTransaction(max, "max", {from: dad});
    const childCount = await choresInstance.childCount();
    assert.equal(childCount.toNumber(), 3, "three children should have been added");
  });

  it ("all contracts deploy correctly", async() => {
    assert.isOk(choresInstance);
    assert.isOk(familyTokenContractInstance);
    assert.isOk(choresContractAddr);
  });

  it ("lets dad transfer the weekly allowance of tokens to the Chores contract", async() => {
    const initialFundingTx = await familyTokenContractInstance.transfer.sendTransaction(choresContractAddr, 
      weeklyTokenAllowance, {from: dad});
    const currentTokenBal = await familyTokenContractInstance.balanceOf(choresContractAddr);
    assert.equal(currentTokenBal.toNumber(), weeklyTokenAllowance, "should have xferred tokens");
  });

  it ("lets dad trigger a pay out to each child", async()=> {

  });

});