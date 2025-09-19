import { useNavigate } from "react-router-dom"

import { DetailsButtonBox } from "./styles"

// ICONS
import { ChevronRight as ArrowIcon } from 'lucide-react';

const DetailsButton = ({ label, route }) => {
    const navigate = useNavigate()

    return (
        <DetailsButtonBox onClick={() => navigate(`/${route}`)}>
            <h5>{label}</h5>

            <ArrowIcon
                size={15}
                color='var(--gray)'
                strokeWidth={2.5}
                cursor={'pointer'}
            />
        </DetailsButtonBox>
    )
}

export default DetailsButton
