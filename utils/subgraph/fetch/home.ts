import { useQuery } from "@apollo/client";
import { NTTtype, TokenType, EventDetailsType } from "@interfaces/pages/Home";
import {
    GET_TOKENS_ISSUED,
    GET_EVENT_DETAILS,
} from "@utils/subgraph/queries";

const getTokenData = async (userAddress: string) => {
    const { loading, error, data } = useQuery(GET_TOKENS_ISSUED(userAddress));
    if (loading) console.log("QQ: Loading");
    if (error) console.log("QQ: Error");
    if (data) {
        console.log("QQ: ", userAddress, data.tokens);
        if (data.tokens.length > 0) {
            const fetchedData: EventDetailsType[] = await getEventDetails(
                data.tokens.contractAddress
            );
            const formattedData: NTTtype[] = data.tokens.map((token: TokenType) => {
                return {
                    contractAddress: token.contractAddress,
                    title: token.title,
                    tokenId: token.tokenId,
                    associatedCommunity: token.associatedCommunity,
                    description: selectArrayElementDescription(
                        fetchedData,
                        token.tokenId
                    ),
                    image: selectArrayElementImage(fetchedData, token.tokenId),
                    link: selectArrayElementLinks(fetchedData, token.tokenId),
                    claimedOn: selectArrayElementTimeStamp(fetchedData, token.tokenId),
                };
            });
            return formattedData;
        }
        return [];
    }
    return [];
};
const getEventDetails = async (contractAddress: string) => {
    const { loading, error, data } = useQuery(GET_EVENT_DETAILS(contractAddress));
    if (loading) console.log("ED: Loading");
    if (error) console.log("ED: Error");
    if (data) {
        console.log("ED: ", data.nttcontracts);
        return data.nttcontracts;
    }
    return [];
};

const selectArrayElementTimeStamp = (array: EventDetailsType[], id: string) => {
    let valueFound = "";
    array.map((element) => {
        if (element.id === id) {
            valueFound = element.timeStamp;
        }
    });
    return valueFound;
};

const selectArrayElementDescription = (
    array: EventDetailsType[],
    id: string
) => {
    let valueFound = "";
    array.map((element) => {
        if (element.id === id) {
            valueFound = element.description;
        }
    });
    return valueFound;
};

const selectArrayElementLinks = (array: EventDetailsType[], id: string) => {
    let valueFound: string[] = [];
    array.map((element) => {
        if (element.id === id) {
            valueFound = element.links;
        }
    });
    return valueFound;
};

const selectArrayElementImage = (array: EventDetailsType[], id: string) => {
    let valueFound =
        "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331";
    array.map((element) => {
        if (element.id === id) {
            valueFound = element.imageHash;
        }
    });
    return valueFound;
};

export { getTokenData, getEventDetails };