import React, {useState} from 'react';
import s from '../ModalConfig.module.scss';
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";
import SelectTextList from "../../../UI/Form/SelectTextList/SelectTextList";

const list = [{name: 'ddr4', val: 'ddr4'}, {name: 'ddr5', val: 'ddr5'}];

const ConfigFormRam = ({register, handleSubmit, isValid, setClose, watch, submitFunc}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = reqData =>
        submitFunc(reqData, setIsLoading, 'RAM', `Оперативная память ${reqData.name} успешно сохранена`);

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formContent}>
                <SelectTextList register={{...register('characteristics.type', {required: true})}} selectedWatch={watch('characteristics.type')} className={s.flex10} title='тип' tooltip='Тип памяти' list={list}/>
                <InputText register={{...register('name', {required: true})}} className={s.auto} title='Название'/>
                <InputText register={{...register('characteristics.capacity', {required: true})}} className={s.flex10} type='number' title='объем гб' tooltip='Объем памяти в ГБ.'/>
                <InputText register={{...register('linkToSpecification', {required: true})}} className={s.flex75} title='ссылка на товар' tooltip='Ссылка на товар, где его можно заказать.'/>
                <InputText register={{...register('price', {required: true})}} type={'number'} className={s.flex25} title='цена товара' tooltip='Цена товара в рублях'/>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={() => setClose(true)}/>
        </form>
    );
};

export default ConfigFormRam;