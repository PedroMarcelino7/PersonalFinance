import { ChevronIcon, CustomOption, CustomSelect, SelectWrapper, SortBox } from "./styles"

import { ChevronDown as ArrowIcon } from 'lucide-react';

const SelectLabel = ({ label, data, defaultOption, onSelect }) => {
    return (
        <SortBox>
            {label &&
                <h6>{label}</h6>
            }

            <SelectWrapper>
                <CustomSelect onChange={(e) => onSelect(e.target.value)}>
                    {defaultOption && (
                        <CustomOption value={defaultOption.value}>{defaultOption.name}</CustomOption>
                    )}

                    {data.map((item) => (
                        <CustomOption value={item.value}>{item.name}</CustomOption>
                    ))}
                </CustomSelect>

                <ChevronIcon>
                    <ArrowIcon
                        size={20}
                        color='var(--dark)'
                        strokeWidth={2.5}
                        cursor={'pointer'}
                    />
                </ChevronIcon>
            </SelectWrapper>
        </SortBox>
    )
}

export default SelectLabel