
   
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { gameReducer } from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;