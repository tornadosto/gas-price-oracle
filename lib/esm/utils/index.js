export * from './math';
export * from './crypto';
const sleep = (time) => {
    return new Promise((res) => setTimeout(() => res(true), time));
};
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
const resolvePropertyPath = (obj, propertyPath) => {
    const properties = (propertyPath === null || propertyPath === void 0 ? void 0 : propertyPath.split('.')) || [];
    return properties.reduce((curr, nextProperty) => curr[nextProperty], obj);
};
export { sleep, resolvePropertyPath };
//# sourceMappingURL=index.js.map