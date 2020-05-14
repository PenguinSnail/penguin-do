import React from 'react';

import Shell from './components/Shell';
import WelcomeDialog from './components/WelcomeDialog';

import './App.scss';

function App() {
	return (
		<div className="app-root">
			<Shell />
			<WelcomeDialog />
			<div className="app-content">
			</div>
		</div>
	);
}

export default App;
