import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoListItem from './TodoListItem';

test('todo name is rendered', () => {
	// test todo object
	const todo = {
		id: 123,
		name: 'My Test Todo',
		complete: false,
	};
	// render the todo
	const { getByText } = render(<TodoListItem todo={todo} />);

	expect(getByText(todo.name)).toBeInTheDocument();
});

test ('clicking calls the toggle function and passes the id', () => {
	// test todo object
	const todo = {
		id: 123,
		name: 'My Test Todo',
		complete: false,
	};
	// mock toggle fn
	const toggle = jest.fn();
	// render the todo
	const { getByText } = render(<TodoListItem todo={todo} toggleTodo={toggle} />);
	// click the todo
	fireEvent.click(getByText(todo.name));
	// has the toggle fn been called
	expect(toggle.mock.calls.length).toBe(1);
	// was the todo id passed to the toggle fn
	expect(toggle.mock.calls[0][0]).toBe(todo.id);
});
