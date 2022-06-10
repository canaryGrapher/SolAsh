import { ethers } from "ethers";
import Factory from "@contracts/Factory.sol/Factory.json";
import NTTEvent from "@contracts/NTTEvent.sol/NTTEvent.json";
import { factoryContractAddress } from "../../../config";
import axios from "axios";
const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/jatin17solanki/solash-subgraph";

const getEventDetails = async (contractAddress: string) => {
    const query = `query {
        nttcontracts(where:{contractAddress: "${contractAddress}"}) {
        id
        contractAddress
        creatorAddress
        title
        description
        links
        imageHash
        associatedCommunity
        startDate
        endDate
        timeStamp
        }
    }`;

    try {
        const response = await axios.post(SUBGRAPH_URL, {
            query,
        });
        if (response.data.errors) {
            console.error(response.data.errors);
            throw new Error(`Error making subgraph query ${response.data.errors}`);
        }

        if (response.data.data.nttcontracts.length != 0) {
            console.log("AXIOS: ", response.data.data.nttcontracts[0]);
            return response.data.data.nttcontracts[0];
        }
        return {};

    } catch (error: any) {
        console.error(error);
        throw new Error(`Could not query the subgraph ${error.message}`);
    }
};

const deployNTT = async (
    title: string = "",
    description: string = "",
    links: string[] = [""],
    imageHash: string = "",
    associatedCommunity: string = "",
    startDate: BigInt, //default value should be current time
    endDate: BigInt = BigInt(0),
    list: string[] = [""],
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

        const events = status?.events;
        const deployedContractAddr = extractReturnValue(events);
        console.log("deployedContractAddr: ", deployedContractAddr);
        return deployedContractAddr;

        //Navigate to dashboard : ntts in queue
    } catch (err) {
        console.log("DeployNTT: " + err);
        alert("Metamask error: " + err);
    }
};

const extractReturnValue = (events: any) => {
    let addr;
    events.forEach((eventItem: any) => {
        if (eventItem && eventItem.event === "NTTContractCreated") {
            addr = eventItem.args.contractAddress;
            console.log("EXT1: ", addr);
        }
    });

    return addr;
}


const getNTTContractCreatedEvent = async (ethereum: any) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contract = new ethers.Contract(
        factoryContractAddress,
        Factory.abi,
        provider
    );

    const addr = contract.on("NTTContractCreated", (
        contractId: BigInt,
        contractAddress: string,
        creatorAddress: string,
        title: string,
        description: string,
        links: string[],
        imageHash: string,
        associatedCommunity: string,
        startDate: BigInt,
        endDate: BigInt,
    ) => {
        console.log("NTTContractCreated: ", contractAddress);
        return contractAddress;
    });
    // console.log("getNTTContractCreatedEvent: ", addr);
    return addr
}


//Functions to update details
const addToWhitelist = async (nttContractAddress: string, list: string[], ethereum: any) => {
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

const removeFromWhitelist = async (ethereum: any, nttContractAddress: string, list: string[]) => {
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
    links: string,
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
            links.split(","),
            imageHash,
            associatedCommunity
        );
        const status = await transaction.wait();
        console.log("updateDetails: ", status);
    } catch (err) {
        alert("updateDetails: " + err);
    }
};

const mintNTT = async (
    nttTitle: string,
    nttDescription: string,
    associatedWebsite: string,
    imageFile: string,
    associatedCommunity: string,
    startDate: any,
    endDate: any,
    walletAddresses: string,
    ethereum: any) => {


    console.log(
        nttTitle,
        nttDescription,
        associatedWebsite,
        imageFile,
        associatedCommunity,
        startDate,
        endDate,
        walletAddresses
    );

    const startDateTimestamp = Math.floor(
        new Date(startDate).getTime() / 1000
    );
    const endDateTimestamp = endDate && endDate.length > 0 ? Math.floor(
        new Date(endDate).getTime() / 1000
    ) : 0;
    return await deployNTT(
        nttTitle,
        nttDescription,
        associatedWebsite.split(","),
        imageFile,
        associatedCommunity,
        BigInt(startDateTimestamp),
        BigInt(endDateTimestamp),
        walletAddresses.split(","),
        ethereum
    );
};

export { getEventDetails, deployNTT, addToWhitelist, removeFromWhitelist, updateDetails, mintNTT };