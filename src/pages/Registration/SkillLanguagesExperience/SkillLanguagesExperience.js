import React, {useEffect, useState} from 'react';
import {navigate} from "@reach/router";
import {useDispatch, useSelector} from "react-redux";
import {addCertificate, addData, removeCertificate} from "../../../store/registration/actions";
import {connect, Field} from "formik";
import {Button, Col, Icon, Row, Select, Tooltip, Upload} from "antd";
import styled from "styled-components";
import {toBase64} from "../../../utils/utils";
import LanguagesModal from "../../../components/LanguagesModal/LanguagesModal";
import SkillsModal from "../../../components/SkillsModal/SkillsModal";
import SelectedLanguages from "../../../components/SelectedLanguages/SelectedLanguages";
import ExpertSkills from "../../../components/ExpertSkills/ExpertSkills";

const educationOptions = [
    // "No Formal education",
    "Primary education",
    "Secondary education or high school",
    "GED", "Vocational qualification",
    "Bachelor’s degree",
    "Master’s degree",
    "Doctorate of higher"
];

const StepsButtons = styled(Button)`
   width: 152px;
   box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   margin-top: 40px;
   
   @media(max-height: 900px) {
       height: 40px;
       font-size: 16px;
       margin-top: 40px;
   }
`;

const Wrapper = styled.div`
  margin-top: 14px;
  width: 100%;
  display: flex;
  justify-content: start;
`;

const StyledRow = styled(Row)` 
  font-weight: 600;
  color: #424242;
  font-size: 16px;
  padding-top: 55px;
  
  @media(max-height: 900px) {
      padding-top: 30px;
      margin-top: 0;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const Label = styled.span` 
  font-weight: bold;
  color: #424242;
  margin-bottom: 0;
  line-height: 40px;
  font-family: "Lato",sans-serif ;
  width: 113px;
  min-width: 113px;
  display: block;
  
  @media(max-height: 900px) {
    font-size: 14px;
    line-height: 32px;
   }
`;

const YearsText = styled.span`
  color: #777777;
  line-height: 40px;
  
  @media(max-height: 900px) {
    font-size: 14px;
    line-height: 32px;
  }
`;

const StyledYearsField = styled(Field)` 
  width: 65px !important;
  height: 48px !important;
  border: 1px solid rgba(119, 119, 119, 0.3) !important; // 333333 30%
  margin-right: 14px !important;
  padding-left: 10px;
  font-weight: bold !important;
  color: #333333 !important;
  border-radius: 5px !important;
  line-height: 50px !important;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
  }
  
  @media(max-height: 900px) {
    height: 40px !important;
    line-height: 40px !important;
    width: 40px !important;
    font-size: 14px !important;
  }
  
    @media(max-height: 900px) {
      padding-left: 5px;
  }
`;

const EducationSelect = styled(Select)`
  font-size: 16px;
  
  .ant-select-selection--single {
      height: 40px;  
  }
  
  .ant-select-selection-selected-value {
      line-height: 40px;
  }
  
  .ant-select-selection__placeholder {
      line-height: 27px; 
  }
  
  @media(max-height: 900px) {
    font-size: 14px;
  
    .ant-select-selection--single {
      height: 32px;  
    }
  
    .ant-select-selection-selected-value {
      line-height: 32px;
    }
    
    .ant-select-selection__placeholder {
      line-height: 20px; 
  }
  }
`;

const StyledUploadButton = styled(Button)`
  margin-left: auto;
  background-color: rgba(90, 141, 244, 0.1);
  color: #5A8DF4;
  border-radius: 4px;
  width: 152px;
  font-size: 15px;
  font-weight:bold;
  border:none;
  
  @media(max-height: 900px) {
      height: 32px;
      font-size: 13px;
  }
`;

const StyledUpload = styled(Upload)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  
  .ant-upload-list {
    width: 200px !important;
  }
`;

const CertificationExt = styled.span`
  font-size: 12px;
`;

const CertificationTypographyWrap = styled(Col)`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`;


// const NoFilesAttached = styled.span`
//   font-size: 14px;
//   font-weight: 300;
//   display: block;
//   width: 100px;
// `;

const {Option} = Select;

const fieldsIsValid = (errors) => {
    return (!errors.experience)
};

const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0)
};


const SkillLanguagesExperience = ({formik}) => {
    const categories = useSelector(state => state.categories);
    const {skills, tempSkills, languages, tempLanguages, certificatesList, certificates} = useSelector(state => state.registration);
    const [selectedLanguages, setSelectedLanguages] = useState(languages || []);
    const [isMaxSizeUpload, setIsMaxSizeUpload] = useState(false);
    const [tempSelectedLanguages, setTempSelectedLanguages] = useState(tempLanguages || []);
    const [modalShow, setModalShow] = useState(false);
    const [skillsModalShow, setSkillsModalShow] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState(skills || {});
    const [skillsCheckboxes, setSkillsCheckboxes] = useState({});
    const [localCategories, setLocalCategories] = useState(tempSkills || {});

    const dispatch = useDispatch();

    const props = {
        name: 'file',
        customRequest: dummyRequest,
        onChange(info) {
            if (info.file.size < 5000000) {
                setIsMaxSizeUpload(false);
                if (info.file.status === 'uploading') {
                    toBase64(info.file.originFileObj)
                        .then(result => {
                            const fileT = info.file;
                            fileT.status = "done";

                            dispatch(addCertificate({
                                fileList: fileT,
                                certificate: {
                                    name: info.file.name,
                                    uri: result,
                                    uid: info.file.uid,
                                    type: info.file.type
                                }
                            }))
                        });
                }
            } else {
                setIsMaxSizeUpload(true);
            }

            if (info.file.status === 'removed') {
                dispatch(removeCertificate(info.file))
            }
        },
        onRemove(file) {
            dispatch(removeCertificate(file))
        },
    };

    useEffect(() => {
        const updatedCheckboxes = {};
        setSkillsCheckboxes(Object.keys(categories).map(category => updatedCheckboxes[category] = false));

        if (Object.keys(tempSkills || {}).length) {
            setLocalCategories(tempSkills || {})
        } else {
            const localCategories = {};

            Object.keys(categories).forEach(categoryKey => {
                localCategories[categoryKey] = [...categories[categoryKey]]
            });

            setLocalCategories(localCategories)
        }
    }, []);

    const handleRemoveLanguage = (event, removedTag) => {
        event.preventDefault();

        setTempSelectedLanguages(tempSelectedLanguages.filter(tag => tag !== removedTag));
        setSelectedLanguages(selectedLanguages.filter(tag => tag !== removedTag))
    };

    const handleRemoveSkill = (event, removedTag, index, skill) => {
        console.log('remove');

        event.preventDefault();

        const updatedSelectedSkills = {...selectedSkills};
        updatedSelectedSkills[skill].splice(index, 1);

        if (skill !== 'other') {
            const updatedTempSelectedSkills = {...localCategories};

            let indexOfTempSkill = 0;

            updatedTempSelectedSkills[skill].forEach((tempSkill, index) => {
                if (tempSkill.id === removedTag.id) {
                    indexOfTempSkill = index
                }
            });

            if (indexOfTempSkill >= 0) {
                updatedTempSelectedSkills[skill][indexOfTempSkill].checked = false;
            }

            // console.log(updatedSelectedSkills);

            const updatedCheckboxes = {...skillsCheckboxes};
            updatedCheckboxes[skill] = false;

            setLocalCategories(updatedTempSelectedSkills);
            setSelectedSkills(updatedSelectedSkills);
            setSkillsCheckboxes(updatedCheckboxes);
        } else {
            setSelectedSkills(updatedSelectedSkills);
        }
    };

    const checkSkill = async (categorykey, subCategoryIndex) => {
        const updatedCategories = {};

        Object.keys(categories).map(categoryKey => {
            updatedCategories[categoryKey] = [...localCategories[categoryKey]]
        });

        updatedCategories[categorykey][subCategoryIndex] = {
            ...updatedCategories[categorykey][subCategoryIndex],
            checked: !updatedCategories[categorykey][subCategoryIndex].checked
        };

        await setLocalCategories(updatedCategories);

        console.log(categorykey, subCategoryIndex);

        // setSelectedSkills(updatedCategories);
        handleAddSkillsButton(categorykey, subCategoryIndex);
    };
    const handleAddSkillsButtonAll = () => {
        let nextSelectedSkills = {...selectedSkills};

        Object.keys(localCategories).forEach((categoryKey, index) => {
            nextSelectedSkills[categoryKey] = [];
            localCategories[categoryKey].forEach(subCategory => {
                if (subCategory.checked) {
                    nextSelectedSkills[categoryKey] = [...nextSelectedSkills[categoryKey], subCategory]
                }
            })
        });

        setSelectedSkills(nextSelectedSkills);
        // setSkillsModalShow(false);
    };
    const handleAddSkillsButton = (categoryKey, subCategoryIndex) => {

        let nextSelectedSkills = {...selectedSkills}
        const subCategoryId = localCategories[categoryKey][subCategoryIndex];

        if (nextSelectedSkills[categoryKey]) {
            const isExist = nextSelectedSkills[categoryKey].some(subCategory => {
                console.log(subCategory.id, subCategoryId);

                return subCategory.id === subCategoryId.id
            });

            if (isExist) {
                nextSelectedSkills[categoryKey] = nextSelectedSkills[categoryKey].filter((subCategory) => {
                    return subCategory.id !== subCategoryId.id
                })
            } else {
                nextSelectedSkills[categoryKey].push(localCategories[categoryKey][subCategoryIndex]);
            }


        } else {
            nextSelectedSkills[categoryKey] = []
            nextSelectedSkills[categoryKey].push(localCategories[categoryKey][subCategoryIndex]);

        }
        setSelectedSkills(nextSelectedSkills);

        // nextSelectedSkills[categoryKey]= nextSelectedSkills[categoryKey] && [];
        //
        // nextSelectedSkills[categoryKey].push(localCategories[categoryKey][subCategoryIndex]);


        //
        // Object.keys(localCategories).forEach((categoryKey, index) => {
        //     nextSelectedSkills[categoryKey] = [];
        //     localCategories[categoryKey].forEach(subCategory => {
        //         if (subCategory.checked) {
        //             nextSelectedSkills[categoryKey] = [...nextSelectedSkills[categoryKey], subCategory]
        //         }
        //     })
        // });

        setSelectedSkills(nextSelectedSkills);
        // setSkillsModalShow(false);
    };

    const handleAddLanguagesButton = () => {
        setSelectedLanguages([...tempSelectedLanguages]);
        setModalShow(false);
    };

    // const handleOnSkillSelect = (value, categoryKey) => {
    //     const nextSelectedSkills = {...tempSelectedSkills};
    //
    //     if (nextSelectedSkills[categoryKey]) {
    //         nextSelectedSkills[categoryKey] = [...nextSelectedSkills[categoryKey], value];
    //     } else {
    //         nextSelectedSkills[categoryKey] = [value];
    //     }
    //
    //     setTempSelectedSkills(nextSelectedSkills)
    // };
    //
    // const handleOnSkillDeselect = (value, categoryKey) => {
    //     const nextSelectedSkills = {...tempSelectedSkills};
    //     nextSelectedSkills[categoryKey] = tempSelectedSkills[categoryKey].filter(skill => skill.key !== value.key);
    //
    //     setTempSelectedSkills(nextSelectedSkills)
    // };

    const handleOnLanguageSelect = (value) => {
        setTempSelectedLanguages([...tempSelectedLanguages, value])
    };

    const handleOnLanguageDeselect = (value) => {
        const nextSelectedLanguages = tempSelectedLanguages.filter(language => language.key !== value.key);

        setTempSelectedLanguages(nextSelectedLanguages)
    };

    const checkAllSubCategories = (categoryKey) => {
        const nextSelectedSkills = {...localCategories};

        nextSelectedSkills[categoryKey].forEach((subCategory, index) => {
            nextSelectedSkills[categoryKey][index].checked = true
        });

        setLocalCategories(nextSelectedSkills);

        const updatedSkillsCheckboxes = {...skillsCheckboxes};
        updatedSkillsCheckboxes[categoryKey] = true;
        setSkillsCheckboxes(updatedSkillsCheckboxes)
    };

    const uncheckAllSubCategories = (categoryKey) => {
        const nextSelectedSkills = {...localCategories};

        nextSelectedSkills[categoryKey].forEach((subCategory, index) => {
            nextSelectedSkills[categoryKey][index].checked = false
        });

        skillsCheckboxes[categoryKey] = false;
        setLocalCategories(nextSelectedSkills)
    };

    const handleCheckAllClick = (event, subSkill) => {
        if (event.target.checked) {
            checkAllSubCategories(subSkill)
        } else {
            uncheckAllSubCategories(subSkill)
        }
        // console.log(888888);
        //
        handleAddSkillsButtonAll()
    };

    const handleBackButtonClick = () => {
        dispatch(addData({currentPage: "/description", currentStep: 3}));
        navigate("/registration/description")
    };

    const handleCheckCheckBox = (key, event) => {
        const updatedCheckboxes = {...skillsCheckboxes};

        event.target.checked = !updatedCheckboxes[key];
        updatedCheckboxes[key] = !updatedCheckboxes[key];

        setSkillsCheckboxes(updatedCheckboxes)
    };

    const handleAddOtherSkill = (otherSkill) => {
        const nextSelectedSkills = {...selectedSkills};
        if (!nextSelectedSkills.other) {
            nextSelectedSkills.other = [];
        }

        const foundSkill = nextSelectedSkills.other.find(skill => skill.name === otherSkill);
        if (!foundSkill) {
            nextSelectedSkills.other.push({
                id: `other${nextSelectedSkills.other.length + 1}`,
                name: otherSkill,
            });
            setSelectedSkills(nextSelectedSkills);
        }
    };

    const isContinueButtonDisabled = () => {
        return formik.values.experience;
    };


    const handleContinueButtonClick = () => {
        formik.validateForm().then(async (errors) => {
            if (fieldsIsValid(errors)) {
                const arrayOfSkillIds = [];

                Object.keys(selectedSkills).forEach(skillKey => {
                    selectedSkills[skillKey].forEach(subSkill => {
                        arrayOfSkillIds.push(subSkill.id)
                    })
                });

                const updatedCategories = [...new Set(arrayOfSkillIds)];

                const languages = selectedLanguages.length ?
                    "en," + selectedLanguages.map(language => language.key).join() :
                    "en";

                const payload = {
                    currentPage: "/available-dates",
                    currentStep: 5,
                    data: {
                        languages,
                        subCategories: updatedCategories,
                        experience: formik.values.experience,
                        education: formik.values.education,
                    },
                    languages: selectedLanguages,
                    tempLanguages: tempSelectedLanguages,
                    tempSkills: localCategories,
                    skills: selectedSkills,
                };
                console.log("localCategories", localCategories);


                dispatch(addData(payload));
                navigate("/registration/available-dates");

                formik.resetForm()
            }
        })
    };

    return (
        <StyledRow type="flex" justify="start">

            <Label>Experience*</Label>

            <Tooltip
                placement={"right"}
                zIndex={0}
                title={formik.errors.experience}
                visible={!!formik.errors.experience}
            >
                <StyledYearsField
                    type="number"
                    name="experience"
                    min={0}
                    placeholder="0"
                />
            </Tooltip>
            <YearsText>years</YearsText>

            <StyledCol span={24}>
                <ExpertSkills
                    selectedSkills={selectedSkills}
                    setSkillsModalShow={setSkillsModalShow}
                    removeSkill={handleRemoveSkill}
                />
            </StyledCol>

            <StyledCol span={24}>
                <SelectedLanguages
                    selectedLanguages={selectedLanguages}
                    setModalShow={setModalShow}
                    removeLanguage={handleRemoveLanguage}
                />
            </StyledCol>

            <Wrapper>
                <Label>Education</Label>

                <EducationSelect
                    placeholder="Please choose one"
                    onChange={(value) => formik.setFieldValue("education", educationOptions[value])}
                    style={{width: "100%", height: "40px"}}
                    value={formik.values.education}
                >
                    {educationOptions.map((educationOption, index) => {
                        return <Option key={educationOption} value={index}>{educationOption}</Option>
                    })}
                </EducationSelect>
            </Wrapper>

            <CertificationTypographyWrap span={6} style={{marginTop: 26}}>
                <Label style={{display: "block", marginBottom: "auto"}}>
                    Certifications <br/>
                </Label>
                <CertificationExt>(.jpeg, .png, .pdf)</CertificationExt>
            </CertificationTypographyWrap>

            <StyledCol span={18} style={{marginTop: 26}}>
                <StyledUpload
                    {...props}
                    fileList={certificatesList}
                    accept=".pdf, image/png, image/jpeg"
                >

                    <StyledUploadButton type="primary">
                        Upload
                    </StyledUploadButton>

                    <Tooltip
                        placement={"left"}
                        zIndex={0}
                        title='max size 5M'
                        visible={isMaxSizeUpload}
                    />
                </StyledUpload>
            </StyledCol>

            <Col span={24}>
                <Row type="flex" justify="space-between" style={{width: "100%"}}>
                    <Col>
                        <StepsButtons type="primary" size="large" onClick={handleBackButtonClick}>
                            <Icon type="left"/>
                            Back
                        </StepsButtons>
                    </Col>
                    <Col>
                        <StepsButtons
                            type="primary"
                            size="large"
                            onClick={handleContinueButtonClick}
                            disabled={!isContinueButtonDisabled()}
                            // disabled={!(Object.keys(selectedSkills).length && formik.values.experience)}
                        >
                            Continue
                            <Icon type="right"/>
                        </StepsButtons>
                    </Col>
                </Row>
            </Col>

            <LanguagesModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                tempSelectedLanguages={tempSelectedLanguages}
                addLanguagesButton={handleAddLanguagesButton}
                onLanguageSelect={handleOnLanguageSelect}
                onLanguageDeselect={handleOnLanguageDeselect}
            />

            <SkillsModal
                skillsModalShow={skillsModalShow}
                setSkillsModalShow={setSkillsModalShow}
                categories={categories}
                tempSelectedSkills={localCategories}
                addSkillsButton={handleAddSkillsButton}
                checkAllClick={handleCheckAllClick}
                // onSkillSelect={handleOnSkillSelect}
                // onSkillDeselect={handleOnSkillDeselect}
                skillsCheckboxes={skillsCheckboxes}
                checkCheckbox={handleCheckCheckBox}
                checkSkill={checkSkill}
                addOtherSkill={handleAddOtherSkill}
            />
        </StyledRow>
    );
};

export default connect(SkillLanguagesExperience);
