import {Auth, Storage} from "aws-amplify"

export const uploadUserFiles = (aws, cognitoIdentity, member, avatar, certificates) => {
    Auth.configure(
        {
            identityPoolId: aws.idPoll,
            region: aws.awsRegion,
        }
    );

    Storage.configure({
        AWSS3: {
            bucket: aws.uploadsBucket,
            region: aws.awsRegion,
        }
    });

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
    ).then(_ => {
        if (certificates.length) {
            console.log("reached");
            certificates.forEach(certificate => {
                Storage.put(`documents/${certificate.name}`, certificate.uri, {
                    contentType: certificate.type
                })
                    .then(res => res)
                    .catch(err => console.log("error", err));
            })
        }
        if (Object.keys(avatar).length) {
            Storage.put(`avatars/${avatar.name}`, avatar.uri, {
                contentType: avatar.type
            })
                .then(res => console.log("response", res))
                .catch(err => console.log("error", err));
        }
    });
};
