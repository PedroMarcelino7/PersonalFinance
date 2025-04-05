import React from 'react'

import Logo from '../../assets/images/logo-large.svg'
import ArrowIcon from '../../assets/images/icon-minimize-menu.svg'
import OverviewIcon from '../../assets/images/icon-nav-overview.svg'
import TransactionsIcon from '../../assets/images/icon-nav-transactions.svg'
import BudgetsIcon from '../../assets/images/icon-nav-budgets.svg'
import PotsIcon from '../../assets/images/icon-nav-pots.svg'
import RecurringBillsIcon from '../../assets/images/icon-nav-recurring-bills.svg'

import { Container, FooterBox, LogoBox, NavigationBox, NavigationButton, TopBox } from './styles'

const navigation = [
    { id: 0, icon: OverviewIcon, name: 'Overview' },
    { id: 1, icon: TransactionsIcon, name: 'Transactions' },
    { id: 2, icon: BudgetsIcon, name: 'Budgets' },
    { id: 3, icon: PotsIcon, name: 'Pots' },
    { id: 4, icon: RecurringBillsIcon, name: 'Recurring Bills' },
]

const Sidebar = () => {
    return (
        <Container>
            <TopBox>
                <LogoBox>
                    <img src={Logo} alt="" />
                </LogoBox>

                <NavigationBox>
                    {navigation.map((nav) => (
                        <NavigationButton key={nav.id}>
                            <img src={nav.icon} alt="" />

                            <h2>{nav.name}</h2>
                        </NavigationButton>
                    ))}
                </NavigationBox>
            </TopBox>

            <FooterBox>
                <img src={ArrowIcon} alt="" />

                <h1>Minimize Menu</h1>
            </FooterBox>
        </Container>
    )
}

export default Sidebar