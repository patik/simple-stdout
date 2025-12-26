import { existsSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import stdout from './index.js'

describe('stdout()', () => {
    it('should run a command and return its stdout', async () => {
        const result = await stdout('echo "Hello, world!"')

        expect(result).toBe('Hello, world!')
    })

    it('should remove trailing newline', async () => {
        const result = await stdout('echo "No trailing newline"')

        expect(result).toBe('No trailing newline')
    })

    it('should reject on error', async () => {
        await expect(stdout('nonexistent-command')).rejects.toThrow()
    })

    it('should reject on empty command', async () => {
        await expect(stdout('')).rejects.toThrow()
    })

    it('should reject on stderr output', async () => {
        await expect(stdout('echo "This will cause an error" >&2')).rejects.toThrow()
    })

    it('should handle commands with arguments', async () => {
        const result = await stdout('echo "Argument test"')

        expect(result).toBe('Argument test')
    })

    it('should handle commands with multiple lines', async () => {
        const result = await stdout('echo "Line 1\nLine 2"')

        expect(result).toBe('Line 1\nLine 2')
    })

    it('should handle commands with special characters', async () => {
        const result = await stdout('echo "Special characters: !@#$%^&*()"')

        expect(result).toBe('Special characters: !@#$%^&*()')
    })

    it('should handle commands with spaces', async () => {
        const result = await stdout('echo "Command with spaces"')

        expect(result).toBe('Command with spaces')
    })

    it('should handle commands with quotes', async () => {
        const result = await stdout('echo "Quoted text"')

        expect(result).toBe('Quoted text')
    })

    it('should handle commands with multiple arguments', async () => {
        const result = await stdout('echo "Multiple" "Arguments"')

        expect(result).toBe('Multiple Arguments')
    })

    it('should handle commands with environment variables', async () => {
        const result = await stdout('echo $HOME')

        expect(result).toBe(process.env.HOME || '')
    })

    it('should handle commands with pipes', async () => {
        const result = await stdout('echo "Piped output" | sed "s/Piped/Modified/"')

        expect(result).toBe('Modified output')
    })

    it('should handle commands with redirection', async () => {
        const tempFile = join(tmpdir(), `stdout-test-${process.pid}.txt`)
        const result = await stdout(`echo "Redirected output" > ${tempFile} && cat ${tempFile}`)

        expect(result).toBe('Redirected output')

        // Clean up
        if (existsSync(tempFile)) unlinkSync(tempFile)
    })

    it('should handle commands with subshells', async () => {
        const result = await stdout('echo $(echo "Subshell output")')

        expect(result).toBe('Subshell output')
    })

    it('should handle commands with background processes', async () => {
        const result = await stdout('echo "Background process" & wait')

        expect(result).toBe('Background process')
    })
})
