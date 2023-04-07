import React, { createRef } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import Webcam from "react-webcam";
import { useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import Audio from "../../../assets/audio/ring.mp3";

const VideoCall = (props) => {
  const [isMute, setIsMute] = useState(true);

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const download = (image, { name = "screenshot", extension = "png" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <Modal basic open={props.open} onClose={props.onClose}>
      <Modal.Header>Video Calling....</Modal.Header>
      <Modal.Content>
        <div class="content-center" ref={ref}>
          <div class="pulse">
            <Icon name="video" className="Icon" />
            <audio id="backgroundMusic" autoPlay>
              <source src={Audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="videobox">
            <Webcam width={200} height={300} />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={downloadScreenshot} className="btn1">
          <Icon name="camera" />
        </Button>
        <Button
          className={isMute ? "btn" : "btn-R"}
          onClick={() => setIsMute(!isMute)}
        >
          {isMute ? (
            <Icon name="microphone" />
          ) : (
            <Icon name="microphone slash" />
          )}
        </Button>
        <Button color="red" onClick={props.onClose} className="btn">
          <Icon name="times" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VideoCall;
