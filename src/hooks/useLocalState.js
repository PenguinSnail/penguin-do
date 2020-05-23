import { useState } from 'react';

function useLocalState(defaultState, localKey) {
	if (!localKey) {
		throw new Error('localKey must be defined for useLocalState');
	}

	const [ state, setState ] = useState(localStorage.getItem(localKey) ? JSON.parse(localStorage.getItem(localKey)) : defaultState);

	if (state) {
		localStorage.setItem(localKey, JSON.stringify(state));
	}

	return [ state, setState ];
};

export default useLocalState;