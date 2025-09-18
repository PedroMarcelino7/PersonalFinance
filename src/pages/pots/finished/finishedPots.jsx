import { useEffect, useState } from 'react'

import { Link } from 'react-router';

// COMPONENTS
import PageContainer from '../../../components/pageContainer/pageContainer'

// CONTEXTS
import { usePots } from '../../../contexts/potsContext'

// ICONS
import { ChevronDown as ChevronDownIcon } from 'lucide-react'
import { RotateCcw as RecoverIcon } from 'lucide-react'

// STYLES
import { ActionsButton, ActionsContainer, Card, CardContent, CardDateBox, CardHeader, CardOptionsContainer, CardTitle, CardTitleBox, ChevronIcon, CustomOption, CustomSelect, EmptyPageContainer, EmptyPageTextBox, FirstPotButton, Identifier, PotsCardContainer, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, SelectWrapper, SortBox, TotalSavedBox } from './styles'

// MODAL MANAGER
import PotsModalManager from '../../../managers/PotsModalManager/PotsModalManager'

// UTILS
import { formatCurrency } from '../../../utils/formatCurrency'
import { formatDate } from '../../../utils/formatDate'
import SelectLabel from '../../../components/select/selectLabel/selectLabel';

const FinishedPots = () => {
    const { pots } = usePots()

    const finishedPots = pots.filter((pot) => pot.pot_status === 1)

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    useEffect(() => {
        console.log('Pots [Pots Page]:', finishedPots)
    }, [pots])

    const getPercentage = (pot) => {
        const quantity = Number(pot.pot_quantity);
        const target = Number(pot.pot_target);

        return ((quantity * 100) / target).toFixed(2)
    }

    const handlePotsOrderChange = (orderBy) => {
        refreshPots(orderBy)
    }

    return (
        <>
            <PageContainer
                name="Finished Pots"
            >
                {finishedPots.length === 0
                    ? <EmptyPageContainer>
                        <EmptyPageTextBox>
                            <h1>You don't have any finished pot yet.</h1>
                        </EmptyPageTextBox>

                        <div>
                            <FirstPotButton>
                                <Link to={'../pots'}>
                                    Return to all pots
                                </Link>
                            </FirstPotButton>
                        </div>
                    </EmptyPageContainer>
                    :
                    <PotsContainer>
                        <ActionsContainer>
                            <SelectLabel
                                label={'Sort by'}
                                data={[
                                    { value: 'oldest', name: 'Oldest' },
                                    { value: 'newest', name: 'Newest' },
                                    { value: 'atoz', name: 'A to Z' },
                                    { value: 'ztoa', name: 'Z to A' },
                                    { value: 'expensive', name: 'Most Expensive' },
                                    { value: 'cheapest', name: 'Cheapest' },
                                ]}
                                onSelect={handlePotsOrderChange}
                            />

                            <ActionsButton>
                                <Link to={'../pots'}>
                                    All pots
                                </Link>
                            </ActionsButton>
                        </ActionsContainer>

                        <PotsCardContainer>
                            {finishedPots.map((pot, index) => (
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
                                            <RecoverIcon
                                                size={25}
                                                color='var(--blue)'
                                                strokeWidth={2.5}
                                                cursor={'pointer'}
                                                onClick={() => openModal('recover', pot)}
                                            />
                                        </CardOptionsContainer>
                                    </CardHeader>

                                    <CardContent>
                                        <TotalSavedBox>
                                            <h3>Total spent</h3>

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
                                </Card>
                            ))}
                        </PotsCardContainer>
                    </PotsContainer>
                }
            </PageContainer>

            <PotsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default FinishedPots