import child_process from 'child_process';
import path from 'path';
import type { MIDINote } from './types';
import { createLogSubject } from './logSubject';
import { parseUVLogData } from './parseLog';

// max-api is not imported from node_modules, but from Node4Max runtime
// @ts-ignore - no typescript typings yet
import max from 'max-api';
import { maxLog, maxNoteOut } from './max';

const nodePath = path.join(__dirname, '../../out/Release/node');

const createNote = (type: number, offset = 100): MIDINote => {
  return type + offset;
};

/*  Set a handler/callback function for the given message  */
max.addHandler('input', (scriptPath: string) => {
  maxLog(scriptPath);

  try {
    const nodeProcess: child_process.ChildProcessWithoutNullStreams = child_process.spawn(nodePath, [scriptPath]);
    createLogSubject(nodeProcess).subscribe((log: string) => {
      maxLog(log);

      const [state, data] = parseUVLogData(log) ?? [];
      if (!data) return;

      const note: MIDINote = createNote(data.type);
      // maxLog(state, data.typeName, data.address, note);

      switch (state) {
        case 'run':
          maxNoteOut(note, 100);
          break;
        case 'handle_init':
          maxNoteOut(note, 50);
          break;
        case 'handle_start':
          maxNoteOut(note, 0);
          maxNoteOut(note, 100);
          break;
        case 'handle_stop':
          maxNoteOut(note, 0);
          break;
      }
    });
  } catch (err) {
    process.exit(1);
  }
});
