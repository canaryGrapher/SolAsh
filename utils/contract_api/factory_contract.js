import { ethers } from "ethers";
import Factory from "../../artifacts/contracts/Factory.sol/Factory.json";
import { factoryContractAddress } from "../../config";

/*
title: string
description: string
links: [string]
imageHash: string
associatedCommunity: string
startDate: int/BigInt (time in seconds)
endDate: int/BigInt (time in seconds)
list: [address]
*/
const deployNTT = async (
  title,
  description,
  links,
  imageHash,
  associatedCommunity,
  startDate,
  endDate,
  list
) => {};
