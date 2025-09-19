import styled from "styled-components";

const getBackgroundColor = (color, disabled) => {
    const suffix = disabled ? '-muted' : '';
    return `var(--${color}${suffix})`;
};

const getTextColor = (color, disabled) => {
    const actualColor = color || 'dark';

    if (actualColor === 'light') {
        return 'var(--dark)';
    }

    return 'var(--white)';
};

const getPadding = (size) => {
    switch (size) {
        case 'small':
            return { paddingBlock: '0.5rem', paddingInline: '1rem', fontSize: '0.875rem' };
        case 'large':
            return { paddingBlock: '1rem', paddingInline: '2.5rem', fontSize: '1.25rem' };
        case 'medium':
        default:
            return { paddingBlock: '0.75rem', paddingInline: '1.25rem', fontSize: '1rem' };
    }
};

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    border: none;
    border-radius: 5px;

    padding-block: ${({ size }) => getPadding(size).paddingBlock};
    padding-inline: ${({ size }) => getPadding(size).paddingInline};
    font-size: ${({ size }) => getPadding(size).fontSize};

    background-color: ${({ color = 'dark', disabled }) =>
        getBackgroundColor(color, disabled)};
    
    color: ${({ color = 'dark', disabled }) =>
        getTextColor(color, disabled)};
    
    transition: all 0.3s ease;

    &:hover {
        opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
    }
`;
