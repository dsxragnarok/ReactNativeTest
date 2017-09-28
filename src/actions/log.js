import { createAction } from 'redux-actions';

export const actionTypes = {
    ADD_LOG_MESSAGE: 'ADD_LOG_MESSAGE',
    RESET_LOG: 'RESET_LOG'
};

const addLogMessage = createAction(actionTypes.ADD_LOG_MESSAGE);
const resetLog = createAction(actionTypes.RESET_LOG);

export const actions = {
    addLogMessage,
    resetLog
};
