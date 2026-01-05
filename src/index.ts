#!/usr/bin/env npx tsx

import type { ExecException, ExecFileException, ExecOptions } from 'node:child_process'
import { exec, execFile } from 'node:child_process'
import { promisify } from 'node:util'

const asyncExec = promisify(exec)

/**
 * Removes trailing newline
 */
const cleanOutput = (output: string): string => output.replace(/\n$/, '')

const callback =
    (resolve: (value: string | PromiseLike<string>) => void, reject: (reason?: unknown) => void) =>
    (err: ExecException | ExecFileException | null, stdout: string, stderr: string) => {
        if (err || stderr) {
            reject(err || new Error(stderr))
        } else {
            resolve(cleanOutput(stdout))
        }
    }

/**
 * Returns stdout from the given shell command
 *
 * Calls `child_process.exec` under the hood.
 */
export default async function stdout(command: string, options?: ExecOptions): Promise<string> {
    const { stdout, stderr } = await asyncExec(command, options)

    if (stderr) {
        throw new Error(stderr.toString())
    }

    if (typeof stdout !== 'string') {
        return cleanOutput(stdout.toString())
    }

    // Remove trailing newline
    return cleanOutput(stdout)
}

/**
 * Returns stdout from executing the given file/executable
 *
 * Calls `child_process.execFile` under the hood.
 */
export async function stdoutFile(file: string, args: string[] = []): Promise<string> {
    return new Promise((resolve, reject) => {
        execFile(file, args, callback(resolve, reject))
    })
}
