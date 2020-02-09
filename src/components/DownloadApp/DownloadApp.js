import React from 'react';
import styled from "styled-components";
import {ReactComponent as AppStore} from "../../assets/images/icons/appstore.svg";
import {ReactComponent as Logo} from "../../assets/images/icons/TopX.svg";
import {ReactComponent as GooglePlay} from "../../assets/images/icons/googleplay.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DownloadApp = () => {
    return (
        <Wrapper>
            <Logo/>
            <h1 style={{textAlign: "center", fontSize: "20px"}}>Open the website on your desktop</h1>
            <p style={{}}>or download our mobile application</p>

            <AppStore/>
            <GooglePlay/>
        </Wrapper>
    );
};

export default DownloadApp;