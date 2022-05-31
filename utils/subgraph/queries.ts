import { gql } from "@apollo/client";

const GET_ALL_EVENTS = () => gql`
  query {
    nttcontracts(orderBy: id) {
      id
      contractAddress
      creatorAddress
      title
      description
      links
      imageHash
      associatedCommunity
      startDate
      endDate
      timeStamp
    }
  }
`;

const GET_EVENTS_BY_ADDRESS = (userAddress: string) => gql`
  query {
    nttcontracts(where:{creatorAddress: "${userAddress}"}) {
      id
      contractAddress
      creatorAddress
      title
      description
      links
      imageHash
      associatedCommunity
      startDate
      endDate
      timeStamp
    }
  }
`;

//Get event details given contract address
const GET_EVENT_DETAILS = (contractAddress: string) => gql`
  query {
    nttcontracts(where:{contractAddress: "${contractAddress}"}) {
      id
      contractAddress
      creatorAddress
      title
      description
      links
      imageHash
      associatedCommunity
      startDate
      endDate
      timeStamp
    }
  }
`;


const GET_EVENTS_IN_QUEUE = (currentTime: any, creatorAddress: string) => gql`
  query {
    nttcontracts(
      where: { 
        startDate_gt: "${currentTime}",
        creatorAddress: "${creatorAddress}" 
      }
    ) {
      id
      contractAddress
      creatorAddress
      title
      description
      links
      imageHash
      associatedCommunity
      startDate
      endDate
      timeStamp
    }
  }
`;

const GET_EVENTS_ISSUED = (currentTime: any, creatorAddress: string) => gql`
  query {
    nttcontracts(
      where: { 
        startDate_lte: "${currentTime}",
        creatorAddress: "${creatorAddress}"  
      }
    ) {
      id
      contractAddress
      creatorAddress
      title
      description
      links
      imageHash
      associatedCommunity
      startDate
      endDate
      timeStamp
    }
  }
`;


const GET_TOKENS_ISSUED = (userAddress: string) => gql`
  query {
    tokens(
      where: {
        receiverAddress: "${userAddress}",
        isValid: true
      },
      orderBy: timeStamp
    ) {
      id
      contractAddress
      tokenId
      creatorAddress
      receiverAddress
      title
      description
      links
      imageHash
      associatedCommunity
      isValid
      timeStamp
    }
  }
`;

const GET_ISSUER_STATUS = (contractAddress: string) => gql`
  query {
    whitelistItems(
      where: { contractAddress: "${contractAddress}" }
    ) {
      id
      contractAddress
      userAddress
      status
    }
  }
`;

const GET_USER_STATUS = (contractAddress: string, userAddress: string) => gql`
  query {
    whitelistItems(
      where: { 
        contractAddress: "${contractAddress}",
        userAddress: "${userAddress}" 
      }
    ) {
      id
      contractAddress
      userAddress
      status
    }
  }
`;


export {
  GET_ALL_EVENTS,
  GET_EVENTS_BY_ADDRESS,
  GET_EVENT_DETAILS,
  GET_TOKENS_ISSUED,
  GET_EVENTS_IN_QUEUE,
  GET_EVENTS_ISSUED,
  GET_ISSUER_STATUS,
  GET_USER_STATUS
};
