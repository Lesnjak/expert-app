import React, {useState} from 'react';
import {navigate} from '@reach/router'
import {useDispatch} from "react-redux";
import {Button, Col, Icon, Row, Tooltip} from "antd";
import {Field, Formik} from "formik";
import styled, {css} from "styled-components";
import {addData} from "../../store/registration/actions";
import api from "../../api";

const LoginForm = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{email: "", pass: ""}}
            onSubmit={(values) => {
                const data = {
                    email: values.email,
                    pass: values.pass
                };

                api.login(data).then(res => {
                    const user = res.data.user;
                    setError("");
                    dispatch(addData({
                        data: {
                            nickname: user.nickname,
                            email: user.email,
                            pass: user.pass,
                            timezone: user.timezone,
                            country: user.country,
                        },
                        avatar: user.avatar,
                    }));
                    navigate("/main/sessions");
                }).catch(err => setError("Email or password are invalid"))
            }}
            render={({values, errors, submitForm}) => (
                <>
                    <FieldsWrapper>
                        <div>
                            <StyledCol span={6}>
                                <Label>Email</Label>
                            </StyledCol>
                            <StyledTooltip
                                placement={"top"}
                                title={error}
                                visible={!!error}
                            >
                                <StyledCol span={18}>
                                    <StyledField type="email" name="email" required/>
                                </StyledCol>
                            </StyledTooltip>
                        </div>


                        <div>
                            <StyledCol span={6}>
                                <Label>Password</Label>
                            </StyledCol>

                            <StyledCol span={18}>
                                <StyledField
                                    type="password"
                                    name="pass"
                                    required
                                />
                            </StyledCol>
                        </div>
                    </FieldsWrapper>

                    <StyledCol span={24}>
                        <Row type="flex" justify="end" style={{width: "100%", paddingTop: 20}}>
                            <Col span={18} offset={6}>
                                <ForgotPasswordLink type="link" size="large">Forgot password?</ForgotPasswordLink>

                                <StyledContinueButton
                                    type="primary"
                                    size="large"
                                    disabled={!(values.email && values.pass)}
                                    htmlType="submit"
                                    onClick={() => submitForm()}
                                >
                                    Login
                                    <Icon type="right"/>
                                </StyledContinueButton>
                            </Col>
                        </Row>
                    </StyledCol>
                </>
            )}
        />
    );
};

const ForgotPasswordLink = styled(Button)`
  text-decoration: underline !important;
  font-size: 15px !important;
  padding: 0 !important;
  
  span {
    text-decoration: underline;  
  }
  .ant-btn-lg {
    padding: 0 !important;
  }
`;

const StyledTooltip = styled(Tooltip)`
  .ant-tooltip-arrow::before {
    background-color: #5A8DF4 !important;
  }

  .ant-tooltip-inner {
    background-color: rgba(255, 255, 255, 0.90) !important;
    color: black !important;
  }
`;

const FontSize = css`
  font-size: 15px;
  
  @media(max-height: 900px) {
    font-size: 13px;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const FieldsWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  
  @media(max-height: 900px) {
    margin-top: 50px;
  }
`;

const Label = styled.p` 
  font-weight: 600;
  ${FontSize};
  color: #424242;
  margin-bottom: 0;
  line-height: 35px;
  
   @media(max-height: 900px) {
      line-height: 25px;
   }
`;

const StyledField = styled(Field)`
   ${FontSize};
   width: 100%;
   
   height: 35px;
   border-bottom: 1px solid rgba(119, 119, 119, 0.3); // 333333 30%
   border-top-style: none;
   border-right-style: none;
   border-left-style: none;
   position:relative;
   
   &:first-child {
    padding-right: 50px;
   }
   
   &:focus {
   outline: none;
   }
   
   @media(max-height: 900px) {
      height: 25px;
   }
`;

const stepsButtons = css`
   width: 152px;
   box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   
   @media(max-height: 900px) {
    height: 40px !important;
   }
`;

const StyledContinueButton = styled(Button)`
   ${stepsButtons};
   float: right;
   
   @media(max-height: 900px) {
      height: 40px !important;
      font-size: 16px;
   }
`;


export default LoginForm;