import { NTTtype, TokenDetailType } from "@interfaces/pages/Home"

interface InformationModalProps extends TokenDetailType {
    closeModal: () => void;
    revokeToken: () => void;

}

export type { InformationModalProps }