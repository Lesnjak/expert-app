import React from 'react';
import {Col, Row} from "antd";
import Step from "./Step/Step";
import styled from "styled-components";

const Steps = ({steps, current}) => {
    // console.log(current);

    return (
        <StyledRow gutter={10}>
            <Col span={24}>
                <Typography>
                    <span style={{color: "#333333", fontWeight: 600}}>
                        Step {current + 1} of 6 &nbsp;-&nbsp;
                    </span>
                    {steps[current]}
                </Typography>

                {steps.map((step, index) => (
                    <StyledCol span={4} key={index}>
                        <Step current={current} index={index}/>
                    </StyledCol>
                ))}
            </Col>

        </StyledRow>
    );
};

const StyledRow = styled(Row)`
  padding-top: 25px;
  //padding-top: 50px;
  @media(max-height: 900px) {
      padding-top: 20px;
      //margin-top: 20px;      
  }
  //margin-top: 68px;
  //font-family: "Lato", sans-serif;
  
  //  @media(max-height: 800px) {
  //  margin-top: 40px;
  //}
`;

const StyledCol = styled(Col)`
  &:first-child {
    padding: 0 !important;
  }
  &:nth-child(2) {
    padding-left: 0 !important;
  }
  &:last-child {
    padding-right: 0 !important;
  }
`;

const Typography = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #424242;
  margin-bottom: 5px;
`;

export default Steps;