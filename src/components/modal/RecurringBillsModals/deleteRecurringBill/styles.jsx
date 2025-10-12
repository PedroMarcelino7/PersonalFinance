import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const ConfirmButton = styled.button `
    background-color: var(--red);
    color: var(--white);
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`

export const CloseButton = styled.button `
    background-color: transparent;
    color: var(--gray);
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: -1rem;
`
