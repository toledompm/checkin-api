import { compactObject } from 'src/common/objects';

describe('compactObject', () => {
  const expectedObj = { a: 1, nestedObj: { a: 2 } };
  it('Should remove null values', () => {
    const testObj = { ...expectedObj, b: null };
    expect(compactObject(testObj)).toEqual(expectedObj);
  });

  it('Should remove undefined values', () => {
    const testObj = { ...expectedObj, b: undefined };
    expect(compactObject(testObj)).toEqual(expectedObj);
  });

  it('Should remove emptyArrays', () => {
    const testObj = { ...expectedObj, b: [] };
    expect(compactObject(testObj)).toEqual(expectedObj);
  });

  it('Should remove emptyObjects', () => {
    const testObj = { ...expectedObj, b: {} };
    expect(compactObject(testObj)).toEqual(expectedObj);
  });

  it('Should compact nestedObjects', () => {
    const { nestedObj } = expectedObj;
    const testObj = {
      ...expectedObj,
      nestedObj: { ...nestedObj, b: null, c: undefined },
    };
    expect(compactObject(testObj)).toEqual(expectedObj);
  });
});
