import React from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import './ToolTip.css'


const ToolTipy = ({children,text,position='top',isOpen=false,onCloseOutside}) => {
    return (
        <Tooltip
            arrow={true}
            title={text}
            position={position}
            open={isOpen}
            hideOnClick={false}
            theme='dark'
            onRequestClose={onCloseOutside}
        >
        {children}
        </Tooltip>
    );
};
ToolTipy.defaultProps = {
    isOpen:false,
    onCloseOutside:()=>{},
}
export default ToolTipy;
