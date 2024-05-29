import s from './MetrikaListTemplate.module.scss';
import metrikaIcon from '../../../../../assets/img/metrikaIcon.svg';

export const getTemplate = (data, onInput, register) => {
    return (
        <label key={data.id} className={`${s.main} ${!register ? s.notHover : ''}`}>
            {register &&
                <input type='radio' {...register} onInput={onInput} value={data?.id}/>}
            <div className={s.box}>
                <div className={s.icon}>
                    <img src={metrikaIcon} alt=""/>
                </div>
                <p className={s.name}>Аккаунт #{data?.id - 999}</p>
            </div>
        </label>
    );
};