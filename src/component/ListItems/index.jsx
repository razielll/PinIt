/* eslint-disable no-unused-vars */
import React from 'react';
import ListItem from './ListItem';

const ListItems = ({ items, onDelete }) => (
	<div className='list-items-container'>
		{items.map((item, i) => (
			<ListItem key={`${i}-${item.id}`}>
				<div className='item-header'>
					<span className='pin'>📌</span>
					<h2 style={{ width: '80%', fontSize: '18px' }}>{item.address}</h2>
					<span
						onClick={e => {
							e.stopPropagation();
							onDelete(item.id);
						}}>
						&times;
					</span>
					{/* <img
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Trash_font_awesome.svg/512px-Trash_font_awesome.svg.png'
						alt='delete'
						style={{ width: '10%' }}
						className='trash-icon'
					
					/> */}
				</div>
				<div className='item-details'></div>
			</ListItem>
		))}
	</div>
);

export default ListItems;
