/**
 * Checks the given condition for, null, undefined,
 * @param condition condition to be checked
 * @param message message for thrown error in case of failure
 */
export function assert(condition: any, message: string): void {
  if (checkNullOrUndefined(condition)) throw new Error(message);

  if (typeof condition === 'boolean') return assertBool(condition, message);
  if (typeof condition === 'object') return assertObject(condition, message);
  if (Array.isArray(condition)) return assertArray(condition, message);
}

function assertBool(condition: boolean, message: string): void {
  if (condition) return;
  throw new Error(message);
}

function assertObject(object: Record<string, any>, message: string): void {
  const validParams = Object.values(object).filter((value) =>
    checkNullOrUndefined(value),
  );

  if (validParams.length > 0) return;
  throw new Error(message);
}

function assertArray(array: Array<any>, message: string): void {
  if (array.length > 0) return;
  throw new Error(message);
}

function checkNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}
