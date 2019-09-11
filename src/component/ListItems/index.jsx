/* eslint-disable no-unused-vars */
import React from 'react';
import ListItem from './ListItem';

const ListItems = ({ items, onDelete }) => (
	<div className='list-items-container'>
		{items.map((item, i) => (
			<ListItem key={`${i}-${item.id}`}>
				<div className='item-header'>
					<img src={item.icon} className='item-icon' alt='item-icon' />
					<h2>{item.address}</h2>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Trash_font_awesome.svg/512px-Trash_font_awesome.svg.png'
						alt={item.address}
						height='24'
						className='trash-icon'
						onClick={e => {
							e.stopPropagation();
							onDelete(item.id);
						}}
					/>
				</div>
				<div className='item-details'></div>
			</ListItem>
		))}
	</div>
);

export default ListItems;
