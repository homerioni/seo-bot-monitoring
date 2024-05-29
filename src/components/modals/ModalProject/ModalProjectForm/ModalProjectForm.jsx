import React from 'react';
import s from './ModalProjectForm.module.scss';
import xmlIcon from '../../../../assets/img/xmlIcon.svg';
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";
import FormCheckboxList from "../../../UI/Form/FormCheckboxList/FormCheckboxList";
import FormTextarea from "../../../UI/Form/FormTextarea/FormTextarea";
import ProjectServersForm from "./ProjectServersForm/ProjectServersForm";
import YandexListItem from "../../../UI/Form/FormCheckboxList/FormCheckboxLists/YandexListItem";
import SelectItemList from "../../../UI/Form/SelectItemList/SelectItemList";
import {getTemplate} from "./MetrikaListTemplate/MetrikaListTemplate";
import Loading from "../../../UI/Loading/Loading";

const ModalProjectForm = ({register, data, onSubmit, isValid, isLoading, onCancel, xmlList, metrikaList, selectedServers, setSelectedServers, servers, setModalProjectServers, watch}) => {
    return (
        <form className={s.main} onSubmit={onSubmit}>
            <div className={s.formBox}>
                <p className={s.boxTitle}>О проекте</p>
                <InputText register={{...register('projectName', {required: true})}} title={'Название'} tooltip={'Наименование проекта.'} className={s.flex25}/>
                <InputText register={{...register('domain', {required: true})}} title={'Ссылка на сайт'} tooltip={'Ссылка на сайт проекта.'} className={s.flex25}/>
                <InputText register={{...register('topVisorId', {required: true})}} title={'топвизор / идентификатор'} tooltip={'id топвизора проекта.'} className={s.flex25}/>
                <InputText register={{...register('topVisorApiKey', {required: true})}} title={'топвизор / api'} tooltip={'Ключ топвизора проекта.'} className={s.flex25}/>
                <InputText register={{...register('frequency', {required: true})}} title={'Переодичность проверки (мин)'} tooltip={'Период обновления статистики в минутах.'} className={s.flex25}/>
            </div>
            <div className={s.formBox}>
                <p className={s.boxTitle}>Серверы, работающие на проект</p>
                <ProjectServersForm servers={servers}
                                    selectedServers={selectedServers}
                                    setSelectedServers={setSelectedServers}
                                    setModalProjectServers={setModalProjectServers}/>
            </div>
            <div className={s.formBox}>
                <p className={s.boxTitle}>Аккаунты Яндекс.XML</p>
                <FormCheckboxList title='выберите аккаунты'
                                  register={{...register('accIds')}}
                                  addText='Добавить аккаунт'
                                  listItems={xmlList}
                                  icon={xmlIcon}
                                  defaultItems={data?.settingResponse.accounts?.map(el => {
                                      return {id: el.id, text: [`Аккаунт #${el.id - 999}`], htmlFor: `xmlFormList${el.id}`}
                                  })}>
                    <YandexListItem/>
                </FormCheckboxList>
            </div>
            <div className={s.formBox}>
                <p className={s.boxTitle}>Аккаунты Яндекс.Метрика</p>
                {metrikaList.isLoading ?
                    <Loading/>
                    :
                    <SelectItemList title='выберите аккаунт'
                                    register={{...register('yandexMetricaAccountId')}}
                                    list={metrikaList.data?.result}
                                    selectedWatch={watch('yandexMetricaAccountId')}
                                    itemTemplate={getTemplate}/>}
            </div>
            <div className={s.formBox}>
                <p className={s.boxTitle}>Подключение к статистики кликов</p>
                <FormTextarea title='фразы через enter ' register={{...register('phrases', {required: true})}} classMain={s.flex100} classLabel={s.textarea}/>
            </div>
            <ButtonsForm className={s.buttons} isValid={isValid} isLoading={isLoading} cancelClick={onCancel}/>
        </form>
    );
};

export default ModalProjectForm;