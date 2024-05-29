import React from 'react';
import s from "./FormTextarea.module.scss";
import {Controller} from "react-hook-form";
import {Mentions} from "antd";

const FormTextarea = ({title, control, tooltip, register, classMain, classLabel, error, mentionsData}) => {
    return (
        <div className={classMain}>
            {title &&
                <div className={s.titleBox}>
                    <p>{title}</p>
                    {tooltip ?
                        <div className={s.tooltip}>
                            <p>{tooltip}</p>
                        </div> : ''}
                </div>}
            <div className={`${s.labelBox} ${classLabel}`}>
				<label className={`${s.label} ${error ? s.error : ''}`}>
					{control ?
						<Controller name={register.name} control={control} render={({field}) =>
							<Mentions
								autoSize
								value={field.value}
								style={{width: '100%'}}
								rootClassName={s.antMentionM}
								popupClassName={s.antMentionP}
								prefix="$"
								options={mentionsData}
								onChange={field.onChange}
								ref={register.ref}
								onBlur={register.onBlur}
							/>}
						/>
						:
						<textarea {...register}/>}
					{error ? <span className={s.errorText}>{error}</span> : ''}
				</label>
			</div>
		</div>
    );
};

export default FormTextarea;
