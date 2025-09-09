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

export const LinkInputBox = styled.div`
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
