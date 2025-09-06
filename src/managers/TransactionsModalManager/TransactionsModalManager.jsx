import { memo } from "react";

import Modal from "../../components/modal/modal";

import addNewTransaction from '../../components/modal/TransactionsModals/addTransaction/addTransaction'

const MODAL_CONFIG = {
    addTransaction: {
        title: "Add New Transaction",
        Component: addNewTransaction,
        getProps: () => ({}),
    },
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
