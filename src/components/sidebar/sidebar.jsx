import { useEffect, useState } from 'react'

import { User as UserIcon } from 'lucide-react';
import { Settings as SettingsIcon } from 'lucide-react';
import { House as OverviewIcon } from 'lucide-react'
import { ArrowDownUp as TransactionsIcon } from 'lucide-react'
import { ChartPie as BudgetsIcon } from 'lucide-react'
import { ArchiveRestore as PotsIcon } from 'lucide-react'
import { CalendarSync as RecurringBillsIcon } from 'lucide-react'
import { CirclePoundSterling as CryptoIcon } from 'lucide-react'

import Logo from '../../assets/images/logo-large.svg'

import { Container, FooterBox, FooterButton, LogoBox, NavigationBox, NavigationButton, TopBox } from './styles'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [selectedPage, setSelectedPage] = useState(0)

    const navigation = [
        {
            id: 0,
            icon: <OverviewIcon size={25} color={selectedPage === 0 ? 'var(--green)' : 'var(--white)'} strokeWidth={2.5} />,
            name: 'Overview',
            path: ''
        },
        {
            id: 1,
            icon: <TransactionsIcon size={25} color={selectedPage === 1 ? 'var(--green)' : 'var(--white)'} strokeWidth={2.5} />,
            name: 'Transactions',
            path: 'transactions'
        },
        {
            id: 2,
            icon: <BudgetsIcon size={25} color={selectedPage === 2 ? 'var(--green)' : 'var(--white)'} strokeWidth={2.5} />,
            name: 'Budgets',
            path: 'budgets'
        },
        {
            id: 3,
            icon: <PotsIcon size={25} color={selectedPage === 3 ? 'var(--green)' : 'var(--white)'} strokeWidth={2.5} />,
            name: 'Pots',
            path: 'pots'
        },
        {
            id: 4,
            icon: <RecurringBillsIcon size={25} color={selectedPage === 4 ? 'var(--green)' : 'var(--white)'} strokeWidth={2.5} />,
            name: 'Recurring Bills',
            path: 'recurring-bills'
        },
        {
            id: 5,
            icon: <CryptoIcon size={25} color={selectedPage === 5 ? 'var(--green)' : 'var(--white)'} strokeWidth={2.5} />,
            name: 'Crypto',
            path: 'crypto'
        },
    ]

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
                            {nav.icon}

                            <h2>{nav.name}</h2>
                        </NavigationButton>
                    ))}
                </NavigationBox>
            </TopBox>

            <FooterBox>
                <FooterButton>
                    <UserIcon
                        size={25}
                        color='currentColor'
                        strokeWidth={2.5}
                    />

                    <h2>User</h2>
                </FooterButton>

                <FooterButton>
                    <SettingsIcon
                        size={25}
                        color='currentColor'
                        strokeWidth={2.5}
                    />

                    <h2>Settings</h2>
                </FooterButton>
            </FooterBox>
        </Container>
    )
}

export default Sidebar