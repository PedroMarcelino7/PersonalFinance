import styled from "styled-components";

export const Box = styled.div`
    position: relative;
    width: 100%;
    max-width: 300px;
`

export const Input = styled.input`
    width: 100%;
    padding-block: 0.75rem;
    padding-inline: 1rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
    font-size: 1rem;
    color: var(--dark);

    &::placeholder {
        color: var(--gray);
    }
`;

export const Button = styled.div`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
    padding-left: 0.5rem;
    cursor: pointer;
`;