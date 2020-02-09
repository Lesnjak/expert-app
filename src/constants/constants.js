import SesssionIcon from "../assets/images/icons/session.svg";
import InboxIcon from "../assets/images/icons/inbox.svg";
import ProfileIcon from "../assets/images/icons/profile.svg";
import SettingIcon from "../assets/images/icons/setting.svg";
import HelpIcon from "../assets/images/icons/help.svg";
import LogoutIcon from "../assets/images/icons/logout.svg";

export const MENU_LIST = {
    common: {
        sessions: {
            id: 'sessions',
            icon: SesssionIcon,
            label: 'Sessions',
            path: 'sessions',
        },
        inbox: {
            id: 'inbox',
            icon: InboxIcon,
            label: 'Inbox',
            path: 'inbox',
        },
        profile: {
            id: 'profile',
            icon: ProfileIcon,
            label: 'Profile',
            path: 'profile',
        },
        settings: {
            id: 'settings',
            icon: SettingIcon,
            label: 'Settings',
            path: 'settings',
        }
    },
    other: {
        help: {
            id: 'help',
            icon: HelpIcon,
            label: 'Help',
            path: 'help',
        },
        logout: {
            id: 'logout',
            icon: LogoutIcon,
            label: 'Log Out',
            path: 'logout',
        },
    }
}
