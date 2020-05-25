import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders and includes the title', () => {
	const app = render(<App />);
	const title = app.getByText('Penguin Do');
	expect(title).toBeInTheDocument();
});
