import React from 'react';
import ListItem from './ListItem';

const ListItems = props => {
	return (
		<div className='list-items-container'>
			{props.items.map((item, i) => (
				<ListItem>
					<div key={i} className='item-container'>
						<h2>address</h2>
					</div>
				</ListItem>
			))}
		</div>
	);
};

export default ListItems;
