import React from 'react';
import {Router, Redirect} from '@reach/router'
import Registration from "./pages/Registration/Registration";
import BasicInformation from "./pages/Registration/BasicInformation/BasicInformation";
import UploadPhoto from "./pages/Registration/UploadPhoto/UploadPhoto";
import FullDetails from "./pages/Registration/FullDetails/FullDetails";
import Description from "./pages/Registration/Description/Description";
import SkillLanguagesExperience from "./pages/Registration/SkillLanguagesExperience/SkillLanguagesExperience";
import AvailableDates from "./pages/Registration/AvailableDates/AvailableDates";
import AccountCreated from "./pages/Registration/AccountCreated/AccountCreated";
import {BrowserView, MobileView} from "react-device-detect";
import DownloadApp from "./components/DownloadApp/DownloadApp";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Sessions from "./pages/Main/Sessions/Sessions";
import Inbox from "./pages/Main/Inbox/Inbox";
import Profile from "./pages/Main/Profile/Profile";
import Settings from "./pages/Main/Settings/Settings";
import Chat from "./pages/Main/Sessions/Chat/Chat";

function App() {
    return (
        <>
            {/*<BrowserView>*/}
                <Router>
                    <Login exact path="/login"/>

                    <Registration exact path="/registration">
                        <UploadPhoto exact path="upload-photo"/>
                        <BasicInformation exact path="basic-information"/>
                        <FullDetails exact path="full-details"/>
                        <Description exact path="description"/>
                        <SkillLanguagesExperience exact path="skills-languages-experience"/>
                        <AvailableDates exact path="available-dates"/>
                        <AccountCreated path="account-created"/>
                    </Registration>

                    <Main exact path="/main">
                        <Sessions exact path="sessions"/>
                        <Inbox exact path="inbox"/>
                        <Chat exact path="chat"/>
                        <Profile exact path="profile"/>
                        <Settings exact path="settings"/>
                        <Redirect from="/" to="/main/sessions" noThrow/>
                    </Main>
                </Router>
            {/*</BrowserView>*/}

            {/*<MobileView>*/}
            {/*    <DownloadApp/>*/}
            {/*</MobileView>*/}
        </>
    );
}

export default App;
