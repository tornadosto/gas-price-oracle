export * from './math';
export * from './crypto';
declare const sleep: (time: number) => Promise<boolean>;
/**
 * Returns the recursively resolved value of the object's subproperty given the properties path, separated by dots.
 * If properties path is null, undefined or an empty string - returns the object itself
 * @param obj - The object, from which get property or subproperty
 * @param propertiesInString - Property name or properties chained string, like 'user.email.domain'
 * @returns The value of the subproperty by path or object itself
 *
 * @example
 *
 * ### Object
 * ```ts
 * const x = {
 *    y: {
 *      z: 11
 *    }
 * };
 * ```
 *
 * ### Property path in object
 * ```ts
 * const propertyPath = 'y.z';
 * ```
 *
 * ### Usage
 * ```ts
 * const subpropertyValue = resolvePropertyPath(x, propertyPath);
 * ```
 *
 * ### Result (subproperty value)
 * ```ts
 * 11
 * ```
 */
declare const resolvePropertyPath: (obj: object, propertyPath: string | undefined | null) => any;
export { sleep, resolvePropertyPath };
