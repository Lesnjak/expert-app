import React from 'react';
import styled from "styled-components";
import {Checkbox} from "antd";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  transition: .3s;
  
  &:hover {
    background-color: #c0dfff;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border: 1px solid #777777;
    border-radius: 4px;
    background-color: white !important;
    margin-right: 10px;
  }
  
  .ant-checkbox-inner::after {
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    display: block;
    border: none !important;
    border-radius: 2px;
    background-color: #5A8DF4;
    transform: none !important;
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    border: 1px solid #777777;
  }
`;

const SkillItem = ({children, checked, checkSkill}) => {
    return (
        <Wrapper onClick={checkSkill}>
            <StyledCheckbox checked={checked} />
            {children}
        </Wrapper>
    );
};

export default SkillItem;