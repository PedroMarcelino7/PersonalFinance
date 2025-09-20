import { useEffect, useState } from 'react'

import { BillsContainer, BillsHeader, ChevronIcon, CustomOption, CustomSelect, NavButton, NavPages, RecurringBillsContainer, ResumeBox, ResumeContainer, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SummaryBox, SummaryContainer, SummaryItem, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TotalContainer, RecurringBillsFooter, BillsBox } from './styles'

// COMPONENTS
import PageContainer from '../../components/pageContainer/pageContainer'
import EmptyPage from '../../components/emptyPage/emptyPage'

// CONTEXTS
import { useRecurringBills } from '../../contexts/recurringBillsContext'

// ICONS
import { CalendarSync as BillsIcon } from 'lucide-react'

import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'
import Avatar from '../../assets/images/avatars/bytewise.jpg'
import PrevIcon from '../../assets/images/icon-caret-left.svg'
import NextIcon from '../../assets/images/icon-caret-right.svg'


const RecurringBills = () => {
    const { recurringBills } = useRecurringBills()

    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const pagesQuantity = recurringBills.length / quantityToShow

    const getBills = (status) => {
        const bills = recurringBills.reduce((acc, bill) => {
            const amount = parseFloat(bill.bill_amount)
            return bill.bill_status === status && !isNaN(amount) ? acc + amount : acc
        }, 0)

        return bills.toFixed(2)
    }

    const getBillsTotal = () => {
        return recurringBills.reduce((acc, bill) => {
            return bill.bill_status !== 1 ? acc + parseFloat(bill.bill_amount) : acc
        }, 0).toFixed(2);
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

    const getBillStatusColor = (bill) => {
        if (bill.bill_status === 1) {
            return 'var(--green)'
        } else if (bill.bill_status === 2) {
            return 'var(--red)'
        } else {
            return 'var(--dark)'
        }
    }

    const dateFormatter = (date) => {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)

        return `${day}/${month}/${year}`
    }

    return (
        <PageContainer
            name="Recurring Bills"
            button={recurringBills.length === 0 ? '' : '+ Add Recurring Bill'}
            buttonClick={() => openModal('add')}
        >
            {recurringBills.length === 0
                ? <EmptyPage
                    title="You don't have any recurring bill yet."
                    subtitle="Start recording your fixed expenses."
                    button='Create your first recurring bill'
                    onClick={() => openModal('add')}
                />
                : <RecurringBillsContainer>
                    <ResumeContainer>
                        <TotalContainer>
                            <BillsIcon
                                size={45}
                                color='var(--white)'
                                strokeWidth={1.5}
                            />

                            <ResumeBox>
                                <h6>Total Bills</h6>

                                <h3>${getBillsTotal()}</h3>
                            </ResumeBox>
                        </TotalContainer>

                        <SummaryContainer>
                            <h2>Summary</h2>

                            <SummaryBox>
                                <SummaryItem color='var(--green)'>
                                    <h5>Paid Bills ({getBillsQuantity(1)})</h5>

                                    <h4>${getBills(1)}</h4>
                                </SummaryItem>

                                <hr />

                                <SummaryItem>
                                    <h5>Total Upcoming ({getBillsQuantity(0)})</h5>

                                    <h4>${getBills(0)}</h4>
                                </SummaryItem>

                                <hr />

                                <SummaryItem color='var(--red)'>
                                    <h5>Due Soon ({getBillsQuantity(2)})</h5>

                                    <h4>${getBills(2)}</h4>
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
                                            {dateFormatter(bill.bill_due_date)}
                                        </TableBodyElement>

                                        <TableBodyElement className='end'
                                            color={
                                                getBillStatusColor(bill)
                                            }
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
            }
        </PageContainer>
    )
}

export default RecurringBills