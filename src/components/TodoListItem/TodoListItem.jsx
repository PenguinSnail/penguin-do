import React from 'react';

import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Checkbox, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './TodoListItem.scss';

function TodoListItem(props) {
	const { todo, toggleTodo } = props;

	const onClick = () => {
		toggleTodo(todo.id);
	};

	return (
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
					</div>}
			/>
			<ListItemSecondaryAction>
				<IconButton>
					<MoreVertIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default TodoListItem;