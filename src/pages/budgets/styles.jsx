import styled from "styled-components";

export const BudgetsContainer = styled.div`
    display: flex;
    gap: 1rem;
`

export const Container = styled.div`
    width: 35%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
`

export const ChartContainer = styled.div`
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const ChartBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

export const ChartOverall = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
    z-index: -1;

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

export const SummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        font-size: 1.25rem;
        color: var(--dark);
    }
`

export const SummaryBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const SummaryItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: 3px solid red;
    padding-left: 1rem;

    h4 {
        font-size: 1rem;
        font-weight: lighter;
        color: var(--gray);
    }

    h3 {
        font-size: 0.75rem;
        font-weight: lighter;
        color: var(--gray);

        span {
            color: var(--dark);
            font-size: 1rem;
            font-weight: bold;
        }
    }
`

export const CardsContainer = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Card = styled.div`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
`

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const CardTitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
        font-size: 1.25rem;
        color: var(--dark);
    }
`

export const Identifier = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
`

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
        font-size: 1rem;
        color: var(--gray);
        font-weight: lighter;
    }
`

export const ProgressBox = styled.div`
    position: relative;
    height: 35px;
    width: 100%;
`

export const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    background-color: var(--white);
    border: 5px solid var(--white);
`

export const Progress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    background-color: red;
    border-radius: 5px;
`

export const ResumeBox = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ResumeItem = styled.div`
    width: 100%;
    border-left: 3px solid ${({ color }) => color};
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

export const LastSpendingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: var(--white);
    padding: 1.5rem;
    border-radius: 10px;
`

export const LastSpendingHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 1rem;
    }
`

export const HeaderButtons = styled.div`
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

export const LastSpendingBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const LastSpendingItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const PersonBox = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    h4 {
        font-size: 0.75rem;
        color: var(--dark);
    }
`

export const ProfilePicture = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

export const SpendDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.5rem;

    h5 {
        font-size: 0.75rem;
        color: var(--dark);
    }

    h6 {
        font-size: 0.75rem;
        font-weight: lighter;
        color: var(--gray);
    }
`