import { clone } from 'lodash';

export function compactObject(obj: Record<string, any>): Record<string, any> {
  const compactedObject = clone(obj);

  Object.entries(compactedObject).forEach(([key, value]) => {
    const isNull = value === null;
    const isUndefined = value === undefined;

    const isEmptyArray = Array.isArray(value) && value.length === 0;

    const isObject = !isNull && typeof value === 'object';
    const isEmptyObject = isObject && Object.keys(value).length === 0;

    if (isObject && !isEmptyObject) {
      compactedObject[key] = compactObject(value);
    }

    if (isNull || isUndefined || isEmptyArray || isEmptyObject)
      delete compactedObject[key];
  });
  return compactedObject;
}
