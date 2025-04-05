import React, { useEffect, useState } from 'react'

import Logo from '../../assets/images/logo-large.svg'
import ArrowIcon from '../../assets/images/icon-minimize-menu.svg'
import OverviewIcon from '../../assets/images/icon-nav-overview.svg'
import TransactionsIcon from '../../assets/images/icon-nav-transactions.svg'
import BudgetsIcon from '../../assets/images/icon-nav-budgets.svg'
import PotsIcon from '../../assets/images/icon-nav-pots.svg'
import RecurringBillsIcon from '../../assets/images/icon-nav-recurring-bills.svg'

import { Container, FooterBox, LogoBox, NavigationBox, NavigationButton, TopBox } from './styles'
import { useLocation, useNavigate } from 'react-router-dom'

const navigation = [
    { id: 0, icon: OverviewIcon, name: 'Overview', path: '' },
    { id: 1, icon: TransactionsIcon, name: 'Transactions', path: 'transactions' },
    { id: 2, icon: BudgetsIcon, name: 'Budgets', path: 'budgets' },
    { id: 3, icon: PotsIcon, name: 'Pots', path: 'pots' },
    { id: 4, icon: RecurringBillsIcon, name: 'Recurring Bills', path: 'recurring-bills' },
]

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [selectedPage, setSelectedPage] = useState(0)

    const changePage = (id, path) => {
        if (location.pathname === `/${path}`) return

        setSelectedPage(id)
        navigate(`/${path}`)
    }

    useEffect(() => {
        const currentPath = location.pathname.replace('/', '')
        const found = navigation.find((nav) => nav.path === currentPath)

        if (found) setSelectedPage(found.id)
    }, [location.pathname])

    return (
        <Container>
            <TopBox>
                <LogoBox>
                    <img src={Logo} alt="" />
                </LogoBox>

                <NavigationBox>
                    {navigation.map((nav) => (
                        <NavigationButton key={nav.id}
                            className={selectedPage === nav.id ? 'selected' : ''}
                            onClick={() => changePage(nav.id, nav.path)}
                        >
                            <img src={nav.icon} alt={nav.name} />

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