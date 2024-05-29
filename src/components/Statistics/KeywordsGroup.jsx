import React, {useState} from 'react';
import ExpandAltOutlined from '@ant-design/icons/ExpandAltOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import {Input} from "antd";
import { Scrollbars } from 'react-custom-scrollbars';

const KeywordsGroup = ({group, keywords, callModal, setSelectedPhrase, setShowGroupSection}) => {
	const [query, setQuery] = useState(null)

	return (
		<div className="main-project__group">
			<div className="main-project__group-title">
				<div className="main-project__keywords-count">{keywords.filter(el => el.group_id === group.id).length}</div>
				<div className="main-project__group-title-text">
					<span onClick={() => setShowGroupSection(group.id)}>{group.name}</span>
				</div>
				<div className="main-project__call-modal" onClick={callModal}>
					<ExpandAltOutlined/>
				</div>
			</div>
			<div className="main-project__group-input">
				<Input
					className='gray'
					prefix={<SearchOutlined />}
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder={'Поиск фразы'}
				/>
			</div>
			<div className="main-project__keywords">
				<Scrollbars >
					{keywords.filter(el => el.group_id === group.id)
						.filter(el => query ? el.name.toLowerCase().includes(query.trim().toLowerCase()) : el)
						.map(keyword =>
							<div className="main-project__keyword" key={keyword.id}>
								<span onClick={() => setSelectedPhrase(keyword.id)}>{keyword.name}</span>
							</div>
						)}
				</Scrollbars>
			</div>
		</div>
	);
};

export default KeywordsGroup;
