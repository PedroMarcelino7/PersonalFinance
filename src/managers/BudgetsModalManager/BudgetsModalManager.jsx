import { memo } from "react";

import Modal from "../../components/modal/modal";

import AddBudget from '../../components/modal/BudgetsModals/addNewBudget/addNewBudget'
import EditBudget from '../../components/modal/BudgetsModals/editBudget/editBudget'
import DeleteBudget from '../../components/modal/BudgetsModals/deleteBudget/deleteBudget'

const MODAL_CONFIG = {
    add: {
        title: "Add Budget",
        subtitle:
            "Choose a budget to set a spending budget. These budgets can help you monitor spending.",
        Component: AddBudget,
        getProps: () => ({}),
    },
    edit: {
        title: ({ budget }) => `Edit "${budget?.budget_name}"`,
        subtitle: "As your budgets change, feel free to update your spending limits.",
        Component: EditBudget,
        getProps: ({ budget }) => ({ budget }),
    },
    delete: {
        title: ({ budget }) => `Delete "${budget?.budget_name}"`,
        subtitle:
            "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.",
        Component: DeleteBudget,
        getProps: ({ budget }) => ({ budget }),
    },
};

function BudgetsModalManager({ modal, onClose }) {
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

export default memo(BudgetsModalManager);
