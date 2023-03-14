/* styles */
import './assets/scss/general/_normalize.scss';
import './assets/scss/general/_reset.scss';
import './assets/scss/general/_basic.scss';

/* components */
import App from './components/App.jsx';

/* dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
