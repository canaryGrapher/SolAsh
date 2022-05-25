interface IPassedProps {
    inQueue: NTTtype[];
    issued: NTTtype[];
}

interface IClaims {
    walletAddress: string;
    claimed: boolean;
    claimedOn: string | null;
}

interface NTTtype {
    associatedCommunity: string;
    title: string;
    description: string;
    link: string[];
    issueDate: string;
    expiryDate: string | null;
    image: string;
    creationDate: string;
    type: string;
    claimedStatus: IClaims[];
}


export type { IPassedProps, NTTtype, IClaims };