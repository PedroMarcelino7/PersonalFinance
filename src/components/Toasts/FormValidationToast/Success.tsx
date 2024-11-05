import styles from "./Success.module.scss";

// Images
import CloseIcon from "../../../assets/images/icon-close-toast.svg";

type Props = {
  title: string;
  description: string;
};

const Success = ({ title, description }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <h1>{title}</h1>

          <img src={CloseIcon} alt={title} />
        </div>

        <div className={styles.description}>
          <p>{description}</p>
        </div>

        <div className={styles.loading_bar_box}>
          <div className={styles.loading_bar}></div>
        </div>
      </div>
    </div>
  );
};

export default Success;
