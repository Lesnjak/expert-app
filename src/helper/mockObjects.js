import Avatar from "assets/images/avatar.png";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let sessions = [
    {
        status:'real',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        online:true,
    },
    {
        status:'pending',
        src:Avatar,
        name:'Collen Watson first second therd petrov',
        questionText:'Lorem ipsum dolor sit amet',
        category:'Educational & School',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'pending',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:false,
    },
    {
        status:'pending',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'pending',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'daily',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'daily',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:false,
    },
    {
        status:'daily',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'daily',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'daily',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },
    {
        status:'daily',
        src:Avatar,
        name:'Collen Watson',
        questionText:'Lorem ipsum dolor sit amet',
        category:'fitnes',
        language:'Spanish',
        date:{date:"19/09/2019",time:"11:30 AM - 12:40 PM"},
        session:'50 minutes',
        total:'$25',
        checked:true,
    },

]
sessions = sessions.reduce((a,b)=>{
    a[b.status].push(b)
    return a
},{real:[],pending:[],daily:[]});

const chat = [
    {
        person: "client",
        message: "Hello, Susan. I have some questions about" +
            " lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit. Mauris condimentum pretium lorem, ut " +
            "iaculis nulla suscipit non. Nam vitae odio sem." +
            " Nulla facilisi. Donec turpis odio ",
        time: "8:32 AM"

    }, {
        person: "defendant",
        message: "Hello Ted. I listening you :)",
        time: "8:33 AM"

    },
    {
        person: "client",
        message: "Okay, got it. Could I register session for today at 16:00 PM?",
        time: "8:35 AM"
    },
    {
        person: "defendant",
        message: "Yes, of course. I will be free at that time!",
        time: "8:36 AM"
    },
    {
        person: "client",
        message: "Okay, I send invitation for session",
        time: "8:38 AM"
    },
    {
        person: "client",
        message: "Hello, Susan. I have some questions about" +
            " lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit. Mauris condimentum pretium lorem, ut " +
            "iaculis nulla suscipit non. Nam vitae odio sem." +
            " Nulla facilisi. Donec turpis odio ",
        time: "8:32 AM"

    }, {
        person: "defendant",
        message: "Hello Ted. I listening you :)",
        time: "8:33 AM"

    },
    {
        person: "client",
        message: "Hello, Susan. I have some questions about" +
            " lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit. Mauris condimentum pretium lorem, ut " +
            "iaculis nulla suscipit non. Nam vitae odio sem." +
            " Nulla facilisi. Donec turpis odio ",
        time: "8:32 AM"

    }, {
        person: "defendant",
        message: "Hello Ted. I listening you :)",
        time: "8:33 AM"

    },
    {
        person: "client",
        message: "Hello, Susan. I have some questions about" +
            " lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit. Mauris condimentum pretium lorem, ut " +
            "iaculis nulla suscipit non. Nam vitae odio sem." +
            " Nulla facilisi. Donec turpis odio ",
        time: "8:32 AM"

    }, {
        person: "defendant",
        message: "Hello Ted. I listening you :)",
        time: "8:33 AM"

    },
    {
        person: "client",
        message: "Hello, Susan. I have some questions about" +
            " lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit. Mauris condimentum pretium lorem, ut " +
            "iaculis nulla suscipit non. Nam vitae odio sem." +
            " Nulla facilisi. Donec turpis odio ",
        time: "8:32 AM"

    }, {
        person: "defendant",
        message: "Hello Ted. I listening you :)",
        time: "8:33 AM"

    },
    {
        person: "client",
        message: "Hello, Susan. I have some questions about" +
            " lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit. Mauris condimentum pretium lorem, ut " +
            "iaculis nulla suscipit non. Nam vitae odio sem." +
            " Nulla facilisi. Donec turpis odio ",
        time: "8:32 AM"

    }, {
        person: "defendant",
        message: "Hello Ted. I listening you :)",
        time: "8:33 AM"

    },


]

export {sessions,chat}
