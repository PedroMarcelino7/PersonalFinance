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
`

export const Box = styled.div`
    background-color: var(--white);
    padding: 1.5rem;
    border-radius: 10px;
    z-index: 1000;
`

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
