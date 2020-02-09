import React, {useEffect} from 'react';
import SessionTitles from "./SessionTitles";
import SessionItem from "./SessionItem";
import Avatar from '../../../assets/images/avatar.png'
import { connect } from 'react-redux';
import { addSessions } from 'store/sessions/actions';
import {
    StyledRow,TitleBlue,Title,SessionBox,TitleNavWrapper,
} from './SessionsStyled';
import SessionNavpanel from "./SessionNavpanel";





const Sessions = ({addSessions, sessions}) => {
    useEffect(()=>{
        addSessions()
    },[])

    return (
        <StyledRow>
            <Title>Sessions</Title>
            <SessionBox>
                <TitleNavWrapper>
                <TitleBlue>Real Time Session</TitleBlue>
                </TitleNavWrapper>
                <SessionTitles/>
                {
                    sessions.real.map((session,idx)=>{
                        return(
                            <SessionItem
                                key={idx}
                                status={session.status}
                                src={session.src}
                                name={session.name}
                                questionText={session.questionText}
                                category={session.category}
                                language={session.language}
                                date={session.date}
                                session={session.session}
                                total={session.total}
                                online={session.online}

                            />
                        )

                    })
                }

            </SessionBox>
            <SessionBox>
                <TitleNavWrapper>
                <TitleBlue>Pending Sessions</TitleBlue>
                </TitleNavWrapper>
                {
                    sessions.pending.map((session,idx)=>{
                        return(
                            <SessionItem
                                key={idx}
                                status={session.status}
                                src={session.src}
                                name={session.name}
                                questionText={session.questionText}
                                category={session.category}
                                language={session.language}
                                date={session.date}
                                session={session.session}
                                total={session.total}
                                checked={session.checked}

                            />
                        )

                    })
                }
            </SessionBox>
            <SessionBox>
                <TitleNavWrapper>
                    <TitleBlue>Your Daily Sessions </TitleBlue>
                    <SessionNavpanel/>
                </TitleNavWrapper>

                {
                    sessions.daily.map((session,idx)=>{
                        return(
                            <SessionItem
                                key={idx}
                                status={session.status}
                                src={session.src}
                                name={session.name}
                                questionText={session.questionText}
                                category={session.category}
                                language={session.language}
                                date={session.date}
                                session={session.session}
                                total={session.total}
                                checked={session.checked}

                            />
                        )

                    })
                }

            </SessionBox>

        </StyledRow>
    );
};

const  mapStateToProps = ({sessions}) => {
    return {
        sessions
    }
}
export default connect(mapStateToProps, {addSessions})(Sessions);
