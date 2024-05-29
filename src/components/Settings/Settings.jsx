import React, {useState} from 'react';
import s from './Settings.module.scss';
import SettingsAddBtn from "./SettingsAddBtn/SettingsAddBtn";
import SettingsForm from "./SettingsForm/SettingsForm";
import SettingsItem from "./SettingsItem/SettingsItem";

const Settings = ({settings, setModalConfirm}) => {
    const [addForm, setAddForm] = useState({isOpen: false, data: null});

    return (
        <div className={s.main}>
            <p className={s.title}>Типы настроек профилей</p>
            <div className={s.content}>
                {settings.data?.result.map(setting =>
                    <SettingsItem key={setting.id} data={setting} setAddForm={setAddForm} setModalConfirm={setModalConfirm}/>)}
            </div>
            <div>
                {addForm.isOpen ?
                    <SettingsForm setAddForm={setAddForm} data={addForm.data}/>
                    : <SettingsAddBtn setAddForm={setAddForm}/>
                }
            </div>
        </div>
    );
};

export default Settings;