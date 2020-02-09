import styled from "styled-components";
import TextareaAutosize from 'react-autosize-textarea';
import ScrollToBottom from 'react-scroll-to-bottom';
import DownArrow from 'assets/images/icons/down-arrow.svg'

const ChatWrapper = styled.div`
    background: #FFFFFF;
    border: 1px solid #F3F3F3;
    box-sizing: border-box;
    box-shadow: 4px 12px 25px rgba(32, 32, 35, 0.05), 4px 6px 10px rgba(32, 32, 35, 0.02);
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    border-radius: 4px;
`
const ChatWrapperDouble = styled.div`
    display: flex;
    flex-grow: 1;
    border-radius: 4px;
`
const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #F3F3F3;
`
const ChatProfile = styled.div`
    display: flex;
    align-items: center;
`
const ChatAvatar = styled.div`
    width: 40px;height: 40px;
    overflow: hidden;
    border-radius: 50%;
    flex-shrink: 0;
`
const ChatImage = styled.img`
    width: 100%;height: 100%;
    object-fit: cover;
`
const ChatNameWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left: 10px;
`
const ChatName = styled.div`
    font-size: 13px;
    font-weight: 700;
    color: #1C2B48;
    display: flex;
    align-items: center;
`
const ChatStatus = styled.span`
    font-size: 12px;
    color: #778091;
`
const ChatButtons = styled.div`
   display: flex;
   align-items: center;
   opacity: 1;
   transition: 0.3s;
   &.buttons-hide{
   opacity: 0;
   animation:buttonsShow 0.3s ;
   }
   @keyframes buttonsShow {
   from{
   opacity: 1;
   }
   60%{
   opacity: 1;
   }
   }
`
const ChatVideoButton = styled.button`
   border: none;
   display: flex;
   align-items: center;
   height: 40px;
   background: var(--main-bg-color);
   border-radius: 4px;
   padding: 0 15px;
   font-weight: 600;
   font-size: 15px;
   color: #fff;
   cursor: pointer;
   transition: 0.3s;
   margin-left: 16px;
   svg{
   margin-left: 10px;
   }
   &:hover{
       background-color: #87b3ff;
   }
`
const ChatAudioButton = styled.button`
    border: none;
       margin-left: 16px;
    width: 40px;
    height: 40px;
    background-color: var(--blue-light-color) ;
    border-radius: 50%;
    display: flex;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    justify-content: center;
       svg{
   path{
    transition: 0.3s;
   }
   }
       &:hover{
       background-color: #87b3ff;
   svg{
   path{
   fill:#fff
   }
   } 
   }
`
const ChatBody = styled(ScrollToBottom)`
  flex-grow: 1;
  height: 22vh;
  .scroll-top{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  left: 32px;
  transition: 0.3s;
  //position: relative;
  &:before{
  top: 0;right: 0;left: 0;bottom: 0;
  content: "";
  position: absolute;
  background-image: url(${DownArrow});
background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  }
  }
  &>div{
    padding: 40px 32px 0;
    display: flex;
  flex-direction: column;
    &>div:last-child{
  margin-bottom: 0;
  };
  }
  min-height: 300px;
`
const ChatClient = styled.div`
    display: flex;
    align-items: flex-start;
    margin-right: auto;
    margin-bottom: 40px;
`
const ChatDefendant = styled.div`
    display: flex;
    align-items: flex-start;
    margin-left: auto;
    margin-bottom: 40px;
    
`
const ChatClientMessage = styled.div`
    border-radius: 0px 8px 8px 8px;
    color: var(--text-dark-color);
    background-color: var(--blue-light-color);
    margin-left: 6px;
    padding:10px 15px 5px;
    font-size: 14px;
    line-height: 24px;
    max-width: 866px;
    white-space: pre-line;
`
const ChatClientMessageTime = styled.div`
   color: #868FA3;
   text-align: right;
   padding-top: 10px;
   font-size: 12px;
`
const ChatDefendantMessageTime = styled.div`
   color: #fff;
   text-align: left;
   padding-top: 10px;
   font-size: 12px;
   opacity: 0.8;
`

const ChatDefendantMessage = styled.div`
    border-radius: 8px 0px 8px 8px;
    background-color: var(--main-bg-color);
    font-size: 14px;
    color: #fff;
    margin-right: 6px;
    padding:10px 15px 5px;
    max-width: 866px;
    white-space: pre-line;
`
const ChatSend = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 35px;
`
const ChatTextArea = styled(TextareaAutosize)`
    resize: none;
    border: 1px solid rgba(119, 119, 119, 0.3);
    border-radius: 4px;
    width: 100%;
    padding: 15px;
    margin-bottom: 15px;
::-webkit-input-placeholder { /* Edge */
  color: #A4AAB6;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #A4AAB6;
}

::placeholder {
  color: #A4AAB6;
}
`
const ChatSendButtons = styled.div`
display: flex;
align-items: center;
font-size: 14px;
`
const ChatFileButton = styled.button`
    border: none;
    height: 40px;
    background-color: var(--blue-light-color) ;
    border-radius: 4px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    transition: 0.3s;
    margin-left: 16px;
    cursor: pointer;
    color: var(--main-bg-color);
    justify-content: center;
    
       svg{
       margin-left: 10px;
   path{
    transition: 0.3s;
   }
   }
       &:hover{
       color: #fff;
       background-color: #87b3ff;
   svg{
   path{
   fill:#fff
   }
   } 
   }
`
const ChatToltip = styled.div`
position: relative;
`
const ChatToltipMessage = styled.div`
position: absolute;
`



export {
    ChatWrapperDouble,
    ChatToltipMessage,
    ChatToltip,
    ChatSend,
    ChatTextArea,
    ChatSendButtons,
    ChatFileButton,
    ChatDefendantMessageTime,
    ChatClientMessageTime,
    ChatBody,
    ChatClient,
    ChatDefendant,
    ChatClientMessage,
    ChatDefendantMessage,
    ChatButtons,
    ChatVideoButton,
    ChatAudioButton,
    ChatWrapper,
    ChatHeader,
    ChatProfile,
    ChatAvatar,
    ChatImage,
    ChatNameWrapper,
    ChatName,
    ChatStatus
}
