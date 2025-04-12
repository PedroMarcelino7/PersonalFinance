import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { ChevronIcon, CustomSelect, SearchBox, SearchButton, SearchInput, SelectWrapper, SortBox, SortContainer, TransactionsContainer, TransactionsHeader } from './styles'
import SearchIcon from '../../assets/images/icon-search.svg'
import ChevronDownIcon from '../../assets/images/icon-caret-down.svg'

const Transactions = () => {
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
                                    <option value="latest">Latest</option>
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
            </TransactionsContainer>
        </PageContainer>
    )
}

export default Transactions