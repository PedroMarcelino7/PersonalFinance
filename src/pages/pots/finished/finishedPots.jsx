import { useEffect, useState } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { ActionsButton, ActionsContainer, Button, Card, CardButtons, CardContent, CardDateBox, CardHeader, CardOptionsBox, CardOptionsContainer, CardTitle, CardTitleBox, ChevronIcon, CustomOption, CustomSelect, EmptyPageContainer, EmptyPageTextBox, FirstPotButton, Identifier, Option, PotsCardContainer, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, SelectWrapper, SortBox, TotalSavedBox } from './styles'
import { usePots } from '../../../contexts/potsContext'
import ChevronDownIcon from '../../../assets/images/icon-caret-down.svg'

import { Link } from 'react-router';

// UTILS
import { formatCurrency } from '../../../utils/formatCurrency'
import { formatDate } from '../../../utils/formatDate'

const FinishedPots = () => {
    const { pots, refreshPots } = usePots()

    const finishedPots = []

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });

    useEffect(() => {
        console.log('Pots [Pots Page]:', pots)
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
                            <h2>Start setting aside your money.</h2>
                        </EmptyPageTextBox>

                        <div>
                            <FirstPotButton
                                onClick={() => openModal("addPot")}
                            >
                                Create your first pot
                            </FirstPotButton>
                        </div>
                    </EmptyPageContainer>
                    :
                    <PotsContainer>
                        <ActionsContainer>
                            <SortBox>
                                <h6>Sort by</h6>

                                <SelectWrapper>
                                    <CustomSelect onChange={(e) => handlePotsOrderChange(e.target.value)}>
                                        <CustomOption value="oldest">Oldest</CustomOption>
                                        <CustomOption value="newest">Newest</CustomOption>
                                        <CustomOption value="atoz">A to Z</CustomOption>
                                        <CustomOption value="ztoa">Z to A</CustomOption>
                                        <CustomOption value="expensive">Most Expensive</CustomOption>
                                        <CustomOption value="cheapest">Cheapest</CustomOption>
                                    </CustomSelect>
                                    <ChevronIcon src={ChevronDownIcon} alt="chevron" />
                                </SelectWrapper>
                            </SortBox>

                            <ActionsButton>
                                <Link to={'../pots'}>
                                    All pots
                                </Link>
                            </ActionsButton>
                        </ActionsContainer>

                        <PotsCardContainer>
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
        </>
    )
}

export default FinishedPots