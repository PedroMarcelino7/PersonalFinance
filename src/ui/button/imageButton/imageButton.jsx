import { useRef, useState } from 'react';

import { Container, Image, Label, InformationLabel } from './styles'

// ICONS
import { Upload as UploadIcon } from 'lucide-react';

const ImageButton = ({ setAvatar }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState('')

    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) return

        setSelectedFile(file)

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "personal_finance");

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const uploadedImage = await res.json();
            setAvatar(uploadedImage.secure_url)

            console.log(uploadedImage);
            console.log("URL:");
            console.log(uploadedImage.secure_url);

        } catch (error) {
            console.error(error);
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
                            Suggested size: 500x500 pixels
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