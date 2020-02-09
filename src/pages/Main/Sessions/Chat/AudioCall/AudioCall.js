import React, {useState, useEffect} from 'react';
import Avatar from 'assets/images/avatar.png';
import AvatarClient from 'assets/images/ava-client.png';
import {ReactComponent as Microphone} from 'assets/images/icons/microphone.svg';
import '../../../../../fontAwesome/fontAwesome.css'
import {
    MediaNavPanel,
    MediaButton,
    MediaButtonIcon,
    LoadAnimation,
    ProfileLoadText,
    ChatMediaWrapper,
    StatusTitle,
    ChatMediaHeaderTime,
    ChatMediaHeaderTitle,
    ChatMediaHeader,
    CallStatusWrapper,
    ProfileWrapper,
    MediaProfile,
    MediaProfileImageBox,
    MediaProfileImage,
    MediaProfileName,
} from './AudioCallStyled'
import ChatNavPanel from "../ChatNavPanel/ChatNavPanel";

const AudioCall = ({handleCall}) => {
    const [isCall, setIsCall] = useState(false);
    const timeOut = setTimeout(()=>{
        setIsCall(true)
    },3000)
    const handleIsCall = () => {
    }
    useEffect(()=> {
        return () => clearTimeout(timeOut)
    })
    return (
        <ChatMediaWrapper>
            <ChatMediaHeader>
                <ChatMediaHeaderTitle>
                    Session starting
                </ChatMediaHeaderTitle>
                <ChatMediaHeaderTime>
                    Time remaining: 00:49:45
                </ChatMediaHeaderTime>
            </ChatMediaHeader>
            <CallStatusWrapper>
                <StatusTitle><MediaButtonIcon className="fa fa-phone"/> Audio Call</StatusTitle>
                <ProfileWrapper>
                    {
                        !isCall && (
                            <>
                            <MediaProfile>
                                <MediaProfileImageBox >
                                    <MediaProfileImage src={Avatar} alt='avatar'/>
                                </MediaProfileImageBox>
                                <MediaProfileName>You</MediaProfileName>
                            </MediaProfile>
                            <LoadAnimation type='bubbles' color="#fff"/>
                            </>
                        )
                    }


                    <MediaProfile>
                        <MediaProfileImageBox bigSize = {isCall}>
                            <MediaProfileImage  src={AvatarClient} alt='avatar'/>
                            {
                                !isCall && <ProfileLoadText>Calling...</ProfileLoadText>
                            }
                        </MediaProfileImageBox>
                        <MediaProfileName>Ted Nguyen</MediaProfileName>
                    </MediaProfile>
                </ProfileWrapper>
            </CallStatusWrapper>
            <ChatNavPanel handleCall={handleCall}/>
        </ChatMediaWrapper>
    );
};

export default AudioCall;
