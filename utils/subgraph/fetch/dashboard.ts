import { NTTtype } from "@interfaces/pages/Dashboard";
import {
    GET_EVENTS_IN_QUEUE,
    GET_EVENTS_ISSUED,
} from "@utils/subgraph/queries";
import { useQuery } from "@apollo/client";

function inQueueEvents(creatorAddress: string) {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const { loading, error, data } = useQuery(
        GET_EVENTS_IN_QUEUE(currentTime, creatorAddress)
    );
    if (loading) console.log("inQueue: Loading");
    if (error) console.log("inQueue: Error");

    if (data) {
        let formatted_data: NTTtype[] = data.nttcontracts.map((ntt: any) => {
            return {
                associatedCommunity: ntt.associatedCommunity,
                title: ntt.title,
                description: ntt.description,
                link: ntt.links,
                issueDate: ntt.timeStamp,
                image: ntt.imageHash,
                type: "Certificate",
                claimedStatus: [],
            };
        });
        return formatted_data;
    }
    return [];
}

function issuedEvents(creatorAddress: string) {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const { loading, error, data } = useQuery(
        GET_EVENTS_ISSUED(currentTime, creatorAddress)
    );
    if (loading) console.log("issued: Loading");
    if (error) console.log("issued: Error");

    if (data) {
        let formatted_data: NTTtype[] = data.nttcontracts.map((ntt: any) => {
            return {
                associatedCommunity: ntt.associatedCommunity,
                title: ntt.title,
                description: ntt.description,
                link: ntt.links,
                issueDate: ntt.timeStamp,
                image: ntt.imageHash,
                type: "Certificate",
                claimedStatus: [],
                contractAddress: ntt.contractAddress,
            };
        });
        return formatted_data;
    }
    return [];
}

export { inQueueEvents, issuedEvents };