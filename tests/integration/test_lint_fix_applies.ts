import { spawnSync } from 'child_process';
import { expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';

const tmpDir = path.join('src', '__temp__');
const tmpFile = path.join(tmpDir, 'lint-autofix-test.ts');

test('eslint --fix applies autofixable changes', () => {
  // Ensure tmp dir
  fs.mkdirSync(tmpDir, { recursive: true });

  // Write a file with a double-quoted string (Prettier should fix to single quotes)
  fs.writeFileSync(tmpFile, 'export const greet = "hello-autofix";\n');

  // Run lint --fix
  const result = spawnSync('npm', ['run', 'lint', '--', '--fix', tmpFile], {
    encoding: 'utf8'
  });

  // Expect process to exit (0 or non-zero depending on other rules), but file should be modified by --fix
  const contentAfter = fs.readFileSync(tmpFile, 'utf8');

  // The autofix should change double-quotes to single-quotes (project Prettier config uses singleQuote)
  expect(contentAfter.includes("'hello-autofix'")).toBe(true);

  // Clean up
  try {
    fs.rmSync(tmpFile);
    fs.rmdirSync(tmpDir);
  } catch (e) {
    // ignore
  }
});
