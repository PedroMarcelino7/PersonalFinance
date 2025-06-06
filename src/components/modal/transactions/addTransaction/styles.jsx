import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Button = styled.button`
    background-color: var(--dark);
    color: var(--white);
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`

export const AditionalInfoContainer = styled.div`
    display: flex;
    align-items: end;
    gap: 1rem;
`

export const AmountInputBox = styled.div`
    width: 85%;
`

export const CalendarBox = styled.div`
    width: 15%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;
`

export const Calendar = styled.img`
    width: 35px;
`

export const CalendarInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    font-size: 100rem;
`

export const DateSelected = styled.h1`
    font-size: 0.75rem;
    font-weight: lighter;
`

export const SelectWrapper = styled.div`
    position: relative;
`;

export const CustomSelect = styled.select`
    width: 100%;
    appearance: none;
    padding: 0.75rem;
    border: 1px solid var(--gray);
    background-color: var(--white);
    border-radius: 10px;
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
