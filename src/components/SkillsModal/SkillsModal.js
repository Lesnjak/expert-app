import React, {useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {Field} from "formik"
import {Checkbox, Col, Collapse, Modal, Row, Button} from "antd";
import styled, {css} from "styled-components";
import SkillItem from "../SkillItem/SkillItem";

import {ReactComponent as Plus} from "../../assets/images/icons/plus.svg"


const FontSize = css`
  font-size: 16px;
`;
const StyledModal = styled(Modal)`
    width: 80vw !important;
    //margin-top: 0 !important;
    //margin-left: auto;
    //margin-right: auto;
    position: relative;

  .ant-modal-footer {
    justify-content:center;
    padding: 0;
    border: none;
    display: none;
  }
  .ant-modal-close{
   margin-top: 10px;
   margin-right: 15px;
  }
  
  .ant-select-dropdown-menu {
    max-height: 200px;
  }
  
  .ant-modal-content {
    //width: 80vw;
    margin: auto;
    width:700px;
  }
`;

const ModalTitle = styled.span`
  font-weight: bold;
  ${FontSize};
  color: #424242;
  margin-bottom: 0;
  line-height: 40px;
  font-family: "Lato",sans-serif ;
  width: 113px;
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-content {
    max-height: 200px;
    overflow-y: auto;
  }
  
  @media(max-height: 800px) {
      .ant-collapse-content {
        max-height: 150px;
      }
  }
  
  .ant-collapse-header {
    padding-left: 66px !important;
    padding-right: 34px !important;
  }

  .other-skill-collapse .ant-collapse-header {
    padding-left: 40px !important;
  }

  .ant-collapse-extra {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
  }
`;

const OtherSkillContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledField = styled(Field)`
  width: calc(100% - 15px);
  height: 35px;
  margin: 0 10px;
  border-bottom: 1px solid rgba(119, 119, 119, 0.3);
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  color: #424242;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled(Button)`
  height: 36px;
  box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
`

const {Panel} = Collapse;

const SkillsModal = ({skillsModalShow, setSkillsModalShow, addSkillsButton, checkAllClick, checkSkill, addOtherSkill, onSkillSelect, onSkillDeselect, tempSelectedSkills, categories, skillsCheckboxes}) => {
    const [otherSkill, setOtherSkill] = useState('');
    const isAddButtonDisabled = () => {
      for (const selectedSkill in tempSelectedSkills) {
          // console.log("fn", tempSelectedSkills[selectedSkill].some(skill => {console.log(skill.name,skill.checked); return skill.checked}));

          if (tempSelectedSkills[selectedSkill].some(skill => {return skill.checked})) {
              return false
          }
      }

      return true
    };

    console.log("DS = ",isAddButtonDisabled());

    const handleOtherSkillAddButtonClick = () => {
        addOtherSkill(otherSkill);
        setOtherSkill('');
    }

    return (
        <StyledModal
            transitionName="none"
            maskTransitionName="none"
            visible={skillsModalShow}
            wrapClassName='modal-wrapper'
            closable={true}
            onCancel={() => setSkillsModalShow(false)}
            okText="Add"

        >
            <Row type="flex" justify="space-between" style={{paddingBottom: 17}}>
                <Col span={24}>
                    <ModalTitle style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#333333",
                        lineHeight: "31px"
                    }}>
                        Select your specialties
                    </ModalTitle>
                </Col>
            </Row>
            <StyledCollapse accordion>
                {Object.keys(tempSelectedSkills).map((categoryKey) => (
                    <Panel
                        header={categoryKey}
                        key={categoryKey}
                        extra={
                            <Checkbox
                                checked={skillsCheckboxes[categoryKey] && tempSelectedSkills[categoryKey].length === categories[categoryKey].length}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(event) => checkAllClick(event, categoryKey)}
                            />
                        }
                    >
                        {tempSelectedSkills[categoryKey].map((subCategory, index) => (
                            <SkillItem
                                key={subCategory.id}
                                checked={subCategory.checked}
                                checkSkill={() => checkSkill(categoryKey, index)}
                            >
                                {subCategory.name}
                            </SkillItem>
                        ))}
                    </Panel>
                ))}
                <Panel
                    className="other-skill-collapse"
                    header="Other"
                >
                    <OtherSkillContainer>
                        <StyledField
                            type="text"
                            name="otherskill"
                            placeholder="Input your skill"
                            maxLength={20}
                            value={otherSkill}
                            onChange={(e) => setOtherSkill(e.target.value)}
                        />
                        <StyledButton
                            type="primary"
                            size="large"
                            disabled={!otherSkill}
                            onClick={handleOtherSkillAddButtonClick}
                        >
                            Add
                        </StyledButton>
                    </OtherSkillContainer>
                </Panel>
            </StyledCollapse>
        </StyledModal>
    );
};

export default SkillsModal;
