import { Button } from "./styles"

const DefaultButton = ({ label, color = 'dark', size = 'medium', disabled = false, onClick }) => {
    return (
        <Button
            color={color}
            size={size}
            disabled={disabled}
            type="button"
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default DefaultButton