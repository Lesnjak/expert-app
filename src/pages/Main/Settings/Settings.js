import React from 'react';
import styled from "styled-components";
import {Row} from "antd";

const Settings = () => {
    return (
        <StyledRow>
            <div>Settings</div>
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
`;

export default Settings;