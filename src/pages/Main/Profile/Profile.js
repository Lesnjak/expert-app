import React from 'react';
import styled from "styled-components";
import {Row} from "antd";

const Profile = () => {
    return (
        <StyledRow>
            <div>Profile</div>
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
`;

export default Profile;
