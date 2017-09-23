import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux';
// import { whyDidYouUpdate } from 'why-did-you-update';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	// whyDidYouUpdate(React);
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
