import React, {useState} from 'react';
import SessionCheckBox from "./SessionCheckBox";
import SessionModal from "./SessionModal/SessionModal";
import {Portal} from "react-portal"
import {
    ColAvatar,SessionRow,AvaIcon,
    AvaWrapper,AvaName,AvaDot,
    ColQuestion,QuestionText,
    CategoryTag,ColCategory,
    ColLanguage,LanguageTag,
    ColDate,DateText,
    ColLength,LengthText,
    ColTotal,ColButtons,
    ButtonSingle,ButtonAccept,
    ButtonGroup,ButtonDecline,
} from './SessionsStyled';



const SessionItem = ({status,name,src,questionText,category,language,date, session,total,online,checked}) => {
    const [isModal, setIsModal] = useState(false);
    const handleModalOpen = (e) => {
        setIsModal(!isModal);
    }
    const handleStartSession = (e) => {
        e.stopPropagation();
        // setIsModal(!isModal)
        // alert("session is started...")
    }
    const handleStartChat= (e) => {
        e.stopPropagation();
        // setIsModal(!isModal)
        alert("session is started...")
    }
    return (
        <>
            <SessionRow onClick={handleModalOpen}>
                <ColAvatar status={status}>
                    <AvaWrapper>
                        <AvaIcon src={src} alt='avatar'/>
                    </AvaWrapper>
                    <AvaName status={status}>{name}</AvaName>
                    {
                        status === 'real' &&  <AvaDot online={online}/>
                    }
                    {
                        (status === 'pending' || status === 'daily') && <SessionCheckBox checked={checked} status={status}/>
                    }
                </ColAvatar>
                <ColQuestion>
                    <QuestionText>{questionText}</QuestionText>
                </ColQuestion>
                <ColCategory>
                    <CategoryTag>{category}</CategoryTag>
                </ColCategory>
                <ColLanguage>
                    <LanguageTag>{language}</LanguageTag>
                </ColLanguage>
                <ColDate>
                    <DateText>
                        {date.date}
                    </DateText>
                    <DateText>
                        {date.time}
                    </DateText>
                </ColDate>
                <ColLength>
                    <LengthText>{session}</LengthText>
                </ColLength>
                <ColTotal>
                    <LengthText>{total}</LengthText>
                </ColTotal>
                <ColButtons>
                    {
                        status === 'real' &&
                        <ButtonSingle to='/main/chat' onClick={handleStartSession}>Start Session</ButtonSingle>
                    }
                    {
                        status === 'daily' &&
                        <ButtonSingle to='/main/chat' onClick={handleStartSession}>View Chat</ButtonSingle>

                    }
                    {
                        status === 'pending' &&
                        (<ButtonGroup>
                            <ButtonAccept>Accept</ButtonAccept>
                            <ButtonDecline>Decline</ButtonDecline>
                        </ButtonGroup>)
                    }
                </ColButtons>
            </SessionRow>
            {
                isModal && (
                    <Portal>
                        <SessionModal
                            handleModalOpen={handleModalOpen}
                            src={src}
                            name={name}
                            date={date}
                            session={session}
                            total={total}
                            questionText={questionText}
                        />
                    </Portal>
                )
            }


            </>
    );
};


export default SessionItem;
