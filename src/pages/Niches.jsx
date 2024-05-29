import React, {useEffect, useState} from 'react';
import {Empty, Input, message, Modal} from "antd";
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import NichesList from "../components/Niches/NichesList";
import {useDevServer} from "../hooks/useDevServer";
import PageIsLoading from "../components/map/PageIsLoading";
import NicheForm from "../components/Niches/NicheForm";

const Niches = () => {
	const [query, setQuery] = useState(null)
	const [nicheList, setNicheList] = useState([])
	const [formIsOpen, setFormIsOpen] = useState(false)

	const [getNiches, nichesIsLoading] = useDevServer({
		url: '/profile-monitoring-system/niche/get-all?count=10000&numberPage=0',
		method: 'GET'
	})

	useEffect(() => {
		getNiches().then(resp => {
			setNicheList(resp.result.map(el => { return { ...el, ready: false, ready1: false }} ))
		}).catch(err => message.error(err.message))
	},[])

	useEffect(() => {
		console.log('nicheList')
		console.log(nicheList)
	},[nicheList])

	return (
		<section className="statistics-projects">
			<div className="statistics-projects__header">
				<div className="btn-add" onClick={() => setFormIsOpen(true)}>+</div>
				<div className="statistics-projects__header-text">Аналитика занятости ниши</div>
				<div className="statistics-projects__header-input">
					<Input
						className='gray'
						prefix={<SearchOutlined />}
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder={'Поиск ниши'}
					/>
				</div>
			</div>
			<div className="statistics-projects__content">
				{nichesIsLoading ?
					<PageIsLoading/> :
					nicheList?.length > 0 ?
						<NichesList
							niches={nicheList}
							setNiches={setNicheList}
						/>
						: <Empty/>
				}
			</div>
			<Modal
				visible={formIsOpen}
				onCancel={() => {
					setFormIsOpen(false)
				}}
				footer={false}
			>
				<NicheForm
					cancel={() => setFormIsOpen(false)}
					nicheCreated={niche => {
						setNicheList([...nicheList, niche])
						setFormIsOpen(false)
					}}
				/>
			</Modal>
		</section>
	);
};

export default Niches;
