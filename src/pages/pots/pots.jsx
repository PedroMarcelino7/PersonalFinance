import { useEffect, useState } from 'react'

import { Link } from 'react-router';

//STYLES
import { ActionsButton, ActionsContainer, Button, Card, CardButtons, CardContent, CardDateBox, CardHeader, CardOptionsBox, CardOptionsContainer, CardTitle, CardTitleBox, EmptyPageContainer, EmptyPageTextBox, FirstPotButton, Identifier, PotsCardContainer, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, TotalSavedBox } from './styles'

// COMPONENTS
import PageContainer from '../../components/pageContainer/pageContainer'
import EmptyPage from '../../components/emptyPage/emptyPage';

// UI COMPONENTS
import SelectLabel from '../../ui/select/selectLabel/selectLabel';

// ICONS
import { Ellipsis as OptionsIcon } from 'lucide-react'
import { Link as LinkIcon } from 'lucide-react'
import { SquarePen as EditIcon } from 'lucide-react'
import { Trash2 as DeleteIcon } from 'lucide-react'
import { CircleCheckBig as CheckIcon } from 'lucide-react'

// MODAL MANAGER
import PotsModalManager from '../../managers/PotsModalManager/PotsModalManager'

// UTILS
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

// CONTEXTS
import { usePots } from '../../contexts/potsContext'


const Pots = () => {
    const { pots, refreshPots } = usePots()

    const unfinishedPots = pots.filter((pots) => pots.pot_status === 0)

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

    const formatLink = (link) => {
        if (link.startsWith("https://") || link === '') {
            return link
        } else {
            return `https://${link}`
        }
    }

    const handlePotsOrderChange = (orderBy) => {
        refreshPots(orderBy)
    }

    return (
        <>
            <PageContainer
                name="Pots"
                button={pots.length === 0 ? '' : '+ Add Pot'}
                onClick={() => openModal("add")}
            >
                {unfinishedPots.length === 0
                    ? <EmptyPage
                        title="You don't have any pot created yet."
                        subtitle="Start setting aside your money."
                        button='Create your first pot'
                        onClick={() => openModal('add')}
                    />
                    : <PotsContainer>
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
                                <Link to={'./finished'}>
                                    Finished pots
                                </Link>
                            </ActionsButton>
                        </ActionsContainer>

                        <PotsCardContainer>
                            {unfinishedPots.map((pot, index) => (
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
                                            <OptionsIcon
                                                size={25}
                                                color='var(--dark)'
                                                strokeWidth={2.5}
                                                cursor={'pointer'}
                                                onClick={() => handleShowOptions(pot.pot_id)}
                                            />

                                            {(showOptions !== 0 && showOptions === pot.pot_id) &&
                                                <CardOptionsBox
                                                    onClick={() => handleShowOptions(pot.pot_id)}
                                                >
                                                    <Link
                                                        to={formatLink(pot.pot_link)}
                                                        target={pot.pot_link === '' ? '' : '_blank'}
                                                    >
                                                        <LinkIcon
                                                            size={20}
                                                            color='var(--dark)'
                                                            strokeWidth={2.5}
                                                            cursor={'pointer'}
                                                        />
                                                    </Link>

                                                    <EditIcon
                                                        size={20}
                                                        color='var(--blue)'
                                                        strokeWidth={2.5}
                                                        cursor={'pointer'}
                                                        onClick={() => openModal("edit", pot)}
                                                    />

                                                    <DeleteIcon
                                                        size={20}
                                                        color='var(--red)'
                                                        strokeWidth={2.5}
                                                        cursor={'pointer'}
                                                        onClick={() => openModal("delete", pot)}
                                                    />

                                                    <CheckIcon
                                                        size={20}
                                                        color='var(--green)'
                                                        strokeWidth={2.5}
                                                        cursor={'pointer'}
                                                        onClick={() => openModal("finish", pot)}
                                                    />
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
                        </PotsCardContainer>
                    </PotsContainer>
                }
            </PageContainer>

            <PotsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default Pots