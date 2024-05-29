import React from 'react';

const KeywordsModal = ({keywords, groups, selectedGroup, setSelectedKeyword}) => {
	return (
		<div className="keywords-modal">
			<div className="section-header">{groups.filter(el => el.id === selectedGroup)[0].name}</div>
			<div className="keywords-modal-list">
				{keywords.filter(el => el.group_id === selectedGroup).map(kw =>
					<div className="keywords-modal-list__item" key={kw.id}>
						<span onClick={() => setSelectedKeyword(kw.id)}>{kw.name}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default KeywordsModal;
