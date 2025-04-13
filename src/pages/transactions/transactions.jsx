import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { ChevronIcon, CustomOption, CustomSelect, NavButton, NavPages, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SortContainer, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TransactionsContainer, TransactionsFooter, TransactionsHeader } from './styles'
import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'

import { useTransactions } from '../../contexts/transactionsContext'
import { usePeople } from '../../contexts/peopleContext'

import Avatar from '../../assets/images/avatars/bytewise.jpg'
import PrevIcon from '../../assets/images/icon-caret-left.svg'
import NextIcon from '../../assets/images/icon-caret-right.svg'

const Transactions = () => {
    const { transactions } = useTransactions()
    const { people } = usePeople()

    const getDateFormat = (transactionDate) => {
        const date = new Date(transactionDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(',', '');
    };

    return (
        <PageContainer name="Transactions">
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
                    <NavButton>
                        <img src={PrevIcon} alt="" />

                        <h3>Prev</h3>
                    </NavButton>

                    <NavPages>
                        <button className='selected'>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                    </NavPages>

                    <NavButton>
                        <h3>Next</h3>

                        <img src={NextIcon} alt="" />
                    </NavButton>
                </TransactionsFooter>
            </TransactionsContainer>
        </PageContainer>
    )
}

export default Transactions