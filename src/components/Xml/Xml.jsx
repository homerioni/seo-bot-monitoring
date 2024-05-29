import React from 'react';
import s from './Xml.module.scss';
import XmlHeader from "./XmlHeader/XmlHeader";
import XmlAccount from "./XmlAccount/XmlAccount";

const Xml = ({filteredXml, setModalConfirm, setModalXml}) => {
    return (
        <div className={s.main}>
            <XmlHeader/>
            <div className={s.content}>
                {filteredXml?.map(account =>
                    <XmlAccount key={account.id} account={account} setModalConfirm={setModalConfirm} setModalXml={setModalXml}/>)}
            </div>
        </div>
    );
};

export default Xml;