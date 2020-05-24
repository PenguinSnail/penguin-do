import React, { useState } from 'react';
import usePreciseTimer from '../../hooks/usePreciseTimer';
import useLocalState from '../../hooks/useLocalState';

import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NextIcon from '@material-ui/icons/SkipNext';
import EditIcon from '@material-ui/icons/Edit';

import TimerEditDialog from '../TimerEditDialog';

import './Timer.scss';

// inspired from https://stackoverflow.com/a/6313008
const secToMMSS = (_seconds) => {
	const minutes = Math.floor(_seconds / 60);
	const seconds = _seconds - (minutes * 60);

	return ((minutes < 10) ? ('0' + minutes) : ('' + minutes)) + ':' + ((seconds < 10) ? ('0' + seconds) : ('' + seconds));
};

function Timer() {
	const [ timeIntervals, setTimeIntervals ] = useLocalState({
		work: 20 * 60,
		break: 10 * 60,
	}, 'intervals');
	const [ time, setTime ] = useState(timeIntervals.work);
	const [ running, setRunning ] = useState(false);
	const [ phase, setPhase ] = useState(false);

	const [ editDialog, setEditDialog ] = useState(false);

	usePreciseTimer((elapsedSeconds) => {
		const newTime = (Math.round(time - elapsedSeconds) > 0) ? Math.round(time - elapsedSeconds) : 0;

		if (newTime === 0) {
			// stop the timer
			setRunning(false);
			// if the browser supports notifications
			if (('Notification' in window)) {
				// if we have permission already
				if (Notification.permission === 'granted') {
					// send the notification
					new Notification('Penguin Do', {
						body: 'Your ' + (phase ? 'break' : 'work') + ' phase is up!'
					});
				// else if we don't already have permission
				} else if (Notification.permission !== 'denied') {
					// try requesting permission from the user
					Notification.requestPermission().then(permission => {
						// if we got permission
						if (permission === 'granted') {
							// send the notification
							new Notification('Penguin Do', {
								body: 'Your ' + (phase ? 'break' : 'work') + ' phase is up!'
							});
						}
					});
				}
			}
		}

		setTime(newTime);
	}, 1000, (running && time > 0));

	const toggleRunning = () => {
		setRunning(!running);
	};

	const nextTimer = () => {
		setTime(phase ? timeIntervals.work : timeIntervals.break);
		setPhase(!phase);
	};

	const updateTimeIntervals = (workTime, breakTime) => {
		setRunning(false);
		setTimeIntervals({
			...timeIntervals,
			work: workTime,
			break: breakTime 
		});
		setTime(phase ? breakTime : workTime);
	};

	const openEditDialog = () => {
		setEditDialog(true);
	};

	const closeEditDialog = () => {
		setEditDialog(false);
	};

	return (
		<Card>
			<CardHeader
				title="Timer"
				action={
					<IconButton disabled={running} onClick={openEditDialog}>
						<EditIcon />
					</IconButton>
				}
			/>
			<CardContent className="timer-content" >
				<div className="timer-timer">
					<Typography variant="h2">
						{secToMMSS(time)}
					</Typography>
				</div>
				<div className="timer-phase">
					<Typography>
						Phase: {phase ? 'Break' : 'Work'}
					</Typography>
				</div>
			</CardContent>
			<CardActions className="timer-icons">
				<IconButton disabled={time === 0} onClick={toggleRunning}>
					{running ? <PauseIcon /> : <PlayArrowIcon />}
				</IconButton>
				<IconButton disabled={running} onClick={nextTimer}>
					<NextIcon />
				</IconButton>
			</CardActions>
			<TimerEditDialog
				open={editDialog}
				close={closeEditDialog}
				timeIntervals={timeIntervals}
				updateTimeIntervals={updateTimeIntervals}
			/>
		</Card>
	);
};

export default Timer;