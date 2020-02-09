import styled from "styled-components";
import videoBackground from 'assets/images/videoBackGround.png';
import callWindow from 'assets/images/callWindow.png';

const ChatMediaWrapper = styled.div`  
width: 471px;
flex-shrink: 0;
background-color: var(--main-bg-color);
background-image: url(${videoBackground});
-webkit-background-size: cover;background-size: cover;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow: hidden;
animation: 0.3s audioShow;
position: relative;
border-radius: 0 4px 4px 0;
@keyframes audioShow{
from{
max-width: 0;
}
to{
max-width: 471px;
}
}
`
const ChatMediaHeader = styled.div`
color: #fff;
text-align: center;
padding: 20px;
`
const ChatMediaHeaderTitle = styled.p`
font-size: 24px;
font-weight: 700;
`
const ChatMediaHeaderTime = styled.p`
font-size: 14px;
margin-bottom: 25px;
`

const StatusTitle = styled.p`
text-align: center;
font-size: 17px;
font-weight: 700;
color: #fff;
margin-bottom: 50px;
display: flex;
align-items: center;
justify-content: center;
i{
margin-right: 8px;
font-size: 14px;
}
`
const CallVideoWindow = styled.div`
width: 120px;
height: 180px;
border-radius: 8px;
background-image: url(${callWindow});
-webkit-background-size: cover;background-size: cover;
position: absolute;
right: 15px;bottom: 150px;
`

export {
    CallVideoWindow,
    StatusTitle,
    ChatMediaHeaderTime,
    ChatMediaHeaderTitle,
    ChatMediaHeader,
    ChatMediaWrapper
}
