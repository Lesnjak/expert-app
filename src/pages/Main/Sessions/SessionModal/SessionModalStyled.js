import styled from "styled-components";
import {AvaName} from '../SessionsStyled'


const ModalWrapper = styled.div`
 position: fixed;
 top: 0;
 right:0;
 left: 0;
 bottom: 0;
 background-color: rgba(0,0,0,0.3);
 z-index: 100;
 display: flex;
 align-items: center;
 justify-content: center;
 overflow-y: auto;
 animation: ModalOpa 0.3s;
 @keyframes ModalOpa {
from{
 background-color: rgba(0,0,0,0);
}
to{
 background-color: rgba(0,0,0,0.3);
}
`
const ModalWrapperClose = styled.div`
position: absolute;
top: 0;left: 0;right: 0;bottom: 0;
z-index: 0;

`
const ModalWindow = styled.div`
background-color: #fff;
margin: auto;
box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04);
border-radius: 8px;
overflow: hidden;
width: 100%;
max-width: 569px;
position: relative;
animation: ModalWinScale 0.4s;
 @keyframes ModalWinScale {
from{
transform: scale(1);
}
50%{
transform: scale(0.95);
}
to{
transform: scale(1);
}

}
`
const ModalHeader = styled.header`
padding: 15px;
background-color: var(--main-bg-color);
color: #fff;
display: flex;
align-items: center;
justify-content: flex-start;
`
const ModalHeaderText = styled.p`
font-size: 15px;
margin-right: 10px;
`
const ModalLimit = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
font-size: 16px;
font-weight:800;
margin-left: auto;
`
const ModalBlueText = styled(AvaName)`
color: var(--main-bg-color);
margin-bottom: 10px;
`
const ModalBlackText = styled(AvaName)`
color: #1C2B48;
margin-bottom: 10px;
`
const ModalBody = styled.div`
padding: 15px;
margin-bottom: 10px;
`
const ModalComments = styled.p`
border-radius: 4px;
padding: 15px;
font-size: 14px;
color: #1C2B48;
background-color: #EFF4FE;

`
const ModalButtons = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 20px;

button{
width: 49%;
}

`



export {ModalWrapperClose,ModalButtons,ModalComments,ModalBlackText,ModalBody,ModalLimit,ModalBlueText,ModalWrapper,ModalWindow,ModalHeader,ModalHeaderText}
