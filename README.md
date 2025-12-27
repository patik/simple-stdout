# simple-stdout

Run a shell command and get the `stdout` as a string.

```javascript
const name = await stdout('git config --get user.name')
```

That's it. Just a tiny library with no frills.

## Install

```sh
npm install simple-stdout
```

## Usage

```javascript
import stdout from 'simple-stdout'

const name = await stdout('git config --get user.name')
// 'Gérald Genta'
```

Need `execFile` instead? (Safer for untrusted input, no shell injection worries.)

```javascript
import { stdoutFile } from 'simple-stdout'

const name = await stdoutFile('git', ['config', '--get', 'user.name'])
// 'Gérald Genta'
```
