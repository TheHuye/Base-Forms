import fs from 'fs';
import path from 'path';

// Define a writable stream to log file
const logFilePath = path.join(__dirname, 'logs.txt');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Override console.log to write to log file
const originalLog = console.log;
console.log = (...args: any[]) => {
    const message = args.join(' ');
    logStream.write(`[LOG] ${getCurrentDateTime()} - ${message}\n`);
    originalLog.apply(console, args);
};

// Override console.error to write to log file
const originalError = console.error;
console.error = (...args: any[]) => {
    const message = args.join(' ');
    logStream.write(`[ERROR] ${getCurrentDateTime()} - ${message}\n`);
    originalError.apply(console, args);
};

// Function to get current date and time
function getCurrentDateTime() {
    return new Date().toISOString();
}

// Function to close log stream
function closeLogStream() {
    logStream.end();
}

export { closeLogStream };
