const fs = require('fs');

const logFile = fs.createWriteStream('./error.log', { flags: 'a' });

const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  logFile.write(`[${new Date().toLocaleString()}] WARN: ${args.join(' ')}\n`);
  originalWarn.apply(console, args);
};

console.error = (...args) => {
  logFile.write(`[${new Date().toLocaleString()}] ERROR: ${args.join(' ')}\n`);
  originalError.apply(console, args);
};

process.on('exit', () => {
  logFile.end();
  console.warn = originalWarn;
  console.error = originalError;
});
