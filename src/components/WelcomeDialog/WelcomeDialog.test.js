import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WelcomeDialog from './WelcomeDialog';

test('dialog renders and closes when the button is clicked', () => {
	// render the component
	const { getByText } = render(<WelcomeDialog />);

	// get the dialog component by querying for the role "none presentation"
	// which is the role that the dialog component div is given by M-UI
	let dialogComponent = document.querySelector('[role="none presentation"]');
	// get the dialog divs styles
	let style = window.getComputedStyle(dialogComponent);

	// the opacity should be 1
	expect(style.opacity).toEqual('1');

	// click the dismissal button
	// this should make the dialog close
	fireEvent.click(getByText('Thanks!'));

	// re-read the styles from the element
	dialogComponent = document.querySelector('[role="none presentation"]');
	style = window.getComputedStyle(dialogComponent);

	// the opacity should now be 0
	expect(style.opacity).toEqual('0');
});
