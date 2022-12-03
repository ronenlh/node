"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxLog = exports.maxNoteOut = void 0;
// max-api is not imported from node_modules, but from Node4Max runtime
// @ts-ignore - no typescript typings yet
const max_api_1 = __importDefault(require("max-api"));
/*  Outlets the given value of the object's outlet in Max  */
const maxNoteOut = (pitch, velocity) => max_api_1.default.outlet([pitch, velocity]);
exports.maxNoteOut = maxNoteOut;
/* Print the given value to the Max console  */
const maxLog = (...args) => max_api_1.default.post(...args);
exports.maxLog = maxLog;
