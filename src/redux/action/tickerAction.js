
import { GET_TICKER_DATA } from '../types'

export const getTickerAction = (ws) => (dispatch) => {

    ws.current = new WebSocket('wss://api.bitfinex.com/ws/2');
    ws.current.onopen = () => {
        console.log('open')
        // ws.current.send(JSON.stringify({ event: 'conf', flags: 131072 }))
        try {
            ws.current.send(JSON.stringify({ event: 'subscribe', channel: 'ticker', pair: 'tBTCUSD', }))
        } catch (error) {
            console.log(error)
        }

    }
    ws.current.onmessage = evt => {
        const message = JSON.parse(evt.data)
        console.log(message)

        const _msg = Array.isArray(message[1]) && dispatch({
            type: GET_TICKER_DATA,
            payload: message[1],
        })
    }


}


