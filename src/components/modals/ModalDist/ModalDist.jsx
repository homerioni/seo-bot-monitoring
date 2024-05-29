import React, {useState} from 'react';
import s from './ModalDist.module.scss';
import ModalDistLabelFrom from "./ModalDistLabel/ModalDistLabelFrom";
import ModalDistLabelTo from "./ModalDistLabel/ModalDistLabelTo";
import ModalDistAddBtn from "./ModalDistAddBtn/ModalDistAddBtn";
import ModalDistTitle from "./ModalDistTitle/ModalDistTitle";
import ModalDistButtons from "./ModalDistButtons/ModalDistButtons";
import Modal from "../Modal";

const ModalDist = ({data, setModalDist}) => {
    const [isClose, setIsClose] = useState(false);
    const [distForm, setDistForm] = useState(data.folderDistribution ? data.folderDistribution : {dirFrom: '', dirsTo: ['']});

    const addInput = () => setDistForm({...distForm, dirsTo: [...distForm.dirsTo, '']});

    return (
        <Modal onClose={() => setModalDist({isOpen: false})} close={isClose} containerClass={s.container}>
            <ModalDistTitle/>
            <div className={s.content}>
                <div className={s.formItem}>
                    <div className={s.itemTitleBox}>
                        <p>директория откуда</p>
                    </div>
                    <ModalDistLabelFrom distForm={distForm} setDistForm={setDistForm}/>
                </div>
            </div>
            <div className={s.settings}>
                <div className={s.content}>
                    <ModalDistAddBtn onClick={addInput}/>
                    <div className={s.itemTitleBox}>
                        <p>директория куда</p>
                    </div>
                    {distForm.dirsTo.map((item, i) => (
                        <div key={i} className={s.formItem}>
                            <ModalDistLabelTo index={i} distForm={distForm} setDistForm={setDistForm}/>
                        </div>))}
                </div>
            </div>
            <ModalDistButtons data={data} distForm={distForm} setIsClose={setIsClose}/>
        </Modal>
    );
};

export default ModalDist;