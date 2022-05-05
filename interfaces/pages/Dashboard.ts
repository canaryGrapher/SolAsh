interface IPassedProps {
    inQueue: NTTtype[];
    issued: NTTtype[];
}

interface NTTtype {
    associatedCommunity: string;
    title: string;
    description: string;
    link: string | string;
    issueDate: string;
    expiryDate: string | null;
    image: string | string;
    creationDate: string;
}

export type { IPassedProps, NTTtype }