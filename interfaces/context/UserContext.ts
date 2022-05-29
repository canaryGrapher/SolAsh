interface IContextUser {
    userName: string;
    set_username: (state: string) => void;
    walletAddress: string;
    set_wallet_address: (state: string) => void;
    chainId: string;
    set_chain_id: (state: string) => void;
}

export type { IContextUser }