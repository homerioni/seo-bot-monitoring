import React, {useEffect, useState} from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import {useTopVisor} from "../../hooks/useTopVisor";
import {Link} from "react-router-dom";
import {routeNames} from "../../router/routeNames";
import {useDevServer} from "../../hooks/useDevServer";
import {message} from "antd";

const NichesList = ({ niches, setNiches }) => {
	const [activeRequests, setActiveRequests] = useState(0)
	const [kwForDl, setKWForDl] = useState([])
	const [sitesForDl, setSitesForDl] = useState([])

	const [getKeywords, keywordsIsLoading] = useTopVisor({
		url: '/get/keywords_2/keywords',
		data: {
			fields: ["name", 'id', "group_id", "group_on"],
			status_positions: 1,
		}
	})

	const [getCompetitors, competitorsIsLoading] = useTopVisor({
		url: '/get/projects_2/competitors',
		data: {}
	})

	const [idDeleting, setIdDeleting] = useState(null)

	const [deleteNiche, deleteNicheIsLoading] = useDevServer({
		data: {}
	})

	useEffect(() => {
		if (niches.length) {
			setKWForDl(niches.filter(el => !el.ready).map(el => el.topVisorIds[0]))
			setSitesForDl(niches.filter(el => !el.ready1).map(el => el.topVisorIds[0]))
		}
	},[niches])

	useEffect(() => {
		if (activeRequests < 4) {
			if (kwForDl.length) {
				let curId = kwForDl[0]
				getKeywords({ project_id: curId, }).then(resp => {
					setNiches(st =>
						st.map(el => {
							if (el.topVisorIds[0] === curId) {
								return { ...el, kwCount: resp.result.filter(kw => kw.group_on === 1).length, ready: true }
							} else {
								return el
							}
						})
					)
					setActiveRequests(st => st - 1)
				})
				setActiveRequests(st => st + 1)
				setKWForDl(st => st.filter((el, index) => index !== 0))
			}
		}
		if (activeRequests < 4) {
			if (sitesForDl.length) {
				let curId = sitesForDl[0]
				console.log(curId)
				getCompetitors({ project_id: curId }).then(resp => {
					setNiches(st =>
						st.map(el => {
							if (el.topVisorIds[0] === curId) {
								return { ...el, sitesCount: resp.result.length, ready1: true }
							} else {
								return el
							}
						})
					)
					setActiveRequests(st => st - 1)
				})
				setActiveRequests(st => st + 1)
				setSitesForDl(st => st.filter((el, index) => index !== 0))
			}
		}
	},[activeRequests, kwForDl, sitesForDl])


	const tryDeleteNiche = (id) => {
		deleteNiche({}, '/profile-monitoring-system/niche/' + id + '/delete').then(resp => {
			message.success('ниша ' + niches.filter(el => el.id === id)[0].name + ' удалена')
			setNiches(st => st.filter(el => el.id !== id))
		}).catch(err => message.error(err.message))
	}

	return (
		<div className="niches-list">
			<div className="niches-list__header">
				<div className="niches-list__cell">Ниша</div>
				<div className="niches-list__cell">кол-во сайтов</div>
				<div className="niches-list__cell">Фразы</div>
				<div className="niches-list__cell"/>
			</div>
			{niches.map(nich =>
				<div className="niches-list__row" key={nich.id}>
					<div className="niches-list__cell">
						<div className="niches-list__name">
							<div className="niches-list__icon">
								<svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect opacity="0.2" width="57" height="57" rx="28.5" fill="#5BC2FF"/>
									<mask id="mask0_5051_121442" style={{"maskType": "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="57" height="57">
										<rect width="57" height="57" rx="28.5" fill="#53F0B8"/>
									</mask>
									<g mask="url(#mask0_5051_121442)">
										<path d="M21 49C21 37.9543 29.9543 29 41 29C52.0457 29 61 37.9543 61 49C61 60.0457 52.0457 69 41 69C29.9543 69 21 60.0457 21 49Z" fill="#5BC2FF"/>
										<path d="M7.5 29C7.5 19.8873 14.8873 12.5 24 12.5C33.1127 12.5 40.5 19.8873 40.5 29C40.5 38.1127 33.1127 45.5 24 45.5C14.8873 45.5 7.5 38.1127 7.5 29Z" stroke="white"/>
										<g filter="url(#filter0_i_5051_121442)">
											<path d="M18 12C18 4.26801 24.268 -2 32 -2C39.732 -2 46 4.26801 46 12C46 19.732 39.732 26 32 26C24.268 26 18 19.732 18 12Z" fill="url(#paint0_linear_5051_121442)"/>
											<path d="M18 12C18 4.26801 24.268 -2 32 -2C39.732 -2 46 4.26801 46 12C46 19.732 39.732 26 32 26C24.268 26 18 19.732 18 12Z" fill="white" fillOpacity="0.1"/>
										</g>
									</g>
									<defs>
										<filter id="filter0_i_5051_121442" x="18" y="-2" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
											<feFlood floodOpacity="0" result="BackgroundImageFix"/>
											<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
											<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
											<feOffset dx="4" dy="4"/>
											<feGaussianBlur stdDeviation="9"/>
											<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
											<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
											<feBlend mode="normal" in2="shape" result="effect1_innerShadow_5051_121442"/>
										</filter>
										<linearGradient id="paint0_linear_5051_121442" x1="26" y1="4" x2="31.2937" y2="26.1687" gradientUnits="userSpaceOnUse">
											<stop stopColor="#5BC2FF"/>
											<stop offset="1" stopColor="#2A8CC6"/>
										</linearGradient>
									</defs>
								</svg>
							</div>
							<div className="niches-list__name-text">
								<Link to={routeNames.niche + '/' + nich.topVisorIds[0]}>{nich.name}</Link>
							</div>
						</div>
					</div>
					<div className="niches-list__cell">
						{nich.ready1 ? nich.sitesCount : <LoadingOutlined /> }
					</div>
					<div className="niches-list__cell">
						{nich.ready ? nich.kwCount : <LoadingOutlined /> }
					</div>
					<div className="niches-list__cell">
						<DeleteOutlined onClick={() => {
							tryDeleteNiche(nich.id)
						}}/>
					</div>
				</div>
			)}
		</div>
	);
};

export default NichesList;
