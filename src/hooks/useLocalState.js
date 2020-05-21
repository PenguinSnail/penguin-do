import { useState } from 'react';

function useLocalState(defaultState, localKey) {
	const [ state, setState ] = useState(localStorage.getItem(localKey) ? JSON.parse(localStorage.getItem(localKey)) : defaultState);

	if (state) {
		localStorage.setItem(localKey, JSON.stringify(state));
	}

	return [ state, setState ];
};

export default useLocalState;