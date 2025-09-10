import { memo } from "react";

import Modal from "../../components/modal/modal";

import addTransaction from '../../components/modal/TransactionsModals/addTransaction/addTransaction'
import addCategory from '../../components/modal/BudgetsModals/addNewBudget/addNewBudget'
import addPerson from "../../components/modal/PeopleModals/AddPerson/AddPerson";

const MODAL_CONFIG = {
    addTransaction: {
        title: "Add Transaction",
        Component: addTransaction,
        getProps: () => ({}),
    },
    addCategory: {
        title: "Add Category",
        Component: addCategory,
        getProps: () => ({}),
    },
    addPerson: {
        title: 'Add Person',
        Component: addPerson,
        getProps: () => ({})
    }
};

function TransactionsModalManager({ modal, onClose }) {
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

export default memo(TransactionsModalManager);
