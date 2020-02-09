import React from 'react';
import styled from "styled-components";
import {Row} from "antd";
import FollowItem from "./FollowItem/FollowItem";

// TODO add social links
const social = [
    {label: "Facebook", type: "facebook"},
    {label: "Twitter", type: "twitter-square"},
    {label: "Instagram", type: "instagram"},
];

const Follow = () => {
    return (
        <StyledRow type={"flex"} justify={"end"}>
            <Header>Follow</Header>

            <div>
                {social.map((item, index) => (
                    <FollowItem key={index} type={item.type}>
                        {/*{item.label}*/}
                    </FollowItem>
                ))}
            </div>
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
  width: 168px;
  align-self: flex-end;
  //padding-right: 64px;
  text-align: right;
`;

const Header = styled.h4`
  //width: 168px;
  font-size: 28px;
  line-height: 24px;
  color: white;
  text-align: center;
  font-weight: bold;
  width: 168px;
  
  @media(max-height: 800px) {
    font-size: 22px;
  }
`;

export default Follow;