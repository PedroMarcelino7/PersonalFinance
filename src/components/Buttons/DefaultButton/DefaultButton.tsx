import styles from "./DefaultButton.module.scss";

type Props = {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
};

const DefaultButton = ({ text, type }: Props) => {
  return (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );
};

export default DefaultButton;
