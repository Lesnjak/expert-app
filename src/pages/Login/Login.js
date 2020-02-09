import React from 'react';
import MainBlock from "../../components/MainBlock/MainBlock";
import styled from "styled-components";
import {Col, Row} from "antd";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = ({location}) => {
    return (
        <StyledRow type="flex" justify="space-between">
            <StyledCol span={8}>
                <StyledTitle>Sign in</StyledTitle>
                <LoginForm/>
            </StyledCol>

            <RightSide>
                <MainBlock location={location}/>
            </RightSide>
        </StyledRow>
    );
};

const StyledTitle = styled.h1`
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 58px;
    color: #5A8DF4;
    margin-bottom: 0;
    text-shadow: 0 20px 25px rgba(90, 141, 244, 0.16), 0 10px 10px rgba(0, 0, 0, 0.04);
    
    @media(max-height: 800px) {
        font-size: 30px;
   }
`;

const StyledCol = styled(Col)`
  min-width: 637px;
  padding-top: 250px;
  padding-left: 64px;
  padding-right: 64px;
  
  @media(max-height: 800px) {
      padding-top: 169px;
  }
`;

const RightSide = styled.div`
  width: 100%;
`;

const StyledRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;

export default Login;