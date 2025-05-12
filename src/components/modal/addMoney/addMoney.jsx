import React, { useState } from 'react'
import { ActualProgress, AmountBox, AmountContainer, Button, FormContainer, NewProgress, ProgressBarBox, ProgressValues, QuickButton, QuickButtonInput, QuickButtonsActions, QuickButtonsBox, QuickButtonsContainer } from './styles'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'
import DefaultInput from '../../input/defaultInput/defaultInput'
import DeleteIcon from '../../../assets/images/trash-solid.svg'
import EditIcon from '../../../assets/images/icon-edit.svg'
import SaveIcon from '../../../assets/images/icon-save.svg'

const AddMoney = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()

    const [amountToAdd, setAmountToAdd] = useState(0)
    const [editQuickButtons, setEditQuickButtons] = useState(pot.pot_quick_button)
    const [showEditQuickButtons, setShowEditQuickButtons] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Pot:', pot)
        console.log('Amount to Add:', amountToAdd)

        const potQuantity = parseFloat(pot.pot_quantity) + parseFloat(amountToAdd)

        try {
            const response = await fetch('http://localhost:3000/pots/update-pot-money', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_id: pot.pot_id,
                    pot_quantity: potQuantity
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Add Money [Add Money Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Error on add money to pot:', error);
        }

        closeModal()
    }

    const getPercentage = (quantity, target) => {
        const percentage = (100 * quantity) / target;
        if (percentage >= 100) return 100;
        return percentage.toFixed(2);
    };

    const quickButtonAmountToAdd = (value) => {
        setAmountToAdd(amountToAdd + value)
    }

    const currentPercentage = getPercentage(pot.pot_quantity, pot.pot_target);
    const newTotalQuantity = parseFloat(pot.pot_quantity) + parseFloat(amountToAdd);
    const newTotalPercentage = getPercentage(newTotalQuantity, pot.pot_target);

    const additionalPercentage = (newTotalPercentage - currentPercentage).toFixed(2);

    const saveQuickButtonsValue = () => {
        setEditQuickButtons()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <AmountContainer>
                <AmountBox>
                    <h3>New Amount</h3>
                    <h2>${newTotalQuantity.toFixed(2)}</h2>
                </AmountBox>

                <ProgressBarBox>
                    <ActualProgress width={`${currentPercentage}%`} />
                    <NewProgress width={`${additionalPercentage}%`} />
                </ProgressBarBox>

                <ProgressValues>
                    <h5>{newTotalPercentage}%</h5>
                    <h4>Target of ${pot.pot_target}</h4>
                </ProgressValues>
            </AmountContainer>

            <DefaultInput
                label={'Amount to Add'}
                placeholder={'$'}
                setValue={setAmountToAdd}
            />

            <QuickButtonsContainer>
                {showEditQuickButtons
                    ? <>
                        <QuickButtonsBox>
                            {pot.pot_quick_button.map((quickButton) => (
                                <QuickButtonInput type='text' placeholder={quickButton} />
                            ))}
                        </QuickButtonsBox>

                        <QuickButtonsActions>
                            <QuickButton onClick={saveQuickButtonsValue} type='button' color='var(--green)'>
                                <img src={SaveIcon} alt="" />
                            </QuickButton>
                        </QuickButtonsActions>
                    </>
                    : <>
                        <QuickButtonsBox>
                            {pot.pot_quick_button.map((quickButton) => (
                                <QuickButton type='button' onClick={() => quickButtonAmountToAdd(quickButton)}>
                                    +{quickButton}
                                </QuickButton>
                            ))}
                        </QuickButtonsBox>

                        <QuickButtonsActions>
                            <QuickButton onClick={() => setAmountToAdd(0)} type='button' color='var(--red)'>
                                <img src={DeleteIcon} alt="" />
                            </QuickButton>

                            <QuickButton onClick={() => setShowEditQuickButtons(true)} type='button' color='var(--cyan)'>
                                <img src={EditIcon} alt="" />
                            </QuickButton>
                        </QuickButtonsActions>
                    </>

                }
            </QuickButtonsContainer>

            <Button>Confirm Addition</Button>
        </FormContainer>
    )
}

export default AddMoney