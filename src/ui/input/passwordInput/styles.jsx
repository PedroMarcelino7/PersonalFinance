import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
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

export const InputBox = styled.div`
    position: relative;
`

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid var(--gray);
    background-color: ${({ disabled }) => disabled ? 'var(--light-gray)' : 'var(--white)'};
    font-size: 1rem;
    color: var(--dark);
`

export const IconBox = styled.div`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    padding: 0.5rem;
    background-color: var(--white);
    z-index: 1000;
`