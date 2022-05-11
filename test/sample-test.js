const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Factory", async function () {
  it("deploys a factory contract", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();
    await factory.deployed();

    expect(owner.address).to.equal(factory.signer.address);
  });

  it("deploys a NTTEvent contract via factory", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();
    await factory.deployed();

    await factory
      .connect(addr1)
      .deployNTT(
        "Sample NTT event",
        "testing creation of NTT event",
        ["www.google.com", "www.youtube.com"],
        "image hash",
        "MIT",
        0,
        0,
        [addr2.address, addr3.address]
      );

    const result = await factory.connect(addr1).getContractDeployedInfo();
    expect(addr1.address).to.equal(result[0].creatorAddress);
  });
});
