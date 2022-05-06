import { StaticImageData } from "next/Image"

interface LoginPropsTypes {
    toggleFunction: () => void;
    setusername: (state: string) => void;
    setWalletAddress: (state: string) => void;
    connectWallet: (name: string) => void;
}

interface OptionsPropsTypes {
    name: string;
    logo: StaticImageData;
}

interface OptionsPassedPropsTypes {
    name: string;
    logo: StaticImageData;
    connectWallet: (name: string) => void;
}

export type { LoginPropsTypes, OptionsPropsTypes, OptionsPassedPropsTypes }