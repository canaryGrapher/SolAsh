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
    contractAddress: string;
    startDate: string;
    endDate: string;
    imageHash?: string;
    setMessage: (message: string) => void;
    setLoading: (status: boolean) => void;
}

interface WhiteLitEditModalTypes extends NTTtype {
    closeModal: () => void;
    getIssuerStatus: (contractAddress: string) => void;
    removeFromWhiteList: (ethereum: any, nttContractAddress: string, list: string[]) => void;
    addToWhiteList: (nttContractAddress: string, list: string[], ethereum: any) => void;
}


export type { IPassedProps, NTTtype, IClaims, WhiteLitEditModalTypes };