import { useState } from 'react'

import { ChevronIcon, CustomOption, CustomSelect, NavButton, NavPages, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SortContainer, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TransactionsContainer, TransactionsFooter, TransactionsHeader } from './styles'

import PageContainer from '../../components/pageContainer/pageContainer'
import Modal from '../../components/modal/modal'

import Avatar from '../../assets/images/avatars/bytewise.jpg'
import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'
import PrevIcon from '../../assets/images/icon-caret-left.svg'
import NextIcon from '../../assets/images/icon-caret-right.svg'

import AddTransaction from '../../components/modal/transactions/addTransaction/addTransaction'

import { useTransactions } from '../../contexts/transactionsContext'
import { usePeople } from '../../contexts/peopleContext'

const Transactions = () => {
    const { transactions } = useTransactions()
    const { people } = usePeople()

    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const pagesQuantity = transactions.length / quantityToShow

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

    return (
        <>
            <PageContainer
                name="Transactions"
                button='+ add transaction'
                onClick={handleShowAddTransactionModal}
            >
                <TransactionsContainer>
                    <TransactionsHeader>
                        <SearchBox>
                            <SearchInput placeholder="Search transaction" />
                            <SearchButton src={SearchIcon} />
                        </SearchBox>

                        <SortContainer>
                            <SortBox>
                                <h6>Sort by</h6>

                                <SelectWrapper>
                                    <CustomSelect>
                                        <CustomOption value="1">Latest</CustomOption>
                                        <CustomOption value="2">Oldest</CustomOption>
                                        <CustomOption value="3">A to Z</CustomOption>
                                        <CustomOption value="4">Z to A</CustomOption>
                                        <CustomOption value="5">Highest</CustomOption>
                                        <CustomOption value="6">Lowest</CustomOption>
                                    </CustomSelect>
                                    <ChevronIcon src={ChevronDownIcon} alt="chevron" />
                                </SelectWrapper>
                            </SortBox>

                            <SortBox>
                                <h6>Category</h6>

                                <SelectWrapper>
                                    <CustomSelect>
                                        <option value="latest">All transactions</option>
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

                            {transactions.map((transaction, index) => (
                                index >= quantityToShowOffset &&
                                index < (quantityToShow + quantityToShowOffset) &&
                                <TableBodyRow key={index}>
                                    <TableBodyElement className='reference'>
                                        <img src={Avatar} alt="" />
                                        <h3>{people.find((person) => person.person_id === transaction.person_id)?.person_name || ''}</h3>
                                    </TableBodyElement>
                                    <TableBodyElement>{transaction.transaction_category}</TableBodyElement>
                                    <TableBodyElement>{getDateFormat(transaction.transaction_date)}</TableBodyElement>
                                    <TableBodyElement className='end'
                                        color={transaction.transaction_type === 'positive' ? 'var(--green)' : 'var(--red)'}
                                    >
                                        {transaction.transaction_type === 'positive' ? '+' : '-'}${transaction.transaction_amount}
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
            </PageContainer>

            {showAddTransactionModal &&
                <Modal
                    title={'Add Transaction'}
                    subtitle={'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'}
                    closeModal={setShowAddTransactionModal}
                >
                    <AddTransaction />
                </Modal>
            }
        </>
    )
}

export default Transactions