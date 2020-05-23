import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useLocalState from './useLocalState';

test('throws when no key is provided', () => {
	expect(() => useLocalState(false)).toThrow();
});

test('state sets, rerenders, and survives through unmounting', () => {
	//test component
	function Component() {
		const [state, setState] = useLocalState(0, 'state');

		return (
			<div>
				<div>
					{state}
				</div>
				<button onClick={() => setState(state + 1)}>increment</button>
			</div>
		);
	};

	// render the component
	const { getByText, unmount, rerender } = render(<Component />);

	// find our state render - it should be the default 0
	expect(getByText('0')).toBeInTheDocument();
	// find the increment button and click it, theoretically incrementing our state to 1
	fireEvent.click(getByText('increment'));
	// find out state render - it should now be 1
	expect(getByText('1')).toBeInTheDocument();
	
	// unmount and remount the component
	unmount();
	rerender(<Component />);
	// our updated state should persist
	expect(getByText('1')).toBeInTheDocument();
});
