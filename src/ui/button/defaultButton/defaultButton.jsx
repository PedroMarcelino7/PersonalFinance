import { Button } from "./styles"

const DefaultButton = ({ label = '', color = 'dark', size = 'medium', type = 'button', disabled = false, onClick }) => {
    return (
        <Button
            color={color}
            size={size}
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default DefaultButton