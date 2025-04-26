import React, { useEffect, useState } from 'react'
import { ActualProgress, AmountBox, AmountContainer, Button, FormContainer, NewProgress, ProgressBarBox, ProgressValues } from './styles'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'
import DefaultInput from '../../input/defaultInput/defaultInput'

const AddMoney = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()

    const [amountToAdd, setAmountToAdd] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Pot:', pot)
        console.log('Amount to Add:', amountToAdd)

        const potQuantity = parseFloat(pot.pot_quantity) + parseFloat(amountToAdd)

        try {
            const response = await fetch('http://localhost:3000/pots/add-money', {
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

    const currentPercentage = getPercentage(pot.pot_quantity, pot.pot_target);
    const newTotalQuantity = parseFloat(pot.pot_quantity) + parseFloat(amountToAdd);
    const newTotalPercentage = getPercentage(newTotalQuantity, pot.pot_target);

    const additionalPercentage = (newTotalPercentage - currentPercentage).toFixed(2);

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

            <Button>Confirm Addition</Button>
        </FormContainer>
    )
}

export default AddMoney