import { LandingSpecsProps } from "@interfaces/pages/Landing";

import {
    Fast,
    Secure,
    Reliable
} from "@resources/exports"

const LayoutValues: LandingSpecsProps[] = [
    {
        heading: "Blazing fast and super cheap",
        description:
            "SolAsh is hosted on Polygon which makes sure that SolAsh is one of the cheapest options you can choose from. NTTs are a secure, fast and optimimzed solution for issuing certificates and tokens.",
        image: Fast,
    },
    {
        heading: "Reliable",
        description:
            "Being hosted on the blockchian ensures that our systems have 100% uptime, is free of government censorship, and is immutable once issued. Only you, and your issuer can in-validate a token or certificate after being signed. ",
        image: Reliable,
    },
    {
        heading: "Secure",
        description:
            "Your crypto wallet is the key to your account. Nobody can reset your passsword, or control the account. We cannot delete your account under any circumstances and you are the true owner of your data. ",
        image: Secure,
    },
];

export { LayoutValues };