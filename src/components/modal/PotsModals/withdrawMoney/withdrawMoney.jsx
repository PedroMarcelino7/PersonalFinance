import { useState } from 'react'
import { ActualProgress, AmountBox, AmountContainer, Button, FormContainer, NewProgress, ProgressBarBox, ProgressValues, QuickButton, QuickButtonInput, QuickButtonsActions, QuickButtonsBox, QuickButtonsContainer } from './styles'
import { usePots } from '../../../../contexts/potsContext'
import { useModal } from '../../modal'
import DefaultInput from '../../../input/defaultInput/defaultInput'

import { Trash2 as DeleteIcon } from 'lucide-react';
import { SquarePen as EditIcon } from 'lucide-react';
import { Save as SaveIcon } from 'lucide-react';

import { toast } from 'react-toastify'

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

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error withdrawing money.');
                return;
            }

            const data = await response.json();
            console.log('>>> Resposta Pot Withdraw Money [Withdraw Money Modal]:', data);

            toast.success('Money withdrawn.')
            refreshPots()
        } catch (error) {
            console.error('Error on withdraw money from pot:', error);
            toast.error('Error withdrawing money.')
        }

        closeModal()
    }

    const getPercentage = (quantity, target) => {
        return ((quantity * 100) / target).toFixed(2)
    }

    const handleAmountToWithdrawQuickButton = (value) => {
        const newAmount = amountToWithdraw + Number(value);
        const remaining = pot.pot_quantity - newAmount;

        if (remaining < 0) {
            console.log(`
                VALOR NEGATIVO

                Pot Quantity: ${pot.pot_quantity}
                Amount to Withdraw ${newAmount}
            `)
            return ''
        } else {
            console.log(`
                VALOR POSITIVO
                
                Pot Quantity: ${pot.pot_quantity}
                Amount to Withdraw ${newAmount}
            `)
            setAmountToWithdraw(newAmount)
        }
    }

    const handleAmountToWithdraw = (value) => {
        if ((pot.pot_quantity - Number(value)) < 0 || isNaN(value)) {
            setAmountToWithdraw(0)
        } else {
            setAmountToWithdraw(Number(value))
        }
    }

    const currentPercentage = getPercentage(pot.pot_quantity, pot.pot_target);
    const newTotalQuantity = parseFloat(pot.pot_quantity) - parseFloat(amountToWithdraw);
    const newTotalPercentage = getPercentage(newTotalQuantity, pot.pot_target);

    const saveQuickButtonsValue = async () => {
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

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error on edit quick button.');
                return;
            }

            const data = await response.json();
            console.log('>>> Resposta Pot Edit Quick Buttons [Add Money Modal]:', data);

            toast.success('Quick buttons updated successfully.')
            refreshPots()
        } catch (error) {
            console.error('Error on edit quick button:', error);
            toast.error('Error on edit quick button.');
        }

        console.log('New Quick Buttons:', quickButtonByIndex)
        setShowEditQuickButtons(false)
    }

    const handleQuickButtonChange = (index, value) => {
        const newValues = [...quickButtonByIndex]
        newValues[index] = Number(value)
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
                                <SaveIcon
                                    size={17}
                                    color='var(--dark)'
                                    strokeWidth={2.5}
                                    cursor={'pointer'}
                                />
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
                                    onClick={() => handleAmountToWithdrawQuickButton(value)}
                                >
                                    -{value}
                                </QuickButton>
                            ))}
                        </QuickButtonsBox>

                        <QuickButtonsActions>
                            <QuickButton onClick={() => setAmountToWithdraw(0)} type='button' color='var(--red)'>
                                <DeleteIcon
                                    size={17}
                                    color='var(--dark)'
                                    strokeWidth={2.5}
                                    cursor={'pointer'}
                                />
                            </QuickButton>

                            <QuickButton onClick={() => setShowEditQuickButtons(true)} type='button' color='var(--cyan)'>
                                <EditIcon
                                    size={17}
                                    color='var(--dark)'
                                    strokeWidth={2.5}
                                    cursor={'pointer'}
                                />
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