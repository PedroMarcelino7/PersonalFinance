import { useEffect, useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { ActionsButton, ActionsContainer, Button, Card, CardButtons, CardContent, CardDateBox, CardHeader, CardOptionsBox, CardOptionsContainer, CardTitle, CardTitleBox, ChevronIcon, CustomOption, CustomSelect, EmptyPageContainer, EmptyPageTextBox, FirstPotButton, Identifier, Option, PotsCardContainer, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, SelectWrapper, SortBox, TotalSavedBox } from './styles'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import IconLink from '../../assets/images/icon-link.svg'
import { usePots } from '../../contexts/potsContext'
import IconDelete from '../../assets/images/trash-solid-red.svg'
import IconEdit from '../../assets/images/icon-edit-blue.svg'
import IconCheck from '../../assets/images/icon-check.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'

import { Link } from 'react-router';

// UTILS
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

// MODAL MANAGER
import PotsModalManager from '../../managers/PotsModalManager/PotsModalManager'

const Pots = () => {
    const { pots, refreshPots } = usePots()

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
                button={pots.length === 0 ? '' : '+ Add new Pot'}
                onClick={() => openModal("addPot")}
            >
                {pots.length === 0
                    ? <EmptyPageContainer>
                        <EmptyPageTextBox>
                            <h1>You don't have any pots created yet.</h1>
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
                                <Link to={'./finished'}>
                                    Finished pots
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

                                        <CardOptionsContainer>
                                            <img onClick={() => handleShowOptions(pot.pot_id)} src={OptionsIcon} alt="" />

                                            {(showOptions !== 0 && showOptions === pot.pot_id) &&
                                                <CardOptionsBox>
                                                    <Link
                                                        to={formatLink(pot.pot_link)}
                                                        target={pot.pot_link === '' ? '' : '_blank'}
                                                    >
                                                        <img alt=""
                                                            style={{ width: '35px' }}
                                                            src={IconLink}
                                                        />
                                                    </Link>

                                                    <img alt=""
                                                        onClick={() => openModal("edit", pot)}
                                                        style={{ width: '35px' }}
                                                        src={IconEdit}
                                                    />

                                                    <img alt=''
                                                        onClick={() => openModal("delete", pot)}
                                                        style={{ width: '30px' }}
                                                        src={IconDelete}
                                                    />
                                                    
                                                    <img alt=''
                                                        style={{ width: '40px' }}
                                                        src={IconCheck}
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