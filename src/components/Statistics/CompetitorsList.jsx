import React, {useEffect} from 'react';

const CompetitorsList = ({competitors}) => {

	useEffect(() => {
		console.log('competitors')
		console.log(competitors)
	},[competitors])

	return (
		<div className="competitors-list">
			{competitors.map(el =>
				<div className="competitors-list__item" key={el.id}>
					<div className="competitors-list__cell">
						<div className="competitors-list__title">название</div>
						<div className="competitors-list__value">{el.name}</div>
					</div>
					<div className="competitors-list__dot"/>
					<div className="competitors-list__cell">
						<div className="competitors-list__title">адрес сайта</div>
						<div className="competitors-list__value">{el.site}</div>
					</div>
					<div className="competitors-list__dot"/>
					<div className="competitors-list__cell">
						<div className="competitors-list__title">id топвизор</div>
						<div className="competitors-list__value">{el.id}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompetitorsList;
