import {createStore, applyMiddleware} from 'redux';
import bankReducer from './bankreducer';

const logger = (store)=>(next)=>(action)=>{
    console.log('dispatching', action);
    return next(action);
}

const bankStore = createStore(bankReducer,
    applyMiddleware(logger));
export default bankStore;

