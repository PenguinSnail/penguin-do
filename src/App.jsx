import React from 'react';

import Shell from './components/Shell';
import WelcomeDialog from './components/WelcomeDialog';

import TodoList from './components/TodoList';

import './App.scss';

function App() {
	return (
		<div className="app-root">
			<Shell />
			<WelcomeDialog />
			<div className="app-content">
				<TodoList />
			</div>
		</div>
	);
}

export default App;
