import styled from "styled-components";

export const PotsCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`

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

export const PotsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ActionsButton = styled.button`
    background-color: var(--gray);
    border: none;
    border-radius: 5px;
    padding-block: 0.75rem;
    padding-inline: 1.5rem;
    font-size: 1.25rem;
    cursor: pointer;
    
    a {
        text-decoration: none;
        color: var(--white);
    }
`

export const Card = styled.div`
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        padding-block: 1rem;
        padding-inline: 0.5rem;
        cursor: pointer;
    }
`

export const CardTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const CardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
        font-size: 1.25rem;
        color: var(--dark);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

export const CardDateBox = styled.div`
    h3 {
        font-size: 0.75rem;
        color: var(--dark);
    }
`

export const Identifier = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme};
`

export const CardOptionsContainer = styled.div`
    position: relative;
    width: 100%;
    text-align: end;
`

export const CardOptionsBox = styled.div`
    position: absolute;
    top: 75%;
    right: 0;
    background: #fff;
    padding-inline: 0.5rem;
    box-shadow: 0 0 10px var(--light-gray);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    gap: 0.25rem;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 35px;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`

export const Option = styled.button`
    border: none;
    background-color: transparent;
    font-size: 1rem;
    text-align: start;
    padding: 0.5rem;
    color: ${({ color }) => color || 'var(--dark)'};
    cursor: pointer;
    font-weight: normal;
`

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const TotalSavedBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        font-size: 1rem;
        font-weight: lighter;
        color: var(--gray);
    }

    h2 {
        font-size: 1.75rem;
        color: var(--dark);
    }
`

export const ProgressBox = styled.div`
    position: relative;
    height: 10px;
    width: 100%;
`

export const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--white);
    border-radius: 10px;
    overflow: hidden;
`

export const Progress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ width }) => `${width}%`};
    background-color: ${({ theme }) => theme};
    border-radius: 10px;
`

export const ProgressDescription = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h5 {
        font-size: 0.75rem;
        color: var(--gray);
    }

    h6 {
        font-size: 0.75rem;
        color: var(--gray);
        font-weight: lighter;
    }
`

export const CardButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

export const Button = styled.button`
    width: 100%;
    background-color: var(--white);
    border: none;
    border-radius: 5px;
    padding: 1rem;
    color: var(--dark);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
`

export const FirstPotButton = styled.button`
    width: 100%;
    background-color: var(--dark);
    border: none;
    border-radius: 5px;
    padding-block: 0.75rem;
    padding-inline: 2.5rem;
    font-size: 1.25rem;
    cursor: pointer;

    a {
        text-decoration: none;
        color: var(--white);
    }
`

export const SortBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h6 {
        font-size: 1rem;
        color: var(--gray);
        font-weight: lighter;
    }
`

export const SelectWrapper = styled.div`
    position: relative;
`;

export const CustomSelect = styled.select`
    appearance: none;
    padding-block: 0.75rem;
    padding-left: 1rem;
    padding-right: 3rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
    font-size: 1rem;
    color: var(--dark);
    appearance: none;

    &::placeholder {
        color: var(--light-gray);
    }
`;

export const CustomOption = styled.option`
    padding: 1rem;
    font-size: 1rem;
`

export const ChevronIcon = styled.div`
    position: absolute;
    right: 0.5rem;
    top: 0;
    transform: translateY(40%);
    pointer-events: none;
`;
