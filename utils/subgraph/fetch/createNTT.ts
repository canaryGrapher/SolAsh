import { ethers } from "ethers";
import Factory from "@contracts/Factory.sol/Factory.json";
import NTTEvent from "@contracts/NTTEvent.sol/NTTEvent.json";
import { factoryContractAddress } from "../../../config";
import { useQuery } from "@apollo/client";
import { GET_EVENT_DETAILS } from "@utils/subgraph/queries";

const getEventDetails = (contractAddress: string) => {
    //write code to fetch contract data from contractaddress
    const { loading, error, data } = useQuery(
        GET_EVENT_DETAILS(contractAddress)
    );
    if (loading) console.log("getEventDetails: Loading");

    if (error) console.log("getEventDetails: Error");

    if (data) console.log("getEventDetails: ", data.nttcontracts);
};

const deployNTT = async (
    title: string = "",
    description: string = "",
    links: [] = [],
    imageHash: string = "",
    associatedCommunity: string = "",
    startDate: BigInt, //default value should be current time
    endDate: BigInt = BigInt(0),
    list: [] = [],
    ethereum: any
) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        factoryContractAddress,
        Factory.abi,
        signer
    );

    try {
        const transaction = await contract.deployNTT(
            title,
            description,
            links,
            imageHash,
            associatedCommunity,
            startDate,
            endDate,
            list
        );
        const status = await transaction.wait();
        console.log("DeployNTT: ", status);

        //Navigate to dashboard : ntts in queue
    } catch (err) {
        alert("DeployNTT: " + err);
    }
};

//Functions to update details
const addToWhitelist = async (nttContractAddress: string, list: [], ethereum: any) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        nttContractAddress,
        NTTEvent.abi,
        signer
    );

    try {
        const transaction = await contract.addToWhitelist(list);
        const status = await transaction.wait();
        console.log("addToWhitelist: ", status);
    } catch (err) {
        alert("addToWhitelist: " + err);
    }
};

const removeFromWhitelist = async (ethereum: any, nttContractAddress: string, list: []) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        nttContractAddress,
        NTTEvent.abi,
        signer
    );

    try {
        const transaction = await contract.removeFromWhitelist(list);
        const status = await transaction.wait();
        console.log("removeFromWhitelist: ", status);
    } catch (err) {
        alert("removeFromWhitelist: " + err);
    }
};
//TODO: default values must be the value of the existing eventdetail
const updateDetails = async (
    nttContractAddress: string,
    title: string = "",
    description: string = "",
    links: [] = [],
    imageHash: string = "",
    associatedCommunity: string = "",
    ethereum: any
) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        nttContractAddress,
        NTTEvent.abi,
        signer
    );

    try {
        const transaction = await contract.updateDetails(
            title,
            description,
            links,
            imageHash,
            associatedCommunity
        );
        const status = await transaction.wait();
        console.log("updateDetails: ", status);
    } catch (err) {
        alert("updateDetails: " + err);
    }
};

export { getEventDetails, deployNTT, addToWhitelist, removeFromWhitelist, updateDetails };