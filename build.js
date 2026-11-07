const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Remove existing dist if present
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

// Create dist
fs.mkdirSync(distDir, { recursive: true });

// Files to copy directly to dist
const filesToCopy = ['index.html', 'styles.css', 'script.js'];

filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> dist/`);
  }
});

// Copy public directory to dist/public
const publicSrc = path.join(__dirname, 'public');
const publicDest = path.join(distDir, 'public');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(publicSrc)) {
  copyDirRecursive(publicSrc, publicDest);
  console.log(`Copied public/ directory -> dist/public/`);
}

console.log('✓ Build complete! Output directory: dist/');
