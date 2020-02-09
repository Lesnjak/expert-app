import styled from "styled-components";
import {Link, navigate} from "@reach/router";

const AvaDot = styled.div`

width: 8px;
height: 8px;
background-color:${({online}) => online ? "#6FCF97" : "#fff"} ;
border-radius: 50%;
margin-left:${({left})=>left?left:"auto"};
`

const AvaCheckBox = styled.div`
position: relative;
display: flex;                        
align-items: center;
cursor: pointer;
z-index: 3;
margin-left: auto;
.check-box-wrapper{
 ${
    ({status}) => status === 'pending' && `
      path{
        fill:#fff;
      }
    `
    }
 
}
.check-box-check{
position: absolute;
top: 2px;right: 0;
animation: opaChek 0.3s;
 ${
    ({status}) => status === 'pending' && `
      path{
        fill:#fff;
      }
    `
    };
 @keyframes opaChek{
 from{
 opacity: 0;
 }
 to{
 opacity: 1;
 }
 }
 
}
`
const AvaCheckBoxItem = styled.img`
  object-fit: cover;
  width: 100%;height: 100%;
`
const AvaCheckBoxItemCheck = styled.img`
  object-fit: cover;
  width: 100%;height: 100%;
`
const AvaName = styled.p`
position: relative;
z-index: 3;
  color:${({status}) => status === 'daily' ? "#5A8DF4" : "#fff"} ;
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
`
const AvaWrapper = styled.div`
width: 48px;
height: 48px;
border-radius: 50%;
overflow: hidden;
position: relative;
z-index: 3;
margin-right: 10px;
flex-shrink: 0;
`
const AvaIcon = styled.img`
object-fit: cover;
width: 100%;
height: 100%;
 
`
const TitleRow = styled.div`
display: flex;
align-items: center;
padding: 9px 0;
margin-top: 10px;
&>div{
flex-grow: 1;
}

`
const SessionRow = styled.div`
cursor: pointer;
min-height: 72px;
padding-right: 20px;
display: flex;
background: #FFFFFF;
border: 1px solid #F3F3F3;
box-sizing: border-box;
box-shadow: 0px 6px 25px rgba(32, 32, 35, 0.05), 0px 3px 10px rgba(32, 32, 35, 0.02);
border-radius: 4px;
overflow: hidden;
margin-bottom: 8px;
&>div{
flex-grow: 1;
}
`
const ColStatus = styled.div`
max-width: 247px;
padding:0 20px;
display: flex;
align-items: center;
width: 100%;


`
const ColAvatar = styled.div`
display: flex;
padding: 12px 20px;
background-color: #5A8DF4;
border: none;
max-width: 247px;
flex-shrink: 0;

${
    ({status}) => status === 'daily' && `
background-color: #fff;


    `
    };

align-items: center;
position: relative;
justify-content: flex-start;
overflow: hidden;
z-index: 0;


${({status}) =>
    status === "daily" && `
        &:before{
            position: absolute;
            content: '';
            top: 0;left: 0;bottom: 0;right: 0;
            background: rgb(90,141,244);
            background: linear-gradient(90deg, rgba(90,141,244,1) 0%, rgba(243,243,243,1) 100%);
            z-index: 0;
   
        }
    &:after{
            position: absolute;
            content: '';
            top: 1px;left: 1px;bottom: 1px;right: 0;
            background: #fff;
            z-index: 0;`
    }
${({status}) =>
    status === "real" &&
    `        &:before{
            position: absolute;
            content: '';
            width: 200px;
            height: 200px;
            border-radius: 50%;
            margin-left: -30px;
            top: 50%;
            left:0;
            transform: translate(-100%, -50%);
            background-color: rgba(255,255,255,0.5);
            animation: zoomCircleSmall 3s infinite;
        }
    &:after{
            position: absolute;
            content: '';
            width: 200px;
            height: 200px;
            border-radius: 50%;
            top: 50%;
            left:0;
            transition: 1s;
            transform: translate(-100%, -50%);
            background-color: rgba(255,255,255,0.3);
            animation: zoomCircle 3s infinite;`
    }
   
};
    
@keyframes zoomCircle{
 from{
 transform: translate(-100%, -50%);
background-color: rgba(255,255,255,1);
 }
 85%{
  transform: translate(0%, -50%);
background-color: rgba(255,255,255,0);
 }
 to{
 transform: translate(0%, -50%);
background-color: rgba(255,255,255,0);
 }
}
@keyframes zoomCircleSmall{
 from{
 transform: translate(-100%, -50%);
background-color: rgba(255,255,255,1);
 }

 to{
 transform: translate(0%, -50%);
background-color: rgba(255,255,255,0);
 }
}

`
const Title = styled.h2`
color: #1C2B48;
font-size: 28px;
font-weight: 800;
margin-bottom: 23px;

`
const TitleBlue = styled(Title)`
color: #5A8DF4;
margin-bottom: 0;
`
const StyledRow = styled.div`
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 50px;
  padding-left: 338px;
  @media (max-width:1500px ){
  padding: 20px;
   padding-left: 240px;
   

}`
const StyledChatRow = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 50px;
  padding-left: 338px;
  @media (max-width:1500px ){
  padding: 20px;
   padding-left: 240px;
   

}
  
`;
const ColQuestion = styled.div`
max-width: 267px;
display: flex;
align-items: center;
padding: 0 30px;
@media (max-width:1600px ){
max-width: 150px;
padding: 0 15px;

}

`
const QuestionText = styled.p`
font-size: 16px;
color: #1C2B48;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
margin: 0;
`
const ColCategory = styled.div`
max-width: 194px;
display: flex;
align-items: center;

`
const CategoryTag = styled.span`
 display: block;
 border-radius: 4px;
 color: #5A8DF4;
 font-size: 14px;
 background-color: #DEE8FD;
 padding: 0 8px;
 line-height: 28px;
 font-weight: 600;
`
const ColLanguage = styled.div`
max-width: 147px;
display: flex;
align-items: center;
`
const LanguageTag = styled.span`
 display: block;
 border-radius: 4px;
 font-size: 14px;
 background-color: #FFF;
 padding: 0 8px;
 color: #1C2B48;
 line-height: 26px;
 border: 1px solid #ECECEC;
`
const ColDate = styled.div`
max-width: 196px;
flex-direction: column;
display: flex;
justify-content: center;
`
const DateText = styled.p`
font-size: 14px; 
line-height: 28px;
color: #5A8DF4;
`
const ColLength = styled.div`
max-width: 165px;
display: flex;
align-items: center;
`
const LengthText = styled.div`
color: #5A8DF4;
 font-weight: 600;
 font-size: 14px;
`
const ColTotal = styled.div`
max-width: 81px;
display: flex;
align-items: center;
`
const ColButtons = styled.div`
max-width: 174px;
min-width: 174px;
margin-right: auto;
display: flex;
align-items: center;
`
const ButtonSingle = styled(Link)`
border: none;
width: 100%;
height: 40px;
background: #5A8DF4;
box-shadow: 0px 10px 16px rgba(90, 141, 244, 0.16), 0px 4px 6px rgba(0, 0, 0, 0.06);
border-radius: 4px;
align-items: center;
justify-content: center;
display: flex;
color: #fff;
font-weight: 600;
font-size: 15px;
transition: 0.3s;
cursor: pointer;
&:hover{
    background-color: #87b3ff;
    border-color: #87b3ff;
    color:#fff!important;
}
`
const ButtonGroup = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
`
const ButtonAccept = styled.button`
min-width: 80px;
border: none;
height: 40px;
background: #5A8DF4;
box-shadow: 0px 10px 16px rgba(90, 141, 244, 0.16), 0px 4px 6px rgba(0, 0, 0, 0.06);
border-radius: 4px;
align-items: center;
justify-content: center;
display: flex;
color: #fff;
font-weight: 600;
font-size: 15px;
transition: 0.3s;
cursor: pointer;
&:hover{
    background-color: #87b3ff;
    border-color: #87b3ff;
}

`
const ButtonDecline = styled.button`
min-width: 80px;
border: none;
height: 40px;
background: #fff;
border-radius: 4px;
align-items: center;
justify-content: center;
display: flex;
color: #5A8DF4;
font-weight: 600;
font-size: 15px;
cursor: pointer;
transition: 0.3s;
&:hover{
    background-color: #DEE8FD;
}

`
const MainTitle = styled.span`
color: #777777;
text-transform: uppercase;
font-size: 14px;
font-weight: 700;

`
const SessionBox = styled.div`
margin-bottom: 57px;

`
const SessionNavPanel = styled.div`
display: flex;
align-items: center;
margin-left: 15px;
`
const SessionNavPanelButton = styled.button`
border: none;
margin: 0 10px;
display: flex;
align-items: center;
justify-content: center;
width: 32px;
height: 32px;
border-radius: 4px;
background-color: #DAE5FB;
transition: 0.3s;
svg{
path{
transition: 0.3s;
}
}
&:hover{
background-color: #5A8DF4;
svg{
path{
fill: #fff;

}
}
}
`
const SessionNavArrowWrapper = styled.div`
display: flex;
align-items: center;
`
const SessionNavArrowText = styled.span`
font-weight: 500;
font-size: 15px;
color: #5A8DF4;
`
const SessionNavArrowLink = styled.a`
font-weight: 500;
font-size: 15px;
color: #5A8DF4;
display: flex;
align-items: center;
&:hover{
& span{
text-decoration: none;
}
& svg{
    path{
    fill: #fff;
    }
}
& button{
background-color: #5A8DF4;
}

}
`
const TitleNavWrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`

export {
    TitleNavWrapper,
    SessionNavPanel,
    SessionNavPanelButton,
    SessionNavArrowWrapper,
    SessionNavArrowText,
    SessionNavArrowLink,
    AvaCheckBoxItem,
    AvaCheckBox,
    SessionBox,
    TitleRow,
    ColStatus,
    MainTitle,
    ColButtons,
    ButtonSingle,
    ButtonAccept,
    ButtonGroup,
    ButtonDecline,
    ColTotal,
    ColLength,
    LengthText,
    ColDate,
    DateText,
    ColLanguage,
    LanguageTag,
    CategoryTag,
    ColCategory,
    QuestionText,
    ColQuestion,
    StyledRow,
    TitleBlue,
    Title,
    ColAvatar,
    SessionRow,
    AvaIcon,
    AvaWrapper,
    AvaName,
    AvaDot,
    StyledChatRow
}
