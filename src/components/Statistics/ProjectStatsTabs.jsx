import React, {useEffect} from 'react';
import {Tabs} from "antd";
import {Scrollbars} from "react-custom-scrollbars";

const ProjectStatsTabs = ({project, kwLength, kwSummary}) => {

	return (
		<div>
			<Tabs
				defaultActiveKey="1"
				items={[
					{
						label: 'Динамика веса',
						key: '1',
						children: <div>
							<div className="weight-graph">
								<div className="weight-graph__values">
									<div className="weight-graph__values-max">{kwLength*100}</div>
									<div className="weight-graph__values-min">0</div>
								</div>
								<div className="phrase-placement__wrapper graph2">
									<Scrollbars>
										<div className="weight-graph__graph">
											{project.stats.map((el, ind) =>
												<div className="weight-graph__col" key={ind}>
													<div className="weight-graph__cw">
														<div className="weight-graph__val">{el.val[0] > 0 ? (el.val[0] + '' + el.val[1] + '' + el.val[2]) : el.val[1] > 0 ? el.val[1] + '' + el.val[2] : el.val[2] }</div>
														<div className="weight-graph__cw-t"/>
														<div className="weight-graph__cw-v" style={{ height: (el.val[0]*100 + el.val[1]*10 + el.val[2])/(kwLength*100)*6 + 'rem' }}/>
														<div className="weight-graph__cw-b"/>
													</div>
													<div className="weight-graph__date">{('' + el.date).slice(8, 10) + '-' + ('' + el.date).slice(5, 7)}</div>
												</div>
											)}
										</div>
									</Scrollbars>
								</div>
							</div>
						</div>,
					},
					{
						label: 'Относительный вес',
						key: '2',
						children: <div>
							<div className="weight-graph">
								<div className="weight-graph__values">
									<div className="weight-graph__values-max">100%</div>
									<div className="weight-graph__values-min">0</div>
								</div>
								<div className="phrase-placement__wrapper graph2">
									<Scrollbars>
										<div className="weight-graph__graph">
											{project.stats.map((el, ind) =>
												<div className="weight-graph__col" key={ind}>
													<div className="weight-graph__cw">
														<div className="weight-graph__val">{kwSummary[ind] === 0 ? 0 : Math.round((el.val[0]*100 + el.val[1]*10 + el.val[2])/kwSummary[ind]*100) }</div>
														<div className="weight-graph__cw-t pink"/>
														<div className="weight-graph__cw-v pink" style={{ height: (el.val[0]*100 + el.val[1]*10 + el.val[2])/kwSummary[ind]*6 + 'rem' }}/>
														<div className="weight-graph__cw-b pink"/>
													</div>
													<div className="weight-graph__date">{('' + el.date).slice(8, 10) + '-' + ('' + el.date).slice(5, 7)}</div>
												</div>
											)}
										</div>
									</Scrollbars>
								</div>
							</div>
						</div>,
					},
					{
						label: 'Относительный вес в выдаче',
						key: '3',
						children: <div>
							<div className="weight-graph">
								<div className="weight-graph__values">
									<div className="weight-graph__values-max">100%</div>
									<div className="weight-graph__values-min">0</div>
								</div>
								<div className="phrase-placement__wrapper graph2">
									<Scrollbars>
										<div className="weight-graph__graph">
											{project.stats.map((el, ind) =>
												<div className="weight-graph__col" key={ind}>
													<div className="weight-graph__cw">
														<div className="weight-graph__val">{kwSummary[ind] === 0 ? 0 : Math.round((el.val[0]*100 + el.val[1]*10 + el.val[2])/(kwLength*334)*100) }</div>
														<div className="weight-graph__cw-t orange"/>
														<div className="weight-graph__cw-v orange" style={{ height: (el.val[0]*100 + el.val[1]*10 + el.val[2])/(kwLength*334)*6 + 'rem' }}/>
														<div className="weight-graph__cw-b orange"/>
													</div>
													<div className="weight-graph__date">{('' + el.date).slice(8, 10) + '-' + ('' + el.date).slice(5, 7)}</div>
												</div>
											)}
										</div>
									</Scrollbars>
								</div>
							</div>
						</div>,
					},
				]}
			/>
		</div>
	);
};

export default ProjectStatsTabs;
