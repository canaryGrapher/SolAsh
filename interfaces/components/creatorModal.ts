import { NTTtype } from "@interfaces/pages/Dashboard";

interface ModalProps extends NTTtype {
    closeModal: () => void;
    burnToken: () => void;
}

export type { ModalProps };