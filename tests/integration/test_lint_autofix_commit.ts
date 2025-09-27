import { spawnSync } from 'child_process';
import { expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';

// This test assumes dev dependencies (eslint) are installed in the repository root.
// It creates a disposable git repo in /tmp, writes a file with an autofixable issue,
// runs eslint --fix against that file (using root's eslint), and then makes a commit
// with message "chore(lint): auto-fix" to simulate safe autofix auto-commit behavior.

const repoRoot = path.resolve(__dirname, '../../');

function run(cmd: string, args: string[], cwd?: string) {
  return spawnSync(cmd, args, { encoding: 'utf8', cwd: cwd || repoRoot });
}

test('autofix flow commits safe formatting fixes', () => {
  const tmp = fs.mkdtempSync(path.join(process.cwd(), 'tmp/autofix-test-'));
  const fileDir = path.join(tmp, 'src');
  fs.mkdirSync(fileDir, { recursive: true });
  const filePath = path.join(fileDir, 'autofix-commit-test.ts');

  // Initial content with double quotes (Prettier should fix to single quotes)
  fs.writeFileSync(filePath, 'export const X = "autofix-commit";\n');

  // Initialize git repo in tmp dir and make an initial commit
  run('git', ['init'], tmp);
  run('git', ['config', 'user.email', 'test@example.com'], tmp);
  run('git', ['config', 'user.name', 'Test User'], tmp);
  run('git', ['add', '.'], tmp);
  run('git', ['commit', '-m', 'initial'], tmp);

  // Run eslint --fix from the repository root targeting the temp file
  const eslint = run('npx', ['eslint', filePath, '--fix']);
  if (eslint.error) {
    // If eslint not installed locally, skip the assertion
    console.warn('eslint not available via npx; skipping autofix commit test');
    return;
  }

  // Stage and commit autofix result
  run('git', ['add', filePath], tmp);
  const commit = run('git', ['commit', '-m', 'chore(lint): auto-fix'], tmp);

  expect(commit.status).toBe(0);

  // Ensure commit message is present in git log
  const log = run('git', ['log', '--pretty=%B', '-n', '1'], tmp);
  expect(log.stdout.trim()).toBe('chore(lint): auto-fix');

  // Clean up
  try {
    fs.rmSync(tmp, { recursive: true });
  } catch (e) {
    // ignore
  }
});
