import { useEffect, useState, useContext } from "react";
import NTTEvent from "../../artifacts/contracts/NTTEvent.sol/NTTEvent.json";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useQuery } from "@apollo/client";
import { GET_USER_STATUS, GET_EVENT_DETAILS } from "../../utils/subgraph/queries";
import UserContext from "@context/UserContext";
import { useRouter } from "next/router";

/*
1. The link to this page shall be: localhost:port/claim/[contractAddress]
2. Prompt the user to login if not, and redirect to this page on successful login
3. After login, query the graph data to get the status of the current account:
    3.1 if the account status is notClaimed then show the user the mint page
        3.1.1 The mint page should show the details of the token and a mint button
    3.2 if the account status is claimed, then inform the user that the token as already been minted, redirect to the home page
    3.3 if the account status is revoked, then display a message showing not eligible to mint the token
4. After the mint is successful, show success message and redirect to home page

Status{
    Revoked,     0
    Claimed,     1 
    NotClaimed   2
}
*/
//   |
//   |
//  \ /
//   v
const getUserStatus = (contractAddress: string, username: string) => {
  console.log("Usercontet: ", username);
  const { loading, error, data } = useQuery(
    GET_USER_STATUS(contractAddress, username)
  );

  if (loading) console.log("getUserStatus: Loading");
  if (error) console.log("getUserStatus: Error");

  if (data) {
    console.log("getUserStatus: ", data.whitelistItems[0].stat);
    return data.whitelistItems[0].status;
  }

  return 0;
};


const getEventDetails = (contractAddress: string) => {
    const { loading, error, data } = useQuery(
        GET_EVENT_DETAILS(contractAddress)
    );
    if (loading) console.log("getEventDetails: Loading");

    if (error) console.log("getEventDetails: Error");

    if (data) {
      console.log("getEventDetails: ", data.nttcontracts);
      return data.nttcontracts[0];
    }
};


//Move this function inside the component
const mintToken = async (contractAddress: string) => {
  const { ethereum } = useMetaMask();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, NTTEvent.abi, signer);

  try {
    const transaction = await contract.mint();
    const status = await transaction.wait();
    console.log("MINT STATUS: ", status);
  } catch (err: any) {
    console.log("Mint token: ", err.data.message);
  }
};

export default function Claim() {
  const { account } = useMetaMask();
  const router = useRouter();
  //   const userContext = useContext(UserContext);
  const parsedUrl: string = router.asPath.split("/")[2];
  // @ts-ignore
  const status = getUserStatus(parsedUrl, account);

  console.log("query is: ", router.asPath.split("/")[2]);
  console.log("Your status is: ", status);

  return (
    <div>
      <p>Yikes</p>
      <p>{status}</p>
    </div>
  );
}

// export async function getStaticProps(context: any) {
//   const contractAddress = context.params.claim;
//   const status = getUserStatus(contractAddress);
//   return {
//     props: {
//       contractAddress,
//       status,
//     },
//   };
// }
