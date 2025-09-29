import styled from "styled-components";

export const RecurringBillsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
`

export const ResumeContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const TotalContainer = styled.div`
    width: 100%;
    background-color: var(--dark);
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

export const Bill = styled.img`
    width: 40px;
`

export const ResumeBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h6 {
        font-size: 1rem;
        color: var(--white);
        font-weight: lighter;
    }

    h3 {
        font-size: 2.5rem;
        color: var(--white);
    }
`

export const SummaryContainer = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h2 {
        font-size: 1.5rem;
        color: var(--dark);
    }
`

export const SummaryBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

export const SummaryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h5 {
        font-size: 1rem;
        font-weight: lighter;
        color: ${({ color }) => color || 'var(--gray)'};
    }

    h4 {
        font-size: 1rem;
        color: ${({ color }) => color || 'var(--dark)'};
    }
`

export const BillsContainer = styled.div`
    width: 70%;
`

export const BillsBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const BillsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SearchBox = styled.div`
    position: relative;
    width: 100%;
    max-width: 300px;
`

export const SearchInput = styled.input`
    width: 100%;
    padding-block: 0.75rem;
    padding-inline: 1rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
    font-size: 1rem;
    color: var(--dark);

    &::placeholder {
        color: var(--light-gray);
    }
`;

export const SearchButton = styled.img`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

export const SortBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h6 {
        font-size: 1rem;
        color: var(--gray);
        font-weight: lighter;
    }
`

export const SelectWrapper = styled.div`
    position: relative;
`;

export const CustomSelect = styled.select`
    appearance: none;
    padding-block: 0.75rem;
    padding-left: 1rem;
    padding-right: 3rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
    font-size: 1rem;
    color: var(--dark);
    appearance: none;

    &::placeholder {
        color: var(--light-gray);
    }
`;

export const CustomOption = styled.option`
    padding: 1rem;
    font-size: 1rem;
    border-bottom: 10px solid red;
`

export const ChevronIcon = styled.img`
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    width: 12px;
    height: 12px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`

export const TableHeader = styled.thead`
    border-bottom: 1px solid var(--light-gray);
`

export const TableHeaderElement = styled.th`
    font-size: 1rem;
    font-weight: lighter;
    color: var(--gray);
    text-align: start;
    padding-block: 1rem;
    
    &.end {
        text-align: end;
    }
`

export const TableBodyRow = styled.tr`
    border-bottom: 1px solid var(--light-gray);
    transition: all 0.75s;
`

export const TableBodyElement = styled.td`
    padding-block: 1rem;
    font-size: 1rem;
    font-weight: lighter;
    color: var(--gray);
    text-align: start;

    &.reference {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        }

        h3 {
        font-size: 1rem;
        color: var(--dark);
        }
    }

    &.end {
        text-align: end;
        font-weight: bold;
        color: ${({ color }) => color};
    }
`

export const RecurringBillsFooter = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`

export const NavButton = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid var(--light-gray);
    padding-block: 0.75rem;
    padding-inline: 1.5rem;
    border-radius: 5px;
    cursor: pointer;

    h3 {
        font-size: 1rem;
        font-weight: lighter;
        color: var(--dark);
    }
`

export const NavPages = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    button {
        border: 1px solid var(--light-gray);
        width: 45px;
        height: 45px;
        border-radius: 5px;
        cursor: pointer;
        background-color: transparent;
        color: var(--dark);
        font-size: 1rem;

        &.selected {
            background-color: var(--dark);
            color: var(--white);
        }
    }
`

export const EmptyPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`

export const EmptyPageTextBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--dark);

    h1 {
        font-size: 2.25rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: normal;
    }
`

export const FirstBudgetButton = styled.button`
    width: 100%;
    background-color: var(--dark);
    border: none;
    border-radius: 5px;
    padding-block: 0.75rem;
    padding-inline: 2.5rem;
    color: var(--white);
    font-size: 1.25rem;
    cursor: pointer;
`

export const CardOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
`
