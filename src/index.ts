import { exec } from 'node:child_process'

/**
 * Returns stdout from the given shell command
 */
export default async function stdout(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        return exec(command, (err, stdout, stderr) => {
            if (err || stderr) {
                reject(err || new Error(stderr))
            } else if (typeof stdout === 'string') {
                resolve(stdout.replace(/\n$/, '')) // Remove trailing newline
            }
        })
    })
}
