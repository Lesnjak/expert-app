import styled from "styled-components";
import audioBackground from 'assets/images/audio-background.png';
import ReactLoading from 'react-loading';


const ChatMediaWrapper = styled.div`  
max-width: 471px;
flex-shrink: 0;
width: 100%;
background-color: var(--main-bg-color);
background-image: url(${audioBackground});
-webkit-background-size: cover;background-size: cover;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow: hidden;
animation: audioShow 0.5s ;
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
`
const CallStatusWrapper = styled.div`
margin-top: -100px;

`
const ProfileWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const MediaProfile = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
width: 130px;
`
const MediaProfileImageBox = styled.div`
width: ${({bigSize})=>bigSize ? "166px":"88px"};
height: ${({bigSize})=>bigSize ? "166px":"88px"};
border-radius: 50%;
overflow: hidden;
position: relative;
`
const MediaProfileImage = styled.img`
width: 100%;height: 100%;
object-fit: cover;
`
const ProfileLoadText = styled.div`
position: absolute;
top: 0;right: 0;left: 0;bottom: 0;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0,0,0,0.5);
color: #fff;
font-size: 14px;
`
const MediaProfileName = styled.div`
font-size: 20px;
font-weight: 700;
color: #fff;
position: absolute;
top: 100%;
left: 50%;
transform: translateX(-50%);
max-width: 200px;
width: 100vw;
text-align: center;
margin-top: 10px;
`
const LoadAnimation = styled(ReactLoading)`
width: 75px !important;
height: 75px !important;

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
transform: rotate(90deg);
margin-right: 8px;
font-size: 12px;
}
`
const MediaNavPanel = styled.div`
padding: 40px 10px;
display: flex;
justify-content: center;
`
const MediaButton = styled.button` 
width: 56px;
height: 56px;
border-radius: 50%;
overflow: hidden;
display: flex; 
font-size: 25px;
align-items: center;
justify-content: center;
border:none;
color: ${({backGround}) => backGround ? "#fff" : "#1C2B48"};
background-color: ${({backGround}) => backGround ? backGround : "#fff"};
position: relative;
cursor: pointer;
margin: 0 12px;
transition: 0.3s;
&:hover{
box-shadow:inset 0 0 15px rgba(0,0,0,0.5);
}
&:before{
display: ${({notUsed})=>notUsed ? "block":"none"};

position: absolute;
content: "";
width: 3px;
outline: 2px solid ${({backGround}) => backGround ? backGround : "#fff"};
height: 35px;
background-color:${({backGround}) => backGround ? "#fff" : "#1C2B48"};
top: 50%;left: 50%;
transform: translate(-50%, -50%) rotate(-45deg);


}

`
const MediaButtonIcon = styled.i`

`
export {
    MediaNavPanel,
    MediaButton,
    MediaButtonIcon,
    ProfileLoadText,
    LoadAnimation,
    StatusTitle,
    CallStatusWrapper,
    ProfileWrapper,
    MediaProfile,
    MediaProfileImageBox,
    MediaProfileImage,
    MediaProfileName,
    ChatMediaHeaderTime,
    ChatMediaHeaderTitle,
    ChatMediaHeader,
    ChatMediaWrapper
}
