import React, {useEffect} from 'react';
import {Button, Col, Icon} from "antd";
import styled from "styled-components";
import {Link} from "@reach/router";
import {clearData} from "../../../store/registration/actions";
import {useDispatch} from "react-redux";

const AccountCreated = () => {
    const dispatch = useDispatch();

    dispatch(clearData());
    useEffect(() => {
    }, []);

    return (
        <StyledRow type="flex">
            <Header>Application received</Header>
            {/*<Header>Account Created!</Header>*/}
            {/*<Paragraph>Do not forget to confirm your email address.</Paragraph>*/}
            <Paragraph>
                {/*Application received <br/>*/}
                Your application is now being reviewed by one of our Account Advisors.
                If your application is approved, we will contact you with next steps.
            </Paragraph>

            <ButtonContainer span={24}>
                <Link to="/login">
                    <StyledButton type="primary" size="large"><Icon type="left"/>
                        Go to Login
                    </StyledButton>
                </Link>
            </ButtonContainer>
        </StyledRow>
    );
};

const StyledRow = styled.div`
  height: 65vh;
  display: flex;
  flex-direction: column;
  padding-top: 130px;
  
  @media(max-height: 800px) {
      padding-top: 130px;
  }
`;

const Header = styled.h3`
  color: #5A8DF4;
  font-size: 28px;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 700;
  
  @media(max-height: 900px) {
      font-size: 23px;
  }
`;

const Paragraph = styled.h3`
  color: #333333;
  font-size: 18px;
  font-weight: 300;
  margin-top: 20px;
`;

const ButtonContainer = styled(Col)`
  padding-top: 43px;
`;

const StyledButton = styled(Button)`
  box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
`;

export default AccountCreated;