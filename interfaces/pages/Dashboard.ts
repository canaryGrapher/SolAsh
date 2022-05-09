interface IPassedProps {
    inQueue: NTTtype[];
    issued: NTTtype[];
}

interface NTTtype {
    associatedCommunity: string;
    title: string;
    description: string;
    link: string;
    issueDate: string;
    expiryDate: string | null;
    image: string;
    creationDate: string;
    type: string;
}

export type { IPassedProps, NTTtype }