import styles from "./Register.module.scss";

// Component
import LabeledInput from "../../components/Inputs/LabeledInput/LabeledInput";

// Images
import Logo from "../../assets/images/logo-large.svg";
import EyeIcon from "../../assets/images/icon-show-password.svg";
import EyeSlashedIcon from "../../assets/images/icon-hide-password.svg";
import { useState } from "react";
import DefaultButton from "../../components/Buttons/DefaultButton/DefaultButton";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    userRegister();

    setLoading(false);
  };

  const userRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("User registered:", result);
    } catch (error: any) {
      console.log("Error: ", error);
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

      <div className={styles.mobile_header}>
        <img src={Logo} alt="" />
      </div>

      <div className={styles.formulary}>
        <div className={styles.formulary_box}>
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <LabeledInput
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <LabeledInput
              label="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <LabeledInput
              label="Create Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={showPassword ? EyeSlashedIcon : EyeIcon}
              onIconClick={handleShowPassword}
              validationLabel={"Password must be at least 8 characters."}
            />

            <DefaultButton
              text={"Create Account"}
              type={"submit"}
              loading={loading}
            />
          </form>

          <h3>
            Already have an account? <a href="/login">Login!</a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
