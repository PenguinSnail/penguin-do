import React from 'react';
import useLocalState from '../../hooks/useLocalState';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import './WelcomeDialog.scss';

function WelcomeDialog() {
	const [ welcomed, setWelcomed ] = useLocalState(false, 'welcomed');

	return (
		<Dialog className="welcome-dialog" open={!welcomed}>
			<DialogTitle>Welcome to Penguin Do!</DialogTitle>
			<DialogContent>
				<Typography gutterBottom={true}>
					Penguin Do is a simple web-based timer application,
					designed to keep you accountable for your tasks.
				</Typography>
				<Typography>
					Unlike most tools that are just todo lists or just timers,
					Penguin Do combines the two, allowing you to prioritize
					your tasks and run a timer with built in breaks.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="primary" onClick={() => setWelcomed(true)}>Thanks!</Button>
			</DialogActions>
		</Dialog>
	);
};

export default WelcomeDialog;