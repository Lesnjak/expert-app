import React, {useState} from 'react';
import {addData, removeState} from "../../../store/registration/actions";
import {navigate} from "@reach/router";
import {connect, Field} from "formik";
import {Button, Col, Icon, Row, Select, Tooltip} from "antd";
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {countries} from "../../../countries";
import {states} from "../../../states";
import lipPhoneNumber from "google-libphonenumber"

const fields = [
    // {
    //     label: "Country*",
    //     name: "country",
    //     placeholder: "Ukraine",
    //     type: "text"
    // },
    {
        label: "Address*",
        name: "address",
        placeholder: "Fake St 156/A4",
        type: "text"
    },
    {
        label: "Address 2",
        name: "address2",
        placeholder: "None",
        type: "text"
    },
    {
        label: "City*",
        name: "city",
        placeholder: "Lviv",
        type: "text"
    },
    {
        label: "ZIP Code",
        name: "zip",
        placeholder: "80020",
        type: "text"
    },
    // {
    //     label: "State*",
    //     name: "state",
    //     placeholder: "Lviv",
    //     type: "text"
    // },
    {
        label: "Phone Number",
        name: "phone",
        placeholder: "+38 063-123-45-67",
        type: "text",
        // minLength: 8,
        // maxLength: 8
    },
];

const FontSize = css`
  font-size: 16px;
  
  @media(max-height: 900px) {
      height: 23px;
      font-size: 14px;
  }
`;

const StyledRow = styled(Row)` 
  font-weight: 600;
  font-size: 15px;
  color: #424242;
  padding-top: 60px;
  
  @media(max-height: 900px) {
      padding-top: 45px;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  height: 25px;
  
  @media(max-height: 900px) {
      height: 23px;
      margin-bottom: 20px;
  }
`;

const Label = styled.p` 
  font-weight: 400;
  ${FontSize};
  color: #333333;
  margin-bottom: 0;
  line-height: 30px;
  
  @media(max-height: 900px) {
      height: 23px;
  }
`;

const StyledField = styled(Field)`
   ${FontSize};
   width: 100%;
   
   border-bottom: 1px solid rgba(119, 119, 119, 0.3); // 333333 30%
   border-top-style: none;
   border-right-style: none;
   border-left-style: none;
   position:relative;
   font-weight: normal;
   
   &:first-child {
    padding-right: 50px;
   }
   
   &:focus {
    outline: none;
   }
   
   @media(max-height: 900px) {
      height: 23px;
  }
`;

const StepsButtons = styled(Button)`
   margin-top: 40px;
   width: 152px;
   box-shadow: 0 20px 25px rgba(90, 141, 244, 0.16), 0 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   
   @media(max-height: 900px) {
      height: 40px;
      font-size: 16px;
      margin-top: 40px;
  }
`;


const fieldsIsValid = (errors, values) => {
    if (values.country === "United States") {
        return (
            // !errors.country
            !errors.address
            && !errors.address2
            && !errors.address2
            && !errors.city
            && !errors.zip
            // && !errors.state
            && !errors.phone
        )
    }
    return (
        // !errors.country
        !errors.address
        && !errors.address2
        && !errors.address2
        && !errors.city
        && !errors.zip
        && !errors.phone
    )
};

const isPhoneValid = (phoneNumber, region) => {
    const phoneNumberUtil = lipPhoneNumber.PhoneNumberUtil.getInstance();

    const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, region);

    if (!phoneNumberUtil.isPossibleNumber(parsedPhoneNumber)) return false;
    if (!phoneNumberUtil.isValidNumber(parsedPhoneNumber)) return false;

    return phoneNumberUtil.isValidNumberForRegion(parsedPhoneNumber, region)
};

const {Option} = Select;

const FullDetails = ({formik}) => {
        const {state} = useSelector(state => state.registration.userData);

        const [USState, setUSState] = useState(state ? state : states[0].name);
        // const [USState, setUSState] = useState(formik.values.state ? formik.values.state : "Alabama");

        const dispatch = useDispatch();

        const handleBackButtonClick = () => {
            dispatch(addData({currentPage: "/upload-photo", currentStep: 1}));
            navigate("/registration/upload-photo")
        };

        const handleSelectCountry = (value, option) => {
            formik.setFieldValue("country", value);
            // formik.setFieldValue
        };


        const handleContinueButtonClick = () => {
                formik.validateForm().then((errors) => {
                        if (fieldsIsValid(errors, formik.values)) {
                            if (formik.values.phone && formik.values.phone.length) {
                                const country = countries.find(country => country.name === formik.values.country)

                                console.log(formik.values.country);
                                console.log(country);

                                const data = {
                                    data: {
                                        address: formik.values.address,
                                        address2: formik.values.address2,
                                        country: formik.values.country,
                                        zip: formik.values.zip,
                                        phone: formik.values.phone,
                                        city: formik.values.city,
                                        state: formik.values.state,
                                    },
                                    currentPage: "/description",
                                    currentStep: 3
                                };

                                if (formik.values.country === "United States" && USState !== states[0].name) {
                                    data.data.state = USState
                                } else {
                                    dispatch(removeState())
                                }

                                console.log(data);

                                dispatch(addData(data));
                                navigate("/registration/description");

                                formik.resetForm()
                            } else {
                                const country = countries.find(country => country.name === formik.values.country);

                                console.log(country);

                                const data = {
                                    data: {
                                        address: formik.values.address,
                                        address2: formik.values.address2,
                                        country: formik.values.country,
                                        zip: formik.values.zip,
                                        city: formik.values.city
                                    },
                                    currentPage: "/description",
                                    currentStep: 3
                                };

                                if (formik.values.country === "United States" && USState !== states[0].name) {
                                    data.data.state = USState
                                } else {
                                    dispatch(removeState())
                                }

                                dispatch(addData(data));
                                navigate("/registration/description");

                                formik.resetForm()

                            }
                        }
                    }
                )
            }
        ;

        return (
            <StyledRow>
                <StyledCol span={7}>
                    <Label>Country</Label>
                </StyledCol>


                <StyledCol span={17}>
                    <Select
                        showSearch
                        style={{width: "100%"}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        defaultValue={formik.values.country}
                        // labelInValue
                        onChange={(value, option) => handleSelectCountry(value)}
                        size="large"
                    >
                        {countries.map((country, index) => (
                            <Option key={index} value={country.name}>{country.name}</Option>
                        ))}
                    </Select>
                </StyledCol>




                {fields.map(field => {
                    console.log(field.name);
                    //
                    // if (field.name === "zip") {
                    //     return <div>;ldsk;ldfsk;</div>
                    // }

                    return (
                        <>
                        <>
                            <StyledCol span={7}>
                                <Label>{field.label}</Label>
                            </StyledCol>

                            <StyledCol span={17}>
                                <Tooltip
                                    placement={"right"}
                                    title={formik.errors[field.name]}
                                    visible={!!formik.errors[field.name]}
                                >
                                    <StyledField name={field.name}
                                                 onKeyUp={() => formik.setFieldTouched(field.name, true)}/>
                                </Tooltip>
                            </StyledCol>
                        </>


                                {formik.values.country === "United States" && field.name === "city" && (
                                        <>
                                            <StyledCol span={7}>
                                                <Label>State</Label>
                                            </StyledCol>

                                            <StyledCol span={17}>
                                                <Select
                                                    showSearch
                                                    style={{width: "100%"}}
                                                    placeholder="Select a state"
                                                    optionFilterProp="children"
                                                    value={USState}
                                                    // defaultValue={USState}

                                                    onChange={(value) => setUSState(value)}
                                                    size="large"
                                                >
                                                    {states.map((state, index) => (
                                                        <Option key={index} value={state.name}>{state.name}</Option>
                                                    ))}
                                                </Select>
                                            </StyledCol>
                                        </>
                                    )}

                        </>)
                })}

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
                                disabled={!(formik.values.city && formik.values.address)}
                            >
                                Continue
                                <Icon type="right"/>
                            </StepsButtons>
                        </Col>
                    </Row>
                </Col>
            </StyledRow>
        );
    }
;

export default connect(FullDetails);
