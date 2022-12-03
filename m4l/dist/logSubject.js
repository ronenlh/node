"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogSubject = void 0;
const rxjs_1 = require("rxjs");
const createLogSubject = (proc) => {
    const log$ = new rxjs_1.Subject();
    proc.on('data', (chunk) => chunk.toString().split('\n').forEach((str) => log$.next(str)));
    proc.stdout.on('data', (chunk) => chunk.toString().split('\n').forEach((str) => log$.next(str)));
    proc.stdout.on('error', (err) => log$.error(err));
    proc.on('error', (err) => log$.error(err));
    proc.on('close', () => log$.complete());
    proc.on('exit', () => log$.complete());
    return log$;
};
exports.createLogSubject = createLogSubject;
