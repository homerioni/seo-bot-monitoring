import React, {useState} from 'react';
import s from '../ModalConfig.module.scss';
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";
import SelectTextList from "../../../UI/Form/SelectTextList/SelectTextList";

const list = [{name: 'SSD', val: 'SSD'}, {name: 'HDD', val: 'HDD'}];

const ConfigFormStorage = ({register, handleSubmit, isValid, setClose, watch, submitFunc}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = reqData =>
        submitFunc(reqData, setIsLoading, 'HARD_DRIVE', `${reqData.characteristics.type} ${reqData.name} успешно сохранен`);

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formContent}>
                <SelectTextList register={{...register('characteristics.type', {required: true})}} selectedWatch={watch('characteristics.type')} className={s.flex10} title='тип' tooltip='Тип накопителя' list={list}/>
                <InputText register={{...register('name', {required: true})}} className={s.auto} title='Название'/>
                <InputText register={{...register('characteristics.capacity', {required: true})}} className={s.flex10} type='number' title='объем гб' tooltip='Общий объем накопителя в ГБ.'/>
                <InputText register={{...register('characteristics.read', {required: true})}} className={s.flex10} type='number' title='чтение МБ/с' tooltip='Максимальная скорость чтения в МБ/с.'/>
                <InputText register={{...register('characteristics.write', {required: true})}} className={s.flex10} type='number' title='запись МБ/с' tooltip='Максимальная скорость записи в МБ/с.'/>
                <InputText register={{...register('linkToSpecification', {required: true})}} className={s.flex75} title='ссылка на товар' tooltip='Ссылка на товар, где его можно заказать.'/>
                <InputText register={{...register('price', {required: true})}} type={'number'} className={s.flex25} title='цена товара' tooltip='Цена товара в рублях'/>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={() => setClose(true)}/>
        </form>
    );
};

export default ConfigFormStorage;