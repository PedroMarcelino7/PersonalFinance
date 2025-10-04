import { useRef, useState } from 'react';

import { Container, Image, Label, InformationLabel } from './styles'

// ICONS
import { Upload as UploadIcon } from 'lucide-react';

const ImageButton = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState('')

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file)
        }
    };

    return (
        <>
            <div onClick={handleClick}>
                {selectedFile
                    ?
                    <Container>
                        <Image src={URL.createObjectURL(selectedFile)} />

                        <Label>
                            {selectedFile.name}
                        </Label>
                    </Container>

                    :
                    <Container>
                        <Label>
                            Upload an avatar image
                        </Label>

                        <UploadIcon
                            size={40}
                            color='var(--blue)'
                            strokeWidth={2.25}
                            cursor={'pointer'}
                        />

                        <InformationLabel>
                            Suggested size: 150x150 pixels
                        </InformationLabel>
                    </Container>
                }
            </div>

            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </>
    )
}

export default ImageButton