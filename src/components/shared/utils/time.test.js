import { getStartOfWeek } from './time';

describe('startOfWeek function', () => {
  test('get last sunday if today is Thursday', () => {
    const expectedResult = 1521331200000;
    const date = new Date(Date.UTC(2018, 2, 23, 3, 21, 33));
    const result = getStartOfWeek(date);

    expect(result.getTime()).toEqual(expectedResult);
  });

  test('get this sunday if today is sunday', () => {
    const expectedResult = 1521331200000;
    const date = new Date(Date.UTC(2018, 2, 18, 6, 21, 33));
    const result = getStartOfWeek(date);

    expect(result.getTime()).toEqual(expectedResult);
  });
});
