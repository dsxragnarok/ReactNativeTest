import * as dice from '../dice';

function expectValueToBeWithinInclusive(value, min, max) {
    return expect(value).toBeGreaterThanOrEqual(min) &&
        expect(value).toBeLessThanOrEqual(max);
}

function expectIntegerWithinInclusive(value, min, max) {
    return expectValueToBeWithinInclusive(value, min, max) &&
        expect(Number.isInteger(value)).toBe(true);
}

describe('dice', () => {
    const spyMathRandom = jest.spyOn(Math, 'random');

    describe('random', () => {
        afterEach(() => spyMathRandom.mockClear());
        const { random } = dice;

        it('should return a number between 0 and the argument n', () => {
            spyMathRandom.mockReturnValueOnce(0.124);
            let expected = 12;
            let actual = random(100);
            expect(actual).toBe(expected);

            spyMathRandom.mockReturnValueOnce(0.42143);
            expected = 3;
            actual = random(9);
            expect(actual).toBe(expected);
        });

        it('should throw an error if the argument is not valid', () => {
            const expectedError = 'Expected a positive integer argument';
            const callDWithString = () => random('fifty');
            const callDWithDecimal = () => random(10.5);
            const callDWithNegative = () => random(-100);

            expect(callDWithString).toThrowError(expectedError);
            expect(callDWithDecimal).toThrowError(expectedError);
            expect(callDWithNegative).toThrowError(expectedError);
        });
    });

    describe('types', () => {
        const { types: { d2, d4, d6, d8, d10, d12, d20, d100 }} = dice;
        beforeEach(() => {
            spyMathRandom.mockReset();
            spyMathRandom.mockRestore();
        });

        describe('d2', () => {
            it('should return either an integer 1 or 2', () => {
                const n = d2();
                expectIntegerWithinInclusive(n, 1, 2);
            });
        });

        describe('d4', () => {
            it('should return integer between 1 and 4 inclusively', () => {
                const n = d4();
                expectIntegerWithinInclusive(n, 1, 4);
            });
        });

        describe('d6', () => {
            it('should return integer between 1 and 6 inclusively', () => {
                const n = d6();
                expectIntegerWithinInclusive(n, 1, 6);
            });
        });

        describe('d8', () => {
            it('should return integer between 1 and 8 inclusively', () => {
                const n = d8();
                expectIntegerWithinInclusive(n, 1, 8);
            });
        });

        describe('d10', () => {
            it('should return integer between 1 and 10 inclusively', () => {
                const n = d10();
                expectIntegerWithinInclusive(n, 1, 10);
            });
        });

        describe('d12', () => {
            it('should return integer between 1 and 12 inclusively', () => {
                const n = d12();
                expectIntegerWithinInclusive(n, 1, 12);
            });
        });

        describe('d20', () => {
            it('should return integer between 1 and 20 inclusively', () => {
                const n = d20();
                expectIntegerWithinInclusive(n, 1, 20);
            });
        });

        describe('d100', () => {
            it('should return integer between 1 and 100 inclusively', () => {
                const n = d100();
                expectIntegerWithinInclusive(n, 1, 100);
            });
        });
    });


    describe('rollDieTypeNTimes', () => {
        const { rollDieTypeNTimes } = dice;

        it('should call the passed in die function 1 time', () => {
            const die = jest.fn();

            rollDieTypeNTimes(1, die);

            expect(die).toHaveBeenCalledTimes(1);
        });

        it('should call the passed in die function 12 times', () => {
            const die = jest.fn();

            rollDieTypeNTimes(12, die);

            expect(die).toHaveBeenCalledTimes(12);
        });

        it('should return a list of results for each call to the die function', () => {
            const numberOfRolls = 4;
            const die = jest.fn()
                .mockReturnValueOnce(3)
                .mockReturnValueOnce(1)
                .mockReturnValueOnce(8)
                .mockReturnValueOnce(5);

            const expected = [3,1,8,5];

            expect(rollDieTypeNTimes(numberOfRolls, die)).toEqual(expected);
        });
    });
});
