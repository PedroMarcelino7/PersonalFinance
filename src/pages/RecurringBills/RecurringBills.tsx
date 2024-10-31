import styles from "./RecurringBills.module.scss";

// Components
import PageContainer from "../../components/PageContainer/PageContainer";

// Images
import BillsIcon from "../../assets/images/icon-recurring-bills.svg";

const RecurringBills = () => {
  return (
    <PageContainer title="Recurring Bills">
      <div className={styles.recurring_bills}>
        <div className={styles.left_container}>
          <div className={styles.total_container}>
            <img src={BillsIcon} alt="" />

            <div className={styles.total_description}>
              <h3>Total Bills</h3>
              <h2>$384.98</h2>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RecurringBills;
