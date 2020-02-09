import React from 'react';
import {
    ChatAvatar, ChatBody,
    ChatClient,
    ChatClientMessage,
    ChatClientMessageTime,
    ChatDefendant,
    ChatDefendantMessage, ChatDefendantMessageTime,
    ChatImage
} from "./ChatStyled";
import ChatAva from "../../../../assets/images/chatAvatar.png";
import Avatar from "../../../../assets/images/avatar.png";

const Messages = ({message}) => {

    
    if(message.person === 'client')
    return (
        <ChatClient >
            <ChatAvatar>
                <ChatImage src={ChatAva} alt='image'/>
            </ChatAvatar>
            <ChatClientMessage>
                {message.message}
                <ChatClientMessageTime>{message.time}</ChatClientMessageTime>
            </ChatClientMessage>
        </ChatClient>
    );
    else if(message.person === 'defendant')
        return (
            <ChatDefendant >
                <ChatDefendantMessage>
                    {message.message}
                    <ChatDefendantMessageTime>{message.time}</ChatDefendantMessageTime>
                </ChatDefendantMessage>
                <ChatAvatar>
                    <ChatImage src={Avatar} alt='image'/>
                </ChatAvatar>
            </ChatDefendant>
        )
    else return null
};

export default Messages;
