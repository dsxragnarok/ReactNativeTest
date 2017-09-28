import reducer from '../log';

/*
action
{
    timestamp: milliseconds
    message: string
}

log: [actions...]

*/

describe('log reducer', () => {
    const INITIAL_STATE = [];
    const NO_ACTION = { type: 'NONE' };

    it('should return the initial state', () => {
        const newState = reducer(undefined, NO_ACTION);

        expect(newState).toEqual(INITIAL_STATE);
    });

    it('should append a message to the state list', () => {
        const expected = {
            timestamp: 1505869829170,
            message: 'You rolled 3d8'
        };
        const action = {
            type: 'ADD_LOG_MESSAGE',
            payload: { ...expected }
        };

        const newState = reducer(INITIAL_STATE, action);

        expect(newState).toContainEqual(expected);
    });

    it('should append a message to the end of the list', () => {
        const expected = {
            timestamp: 1505956821585,
            message: 'You rolled 1d20+9'
        };
        const action = {
            type: 'ADD_LOG_MESSAGE',
            payload: { ...expected }
        };
        const state = [{ timestamp: 1505869829170, message: 'You rolled 3d8' }];

        const newState = reducer(state, action);

        expect(newState[1]).toEqual(expected);
    });

    it('should reset to the initial state', () => {
        const state = [{
            timestamp: 1505956821585,
            message: 'You rolled 1d20+9'
        }, {
            timestamp: 1505879671316,
            message: 'You rolled a 2d12'
        }];
        const action = { type: 'RESET_LOG' };

        const newState = reducer(state, action);

        expect(newState).toEqual(INITIAL_STATE);
    })
});
