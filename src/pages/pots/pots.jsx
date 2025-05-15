import React, { useEffect, useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Button, Card, CardButtons, CardContent, CardDateBox, CardHeader, CardOptionsBox, CardOptionsContainer, CardTitle, CardTitleBox, Identifier, Option, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, TotalSavedBox } from './styles'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import IconLink from '../../assets/images/icon-link.svg'
import { usePots } from '../../contexts/potsContext'
import Modal from '../../components/modal/modal'
import AddNewPot from '../../components/modal/addNewPot/addNewPot'
import AddMoney from '../../components/modal/addMoney/addMoney'
import WithdrawMoney from '../../components/modal/withdrawMoney/withdrawMoney'
import EditPot from '../../components/modal/editPot/editPot'
import DeletePot from '../../components/modal/deletePot/deletePot'

const Pots = () => {
    const { pots } = usePots()

    const [selectedPot, setSelectedPot] = useState(pots[0])

    const [showAddPotModal, setShowAddPotModal] = useState(false)
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
    const [showWithdrawMoneyModal, setShowWithdrawMoneyModal] = useState(false)
    const [showEditPotModal, setShowEditPotModal] = useState(false)
    const [showDeletePotModal, setShowDeletePotModal] = useState(false)
    const [showOptions, setShowOptions] = useState(0)

    useEffect(() => {
        console.log('Pots [Pots Page]:', pots)
    }, [pots])

    const getPercentage = (pot) => {
        const quantity = Number(pot.pot_quantity);
        const target = Number(pot.pot_target);

        return ((quantity * 100) / target).toFixed(2)
    }

    const dateFormatter = (date) => {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)

        return `${day}/${month}/${year}`
    }

    const handleShowAddPotModal = () => {
        setShowAddPotModal(true)
    }

    const handleShowAddMoneyModal = (pot) => {
        setShowAddMoneyModal(true)
        setSelectedPot(pot)
    }

    const handleShowWithdrawMoneyModal = (pot) => {
        setShowWithdrawMoneyModal(true)
        setSelectedPot(pot)
    }

    const handleShowEditPot = (pot) => {
        setSelectedPot(pot)
        setShowOptions(0)
        setShowEditPotModal(true)
    }

    const handleShowDeletePot = (pot) => {
        setSelectedPot(pot)
        setShowOptions(0)
        setShowDeletePotModal(true)
    }

    const handleShowOptions = (pot_id) => {
        showOptions === pot_id ? setShowOptions(0) : setShowOptions(pot_id)
    }

    return (
        <>
            <PageContainer name="Pots" button='+ Add new Pot' onClick={handleShowAddPotModal}>
                <PotsContainer>
                    {pots.map((pot, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitleBox>
                                    <CardTitle>
                                        <Identifier theme={pot.pot_theme} />
                                        <h2>{pot.pot_name}</h2>
                                    </CardTitle>

                                    <CardDateBox>
                                        <h3>{dateFormatter(new Date(pot.pot_date).toISOString().split('T')[0])}</h3>
                                    </CardDateBox>
                                </CardTitleBox>

                                <CardOptionsContainer>
                                    <img onClick={() => handleShowOptions(pot.pot_id)} src={OptionsIcon} alt="" />

                                    {(showOptions !== 0 && showOptions === pot.pot_id) &&
                                        <CardOptionsBox>
                                            <Option onClick={() => handleShowEditPot(pot)}>Edit Pot</Option>
                                            <hr />
                                            <Option onClick={() => handleShowDeletePot(pot)} color='var(--red)'>Delete Pot</Option>
                                        </CardOptionsBox>
                                    }
                                </CardOptionsContainer>
                            </CardHeader>

                            <CardContent>
                                <TotalSavedBox>
                                    <h3>Total Saved</h3>

                                    <h2>${pot.pot_quantity}</h2>
                                </TotalSavedBox>

                                <ProgressBox>
                                    <ProgressBar>
                                        <Progress width={getPercentage(pot)} theme={pot.pot_theme} />
                                    </ProgressBar>
                                </ProgressBox>

                                <ProgressDescription>
                                    <h5>{getPercentage(pot)}%</h5>

                                    <h6>Target of ${pot.pot_target}</h6>
                                </ProgressDescription>
                            </CardContent>

                            <CardButtons>
                                <Button onClick={() => handleShowAddMoneyModal(pot)}>+ Add Money</Button>
                                <Button onClick={() => handleShowWithdrawMoneyModal(pot)}>Withdraw</Button>
                            </CardButtons>
                        </Card>
                    ))}
                </PotsContainer>
            </PageContainer>

            {showAddPotModal &&
                <Modal
                    title={'Add New Pot'}
                    subtitle={'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'}
                    closeModal={setShowAddPotModal}
                >
                    <AddNewPot />
                </Modal>
            }

            {showAddMoneyModal &&
                <Modal
                    title={`Add to "${selectedPot.pot_name}"`}
                    subtitle={'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.'}
                    closeModal={setShowAddMoneyModal}
                >
                    <AddMoney pot={selectedPot} />
                </Modal>
            }

            {showWithdrawMoneyModal &&
                <Modal
                    title={`Withdraw from "${selectedPot.pot_name}"`}
                    subtitle={'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.'}
                    closeModal={setShowWithdrawMoneyModal}
                >
                    <WithdrawMoney pot={selectedPot} />
                </Modal>
            }

            {showEditPotModal &&
                <Modal
                    title={'Edit Pot'}
                    subtitle={'If your saving targets change, feel free to update your pots.'}
                    closeModal={setShowEditPotModal}
                >
                    <EditPot pot={selectedPot} />
                </Modal>
            }

            {showDeletePotModal &&
                <Modal
                    title={`Delete "${selectedPot.pot_name}"`}
                    subtitle={'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.'}
                    closeModal={setShowDeletePotModal}
                >
                    <DeletePot pot={selectedPot} />
                </Modal>
            }
        </>
    )
}

export default Pots