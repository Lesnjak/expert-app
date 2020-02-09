import React from 'react';
import styled from "styled-components";
import {Link} from "@reach/router";
import {addCurrentMenu} from "../../../store/shared/actions";
import {useDispatch} from "react-redux";

const NavLink = props => (
	<Link
		{...props}
		getProps={({ isCurrent }) => {
			return {
				className: `${props.className} ${isCurrent ? "active" : ""}`
			};
		}}
	/>
);

const MenuItem = (props) => {
	const dispatch = useDispatch();
	const className = props.className ? props.className : '';

	const handleMenuClick = () => {
        dispatch(addCurrentMenu({currentMenu: props.menuId}));
	};

    return (
        <Wrapper>
			<StyledLink to={props.path} className={className} onClick={handleMenuClick}>
				<Image src={props.icon} alt="Menu Icon"/>
				<Label>{props.label}</Label>
				{props.path === 'inbox' && <Paragraph>+{props.unreadCount}</Paragraph>}
			</StyledLink>
        </Wrapper>
    );
};

const Wrapper = styled.li`
	cursor: pointer;
	position: relative;
	width: 100%;
`;

const StyledLink = styled(NavLink)`
	position: relative;
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	padding-left: 63px;
	&.active {
		background: linear-gradient(270deg, #87AEFF 0%, rgba(87, 138, 242, 0) 100%);
	}
	&.help, &.logout {
		height: 48px;
		justify-content: center;
		padding-left: 0;
		img {
			margin-right: 8px;
		}
	}
	&.logout {
		background: white;
		label {
			color: #5A8DF4;
		}
	}
	&.active, &.logout {
		label {
			font-weight: 800;
		}
	}
	@media (max-width: 1500px){
	padding-left: 30px;
	
	}
`;

const Image = styled.img`
	width: 16px;
	margin-right: 16px;
`;

const Label = styled.label`
	margin: 0;
	line-height: 24px;
	font-family: "Lato", sans-serif;
	font-weight: 500;
	font-size: 16px;
	color: white;
	pointer-events: none;
`;

const Paragraph = styled.p`
	position: absolute;
	top: 14px;
	right: 20px;
	width: 33px;
    height: 22px;
	margin: 0;
	border-radius: 4px;
	line-height: 24px;
	text-align: center;
	font-family: "Lato", sans-serif;
	font-weight: 500;
	font-size: 14px;
	color: #5A8DF4;
	background: white;
`;

export default MenuItem;
