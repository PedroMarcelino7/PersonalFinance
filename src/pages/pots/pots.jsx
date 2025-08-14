import { useEffect, useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Button, Card, CardButtons, CardContent, CardDateBox, CardHeader, CardOptionsBox, CardOptionsContainer, CardTitle, CardTitleBox, Identifier, Option, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, TotalSavedBox } from './styles'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import IconLink from '../../assets/images/icon-link.svg'
import { usePots } from '../../contexts/potsContext'
import IconDelete from '../../assets/images/trash-solid-red.svg'
import IconEdit from '../../assets/images/icon-edit-blue.svg'

// UTILS
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

// MODAL MANAGER
import ModalManager from '../../components/pots/ModalManager/ModalManager'

const Pots = () => {
    const { pots } = usePots()

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [showOptions, setShowOptions] = useState(0)

    useEffect(() => {
        console.log('Pots [Pots Page]:', pots)
    }, [pots])

    const getPercentage = (pot) => {
        const quantity = Number(pot.pot_quantity);
        const target = Number(pot.pot_target);

        return ((quantity * 100) / target).toFixed(2)
    }

    const handleShowOptions = (pot_id) => {
        showOptions === pot_id ? setShowOptions(0) : setShowOptions(pot_id)
    }

    return (
        <>
            <PageContainer name="Pots" button='+ Add new Pot' onClick={() => openModal("addPot")}>
                <PotsContainer>
                    {pots.map((pot, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitleBox>
                                    <CardTitle>
                                        <Identifier theme={pot.theme_color} />
                                        <h2>{pot.pot_name}</h2>
                                    </CardTitle>

                                    <CardDateBox>
                                        <h3>{formatDate(pot.pot_date)}</h3>
                                    </CardDateBox>
                                </CardTitleBox>

                                <CardOptionsContainer>
                                    <img onClick={() => handleShowOptions(pot.pot_id)} src={OptionsIcon} alt="" />

                                    {(showOptions !== 0 && showOptions === pot.pot_id) &&
                                        <CardOptionsBox>
                                            <img style={{ width: '35px' }} src={IconLink} alt="" />
                                            <img onClick={() => openModal("edit", pot)} style={{ width: '35px' }} src={IconEdit} alt="" />
                                            <img onClick={() => openModal("delete", pot)} style={{ width: '30px' }} src={IconDelete} alt="" />
                                        </CardOptionsBox>
                                    }
                                </CardOptionsContainer>
                            </CardHeader>

                            <CardContent>
                                <TotalSavedBox>
                                    <h3>Total Saved</h3>

                                    <h2>{formatCurrency(pot.pot_quantity)}</h2>
                                </TotalSavedBox>

                                <ProgressBox>
                                    <ProgressBar>
                                        <Progress width={getPercentage(pot)} theme={pot.theme_color} />
                                    </ProgressBar>
                                </ProgressBox>

                                <ProgressDescription>
                                    <h5>{getPercentage(pot)}%</h5>

                                    <h6>Target of {formatCurrency(pot.pot_target)}</h6>
                                </ProgressDescription>
                            </CardContent>

                            <CardButtons>
                                <Button onClick={() => openModal("addMoney", pot)}>+ Add Money</Button>
                                <Button onClick={() => openModal("withdraw", pot)}>Withdraw</Button>
                            </CardButtons>
                        </Card>
                    ))}
                </PotsContainer>
            </PageContainer>

            <ModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default Pots