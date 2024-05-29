import React from 'react';
import s from './ModalAPForm.module.scss';
import InputText from "../../../UI/Form/InputText/InputText";
import SwitchRadioButtons from "../../../UI/Form/SwitchRadioButtons/SwitchRadioButtons";
import RadioBtnAndText from "../../../UI/Form/RadioBtnAndText/RadioBtnAndText";
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";

const ModalApForm = ({register, onSubmit, isLoading, isValid, onClose}) => {
    return (
        <form className={s.form} onSubmit={onSubmit}>
            <InputText register={{...register('name', {required: 'Обязательное поле'})}} title={'Наименование'}/>
            <SwitchRadioButtons register={{...register('purposeType', {required: 'Обязательное поле'})}} title={'Назначение проекта'} items={[{val: 'PUMPING', name: 'Прокачка'}, {val: 'PROMOTION', name: 'Накрутка'}]}/>
            <InputText register={{...register('domain', {required: 'Обязательное поле'})}} title={'URL целевого сайта'}/>
            <InputText register={{...register('regionNumber', {required: 'Обязательное поле'})}} title={'Номер региона'}/>
            <RadioBtnAndText className={s.checkbox} register={{...register('priorityType')}} text={'Приоритетный'}/>
            <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={onClose}/>
        </form>
    );
};

export default ModalApForm;