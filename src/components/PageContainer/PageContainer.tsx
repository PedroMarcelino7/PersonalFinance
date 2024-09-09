import styles from './PageContainer.module.scss'

import { ReactNode } from 'react'

type Props = {
    title: string,
    children: ReactNode,
    button?: string,
    onClick?: () => void
}

const PageContainer = ({ title, children, button, onClick }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>

                {button &&
                    <button onClick={onClick} type='button' className={styles.button}>
                        <span>+</span> {button}
                    </button>
                }
            </div>

            {children}
        </div>
    )
}

export default PageContainer