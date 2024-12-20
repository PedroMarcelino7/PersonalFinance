import styles from "./Pots.module.scss";

import { useEffect, useState } from "react";

// Components
import PageContainer from "../../components/PageContainer/PageContainer";
import AddNewPotModal from "../../components/PotModal/AddNewPot/AddNewPotModal";
import EditPotModal from "../../components/PotModal/EditPot/EditPotModal";
import DeletePotModal from "../../components/PotModal/DeletePot/DeletePotModal";
import WithdrawModal from "../../components/PotModal/Withdraw/WithdrawModal";
import AddMoneyModal from "../../components/PotModal/AddMoney/AddMoneyModal";

// Images
import Options from "../../assets/images/icon-ellipsis.svg";
import Toast from "../../components/Toast/Toast";

interface Pot {
  POT_ID: number;
  POT_NAME: string;
  POT_TARGET: number;
  POT_THEME: string;
  POT_TOTAL: number;
}

const Pots = () => {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [showAddNewPotModal, setShowAddNewPotModal] = useState<boolean>(false);
  const [showEditPotModal, setShowEditPotModal] = useState<boolean>(false);
  const [showDeletePotModal, setShowDeletePotModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState<boolean>(false);
  const [potToEdit, setPotToEdit] = useState<Pot | null>(null);
  const [potToDelete, setPotToDelete] = useState<Pot | null>(null);

  const getProgress = (total: number, target: number): number => {
    return (100 * total) / target;
  };

  const handleShowDropdown = (index: number) => {
    setShowDropdown(showDropdown === index ? null : index);
  };

  const handleShowAddNewPotModal = () => {
    setShowDropdown(null);
    setShowAddNewPotModal(true);
  };

  const handleCloseAddNewPotModal = () => {
    setShowAddNewPotModal(false);
  };

  const handleShowEditPotModal = (pot: Pot) => {
    setPotToEdit(pot);
    setShowDropdown(null);
    setShowEditPotModal(true);
  };

  const handleCloseEditPotModal = () => {
    setShowEditPotModal(false);
  };

  const handleShowWithdrawModal = (pot: Pot) => {
    setPotToEdit(pot);
    setShowWithdrawModal(true);
  };

  const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
  };

  const handleShowAddMoneyModal = (pot: Pot) => {
    setPotToEdit(pot);
    setShowAddMoneyModal(true);
  };

  const handleCloseAddMoneyModal = () => {
    setShowAddMoneyModal(false);
  };

  const handleShowDeletePotModal = (pot: Pot) => {
    setPotToDelete(pot);
    setShowDropdown(null);
    setShowDeletePotModal(true);
  };

  const handleCloseDeletePotModal = () => {
    setShowDeletePotModal(false);
  };

  // POTS DATA
  const [pots, setPots] = useState<Pot[] | null>(null);

  const getPots = async () => {
    try {
      const response = await fetch(`http://localhost:3001/get/pots`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setPots(result);

      console.log("Get Pots:", result);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getPots();
  }, []);

  return (
    <>
      <PageContainer
        title="Pots"
        button="Add New Pot"
        onClick={handleShowAddNewPotModal}
      >
        <div className={styles.pots}>
          {pots &&
            pots.map((pot, index) => (
              <div className={styles.pot} key={index}>
                <div className={styles.pot_header}>
                  <div className={styles.pot_name_box}>
                    <div
                      className={styles.circle}
                      style={{ backgroundColor: `${pot.POT_THEME}` }}
                    ></div>
                    <h1 className={styles.pot_name}>{pot.POT_NAME}</h1>
                  </div>

                  <div className={styles.options}>
                    <div
                      className={styles.image_box}
                      onClick={() => handleShowDropdown(index)}
                    >
                      <img src={Options} alt="" />
                    </div>

                    {showDropdown === index && (
                      <div className={styles.dropdown}>
                        <h6 onClick={() => handleShowEditPotModal(pot)}>
                          Edit Pot
                        </h6>
                        <hr />
                        <h6 onClick={() => handleShowDeletePotModal(pot)}>
                          <span>Delete Pot</span>
                        </h6>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.total_container}>
                  <div className={styles.total_box}>
                    <h3>Total Saved</h3>
                    <h2>${pot.POT_TOTAL.toFixed(2)}</h2>
                  </div>

                  <div className={styles.progress_box}>
                    <div className={styles.progress_bar}>
                      <div
                        className={styles.progress}
                        style={{
                          width: `${getProgress(
                            pot.POT_TOTAL,
                            pot.POT_TARGET
                          )}%`,
                          backgroundColor: `${pot.POT_THEME}`,
                        }}
                      ></div>
                    </div>

                    <div className={styles.progress_count}>
                      <h4>
                        {getProgress(pot.POT_TOTAL, pot.POT_TARGET).toFixed(2)}%
                      </h4>
                      <h5>Target of ${pot.POT_TARGET.toFixed(2)}</h5>
                    </div>
                  </div>
                </div>

                <div className={styles.buttons_box}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => handleShowAddMoneyModal(pot)}
                  >
                    <span>+</span> Add Money
                  </button>

                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => handleShowWithdrawModal(pot)}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
        </div>

        {showAddNewPotModal && (
          <AddNewPotModal closeModal={handleCloseAddNewPotModal} />
        )}
        {showEditPotModal && (
          <EditPotModal
            closeModal={handleCloseEditPotModal}
            potToEdit={potToEdit}
          />
        )}
        {showDeletePotModal && (
          <DeletePotModal
            closeModal={handleCloseDeletePotModal}
            potToDelete={potToDelete}
          />
        )}
        {showWithdrawModal && (
          <WithdrawModal
            closeModal={handleCloseWithdrawModal}
            potToEdit={potToEdit}
          />
        )}
        {showAddMoneyModal && (
          <AddMoneyModal
            closeModal={handleCloseAddMoneyModal}
            potToEdit={potToEdit}
          />
        )}
        <Toast
          title="Teste"
          description="teste teste teste teste teste teste teste teste teste"
          theme="#ff0000"
        />
      </PageContainer>
    </>
  );
};

export default Pots;
