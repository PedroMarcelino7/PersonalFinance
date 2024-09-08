import styles from './Login.module.scss'

// Images
import Logo from '../../assets/images/logo-large.svg'

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
                                Personal finance app puts you in control of your spending. <br />
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
                        <div className={styles.input_box}>
                            <label htmlFor="">Email</label>
                            <input type="email" />
                        </div>

                        <div className={styles.input_box}>
                            <label htmlFor="">Password</label>
                            <input type="password" />
                        </div>

                        <button type="submit">Login</button>
                    </form>

                    <h3>Need to create an account? <a href='/register'>Sign Up!</a></h3>
                </div>
            </div>
        </div>
    )
}

export default Login