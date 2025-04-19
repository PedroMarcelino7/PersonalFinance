import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(32, 31, 36, 0.75);
    padding: 0.5rem;
`

export const Box = styled.div`
    width: 550px;
    background-color: var(--white);
    padding: 2rem;
    border-radius: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Title = styled.h1`
    font-size: 1.75rem;
    color: var(--dark);
`

export const Close = styled.img`
    cursor: pointer;
`

export const Subtitle = styled.h2`
    font-size: 1rem;
    color: var(--gray);
    font-weight: lighter;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`