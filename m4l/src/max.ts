// max-api is not imported from node_modules, but from Node4Max runtime
// @ts-ignore - no typescript typings yet
import max from 'max-api';

/*  Outlets the given value of the object's outlet in Max  */
export const maxNoteOut = (pitch: number, velocity: number): void => max.outlet([pitch, velocity]);

/* Print the given value to the Max console  */
export const maxLog = (...args: any): void => max.post(...args);
