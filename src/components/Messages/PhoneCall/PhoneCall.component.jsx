import React, { useEffect, useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import "./PhoneCall.css";
import Audio from "../../../assets/audio/ring.mp3";

const PhoneCall = (props) => {
  const [isMute, setIsMute] = useState(true);
  const [isRecord, setIsRecord] = useState(true);
  return (
    <Modal basic open={props.open} onClose={props.onClose}>
      <Modal.Header>Phone Calling....</Modal.Header>
      <Modal.Content>
        <div class="content-center">
          <div class="pulse">
            <Icon name="phone" className="Icon" />
            <audio id="backgroundMusic" autoPlay>
              <source src={Audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          className={isRecord ? "btn" : "btn-R"}
          onClick={() => setIsRecord(!isRecord)}
        >
          {isRecord ? (
            <Icon color="red" name="circle" />
          ) : (
            <Icon name="stop circle" />
          )}
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

export default PhoneCall;
