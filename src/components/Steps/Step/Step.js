import React from 'react';
import styled from "styled-components";

const Step = ({current, index}) => {
    // console.log(current, index);

    return (
        <Ellipse style={{opacity: current === index ? 1 : 0.15}}/>
    );
};

const Ellipse = styled.div`
  //width: 77px;
  width: 100%;
  height: 5px;
  background-color: #5A8DF4;
  border-radius: 4px;
`;

export default Step;