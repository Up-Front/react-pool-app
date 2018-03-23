import React from 'react';
import Device, { Touch, Mouse } from './device';

describe('Device Touch', () => {
  const device = Device.factory(true);

  test('returns a touch object', () => {
    expect(device instanceof Touch).toBe(true);
  });

  test('getStopEventNames', () => {
    const expectedResult = ['touchend'];
    const result = device.getStopEventNames();

    expect(result).toEqual(expectedResult);
  });

  test('getInteractEventName', () => {
    const expectedResult = 'touchmove';
    const result = device.getInteractEventName();

    expect(result).toEqual(expectedResult);
  });

  test('getStartEventName', () => {
    const expectedResult = 'touchstart';
    const result = device.getStartEventName();

    expect(result).toEqual(expectedResult);
  });

  test('getStartEventName', () => {
    const e = {
      targetTouches: [{ pageX: 5 }, { pageY: 5 }],
    };
    const expectedResult = 5;
    const result = device.getPageX(e);

    expect(result).toEqual(expectedResult);
  });
});

describe('Device mouse', () => {
  const device = Device.factory(false);

  test('returns a mouse object', () => {
    expect(device instanceof Mouse).toBe(true);
  });

  test('getStopEventNames', () => {
    const expectedResult = ['mouseup', 'mouseleave'];
    const result = device.getStopEventNames();

    expect(result).toEqual(expectedResult);
  });

  test('getInteractEventName', () => {
    const expectedResult = 'mousemove';
    const result = device.getInteractEventName();

    expect(result).toEqual(expectedResult);
  });

  test('getStartEventName', () => {
    const expectedResult = 'mousedown';
    const result = device.getStartEventName();

    expect(result).toEqual(expectedResult);
  });

  test('getStartEventName', () => {
    const e = {
      pageX: 5,
    };
    const expectedResult = 5;
    const result = device.getPageX(e);

    expect(result).toEqual(expectedResult);
  });
});
