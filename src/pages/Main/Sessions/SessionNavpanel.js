import React from 'react';
import {ReactComponent as ArrowLeft} from '../../../assets/images/icons/ArrowLeft.svg';
import {ReactComponent as ArrowRight} from '../../../assets/images/icons/ArrowRight.svg';
import {ReactComponent as Calendar} from '../../../assets/images/icons/Calendar.svg';
import {
    SessionNavPanel,
    SessionNavPanelButton,
    SessionNavArrowWrapper,
    SessionNavArrowText,
    SessionNavArrowLink
} from './SessionsStyled'

const SessionNavpanel = () => {
    return (
        <SessionNavPanel>
            <SessionNavArrowWrapper>
                <SessionNavPanelButton>
                    <ArrowLeft/>
                </SessionNavPanelButton>
                <SessionNavArrowText>
                    Sep 17, Tue
                </SessionNavArrowText>
                <SessionNavPanelButton>
                    <ArrowRight/>
                </SessionNavPanelButton>
            </SessionNavArrowWrapper>
            <SessionNavArrowLink>
                <SessionNavPanelButton>
                    <Calendar/>
                </SessionNavPanelButton>
                <SessionNavArrowText>
                    Today
                </SessionNavArrowText>
            </SessionNavArrowLink>
        </SessionNavPanel>
    );
};

export default SessionNavpanel;
