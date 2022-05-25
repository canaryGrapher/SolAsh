import { NTTtype } from "@interfaces/pages/Home"

interface InformationModalProps extends NTTtype {
    closeModal: () => void;
    revokeToken: () => void;

}

export type { InformationModalProps }