import { ChildProcessWithoutNullStreams } from "child_process";
import { Subject } from "rxjs";

export const createLogSubject = (proc: ChildProcessWithoutNullStreams): Subject<string> => {
    const log$ = new Subject<string>();
  
    proc.on('data', (chunk: Buffer) => chunk.toString().split('\n').forEach((str: string) => log$.next(str)));
    proc.stdout.on('data', (chunk: Buffer) => chunk.toString().split('\n').forEach((str: string) => log$.next(str)));

    proc.stdout.on('error', (err: Error) => log$.error(err));
    proc.on('error', (err: Error) => log$.error(err));

    proc.on('close', () => log$.complete());
    proc.on('exit', () => log$.complete());
  
    return log$;
  };