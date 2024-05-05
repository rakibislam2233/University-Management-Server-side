"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cathcAsync = void 0;
const cathcAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.cathcAsync = cathcAsync;
