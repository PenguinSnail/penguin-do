import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import AddTodoDialog from './AddTodoDialog';

test('cancel button calls the close function', async () => {
	// mock close function
	const onClose = jest.fn();

	// render the component
	// we need to use async/await and act because react-hook-form is set to
	// validate on change, causing state updates to occur even when we haven't
	// fired an action - the testing library doesn't like this so act is
	// telling it we're expecting a state update to occur here
	// ------------------------------------------------------------------------
	// https://react-hook-form.com/faqs/#TestingReactHookForm
	// https://github.com/testing-library/react-testing-library/issues/523
	// https://github.com/facebook/react/issues/15379
	let component;
	await act(async () => {
		component = render(<AddTodoDialog open onClose={onClose} addTodo={() => {}} />);
	});

	// click the dismissal button
	// this should make the dialog close
	fireEvent.click(component.getByText('Cancel'));

	expect(onClose.mock.calls.length).toEqual(1);
});

test('add button is disabled and enables when the form is valid', async () => {
	// render the component
	let component;
	await act(async () => {
		component = render(<AddTodoDialog open onClose={() => {}} addTodo={() => {}} />);
	});
	
	// find the submit button and pull out an array of its classes
	let addButton = component.getByText('Add');
	let addButtonClasses = addButton.closest('button[type=submit]').className.split(' ');

	// expect the button to have the 'mui-disabled' class
	expect(addButtonClasses).toEqual(expect.arrayContaining(['Mui-disabled']));

	// fill out the required fields
	// we have to use act again for react-hook-form
	// also react-hook-form uses the 'input' event
	// instead of the usual 'change' event
	await act(async () => {
		const nameInput = component.getByLabelText('Todo Name')
		fireEvent.input(nameInput, { target: { value: 'My Todo' } });
	});

	// check the submit button classes
	addButton = component.getByText('Add');
	addButtonClasses = addButton.closest('button[type=submit]').className.split(' ');

	// we should no longer be disabled
	expect(addButtonClasses).not.toEqual(expect.arrayContaining(['Mui-disabled']));
});

test('add button calls the add and close functions', async () => {
	// mock add and close functions
	const add = jest.fn();
	const close = jest.fn();

	// render the component
	let component;
	await act(async () => {
		component = render(<AddTodoDialog open onClose={close} addTodo={add} />);
	});

	// fill out the required fields
	// we have to use act again for react-hook-form
	// also react-hook-form uses the 'input' event
	// instead of the usual 'change' event
	await act(async () => {
		const nameInput = component.getByLabelText('Todo Name')
		fireEvent.input(nameInput, { target: { value: 'My Todo' } });
	});

	// find the add button text, then find the submit button from there
	// fire the click event on the submit button
	// wrap in act
	await act(async () => {
		fireEvent.click(component.getByText('Add').closest('button[type=submit]'));
	});

	// we should no longer be disabled
	expect(close.mock.calls.length).toEqual(1);
	expect(add.mock.calls.length).toEqual(1);
	expect(add.mock.calls[0][0]).toEqual('My Todo');
});
