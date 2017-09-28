import { actions, actionTypes } from '../log';

describe('log actions', () => {
    const { ADD_LOG_MESSAGE, RESET_LOG } = actionTypes;

    it('should return the ADD_LOG_MESSAGE action type with the appropriate payload', () => {
        const payload = {
            timestamp: 1505880091053,
            message: 'You rolled 2d4'
        };
        const expected = {
            payload,
            type: ADD_LOG_MESSAGE
        };
        const { addLogMessage } = actions;

        expect(addLogMessage(payload)).toEqual(expected);
    });

    it('should return the RESET_LOG action type', () => {
        const expected = { type: RESET_LOG };
        const { resetLog } = actions;

        expect(resetLog()).toEqual(expected);
    });
});
