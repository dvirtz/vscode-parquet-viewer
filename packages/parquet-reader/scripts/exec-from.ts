import {spawnSync} from 'child_process';

const proc_name = process.argv.shift();
const script_name = process.argv.shift();
const working_dir = process.argv.shift();
if (working_dir) {
  const cmd = process.argv.shift();
  if (cmd) {
    const err = spawnSync(cmd, process.argv, {
      cwd: working_dir,
      stdio: 'inherit',
      shell: true
    }).error;
    if (err) {
      throw err;
    }
    process.exit(0);
  }
}

console.error(`usage: ${proc_name} ${script_name} working_dir cmd [args...]`)
process.exit(1);
