import React, {useEffect, useState} from 'react';
import Filter from "../components/map/Filter";
import MapRf from "../components/map/MapRF";
import MapMoscow from "../components/map/MapMoscow";
import {useTopVisor} from "../hooks/useTopVisor";
import {message} from "antd";
import {emptyRegions} from "../components/map/emptyRegions";
import {moscowEmpty} from "../components/map/moscowRegions";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const MapRefactor = () => {
	const [filter, setFilter] = useState({
		selectedMap: 0,
		selectedDate: '',
		lastUpdate: ''
	})

	const params = useParams()

	let dt = new Date()
	let today = dt.getFullYear() + '-' +
		(dt.getMonth() < 9 ? (dt.getMonth() + 1).toString().padStart(2, '0') : dt.getMonth() + 1) + '-' +
		(dt.getDate() < 10 ? dt.getDate().toString().padStart(2, '0') : dt.getDate())
	let yesterday = dt.getFullYear() + '-' +
		(dt.getMonth() < 9 ? (dt.getMonth() + 1).toString().padStart(2, '0') : dt.getMonth() + 1) + '-' +
		((dt.getDate()-1) < 9 ? (dt.getDate()-1).toString().padStart(2, '0') : (dt.getDate()-1))

	const [searchParams, setSearchParams] = useSearchParams();
	const projectId = searchParams.get('id');
	const metricaId = searchParams.get('metrica');

	const [getTopVisorData, topVisorDataIsLoading] = useTopVisor({
		url: '/get/positions_2/history',
		data: {
			project_id: projectId,
			//regions_indexes: regionsSummaryFiltered.map(el => { return el.index }),
			date1: filter.selectedDate ? filter.selectedDate : filter.lastUpdate === today ? yesterday : filter.lastUpdate,
			date2: filter.selectedDate ? filter.selectedDate : today,
			show_exists_dates: 1,
			positions_fields: ["position", "visitors"],
			fields: ["name", "id"]
		}
	})

	const [getSummary] = useTopVisor({
		url: '/get/positions_2/summary',
		data: {
			project_id: projectId,
			show_tops: 1,
			show_dynamics: 1,
			show_visibility: 1,
			dates: [selectedDate ? selectedDate : lastUpdate === today ? yesterday : lastUpdate, selectedDate ? selectedDate : today]
		}
	})

	const [getGroupSummary] = useTopVisor({
		url: '/get/positions_2/summary_chart',
		data: {
			project_id: projectId,
			show_visibility: 1,
			dates: [selectedDate ? selectedDate : lastUpdate, selectedDate ? selectedDate : today],
			filters:[{
				name: "group_id",
				operator: "EQUALS",
				values: [ groupsFilter ]
			}]
		}
	})

	const [getProjectsList, projectsListIsLoading] = useTopVisor({
		url: '/get/projects_2/projects',
		data: {
			fields: ["name", 'id']
		}
	})

	const [getKeywords, keywordsIsLoading] = useTopVisor({
		url: '/get/keywords_2/keywords',
		data: {
			project_id: projectId,
			fields: ["name", 'id', "group_id", "group_on"],
			status_positions: 1,
			/*filters:[{
				name: "project_id",
				operator: "EQUALS",
				values: [ projectId ]
			}]*/
		}
	})

	const [getGroupsList, groupsListIsLoading] = useTopVisor({
		url: '/get/keywords_2/groups',
		data: {
			project_id: projectId,
			fields: ["name", 'id', 'on', "folder_id", "folder_path"],
			/*"filters":[{
				"name": "project_id",
				"operator": "EQUALS",
				"values": [ projectId ]
			}]*/
		}
	})

	const [getFoldersList, groupsFoldersIsLoading] = useTopVisor({
		url: '/get/keywords_2/folders',
		data: {
			project_id: projectId,
			/*"filters":[{
				"name": "project_id",
				"operator": "EQUALS",
				"values": [ projectId ]
			}]*/
		}
	})

	const [getProjectsData, projectsDataIsLoading] = useTopVisor({
		url: '/get/projects_2/projects',
		data: {
			fields: ["name", "positions_time", 'status_positions'],
			show_searchers_and_regions: 1,
			status_positions: 1,
			id: projectId,
			include_positions_summary_params: ['status_positions', 'positions_time'],
		}
	})

	const [metricaKeywords, setMetricaKeywords] = useState([])

	useEffect(() => {
		if (!keywordsIsLoading && !metricaIsLoading) {
			let tmpKW = keywords.map(el => el.name)
			setMetricaKeywords(metrikaData.filter(el => tmpKW.includes(el.dimensions[0].name)))
		}
	},[keywordsIsLoading,metricaIsLoading, metrikaData])

	useEffect(() => {
		if (selectedDate) {
			setRegionsSummaryYa({ arr: [], ready: false })
			setRegionsSummaryYaMob({ arr: [], ready: false })
			setRegionsSummaryG({ arr: [], ready: false })
			setRegionsSummaryGMob({ arr: [], ready: false })
			setRegionsSummaryFiltered([])
			setKeywordsListIsLoading(true)
		}
		getProjectsData().then(resp => {
			if (resp.errors) {
				message.error(resp.errors[0].string)
			} else if (resp.result.length === 0) { message.error('Проекта с id ' + params.id + ' не существует') } else {
				let tmpArr = [...emptyRegions]
				let tmpArr2 = [...moscowEmpty]
				setProjectRegions(resp.result[0])
				setKeywordsForDl(resp.result[0].searchers[0].regions.map(el => el.index))
				if (resp.result[0].searchers.length > 1) {
					setKeywordsForDlGoogle(resp.result[0].searchers[1].regions.map(el => el.index))
				}
				setDynamicCount(resp.result[0].positions_summary.dynamics.all)
				if (selectedDate) {
					setLastUpdate(selectedDate)
				} else {
					setLastUpdate(resp.result[0].positions_time ? resp.result[0].positions_time.split(' ')[0] : today)
				}
				if (resp.result[0].searchers.length) {
					setRegionsForDl(resp.result[0].searchers[0].regions.map(el => {
						return { regionIndex: el.index, key: el.key, name: el.name, device: el.device }
					}))
					if (resp.result[0].searchers.length > 1) {
						setRegionsForDlGoogle(resp.result[0].searchers[1].regions.map(el => {
							return { regionIndex: el.index, key: el.key, name: el.name, device: el.device }
						}))
					}
				}
				resp.result[0].searchers[searchSystem].regions.forEach(el => {
					if (el.device === deviceType) {
						tmpArr = tmpArr.map(reg => {
							return reg.key === el.key ? {...reg,
								isSelected: true,
								name: el.name,
								areaName: el.areaName.split(',')[0],
								index: el.index,
								top: el.positions_summary.tops,
							} : reg
						})
						tmpArr2 = tmpArr2.map(reg => {
							return reg.key === el.key ? {...reg,
								isSelected: true,
								name: el.name,
								areaName: el.name === 'Москва' ? el.areaName : el.areaName.split(',')[1],
								index: el.index,
								top: el.positions_summary.tops,
							} : reg
						})
					}
				})
				setRegions(tmpArr)
				console.log(tmpArr)
				setRegionsMoscow(tmpArr2)
				console.log(tmpArr2)
			}
		}).catch(err => message.error(err.message))
		getGroupsList().then(resp => {
			let groups = resp.result.filter(el => el.on === 1),
				groupsDL = {}
			groups.forEach(el => {
				groupsDL['g' + el.id + 0] = true
				groupsDL['g' + el.id + 1] = true
			})
			setGroupsForDl(groupsDL)
			console.log('---groups---')
			console.log(groups)
			setGroupList(groups)
		}).catch(err => message.error(err.message))
		getKeywords().then(resp => {
			let kl = resp.result.filter(el => el.group_on === 1)
			setKeywords(kl)
			console.log('---keywords---')
			console.log(kl)
		}).catch(err => message.error(err.message))
	}, [selectedDate])

	return (
		<div>
			<Filter filter={filter} setFilter={setFilter}/>
			{filter.selectedMap > 0 ? <MapRf filter={filter}/> : <MapMoscow filter={filter}/>}
		</div>
	);
};

export default MapRefactor;
