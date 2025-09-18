import { Box, Button, Input } from "./styles"

import { Search as SearchIcon } from 'lucide-react';

const SearchInput = ({ placeholder }) => {
    return (
        <Box>
            <Input placeholder={placeholder} />

            <Button>
                <SearchIcon
                    size={20}
                    color='var(--dark)'
                    strokeWidth={2.5}
                    cursor={'pointer'}
                />
            </Button>
        </Box>
    )
}

export default SearchInput