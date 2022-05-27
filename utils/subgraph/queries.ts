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

const GET_EVENTS_BY_ADDRESS = (userAddress: any) => gql`
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

const GET_EVENTS_IN_QUEUE = (currentTime: any) => gql`
  query {
    nttcontracts(where: { startDate_gt: "${currentTime}" }) {
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

const GET_EVENTS_ISSUED = (currentTime: any) => gql`
  query {
    nttcontracts(where: { startDate_lte: "${currentTime}" }) {
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

const GET_TOKENS_ISSUED = (userAddress: any) => gql`
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
      associatedCommunity
      isValid
      timeStamp
    }
  }
`;

const GET_ISSUER_STATUS = (contractAddress: any) => gql`
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

export {
  GET_ALL_EVENTS,
  GET_EVENTS_BY_ADDRESS,
  GET_TOKENS_ISSUED,
  GET_EVENTS_IN_QUEUE,
  GET_EVENTS_ISSUED,
  GET_ISSUER_STATUS,
};
