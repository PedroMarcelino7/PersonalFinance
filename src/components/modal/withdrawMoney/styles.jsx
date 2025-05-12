import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Button = styled.button`
    width: 100%;
    background-color: var(--dark);
    color: var(--white);
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`

export const AmountContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

export const AmountBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        font-size: 1rem;
        color: var(--gray);
        font-weight: lighter;
    }

    h2 {
        font-size: 2rem;
        color: var(--dark);
    }
`

export const ProgressBarBox = styled.div`
    width: 100%;
    height: 10px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
`

export const ActualProgress = styled.div`
    width: ${({ width }) => width || '0%'};
    height: 100%;
    background-color: var(--dark);
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    z-index: 1;
`

export const NewProgress = styled.div`
    width: ${({ width }) => `calc(${width || '0%'} - 0.25rem)` || '0%'};
    height: 100%;
    background-color: var(--red);
    position: absolute;
    top: 0;
    left: ${({ margin }) => `calc(${margin || '0%'} + 0.25rem)`};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 2;
`

export const ProgressValues = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h5 {
        font-size: 1rem;
        color: var(--red);
    }

    h4 {
        font-size: 1rem;
        color: var(--gray);
        font-weight: lighter;
    }
`

export const QuickButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`

export const QuickButtonsBox = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`

export const QuickButtonsActions = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.25rem;
`

export const QuickButton = styled.button`
    width: 100%;
    border: none;
    background-color: ${({ color }) => color || 'var(--dark)'};
    color: var(--white);
    padding-block: 0.5rem;
    padding-inline: 1rem;
    border-radius: 5px;
    cursor: pointer;

    img {
        width: 1rem;
        height: 1rem;
    }
`
