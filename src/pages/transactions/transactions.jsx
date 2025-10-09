import { useEffect, useState } from 'react'

import { NavPages, SortContainer, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TransactionsContainer, TransactionsFooter, TransactionsHeader } from './styles'

// Icons
import { ArchiveRestore as PotsAddIcon } from 'lucide-react'
import { ArchiveX as PotsWithdrawIcon } from 'lucide-react'

// Components
import PageContainer from '../../components/pageContainer/pageContainer'
import EmptyPage from '../../components/emptyPage/emptyPage'

// Images
import Avatar from '../../assets/images/avatars/bytewise.jpg'

// Modal Manager
import TransactionsModalManager from '../../managers/TransactionsModalManager/TransactionsModalManager'

// Contexts
import { useTransactions } from '../../contexts/transactionsContext'
import { useBudgets } from '../../contexts/budgetsContext'

// UI Components
import SearchInput from '../../ui/input/searchInput/searchInput'
import SelectLabel from '../../ui/select/selectLabel/selectLabel'
import ButtonArrow from '../../ui/button/buttonArrow/buttonArrow'

const Transactions = () => {
    const { transactions, refreshTransactions, searchTransactions } = useTransactions()
    const { budgets } = useBudgets()

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [budgetsFilter, setBudgetsFilter] = useState(0)
    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const filteredTransactions = transactions
        .filter(transaction => budgetsFilter === 0 || transaction.budget_id === budgetsFilter)
    const pagesQuantity = Math.ceil(filteredTransactions.length / quantityToShow)

    const getDateFormat = (transactionDate) => {
        const date = new Date(transactionDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(',', '');
    };

    const handleChangeTransactionsPage = (type, page) => {
        console.log('\n\n\n')
        console.log('Next Button pressed!')
        console.log('Type:', type)
        console.log('Page:', page)
        console.log('\n')
        console.log('Offset:', quantityToShowOffset)
        console.log('Qnt Show:', quantityToShow)

        if (type === 'next' && page < pagesQuantity) {
            setQuantityToShowOffset(quantityToShow * (page))
            setPage(page + 1)
        } else if (type === 'prev' && page > 1) {
            setQuantityToShowOffset(quantityToShow * (page - 2))
            setPage(page - 1)
        }
    }

    const handleSetBudgetsFilter = (budget) => {
        setBudgetsFilter(Number(budget))
        setPage(1)
        setQuantityToShowOffset(0)
    }

    const handleSortTransactions = (sort) => {
        refreshTransactions(sort)
    }

    const handleSearchTransactions = (search) => {
        searchTransactions(search)
    }

    useEffect(() => {
        console.log('TRANSACTIONS:\n', transactions)
    }, [transactions])

    return (
        <>
            <PageContainer
                name="Transactions"
                button={transactions.length === 0 ? '' : '+ Add Transaction'}
                buttonClick={() => openModal('addTransaction')}
            >
                {transactions.length === 0
                    ? <EmptyPage
                        title="You don't have any transaction yet."
                        subtitle="Start recording your movements."
                        button='Create your first transaction'
                        onClick={() => openModal('addTransaction')}
                    />
                    : <TransactionsContainer>
                        <TransactionsHeader>
                            <SearchInput
                                placeholder={'Search transaction'}
                                onSearch={handleSearchTransactions}
                            />

                            <SortContainer>
                                <SelectLabel
                                    label={'Sort by'}
                                    data={[
                                        { value: 'newest', name: 'Newest' },
                                        { value: 'oldest', name: 'Oldest' },
                                        { value: 'atoz', name: 'A to Z' },
                                        { value: 'ztoa', name: 'Z to A' },
                                        { value: 'highest', name: 'Highest' },
                                        { value: 'lowest', name: 'Lowest' },
                                    ]}
                                    onSelect={handleSortTransactions}
                                />

                                <SelectLabel
                                    label={'Budget'}
                                    defaultOption={{ value: '0', name: 'All transactions' }}
                                    data={budgets.map((budget) => ({
                                        value: budget.budget_id,
                                        name: budget.budget_name
                                    }))}
                                    onSelect={handleSetBudgetsFilter}
                                />
                            </SortContainer>
                        </TransactionsHeader>

                        <div>
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableHeaderElement>Recipient / Sender</TableHeaderElement>
                                        <TableHeaderElement>Budget</TableHeaderElement>
                                        <TableHeaderElement>Transaction Date</TableHeaderElement>
                                        <TableHeaderElement className='end'>Amount</TableHeaderElement>
                                    </tr>
                                </TableHeader>

                                {filteredTransactions
                                    .filter(transaction => budgetsFilter === 0 || transaction.budget_id === budgetsFilter)
                                    .slice(quantityToShowOffset, quantityToShowOffset + quantityToShow)
                                    .map((transaction, index) => (
                                        <TableBodyRow key={index}>
                                            <TableBodyElement className='reference'>
                                                {transaction.pot_id
                                                    ? <>
                                                        {transaction.transaction_type === 0
                                                            ? <PotsWithdrawIcon
                                                                size={40}
                                                                color={'var(--red)'}
                                                                strokeWidth={2.5}
                                                            />
                                                            : <PotsAddIcon
                                                                size={40}
                                                                color={'var(--green)'}
                                                                strokeWidth={2.5}
                                                            />
                                                        }

                                                        <h3>{transaction.pot_name}</h3>
                                                    </>
                                                    : <>
                                                        <img src={Avatar} alt="" />
                                                        <h3>{transaction.person_name}</h3>
                                                    </>
                                                }
                                            </TableBodyElement>

                                            <TableBodyElement>{transaction.budget_name}</TableBodyElement>

                                            <TableBodyElement>{getDateFormat(transaction.transaction_date)}</TableBodyElement>

                                            <TableBodyElement
                                                className='end'
                                                color={transaction.transaction_type === 1 ? 'var(--green)' : 'var(--red)'}
                                            >
                                                {transaction.transaction_type === 1 ? '+' : '-'}${transaction.transaction_amount}
                                            </TableBodyElement>
                                        </TableBodyRow>
                                    ))}
                            </Table>
                        </div>

                        <TransactionsFooter>
                            <ButtonArrow
                                label={'Prev'}
                                orientation={'left'}
                                onClick={() => handleChangeTransactionsPage('prev', page)}
                            />

                            <NavPages>
                                {Array.from({ length: Math.ceil(pagesQuantity) }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={i + 1 === page ? 'selected' : ''}
                                        onClick={() => {
                                            setPage(i + 1)
                                            setQuantityToShowOffset(quantityToShow * i)
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </NavPages>

                            <ButtonArrow
                                label={'Next'}
                                orientation={'right'}
                                onClick={() => handleChangeTransactionsPage('next', page)}
                            />
                        </TransactionsFooter>
                    </TransactionsContainer>
                }
            </PageContainer>

            <TransactionsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default Transactions