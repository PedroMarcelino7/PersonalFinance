import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--gray);
`

export const SelectBox = styled.div`
    position: relative;
    border: 1px solid var(--gray);
    background-color: var(--white);
    border-radius: 5px;
    padding: 0.75rem;
    cursor: pointer;
`

export const Selected = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ThemeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    h1 {
        font-size: 1rem;
        font-weight: lighter;
        color: var(--dark);
    }
`

export const ChevronIcon = styled.img`
    width: 0.75rem;
`

export const Options = styled.div`
    width: 100%;
    max-height: 150px;
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--white);
    box-shadow: 0 0 10px var(--light-gray);
    border-radius: 5px;
    margin-top: 0.25rem;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 1000;
`

export const Option = styled.div`
    padding: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }
`

export const ColorDot = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`
