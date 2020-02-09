import React from 'react';
import {
    ModalWrapper,
    ModalWindow,
    ModalHeader,
    ModalHeaderText,
    ModalLimit,
    ModalBlueText,
    ModalBody,
    ModalBlackText,
    ModalComments,
    ModalButtons,
    ModalWrapperClose
} from './SessionModalStyled';
import {AvaIcon, AvaName, AvaWrapper, ButtonAccept, ButtonDecline,} from "../SessionsStyled";


const SessionModal = ({src, name, session, total, date, handleModalOpen,questionText}) => {
    const handleAccept = (e) => {
        handleModalOpen(e);
    }
    const handleDecline = (e) => {
        handleModalOpen(e);
    }
    return (
        <ModalWrapper >
            <ModalWrapperClose onClick={handleModalOpen}/>
            <ModalWindow>
                <ModalHeader>
                    <AvaWrapper>
                        <AvaIcon src={src} alt='avatar'/>
                    </AvaWrapper>
                    <AvaName>{name}</AvaName>
                    <ModalHeaderText>want to start session with you</ModalHeaderText>
                    <ModalLimit>
                        <AvaName>{session}</AvaName>
                        <AvaName>Session cost {total}</AvaName>
                    </ModalLimit>
                </ModalHeader>
                <ModalBody>
                    <ModalBlueText>Session Date: {date.date} &middot; {date.time}</ModalBlueText>
                    <ModalBlackText>Comments</ModalBlackText>
                    <ModalComments>
                     {questionText}
                    </ModalComments>
                    <ModalButtons>
                        <ButtonAccept onClick={handleAccept}>Accept</ButtonAccept>
                        <ButtonDecline onClick={handleDecline}>Decline</ButtonDecline>
                    </ModalButtons>
                </ModalBody>

            </ModalWindow>
        </ModalWrapper>
    );
};

export default SessionModal;
