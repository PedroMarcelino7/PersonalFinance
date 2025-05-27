import React, { useEffect, useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Bill, BillsContainer, BillsHeader, ChevronIcon, CustomOption, CustomSelect, NavButton, NavPages, RecurringBillsContainer, ResumeBox, ResumeContainer, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SummaryBox, SummaryContainer, SummaryItem, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TotalContainer, RecurringBillsFooter, BillsBox } from './styles'

import { useRecurringBills } from '../../contexts/recurringBillsContext'
import { usePeople } from '../../contexts/peopleContext'

import BillsIcon from '../../assets/images/icon-recurring-bills.svg'
import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'
import Avatar from '../../assets/images/avatars/bytewise.jpg'
import PrevIcon from '../../assets/images/icon-caret-left.svg'
import NextIcon from '../../assets/images/icon-caret-right.svg'

const RecurringBills = () => {
    const { recurringBills } = useRecurringBills()
    const { people } = usePeople()

    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const pagesQuantity = recurringBills.length / quantityToShow

    const getTotalBills = () => {
        const totalBills = recurringBills.reduce((acc, bill) => {
            const amount = parseFloat(bill.bill_amount)
            return (bill.bill_status === 'upcoming' || bill.bill_status === 'paid') && !isNaN(amount) ? acc + amount : acc
        }, 0)

        return totalBills.toFixed(2)
    }

    const getBills = (status) => {
        const bills = recurringBills.reduce((acc, bill) => {
            const amount = parseFloat(bill.bill_amount)
            return bill.bill_status === status && !isNaN(amount) ? acc + amount : acc
        }, 0)

        return bills.toFixed(2)
    }

    const getBillsQuantity = (status) => {
        const billsQuantity = recurringBills.filter((bill) => {
            return bill.bill_status === status
        })

        return billsQuantity.length
    }

    useEffect(() => {
        console.log("Recurring Bills Atualizados:", recurringBills);
    }, [recurringBills]);

    const handleChangeRecurringBillsPage = (type, page) => {
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
        <PageContainer name="Recurring Bills">
            <RecurringBillsContainer>
                <ResumeContainer>
                    <TotalContainer>
                        <Bill src={BillsIcon} alt="" />

                        <ResumeBox>
                            <h6>Total Bills</h6>

                            <h3>${getTotalBills()}</h3>
                        </ResumeBox>
                    </TotalContainer>

                    <SummaryContainer>
                        <h2>Summary</h2>

                        <SummaryBox>
                            <SummaryItem>
                                <h5>Paid Bills</h5>

                                <h4>{getBillsQuantity('paid')} (${getBills('paid')})</h4>
                            </SummaryItem>

                            <hr />

                            <SummaryItem>
                                <h5>Total Upcoming</h5>

                                <h4>{getBillsQuantity('upcoming')} (${getBills('upcoming')})</h4>
                            </SummaryItem>

                            <hr />

                            <SummaryItem color='var(--red)'>
                                <h5>Due Soon</h5>

                                <h4>{getBillsQuantity('due soon')} (${getBills('due soon')})</h4>
                            </SummaryItem>
                        </SummaryBox>
                    </SummaryContainer>
                </ResumeContainer>

                <BillsContainer>
                    <BillsBox>
                        <BillsHeader>
                            <SearchBox>
                                <SearchInput placeholder="Search bills" />
                                <SearchButton src={SearchIcon} />
                            </SearchBox>

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
                        </BillsHeader>

                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderElement>Bill Title</TableHeaderElement>
                                    <TableHeaderElement>Recurrence</TableHeaderElement>
                                    <TableHeaderElement>Due Date</TableHeaderElement>
                                    <TableHeaderElement className='end'>Amount</TableHeaderElement>
                                </tr>
                            </TableHeader>

                            {recurringBills.map((bill, index) => (
                                index >= quantityToShowOffset &&
                                index < (quantityToShow + quantityToShowOffset) &&
                                <TableBodyRow>
                                    <TableBodyElement className='reference'>
                                        <img src={Avatar} alt="" />
                                        <h3>{bill.person_name}</h3>
                                    </TableBodyElement>

                                    <TableBodyElement>
                                        {bill.bill_recurrence}
                                    </TableBodyElement>

                                    <TableBodyElement>
                                        {bill.bill_due_date}
                                    </TableBodyElement>

                                    <TableBodyElement className='end'
                                        color='var(--green)'
                                    >
                                        ${bill.bill_amount}
                                    </TableBodyElement>
                                </TableBodyRow>
                            ))}
                        </Table>

                        <RecurringBillsFooter>
                            <NavButton onClick={() => handleChangeRecurringBillsPage('prev', page)}>
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

                            <NavButton onClick={() => handleChangeRecurringBillsPage('next', page)}>
                                <h3>Next</h3>

                                <img src={NextIcon} alt="" />
                            </NavButton>
                        </RecurringBillsFooter>
                    </BillsBox>
                </BillsContainer>
            </RecurringBillsContainer>
        </PageContainer>
    )
}

export default RecurringBills