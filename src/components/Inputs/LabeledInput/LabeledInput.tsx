import styles from "./LabeledInput.module.scss";

type Props = {
  label: string;
  type: "text" | "email" | "password";
  name: string;
  icon?: string;
  onIconClick?: () => void;
  validationLabel?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LabeledInput = ({
  label,
  type,
  name,
  icon,
  onIconClick,
  validationLabel,
  value,
  onChange,
}: Props) => {
  return (
    <div className={styles.input_box}>
      <div className={styles.box}>
        <label htmlFor={name}>{label}</label>

        <div className={styles.input}>
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          />
          {icon && (
            <img
              className={styles.icon}
              onClick={onIconClick}
              src={icon}
              alt={name}
            />
          )}
        </div>
      </div>

      <span className={styles.input_alert}>{validationLabel}</span>
    </div>
  );
};

export default LabeledInput;
