import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--gray);
`

export const Input = styled.input`
    padding: 0.75rem;
    border-radius: 10px;
    border: 1px solid var(--gray);
    background-color: var(--white);
    font-size: 1rem;
    color: var(--dark);
`
