interface WalletConnectProps {
    killComponent: (name: string) => void;
    authenticate: (walletAddress: string) => void;
}

enum WalletConnectStatus {
    "MetamaskWallet", "WalletConnect", "BinanceWallet", "Disabled"
}

export type { WalletConnectProps };
export { WalletConnectStatus }