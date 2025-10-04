import { memo } from "react";

import Modal from "../../components/modal/modal";

import AddRecurringBill from "../../components/modal/RecurringBillsModals/addRecurringBill/addRecurringBill";
import AddPerson from "../../components/modal/PeopleModals/AddPerson/addPerson";
import AddBudget from "../../components/modal/BudgetsModals/addBudget/addBudget";

const MODAL_CONFIG = {
    add: {
        title: "Add Recurring Bill",
        subtitle:
            "Create a recurring bill. These can help keep you on track as you save for fixes bills.",
        Component: AddRecurringBill,
        getProps: () => ({}),
    },
    addPerson: {
        title: "Add Person",
        Component: AddPerson,
        getProps: () => ({}),
    },
    addBudget: {
        title: "Add Budget",
        Component: AddBudget,
        getProps: () => ({}),
    },
};

function RecurringBillsModalManager({ modal, onClose }) {
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

export default memo(RecurringBillsModalManager);
