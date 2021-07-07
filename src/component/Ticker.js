import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickerAction, unSubscribeTickerAction } from '../redux/action/tickerAction';
import { Card, CardContent, Typography, Snackbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: 500,
        height: 180,
        marginTop: 50,
        backgroundColor: '#253038'
    },
    rowOne: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    divBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDiv: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }

});

const Ticker = () => {
    const classes = useStyles();
    const ws = useRef(null);
    const dispatch = useDispatch();
    const ticker = useSelector(state => state.getTicker.ticker)
    const _ticker = ticker?.map(a => a)
    const [chkBtnClick, setBtnClick] = useState(false)
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const disconnectBtnHandler = () => {
        ws.current.close();
        setState({
            open: true, vertical: 'top',
            horizontal: 'right'
        });
        if (chkBtnClick == true) {
            setBtnClick(false)
        }
    }

    const connectBtnHandler = () => {
        dispatch(getTickerAction(ws))
        setState({
            open: true, vertical: 'top',
            horizontal: 'right'
        });
        setBtnClick(true)
    }
    const num = _ticker?.[5]?.toString().slice(-3);
    const _ticker5 = Number(num)
    const _ticker4 = Math.abs(_ticker?.[4]).toFixed(2)

    useEffect(() => {
        dispatch(getTickerAction(ws))
    }, [])

    return (
        <div className={classes.divBox}>
            {
                ticker
                    ?
                    <Card className={classes.root}>
                        <CardContent>
                            <div className={classes.rowOne}>
                                <Typography variant="h5" style={{ color: '#fff' }}>BTC/USD</Typography>
                                <Typography variant="h6" style={{ color: '#fff' }}>{_ticker?.[6]}</Typography>
                            </div>
                            <div className={classes.rowOne}>
                                <Typography variant="h6" style={{ color: '#fff' }}>Vol {_ticker?.[0]} BTC</Typography>
                                <Typography variant="h6" style={{ color: '#fff' }}>{_ticker4} ({`0.${_ticker5}%`})</Typography>
                            </div>
                            <div className={classes.rowOne}>
                                <Typography variant="h6" style={{ color: '#fff' }}>LOW {_ticker?.[9]}</Typography>
                                <Typography variant="h6" style={{ color: '#fff' }}>HIGH {_ticker?.[8]}</Typography>
                            </div>
                        </CardContent>
                        <div className={classes.btnDiv}>
                            <Button onClick={connectBtnHandler} variant="contained" color="primary">Connect</Button>
                            <Button onClick={disconnectBtnHandler} variant="contained" color="secondary">DisConnect</Button>
                        </div>
                        {
                            chkBtnClick
                                ?
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={open}
                                    autoHideDuration={5000}

                                    message="Connected"
                                    key={vertical + horizontal}
                                />
                                :
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={open}
                                    autoHideDuration={5000}

                                    message="Disconnected"
                                    key={vertical + horizontal}
                                />
                        }
                    </Card>
                    :
                    null
            }

        </div>
    )
}


export default Ticker