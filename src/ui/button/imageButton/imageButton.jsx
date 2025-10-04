import { Container, Text } from './styles'

// ICONS
import { Upload as UploadIcon } from 'lucide-react';

const ImageButton = () => {
    return (
        <Container>
            <Text>
                Upload an avatar image
            </Text>

            <UploadIcon
                size={40}
                color='var(--blue)'
                strokeWidth={2.25}
                cursor={'pointer'}
            />
        </Container>
    )
}

export default ImageButton