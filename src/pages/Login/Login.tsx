import styles from "./Login.module.scss";

import { useState } from "react";

// Components
import LabeledInput from "../../components/Inputs/LabeledInput/LabeledInput";
import DefaultButton from "../../components/Buttons/DefaultButton/DefaultButton";

// Images
import Logo from "../../assets/images/logo-large.svg";
import EyeIcon from "../../assets/images/icon-show-password.svg";
import EyeSlashedIcon from "../../assets/images/icon-hide-password.svg";

// interface User {
//   USER_ID: number;
//   USER_NAME: string;
//   USER_EMAIL: string;
//   USER_PASSWORD: string;
// }

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const user = await userToLogin(email);

    console.log(user?.USER_EMAIL);

    if (!user || email !== user.USER_EMAIL) {
      alert("email errado");
    } else if (password !== user.USER_PASSWORD) {
      alert("senha incorreta");
    } else {
      alert("login efetuado");
      sessionStorage.setItem("userId", user.USER_ID.toString());
    }

    setLoading(false);
  };

  const userToLogin = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/login?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("User to login:", result);

      return result[0];
    } catch (error: any) {
      console.log("Error: ", error);
      return undefined;
    }
  };

  return (
    <div className={styles.authentication_container}>
      <div className={styles.image_container}>
        <div className={styles.image_background}>
          <div className={styles.image_box}>
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
          </div>
        </div>
      </div>

      <div className={styles.formulary}>
        <div className={styles.formulary_box}>
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <LabeledInput
              label="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <LabeledInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              icon={showPassword ? EyeSlashedIcon : EyeIcon}
              onIconClick={handleShowPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <DefaultButton text={"Login"} type={"submit"} loading={loading} />
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
