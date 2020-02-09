import React from 'react';
import styled from "styled-components";
import Follow from "./Follow/Follow";
import Header from "./Header/Header";
import bg from '../../assets/images/background-image.png'
import {Button, Icon} from "antd";
import {Link} from "@reach/router";

const MainBlock = ({location}) => {
    return (
        <Wrapper>
          {/*todo Temporarily remove at the request of the client*/}
            {/*<Follow/>*/}

            <Header/>
            {location && location.pathname === "/login" && (
                <SignUpButton size="large">
                    <Link to="/registration"><Icon type="left"/>Sign Up</Link>
                </SignUpButton>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
      box-sizing: border-box;
      padding-top: 296px;
      padding-left: 120px;
      min-height: 100vh;
      height: 100%;
      background-color: #5A8DF4;
      display: flex;
      flex-direction: column;
      justify-content: start;
      background-image: url(${bg});
      background-size: cover;
      
      @media(max-width: 1380px) {
        padding-left: 30px;
      }
      
      @media(max-height: 800px) {
        padding-top: 218px;
      }
`;

const SignUpButton = styled(Button)`
      background-color: #fff;
      color: #5A8DF4;
      width: 152px;
      margin-top: 128px;
      
      @media(max-height: 1200px) {
          margin-top: 87px;
      }
      
      @media(max-height: 900px) {
          margin-top: 142px;
          height: 40px;
      }
      
       @media(max-height: 800px) {
          margin-top: 85px;
      }
`;

export default MainBlock;
