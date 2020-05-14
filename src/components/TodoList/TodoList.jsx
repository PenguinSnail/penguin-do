import React from 'react';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import TodoListItem from '../TodoListItem';

import './TodoList.scss';

function TodoList() {
	const todos = [
		{
			id: 'asfsfe13453sd',
			name: 'Test todo 1',
			position: 1,
			complete: false,
		}
	]

	return (
		<Card>
			<CardHeader title="Todos" />
			<CardContent>
				<List>
					{ (todos && todos.length > 0) &&
						todos.sort((a, b) => a.position - b.position)
						.map(todo => <TodoListItem key={todo.id} todo={todo} />)
					}
					{ (!todos || todos.length < 1) &&
						<ListItem>
							<ListItemText className="centered-list-item-text" primary="You don't have any todos yet!" />
						</ListItem>
					}
					<ListItem button>
						<ListItemText
						className="centered-list-item-text"
						primary={
							<div className="add-item-button-content">
								<AddIcon className="add-item-button-icon" /> Add Item
							</div>
						}
						/>
					</ListItem>
				</List>
			</CardContent>
		</Card>
	);
};

export default TodoList;