import { GET_TICKER_DATA } from '../types';

const INIT_STATE = {
    ticker: [],
}

export const getTickerReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_TICKER_DATA:
            return {
                ...state,
                ticker: action.payload,
            }

        default:
            return state

    }

};