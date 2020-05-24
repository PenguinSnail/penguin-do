import React from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { Button } from '@material-ui/core';

import './TimerEditDialog.scss';

function TimerEditDialog(props) {
	const { open, close, timeIntervals, updateTimeIntervals } = props;
	const { register, handleSubmit, errors, formState: { isValid }, reset } = useForm({
		// start validating all inputs immediately
		mode: 'onChange',
		// focus errors on submit
		submitFocusError: true,
		defaultValues: {
			work: timeIntervals.work / 60,
			break: timeIntervals.break / 60
		}
	});

	const onCancel = () => {
		close();
	};

	const onSave = (data) => {
		// update the saved time intervalse
		updateTimeIntervals(data.work * 60, data.break * 60);
		// close the dialog
		close();
		// reset the form with new defaults
		reset({
			work: data.work,
			break: data.break
		});
	};

	return (
		<Dialog className="interval-dialog" open={open}>
			<form className="interval-form" onSubmit={handleSubmit(onSave)}>
				<DialogTitle>Edit Timer</DialogTitle>
				<DialogContent>
					<FormControl error={errors.work}>
						<InputLabel htmlFor="work">Work Time (minutes)</InputLabel>
						<Input
							id="work"
							name="work"
							inputRef={register({
								type: 'number',
								required: true,
								min: 1
							})}
							autoFocus
							type="number"
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
								min: 1
							}}
						/>
						{errors.work && (
							<FormHelperText id="work-errors">Invalid work time</FormHelperText>
						)}
					</FormControl>
					<FormControl error={errors.break}>
						<InputLabel htmlFor="break">Break Time (minutes)</InputLabel>
						<Input
							id="break"
							name="break"
							inputRef={register({
								type: 'number',
								required: true,
								min: 1
							})}
							type="number"
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
								min: 1
							}}
						/>
						{errors.break && (
							<FormHelperText id="break-errors">Invalid break time</FormHelperText>
						)}
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
					<Button variant="contained" color="primary" type="submit" disabled={!isValid}>Save</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default TimerEditDialog;