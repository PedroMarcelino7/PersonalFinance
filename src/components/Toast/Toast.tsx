import styles from './Toast.module.scss'

// Images
import CloseButton from '../../assets/images/icon-close-toast.svg'

const Toast = () => {
    return (
        <div className={styles.toast_container}>
            <div className={styles.toast_box}>
                <div className={styles.toast_header_box}>
                    <div className={styles.toast_title_box}>
                        <div className={styles.toast_status}></div>
                        <h1>Title</h1>
                    </div>

                    <div className={styles.close_button}>
                        <img src={CloseButton} alt="" />
                    </div>
                </div>

                <div className={styles.toast_body_box}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, magnam.
                    </p>
                </div>

                <div className={styles.toast_footer_box}>
                    <div className={styles.progress_bar}></div>
                </div>
            </div>
        </div>
    )
}

export default Toast