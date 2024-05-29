import React, {useEffect, useState} from 'react';
import {Input, Space, Button, message, Select} from "antd";
import {useTopVisor} from "../hooks/useTopVisor";
import PageIsLoading from "../components/map/PageIsLoading";
import {formatDate} from "../components/Statistics/utils";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Modal from "antd/es/modal";
import KeywordsModal from "../components/Statistics/KeywordsModal";
import KeywordsGroup from "../components/Statistics/KeywordsGroup";
import PhraseSections from "../components/Statistics/PhraseSections";
import CompetitorsList from "../components/Statistics/CompetitorsList";
import Empty from "antd/es/empty";
import {useParams} from "react-router";
import {routeNames} from "../router/routeNames";
import {Link} from "react-router-dom";
import GroupSection from "../components/Statistics/GroupSection";
import ProjectStatistics from "./ProjectStatistics";

const Statistics = () => {
	const params = useParams()

	const mainProjectInitial = {
		id: params.id,
		error: false,
		ready: false,
		data: null
	}

	const [selectedRegionIndex, setSelectedRegionIndex] = useState(1)
	const [regionList, setRegionList] = useState([])

	const [mainProject, setMainProject] = useState(mainProjectInitial)
	const [keywords, setKeywords] = useState([])
	const [groupList, setGroupList] = useState([])
	const [keywordsForSelect, setKeywordsForSelect] = useState([])
	const [selectedPhrase, setSelectedPhrase] = useState(null)
	const [selectedPhraseStats, setSelectedPhraseStats] = useState([])
	const [mainProjectStats, setMainProjectStats] = useState([])
	const [selectedDevice, setSelectedDevice] = useState(0)

	const [showPhraseSection, setShowPhraseSection] = useState(false)
	const [showGroupSection, setShowGroupSection] = useState(false)
	const [showDynamicsSection, setShowDynamicsSection] = useState(false)

	const [dates, setDates] = useState([
		formatDate(0),
		formatDate(1),
		formatDate(2),
		formatDate(3),
		formatDate(4),
		formatDate(5),
		formatDate(6),
		formatDate(7),
		formatDate(8),
		formatDate(9),
		formatDate(10),
		formatDate(11),
		formatDate(12),
		formatDate(13),
		formatDate(14),
		formatDate(15),
		formatDate(16),
		formatDate(17),
		formatDate(18),
		formatDate(19),
		formatDate(21),
		formatDate(22),
		formatDate(23),
		formatDate(24),
		formatDate(25),
		formatDate(26),
		formatDate(27),
		formatDate(28),
		formatDate(29),
		formatDate(30),
		formatDate(31),
		formatDate(32),
		formatDate(33),
		formatDate(34),
		formatDate(35),
		formatDate(36),
		formatDate(37),
		formatDate(38),
		formatDate(39),
		formatDate(40),
		formatDate(41),
		formatDate(42),
		formatDate(43),
		formatDate(44),
		formatDate(45),
		formatDate(46),
		formatDate(47),
		formatDate(48),
		formatDate(49),
		formatDate(50),
		formatDate(51),
		formatDate(52),
		formatDate(53),
		formatDate(54),
		formatDate(55),
		formatDate(56),
		formatDate(57),
		formatDate(58),
		formatDate(59),
		formatDate(60),
		formatDate(61),
		formatDate(62),
		formatDate(63),
		formatDate(64),
		formatDate(65),
		formatDate(66),
		formatDate(67),
		formatDate(68),
		formatDate(69),
		formatDate(70),
	])

	const [additionalProjectForm, setAdditionalProjectForm] = useState({...mainProjectInitial, id: 4924988 })
	const [additionalProjects, setAdditionalProjects] = useState([])

	const [getProjectsData, projectsDataIsLoading] = useTopVisor({
		url: '/get/projects_2/projects',
		data: {
			fields: ["name", "positions_time", 'status_positions', 'url'],
			show_searchers_and_regions: 1,
			id: mainProject.id,
			status_positions: 1,
			include_positions_summary_params: ['status_positions', 'positions_time'],
		}
	})

	const [getAdditionalProjectsData, projectsAdditionalDataIsLoading] = useTopVisor({
		url: '/get/projects_2/projects',
		data: {
			fields: ["name", "positions_time", 'status_positions'],
			show_searchers_and_regions: 1,
			id: additionalProjectForm.id,
			status_positions: 1,
			include_positions_summary_params: ['status_positions', 'positions_time'],
		}
	})

	const [getKeywords, keywordsIsLoading] = useTopVisor({
		url: '/get/keywords_2/keywords',
		data: {
			project_id: mainProject.id,
			fields: ["name", 'id', "group_id", "group_on"],
			status_positions: 1,
		}
	})

	const [getGroupsList, groupsListIsLoading] = useTopVisor({
		url: '/get/keywords_2/groups',
		data: {
			project_id: mainProject.id,
			fields: ["name", 'id', 'on', "folder_id", "folder_path"],
		}
	})

	const [getTopVisorData, topVisorDataIsLoading] = useTopVisor({
		url: '/get/positions_2/history',
		data: {
			regions_indexes: [selectedRegionIndex],
			project_id: mainProject.id,
			date1: dates[dates.length -1],
			date2: dates[0],
			positions_fields: ["position"],
			fields: ["name", "id"]
		}
	})

	const [getCompetitors, competitorsIsLoading] = useTopVisor({
		url: '/get/projects_2/competitors',
		data: {
			project_id: mainProject.id
		}
	})

	const [getSnapShot, spanShotIsLoading] = useTopVisor({
		url: '/get/snapshots_2/history',
		data: {
			region_key: selectedRegionIndex,
			project_id: mainProject.id,
			searcher_key: 0,
			region_lang: 'ru',
			date1: dates[6],
			date2: dates[0],
			positions_fields: ["url", "domain"],
			"filters":[{
				"name": "id",
				"operator": "EQUALS",
				"values": [selectedPhrase]
			}]
		}
	})

	const sliceIntoChunks = (arr, chunkSize) => {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	const [activeRequests, setActiveRequests] = useState(0)
	const [competitorsList, setCompetitorsList] = useState([])
	const [competitorsForDl, setCompetitorsForDl] = useState([])
	const [datesForDl, setDatesForDl] = useState(sliceIntoChunks(dates, 30))
	const [competitorsStats, setCompetitorsStats] = useState([])

	useEffect(() => {
		setDatesForDl(sliceIntoChunks(dates, 30))
	},[dates])

	const getStatsByMounths = (ind, data) => {
		if (ind < datesForDl.length) {
			getTopVisorData({ project_id: mainProject.id, date1: datesForDl[ind][datesForDl[ind].length - 1], date2: datesForDl[ind][0] }).then(resp => {
				getStatsByMounths(ind + 1, resp.result.keywords.map((el, index) => {
					return data[index]?.positionsData ? { ...el, positionsData: Object.assign({...el.positionsData }, data[index].positionsData ) } : el
				}))
			}).catch(err => message.error(err.message))
		} else {
			setActiveRequests(st => st - 1)
			setMainProjectStats(data)
		}
	}

	const getCompByMounths = (ind, data, ids, obj) => {
		if (ind < datesForDl.length) {
			getTopVisorData({ competitors_ids: ids, date1: datesForDl[ind][datesForDl[ind].length - 1], date2: datesForDl[ind][0] }).then(resp => {
				getCompByMounths(ind + 1, resp.result.keywords.map((el, index) => {
					return data[index]?.positionsData ? { ...el, positionsData: Object.assign({...el.positionsData }, data[index].positionsData ) } : el
				}), ids, obj)
			}).catch(err => {
				message.error(err.message)
			})
		} else {
			setActiveRequests(st => st - 1)
			console.log('final data ' + obj.name)
			console.log(data)
			setCompetitorsStats(st => [...st, {...obj, keywordsStats: data }])
		}
	}

	const tryGetMainProject = () => {
		if (mainProject.id) {
			setSelectedPhrase(null)
			setSelectedPhraseStats([])
			setMainProjectStats([])
			if (additionalProjects.filter(el => el.id.toString() === mainProject.id).length) {
				setAdditionalProjects(st => { return st.filter(el => el.id.toString() !== mainProject.id) })
			}
			setMainProject(st => { return {...st, error: false, ready: false, data: null } })
			getProjectsData().then(resp => {
				if (resp.result.length) {
					setMainProject(st => { return {...st, ready: true, data: resp.result[0] } })
					setRegionList(resp.result[0].searchers[0].regions)
					if (datesForDl.length > 1) {
						setActiveRequests(st => st + 1)
						getStatsByMounths(0,[])
					} else {
						getTopVisorData({ project_id: mainProject.id, date1: datesForDl[0][datesForDl[0].length - 1], date2: datesForDl[0][0] }).then(resp => {
							setMainProjectStats(resp.result.keywords)
						}).catch(err => message.error(err.message))
					}
				} else {
					setMainProject(st => { return {...st, error: true } })
					message.error("Проекта с таким id не найдено")
				}
			}).catch(err => {
				message.error("Несоответствие типа переданного параметра: 'id'")
				setMainProject(st => { return {...st, error: true } })
			})

			getGroupsList().then(resp => {
				let groups = resp.result.filter(el => el.on === 1)
				console.log('---groups---')
				console.log(groups)
				setGroupList(groups)
			}).catch(err => message.error(err.message))
			getKeywords().then(resp => {
				let kl = resp.result.filter(el => el.group_on === 1)
				setKeywords(kl)
				setKeywordsForSelect(kl.map(el => { return { label: el.name, value: el.id }}))
				console.log('---keywords---')
				console.log(kl)
			}).catch(err => message.error(err.message))
			getCompetitors().then(resp => {
				console.log('Competitors')
				console.log(resp.result)
				setCompetitorsList(resp.result)
				setCompetitorsForDl(resp.result.map(el => { return el.id }))
			})
		}
	}

	useEffect(() => {
		if (mainProject.ready) {
			setSelectedPhraseStats([])
			setMainProjectStats([])
			setCompetitorsStats([])
			setCompetitorsForDl(competitorsList.map(el => { return el.id }))
			if (datesForDl.length > 1) {
				setActiveRequests(st => st + 1)
				getStatsByMounths(0,[])
			} else {
				getTopVisorData({ project_id: mainProject.id, date1: datesForDl[0][datesForDl[0].length - 1], date2: datesForDl[0][0] }).then(resp => {
					setMainProjectStats(resp.result.keywords)
				}).catch(err => message.error(err.message))
			}
		}
	},[selectedRegionIndex, datesForDl])

	useEffect(() => {
		if (competitorsForDl.length) {
			if (activeRequests < 4) {
				let cur = competitorsForDl[0],
					obj = { id: cur, site: competitorsList.filter(el => el.id === cur )[0].site, name: competitorsList.filter(el => el.id === cur )[0].name }
				if (datesForDl.length > 1) {
					getCompByMounths(0,[], [competitorsForDl[0]], obj)
				} else {
					getTopVisorData({ competitors_ids: [competitorsForDl[0]]}).then(resp => {
						setActiveRequests(st => st - 1)
						setCompetitorsStats(st => [...st, {...obj, keywordsStats: resp.result.keywords }])
					}).catch(err => {
						message.error(err.message)
						setActiveRequests(st => st - 1)
					})
				}
				setActiveRequests(st => st + 1)
				setCompetitorsForDl(st => [...st].filter((el, ind) => ind !== 0))
			}
		} else {
			if (activeRequests === 0) {
				console.log('competitorsStats')
				console.log(competitorsStats)
			}
		}
	},[competitorsForDl, activeRequests])

	const [keywordsModalIsOpen, setKeywordsModalIsOpen] = useState(false)

	const [summaryPositions, setSummaryPositions] = useState([])
	const [graphData, setGraphData] = useState([])
	const [graphCountData, setGraphCountData] = useState([])

	useEffect(() => {
		if (selectedPhraseStats.length) {
			let summary = [],
				graph = [],
				graphCount = []
			dates.forEach((date, index) => {
				graph.push({ name: ('' + date).slice(8, 10) + '-' + ('' + date).slice(5, 7) })
				graphCount.push({ name: ('' + date).slice(8, 10) + '-' + ('' + date).slice(5, 7) })
				summary.push([0, 0, 0])
				selectedPhraseStats.forEach((project, i) => {
					if (project.kwStat.positionsData) {
						let pos = parseInt(project.kwStat.positionsData[date + ':' + project.id + ':' + selectedRegionIndex]?.position)
						if (pos === 1 || pos === 2 || pos === 3) {
							summary[index][0] = summary[index][0] + 1
						} else if (pos === 4 || pos === 5 || pos === 6) {
							summary[index][1] = summary[index][1] + 1
						} else if (pos === 7 || pos === 8 || pos === 9 || pos === 10) {
							summary[index][2] = summary[index][2] + 1
						}
					}
				})
				graph[index].sum = summary[index][0]*100 + summary[index][1]*10 + summary[index][2]
				graphCount[index].count = summary[index][0] + summary[index][1] + summary[index][2]
			})
			setGraphData(graph)
			setGraphCountData(graphCount)
			setSummaryPositions(summary)
		}
	},[selectedPhraseStats])

	const [statsIsLoading, setStatsIsLoading] = useState(true)
	const [selectedGroupStats, setSelectedGroupStats] = useState([])
	const [selectedGroup, setSelectedGroup] = useState(null)

	useEffect(() => {
		if (competitorsForDl.length === 0 && activeRequests === 0) {
			setStatsIsLoading(false)
			if (selectedPhrase) {
				if (mainProjectStats.filter(el => el.id === selectedPhrase).length) {
					let arr = []
					if (mainProjectStats.filter(el => el.id === selectedPhrase).length) {
						arr.push({
							id: mainProject.id,
							name: mainProject.data.name,
							kwStat: mainProjectStats.filter(el => el.id === selectedPhrase)[0],
							url: mainProject.data.url
						})
					}
					competitorsStats.forEach(pr => {
						if (pr.keywordsStats.filter(kw => kw.id === selectedPhrase).length) {
							arr.push({
								id: pr.id,
								name: pr.name,
								kwStat: pr.keywordsStats.filter(kw => kw.id === selectedPhrase)[0],
								url: pr.site
							})
						}
					})
					setSelectedPhraseStats(arr)
				}
			}
			if (selectedGroup) {
				let groupKeywords = keywords.filter(el => el.group_id === selectedGroup)
				if (groupKeywords.length) {
					let keywordsStats = []
					groupKeywords.forEach(kw => {
						if (mainProjectStats.filter(el => el.id === kw.id).length) {
							let arr = []
							if (mainProjectStats.filter(el => el.id === kw.id).length) {
								arr.push({
									id: mainProject.id,
									name: mainProject.data.name,
									kwStat: mainProjectStats.filter(el => el.id === kw.id)[0].positionsData,
									url: mainProject.data.url
								})
							}
							competitorsStats.forEach(pr => {
								if (pr.keywordsStats.filter(el => el.id === kw.id).length) {
									arr.push({
										id: pr.id,
										name: pr.name,
										kwStat: pr.keywordsStats.filter(el => el.id === kw.id)[0].positionsData,
										url: pr.site
									})
								}
							})
							keywordsStats.push({...kw, stats: arr})
						}
					})
					console.log('selectedGroupStats')
					setSelectedGroupStats(keywordsStats)
				}
			}
		} else {
			setStatsIsLoading(true)
		}
		/*getSnapShot().then(resp => {
			console.log('snapshot')
			console.log(resp.result)
		})*/
		console.log('competitorsStats')
		console.log(competitorsStats)
	},[selectedPhrase, competitorsStats, mainProject, competitorsForDl, activeRequests, selectedGroup])

	useEffect(() => {
		tryGetMainProject()
	},[])

	return (
		<section className={showPhraseSection ? "statistics-projects gray" : "statistics-projects"}>
			{showPhraseSection ?
				<PhraseSections
					additionalProjects={additionalProjects}
					setAdditionalProjects={setAdditionalProjects}
					graphData={graphData}
					graphCountData={graphCountData}
					selectedPhraseStats={selectedPhraseStats}
					selectedPhrase={selectedPhrase}
					summaryPositions={summaryPositions}
					dates={dates}
					setSelectedPhrase={setSelectedPhrase}
					keywordsForSelect={keywords}
					selectedRegionIndex={selectedRegionIndex}
					setSelectedRegionIndex={setSelectedRegionIndex}
					regionList={regionList}
					statsIsLoading={statsIsLoading}
					selectedDevice={selectedDevice}
					setSelectedDevice={setSelectedDevice}
					groups={groupList}
					setDates={setDates}
					back={() => {
						setSelectedPhrase(null)
						setShowPhraseSection(false)
					}}
				/>
				: showGroupSection ?
					<GroupSection
						selectedGroup={selectedGroup}
						setSelectedGroup={setSelectedGroup}
						groups={groupList}
						keywords={keywords}
						dates={dates}
						setDates={setDates}
						selectedDevice={selectedDevice}
						setSelectedDevice={setSelectedDevice}
						regionList={regionList}
						selectedRegionIndex={selectedRegionIndex}
						setSelectedRegionIndex={setSelectedRegionIndex}
						selectedGroupStats={selectedGroupStats}
						back={() => {
							setSelectedGroup(null)
							setShowGroupSection(false)
						}}
					/>
					: showDynamicsSection ?
						<ProjectStatistics
							back={() => {
								setShowDynamicsSection(false)
							}}
						/>
						:
				<>
					<div className="statistics-projects__header">
						<Link to={routeNames.niches} className="main__btn main__btn--min">
							<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M19 9C19.5523 9 20 8.55228 20 8C20 7.44772 19.5523 7 19 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM19 7L1 7V9L19 9V7Z"
									fill="#92A1B2"/>
							</svg>
						</Link>
						<div className="statistics-projects__header-text">{mainProject.ready ? mainProject.data.name : 'Загрузка...'}</div>
						<div className="statistics-projects__header-actions">
							<div className="statistics-projects__header-link" onClick={() => setShowPhraseSection(true)}>Анализ по фразе</div>
							<div className="statistics-projects__header-link" onClick={() => setShowGroupSection(true)}>Анализ по группе</div>
							<div className="statistics-projects__header-link" onClick={() => setShowDynamicsSection(true)}>Онлайн динамика</div>
						</div>
						<div className="statistics-projects__header-id">
							<div>ID</div>
							<div className="top-visor-id">{mainProject.ready ? mainProject.id : ''}</div>
						</div>
					</div>
					<div className="statistics-projects__content">
						<div className="statistics-projects__title">Группы для анализа и фразы</div>
						{/*
						<div className="main-project__form">
							<div className="main-project__input">
								<Space.Compact
									style={{
										width: '100%',
									}}
								>
									<Input
										placeholder="ID проекта"
										value={mainProject.id}
										onChange={e => setMainProject(st => { return {...st, id: e.target.value } })}
										status={mainProject.error ? "error" : ""}
										prefix={
											projectsDataIsLoading ? <LoadingOutlined /> : mainProject.error ? <WarningOutlined /> : mainProject.ready ? <CheckOutlined /> : false
										}
									/>
									<Button
										onClick={tryGetMainProject}
										type="primary"
									>{projectsDataIsLoading ? <LoadingOutlined /> : 'ok'}</Button>
								</Space.Compact>
							</div>
							{mainProject.ready && <div className="section-subHeader">{mainProject.data.name}</div> }
						</div>
					*/}
						{mainProject.ready && (keywordsIsLoading || groupsListIsLoading) && statsIsLoading ? <PageIsLoading/> :
							<div className="main-project__info">
								<Modal
									visible={keywordsModalIsOpen}
									onCancel={() => {
										setSelectedGroup(null)
										setKeywordsModalIsOpen(false)
									}}
									footer={false}
								>
									<KeywordsModal
										selectedGroup={selectedGroup}
										keywords={keywords}
										groups={groupList}
										setSelectedKeyword={(val) => {
											setSelectedPhrase(val)
											setShowPhraseSection(true)
											setKeywordsModalIsOpen(false)
										}}
									/>
								</Modal>
								<div className="main-project__groups">
									{groupList.length === 0 ? <div className="section-header">В проекте нет активных групп</div> :
										groupList.map(group =>
											<KeywordsGroup
												key={group.id}
												group={group}
												keywords={keywords}
												setSelectedPhrase={val => {
													setSelectedPhrase(val)
													setShowPhraseSection(true)
												}}
												setShowGroupSection={(val) => {
													setShowGroupSection(true)
													setSelectedGroup(val)
												}}
												callModal={() => {
													setSelectedGroup(group.id)
													setKeywordsModalIsOpen(true)
												}}
											/>
										)
									}
								</div>
							</div>
						}
						<div className="statistics-projects__title">Сайты участвуют в сравнении</div>
						{competitorsList.length > 0 ?
							<CompetitorsList competitors={competitorsList}/>
							:
							<Empty/>
						}

					</div>
				</>
			}
		</section>
	);
};

export default Statistics;
