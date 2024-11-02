import styles from "./LabeledInput.module.scss";

type Props = {
  label: string;
  type: "text" | "email" | "password";
  name: string;
  icon?: string;
  onIconClick?: () => void;
};

const LabeledInput = ({ label, type, name, icon, onIconClick }: Props) => {
  return (
    <div className={styles.box}>
      <label htmlFor={name}>{label}</label>

      <div className={styles.input}>
        <input type={type} id={name} name={name} />
        {icon && (
          <img
            className={styles.icon}
            onClick={onIconClick}
            src={icon}
            alt="A"
          />
        )}
      </div>
    </div>
  );
};

export default LabeledInput;
