import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import './TodoListItemMenu.scss';

function TodoListItemMenu(props) {
	const { anchorEl, handleClose, deleteTodo } = props;

	const onDelete = () => {
		handleClose();
		deleteTodo();
	};

	return (
		<Menu
			id="simple-menu"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<MenuItem onClick={onDelete}><DeleteIcon className="menu-item-icon" />Delete</MenuItem>
		</Menu>
	);
};

export default TodoListItemMenu;