import { useQuery } from "@apollo/client";
import { TokenType, EventDetailsType } from "@interfaces/pages/Home";
import {
    GET_TOKENS_ISSUED,
    GET_EVENT_DETAILS,
} from "@utils/subgraph/queries";

const getHomeData = async (userAddress: string) => {
    const tokenData = await getTokenData(userAddress);
    const finalData = tokenData.map(async (token: TokenType) => {
        const contractAddress = token.contractAddress;
        const eventDetails: EventDetailsType = await getEventDetails(contractAddress);
        return {
            contractAddress: token.contractAddress,
            title: token.title,
            issuedBy: token.creatorAddress,
            tokenId: token.tokenId,
            associatedCommunity: token.associatedCommunity,
            description: eventDetails.description || "",
            image: eventDetails.imageHash || "",
            link: eventDetails.links || [],
            claimedOn: token.timeStamp,
        };
    })
    return finalData
}


const getTokenData = async (userAddress: string) => {
    const { loading, error, data } = useQuery(GET_TOKENS_ISSUED(userAddress));
    if (loading) console.log("QQ: Loading");
    if (error) console.log("QQ: Error");
    if (data) {
        console.log("QQ: ", data);
        return data.tokens;
    }
    return [];
};

const getEventDetails = async (contractAddress: string) => {
    const { loading, error, data } = useQuery(GET_EVENT_DETAILS(contractAddress));
    if (loading) console.log("ED: Loading");
    if (error) console.log("ED: Error");
    if (data) {
        console.log("ED: ", data.nttcontracts);
        return data.nttcontracts[0];
    }
    return {};
};



export { getHomeData };