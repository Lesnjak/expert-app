import React from 'react';
import styled from "styled-components";
import {Col, Row} from "antd";
import {useSelector} from "react-redux";
import MenuItem from "../../components/MainBlock/MenuItem/MenuItem";
import {MENU_LIST} from "../../constants/constants";
import AvatarIcon from "../../assets/images/icons/icon.svg";
import Logo from "../../assets/images/icons/TopX.svg";

const Main = ({children}) => {
	const {userData, avatar} = useSelector(state => state.registration);
	const avatarUrl = (avatar && !!avatar.uri) ? avatar.uri : AvatarIcon;

    return (
        <StyledRow type="flex" justify="space-between">
            <StyledCol span={2}>
				<MainMenuWrapper>
					<LogoBlock>
						<Image src={Logo} alt="TopX logo"/>
					</LogoBlock>
					<AccountContainer>
						<Avatar src={avatarUrl} alt="Avatar"/>
						<Paragraph>Welcome, <strong>{userData.nickname}</strong></Paragraph>
					</AccountContainer>
					<Menu>
						{Object.values(MENU_LIST.common).map(menuItem =>
							<MenuItem
								key={menuItem.id}
								menuId={menuItem.id}
								path={menuItem.path}
								icon={menuItem.icon}
								label={menuItem.label}
								unreadCount={4}
							/>
						)}
					</Menu>
				</MainMenuWrapper>
				<BottomMenu>
					{Object.values(MENU_LIST.other).map(menuItem =>
                        <MenuItem
							key={menuItem.id}
							menuId={menuItem.id}
							className={menuItem.id}
                            icon={menuItem.icon}
							label={menuItem.label}
							path={menuItem.path}
                        />
                    )}
				</BottomMenu>
            </StyledCol>

            <RightSide>
				{children}
			</RightSide>
        </StyledRow>
    );
};

const StyledCol = styled(Col)`

	position: fixed;
	z-index: 100;
	padding-bottom: 50px;
	bottom: 0;top: 0;left: 0;
    display: flex;
    flex-direction: column;
	justify-content: space-between;
    min-width: 288px;
	background: #5A8DF4;
	box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.32), 0px 10px 10px rgba(0, 0, 0, 0.08);
	@media(max-width: 1500px){
     min-width: 220px;
}
`;

const MainMenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const LogoBlock = styled.div`
	padding: 30px 0;
	display: flex;
	justify-content: center;
	width: 100%;
`;

const Image = styled.img`
   width: 87px;
`;

const AccountContainer = styled.div`
    width: 100%;
    border-top: 0.75px solid;
    border-bottom: 0.75px solid;
    border-color: rgba(255, 255, 255, 0.4);
    padding: 20px 0 15px;
    text-align: center;
`;

const Avatar = styled.img`
    width: 70px;
    height: 70px;
	border-radius: 50%;
	color: #fff;
`;

const Paragraph = styled.p`
	margin: 10px 0 0;
	line-height: 24px;
	font-family: "Lato", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: white;
`;

const Menu = styled.ul`
	width: 100%;
	padding: 30px 0 0;
	margin: 0;
`;

const BottomMenu = styled.ul`
	width: 100%;
	padding: 0;
	margin: 0;
`;

const RightSide = styled.div`
  width: 100%;
  flex: 1;
`;

const StyledRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  background: #E5E5E5;
`;

export default Main;
