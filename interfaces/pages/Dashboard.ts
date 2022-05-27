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
    issueDate: string;    //equivalent to startDate
    image: string;
    type: string;
    claimedStatus: IClaims[];
}


export type { IPassedProps, NTTtype, IClaims };