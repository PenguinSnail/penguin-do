import React, { useState, forwardRef } from 'react';
import useLocalState from '../../hooks/useLocalState';

import FlipMove from 'react-flip-move';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import TodoListItem from '../TodoListItem';
import AddTodoDialog from '../AddTodoDialog';

import './TodoList.scss';

const RefTodoListItem = forwardRef((props, ref) => (
	<div ref={ref}>
		<TodoListItem
			todo={props.todo}
			toggleTodo={props.toggleTodo}
			deleteTodo={props.deleteTodo}
		/>
	</div>
));

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

	const deleteTodo = (id) => {
		setTodos(todos.filter(t => t.id !== id));
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
						<FlipMove>
							{ (todos && todos.length > 0) &&
								todos.sort((a, b) => {
									// if both items are of the same state
									// (both complete or both incomplete)
									if (a.complete === b.complete) {
										if (a.complete) {
											// if they're completed sort by completion time
											return b.toggleTime - a.toggleTime;
										} else {
											// if they're incomplete sort by position
											return a.position - b.position;
										}
									// else if one is complete and the other is not
									} else {
										// sort the incomplete item to come first
										if (!a.complete) {
											return -1;
										} else {
											return 1;
										}
									}
								}).map(todo => (
									<RefTodoListItem
										key={todo.id}
										todo={todo}
										toggleTodo={toggleTodo}
										deleteTodo={deleteTodo}
									/>
								))
							}
						</FlipMove>
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