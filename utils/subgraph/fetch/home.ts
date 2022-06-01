import { TokenDetailType } from "@interfaces/pages/Home";
import { useQuery } from "@apollo/client";
import { GET_TOKENS_ISSUED } from "@utils/subgraph/queries";

const getHomeData = (userAddress: string) => {
    const { loading, error, data } = useQuery(GET_TOKENS_ISSUED(userAddress));

    if (data) {
        console.log("Received raw data from graphQL: ", data)
        const finalData: TokenDetailType[] = data.tokens.map(
            (token: TokenDetailType) => {
                return {
                    contractAddress: token.contractAddress,
                    title: token.title,
                    creatorAddress: token.creatorAddress,
                    receiverAddress: token.receiverAddress,
                    transactionHash: token.transactionHash,
                    tokenId: token.tokenId,
                    associatedCommunity: token.associatedCommunity,
                    description: token.description || "",
                    imageHash: token.imageHash || "",
                    links: token.links || [],
                    timeStamp: token.timeStamp,
                };
            }
        );
        console.log("getHome: ", finalData);
        return finalData;
    }
    return [];
}

export { getHomeData };