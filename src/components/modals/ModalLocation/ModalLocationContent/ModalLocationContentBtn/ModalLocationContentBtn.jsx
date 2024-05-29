import React from 'react';
import TextAddBtn from "../../../../UI/Buttons/TextAddBtn/TextAddBtn";

const ModalLocationContentBtn = ({type, setter}) => {
    let text = (() => {
        switch (type) {
            case 'camera':
                return 'Добавить еще камеру';
            case 'degree':
                return 'Добавить еще градусник';
            case 'socket':
                return 'Добавить еще розетку';
            default:
                return 'Не указан тип';
        }
    })();

    const onClick = () => {};

    return (
        <div>
            <TextAddBtn text={text} onClick={onClick}/>
        </div>
    );
};

export default ModalLocationContentBtn;