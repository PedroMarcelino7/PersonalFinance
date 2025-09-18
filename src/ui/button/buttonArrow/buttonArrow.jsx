import { NavButton } from "./styles"

import { ChevronLeft as ArrowLeft } from 'lucide-react';
import { ChevronRight as ArrowRight } from 'lucide-react';

const ButtonArrow = ({ onClick, label, orientation }) => {
    return (
        <NavButton onClick={onClick}>
            {orientation === 'left' &&
                <ArrowLeft
                    size={20}
                    color='var(--dark)'
                    strokeWidth={2.5}
                    cursor={'pointer'}
                />
            }

            <h3>{label}</h3>

            {orientation === 'right' &&
                <ArrowRight
                    size={20}
                    color='var(--dark)'
                    strokeWidth={2.5}
                    cursor={'pointer'}
                />
            }
        </NavButton>
    )
}

export default ButtonArrow