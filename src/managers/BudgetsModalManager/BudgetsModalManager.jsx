import { memo } from "react";

import Modal from "../../components/modal/modal";

import AddCategory from '../../components/modal/BudgetsModals/addNewBudget/addNewBudget'
import EditCategory from '../../components/modal/BudgetsModals/editBudget/editBudget'
import DeleteCategory from '../../components/modal/BudgetsModals/deleteBudget/deleteBudget'
import FullSummary from '../../components/modal/BudgetsModals/fullSummary/fullSummary'

const MODAL_CONFIG = {
    add: {
        title: "Add New Budget",
        subtitle:
            "Choose a category to set a spending budget. These categories can help you monitor spending.",
        Component: AddCategory,
        getProps: () => ({}),
    },
    edit: {
        title: ({ category }) => `Edit "${category?.category_name}"`,
        subtitle: "As your budgets change, feel free to update your spending limits.",
        Component: EditCategory,
        getProps: ({ category }) => ({ category }),
    },
    delete: {
        title: ({ category }) => `Delete "${category?.category_name}"`,
        subtitle:
            "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.",
        Component: DeleteCategory,
        getProps: ({ category }) => ({ category }),
    },
    summary: {
        title: "Budgets Summary",
        Component: FullSummary,
        getProps: () => ({}),
    }
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
