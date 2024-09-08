import styles from './PageContainer.module.scss'

import { ReactNode } from 'react'

type Props = {
    title: string,
    children: ReactNode,
    button?: string
}

const PageContainer = ({ title, children, button }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>

                {button &&
                    <button type='button' className={styles.button}>
                        <span>+</span> {button}
                    </button>
                }
            </div>

            {children}
        </div>
    )
}

export default PageContainer