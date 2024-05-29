import React from 'react';
import {NavLink} from "react-router-dom";
import {routeNames} from "../../router/routeNames";
import {DatePicker, Divider, Input, Select} from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import SwitchUI from "./UI/SwitchUI";
import IconYandex from "./icons/IconYandex";
import IconGoogle from "./icons/IconGoogle";

const Filter = () => {
	return (
		<>
			<div className="main__header">
				<div>
					<NavLink to={routeNames.projects} className="main__btn main__btn--min">
						<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19 9C19.5523 9 20 8.55228 20 8C20 7.44772 19.5523 7 19 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM19 7L1 7V9L19 9V7Z"
								fill="#92A1B2"/>
						</svg>
					</NavLink>
					<p className="main__title map">
						<span>{project.name ? project.name : 'Загрузка...'}</span>
						<span className="gray">Карта статистики</span>
					</p>
				</div>
				<div>
					<div className={selectedFilter === 4 && !metricaIsDisabled ? "map-filter-select-bg active" : "map-filter-select-bg" }>
						<div className="hm-top-pos-wrapper">
							<div className="map-filter-btn"><div/></div>
							<div className="hm-top-pos__label map-filter">Посещаемость</div>
							<Select
								className="custom map-filter"
								size="large"
								placeholder='Выберите фразу'
								options={metrikaPhrases || []}
								disabled={metricaIsDisabled}
								onChange={(val) => {
									setSelectedFilter(4)
									setSelectedPhrase(val)
								}}
								loading={metricaIsLoading || metricaByPhraseIsLoading}
							/>
						</div>
					</div>
					<div className={selectedFilter === 4 && !metricaIsDisabled ? "map-filter-select-bg active" : "map-filter-select-bg" }>
						<div className="hm-top-pos-wrapper">
							<RangePicker
								value={[dayjs(metricaPeriod.dates[0]), dayjs(metricaPeriod.dates[1])]}
								onChange={(date, dateString) => {
									setMetricaPeriod({ dates: dateString, init: true })
								}}
								disabled={metricaIsDisabled}
								locale={locale}
							/>
						</div>
					</div>
					<SwitchUI className="purple" onChange={(val) => {
						setSelectedRegion({ key: -1, index: -1 })
						setSelectedMap(val)
					}} options={[{title: 'Москва и регионы', value: 0}, { title: 'Москва и МО', value: 1}]}/>
					<SwitchUI className="purple" onChange={(val) => setSearchSystem(val)} options={[{title: <IconYandex/>, value: 0}, { title: <IconGoogle/>, value: 1}]}/>
					<SwitchUI className="purple" onChange={(val) => setDeviceType(val)} options={[{title: "desk", value: 0}, { title: "mob", value: 2}]}/>
				</div>
			</div>
			<div className="map-choise">
				<div className="map-filter-select-bg">
					<div className="hm-top-pos-wrapper">
						{/*<div className="map-filter-btn"><div/></div>
						<div className="hm-top-pos__label map-filter">Список дат</div>
						<Select
							className="custom map-filter"
							size="large"
							placeholder='Выберите дату'
							options={datesList.length === 0 && keywordsListIsLoading ? [] : datesList}
							loading={datesList.length === 0 && keywordsListIsLoading}
							value={selectedDate}
							onChange={(val) => {
								setSelectedDate(val)
							}}
						/>*/}
						<DatePicker
							onChange={(date, dateString) => setSelectedDate(dateString)}
							inputReadOnly={true}
							cellRender={cellRender}
							locale={locale}
						/>
					</div>
				</div>
				<div className={selectedFilter === 3 ? "map-filter-select-bg active" : "map-filter-select-bg" }>
					<div className="hm-top-pos-wrapper">
						<div className="map-filter-btn" onClick={() => setSelectedFilter(3)}><div/></div>
						<div className="hm-top-pos__label map-filter">Видимость</div>
						<Select
							className="custom map-filter"
							size="large"
							defaultValue={{value: -1, label: 'Все группы'}}
							options={groupsListIsLoading ? [] : groups}
							loading={groupsListIsLoading || groupIsLoading}
							onChange={(val) => {
								setSelectedFilter(3)
								setGroupsFilter(val)
							}}
						/>
					</div>
				</div>
				<div className={selectedFilter === 0 ? "map-filter-select-bg active" : "map-filter-select-bg" }>
					<div className="hm-top-pos-wrapper">
						<div className="map-filter-btn" onClick={() => setSelectedFilter(0)}><div/></div>
						<div className="hm-top-pos__label map-filter">фильтр по выбранному запросу</div>
						<Select
							className="custom map-filter"
							size="large"
							placeholder='Выберите фразу'
							options={keywordsListIsLoading ? [] : queryList}
							loading={keywordsListIsLoading}
							onChange={(val) => {
								setSelectedFilter(0)
								setKeywordFilter(val)
							}}
							dropdownRender={(menu) => (
								<>
									<div className="keywords-filter-wrap">
										<div className="keywords-search">
											<Input
												value={keywordsQuery}
												onChange={e => setKeywordsQuery(e.target.value)}
												placeholder="Поиск запроса"
											/>
										</div>
										<div className="keywords-filter">
											{keywordsFilterOptions.map(el =>
												<div className={keywordsFilter === el ? "keywords-filter__item active" : "keywords-filter__item"} key={el}>
													<span onClick={() => {
														setKeywordsFilter(el)
													}}>{el === 0 ? 'Все' : el}</span>
												</div>
											)}
										</div>
									</div>
									<Divider
										style={{
											margin: '8px 0',
										}}
									/>
									{menu}
								</>
							)}
						/>
					</div>
				</div>
				<div className={selectedFilter === 1 ? "map-filter-select-bg active" : "map-filter-select-bg" }>
					<div className="hm-top-pos-wrapper">
						<div className="map-filter-btn" onClick={() => setSelectedFilter(1)}><div/></div>
						<div className="hm-top-pos__label map-filter">запросов в регионах, входящих в</div>
						<Select
							className="custom map-filter"
							size="large"
							defaultValue={3}
							options={options}
							onChange={val => {
								setSelectedFilter(1)
								setMainTopFilter(val)
							}}
						/>
					</div>
				</div>
				<div className={selectedFilter === 2 ? "map-filter-select-bg active" : "map-filter-select-bg" }>
					<div className="hm-top-pos-wrapper">
						<div className="map-filter-btn" onClick={() => setSelectedFilter(2)}><div/></div>
						<div className="hm-top-pos__label map-filter">регионы, в которых</div>
						<Select
							className="custom map-filter"
							size="large"
							options={options1}
							value={requestsPart}
							onChange={(val) => {
								setRequestsPart(val)
								setSelectedFilter(2)
							}}
						/>
					</div>
					<div className="hm-top-pos-wrapper ml">
						<div className="hm-top-pos__label">входят в</div>
						<Select
							className="custom topPos"
							size="large"
							options={options}
							value={requestsPartTop}
							onChange={(val) => {
								setRequestsPartTop(val)
								setSelectedFilter(2)
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Filter;
