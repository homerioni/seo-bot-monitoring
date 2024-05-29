import React, {useState} from 'react';
import s from '../ModalConfig.module.scss';
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";

const ConfigFormCpu = ({register, handleSubmit, isValid, setClose, submitFunc}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = reqData =>
        submitFunc(reqData, setIsLoading, 'PROCESSOR', `Процессор ${reqData.name} успешно сохранен`);

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formContent}>
                <InputText register={{...register('name', {required: true})}} className={s.auto} title='Название' tooltip='Название процессора и навзание его сокета.'/>
                <InputText register={{...register('characteristics.numberOfCores', {required: true})}} className={s.flex10} type='number' title='кол-во ядер'/>
                <InputText register={{...register('characteristics.numberOfThreads', {required: true})}} className={s.flex10} type='number' title='кол-во потоков'/>
                <InputText register={{...register('linkToSpecification', {required: true})}} className={s.flex75} title='ссылка на товар' tooltip='Ссылка на товар, где его можно заказать.'/>
                <InputText register={{...register('price', {required: true})}} type={'number'} className={s.flex25} title='цена товара' tooltip='Цена товара в рублях'/>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={() => setClose(true)}/>
        </form>
    );
};

export default ConfigFormCpu;