import Auth from '@aws-amplify/auth';
import jwtDecode from "jwt-decode";
import api from "../api";
import {uploadImage} from "./awsFileUpload";

const ipId = null;
const refreshToken = async (email) => {
    console.log("RT");
    try {
        // console.log("RT REACHED");
        api.refreshAwsToken(email)
            .then(response => {
                const token = {
                    token: response.data.Token,
                    expires_at: jwtDecode(response.data.Token).exp * 1000,
                    identityId: response.data.IdentityId
                };

                console.log("TOKEN", token);
            });
        // .catch(error => console.log("REFRESH TOKEN ERR = ", error, email));

        // console.log("RESPONSE", response, email);
        //
        // return {
        //     token: response.Token,
        //     expires_at: jwtDecode(response.Token).exp * 1000,
        //     identityId: response.IdentityId
        // };
    } catch (error) {
        throw error;
    }
};


const authConfig = (aws, email, cognitoIdentity, member, avatar, image) => {
    // console.log("Reached");

    // const refresh = await refreshToken(email);
    console.log("AV", avatar);
    api.refreshAwsToken(email)
        .then(response => {
            const token = {
                token: response.data.Token,
                expires_at: jwtDecode(response.data.Token).exp * 1000,
                identityId: response.data.IdentityId
            };

            let params = {
                identityPoolId: aws.idPoll,
                region: aws.awsRegion,
                refreshHandlers: {"developer": token},
            };
            console.log("AUTH PARAMS", params);

            Auth.configure(params);

            Auth.federatedSignIn("developer",
                {
                    token: cognitoIdentity.Token,
                    identity_id: cognitoIdentity.IdentityId,
                    identityPoolId: aws.idPoll
                },
                {
                    name: member.nickname,
                    email: member.email,
                }
            )
                .then(res => {
                    console.log("REACHED");
                    uploadImage(image, aws).then(r => console.log("r = ", r))
                    uploadImage(avatar, aws, image).then(r => console.log("r = ", r))
                })
                .catch(err => console.log("AUTH C ERR", err));
        });

    // console.log("REFRESH", refresh);
    //
    // let params = {
    //     identityPoolId: aws.idPoll,
    //     region: aws.awsRegion,
    //     refreshHandlers: {"developer": refresh},
    // };
    //
    // console.log("AUTH PARAMS", params);
    // Auth.configure(params);
};


export const auth = async (cognitoIdentity, member, aws, avatar, image) => {
    try {
        // console.log("Reached");
        authConfig(aws, member.email, cognitoIdentity, member, avatar, image);

        // console.log("CI 2", cognitoIdentity);
        // console.log("IDI", aws.idPoll);
        // await Auth.federatedSignIn("developer",
        //     {
        //         token: cognitoIdentity.Token,
        //         identity_id: cognitoIdentity.IdentityId,
        //         identityPoolId: aws.idPoll
        //     },
        //     {
        //         name: member.nickname,
        //         email: member.email,
        //     }
        // ).then(res => console.log("AUTH C", res))
        //     .catch(err => console.log("AUTH C ERR", err));

        // await Auth.federatedSignIn(
        //     "developer",
        //     {
        //         token: cognitoIdentity.Token,
        //         identity_id: cognitoIdentity.IdentityId
        //     },
        //     {
        //         name: member.nickname,
        //         email: member.email,
        //     }
        // );
    } catch (error) {
        throw error;
    }

};