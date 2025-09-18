import { memo } from "react";

import Modal from "../../components/modal/modal";

import AddPot from "../../components/modal/PotsModals/addPot/addPot";
import EditPot from "../../components/modal/PotsModals/editPot/editPot";
import DeletePot from "../../components/modal/PotsModals/deletePot/deletePot";
import FinishPot from "../../components/modal/PotsModals/finishPot/finishPot";
import AddMoney from "../../components/modal/PotsModals/addMoney/addMoney";
import WithdrawMoney from "../../components/modal/PotsModals/withdrawMoney/withdrawMoney";
import RecoverPot from "../../components/modal/PotsModals/recoverPot/recoverPot";

const MODAL_CONFIG = {
    add: {
        title: "Add New Pot",
        subtitle:
            "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
        Component: AddPot,
        getProps: () => ({}),
    },
    edit: {
        title: ({ pot }) => `Edit "${pot?.pot_name}"`,
        subtitle: "If your saving targets change, feel free to update your pots.",
        Component: EditPot,
        getProps: ({ pot }) => ({ pot }),
    },
    delete: {
        title: ({ pot }) => `Delete "${pot?.pot_name}"`,
        subtitle:
            "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.",
        Component: DeletePot,
        getProps: ({ pot }) => ({ pot }),
    },
    finish: {
        title: ({ pot }) => `Finish "${pot?.pot_name}"`,
        subtitle:
            "Are you sure you want to finish this pot?",
        Component: FinishPot,
        getProps: ({ pot }) => ({ pot }),
    },
    recover: {
        title: ({ pot }) => `Recover "${pot?.pot_name}"`,
        subtitle:
            "Are you sure you want to recover this pot?",
        Component: RecoverPot,
        getProps: ({ pot }) => ({ pot }),
    },
    addMoney: {
        title: ({ pot }) => `Add money to "${pot?.pot_name}"`,
        subtitle:
            "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.",
        Component: AddMoney,
        getProps: ({ pot }) => ({ pot }),
    },
    withdraw: {
        title: ({ pot }) => `Withdraw from "${pot?.pot_name}"`,
        subtitle:
            "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.",
        Component: WithdrawMoney,
        getProps: ({ pot }) => ({ pot }),
    },
};

function PotsModalManager({ modal, onClose }) {
    const type = modal?.type;
    if (!type) return null;

    const config = MODAL_CONFIG[type];
    if (!config) return null;

    const { Component } = config;
    const childProps = config.getProps ? config.getProps(modal) : {};

    const title = typeof config.title === "function" ? config.title(modal) : config.title;
    const subtitle = typeof config.subtitle === "function"
        ? config.subtitle(modal)
        : config.subtitle;

    return (
        <Modal title={title} subtitle={subtitle} closeModal={onClose}>
            <Component {...childProps} />
        </Modal>
    );
}

export default memo(PotsModalManager);
