import React from 'react';
import ListItem from './ListItem';

const ListItems = props => {
	return (
		<div className='list-items-container'>
			{props.items.map((item, i) => (
				<ListItem key={i}>
					<div className='item-container'>
						<img src={item.icon} alt='item-icon' />
						<h2>{item.address}</h2>
						<img src='' alt='trash' />
					</div>
				</ListItem>
			))}
		</div>
	);
};

export default ListItems;
