import styled from "styled-components";

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

export const ChevronIcon = styled.div`
    position: absolute;
    right: 0.5rem;
    top: 55%;
    transform: translateY(-50%);
    pointer-events: none;
`;

export const CustomOption = styled.option`
    padding: 1rem;
    font-size: 1rem;
    border-bottom: 10px solid red;
`
