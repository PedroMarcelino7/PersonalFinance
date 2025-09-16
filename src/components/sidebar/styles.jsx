import styled from 'styled-components'

export const Container = styled.div`
    min-width: 325px;
    max-width: 15%;
    height: 100dvh;
    background-color: var(--dark);
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    padding-block: 3rem;
    padding-inline: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const TopBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3.25rem;
`

export const LogoBox = styled.figure`
    cursor: pointer;
`

export const NavigationBox = styled.div`
    transform: translateX(-2rem);
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const NavigationButton = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-inline: 2rem;
    padding-block: 0.75rem;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: 5px solid transparent;
    cursor: pointer;
    transition: all 0.5s;
    
    h2 {
        color: var(--light-gray);
        font-size: 1.25rem;
    }

    &.selected {
        background-color: var(--white);
        border-color: var(--green);

        h2 {
            color: var(--dark);
        }

        &:hover {
            transform: scale(1.05);

            h2 {
                color: #000; 
            }
        }
    }

    &:hover {
        transform: scale(1.05);

        h2 {
            color: #fff; 
        }
    }
`

export const FooterBox = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    h1 {
        color: var(--light-gray);
        font-size: 1rem;
    }
`