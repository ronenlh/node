"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUVLogData = void 0;
const enums_1 = require("./enums");
const handles = new Map();
const loops = new Map();
const parseUVLogData = (logLn) => {
    // maxLog(logLn);
    // split log line
    const [name, ...data] = logLn.split(' ');
    switch (name.trim()) {
        case 'uv_run':
            const [loopRunAddress, , modeStr] = data;
            const mode = Number.parseInt(modeStr);
            const loop = {
                type: mode + enums_1.UVHandleTypeNames.length,
                typeName: enums_1.UVRunModeName[mode],
                address: loopRunAddress
            };
            loops.set(loopRunAddress, loop);
            return ['run', loop];
        case 'uv__handle_init':
            const [handleAddress, loopAddress, typeStr] = data;
            const type = Number.parseInt(typeStr);
            const handle = {
                type,
                typeName: enums_1.UVHandleTypeNames[type],
                address: handleAddress,
                loop: loopAddress
            };
            handles.set(handleAddress, handle);
            return ['handle_init', handle];
        case 'uv__handle_start':
            const [startAddress] = data;
            return ['handle_start', handles.get(startAddress)];
        case 'uv__handle_stop':
            const [stopAddress] = data;
            return ['handle_stop', handles.get(stopAddress)];
    }
};
exports.parseUVLogData = parseUVLogData;
