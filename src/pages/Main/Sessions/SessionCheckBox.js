import React, { useState} from 'react';
import {AvaCheckBox,AvaCheckBoxItem} from './SessionsStyled'
import {ReactComponent as CheckBox} from '../../../assets/images/icons/checkBox.svg'
import {ReactComponent as CheckBoxCheck} from '../../../assets/images/icons/checkBoxCheck.svg'

const SessionCheckBox = ({status,checked}) => {
    return (
        <AvaCheckBox status={status} >
            <CheckBox className = "check-box-wrapper"/>
             {checked && <CheckBoxCheck className = "check-box-check"/>}
        </AvaCheckBox>
    );
};

export default SessionCheckBox;
