import styled from "styled-components";

export const PotsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
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
    padding-block: 0.5rem;
    padding-inline: 1rem;
    box-shadow: 0 0 10px var(--light-gray);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 1000;
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