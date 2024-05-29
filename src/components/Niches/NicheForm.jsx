import React, {useState} from 'react';
import {Input, message} from "antd";
import { Button } from 'antd';
import {useTopVisor} from "../../hooks/useTopVisor";
import {useDevServer} from "../../hooks/useDevServer";

const NicheForm = ({cancel, nicheCreated}) => {
	const [name, setName] = useState(null)
	const [id, setId] = useState(null)

	const [error, setError] = useState('')

	const [getProjectsData, projectsDataIsLoading] = useTopVisor({
		url: '/get/projects_2/projects',
		data: {
			id: id
		}
	})

	const [createNiche, cnIsLoading] = useDevServer({
		url: '/profile-monitoring-system/niche/create',
		data: {
			name: name,
			topVisorIds: [id]
		}
	})

	const validate = () => {
		if (name && id) {
			getProjectsData().then(resp => {
				if (resp.result.length) {
					createNiche().then(resp => {
						nicheCreated(resp.result[0])
					}).catch(err => setError(err.message))
				} else {
					setError("Проекта с таким id не найдено")
				}
			}).catch(err => {
				setError("Несоответствие типа переданного параметра: 'id'")
			})
		} else {
			setError('Заполните все поля')
		}
	}

	return (
		<div className="niche-form">
			<div className="niche-form__header">Создание ниши</div>
			<div className="niche-form__inputs">
				<div className="niche-form__row">
					<div className="niche-form__label">Имя</div>
					<Input value={name} onChange={e => {
						setName(e.target.value)
						setError('')
					}}/>
				</div>
				<div className="niche-form__row">
					<div className="niche-form__label">TopVisor id</div>
					<Input value={id} onChange={e => {
						setId(e.target.value)
						setError('')
					}}/>
				</div>
			</div>
			{error &&
				<div className="niche-form__errors">{error}</div>
			}
			<div className="niche-form__actions">
				<Button type="primary" onClick={validate}>ok</Button>
				<Button onClick={cancel}>cancel</Button>
			</div>
		</div>
	);
};

export default NicheForm;
