import React, { useEffect, useState } from 'react'
import { ActualProgress, AmountBox, AmountContainer, Button, FormContainer, NewProgress, ProgressBarBox, ProgressValues, QuickButton, QuickButtonInput, QuickButtonsActions, QuickButtonsBox, QuickButtonsContainer } from './styles'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'
import DefaultInput from '../../input/defaultInput/defaultInput'
import DeleteIcon from '../../../assets/images/trash-solid.svg'
import EditIcon from '../../../assets/images/icon-edit.svg'
import SaveIcon from '../../../assets/images/icon-save.svg'

const WithdrawMoney = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()

    const [amountToWithdraw, setAmountToWithdraw] = useState(0)
    const [showEditQuickButtons, setShowEditQuickButtons] = useState(false)
    const [quickButtonByIndex, setQuickButtonByIndex] = useState([...pot.pot_quick_button])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const potQuantity = parseFloat(pot.pot_quantity) - parseFloat(amountToWithdraw)

        console.log(`
            >> Update Pot Money
            Pot ID: ${pot.pot_id}
            Pot Quantity: ${potQuantity}
        `)
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
            console.log('>>> Resposta Pot Withdraw Money [Withdraw Money Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Error on withdraw money from pot:', error);
        }

        console.log(`
            >> Update Quick Buttons:
            Pot ID: ${pot.pot_id}
            Pot Quick Button: ${JSON.stringify(quickButtonByIndex)}
        `)
        try {
            const response = await fetch('http://localhost:3000/pots/update-quick-buttons', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_id: pot.pot_id,
                    pot_quick_button: JSON.stringify(quickButtonByIndex)
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Edit Quick Buttons [Add Money Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Error on edit quick button:', error);
        }

        closeModal()
    }

    const getPercentage = (quantity, target) => {
        const percentage = (100 * quantity) / target;
        if (percentage >= 100) return 100;
        return percentage.toFixed(2);
    };

    const handleAmountToWithdraw = (value) => {
        if (pot.pot_quantity - amountToWithdraw <= 0) {
            console.log(`
                VALOR NEGATIVO

                Pot Quantity: ${pot.pot_quantity}
                Amount to Withdraw ${amountToWithdraw}
            `)
            return ''
        } else {
            console.log(`
                VALOR POSITIVO
                
                Pot Quantity: ${pot.pot_quantity}
                Amount to Withdraw ${amountToWithdraw}
                `)
            setAmountToWithdraw(prev => prev + parseFloat(value))
        }
    }

    const currentPercentage = getPercentage(pot.pot_quantity, pot.pot_target);
    const newTotalQuantity = parseFloat(pot.pot_quantity) - parseFloat(amountToWithdraw);
    const newTotalPercentage = getPercentage(newTotalQuantity, pot.pot_target);

    const saveQuickButtonsValue = () => {
        console.log('New Quick Buttons:', quickButtonByIndex)
        setShowEditQuickButtons(false)
    }

    const handleQuickButtonChange = (index, value) => {
        const newValues = [...quickButtonByIndex]
        newValues[index] = value
        setQuickButtonByIndex(newValues)
    }


    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <AmountContainer>
                <AmountBox>
                    <h3>New Amount</h3>
                    <h2>${newTotalQuantity.toFixed(2)}</h2>
                </AmountBox>

                <ProgressBarBox>
                    <ActualProgress width={`${newTotalPercentage}%`} />
                    <NewProgress width={`${currentPercentage - newTotalPercentage}%`} margin={`${newTotalPercentage}%`} />
                </ProgressBarBox>

                <ProgressValues>
                    <h5>{newTotalPercentage}%</h5>
                    <h4>Target of ${pot.pot_target}</h4>
                </ProgressValues>
            </AmountContainer>

            <DefaultInput
                label={'Amount to Withdraw'}
                placeholder={'$'}
                setValue={handleAmountToWithdraw}
            />

            <QuickButtonsContainer>
                {showEditQuickButtons ? (
                    <>
                        <QuickButtonsBox>
                            {quickButtonByIndex.map((value, index) => (
                                <QuickButtonInput
                                    key={index}
                                    type='text'
                                    value={value}
                                    onChange={(e) => handleQuickButtonChange(index, e.target.value)}
                                    placeholder={`Button ${index + 1}`}
                                />
                            ))}
                        </QuickButtonsBox>

                        <QuickButtonsActions>
                            <QuickButton onClick={saveQuickButtonsValue} type='button' color='var(--green)'>
                                <img src={SaveIcon} alt="Save" />
                            </QuickButton>
                        </QuickButtonsActions>
                    </>
                ) : (
                    <>
                        <QuickButtonsBox>
                            {quickButtonByIndex.map((value, index) => (
                                <QuickButton
                                    key={index}
                                    type='button'
                                    onClick={() => handleAmountToWithdraw(value)}
                                >
                                    -{value}
                                </QuickButton>
                            ))}
                        </QuickButtonsBox>

                        <QuickButtonsActions>
                            <QuickButton onClick={() => setAmountToWithdraw(0)} type='button' color='var(--red)'>
                                <img src={DeleteIcon} alt="Clear" />
                            </QuickButton>

                            <QuickButton onClick={() => setShowEditQuickButtons(true)} type='button' color='var(--cyan)'>
                                <img src={EditIcon} alt="Edit" />
                            </QuickButton>
                        </QuickButtonsActions>
                    </>
                )}
            </QuickButtonsContainer>

            <Button>Confirm Withdraw</Button>
        </FormContainer>
    )
}

export default WithdrawMoney