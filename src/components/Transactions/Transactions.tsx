import styles from "./Transactions.module.scss";

// Components
import SummaryTitle from "../SummaryTitle/SummaryTitle";
import { useEffect } from "react";

interface Transaction {
  TRA_AMOUNT: number;
  TRA_AVATAR: string;
  TRA_CATEGORY: string;
  TRA_DATE: string;
  TRA_NAME: string;
  TRA_RECURRING: boolean;
}

interface Props {
  data: Transaction[] | null;
}

const Transactions = ({ data }: Props) => {
  const formatDate = (date: string): string => {
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);

    switch (month) {
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
      default:
        break;
    }

    return `${day} ${month} ${year}`;
  };

  const formatAmount = (amount: number): string => {
    return amount < 0
      ? `-$${Math.abs(amount).toFixed(2)}`
      : `+$${Math.abs(amount).toFixed(2)}`;
  };

  useEffect(() => {
    console.log("Transactions:", data);
  }, []);

  return (
    <div className="summary_card">
      <SummaryTitle title="Transactions" redirect="View All" />

      <div className={styles.transactions_box}>
        {data?.map((transaction, index) => (
          <div key={index}>
            <div className={styles.transaction}>
              <div className={styles.profile}>
                <img src={transaction.TRA_AVATAR} alt={transaction.TRA_NAME} />
                <h2>{transaction.TRA_NAME}</h2>
              </div>

              <div className={styles.details}>
                <div
                  className={styles.amount}
                  style={{
                    color: transaction.TRA_AMOUNT < 0 ? "#C94736" : "#277C78",
                  }}
                >
                  <h3>{formatAmount(transaction.TRA_AMOUNT)}</h3>
                </div>

                <div className={styles.date}>
                  <h4>{formatDate(transaction.TRA_DATE)}</h4>
                </div>
              </div>
            </div>

            {index < data.length - 1 && <div className={styles.divisor}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
