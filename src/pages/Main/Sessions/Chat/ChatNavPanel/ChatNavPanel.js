import React, {useState} from 'react';
import {MediaButton, MediaButtonIcon, MediaNavPanel} from "../AudioCall/AudioCallStyled";

const ChatNavPanel = ({video, handleCall}) => {
    const [notUsedStatus, setNotUsedStatus] = useState({
        microphone: false,
        video: false,
        audio: false,
        fullScreen: false,
    })
    const handleActive = (e) => {
        const buttonName = e.currentTarget.name;
        if (buttonName) {
            setNotUsedStatus({
                ...notUsedStatus,
                [buttonName]: !notUsedStatus[buttonName]
            })
        }
    }
    return (
        <MediaNavPanel>
            {
                video && (
                    <MediaButton>
                        <MediaButtonIcon className="far fa-expand"/>
                    </MediaButton>
                )
            }
            <MediaButton onClick={handleActive} name='microphone' notUsed={notUsedStatus.microphone}>
                <MediaButtonIcon className="far fa-microphone"/>
            </MediaButton>
            <MediaButton onClick={handleActive} name='audio' notUsed={notUsedStatus.audio}>
                <MediaButtonIcon className="far fa-volume-up"/>
            </MediaButton>
            {
                video && (
                    <MediaButton onClick={handleActive} name='video' backGround='#5A8DF4' notUsed={notUsedStatus.video}>
                        <MediaButtonIcon className="far fa-video"/>
                    </MediaButton>
                )
            }
            <MediaButton onClick={handleCall} backGround='#FC3E3E'>
                <MediaButtonIcon className="far fa-phone"/>
            </MediaButton>
        </MediaNavPanel>
    );
};

export default ChatNavPanel;
