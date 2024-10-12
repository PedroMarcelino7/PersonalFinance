import styles from './Toast.module.scss'

// Images
import CloseButton from '../../assets/images/icon-close-toast.svg'
import { useEffect, useState } from 'react'

interface Props {
    title: string,
    description: string,
    theme: string
}

const Toast = ({ title, description, theme }: Props) => {
    const [showToast, setShowToast] = useState<boolean>(false)
    const [width, setWidth] = useState<number>(0)

    const progressBar = () => {
        if (width <= 100) {
            setTimeout(() => {
                setWidth(width + 1)
            }, 50)
        } else {
            setShowToast(false)
        }
    }

    useEffect(() => {
        progressBar()
    }, [width])

    return (
        <div className={styles.toast_container}>
            <div className={styles.toast_box}>
                <div className={styles.toast_header_box}>
                    <div className={styles.toast_title_box}>
                        <div className={styles.toast_status}
                            style={{ backgroundColor: `${theme}` }}>
                        </div>
                        <h1>{title}</h1>
                    </div>

                    <div className={styles.close_button}>
                        <img src={CloseButton} alt="" />
                    </div>
                </div>

                <div className={styles.toast_body_box}>
                    <p>
                        {description}
                    </p>
                </div>

                <div className={styles.toast_footer_box}>
                    <div className={styles.progress_bar}
                        style={{
                            backgroundColor: `${theme}`,
                            width: `${width}%`
                        }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast