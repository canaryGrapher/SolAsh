interface IPassedProps {
    certificateData: NTTtype[];
    ticketData: NTTtype[];
}

interface NTTtype {
    associatedCommunity: string;
    title: string;
    description: string;
    link: string[] | null;
    // issueDate: string;  
    image: string;
    claimedOn: string;   //equivalent to token timestamp and claimedOn
}

export type { IPassedProps, NTTtype }