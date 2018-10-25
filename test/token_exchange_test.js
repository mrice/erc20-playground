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
    choresInstance = await Chores.deployed();
    familyTokenContractInstance = await RiceFamilyToken.deployed();
    choresContractAddr = Chores.address;
    await choresInstance.setFamilyTokenContract(RiceFamilyToken.address);
  });

  it ("all contracts deploy correctly", async() => {
    assert.isOk(choresInstance);
    assert.isOk(familyTokenContractInstance);
    assert.isOk(choresContractAddr);
  });

  it ("lets us add children", async() => {
    await choresInstance.setFamilyTokenContract(RiceFamilyToken.address);
    await choresInstance.addChild.sendTransaction(mia, "mia", {from: dad});
    await choresInstance.addChild.sendTransaction(kaia, "kaia", {from: dad});
    await choresInstance.addChild.sendTransaction(max, "max", {from: dad});
    //TODO - rework this test
  });

  it ("lets dad load a weekly allowance then then trigger a pay out to each child", async()=> {
    const initialFundingTx = await familyTokenContractInstance.transfer.sendTransaction(choresContractAddr, 
      weeklyTokenAllowance, {from: dad});

    const currentTokenBal = await familyTokenContractInstance.balanceOf(choresContractAddr);
    assert.equal(currentTokenBal.toNumber(), weeklyTokenAllowance, "should have xferred tokens");

//    console.log("Chores contract address " + choresContractAddr + " shoudl have balance of " + currentTokenBal);
    assert.equal(currentTokenBal.toNumber(), weeklyTokenAllowance, "should have xferred tokens");

    let allowanceTx = await choresInstance.releaseAllowance.sendTransaction(mia, 7, {from: dad});
    allowanceTx = await choresInstance.releaseAllowance.sendTransaction(kaia, 7, {from: dad});
    allowanceTx = await choresInstance.releaseAllowance.sendTransaction(max, 7, {from: dad});
//    console.log(allowanceTx);

    const miaCurrentTokenBal = await familyTokenContractInstance.balanceOf(mia);
    assert.equal(miaCurrentTokenBal.toNumber(), 7, "mia should have earned 7 tokens");

    const kaiaCurrentTokenBal = await familyTokenContractInstance.balanceOf(mia);
    assert.equal(kaiaCurrentTokenBal.toNumber(), 7, "kaia should have earned 7 tokens");

    const maxCurrentTokenBal = await familyTokenContractInstance.balanceOf(mia);
    assert.equal(maxCurrentTokenBal.toNumber(), 7, "max should have earned 7 tokens");

    const choresTokenBal = await familyTokenContractInstance.balanceOf(choresContractAddr);
    assert.equal(choresTokenBal.toNumber(), 0, "all tokens should be spent");

  });

});