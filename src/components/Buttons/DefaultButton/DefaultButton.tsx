import styles from "./DefaultButton.module.scss";

type Props = {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  loading: boolean;
};

const DefaultButton = ({ text, type, loading }: Props) => {
  return (
    <button
      className={`${styles.button} ${loading && styles.loading}`}
      disabled={loading}
      type={type}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
