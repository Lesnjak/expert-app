import React, {useEffect, useState} from 'react';
import '../../../../../fontAwesome/fontAwesome.css'
import {

    ChatMediaWrapper,
    StatusTitle,
    ChatMediaHeaderTime,
    ChatMediaHeaderTitle,
    ChatMediaHeader,
    CallVideoWindow

} from './VideoCallStyled'
import ChatNavPanel from "../ChatNavPanel/ChatNavPanel";
import {MediaButtonIcon} from "../AudioCall/AudioCallStyled";

const VideoCall = ({handleCall}) => {
    const [isCall, setIsCall] = useState(false);
    return (
        <ChatMediaWrapper>
            <ChatMediaHeader>
                <ChatMediaHeaderTitle>
                    Session starting
                </ChatMediaHeaderTitle>
                <ChatMediaHeaderTime>
                    Time remaining: 00:49:45
                </ChatMediaHeaderTime>
                <StatusTitle><MediaButtonIcon className="fa fa-video"/>Video Call</StatusTitle>
                <CallVideoWindow/>
            </ChatMediaHeader>
            <ChatNavPanel video handleCall={handleCall}/>
        </ChatMediaWrapper>
    );
};

export default VideoCall;
