import NTTEvent from "@contracts/NTTEvent.sol/NTTEvent.json";
import { ethers } from "ethers";
import { useQuery } from "@apollo/client";
import {
    GET_USER_STATUS,
    GET_EVENT_DETAILS,
} from "@utils/subgraph/queries";


const getUserStatus = (contractAddress: string, username: string) => {
    console.log("Usercontet: ", username);
    const { loading, error, data } = useQuery(
        GET_USER_STATUS(contractAddress, username)
    );

    if (loading) console.log("getUserStatus: Loading");
    if (error) console.log("getUserStatus: Error");

    if (data && data.whitelistItems.length != 0) {
        console.log("getUserStatus: ", data.whitelistItems[0].status);
        return data.whitelistItems[0].status;
    }

    return 0;
};

const getEventDetails = (contractAddress: string) => {
    const { loading, error, data } = useQuery(GET_EVENT_DETAILS(contractAddress));
    if (loading) console.log("getEventDetails: Loading");

    if (error) console.log("getEventDetails: Error");

    if (data) {
        console.log("getEventDetails: ", data.nttcontracts);
        return data.nttcontracts[0];
    }
};

const mintToken = async (contractAddress: string, ethereum: any) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NTTEvent.abi, signer);

    try {
        const transaction = await contract.mint();
        const status = await transaction.wait();
        console.log("MINT STATUS: ", status);
    } catch (err: any) {
        console.log("Mint token: ", err.data);
    }
};

export { getUserStatus, getEventDetails, mintToken };