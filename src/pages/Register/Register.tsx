import styles from './Register.module.scss'

// Images
import Logo from '../../assets/images/logo-large.svg'

const Register = () => {
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
                                Personal finance app puts you in control of your spending. <br />
                                Track transactions, set budgets, adn add to savings pots easily.
                            </p>
                        </div>
                    </image>
                </div>
            </div>

            <div className={styles.formulary}>
                <div className={styles.formulary_box}>
                    <h1>Sign Up</h1>

                    <form>
                        <div className={styles.input_box}>
                            <label htmlFor="">Name</label>
                            <input type="text" />
                        </div>

                        <div className={styles.input_box}>
                            <label htmlFor="">Email</label>
                            <input type="email" />
                        </div>

                        <div className={styles.input_box}>
                            <label htmlFor="">Create Password</label>
                            <input type="password" />
                            <span>Password must be at least 8 characters.</span>
                        </div>

                        <button type="submit">Create Account</button>
                    </form>

                    <h3>Already have an account? <span>Login!</span></h3>
                </div>
            </div>
        </div>
    )
}

export default Register