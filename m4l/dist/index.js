"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const logSubject_1 = require("./logSubject");
const parseLog_1 = require("./parseLog");
// max-api is not imported from node_modules, but from Node4Max runtime
// @ts-ignore - no typescript typings yet
const max_api_1 = __importDefault(require("max-api"));
const max_1 = require("./max");
const nodePath = path_1.default.join(__dirname, '../../out/Release/node');
const createNote = (type, offset = 100) => {
    return type + offset;
};
/*  Set a handler/callback function for the given message  */
max_api_1.default.addHandler('input', (scriptPath) => {
    (0, max_1.maxLog)(scriptPath);
    try {
        const nodeProcess = child_process_1.default.spawn(nodePath, [scriptPath]);
        (0, logSubject_1.createLogSubject)(nodeProcess).subscribe((log) => {
            var _a;
            (0, max_1.maxLog)(log);
            const [state, data] = (_a = (0, parseLog_1.parseUVLogData)(log)) !== null && _a !== void 0 ? _a : [];
            if (!data)
                return;
            const note = createNote(data.type);
            // maxLog(state, data.typeName, data.address, note);
            switch (state) {
                case 'run':
                    (0, max_1.maxNoteOut)(note, 100);
                    break;
                case 'handle_init':
                    (0, max_1.maxNoteOut)(note, 50);
                    break;
                case 'handle_start':
                    (0, max_1.maxNoteOut)(note, 0);
                    (0, max_1.maxNoteOut)(note, 100);
                    break;
                case 'handle_stop':
                    (0, max_1.maxNoteOut)(note, 0);
                    break;
            }
        });
    }
    catch (err) {
        process.exit(1);
    }
});
