import React, { useEffect, useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Button, Card, CardButtons, CardContent, CardHeader, CardTitleBox, Identifier, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, TotalSavedBox } from './styles'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import { usePots } from '../../contexts/potsContext'
import Modal from '../../components/modal/modal'
import AddNewPot from '../../components/modal/addNewPot/addNewPot'
import AddMoney from '../../components/modal/addMoney/addMoney'

const Pots = () => {
    const { pots } = usePots()

    const [selectedPot, setSelectedPot] = useState(pots[0])
    const [showAddPotModal, setShowAddPotModal] = useState(false)
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)

    useEffect(() => {
        console.log('Pots [Pots Page]:', pots)
    }, [pots])

    const getPercentage = (pot) => {
        const quantity = Number(pot.pot_quantity);
        const target = Number(pot.pot_target);

        return ((quantity * 100) / target).toFixed(2)
    }

    const handleShowAddPotModal = () => {
        setShowAddPotModal(true)
    }

    const handleShowAddMoneyModal = (pot) => {
        setShowAddMoneyModal(true)
        setSelectedPot(pot)
    }

    return (
        <>
            <PageContainer name="Pots" button='+ Add new Pot' onClick={handleShowAddPotModal}>
                <PotsContainer>
                    {pots.map((pot, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitleBox>
                                    <Identifier theme={pot.pot_theme} />
                                    <h2>{pot.pot_name}</h2>
                                </CardTitleBox>

                                <img src={OptionsIcon} alt="" />
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
                                <Button>Withdraw</Button>
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
                    title={'Add to Savings'}
                    subtitle={'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.'}
                    closeModal={setShowAddMoneyModal}
                >
                    <AddMoney pot={selectedPot} />
                </Modal>
            }
        </>
    )
}

export default Pots