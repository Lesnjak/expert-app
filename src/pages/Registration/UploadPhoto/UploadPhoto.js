import React from 'react';
import {Button, Col, Icon, Row, Upload} from "antd";
import {ReactComponent as UploadIcon} from "./icon.svg"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addData} from "../../../store/registration/actions";
import {navigate} from "@reach/router";
import {generateName, toBase64} from "../../../utils/utils";

const {Dragger} = Upload;

const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0)
};

let file = null;

const UploadPhoto = () => {
    const {avatar} = useSelector(state => state.registration);
    const dispatch = useDispatch();

    const props = {
        name: 'file',
        multiple: false,
        customRequest: dummyRequest,
        onChange(info) {
            const {status} = info.file;

            if (status === 'done') {
                file = info.file.originFileObj;
                if (file) {
                    toBase64(file).then(res => {
                            const data = {
                                currentPage: "/upload-photo",
                                currentStep: 1,
                                avatar: {
                                    uri: file,
                                    localUri: res,
                                    name: generateName(10) + file.name,
                                    type: file.type
                                }
                            };

                            dispatch(addData(data))
                        }
                    )
                }
            }
        },
    };

    const handleBackButtonClick = () => {
        dispatch(addData({currentPage: "/basic-information", currentStep: 0}));
        navigate("/registration/basic-information")
    };

    const handleContinueButtonClick = () => {
        let data = {
            currentPage: "/full-details",
            currentStep: 2
        };

        dispatch(addData(data));
        navigate("/registration/full-details")
    };

    return (
        <StyledRow>
            <UploadWrapper span={24}>
                <StyledDragger {...props} accept="image/*" showUploadList={false}>
                    <p className="ant-upload-drag-icon">
                        {avatar.localUri ? (
                            <UploadedImage src={avatar.localUri} alt=""/>
                        ) : (
                            <StyledIcon/>
                        )}
                    </p>
                    <p className="ant-upload-text">Upload your photo</p>
                    <p className="ant-upload-hint">
                        {/*so peoples can see you*/}
                        Build trust and a better connection with clients
                    </p>
                    <StyledButton>Browse</StyledButton>
                    <p className="ant-upload-hint">
                        or drag & drop
                    </p>
                </StyledDragger>,
            </UploadWrapper>

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
                            disabled={!avatar.uri}
                        >
                            Continue
                            <Icon type="right"/>
                        </StepsButtons>
                    </Col>
                </Row>
            </Col>
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
  height: 65vh;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 50px;
  
  @media(max-height: 800px) {
      padding-top: 25px;
  }
`;

const UploadWrapper = styled(Col)`
  height: 60%;
  
  @media(max-height: 800px) {
    height: 70%;      
  }
`;

const StyledIcon = styled(UploadIcon)`
  height: 100px;
`;

const UploadedImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 100px;
`;

const StyledDragger = styled(Dragger)`  
    .ant-upload.ant-upload-drag {
      border: 1px dashed #5A8DF4;
    }
    
    .ant-upload.ant-upload-drag .ant-upload {
      padding-top: 28px;
      padding-bottom: 18px;
    }
    
    .ant-upload.ant-upload-drag p.ant-upload-text {
      font-weight: bold;
      font-size: 20px;
    }
    
    .ant-upload.ant-upload-drag p.ant-upload-hint  {
      font-size: 14px;
      color: #333333;
    }
    
    @media(max-height: 900px) {
        .ant-upload.ant-upload-drag .ant-upload {
          padding-top: 14px;
          padding-bottom: 9px;
        }
    
        .ant-upload.ant-upload-drag p.ant-upload-text {
          font-weight: bold;
          font-size: 16px;
        }
        
        .ant-upload.ant-upload-drag p.ant-upload-hint  {
          font-size: 12px;
          color: #333333;
        }
    }
`;

const StepsButtons = styled(Button)`
   width: 152px;
   box-shadow: 0 20px 25px rgba(90, 141, 244, 0.16), 0 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   margin-top: 40px;
   
   @media(max-height: 900px) {
       height: 40px;
       margin-top: 40px;
       font-size: 14px;
   }
`;

const StyledButton = styled(Button)`
    background-color: rgba(90, 141, 244, 0.1) !important; 
    border:none !important;
    width: 184px;
    margin-bottom: 17px;
    margin-top: 27px;
    
    span {
      color: #5A8DF4;
    }
    
    @media(max-height: 900px) {
        height: 32px;
        margin-bottom: 8px;
        margin-top: 13px;
    }
`;

export default UploadPhoto;