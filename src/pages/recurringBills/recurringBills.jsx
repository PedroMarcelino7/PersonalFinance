import { useEffect, useState } from 'react'

import { BillsContainer, BillsHeader, NavPages, RecurringBillsContainer, ResumeBox, ResumeContainer, SummaryBox, SummaryContainer, SummaryItem, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TotalContainer, RecurringBillsFooter, BillsBox } from './styles'

// COMPONENTS
import PageContainer from '../../components/pageContainer/pageContainer'
import EmptyPage from '../../components/emptyPage/emptyPage'

// CONTEXTS
import { useRecurringBills } from '../../contexts/recurringBillsContext'

// ICONS
import { CalendarSync as BillsIcon } from 'lucide-react'

// UI COMPONENTS
import SearchInput from '../../ui/input/searchInput/searchInput'
import SelectLabel from '../../ui/select/selectLabel/selectLabel'
import ButtonArrow from '../../ui/button/buttonArrow/buttonArrow'

// IMAGES
import Avatar from '../../assets/images/avatars/bytewise.jpg'

// MODAL MANAGER
import RecurringBillsModalManager from '../../managers/RecurringBillsModalManager/RecurringBillsModalManager'

const RecurringBills = () => {
    const { recurringBills } = useRecurringBills()

    const [modal, setModal] = useState({ type: null, pot: null });
    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const filteredBills = recurringBills.filter((bill) => bill.bill_type === 0)
    const [hoveredRow, setHoveredRow] = useState(null);

    const [page, setPage] = useState(1)
    const quantityToShow = 7
    const [quantityToShowOffset, setQuantityToShowOffset] = useState(0)
    const pagesQuantity = recurringBills.length / quantityToShow

    const getBills = (status) => {
        const bills = filteredBills.reduce((acc, bill) => {
            const amount = parseFloat(bill.bill_amount)
            return bill.bill_status === status && !isNaN(amount) ? acc + amount : acc
        }, 0)

        return bills.toFixed(2)
    }

    const getBillsTotal = () => {
        return filteredBills.reduce((acc, bill) => {
            return acc + parseFloat(bill.bill_amount)
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
        switch (bill.bill_status) {
            case 1:
                return 'var(--green)'
            case 2:
                return 'var(--orange)'
            case 3:
                return 'var(--red)'
            default:
                return 'var(--dark)'
        }
    }

    const formatRecurrence = (status) => {
        switch (status) {
            case 0:
                return 'Weekly'
            case 1:
                return 'Each 15 days'
            case 2:
                return 'Monthly'
            case 3:
                return 'Semiannually'
            case 4:
                return 'Anually'
            default:
                break;
        }
    }

    const dateFormatter = (date) => {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)

        return `${day}/${month}/${year}`
    }

    return (
        <>
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
                                    <SummaryItem>
                                        <h5>Total Upcoming ({getBillsQuantity(0)})</h5>

                                        <h4>${getBills(0)}</h4>
                                    </SummaryItem>

                                    <hr />

                                    <SummaryItem color='var(--green)'>
                                        <h5>Paid Bills ({getBillsQuantity(1)})</h5>

                                        <h4>${getBills(1)}</h4>
                                    </SummaryItem>

                                    <hr />

                                    <SummaryItem color='var(--orange)'>
                                        <h5>Due Soon ({getBillsQuantity(2)})</h5>

                                        <h4>${getBills(2)}</h4>
                                    </SummaryItem>

                                    <hr />

                                    <SummaryItem color='var(--red)'>
                                        <h5>Overdue ({getBillsQuantity(3)})</h5>

                                        <h4>${getBills(3)}</h4>
                                    </SummaryItem>
                                </SummaryBox>
                            </SummaryContainer>
                        </ResumeContainer>

                        <BillsContainer>
                            <BillsBox>
                                <BillsHeader>
                                    <SearchInput
                                        placeholder={'Search Bills'}
                                    />

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
                                    />
                                </BillsHeader>

                                <Table>
                                    <TableHeader>
                                        <tr>
                                            <TableHeaderElement>Bill Title</TableHeaderElement>
                                            <TableHeaderElement>Budget</TableHeaderElement>
                                            <TableHeaderElement>Recurrence</TableHeaderElement>
                                            <TableHeaderElement>Due Date</TableHeaderElement>
                                            <TableHeaderElement className='end'>Amount</TableHeaderElement>
                                        </tr>
                                    </TableHeader>

                                    {recurringBills.map((bill, index) => (
                                        index >= quantityToShowOffset &&
                                        index < (quantityToShow + quantityToShowOffset) &&
                                        <TableBodyRow>
                                            <TableBodyElement className='reference'
                                                color={getBillStatusColor(bill)}
                                            >
                                                <img src={Avatar} alt="" />
                                                <h3>{bill.bill_name}</h3>
                                            </TableBodyElement>

                                            <TableBodyElement>
                                                {bill.budget_name}
                                            </TableBodyElement>

                                            <TableBodyElement>
                                                {formatRecurrence(bill.bill_recurrence)}
                                            </TableBodyElement>

                                            <TableBodyElement>
                                                {dateFormatter(bill.bill_due_date)}
                                            </TableBodyElement>

                                            <TableBodyElement className='end'
                                                color={bill.bill_type === 0 ? 'var(--red)' : 'var(--green)'}
                                            >
                                                ${bill.bill_amount}
                                            </TableBodyElement>
                                        </TableBodyRow>
                                    ))}
                                </Table>

                                <RecurringBillsFooter>
                                    <ButtonArrow
                                        label={'Prev'}
                                        orientation={'left'}
                                        onClick={() => handleChangeRecurringBillsPage('prev', page)}
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
                                        onClick={() => handleChangeRecurringBillsPage('next', page)}
                                    />
                                </RecurringBillsFooter>
                            </BillsBox>
                        </BillsContainer>
                    </RecurringBillsContainer>
                }
            </PageContainer>

            <RecurringBillsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default RecurringBills