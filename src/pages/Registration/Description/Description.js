import React from 'react';
import {addData} from "../../../store/registration/actions";
import {navigate} from "@reach/router";
import {connect, Field} from "formik";
import {Button, Col, Icon, Row, Tooltip} from "antd";
import styled from "styled-components";
import {useDispatch} from "react-redux";

const fieldsIsValid = (errors) => {
    return (!errors.description)
};

const Description = ({formik}) => {
    const dispatch = useDispatch();

    const handleBackButtonClick = () => {
        dispatch(addData({currentPage: "/full-details", currentStep: 2}));
        navigate("/registration/full-details")
    };

    const handleContinueButtonClick = () => {
        formik.validateForm().then((errors) => {
            if (fieldsIsValid(errors)) {
                const data = {
                    data: formik.values,
                    currentPage: "/skills-languages-experience",
                    currentStep: 4
                };

                dispatch(addData(data));
                navigate("/registration/skills-languages-experience");
                formik.resetForm()
            }
        })
    };

    return (
        <StyledRow>
            <StyledCol span={24}>
                <Label>About</Label>
            </StyledCol>

            <StyledCol span={24}>
                <Tooltip
                    placement={"right"}
                    title={formik.errors.description}
                    visible={!!formik.errors.description}
                >
                    <StyledField
                        type="text"
                        component="textarea"
                        name="description"
                        placeholder="Tell our clients about yourself and your background"
                        onKeyUp={() => formik.setFieldTouched("description", true)}
                    />
                </Tooltip>
            </StyledCol>


            <Col span={24}>
                <Row type="flex" justify="space-between" style={{width: "100%"}}>
                    <Col>
                        <StepsButtons type="primary" size="large" onClick={handleBackButtonClick}>
                            <Icon type="left"/>
                            Back
                        </StepsButtons>
                    </Col>
                    <Col>
                        <StepsButtons
                            type="primary"
                            size="large"
                            disabled={!formik.values.description}
                            onClick={handleContinueButtonClick}
                        >
                            Continue
                            <Icon type="right"/>
                        </StepsButtons>
                    </Col>
                </Row>
            </Col>
        </StyledRow>
    );
};

const StepsButtons = styled(Button)`
   width: 152px;
   box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   margin-top: 40px;
   
   @media(max-height: 900px) {
      height: 40px;
      font-size: 16px;
      //margin-top: 30px;
  }
`;

const StyledRow = styled(Row)` 
  font-weight: 600;
  font-size: 15px;
  color: #424242;
  padding-top: 40px;
  
  @media(max-height: 900px) {
     padding-top: 30px;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.p` 
  font-weight: 700;
  font-size: 18px;
  color: #333333;
  margin-bottom: 0;
`;

const StyledField = styled(Field)`
   height: 360px;
   width: 100%;
   border: 1px solid rgba(119, 119, 119, 0.3);
   border-radius: 5px;
   resize: none;
   font-size: 15px;
   font-weight: 300;
   padding: 10px 17px 10px 17px;
   line-height: 31px;
   font-family: "Lato", sans-serif;
   
   &:first-child {
    padding-right: 50px;
   }
   
   &:focus {
   outline: none;
   }
   
   @media(max-height: 900px) {
      height: 260px;
      font-size: 13px;
  }
`;

export default connect(Description);
