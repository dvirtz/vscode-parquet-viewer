import { spawnSync } from 'child_process';

if (process.argv.length < 4) {
  console.error(`usage: ${process.argv0} working_dir cmd [args...]`);
  process.exit(1);
}

const [working_dir, cmd, ...args] = process.argv.slice(2);
const err = spawnSync(cmd, args, {
  cwd: working_dir,
  stdio: 'inherit',
  shell: true
}).error;
if (err) {
  throw err;
}
