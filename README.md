# simple-stdout

Run a shell command and get the `stdout` as a string.

## Usage

```sh
pnpm install simple-stdout
```

```tsx
import stdout from 'simple-stdout'

console.log(await stdout('echo "Hello, world!"'))
// Logs 'Hello, world!'
```
