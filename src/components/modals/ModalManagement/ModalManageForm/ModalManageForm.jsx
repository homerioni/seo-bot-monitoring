import React from 'react';
import s from './ModalManageForm.module.scss';
import SelectTextList from "../../../UI/Form/SelectTextList/SelectTextList";
import ModalManageList from "./ModalManageList/ModalManageList";
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import FileInput from "../../../UI/Form/FileInput/FileInput";
import InputText from "../../../UI/Form/InputText/InputText";
import SelectItemList from "../../../UI/Form/SelectItemList/SelectItemList";

const selectItemTemplate = (data, onInput, register) => {
    return (
        <label key={data.id} className={`${s.selectItem} ${!register ? s.notHover : ''}`}>
            {register && <input type='radio' {...register} onInput={onInput} value={data?.value}/>}
            <div className={s.selectBox}>
                <p className={s.selectName}>{data?.name}</p>
            </div>
        </label>
    );
};

const selectSearchList = [
    {id: 'GOOGLE', value: 'GOOGLE', name: 'Google'},
    {id: 'YANDEX', value: 'YANDEX', name: 'Yandex'},
];

const ModalManageForm = ({register, control, watch, isLoading, appiumProjects, setValue, data, selectList, onClose, isPromotion}) => {
    return (
        <>
            <SelectTextList register={{...register('projectId', {required: true})}}
                            title={'Проект'}
                            selectedWatch={watch('projectId')}
                            isLoading={appiumProjects.isLoading}
                            list={selectList}/>
            {isPromotion &&
                <>
                    <SelectItemList title='Поисковая система'
                                    register={{...register('searchEngineType')}}
                                    list={selectSearchList}
                                    selectedWatch={watch('searchEngineType')}
                                    itemTemplate={selectItemTemplate}/>
                    <FileInput register={{...register('file', {required: false})}} title={'Файл с фразами и кликами *.txt'} defaultData={data?.linkWithPhrases}/>
                    <InputText className={s.inputMaxLength} type={'number'} register={{...register('maxSearchDepth', {required: 'Обязательное поле'})}} title={'Max глубина поиска'}/>
                </>}
            <p className={s.formTitle}>Текстовые блоки задания</p>
            <ModalManageList control={control} register={register} watch={watch} setValue={setValue} data={data}/>
            <ButtonsForm isValid={true} isLoading={isLoading} cancelClick={onClose}/>
        </>
    );
};

export default ModalManageForm;
