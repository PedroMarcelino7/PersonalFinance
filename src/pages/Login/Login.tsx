import styles from "./Login.module.scss";

// Components
import LabeledInput from "../../components/Inputs/LabeledInput/LabeledInput";

// Images
import Logo from "../../assets/images/logo-large.svg";
import EyeIcon from "../../assets/images/icon-show-password.svg";

const Login = () => {
  return (
    <div className={styles.authentication_container}>
      <div className={styles.image_container}>
        <div className={styles.image_background}>
          <image className={styles.image_box}>
            <div>
              <img className={styles.logo} src={Logo} alt="" />
            </div>

            <div className={styles.image_footer}>
              <h2>
                Keep track of your money <br />
                and save for your future
              </h2>

              <p>
                Personal finance app puts you in control of your spending.{" "}
                <br />
                Track transactions, set budgets, adn add to savings pots easily.
              </p>
            </div>
          </image>
        </div>
      </div>

      <div className={styles.formulary}>
        <div className={styles.formulary_box}>
          <h1>Login</h1>

          <form>
            <LabeledInput label="E-mail" type="email" name="email" />

            <LabeledInput
              label="Password"
              type="password"
              name="password"
              icon={EyeIcon}
            />

            <button type="submit">Login</button>
          </form>

          <h3>
            Need to create an account? <a href="/register">Sign Up!</a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
