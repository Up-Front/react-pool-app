import React from 'react';
import IsMobile from './isMobile';

describe('Device Touch', () => {
  beforeEach(() => {
    navigator.__defineGetter__('userAgent', function() {
      return 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA… Gecko) Chrome/64.0.3282.186 Mobile Safari/537.36';
    });
  });

  test('returns is Mobile', () => {
    const result = IsMobile.any();
    expect(result).toBeTruthy();
  });

  test('is Andriod', () => {
    const result = IsMobile.Android();
    expect(result).toBeTruthy();
  });

  test('is not iPhone', () => {
    const result = IsMobile.iOS();
    expect(result).toBeFalsy();
  });

  test('is not Windows phone', () => {
    const result = IsMobile.Windows();
    expect(result).toBeFalsy();
  });
});
