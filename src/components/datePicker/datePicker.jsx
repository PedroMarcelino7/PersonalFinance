import { Box, Container, Footer } from "./styles";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import DefaultButton from "../../ui/button/defaultButton/defaultButton";

const DatePicker = ({ selected, setSelected, onClick, disabled = null }) => {
    return (
        <Container>
            <Box>
                <DayPicker
                    animate
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    disabled={[
                        disabled,
                        selected
                    ]}
                    footer={
                        <Footer>
                            {selected ? `Selected: ${selected.toISOString().split("T")[0]}` : "Pick a day."}

                            <DefaultButton
                                label={'Confirm'}
                                size="medium"
                                color="dark"
                                onClick={onClick}
                            />
                        </Footer>
                    }
                />
            </Box>
        </Container>
    )
}

export default DatePicker