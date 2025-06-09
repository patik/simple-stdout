# easy-stdout

Run a shell command and get the `stdout` as a string.

## Usage

```sh
pnpm install easy-stdout
```

```tsx
import stdout from 'easy-stdout'

console.log(await stdout('echo "Hello, world!"'))
// Logs 'Hello, world!'
```
