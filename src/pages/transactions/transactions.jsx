import { useEffect, useState } from 'react'

import { ChevronIcon, CustomOption, CustomSelect, EmptyPageContainer, EmptyPageTextBox, FirstPotButton, NavButton, NavPages, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SortContainer, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TransactionsContainer, TransactionsFooter, TransactionsHeader } from './styles'

import PageContainer from '../../components/pageContainer/pageContainer'
import Modal from '../../components/modal/modal'

import Avatar from '../../assets/images/avatars/bytewise.jpg'
import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'
import PrevIcon from '../../assets/images/icon-caret-left.svg'
import NextIcon from '../../assets/images/icon-caret-right.svg'
import PotIcon from '../../assets/images/icon-pot.svg'

import AddTransaction from '../../components/modal/TransactionsModals/addTransaction/addTransaction'

import { useTransactions } from '../../contexts/transactionsContext'
import { useCategories } from '../../contexts/categoriesContext'

const Transactions = () => {
    const { transactions, refreshTransactions } = useTransactions()
    const { categories } = useCategories()

    const [categoriesFilter, setCategoriesFilter] = useState(0)
    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const filteredTransactions = transactions
        .filter(transaction => categoriesFilter === 0 || transaction.category_id === categoriesFilter)
    const pagesQuantity = Math.ceil(filteredTransactions.length / quantityToShow)

    const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)

    const handleShowAddTransactionModal = () => {
        setShowAddTransactionModal(true)
    }

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
        setCategoriesFilter(category)
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
                button='+ Add Transaction'
                onClick={handleShowAddTransactionModal}
            >
                {transactions.length === 0
                    ? <EmptyPageContainer>
                        <EmptyPageTextBox>
                            <h1>You don't have any transaction yet.</h1>
                            <h2>Start recording your movements.</h2>
                        </EmptyPageTextBox>

                        <div>
                            <FirstPotButton
                                onClick={handleShowAddTransactionModal}
                            >
                                Create your first transaction
                            </FirstPotButton>
                        </div>
                    </EmptyPageContainer>
                    : <TransactionsContainer>
                        <TransactionsHeader>
                            <SearchBox>
                                <SearchInput placeholder="Search transaction" />
                                <SearchButton src={SearchIcon} />
                            </SearchBox>

                            <SortContainer>
                                <SortBox>
                                    <h6>Sort by</h6>

                                    <SelectWrapper>
                                        <CustomSelect onChange={(e) => handleSortTransactions(e.target.value)}>
                                            <CustomOption value="newest">Newest</CustomOption>
                                            <CustomOption value="oldest">Oldest</CustomOption>
                                            <CustomOption value="atoz">A to Z</CustomOption>
                                            <CustomOption value="ztoa">Z to A</CustomOption>
                                            <CustomOption value="highest">Highest</CustomOption>
                                            <CustomOption value="lowest">Lowest</CustomOption>
                                        </CustomSelect>
                                        <ChevronIcon src={ChevronDownIcon} alt="chevron" />
                                    </SelectWrapper>
                                </SortBox>

                                <SortBox>
                                    <h6>Category</h6>

                                    <SelectWrapper>
                                        <CustomSelect onChange={(e) => handleSetCategoriesFilter(Number(e.target.value))}>
                                            <CustomOption value="0">All transactions</CustomOption>
                                            {categories.map((category) => (
                                                <CustomOption value={category.category_id}>{category.category_name}</CustomOption>
                                            ))}
                                        </CustomSelect>
                                        <ChevronIcon src={ChevronDownIcon} alt="chevron" />
                                    </SelectWrapper>
                                </SortBox>
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
                                                        <img src={PotIcon} alt="" />
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
                            <NavButton onClick={() => handleChangeTransactionsPage('prev', page)}>
                                <img src={PrevIcon} alt="" />

                                <h3>Prev</h3>
                            </NavButton>

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

                            <NavButton onClick={() => handleChangeTransactionsPage('next', page)}>
                                <h3>Next</h3>

                                <img src={NextIcon} alt="" />
                            </NavButton>
                        </TransactionsFooter>
                    </TransactionsContainer>
                }
            </PageContainer>

            {showAddTransactionModal &&
                <Modal
                    title={'Add Transaction'}
                    closeModal={setShowAddTransactionModal}
                >
                    <AddTransaction />
                </Modal>
            }
        </>
    )
}

export default Transactions