import styles from "@styles/components/pages/Specs.module.scss";
import { SpecsComponentsProps } from "@interfaces/pages/Landing";
import Image from "next/image";

const Specs = (props: SpecsComponentsProps) => (
  <div
    className={styles.container}
    style={{ flexDirection: `${props.alignment}` }}
  >
    <Image src={props.image} height={400} width={400} />
    <div className={styles.content}>
      <h1>{props.heading}</h1>
      <p>{props.description}</p>
    </div>
  </div>
);

export default Specs;
