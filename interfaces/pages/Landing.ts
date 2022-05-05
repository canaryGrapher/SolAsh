import { StaticImageData } from "next/image";

interface LandingSpecsProps {
    heading: string;
    description: string;
    image: StaticImageData;
}

interface SpecsComponentsProps extends LandingSpecsProps {
    alignment: "row" | "row-reverse";
}

export type { LandingSpecsProps, SpecsComponentsProps };