import { useQuery } from "@apollo/client";
import { TokenType, EventDetailsType } from "@interfaces/pages/Home";
import {
    GET_TOKENS_ISSUED,
    GET_EVENT_DETAILS,
} from "@utils/subgraph/queries";
import axios from "axios";

const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/jatin17solanki/solash-subgraph";

const getHomeData = async (userAddress: string) => {
    const tokenData = await getTokenData(userAddress);
    const finalData = tokenData.map(async (token: TokenType) => {
        const contractAddress = token.contractAddress;
        const eventDetails: EventDetailsType = await getEventDetails(contractAddress);
        return {
            contractAddress: token.contractAddress,
            title: token.title,
            creatorAddress: token.creatorAddress,
            tokenId: token.tokenId,
            associatedCommunity: token.associatedCommunity,
            description: eventDetails.description || "",
            image: eventDetails.imageHash || "",
            link: eventDetails.links || [],
            claimedOn: token.timeStamp,
        };
    })
    return finalData;
}


const getTokenData = async (userAddress: string) => {
    const { loading, error, data } = useQuery(GET_TOKENS_ISSUED(userAddress));
    if (loading) console.log("QQ: Loading");
    if (error) console.log("QQ: Error");
    if (data) {
        console.log("QQ: ", data);
        return data.tokens;
    }
    console.log("Reached end of getTokenData");
    return [];
};


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
        const response = await axios.post(SUBGRAPH_URL, { query });
        if (response.data.errors) {
            console.error(response.data.errors);
            throw new Error(`Error making subgraph query ${response.data.errors}`);
        }
        console.log("getEventDetails: ", response.data.data.nttcontracts);
        return response.data.data.nttcontracts[0];
    } catch (error : any) {
        console.error(error);
        throw new Error(`Could not query the subgraph ${error.message}`);
    }
};

// const getEventDetails = async (contractAddress: string) => {
//     const { loading, error, data } = useQuery(GET_EVENT_DETAILS(contractAddress));
//     if (loading) console.log("ED: Loading");
//     if (error) console.log("ED: Error");
//     if (data) {
//         console.log("ED: ", data.nttcontracts);
//         return data.nttcontracts[0];
//     }
//     return {};
// };


export { getHomeData };