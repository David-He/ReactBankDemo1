import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BankAppContainer from './App';

import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<BankAppContainer />, document.getElementById('root'));
registerServiceWorker();
