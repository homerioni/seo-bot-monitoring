import React from 'react';
import s from './RecipientFormHeader.module.scss';

const RecipientFormHeader = () => {
    return (
        <div className={s.main}>
            <div className={s.flex25}>
                <div className={s.titleBox}>
                    <p>выберите сервер</p>
                    <div className={s.tooltip}>
                        <p>Сервер, на который будут производится отправки профилей.</p>
                    </div>
                </div>
            </div>
            <div className={s.flex75}>
                <div className={s.titleBox}>
                    <p>директория куда</p>
                    <div className={s.tooltip}>
                        <p>
                            Директория в которую будут отправляться профиля.
                            <br/>Примеры при разных настройках типа BAS:
                            <br/>По полному пути:
                            <br/>{'D:\\folder\\6-2-2024\\00-24\\desktop'}
                            <br/>С учетом времени:
                            <br/>{'D:\\folder'}
                            <br/>{'Во втором случае передача будет осуществляться в папку "D:\\folder\\{дата}\\...\\{название потока}"'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipientFormHeader;