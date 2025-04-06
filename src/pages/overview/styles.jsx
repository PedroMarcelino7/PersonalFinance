import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`

export const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`

export const ResumeBox = styled.div`
    width: 100%;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--dark);

    h3 {
        font-size: 0.75rem;
        font-weight: lighter;
    }

    h2 {
        font-size: 2rem;
    }

    &.highlight {
        background-color: var(--dark);
        color: var(--white);
    }
`

export const MainBox = styled.div`
    display: flex;
    gap: 1rem;
`

export const Column = styled.div`
    width: ${({ width }) => width};
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Card = styled.div`
    width: 100%;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const CardTitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
        font-size: 1.5rem;
        color: var(--dark);
    }
`

export const DetailsButtonBox = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    h5 {
        color: var(--gray);
        font-size: 0.75rem;
        font-weight: lighter;
    }
`

export const CardContext = styled.div`
    width: 100%;
`

export const PotsContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
`

export const PotBox = styled.div`
    width: 40%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 5px;
    padding: 1rem;
`

export const PotDescription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    h5 {
        font-size: 0.75rem;
        font-weight: lighter;
        color: var(--gray);
    }

    h4 {
        font-size: 1.5rem;
        color: var(--dark);
    }
`

export const PotDistributionContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const PotDistributionBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`

export const Distribution = styled.div`
    border-left: 3px solid red;
    padding-left: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h6 {
        font-size: 0.75rem;
        color: var(--gray);
        font-weight: lighter;
    }

    h5 {
        font-size: 1rem;
        color: var(--dark);
    }
`

export const BudgetsContainer = styled.div`
    display: flex;
    align-items: center;
`

export const ChartContainer = styled.div`
    position: relative;
`

export const ChartOverall = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
        font-size: 1.75rem;
        color: var(--dark);
    }

    h3 {
        font-size: 0.75rem;
        color: var(--gray);
        font-weight: lighter;
    }
`