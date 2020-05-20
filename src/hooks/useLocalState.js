import { useState } from 'react';

function useLocalState(defaultState) {
	const [ state, setState ] = useState(localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : defaultState);

	if (state) {
		localStorage.setItem('state', JSON.stringify(state));
	}

	return [ state, setState ];
};

export default useLocalState;