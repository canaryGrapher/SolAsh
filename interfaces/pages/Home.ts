interface IPassedProps {
    certificateData: NTTtype[];
    ticketData: NTTtype[];
}

interface NTTtype {
    associatedCommunity: string;
    title: string;
    description: string;
    link: string[] | null;
    issueDate: string;
    image: string;
    claimedOn: string;   //equivalent to token timestamp and claimedOn
}

interface TokenType {
    id: string;
    contractAddress: string;
    tokenId: string;
    creatorAddress: string;
    receiverAddress: string;
    title: string;
    associatedCommunity: string;
    isValid: boolean;
    timeStamp: string;
}

interface EventDetailsType {
    id: string;
    contractAddress: string;
    creatorAddress: string;
    title: string;
    description: string;
    links: string[] | [];
    imageHash: string;
    associatedCommunity: string;
    startDate: string;
    endDate: string;
    timeStamp: string;
}

interface TokenDetailType {
    tokenId: string;
    contractAddress: string;
    creatorAddress: string;
    receiverAddress: string;
    transactionHash: string;
    title: string;
    description: string;
    links: string[] | [];
    imageHash: string;
    associatedCommunity: string;
    timeStamp: string;
    loaderState: (arg: boolean) => void;
}

type TokenDetailsProps = TokenDetailType[] | []

type finalTokenType = NTTtype[] | []

export type { IPassedProps, NTTtype, TokenType, EventDetailsType, TokenDetailType, finalTokenType, TokenDetailsProps };