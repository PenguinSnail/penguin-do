import { useState } from 'react';

function useWelcomed() {
	const [ welcomed, setWelcomed ] = useState(localStorage.getItem('welcomed'));

	if (welcomed) {
		localStorage.setItem('welcomed', 'true');
	}

	return [ welcomed, setWelcomed ];
};

export default useWelcomed;