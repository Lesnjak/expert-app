import React, {useEffect} from 'react';
import styled from "styled-components";
import MainBlock from "../../components/MainBlock/MainBlock";
import {Col, Row} from "antd";
import Steps from "../../components/Steps/Steps";
import {useDispatch, useSelector} from "react-redux";
import {navigate} from "@reach/router";
import api from "../../api";
import {addCategories} from "../../store/categories/actions";
import {generateName} from "../../utils/utils";
import {Formik} from "formik";
import {uploadUserFiles} from "../../utils/awsFileUpload";
import {addData} from "../../store/registration/actions";
import sortBy from "lodash/sortBy";
import * as Yup from "yup"

const steps = [
    "Basic Information",
    "Upload Your Photo",
    "Full Details",
    "Description",
    "My Specialties",
    "Working Hours"
    // "Available Dates"
];

const validationSchema = Yup.object().shape({
    nickname: Yup.string()
        .min(3, "The field should contain at least 3 characters")
        .max(70, "The field should contain at max 70 characters")
        .required(),
    email: Yup.string()
    // .matches(/^[a-zA-z'-]+$/, 'should contain only latin characters')
        .matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            'Not valid e-mail')
        .max(70)
        .required("this field is required"),
    pass: Yup.string()
        .trim()
        .min(8, "The field should contain at least 8 characters")
        .matches(/(?=.[!@#\$%\^&])|(?=.*[0-9])/, 'at least one number or sign')
        .required(),
    // country: Yup.string()
    //     .matches(/^[a-zA-z'-]+$/, 'should contain only latin characters')
    //     .min(3, "The field should contain at least 3 characters")
    //     .max(70, "The field should contain at least 3 characters")
    //     .required(),
    address: Yup.string()
        .trim()
        // .matches(/^[a-zA-z0-9\s]+$/, 'should contain only latin characters')
        .min(3, "The field should contain at least 3 characters")
        .max(25, "The field should contain at max 25 characters")
        .required(),
    address2: Yup.string()
        .trim()
        // .matches(/^[a-zA-z0-9\s]+$/, 'should contain only latin characters')
        .min(3, "The field should contain at least 3 characters")
        .max(25, "The field should contain at max 25 characters"),
    city: Yup.string()
        .trim()
        // .matches(/^[a-zA-z0-9\s]+$/, 'should contain only latin characters')
        .min(3, "The field should contain at least 3 characters")
        .max(70, "The field should contain at max 70 characters")
        .required(),
    // zip: Yup.string()
    //     .matches(/^[a-zA-z0-9\s]+$/, 'should contain only numbers'),
        // .max(5, "The field should contain no more than 5 characters"),
    // state: Yup.string()
    //     .matches(/^[a-zA-z'-]+$/, 'should contain only latin characters')
    //     .min(3, "The field should contain at least 3 characters")
    //     .max(70, "The field should contain at max 70 characters")
    //     .required(),
    phone: Yup.string()
        // .matches(/^[+0-9]+$/, 'invalid phone number')
        .min(1, "The field should contain 10 characters"),
    // .max(10, "The field should contain 10 characters"),
    description: Yup.string()
        .trim()
        .min(20, "Minimum numbers of characters 20")
        .max(10000, "Maximum numbers of characters 10000.")
        .required(),
    experience: Yup.number()
        .typeError("should contain only numbers")
        .max(50, "The maximum value is 50")
        .min(0, "The minimum value is 0")
        .required(),
    price: Yup.number("should contain only numbers")
        .typeError("should contain only numbers")
        .min(1, "The minimum value is 1")
        .required(),
});


const Registration = ({children, location}) => {
    const {currentStep, currentPage, avatar, userData, certificates, availableDates} = useSelector(state => state.registration);
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === "/registration/account-created") {
            return;
        }
        const randomToken = generateName(20);

        let subCategories = null;
        let categories = null;

        api.anonymRegister(randomToken).then(async response => {
            const token = response.data.token;
            // subCategories = await api.getSubCategories(token);
            categories = await api.getCategories(token);


            ////////////////////sorted bu alphabet///////////////////////
            const sortedCategories = sortBy(categories.data,(category) => {
                category.subCategories = sortBy(category.subCategories, (subCategory) => subCategory.name);
                return category.name
            });
            ////////////////////finished sorted bu alphabet///////////////////////

            dispatch(addCategories({
                categories: sortedCategories,
                // subCategories: subCategories.data
            }));
            dispatch(addData({anonymousToken: token}))
        });

        navigate(`/registration${currentPage}`)
    }, []);

    const handleStartAgainClick = (e) => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <StyledRow type="flex" justify="space-between">
            <StyledCol span={8}>
                <FormWrapper>
                    <StyledTitle>Registration</StyledTitle>

                    {currentStep < 6 && location.pathname !== "/registration/account-created" &&
                    <Steps steps={steps} current={currentStep}/>}
                    <Wrapper>
                        <Formik
                            initialValues={{...userData}}
                            validationSchema={validationSchema}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={(values) => {
                                api.register({
                                    nickname: userData.nickname,
                                    email: userData.email,
                                    pass: userData.pass
                                }).then(response => {
                                    const token = response.data.token;
                                    const aws = response.data.aws;
                                    const cognitoIdentity = response.data.cognitoIdentity;

                                    api.updateUserData(userData, token)
                                        .then(response => {
                                            console.log("UPDATE USER RESPONSE = ", response);
                                        })
                                        .catch(error => {
                                            console.log("UPDATE USER ERROR = ", error);
                                        });

                                    const datesData = {
                                        name: values.nickname,
                                        timezone: values.timezone,
                                        availability: availableDates
                                    };

                                    api.setAvailableDates(datesData, token)
                                        .then(response => {
                                            console.log("AVAILABLE DATES RESPONSE = ", response);
                                        })
                                        .catch(error => {
                                            console.log("AVAILABLE DATES ERROR = ", error)
                                        });
                                    const filename = `${response.data.user.id}-${avatar.name}`;
                                    const updatedAvatar = {
                                        ...avatar,
                                        name: filename,
                                    }
                                    uploadUserFiles(aws, cognitoIdentity, values, updatedAvatar, certificates);
                                    
                                    const avatarData = {
                                        filename,
                                        uri: `https://${aws.uploadsBucket}.s3-${aws.awsRegion}.amazonaws.com/public/avatars/${filename}`,
                                        token
                                    };

                                    api.setAvatar(avatarData, token);
                                    certificates.forEach((certificate) => {
                                        api.setDocuments({
                                            uri: certificate.name,
                                            filename: certificate.name
                                        }, token);
                                    });
                                });

                                dispatch(addData({
                                    currentPage: "/account-created",
                                    currentStep: 6,
                                    data: {
                                        pass: ""
                                    }
                                }));
                                navigate("/registration/account-created")
                            }}
                        >
                            {() => <>{children}</>}
                        </Formik>
                    </Wrapper>
                    <StyledButton onClick={handleStartAgainClick}>Start again</StyledButton>
                </FormWrapper>
            </StyledCol>

            <RightSide>
                <MainBlock/>
            </RightSide>
        </StyledRow>
    );
};

const Wrapper = styled.div`
  height: 65%;
`;

const StyledCol = styled(Col)`
  min-width: 637px;
`;

const RightSide = styled.div`
  width: 100%;
`;

const StyledRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;

const StyledButton = styled.a`
    position: absolute;
    bottom: 15px;
    left: 15px;
`;

const StyledTitle = styled.h1`
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 58px;
    color: #5A8DF4;
    margin-bottom: 0;
    text-shadow: 0 20px 25px rgba(90, 141, 244, 0.16), 0 10px 10px rgba(0, 0, 0, 0.04);
    
    @media(max-height: 800px) {
        font-size: 42px;
   }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  min-width: 547px;
  padding:60px 64px 60px;
  
  @media(max-height: 900px) {
  }
  
  @media(max-height: 800px) {
  padding:40px 64px 40px;
  }
`;

export default Registration;
