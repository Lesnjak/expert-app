import {Auth, Storage} from "aws-amplify"

export const loadUserFile = (aws, cognitoIdentity, member, avatar) => {
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

    return Auth.federatedSignIn("developer",
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
        if (Object.keys(avatar).length) {
            return Storage.get(`avatars/${avatar.filename}`)
                .then(res => res)
                .catch(err => err);
        }
    });
};
