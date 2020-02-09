import React, {useState, useEffect} from 'react';
import {StyledChatRow, Title} from '../SessionsStyled';
import Messages from "./Messages";
import ToolTip from 'components/ToolTip/ToolTip';
import {connect} from 'react-redux';
import {getMessages} from 'store/chat/actions';
import ChatAva from 'assets/images/chatAvatar.png';
import {ReactComponent as VideoButton} from 'assets/images/icons/videoButton.svg';
import {ReactComponent as AudioButton} from 'assets/images/icons/audioButton.svg';
import {ReactComponent as SendButton} from 'assets/images/icons/send.svg';
import {ReactComponent as FileButton} from 'assets/images/icons/file.svg';
import {AvaDot} from '../SessionsStyled';
import Dropzone from 'react-dropzone';
import AudioCall from "./AudioCall/AudioCall";
import VideoCall from "./VideoCall/VideoCall";
import {
    ChatWrapper,
    ChatHeader,
    ChatProfile,
    ChatAvatar,
    ChatImage,
    ChatNameWrapper,
    ChatName,
    ChatStatus,
    ChatButtons,
    ChatVideoButton,
    ChatAudioButton,
    ChatBody,
    ChatSend,
    ChatTextArea,
    ChatSendButtons,
    ChatFileButton,
    ChatWrapperDouble
} from './ChatStyled'


const Chat = ({getMessages, chat}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        getMessages()
    }, []);
    useEffect(() => {
        setMessages(chat)
    }, [chat]);
    const [validMessage, setValidMessage] = useState(false);
    const [isCall, setIsCall] = useState({
        audio: false,
        video: false
    });
    const [text, setText] = useState('');
    const handleText = (e) => {
        const textFealdValue = e.target.value || "";
        setText(textFealdValue)
    };
    const handleSendMessage = () => {
        const currentTime = new Date().toLocaleTimeString();
        if (text.trim()) {
            console.log(text.trim());
            setValidMessage(false)
            setMessages([
                ...messages,
                {
                    person: "defendant",
                    message: text,
                    time: currentTime
                },
            ]);

        } else {
            setValidMessage(true)
        }
        setText('')
    }
    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSendMessage()
        }
    }
    const handleCall = (type) => () => {
        setIsCall({
            ...isCall,
            [type]: !isCall[type]
        })
    }
    const onCloseOutside = () => {
        setValidMessage(false)
    }

    return (
        <StyledChatRow>
            <Title>Chat</Title>
            <ChatWrapperDouble>
                <ChatWrapper>
                    <ChatHeader>
                        <ChatProfile>
                            <ChatAvatar>
                                <ChatImage src={ChatAva} alt='image'/>
                            </ChatAvatar>
                            <ChatNameWrapper>
                                <ChatName>Ted Nguyen <AvaDot left='8px' online={true}/></ChatName>
                                <ChatStatus>Active Now</ChatStatus>
                            </ChatNameWrapper>
                        </ChatProfile>
                        <ChatButtons className={(isCall.audio || isCall.video) && "buttons-hide"}>
                            <ChatVideoButton disabled={isCall.audio || isCall.video} onClick={handleCall('video')}>Start
                                a session with
                                video call <VideoButton/></ChatVideoButton>
                            <ChatAudioButton disabled={isCall.audio || isCall.video}
                                             onClick={handleCall('audio')}><AudioButton/></ChatAudioButton>
                        </ChatButtons>
                    </ChatHeader>
                    <ChatBody animating={false} atBottom={true} followButtonClassName='scroll-top'>
                        {
                            messages.map((message, idx) => <Messages key={idx} message={message}/>)
                        }
                    </ChatBody>
                    <ChatSend>
                        <ChatTextArea value={text} onKeyDown={onEnterPress} onChange={handleText}
                                      placeholder='Type a message...'/>
                        <ChatSendButtons>
                            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <ChatFileButton>Attach files <FileButton/></ChatFileButton>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>

                            <ToolTip
                                text="To send a message, you must enter text or upload a file"
                                isOpen={validMessage}
                                onCloseOutside={onCloseOutside}

                            >
                                <ChatVideoButton onClick={handleSendMessage}>Send
                                    message <SendButton/></ChatVideoButton>
                            </ToolTip>
                        </ChatSendButtons>
                    </ChatSend>
                </ChatWrapper>
                {isCall.audio && <AudioCall handleCall={handleCall('audio')}/>}
                {isCall.video && <VideoCall handleCall={handleCall('video')}/>}

            </ChatWrapperDouble>
        </StyledChatRow>
    );
};
const mapStateToProps = ({chat}) => {
    return {
        chat
    }
}
export default connect(mapStateToProps, {getMessages})(Chat);
