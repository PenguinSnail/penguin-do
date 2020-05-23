import React, { useState } from 'react';

import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Checkbox, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import TodoListItemMenu from '../TodoListItemMenu';

import './TodoListItem.scss';

function TodoListItem(props) {
	const { todo, toggleTodo, deleteTodo } = props;
	const [ menuAnchor, setMenuAnchor ] = useState(null);

	// toggle the item
	const onClick = () => {
		toggleTodo(todo.id);
	};

	// open and close the item menu
	const handleMenuOpen = (event) => {
		setMenuAnchor(event.currentTarget);
	};
	const handleMenuClose = () => {
		setMenuAnchor(null);
	};

	// deletion handler
	const onDelete = () => {
		deleteTodo(todo.id);
	};

	return (
		<React.Fragment>
			<ListItem
				dense
				button
				onClick={onClick}
				className="todo-list-item"
			>
				<ListItemIcon>
					<Checkbox
					checked={todo.complete}
					edge="start"
					tabIndex={-1}
					disableRipple
					/>
				</ListItemIcon>
				<ListItemText
					className="todo-list-item-text"
					primary={
						<div className={todo.complete ? 'strikethrough-div' : ''}>
							{todo.name}
						</div>
					}
				/>
				<ListItemSecondaryAction edge="end">
					<IconButton
						aria-controls="item-menu"
						aria-haspopup="true"
						onClick={handleMenuOpen}
					>
						<MoreVertIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<TodoListItemMenu
				anchorEl={menuAnchor}
				handleClose={handleMenuClose}
				deleteTodo={onDelete}
			/>
		</React.Fragment>
	);
};

export default TodoListItem;