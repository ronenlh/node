import { UVHandleTypeNames, UVRunModeName } from "./enums";
import { maxLog } from "./max";
import { State, Handle, Loop, Address } from "./types";

const handles = new Map<Address, Handle>();
const loops = new Map<Address, Loop>();

export const parseUVLogData = (logLn: string): [State, Handle | Loop | undefined] | undefined => {
    // maxLog(logLn);
    // split log line
    const [name, ...data] = logLn.split(' ');

    switch (name.trim()) {
        case 'uv_run':
            const [loopRunAddress, , modeStr] = data;
            const mode = Number.parseInt(modeStr)
            const loop: Loop = {
                type: mode + UVHandleTypeNames.length, // will continue the enumeration of handles, for note assignment
                typeName: UVRunModeName[mode],
                address: loopRunAddress
            };
            loops.set(loopRunAddress, loop);
            return ['run', loop];
        case 'uv__handle_init':
            const [handleAddress, loopAddress, typeStr] = data;
            const type: number = Number.parseInt(typeStr)
            const handle: Handle = {
                type,
                typeName: UVHandleTypeNames[type],
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
}