interface IContextUser {
    userName: string;
    set_username: (state: string) => void;
    walletAddress: string;
    set_wallet_address: (state: string) => void;
}

export type { IContextUser }