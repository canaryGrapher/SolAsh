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
    expiryDate: string | null;
    image: string;
    signedOn: string;
}

export type { IPassedProps, NTTtype }