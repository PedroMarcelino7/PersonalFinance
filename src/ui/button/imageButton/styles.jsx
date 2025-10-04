import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--blue-muted);
    border-radius: 5px;
    background-color: #ECECFF;
    padding: 1rem;
    gap: 1rem;
`

export const Label = styled.h1`
    font-size: 1.25rem;
    font-weight: normal;
    color: var(--dark);
`

export const Image = styled.img`
    background-color: var(--white);
    border: 1px solid var(--dark-muted);
    border-radius: 5px;
    width: 150px;
    height: 150px;
`

export const InformationLabel = styled.h2`
    font-size: 1rem;
    font-weight: normal;
    color: var(--dark-muted);
`
