import React, {useState} from 'react';
import s from '../ModalConfig.module.scss';
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";

const ConfigFormGpu = ({register, handleSubmit, isValid, setClose, submitFunc}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = reqData =>
        submitFunc(reqData, setIsLoading, 'VIDEO_ADAPTER', `Видеокарта ${reqData.name} успешно сохранена`);

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formContent}>
                <InputText register={{...register('name', {required: true})}} className={s.auto} title='Название'/>
                <InputText register={{...register('characteristics.capacity', {required: true})}} className={s.flex10} type='number' title='гб' tooltip='Кол-во видеопамяти видеокарты'/>
                <div className={s.flexBox}>
                    <InputText register={{...register('linkToSpecification', {required: true})}} className={s.flex75} title='ссылка на товар' tooltip='Ссылка на товар, где его можно заказать.'/>
                    <InputText register={{...register('price', {required: true})}} type={'number'} className={s.flex25} title='цена товара' tooltip='Цена товара в рублях'/>
                </div>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={() => setClose(true)}/>
        </form>
    );
};

export default ConfigFormGpu;