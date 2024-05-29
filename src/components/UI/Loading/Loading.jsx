import React from 'react';
import s from './Loading.module.scss';
import loadingImg from '../../../assets/img/loading.svg';

const Loading = ({...props}) => {
    return (
        <div className={s.main} {...props}>
            <img src={loadingImg} alt=""/>
        </div>
    );
};

export default Loading;