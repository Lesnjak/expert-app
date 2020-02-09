import React from 'react';
import Avatar from '../../../assets/images/avatar.png'
import {
    ColQuestion,
    ColCategory,
    ColLanguage,
    ColDate,
    ColLength,
    ColTotal,ColButtons,
    MainTitle,
    ColStatus,
    TitleRow

} from './SessionsStyled';
const SessionTitles = () => {
    return (
        <TitleRow>
            <ColStatus>
                <MainTitle>Name</MainTitle>
            </ColStatus>
            <ColQuestion>
                <MainTitle>Question</MainTitle>
            </ColQuestion>
            <ColCategory>
                <MainTitle>Category</MainTitle>
            </ColCategory>
            <ColLanguage>
                <MainTitle>LANGUAGE</MainTitle>
            </ColLanguage>
            <ColDate>
                <MainTitle>DATE</MainTitle>
            </ColDate>
            <ColLength>
                <MainTitle>SESSION LENGTH</MainTitle>
            </ColLength>
            <ColTotal>
                <MainTitle>TOTAL</MainTitle>
            </ColTotal>
            <ColButtons>
            </ColButtons>
        </TitleRow>
    );
};


export default SessionTitles;
