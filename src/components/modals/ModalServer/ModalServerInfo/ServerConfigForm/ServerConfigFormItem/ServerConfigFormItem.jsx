import React, {useRef} from 'react';
import s from './ServerConfigFormItem.module.scss';
import {useToggleDropDownList} from "../../../../../../hooks/useToggleDropDownList";
import ServerConfigItemTemplate from "./ServerConfigItemTemplate";
import DelBtnForInput from "../../../../../UI/Buttons/DelBtnForInput/DelBtnForInput";

const ServerConfigFormItem = ({className, title, isQtyBox, isRam, accessoryData, type, selectId, register, qtyValue, setQtyValue, delClick}) => {
    const listRef = useRef();
    const [isOpen, setIsOpen] = useToggleDropDownList(listRef);

    const onChange = () => setIsOpen(false);
    const selectedItem = accessoryData[type]?.find(item => item.id == selectId);

    return (
        <div className={className}>
            {title && <p className={s.title}>{title}</p>}
            <div className={s.content}>
                <div className={s.box}>
                    <div className={`${s.infoBox} ${isOpen ? s.active : ''}`} ref={listRef}>
                        <div className={s.info}>
                            {selectedItem && <ServerConfigItemTemplate data={selectedItem}/>}
                        </div>
                        <div className={s.list}>
                            {accessoryData[type]?.map(item =>
                                <label key={item.id} className={s.listItem}>
                                    <input {...register} type="radio" value={item.id} onInput={onChange}/>
                                    <ServerConfigItemTemplate data={item}/>
                                </label>
                            )}
                        </div>
                    </div>
                    <button type="button" className={s.selectBtn} onClick={() => setIsOpen(!isOpen)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {type === 'HARD_DRIVE' && <DelBtnForInput className={s.delBtn} onClick={delClick}/>}
                </div>
                {(isQtyBox || isRam) &&
                    <div className={s.box}>
                        {isQtyBox &&
                            <div className={s.qtyBox}>
                                <div className={s.operator} onClick={() => qtyValue > 1 && setQtyValue(qtyValue - 1)}>-</div>
                                <div>{qtyValue}</div>
                                <div className={s.operator} onClick={() => setQtyValue(qtyValue + 1)}>+</div>
                            </div>}
                        {isRam &&
                            <div className={s.ram}>
                                <span>∑</span>
                                <p>{selectedItem?.characteristics.capacity * qtyValue || 0}GB</p>
                            </div>}
                    </div>}
            </div>
        </div>
    );
};

export default ServerConfigFormItem;