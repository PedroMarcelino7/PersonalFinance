import { useState } from "react";
import { Box, Button, Input } from "./styles"

import { Search as SearchIcon } from 'lucide-react';

const SearchInput = ({ placeholder, onSearch }) => {
    const [value, setValue] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        
        onSearch(value)
    }

    return (
        <Box>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <Button
                onClick={(e) => handleSearch(e)}
            >
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