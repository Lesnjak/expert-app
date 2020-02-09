import React from 'react';
import {Icon} from "antd";
import styled from "styled-components";

const FollowItem = ({children, type}) => {
    return (
        <Wrapper>
            <div style={{paddingRight: "42px"}}>
                {children}
                &nbsp;
                {/*<StyledIcon type={type} theme="filled" color="white"/>*/}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding-top: 14px;
    padding-bottom: 14px;
    color: white;
    line-height: 24px;
    //cursor: pointer;
    font-size: 16px;
    width: 168px;
    
    //&:hover {
    //  background: linear-gradient(270deg, #87AEFF 0%, rgba(87, 138, 242, 0) 100%);    
    //}
    
     @media(max-height: 900px) {
       padding-top: 5px;
       padding-bottom: 5px;
       font-size: 12px;
       line-height: 17px;
    }
`;

const StyledIcon = styled(Icon)`
    margin-left: 16px;  
`;


export default FollowItem;