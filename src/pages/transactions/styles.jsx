import styled from "styled-components";

export const TransactionsContainer = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const TransactionsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
`

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

export const ChevronIcon = styled.img`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 12px;
  height: 12px;
`;