import styles from './Budgets.module.scss'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'

const Budgets = () => {
    return (
        <PageContainer title='Budgets'>
            <div className={styles.budgets}>
                <div className={styles.chart_container}>
                    {/* https://apexcharts.com/react-chart-demos/pie-charts/simple-pie-chart/ */}
                </div>
            </div>
        </PageContainer>
    )
}

export default Budgets