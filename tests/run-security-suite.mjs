import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputDir = mkdtempSync(path.join(tmpdir(), 'aeroinfo-security-tests-'));
const typescriptCli = path.join(root, 'node_modules', 'typescript', 'lib', 'tsc.js');

try {
  const compile = spawnSync(process.execPath, [
    typescriptCli,
    '--outDir', outputDir,
    '--module', 'commonjs',
    '--target', 'ES2022',
    '--esModuleInterop',
    '--skipLibCheck',
    path.join(root, 'tests', 'security.test.ts'),
  ], { cwd: root, stdio: 'inherit' });

  if (compile.error) throw compile.error;
  if (compile.status !== 0) process.exitCode = compile.status ?? 1;
  else {
    const env = { ...process.env };
    env.NODE_PATH = [path.join(root, 'node_modules'), env.NODE_PATH].filter(Boolean).join(path.delimiter);
    const run = spawnSync(process.execPath, [path.join(outputDir, 'tests', 'security.test.js')], {
      cwd: root,
      env,
      stdio: 'inherit',
    });
    if (run.error) throw run.error;
    process.exitCode = run.status === 0 ? 0 : run.status ?? 1;
  }
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}
