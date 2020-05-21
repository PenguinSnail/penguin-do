import React, { useState } from 'react';
import useLocalState from '../../hooks/useLocalState';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import TodoListItem from '../TodoListItem';
import AddTodoDialog from '../AddTodoDialog';

import './TodoList.scss';

function TodoList() {
	const [ addOpen, setAddOpen ] = useState(false);
	const [ todos, setTodos ] = useLocalState([], 'todos');

	const addTodo = (name) => {
		setTodos([
			...todos,
			{
				id: Date.now(),
				name: name,
				position: todos.reduce((max, t) => t.position > max ? t.position : max, 0) + 1,
				toggleTime: Date.now(),
				complete: false,
			}
		]);
	};

	const toggleTodo = (id) => {
		let newTodos = [ ...todos ];
		const todoIndex = newTodos.findIndex(t => t.id === id);

		newTodos[todoIndex].complete = !newTodos[todoIndex].complete;
		newTodos[todoIndex].toggleTime = Date.now();

		setTodos(newTodos);
	};

	return (
		<React.Fragment>
			<AddTodoDialog open={addOpen} onClose={() => setAddOpen(false)} addTodo={addTodo} />
			<Card>
				<CardHeader title="Todos" />
				<CardContent>
					<List>
						{ (todos && todos.length > 0) &&
							todos.filter(t => !t.complete).sort((a, b) => a.position - b.position)
							.map(todo => <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />)
						}
						{ (todos.filter(t => !t.complete).length > 0 && todos.filter(t => t.complete).length > 0) &&
							<ListItem dense>
								<hr className="divider" />
							</ListItem>
						}
						{ (todos && todos.filter(t => t.complete).length > 0) &&
							todos.filter(t => t.complete).sort((a, b) => b.toggleTime - a.toggleTime)
							.map(todo => <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />)
						}
						{ (!todos || todos.length < 1) &&
							<ListItem>
								<ListItemText className="centered-list-item-text" primary="You don't have any todos yet!" />
							</ListItem>
						}
						<ListItem button onClick={() => setAddOpen(true)}>
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
		</React.Fragment>
	);
};

export default TodoList;