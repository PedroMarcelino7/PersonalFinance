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

          <div className={styles.summary_container}>
            <h1>Summary</h1>

            <div className={styles.summary_box}>
              <div className={styles.summary_section}>
                <h3>Paid Bills</h3>
                <h2>4 ($190.00)</h2>
              </div>

              <hr />

              <div className={styles.summary_section}>
                <h3>Total Upcoming</h3>
                <h2>4 ($194.98)</h2>
              </div>

              <hr />

              <div
                className={`${styles.summary_section} ${styles.summary_footer}`}
              >
                <h3>Due Soon</h3>
                <h2>2 ($59.98)</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right_container}>
          <div className={styles.bills_container}>
            <div className={styles.header}>
              <input
                className={styles.search}
                type="text"
                placeholder="Search bills"
              />

              <div className={styles.sort_box}>
                <h3>Sort By</h3>
                <select name="" id="">
                  <option value="">Latest</option>
                </select>
              </div>
            </div>

            <div className={styles.table_box}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Bill Title</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.profile}>
                        <img src={""} alt={"a"} />
                        <h2>Spark Electric Solutions</h2>
                      </div>
                    </td>
                    <td>
                      <h3>Monthly-2nd</h3>
                      <img src={""} alt={"a"} />
                    </td>
                    <td>$100.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RecurringBills;
