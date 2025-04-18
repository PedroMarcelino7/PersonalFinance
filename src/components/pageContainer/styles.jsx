import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding-block: 2rem;
    padding-inline: 3rem;
    gap: 3rem;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: var(--white);
    overflow-x: hidden;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Title = styled.h1`
    font-size: 2rem;
    color: var(--dark);
`

export const Button = styled.button`
    background-color: var(--dark);
    border: none;
    border-radius: 10px;
    padding: 1rem;
    color: var(--white);
    cursor: pointer;
`