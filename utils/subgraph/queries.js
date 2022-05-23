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

const GET_EVENTS_BY_ADDRESS = (userAddress) => gql`
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

const GET_EVENTS_IN_QUEUE = (currentTime) => gql`
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

const GET_EVENTS_ISSUED = (currentTime) => gql`
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

const GET_TOKENS_ISSUED = (userAddress) => gql`
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

export {
  GET_ALL_EVENTS,
  GET_EVENTS_BY_ADDRESS,
  GET_TOKENS_ISSUED,
  GET_EVENTS_IN_QUEUE,
  GET_EVENTS_ISSUED,
};
