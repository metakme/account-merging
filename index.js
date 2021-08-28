const fs = require('fs');
const merge = require('./src/merge');

const file = process.argv[2];

if(!file) return console.log('file name required');
console.log(file);

const input = fs.readFileSync(file, { encoding: 'utf8' });
const accounts = JSON.parse(input);

const output = merge(accounts);

console.log(output);
