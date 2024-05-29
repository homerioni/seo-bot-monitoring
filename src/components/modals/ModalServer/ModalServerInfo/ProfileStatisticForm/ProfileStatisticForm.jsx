import React from 'react';
import s from './ProfileStatisticForm.module.scss';
import InputText from "../../../../UI/Form/InputText/InputText";
import TextAddBtn from "../../../../UI/Buttons/TextAddBtn/TextAddBtn";
import CheckboxText from "../../../../UI/Form/CheckboxText/CheckboxText";
import SwitchCheckbox from "../../../../UI/Form/SwitchCheckbox/SwitchCheckbox";
import DelBtnForInput from "../../../../UI/Buttons/DelBtnForInput/DelBtnForInput";

const ProfileStatisticForm = ({register, watch, setValue}) => {
    const settingsFolder = Array.from({length: watch('settings')?.length}, (e, i) => {
        return (
            <React.Fragment key={i}>
                <InputText title={'папка проверки'} className={s.flex33} register={{...register(`settings.${i}.name`, {required: 'Обязательное поле'})}}/>
                <InputText title={'папка Десктоп'} className={s.flex33} register={{...register(`settings.${i}.desktopFolder`, {required: 'Обязательное поле'})}}/>
                <InputText title={'папка мобильные'} className={s.flex33} register={{...register(`settings.${i}.mobileFolder`, {required: 'Обязательное поле'})}}/>
                <DelBtnForInput className={s.delBtn}
                                text={'Удалить настройку?'}
                                onClick={() => {
                                    setValue('settings', watch('settings').filter((e, index) => index !== i));
                                }}/>
            </React.Fragment>
        );
    });

    return (
        <div className={s.form}>
            {settingsFolder}
            <TextAddBtn text={'Добавить еще папку'}
                        className={s.flex100}
                        onClick={() => setValue('settings', [...watch('settings'), {}])}/>
            <CheckboxText title={'Количество сайтов'}
                          className={s.flex15}
                          registerText={{...register('numberOfSites', {required: 'Обязательное поле'})}}
                          registerCheckbox={{...register('numberOfSitesIsActive')}}
                          isActive={watch('numberOfSitesIsActive')}/>
            <CheckboxText title={'профилей в warmup'}
                          className={s.flex15}
                          registerText={{...register('numberOfWarmupProfiles', {required: 'Обязательное поле'})}}
                          registerCheckbox={{...register('numberOfWarmupProfilesIsActive')}}
                          isActive={watch('numberOfWarmupProfilesIsActive')}/>
            <SwitchCheckbox title={'сколько дней'}
                            className={s.flex15}
                            text={'Без ограничений'}
                            registerCheckbox={{...register('withoutLimits')}}
                            registerInput={{...register('numberOfDays')}}
                            isActive={watch('withoutLimits')}/>
        </div>
    );
};

export default ProfileStatisticForm;