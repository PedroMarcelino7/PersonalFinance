import styled from "styled-components";

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

export const Button = styled.button`
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
