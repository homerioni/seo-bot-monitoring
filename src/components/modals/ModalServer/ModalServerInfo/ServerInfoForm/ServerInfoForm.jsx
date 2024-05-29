import React from 'react';
import s from './ServerInfoForm.module.scss';
import projectIcon from '../../../../../assets/img/project-icon-square.svg';
import FormAlternateItem from "./FormAlternateItem/FormAlternateItem";
import FormRadioButtons from "./FormRadioButtons/FormRadioButtons";
import InputText from "../../../../UI/Form/InputText/InputText";
import FormTextarea from "../../../../UI/Form/FormTextarea/FormTextarea";
import FormCheckboxList from "../../../../UI/Form/FormCheckboxList/FormCheckboxList";
import ProjectsListItem from "../../../../UI/Form/FormCheckboxList/FormCheckboxLists/ProjectsListItem";
import AntiCaptchaListItem from "../../../../UI/Form/FormCheckboxList/FormCheckboxLists/AntiCaptchaListItem";
import SelectTextList from "../../../../UI/Form/SelectTextList/SelectTextList";
import FormPurposeList from "./FormPurposeList/FormPurposeList";
import RadioBtnAndText from "../../../../UI/Form/RadioBtnAndText/RadioBtnAndText";

const ServerInfoForm = ({register, errors, watch, server, projects, antiCaptcha, locations}) => {
    const projectDefaultsItems = () => {
        const arr = [];
        projects.data?.result.forEach(el => {
            if (el.settingResponse?.servers?.find(e => e.serverId === server?.id)) {
                arr.push({id: el.id, text: [el.name], htmlFor: `modalProject${el.id}`});
            }
        });
        return arr;
    }

    const captchaDefaultsItems = () => {
        return server?.anticaptchas?.map(el => {
            return {id: el.id, text: [el.name, el.ip], htmlFor: `modalCaptcha${el.id}`}
        });
    }

    return (
        <div className={s.main}>
            <InputText register={{...register("name", {required: 'Обязательное поле'})}}
                      error={errors.name?.message}
                      className={s.flex25}
                      title={'Название*'}
                      tooltip={'Наименование сервера.'}/>
            <InputText register={{...register("ip", {required: 'Обязательное поле'})}}
                      error={errors.ip?.message}
                      className={s.flex25}
                      title={'IP-адрес*'}
                      tooltip={'IP адрес сервера, указывается в формате 255.255.255.255 или c добавление порта 255.255.255.255:8080.'}/>
            <FormAlternateItem className={s.flex25}/>
            <FormRadioButtons register={{...register("affiliation")}}
                              className={s.flex25}
                              title={'Принадлежность'}
                              tooltip={'Можно указать кому принадлежит сервер, наш собственный или арендованный.'}
                              radioNames={['Наш', 'Аренда']}
                              values={['owner', 'rent']}
                              ownerIcon={true}
                              watch={watch}/>
            <FormPurposeList className={s.flex25}
                             register={{...register('purpose')}}
                             anotherRegister={{...register('anotherPurpose')}}
                             selectedWatch={watch('purpose')}
                             list={['Накрутка', 'Прокачка', 'Склад']}
                             title={'назначение'}
                             tooltip={'Информация о предназначении сервера.'}/>
            <FormRadioButtons register={{...register("maxPower", {required: 'Обязательное поле'})}}
                              error={errors.maxPower?.message}
                              className={s.flex25}
                              title={'max количество потоков*'}
                              tooltip={'Мощнось сервера BAS. Количество потоков которое может выдержать сервер.'}
                              radioNames={['100', '200']}
                              values={['100', '200']}
                              watch={watch}/>
            <InputText register={{...register("numberOfThreads", {required: 'Обязательное поле'})}}
                      error={errors.numberOfThreads?.message}
                      type={'number'}
                      className={s.flex25}
                      title={'потоков фактически*'}
                      tooltip={'Количество потоков работающих на данный момент.'}/>
            <SelectTextList className={s.flex25}
                            register={{...register('locationId')}}
                            list={locations?.data?.result.map(item => {return {val: item.id, name: item.name}})}
                            selectedWatch={watch('locationId')}
                            title={'локация'}
                            tooltip={'Фактическое местонахождение сервера.'}/>
            <FormCheckboxList title='проекты'
                              tooltip='Выберите проекты в которых будет состоять данный сервер.'
                              addText='Добавить проект'
                              register={{...register("projects")}}
                              listItems={projects}
                              icon={projectIcon}
                              defaultItems={projectDefaultsItems()}>
                <ProjectsListItem/>
            </FormCheckboxList>
            <InputText register={{...register("from")}}
                      className={s.flex50}
                      title={'от кого'}
                      tooltip={'От кого получен данный сервер.'}/>
            <InputText register={{...register("accesses")}}
                      className={s.flex50}
                      title={'Доступы'}
                      tooltip={'Логин, пароль и другие доступы для удаленного подключения к серверу.'}/>
            <FormCheckboxList title='сервер антикапчи'
                              tooltip='Выберите сервер антикаптчи для данного сервера.'
                              addText='Добавить сервер'
                              register={{...register("anticaptchaServerIds")}}
                              listItems={antiCaptcha}
                              defaultItems={captchaDefaultsItems()}>
                <AntiCaptchaListItem/>
            </FormCheckboxList>
            <InputText register={{...register("internetProvider", {required: 'Обязательное поле'})}}
                       error={errors.internetProvider?.message}
                       className={s.flex25}
                       title={'Провайдер*'}/>
            <SelectTextList className={s.flex25}
                            register={{...register("connectionType", {required: 'Обязательное поле'})}}
                            list={[{val: '4G', name: '4G'}, {val: 'Wi-Fi', name: 'Wi-Fi'}, {val: 'Провод', name: 'Провод'}]}
                            selectedWatch={watch('connectionType')}
                            error={errors.connectionType?.message}
                            title={'Тип подключения*'}/>
            <InputText register={{...register("routerName", {required: 'Обязательное поле'})}}
                       error={errors.routerName?.message}
                       className={s.flex25}
                       title={'Роутер*'}/>
            <InputText className={s.flex25}
                      title={'умная розетка'}
                      tooltip={'Если данный сервер подключен к умной розетке, то указываем к какой именно.'}
                      disabled={true}/>
            <InputText register={{...register("control")}}
                      className={s.flex25}
                      title={'управление'}
                      tooltip={'Название программы по которой можно подключится к серверу.'}/>
            <InputText register={{...register("cases")}}
                      className={s.flex25}
                      title={'корпус'}
                      tooltip={'Какой корпус используется у сервера. Datacenter, Tower или другой.'}/>
            <InputText register={{...register("pathWithBrowserProfile")}}
                       className={s.flex25}
                       title={'Путь к папке с браузерами'}
                       tooltip={'Укажите полный путь к папке с браузерами.'}/>
            <RadioBtnAndText register={{...register('isAttention')}}
                             className={s.flex25}
                             title={'Статус'}
                             text={'Статус "Обратить внимание"'}/>
            <div className={`${s.flexBox}`}>
                <FormTextarea register={{...register("help")}}
                              classMain={s.flex50}
                              title={'справка'}
                              tooltip={'Поле для любой дополнительной информации.'}/>
                <FormTextarea register={{...register("error")}}
                              classMain={s.flex50}
                              title={'Неисправность'}
                              tooltip={'Здесь можно указать какие неисправности имеются на данном сервере.'}/>
            </div>
        </div>
    );
};

export default ServerInfoForm;