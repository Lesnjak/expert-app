import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as PlusIcon} from "../../assets/images/icons/plus.svg";
import styled, {css} from "styled-components";
import {Button, Icon, Row, Tag} from "antd";
import _ from "lodash"

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

const FontSize = css`
  font-size: 16px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 0;
  margin-bottom: -1px;
  font-size: 14px;
  color: #424242;
  line-height: 40px;
  padding: 0 15px;
  font-family: "Lato",sans-serif ;
  border-top: 1px solid #7777774d;
  border-right: 1px solid #7777774d;
  border-left: 1px solid #7777774d;
  border-bottom: 1px solid #fff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  //min-width: 113px;
  display: block;
  //position: sticky;
  //background-color: white;
  z-index: 100;
  left: 0;
  top: 0;
`;

const LabelShow = styled.div`
//margin-top: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    `

const ExpertsSkillsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
  //padding-top: 16px;
  width: 100%;
  //padding-bottom: 5px;
  //margin-top: 16px;
  border-top: ${({isBorder})=>!isBorder?"1px solid rgba(119, 119, 119, 0.3)":"none"};
  border-top: 1px solid rgba(119, 119, 119, 0.3);
  border-bottom: 1px solid rgba(119, 119, 119, 0.3);
  width: 100%;
  padding: 10px 0;
  
  @media(max-height: 800px) {
    //padding-top: 10px;
    //padding-bottom: 3px;
    //margin-top: 10px;
  }
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
const LabelStandart = styled.div`
    line-height: 32px;
    margin: 5px 10px;
    font-size: 14px;
    margin-right: 20px;
    min-width: 83px;
    min-height:0;
`

const LanguagesTag = styled(Tag)`
    ${StyledTag};
    background-color: white !important;
    color: #333333 !important;
        margin:5px 10px !important;
`;

const LanguagesCloseIcon = styled(Icon)`
  ${StyledIcon};
  color: #5A8DF4 !important;
`;
const WrapperSkills = styled.div`
  max-height: 86px;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
`
const EnglishTag = styled(Tag)`
    margin:5px 10px !important;
   height: 32px !important;
   line-height: 31px !important;
   padding-left: 16px !important;
   padding-right: 16px !important;
   font-size: 15px !important;
   color: #333333 !important;
   position: relative;
   background-color: white !important;
   font-weight: normal;
   font-family: "Lato",sans-serif;
`;

const areEqual = (prevProps, nextProps) => {
    return _.isEqual(prevProps.selectedLanguages, nextProps.selectedLanguages)
};

const SelectedLanguages = ({selectedLanguages, setModalShow, removeLanguage}) => {
    const [blockHeight, setBlockHeight] = useState(0);
    const blockRef = useRef(null);
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            //
            // console.log("height",entry.target.clientHeight);
            // console.log("div",entry.target);
            setBlockHeight(entry.target.offsetHeight);
            blockRef.current.style.minHeight = entry.target.offsetHeight-20 + "px"



        }
    });
    useEffect(()=>{
        if(blockRef.current) resizeObserver.observe(blockRef.current);
        return ()=> resizeObserver.unobserve(blockRef.current)
    },[blockRef.current])

    return (
        <LabelShow>
           <TitleRow>
				<Label className="title-label">Languages</Label>
				<StyledAddSkillButton
					type="primary"
					size="small"
					onClick={() => setModalShow(true)}
				>
					<PlusIcon/>
				</StyledAddSkillButton>
			</TitleRow>

        <ExpertsSkillsRow
            isBorder={blockHeight <= 42}
            type="flex"
            justify="start"
            style={{
                borderBottom: "1px solid rgba(119, 119, 119, 0.3)",
                width: "100%"
            }}
        >
            <WrapperSkills ref={blockRef}>

            <EnglishTag closable={false}>
                English
            </EnglishTag>

            {selectedLanguages.map(language => (
                <LanguagesTag key={language.key}>
                    {language.label}
                    <LanguagesCloseIcon
                        onClick={(e) => removeLanguage(e, language)}
                        type="close"
                    />
                </LanguagesTag>
            ))}
            </WrapperSkills>
        </ExpertsSkillsRow>
        </LabelShow>
    );
};

// export default memo(SelectedLanguages, areEqual);
export default SelectedLanguages;
