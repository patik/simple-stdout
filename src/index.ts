import type { ExecException, ExecFileException } from 'node:child_process'
import { exec, execFile } from 'node:child_process'

const callback =
    (resolve: (value: string | PromiseLike<string>) => void, reject: (reason?: unknown) => void) =>
    (err: ExecException | ExecFileException | null, stdout: string, stderr: string) => {
        if (err || stderr) {
            reject(err || new Error(stderr))
        } else if (typeof stdout === 'string') {
            resolve(stdout.replace(/\n$/, '')) // Remove trailing newline
        }
    }

/**
 * Returns stdout from the given shell command
 */
export default async function stdout(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, callback(resolve, reject))
    })
}

export async function stdoutFile(file: string, args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        execFile(file, args, callback(resolve, reject))
    })
}
