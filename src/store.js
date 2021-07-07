import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { getTickerReducer } from './redux/reducer/getTickerReducer';



// GET THE CART IN THE LOCAL STORAGE

const initialState = {
}

const reducer = combineReducers({
    getTicker: getTickerReducer
})

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;