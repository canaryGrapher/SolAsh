interface IPassedProps {
    certificateData: NTTtype[];
    ticketData: NTTtype[];
}

interface NTTtype {
    associatedCommunity: string;
    title: string;
    description: string;
    link: string | string;
    issueDate: string;
    expiryDate: string | null;
    image: string | string;
    signedOn: string;
}

export type { IPassedProps, NTTtype }