import React, {useState} from 'react';
import s from './HeaderSwitchBtns.module.scss'

const HeaderSwitchBtns = ({buttons, setActive, active, bgStyleDefault}) => {
    const [bgStyle, setBgStyle] = useState(bgStyleDefault ?? {});
    const onClick = (val, e) => {
        setBgStyle({width: e.target.clientWidth + 'px', left: e.target.offsetLeft + 'px'});
        setActive(val);
    };

    return (
        <div className={s.main}>
            <div className={s.bg} style={{width: bgStyle.width, left: bgStyle.left}}/>
            {buttons?.map((btn, i) => {
                return <button key={btn.val} type='button' className={`${s.btn} ${active === btn.val ? s.active : ''}`} onClick={e => onClick(btn.val, e)}>
                    {btn.name}
                </button>
            })}
        </div>
    );
};

export default HeaderSwitchBtns;