import React, {useState} from 'react';
import {connect, Field, Form} from "formik";
import {Button, Checkbox, Col, Icon, Row, Select, TimePicker, Tooltip} from "antd";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import moment from "moment";
import {addData} from "../../../store/registration/actions";
import {timezones} from "../../../timezones";
import {navigate} from "@reach/router";
import {pick} from "@reach/router/lib/utils";

const format = "h:mm A";
const {Option} = Select;

const start = "8:00";
const end = "20:00";
const endHour = 23;

// const start = moment({hour: 8, minute: 0});
// start.set({hour: 8, minute: 0});

// const end = moment({hour: 20, minute: 0});
// end.set({hour: 20, minute: 0});

const weekdaysStart = moment();
const weekdaysEnd = moment();
weekdaysStart.set({hour: 9, minute: 0});
weekdaysEnd.set({hour: 17, minute: 0});

const mockDays = [
    {
        label: "Monday",
        name: "monday",
        availability: {
            day: "monday",
            // start: start.format("H:mm"),
            start,
            end
        },
        momentAvailability: {
            day: "monday",
            // start: start.format("H:mm"),
            start,
            end
        },
        defaultValue: {start: "08:00", end: "20:00"},
        isAvailable: true,
        disabledHours: {
            start: 8,
            end: 20
        },
        disabledMinutes: {
            start: 0,
            end: 0
        },
    },
    {
        label: "Tuesday",
        name: "tuesday",
        availability: {
            day: "tuesday",
            start,
            end
        },
        defaultValue: {start: "08:00", end: "20:00"},
        isAvailable: true,
        disabledHours: {
            start: [],
            end: []
        },
        disabledMinutes: {
            start: [],
            end: []
        },
    },
    {
        label: "Wednesday",
        name: "wednesday",
        availability: {
            day: "wednesday",
            start,
            end
        },
        defaultValue: {start: "08:00", end: "20:00"},
        isAvailable: true,
        disabledHours: {
            start: [],
            end: []
        },
        disabledMinutes: {
            start: [],
            end: []
        },
    },
    {
        label: "Thursday",
        name: "thursday",
        availability: {
            day: "thursday",
            start,
            end
        },
        defaultValue: {start: "08:00", end: "20:00"},
        isAvailable: true,
        disabledHours: {
            start: [],
            end: []
        },
        disabledMinutes: {
            start: [],
            end: []
        },
    },
    {
        label: "Friday",
        name: "friday",
        availability: {
            day: "friday",
            start,
            end
        },
        defaultValue: {start: "08:00", end: "20:00"},
        isAvailable: true,
        disabledHours: {
            start: [],
            end: []
        },
        disabledMinutes: {
            start: [],
            end: []
        },
    },
    {
        label: "Saturday",
        name: "saturday",
        availability: {
            day: "saturday",
            start: weekdaysStart.format("H:mm"),
            end: weekdaysEnd.format("H:mm")
        },
        defaultValue: {start: "09:00", end: "17:00"},
        isAvailable: false,
        disabledHours: {
            start: [],
            end: []
        },
        disabledMinutes: {
            start: [],
            end: []
        },
    },
    {
        label: "Sunday",
        name: "sunday",
        availability: {
            day: "sunday",
            start: weekdaysStart.format("H:mm"),
            end: weekdaysEnd.format("H:mm")
        },
        defaultValue: {start: "09:00", end: "17:00"},
        isAvailable: false,
        disabledHours: {
            start: [],
            end: []
        },
        disabledMinutes: {
            start: [],
            end: []
        },
    }
];

const fieldsIsValid = (errors) => {
    return (!errors.price)
};

const AvailableDates = ({formik}) => {
    const [days, setDays] = useState(mockDays);
    const [termOfUsage, setTermOfUsage] = useState(false);

    const dispatch = useDispatch();

    const convertToAvailableDates = (day) => {
        const availableDates = [];

        days.forEach((day, index) => {
            if (day.isAvailable && (day.availability.start !== undefined && day.availability.end !== undefined)) {
                availableDates.push(day.availability)
            }
        });

        return availableDates
    };

    const getNearestDate = (indexOfDay, nearestTime, pickerType, time) => {
        const day = days[indexOfDay];

        if (pickerType === 1) {
            let start = null;
            // start = nearestTime.subtract(1, "h").format("HH:mm");

            if (time.minutes() > nearestTime.minutes()) {
                start = nearestTime.subtract(2, "h").minutes(time.minutes()).format("HH:mm");
            } else {
                start = nearestTime.subtract(1, "h").minutes(time.minutes()).format("HH:mm");
            }

            return start
        } else {
            // const end = nearestTime.add(1, "h").format("HH:mm");
            let end = null;

            if (time.minutes() < nearestTime.minutes()) {
                end = nearestTime.add(2, "h").minutes(time.minutes()).format("HH:mm");
            } else {
                end = nearestTime.add(1, "h").minutes(time.minutes()).format("HH:mm");
            }

            return end;
        }
    };

    function onDateChange(time, timeString, pickerType, index) {
        const updatedDates = [...days];

        let keyName = "start";
        if (pickerType === 2) {
            keyName = "end";
        }

        // if (time && time.isValid() && time.isMoment()) return;

        if (pickerType === 1) {
            const dayAvailability = days[index].availability;
            const endTime = moment(dayAvailability.end, "HH:mm");
            let nearestDate = null;

            console.log(time.hours());

            if (moment(time).add(1, "h").isSameOrAfter(endTime) || time.hours() === 0) {
                nearestDate = getNearestDate(index, endTime, pickerType, time)
            }

            const timeCopy = moment(time);
            // if (time.hours() < 8) {
            //
            // }

            if (!nearestDate && (timeCopy.add(1, "h")).isSame(endTime, "h")) {
                if (timeCopy.minutes() > endTime.minutes()) {
                    time.minutes(endTime.minutes())
                }
            }

            if (time.hours() < 8) {
                time.hours(8)
            }

            const updatedDates = [...days];

            updatedDates[index].availability = {
                ...updatedDates[index].availability,
                day: updatedDates[index].name,
                [keyName]: nearestDate ? nearestDate : time.format("H:mm"),
            };
        } else {
            const dayAvailability = days[index].availability;
            const startTime = moment(dayAvailability.start, "HH:mm");

            let nearestDate = null;
            if (moment(time).subtract(1, "h").isSameOrBefore(startTime)) {
                nearestDate = getNearestDate(index, startTime, pickerType, time)
            }

            const timeCopy = moment(time);

            if (!nearestDate && (timeCopy.subtract(1, "h")).isSame(startTime, "h")) {
                if (timeCopy.minutes() < startTime.minutes()) {
                    time.minutes(startTime.minutes())
                }
            }

            if (time.hours() > endHour) {
                time.hours(endHour)
            }

            updatedDates[index].availability = {
                ...updatedDates[index].availability,
                day: updatedDates[index].name,
                [keyName]: nearestDate ? nearestDate : time.format("H:mm"),
            };
        }

        setDays([...updatedDates])
    }

    const calculateDisabledHours = (index, pickerType) => {
        const disabledHours = [0, 1, 2, 3, 4, 5, 6, 7];
        const day = days[index];

        if (pickerType === 1) {

            const day = days[index];

            // const hour = day.availability.end.split(":")[0];
            const end = moment(day.availability.end, "HH:mm");
            const start = moment(day.availability.start, "HH:mm").add(1, "h");

            let counterStart = 0;

            if (moment(start).add(1, "h").isAfter(end)) {
                counterStart = moment(end).subtract(1, "h").hours();
            } else {
                counterStart = end.hours()
            }
            for (let i = counterStart; i < 24; i++) {
                disabledHours.push(i)
            }

            return disabledHours
        } else {
            const hour = day.availability.start.split(":")[0];

            for (let i = 0; i <= +hour; i++) {
                disabledHours.push(i)
            }

            return disabledHours
        }
    };

    const calculateDisabledMinutes = (hour, index, pickerType) => {
        const day = days[index];

        if (pickerType === 2) {
            const time = day.availability.start.split(":");

            if (+hour - 1 === +time[0]) {
                const disabledMinutes = [];

                if (+time[1]) {
                    for (let i = 0; i < time[1]; i++) {
                        disabledMinutes.push(i)
                    }
                }

                return disabledMinutes
            }

            return []
        } else {
            const time = day.availability.end.split(":");

            if (+hour + 1 === +time[0]) {
                const disabledMinutes = [];

                for (let i = time[1]; i <= 60; i++) {
                    disabledMinutes.push(i)
                }

                return disabledMinutes
            }
        }
    };

    const checkDate = (name) => {
        const updatedDays = [...days];

        updatedDays[name].isAvailable = !updatedDays[name].isAvailable;

        setDays(updatedDays)
    };

    const handleContinueButtonClick = () => {
        formik.validateForm().then((errors) => {
            if (fieldsIsValid(errors)) {

                dispatch(addData({
                    currentPage: "/available-dates",
                    currentStep: 6,
                    data: {
                        type: 1,
                        rate: parseInt(formik.values.price, 10),
                    },
                    availableDates: convertToAvailableDates(days)
                }));

                formik.submitForm();
            }
        })
    };

    const handleBackButtonClick = () => {
        const data = {
            currentPage: "/skills-languages-experience",
            currentStep: 4
        };

        dispatch(addData(data));
        navigate("/registration/skills-languages-experience");
    };

    return (
        <Form>
            <StyledRow>
                <Header>Let people know what days and times you're working and when you're available for
                    sessions.</Header>
                {days.map(({label, name, defaultValue, disabledHours, disabledMinutes, availability}, index) => (
                    <div key={index}>
                        <StyledCol span={6}>
                            <StyledCheckbox
                                checked={days[index].isAvailable}
                                onClick={() => checkDate(index)}
                            />
                            <Label
                                style={{color: formik.values[name] ? "#5A8DF4" : "#777777",}}
                            >
                                {label}
                            </Label>
                        </StyledCol>

                        <StyledCol span={18}>
                            <TimePickerWrapper type="flex" justify="end" style={{width: "100%"}}>
                                <Col span={12}>
                                    <TimePickerLabel>Starts</TimePickerLabel>
                                    <StyledTimePicker
                                        suffixIcon={<Icon type="down"/>}
                                        size="large"
                                        format={format}
                                        disabled={!days[index].isAvailable}
                                        minuteStep={15}
                                        onChange={(time, timeString) => onDateChange(time, timeString, 1, index)}
                                        style={{width: 138}}
                                        defaultValue={moment(defaultValue.start, format)}
                                        use12Hours
                                        // value={moment({hour: 8, monute: 0})}
                                        value={moment(availability.start, "H:mm")}
                                        // value={moment("10:00", "h:mm")}
                                        // value={moment(availability.start)}
                                        // disabledHours={() => [1, 2, 3]}
                                        disabledHours={() => calculateDisabledHours(index, 1)}
                                        disabledMinutes={(hour) => calculateDisabledMinutes(hour, index, 1)}
                                        allowClear={false}
                                        inputReadOnly
                                    />
                                </Col>

                                {/*{console.log(disabledHours.end)}*/}

                                <Col span={12}>
                                    <TimePickerLabel style={{marginLeft: 10}}>Ends</TimePickerLabel>
                                    <StyledTimePicker
                                        suffixIcon={<Icon type="down"/>}
                                        size="large"
                                        format={format}
                                        disabled={!days[index].isAvailable}
                                        minuteStep={15}
                                        style={{borderRadius: "8px", width: 138}}
                                        onChange={(time, timeString) => onDateChange(time, timeString, 2, index)}
                                        defaultValue={moment(defaultValue.end, format)}
                                        // value={availability.end}
                                        // value={moment(availability.end)}
                                        use12Hours
                                        value={moment(availability.end, "H:mm")}
                                        // disabledHours={() => disabledHours.end}
                                        disabledHours={() => calculateDisabledHours(index, 2)}
                                        disabledMinutes={(hour) => calculateDisabledMinutes(hour, index, 2)}
                                        allowClear={false}
                                        inputReadOnly
                                    />
                                </Col>
                            </TimePickerWrapper>
                        </StyledCol>
                    </div>
                ))}

                <StyledCol span={6} style={{height: 30}}>
                    <Label style={{marginLeft: 0}}>
                        Timezone
                    </Label>
                </StyledCol>
                <StyledCol span={18}>
                    <Select
                        defaultValue={timezones[4].label}
                        onChange={(value) => formik.setFieldValue("timezone", value)}
                    >
                        {timezones.map((timezone, index) => (
                            <Option key={index} value={timezone.value}>{timezone.label}</Option>
                        ))}
                    </Select>
                </StyledCol>

                <SessionInfoCol span={24}>
                    <span>Session information</span>
                </SessionInfoCol>
                <StyledCol span={24}>
                    <Row type="flex" justify="space-between" style={{width: "100%"}}>
                        <Col span={12}>
                            <Row style={{width: "100%"}} type="flex" justify="start">
                                <Col span={5}>
                                    <SessionInformationLabel style={{color: "#5A8DF4"}}>Price*</SessionInformationLabel>
                                </Col>
                                <Col span={2}>
                                    <SessionInformationLabel>$</SessionInformationLabel>
                                </Col>
                                <Col span={14}>
                                    <Tooltip
                                        placement={"right"}
                                        title={formik.errors.price}
                                        visible={!!formik.errors.price && !formik.touched.price}
                                    >
                                        <StyledField
                                            name="price"
                                            placeholder="0"
                                            type="text"
                                            min={0}
                                        />
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row style={{width: "100%"}} type="flex" justify="space-between">
                                <SessionInformationLabel style={{color: "#5A8DF4"}}>
                                    At the moment all sessions length are pre-set to 60min.
                                </SessionInformationLabel>
                            </Row>
                        </Col>
                    </Row>
                </StyledCol>

                <StyledCol span={24}>
                    <StyledCheckbox
                        defaultChecked={true}
                        checked={termOfUsage}
                        onClick={() => setTermOfUsage(!termOfUsage)}
                    />
                    <TermsOfUse style={{
                        lineHeight: "48px",
                        marginBottom: 0,
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: 300,
                        color: "#333333",
                        textAlign: "right"
                    }}>
                        I Agree To &nbsp;
                        <TermsOfUseLink
                            href="https://topx.team/terms-of-use-expert.html"
                            target="_blank"
                        >
                            Terms of Use
                        </TermsOfUseLink>
                    </TermsOfUse>
                    {/*<StyledContinueButton*/}
                    {/*    type="primary"*/}
                    {/*    size="large"*/}
                    {/*    onClick={handleContinueButtonClick}*/}
                    {/*    disabled={!termOfUsage || !formik.values.price}*/}
                    {/*>*/}
                    {/*    Continue*/}
                    {/*    <Icon type="right"/>*/}
                    {/*</StyledContinueButton>*/}
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
                                disabled={!termOfUsage || !formik.values.price}
                            >
                                Continue
                                <Icon type="right"/>
                            </StepsButtons>
                        </Col>
                    </Row>
                </Col>
            </StyledRow>
        </Form>

    );
};

const Header = styled.h2`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 0;
`;

const StepsButtons = styled(Button)`
   width: 152px;
   box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   //margin-top: 40px;
   
   @media(max-height: 900px) {
       height: 40px;
       font-size: 16px;
       //margin-top: 40px;
   }
`;

const StyledRow = styled(Row)`
  width: 100%; 
  font-weight: 600;
  font-size: 15px;
  color: #424242;
  height: 100%;
  padding-top: 5px;
    
  @media(max-height: 900px) {
  padding-top: 10px;
  }
`;

const Label = styled.label`
  margin-left: 9px;
  line-height: 40px;
  
    @media(min-height: 1199px) {
      line-height: 50px;
        font-size: 18px;
      }
  } 
  
  @media(max-height: 900px) {
      line-height: 35px;
      font-size: 14px;
  }
  
    @media(max-height: 799px) {
        line-height: 29px;
  } 
`;

const SessionInformationLabel = styled.span`
  line-height: 48px;
  
  @media(max-height: 800px) {
      line-height: 20px;
      font-size: 14px;
  }
`;

const TimePickerLabel = styled.span`
  margin-right: 10px;
  
  @media(max-height: 900px) {
      font-size: 14px;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
    
  @media(max-height: 800px) {
     margin-bottom: 7px;
  }
`;

const TimePickerWrapper = styled(Row)`

`;

const StyledField = styled(Field)`
   height: 48px;
   width: 100%;
   border: 1px solid rgba(119, 119, 119, 0.3);
   border-radius: 8px;
   resize: none;
   font-size: 15px;
   font-weight: bold;
   padding: 10px 17px 10px 17px;
   line-height: 31px;
   color: #000;
   
   &:focus {
   outline: none;
   }
   
   @media(max-height: 800px) {
       height: 40px;
   }
`;

const SessionInfoCol = styled(Col)`
  padding-top: 15px;
  padding-bottom: 18px;
  margin-bottom: 0;
  
   @media(max-height: 900px) {
     padding-top: 0px;
     padding-bottom: 10px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border: 1px solid #777777;
    border-radius: 4px;
    background-color: white !important;
  }
  
  .ant-checkbox-inner::after {
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    display: block;
    border: none !important;
    border-radius: 2px;
    background-color: #5A8DF4;
    transform: none !important;
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    border: 1px solid #777777;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  width: 138px;
  font-family: "Lato", sans-serif !important;

  //div.ant-time-picker-panel-input-wrap {
  //  //padding: 10px 2px 10px 12px !important;
  //  padding-top: 10px !important;
  //}
  //
  .ant-time-picker-input {
    border-radius: 8px;
    border: 1px solid rgba(119, 119, 119, 0.3);
  }
  
  .ant-time-picker-panel-select ul {
      padding: 0 !important;
  }
  
  ul {
    padding: 0 !important;
  }
  
  @media(min-height: 1199px) {
      .ant-time-picker-input {
        height: 50px !important;
        font-size: 16px;
      }
  } 
  
  @media(max-height: 900px) {
      .ant-time-picker-input {
        height: 35px !important;
        font-size: 14px;
      }
  } 
  
  @media(max-height: 799px) {
      .ant-time-picker-input {
        height: 29px !important;
        font-size: 14px;
      }
  } 
`;

const StyledContinueButton = styled(Button)`
   width: 152px;
   box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04);
   font-weight: 600;
   font-size: 17px;
   margin-left: auto;
   
   @media(max-height: 900px) {
       height: 40px;
       font-size: 16px;
   }
`;

const TermsOfUse = styled.a`
  font-size: 16px;
  font-weight: 300;
  line-height: 48px;
  color: #333333;
  margin-bottom: 0;
  margin-left: 10px;
  
  @media(max-height: 900px) {
      font-size: 14px;
  }
`;

const TermsOfUseLink = styled(TermsOfUse)`
  color: #5A8DF4;
  cursor: pointer;
`;

export default connect(AvailableDates);
