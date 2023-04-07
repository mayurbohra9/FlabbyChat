import React, { useState } from 'react';
import { Input, Modal, Button, Icon } from 'semantic-ui-react'; 
import mime from "mime-types"

export const ImageUpload = (props) => {

    const [fileState, setFileState] = useState(null);

    const acceptedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif", "image/webp"]

    // const acceptedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif", "image/webp", "audio/mpeg", "audio/mp3", "video/mp4", "text/html", "text/plain", "application/zip", "application/pdf"]

    const onFileAdded = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileState(file);
        }
    }

    const submit = () => {
        if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
            props.uploadImage(fileState, mime.lookup(fileState.name));
            props.onClose();
            setFileState(null);
        }
    }

    return (<Modal basic open={props.open} onClose={props.onClose}>
        <Modal.Header>Select a image</Modal.Header>
        <Modal.Content>
            <Input
                type="file"
                name="file"
                onChange={onFileAdded}
                fluid
                label="File Type (png, jpeg, svg, webp, gif)"
            />
        </Modal.Content>
        <Modal.Actions>
            <Button color="green" onClick={submit}>
                <Icon name="checkmark" />Add
            </Button>
            <Button color="red" onClick={props.onClose}>
                <Icon name="remove" />Cancel
            </Button>
        </Modal.Actions>
    </Modal>)
}