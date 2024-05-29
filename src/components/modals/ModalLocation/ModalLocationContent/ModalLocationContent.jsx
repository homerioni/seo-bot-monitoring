import React from 'react';
import ModalLocationContentTitle from "./ModalLocationContentTitle/ModalLocationContentTitle";
import ModalLocationContentBtn from "./ModalLocationContentBtn/ModalLocationContentBtn";
import ModalLocationContentForm from "./ModalLocationContentForm/ModalLocationContentForm";

const ModalLocationContent = ({type}) => {
    return (
        <div>
            <ModalLocationContentTitle type={type}/>
            <ModalLocationContentForm/>
            <ModalLocationContentBtn type={type}/>
        </div>
    );
};

export default ModalLocationContent;