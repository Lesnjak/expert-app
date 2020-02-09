import React from 'react';
import {Button, Col, Icon, Modal, Row, Select} from "antd";
import {isoLangs} from "../../isoLangs";
import styled, {css} from "styled-components";

const {Option} = Select;

const FontSize = css`
  font-size: 16px;
`;

const StyledModal = styled(Modal)`
  width: 560px !important;
  animation-duration: 0s !important;

  .ant-modal-body {
    padding: 14px 30px 0;
  }
  
  .ant-modal-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 428px;
    padding-top: 15px;
    padding-bottom: 16px;
    border:none;
  }

  .ant-select-dropdown {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
 
  .ant-select-lg {
    line-height: 46px !important;
  }
  
  .ant-select-selection__rendered {
      line-height: 46px !important;
  }
  
  .ant-select-search {
    line-height: 40px !important;
    height: 40px; !important;
  }
  
  .ant-select-open .ant-select-selection {
    min-height: 48px;
    width: 496px;
    margin-left: 30px;
    border: 0.75px solid rgba(119, 119, 119, 0.3);
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  ul {
    left: 262px!important;
  }
  
  .ant-select-dropdown-menu {
    max-height: 336px !important;
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


const LanguagesModal = ({modalShow, setModalShow, tempSelectedLanguages, addLanguagesButton, selectedValue, onLanguageSelect, onLanguageDeselect}) => {
    return (
            <StyledModal
                transitionName="none"
                maskTransitionName="none"
                visible={modalShow}
                closable={false}
                wrapClassName='modal-wrapper'
                onCancel={() => setModalShow(false)}
                okText="Add"
                footer={[
                    <Button
                        key='unique'
                        size="large"
                        type="primary"
                        style={{width: 272}}
                        onClick={addLanguagesButton}
                        disabled={!tempSelectedLanguages.length}
                    >
                        Add
                    </Button>
                ]}
            >
                <Row type="flex" justify="space-between" style={{paddingBottom: 17}}>
                    <Col span={23}>
                        <ModalTitle style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#333333",
                            lineHeight: "31px"
                        }}>
                            Select Language
                        </ModalTitle>
                    </Col>
                    <Col span={1}>
                        <Icon
                            type="close"
                            style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#333333",
                                lineHeight: "22px",
                                paddingTop: 4
                            }}
                            onClick={() => setModalShow(false)}
                        />
                    </Col>
                </Row>
                <Select
                    autoFocus={true}
                    showArrow={false}
                    showSearch
                    mode="multiple"
                    labelInValue
                    dropdownMatchSelectWidth={false}
                    size="large"
                    placeholder="Search for languages"
                    open={modalShow}
                    defaultActiveFirstOption={false}
                    onSelect={onLanguageSelect}
                    onDeselect={onLanguageDeselect}
                    getPopupContainer={trigger => trigger.parentNode}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    // value={tempSelectedLanguages}
                    // defaultValue={{key: "en", label: "English"}}
                    style={{
                        width: "calc(100% + 55px)",
                        marginLeft: -25,
                        boxShadow: "none",
                        WebkitBoxShadow: "none",
                    }}
                    value={tempSelectedLanguages}
                    dropdownMenuStyle={{
                        width: "550px",
                        boxShadow: "none",
                        maxHeight: 336,
                        WebkitBoxShadow: "none",
                    }}
                >
                    {Object.keys(isoLangs).map(langKey => (
                        <Option
                            key={langKey}
                            value={langKey}
                            style={{
                                height: "56px",
                                lineHeight: "45px",
                                fontSize: "17px",
                                color: "#333333",
                                borderBottom: "0.75px solid rgba(119, 119, 119, 0.3)",
                            }}
                        >
                            {isoLangs[langKey].name}
                        </Option>
                    ))}
                </Select>
            </StyledModal>
    );
};

export default LanguagesModal;
