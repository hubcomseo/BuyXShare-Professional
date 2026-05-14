import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (file.endsWith('.tsx')) {
      callback(filepath);
    }
  }
}

const replacements = [
  { from: /bg-\[#0B1220\]/g, to: 'bg-bg-base' },
  { from: /text-\[#0B1220\]/g, to: 'text-bg-base' },
  { from: /bg-\[#1E1B4B\]/g, to: 'bg-primary-soft' },
  { from: /text-\[#818CF8\]/g, to: 'text-primary-light' },
  { from: /bg-\[#818CF8\]\/10/g, to: 'bg-primary-light/10' },
  { from: /bg-\[#064E3B\]/g, to: 'bg-accent-soft' },
  { from: /text-\[#00D991\]/g, to: 'text-accent' },
  { from: /bg-\[#00D991\]/g, to: 'bg-accent' },
  { from: /border-\[#00D991\]/g, to: 'border-accent' },
  { from: /shadow-\[#00D991\]/g, to: 'shadow-accent' },
  { from: /bg-\[#6366F1\]/g, to: 'bg-primary' },
  { from: /text-\[#6366F1\]/g, to: 'text-primary' },
  { from: /shadow-\[#6366F1\]/g, to: 'shadow-primary' },
  { from: /text-\[#60A5FA\]/g, to: 'text-info' },
  { from: /bg-\[#60A5FA\]\/10/g, to: 'bg-info/10' },
  { from: /bg-\[#F59E0B\]\/10/g, to: 'bg-warning/10' },
  { from: /text-\[#F59E0B\]/g, to: 'text-warning' }
];

walk('src/features', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;
  for (const { from, to } of replacements) {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated ${filepath}`);
  }
});
