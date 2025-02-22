import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider';

import 'semantic-ui-less/semantic.less'; // eslint-disable-line
import './utils/i18n';
import './styles/index.css';

ReactDOM.render(ApolloProvider, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
