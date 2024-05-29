import React from 'react';
import s from "./ModalDistLabel.module.scss";

const ModalDistLabelFrom = ({distForm, setDistForm}) => {
    const onChange = (e) => setDistForm({...distForm, dirFrom: e.target.value});

    return (
        <div className={s.labelBox}>
            <label className={s.label}>
                <svg className={s.labelIcon} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.3724 12.5587L22.2024 12.325C21.9049 11.9637 21.5543 11.6768 21.1506 11.4643C20.6087 11.1562 19.9924 10.9968 19.3549 10.9968H6.12681C5.48931 10.9968 4.88368 11.1562 4.33118 11.4643C3.91681 11.6875 3.54493 11.9956 3.23681 12.3781C2.63118 13.1537 2.34431 14.11 2.43993 15.0662L2.83306 20.0281C2.97118 21.5262 3.15181 23.3749 6.51993 23.3749H18.9724C22.3406 23.3749 22.5106 21.5262 22.6593 20.0175L23.0524 15.0768C23.1481 14.1843 22.9143 13.2918 22.3724 12.5587Z" fill="#FFC225"/>
                    <path d="M9.39772 17.0474C9.17681 17.0456 8.9963 17.2233 8.99454 17.4442C8.99278 17.6651 9.17044 17.8456 9.39134 17.8473L9.39772 17.0474ZM16.2806 17.7851C16.438 17.6301 16.44 17.3769 16.2851 17.2194L13.7599 14.6536C13.6049 14.4962 13.3517 14.4942 13.1942 14.6491C13.0368 14.8041 13.0347 15.0573 13.1897 15.2148L15.4343 17.4955L13.1536 19.7401C12.9962 19.8951 12.9942 20.1483 13.1491 20.3058C13.3041 20.4632 13.5573 20.4653 13.7148 20.3103L16.2806 17.7851ZM9.39134 17.8473L15.9968 17.9L16.0032 17.1L9.39772 17.0474L9.39134 17.8473Z" fill="white"/>
                    <path d="M21.8498 9.18666C21.8853 9.56971 21.4705 9.8265 21.107 9.70051C20.5555 9.50934 19.9737 9.41375 19.368 9.41375H6.12922C5.51939 9.41375 4.91926 9.51548 4.36152 9.70914C4.00237 9.83384 3.58984 9.58632 3.58984 9.20614V7.07625C3.58984 3.28312 4.74797 2.125 8.54109 2.125H9.79484C11.3142 2.125 11.7923 2.61375 12.4086 3.41062L13.6836 5.11063C13.9492 5.47187 13.9598 5.49312 14.4273 5.49312H16.9561C20.2983 5.49312 21.5913 6.3941 21.8498 9.18666Z" fill="#FFC225"/>
                </svg>
                <input placeholder="Путь к директории" type="text" value={distForm.dirFrom} onChange={onChange}/>
            </label>
        </div>
    );
};

export default ModalDistLabelFrom;