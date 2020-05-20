import React from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';

import './AddTodoDialog.scss';

function AddTodoDialog(props) {
	const { open, onClose, addTodo } = props;
	const { register, handleSubmit, errors, formState: { isValid } } = useForm({
		// start validating all inputs immediately
		mode: 'onChange',
		// focus errors on submit
		submitFocusError: true,
	});

	const onCancel = () => {
		onClose();
	};

	const onAdd = (data) => {
		addTodo(data.name);
		onClose();
	};

	return (
		<Dialog className="add-dialog" open={open}>
			<form className="add-form" onSubmit={handleSubmit(onAdd)}>
				<DialogTitle>Add a Todo</DialogTitle>
				<DialogContent>
					{/* Todo item name input */}
					<FormControl error={errors.name}>
						<InputLabel htmlFor="name">Todo Name</InputLabel>
						<Input
							id="name"
							name="name"
							// register the input with the form hook
							// set this as a required field
							inputRef={register({ required: true })}
						/>
						{errors.name && (
							<FormHelperText id="name-errors">Invalid name</FormHelperText>
						)}
					</FormControl>
				</DialogContent>
				{/* Form buttons - cancel / add */}
				<DialogActions>
					<Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
					<Button variant="contained" color="primary" type="submit" disabled={!isValid}>Add</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddTodoDialog;