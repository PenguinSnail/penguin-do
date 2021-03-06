import React from 'react';

import Shell from './components/Shell';

import Timer from './components/Timer';
import TodoList from './components/TodoList';

import './App.scss';

function App() {
	// if the browser supports notifications
	if (('Notification' in window)) {
		// if we don't already have notification permission
		if (Notification.permission !== 'denied') {
			// try requesting permission from the user
			Notification.requestPermission();
		}
	}

	return (
		<div className="app-root">
			<Shell />
			<div className="app-content">
				<div className="todo-list-component">
					<TodoList />
				</div>
				<div className="timer-component">
					<Timer />
				</div>
			</div>
		</div>
	);
}

export default App;
