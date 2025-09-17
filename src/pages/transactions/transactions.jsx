import { useEffect, useState } from 'react'

import SearchInput from '../../components/input/searchInput/searchInput'

import { EmptyPageContainer, EmptyPageTextBox, FirstPotButton, NavPages, SortContainer, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TransactionsContainer, TransactionsFooter, TransactionsHeader } from './styles'

import { ArchiveRestore as PotsAddIcon } from 'lucide-react'
import { ArchiveX as PotsWithdrawIcon } from 'lucide-react'

import PageContainer from '../../components/pageContainer/pageContainer'

import Avatar from '../../assets/images/avatars/bytewise.jpg'

import TransactionsModalManager from '../../managers/TransactionsModalManager/TransactionsModalManager'

import { useTransactions } from '../../contexts/transactionsContext'
import { useCategories } from '../../contexts/categoriesContext'

import SelectLabel from '../../components/select/selectLabel/selectLabel'
import ButtonArrow from '../../components/button/buttonArrow/buttonArrow'

const Transactions = () => {
    const { transactions, refreshTransactions } = useTransactions()
    const { categories } = useCategories()

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [categoriesFilter, setCategoriesFilter] = useState(0)
    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const filteredTransactions = transactions
        .filter(transaction => categoriesFilter === 0 || transaction.category_id === categoriesFilter)
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

    const handleSetCategoriesFilter = (category) => {
        setCategoriesFilter(Number(category))
        setPage(1)
        setQuantityToShowOffset(0)
    }

    const handleSortTransactions = (sort) => {
        refreshTransactions(sort)
    }

    useEffect(() => {
        console.log('TRANSACTIONS:\n', transactions)
    }, [transactions])

    return (
        <>
            <PageContainer
                name="Transactions"
                button={transactions.length === 0 ? '' : '+ Add Transaction'}
                onClick={() => openModal('addTransaction')}
            >
                {transactions.length === 0
                    ? <EmptyPageContainer>
                        <EmptyPageTextBox>
                            <h1>You don't have any transaction yet.</h1>
                            <h2>Start recording your movements.</h2>
                        </EmptyPageTextBox>

                        <div>
                            <FirstPotButton
                                onClick={() => openModal('addTransaction')}
                            >
                                Create your first transaction
                            </FirstPotButton>
                        </div>
                    </EmptyPageContainer>
                    : <TransactionsContainer>
                        <TransactionsHeader>
                            <SearchInput
                                placeholder={'Search transaction'}
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
                                    label={'Category'}
                                    defaultOption={{ value: '0', name: 'All transactions' }}
                                    data={categories.map((category) => ({
                                        value: category.category_id,
                                        name: category.category_name
                                    }))}
                                    onSelect={handleSetCategoriesFilter}
                                />
                            </SortContainer>
                        </TransactionsHeader>

                        <div>
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableHeaderElement>Recipient / Sender</TableHeaderElement>
                                        <TableHeaderElement>Category</TableHeaderElement>
                                        <TableHeaderElement>Transaction Date</TableHeaderElement>
                                        <TableHeaderElement className='end'>Amount</TableHeaderElement>
                                    </tr>
                                </TableHeader>

                                {filteredTransactions
                                    .filter(transaction => categoriesFilter === 0 || transaction.category_id === categoriesFilter)
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

                                            <TableBodyElement>{transaction.category_name}</TableBodyElement>

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