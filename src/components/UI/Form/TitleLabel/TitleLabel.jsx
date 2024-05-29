import React from 'react';
import s from "./TitleLabel.module.scss";

const TitleLabel = ({title, tooltip}) => {
    return (
        <div className={s.titleBox}>
            <p>{title}</p>
            {tooltip ?
                <div className={s.tooltip}>
                    <p>{tooltip}</p>
                </div> : ''}
        </div>
    );
};

export default TitleLabel;