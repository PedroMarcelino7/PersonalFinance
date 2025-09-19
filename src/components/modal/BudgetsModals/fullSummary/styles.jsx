import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
