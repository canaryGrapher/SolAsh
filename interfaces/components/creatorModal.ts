import { NTTtype } from "@interfaces/pages/Dashboard";

interface ModalProps extends NTTtype {
    closeModal: () => void;
    burnToken: () => void;
    getIssuerStatus: (contractAddress: string) => any;
    contractAddress: string;
}

export type { ModalProps };