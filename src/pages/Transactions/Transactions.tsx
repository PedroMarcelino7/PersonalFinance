import styles from "./Transactions.module.scss";

import { useEffect, useState } from "react";

// Components
import PageContainer from "../../components/PageContainer/PageContainer";

// Images
import PrevArrow from "../../assets/images/icon-caret-left.svg";
import NextArrow from "../../assets/images/icon-caret-right.svg";
import DropdownArrow from "../../assets/images/icon-caret-down.svg";

interface Transaction {
  TRA_AMOUNT: number;
  TRA_AVATAR: string;
  TRA_CATEGORY: string;
  TRA_DATE: string;
  TRA_NAME: string;
  TRA_RECURRING: boolean;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction | null>(null);
  const [pagesQuantity, setPagesQuantity] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const limit = 8;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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

  const getTransactions = async () => {
    const offset = (actualPage - 1) * limit;

    try {
      const response = await fetch(
        `http://localhost:3001/get/transactions?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Transactions", result);
      setTransactions(result);
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const getPagesQuantity = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/get/transactions/quantity`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Quantity", result);

      console.log("Actual page", actualPage);

      setPagesQuantity(Math.ceil(result.quantity / limit));

      getTransactions();
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getPagesQuantity();
  }, []);

  useEffect(() => {
    getPagesQuantity();
  }, [actualPage]);

  return (
    <PageContainer title="Transactions">
      <div className={styles.transactions_container}>
        <div className={styles.navbar}>
          <div className={styles.search_box}>
            <input type="text" placeholder="Search transaction" />
          </div>

          <div className={styles.filters}>
            <div className={styles.filter}>
              <h3>Sort by</h3>

              {showDropdown ? (
                <div className={`${styles.dropdown} ${styles.expanded}`}>
                  <div className={styles.dropdown_option}>
                    <h2>Latest</h2>
                  </div>
                  <div className={styles.dropdown_option}>
                    <h2 className={styles.expanded}>Oldest</h2>
                  </div>
                  <div className={styles.dropdown_option}>
                    <h2 className={styles.expanded}>A to Z</h2>
                  </div>
                  <div className={styles.dropdown_option}>
                    <h2 className={styles.expanded}>Z to A</h2>
                  </div>
                  <div className={styles.dropdown_option}>
                    <h2 className={styles.expanded}>Highest</h2>
                  </div>
                  <div className={styles.dropdown_option}>
                    <h2 className={styles.expanded}>Lowest</h2>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.dropdown}
                  onClick={() => setShowDropdown(true)}
                >
                  <div className={styles.dropdown_option}>
                    <h2>Latest</h2>
                    <img src={DropdownArrow} alt="" />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.filter}>
              <h3>Category</h3>

              <select name="" id="">
                <option value="">All Transactions</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.table_box}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Recipient / Sender</th>
                <th>Category</th>
                <th>Transaction Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.profile}>
                        <img
                          src={transaction.TRA_AVATAR}
                          alt={transaction.TRA_NAME}
                        />
                        <h2>{transaction.TRA_NAME}</h2>
                      </div>
                    </td>
                    <td>{transaction.TRA_CATEGORY}</td>
                    <td>{formatDate(transaction.TRA_DATE)}</td>
                    <td
                      style={{
                        color:
                          transaction.TRA_AMOUNT < 0 ? "#C94736" : "#277C78",
                        fontWeight: 600,
                      }}
                    >
                      {formatAmount(transaction.TRA_AMOUNT)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div
            className={styles.button}
            onClick={() => {
              actualPage - 1 <= 0 ? "" : setActualPage(actualPage - 1);
            }}
          >
            <img src={PrevArrow} alt="" />
            <h3>Prev</h3>
          </div>

          <div className={styles.pages}>
            {Array.from({ length: pagesQuantity }).map((_, index) => (
              <button
                key={index}
                className={index + 1 === actualPage ? `${styles.selected}` : ""}
                onClick={() => setActualPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div
            className={styles.button}
            onClick={() => {
              actualPage + 1 > pagesQuantity
                ? ""
                : setActualPage(actualPage + 1);
            }}
          >
            <h3>Next</h3>
            <img src={NextArrow} alt="" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Transactions;
