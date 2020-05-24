import React from 'react';

import Shell from './components/Shell';
import WelcomeDialog from './components/WelcomeDialog';

import Timer from './components/Timer';
import TodoList from './components/TodoList';

import './App.scss';

function App() {
	return (
		<div className="app-root">
			<Shell />
			<WelcomeDialog />
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
