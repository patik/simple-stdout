#!/usr/bin/env npx tsx

import type { ExecFileOptions, ExecOptions } from 'node:child_process'
import { exec, execFile } from 'node:child_process'
import { promisify } from 'node:util'

const asyncExec = promisify(exec)

/**
 * Removes trailing newline
 */
const cleanOutput = (output: string): string => output.replace(/\n$/, '')

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

const asyncExecFile = promisify(execFile)

/**
 * Returns stdout from executing the given file/executable
 *
 * Calls `child_process.execFile` under the hood.
 */
export async function stdoutFile(file: string, args?: readonly string[], options?: ExecFileOptions): Promise<string> {
    const { stdout, stderr } = await asyncExecFile(file, args, options)

    if (stderr) {
        throw new Error(stderr.toString())
    }

    if (typeof stdout !== 'string') {
        return cleanOutput(stdout.toString())
    }

    // Remove trailing newline
    return cleanOutput(stdout)
}
