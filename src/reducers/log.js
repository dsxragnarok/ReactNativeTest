import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions/log';

const INITIAL_STATE = [];

export default  handleActions({
    [actionTypes.ADD_LOG_MESSAGE]: (state, { payload }) => state.concat(payload),
    [actionTypes.RESET_LOG]: () => INITIAL_STATE
}, INITIAL_STATE);
