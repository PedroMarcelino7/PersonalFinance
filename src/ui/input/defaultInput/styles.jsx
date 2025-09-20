import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const LabelSpan = styled.span`
    margin-left: 3px;
    font-size: 1rem;
    line-height: 0;
    color: var(--red);
`

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--gray);
`

export const Input = styled.input`
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid var(--gray);
    background-color: var(--white);
    font-size: 1rem;
    color: var(--dark);
`
