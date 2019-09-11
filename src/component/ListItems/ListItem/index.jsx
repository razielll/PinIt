import React from 'react';

const ListItem = props => {
	let element = null;

	const expand = () => {
		console.log(element);
		element.classList.toggle('expanded');
	};

	return (
		<div
			className='list-item'
			onClick={expand}
			ref={ref => {
				element = ref;
			}}>
			{props.children}
		</div>
	);
};

export default ListItem;
