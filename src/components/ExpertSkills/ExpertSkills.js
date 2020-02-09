import React, {useState, useRef, useEffect} from 'react';
import {ReactComponent as PlusIcon} from "../../assets/images/icons/plus.svg";
import styled, {css} from "styled-components";
import {Button, Icon, Row, Tag} from "antd";

const buttonStyles = css`
    box-shadow: 0 0 5px rgba(90, 141, 244, 0.4);
   font-weight: 600;
   font-size: 17px;
   margin-left: auto;
`;

const StyledIcon = css`
  margin-right: auto !important;
  font-size: 18px !important;
  position: absolute;
  right: 14px;
  top: calc(50% - 9px)
`;

const StyledTag = css`
   //margin-right: 16px !important;
   //margin-bottom: 16px !important;
   height: 32px !important;
   line-height: 31px !important;
   padding-left: 16px !important;
   padding-right: 39px !important;
   font-size: 15px !important;
   color: white !important;
   position:relative;
   font-weight: normal;
   font-family: "Lato",sans-serif;
`;

const ExpertsSkillsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
  //padding-top: 16px;
  width: 100%;
  //padding-bottom: 5px;
  //margin-top: 16px;
  border-top: 1px solid rgba(119, 119, 119, 0.3);
  border-bottom: 1px solid rgba(119, 119, 119, 0.3);
  width: 100%;
  padding: 10px 0;
  :not(.skills-selected) {
	  padding: 0;
	  border: 0;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid #7777774d;
  border-bottom: 1px solid #7777774d;
  &.skills-selected {
	padding: 0;
	border: 0;
	.title-label {
		font-weight: bold;
		margin-right: 0;
		margin-bottom: -1px;
		font-size: 14px;
		color: #424242;
		padding: 0 10px;
		font-family: "Lato",sans-serif ;
		border-top: 1px solid #7777774d;
		border-right: 1px solid #7777774d;
		border-left: 1px solid #7777774d;
		border-bottom: 1px solid #fff;
		border-top-right-radius: 5px;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		display: block;
		z-index: 100;
		left: 0;
		top: 0;
	  }
  }
`;

const Label = styled.span`
  line-height: 40px;
  font-size: 14px;
  margin-right: 20px;
  min-width: 83px;
  min-height:0;
`;

const StyledAddSkillButton = styled(Button)`
   ${buttonStyles};
   width: 32px !important;
   margin: 5px 10px;
   //margin-right: 16px;
   //margin-bottom: 17px;
   
   @media(max-height: 800px) {
    //margin-bottom: 10px;
   }
`;

const ExpertSkillsCloseIcon = styled(Icon)`
  ${StyledIcon};
  color: white !important;
`;

const ExpertSkillsTag = styled(Tag)`
    ${StyledTag};
    background-color: #5A8DF4 !important;
    border: 1px solid #5A8DF4 !important;
    margin:5px 10px !important;
    color: #333333;
    box-shadow: 0 0 5px rgba(90, 141, 244, 0.4);
    cursor: pointer;
`;
    const LabelShow = styled.div`
margin-top: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    `
const WrapperSkills = styled.div`
  max-height: 86px;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
`
const ExpertSkills = ({selectedSkills, removeSkill, setSkillsModalShow}) => {
	let isSelectedSkillsExist = false;
	for(let skill in selectedSkills) {
		if (selectedSkills[skill].length > 0) {
			isSelectedSkillsExist = true;
			break;
		}
	};
    return (
        <LabelShow>

			<TitleRow className={isSelectedSkillsExist ? 'skills-selected' : ''}>
				<Label className="title-label">My Specialties</Label>
				<StyledAddSkillButton
					type="primary"
					size="small"
					onClick={() => setSkillsModalShow(true)}
				>
					<PlusIcon/>
				</StyledAddSkillButton>
			</TitleRow>

        <ExpertsSkillsRow
            type="flex"
            justify="start"
			className={isSelectedSkillsExist ? 'skills-selected' : ''}
        >
            <WrapperSkills>

            {Object.keys(selectedSkills).map(skill => {
               return  selectedSkills[skill].map((subSkill, index) => (
                    <ExpertSkillsTag key={subSkill.id}>
                        {subSkill.name}
                        <ExpertSkillsCloseIcon
                            onClick={(e) => removeSkill(e, subSkill, index, skill)}
                            type="close"
                        />
                    </ExpertSkillsTag>
                ))
            }
            )}
            </WrapperSkills>
        </ExpertsSkillsRow>
            </LabelShow>
    );
};

export default ExpertSkills;
