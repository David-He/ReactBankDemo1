import {createStore} from 'redux';
import bankReducer from './bankreducer';

const bankStore = createStore(bankReducer);
export default bankStore;

