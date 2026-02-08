"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePropertyPath = exports.sleep = void 0;
__exportStar(require("./math"), exports);
__exportStar(require("./crypto"), exports);
var sleep = function (time) {
    return new Promise(function (res) { return setTimeout(function () { return res(true); }, time); });
};
exports.sleep = sleep;
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
var resolvePropertyPath = function (obj, propertyPath) {
    var properties = (propertyPath === null || propertyPath === void 0 ? void 0 : propertyPath.split('.')) || [];
    return properties.reduce(function (curr, nextProperty) { return curr[nextProperty]; }, obj);
};
exports.resolvePropertyPath = resolvePropertyPath;
//# sourceMappingURL=index.js.map