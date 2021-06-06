import { clone } from 'lodash';

export function compactObject(obj: Record<string, any>): Record<string, any> {
  const compactedObject = clone(obj);

  Object.entries(compactedObject).forEach(([key, value]) => {
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    const isEmptyObject =
      typeof value === 'object' && Object.keys(value).length === 0;

    if (value === null || value === undefined || isEmptyArray || isEmptyObject)
      delete compactedObject[key];
  });
  return compactedObject;
}
