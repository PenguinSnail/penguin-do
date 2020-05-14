import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import './Shell.scss';

function Shell() {
	return (
		<div className="root">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5" className="shell-title">
						Penguin Do
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Shell;