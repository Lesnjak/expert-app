import React, {useState} from 'react';
import {connect, Field} from "formik"
import styled, {css} from "styled-components";
import {Button, Col, Icon, Row, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addData} from "../../../store/registration/actions";
import {Link, navigate} from "@reach/router";
import api from "../../../api";
import {generateName} from "../../../utils/utils";

const isEmailExists = async (email, token) => {
    return api.checkEmail(email, token).then((response) => {
        return response.data
    }).catch(() => {
        api.anonymRegister(generateName(20)).then((response) => {
            api.checkEmail(email, response.data.token).then((response) => {
                return response.data
            })
        })
    });
};

const BasicInformation = ({formik}) => {
    const [showPassword, setShowPassword] = useState(false);

    const {anonymousToken} = useSelector(state => state.registration);
    const dispatch = useDispatch();

    const toNextStep = async () => {
        // formik.validateForm().then(async (errors) => {
        const errors = await formik.validateForm()
        console.log(errors);

        if ((!errors.nickname && !errors.pass && !errors.email)) {
            const emailExists = await isEmailExists(formik.values.email, anonymousToken);
            if (!emailExists) {
                const data = {
                    data: formik.values,
                    currentPage: "/upload-photo",
                    currentStep: 1
                };

                dispatch(addData(data));
                navigate("/registration/upload-photo");

                formik.resetForm()
            } else {
                formik.setFieldError("email", "email already exists")
            }
        }

    };

    return (
        <StyledRow>
            <FieldsWrapper>
                <div>
                    <StyledCol span={6}>
                        <Label>Full Name*</Label>
                    </StyledCol>

                    <StyledCol span={18}>
                        <StyledTooltip
                            placement={"right"}
                            title={formik.errors.nickname}
                            visible={!!formik.errors.nickname && !formik.touched.pass}
                        >
                            <StyledField type="text" name="nickname" required/>
                        </StyledTooltip>

                    </StyledCol>
                </div>

                <div>
                    <StyledCol span={6}>
                        <Label>Email*</Label>
                    </StyledCol>

                    <StyledCol span={18}>
                        <StyledTooltip
                            placement={"right"}
                            title={formik.errors.email}
                            visible={!!formik.errors.email && !formik.touched.pass}
                        >
                            <StyledField type="email" name="email" required/>
                        </StyledTooltip>
                    </StyledCol>
                </div>

                <div>
                    <StyledCol span={6}>
                        <Label>Password*</Label>
                    </StyledCol>

                    <StyledCol span={18}>
                        <StyledTooltip
                            placement={"right"}
                            title={formik.errors.pass}
                            visible={!!formik.errors.pass && !formik.touched.pass}
                        >
                            <StyledField
                                type={showPassword ? "text" : "password"}
                                name="pass"
                                required
                            />
                        </StyledTooltip>
                        <StyledIcon type="eye" onClick={() => setShowPassword(!showPassword)}/>
                    </StyledCol>
                </div>
            </FieldsWrapper>
            <StyledCol span={24}>
                <Row type="flex" justify="end" style={{width: "100%", paddingTop: 50}}>
                    <Col span={24}>
                        <StyledContinueButton
                            type="primary"
                            size="large"
                            onClick={toNextStep}
                            disabled={!(formik.values.pass && formik.values.email && formik.values.nickname)}
                        >
                            Continue
                            <Icon type="right"/>
                        </StyledContinueButton>
                    </Col>
                    <Col span={24}>
                        <TermsOfService>
                            By joining, you agree to TopX’s &nbsp;
                            <a href="https://topx.team/terms-of-use-expert.html" rel="noopener noreferrer"
                               target="_blank">Terms of Service</a>
                        </TermsOfService>
                    </Col>
                </Row>
            </StyledCol>


            <SignInWrapper span={24}>
                <SignInParagraph>
                    Already have an account?
                    <Link to="/login">
                        <StyledButton type="link" to="/login">Sign In</StyledButton>
                    </Link>
                </SignInParagraph>
            </SignInWrapper>
            {/*<SocialButtonsWrapper span={24}>*/}
            {/*    <StyledSocialButton>*/}
            {/*        <Icon type="google" style={{fontSize: 20}}/>*/}
            {/*        Google Login*/}
            {/*    </StyledSocialButton>*/}
            {/*    <StyledSocialButton>*/}
            {/*        <Icon type="facebook"/>*/}
            {/*        Facebook Login*/}
            {/*    </StyledSocialButton>*/}
            {/*</SocialButtonsWrapper>*/}
        </StyledRow>
    );
};

const StyledTooltip = styled(Tooltip)`
  .ant-tooltip-arrow::before {
    background-color: #5A8DF4 !important;
  }

  .ant-tooltip-inner {
    background-color: rgba(255, 255, 255, 0.90) !important;
    color: black !important;
  }
`;

const SignInWrapper = styled(Col)`
  padding-top: 175px;
  
  @media(min-height: 1199px) {
      padding-top: 330px;
  }
  
  @media(max-height: 800px) {
      padding-top: 115px;
  }
`;

const SignInParagraph = styled.p`
  margin-bottom: 0;
  font-size: 15px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  font-size: 15px;
  text-align: center;
  font-weight:bold;
`;

const FontSize = css`
  font-size: 15px;
  
  @media(max-height: 900px) {
    font-size: 13px;
  }
`;

const StyledRow = styled(Row)` 
  height: 65vh;
  font-weight: 600;
  font-size: 15px;
  color: #424242;
  padding-top: 75px;

  @media(max-height: 800px) {
      padding-top: 50px;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const FieldsWrapper = styled.div`
  margin-top: 50px;
  height: 28%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
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

const TermsOfService = styled.span`
  font-size: 16px;
  font-weight: 300;
  text-align:right;
  margin-bottom: 20px;
  display: block;
  margin-top: 15px;
`;

const stepsButtons = css`
   width: 152px;
   box-shadow: 0 20px 25px rgba(90, 141, 244, 0.16), 0 10px 10px rgba(0, 0, 0, 0.04);
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

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
`;

// const SocialButtonsWrapper = styled(Col)`
//    margin-top: 100px;
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    align-items: center;
// `;
//
// const StyledSocialButton = styled(Button)`
//    width: 376px;
//    height: 48px;
//    background-color: rgba(90, 141, 244, 0.1);
//    color: #5A8DF4;
//    border:none;
//    font-size: 17px;
//    font-weight:bold;
//    margin-bottom: 9px;
//
//     &:hover {
//         background-color: rgba(90, 141, 244, 0.1);
//         color: #5A8DF4;
//         border: 1px solid #5A8DF4;
//     }
//
//     @media(max-height: 900px) {
//       height: 40px !important;
//       font-size: 16px;
//     }
// `;


export default connect(BasicInformation);
