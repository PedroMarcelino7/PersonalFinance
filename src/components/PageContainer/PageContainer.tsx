import { ReactNode } from 'react'
import styles from './PageContainer.module.scss'

type Props = {
    title: string,
    children: ReactNode
}

const PageContainer = ({ title, children }: Props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>

            {children}
        </div>
    )
}

export default PageContainer