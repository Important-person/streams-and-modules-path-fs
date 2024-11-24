#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileName = process.argv[2];

if(!fileName) {
    console.log('Введите название файла');
    process.exit(1);
}

const logPathFile = path.join(__dirname, `${fileName}`);

const readFile = fs.createReadStream(logPathFile, 'utf-8');

const rl = readline.createInterface({
    input: readFile,
    output: process.stdout,
    terminal: false
})

let countWinner = 0;
let countLose = 0;

rl.on('line', (data) => {
    if(data.trim() == 'Победа') {
        countWinner += 1;
    } else if(data.trim() == 'Проигрыш'){
        countLose += 1;
    }
})

rl.on('close', () => {
    const total = countLose + countWinner;
    if(total == 0) {
        console.log('Файл пустой');
    }
    console.log(`Количество партий: ${total}`);
    console.log(`Количество побед/поражений: ${countWinner}/${countLose}`);
    console.log(`Соотношение: ${((countWinner / total) * 100).toFixed(0)}%`);
})

readFile.on('error', (err) => {
    console.error(err);
})