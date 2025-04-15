import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Bill, BillsContainer, BillsHeader, ChevronIcon, CustomOption, CustomSelect, RecurringBillsContainer, ResumeBox, ResumeContainer, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SummaryBox, SummaryContainer, SummaryItem, Table, TableBodyElement, TableBodyRow, TableHeader, TableHeaderElement, TotalContainer } from './styles'
import BillsIcon from '../../assets/images/icon-recurring-bills.svg'
import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'
import Avatar from '../../assets/images/avatars/bytewise.jpg'

const RecurringBills = () => {
    return (
        <PageContainer name="Recurring Bills">
            <RecurringBillsContainer>
                <ResumeContainer>
                    <TotalContainer>
                        <Bill src={BillsIcon} alt="" />

                        <ResumeBox>
                            <h6>Total Bills</h6>

                            <h3>$384.98</h3>
                        </ResumeBox>
                    </TotalContainer>

                    <SummaryContainer>
                        <h2>Summary</h2>

                        <SummaryBox>
                            <SummaryItem>
                                <h5>Paid Bills</h5>

                                <h4>4 ($190.00)</h4>
                            </SummaryItem>

                            <hr />

                            <SummaryItem>
                                <h5>Total Upcoming</h5>

                                <h4>4 ($194.98)</h4>
                            </SummaryItem>

                            <hr />

                            <SummaryItem color='var(--red)'>
                                <h5>Due Soon</h5>

                                <h4>2 ($59.98)</h4>
                            </SummaryItem>
                        </SummaryBox>
                    </SummaryContainer>
                </ResumeContainer>

                <BillsContainer>
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
                                <TableHeaderElement>Due Date</TableHeaderElement>
                                <TableHeaderElement className='end'>Amount</TableHeaderElement>
                            </tr>
                        </TableHeader>

                        <TableBodyRow>
                            <TableBodyElement className='reference'>
                                <img src={Avatar} alt="" />
                                <h3>Name</h3>
                            </TableBodyElement>
                            <TableBodyElement>Monthly-2nd</TableBodyElement>
                            <TableBodyElement className='end'
                                color='var(--green)'
                            >
                                $300.00
                            </TableBodyElement>
                        </TableBodyRow>
                    </Table>
                </BillsContainer>
            </RecurringBillsContainer>
        </PageContainer >
    )
}

export default RecurringBills