#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fileName = process.argv[2];

if(!fileName) {
    console.log('Введите название файла');
    process.exit(1);
};

const logPathFile = path.join(__dirname, `${fileName}`);

function logAnser(answer) {
    const log = `${answer} \n`;
    fs.appendFile(logPathFile, log, (err) => {
        if(err) {
            console.log('Ошибка записи в файл:', err)
        }
    })
}

function playGame() {
    const randomNumber = Math.floor((Math.random() * 2) + 1);

    rl.question('Играем в орел (1) или решка (2) угадайте число \n', (answ) => {
        if(answ != '1' && answ != '2') {
            console.log('Введено неверное значение использовать только 1 или 2');
            playGame();
        } else if(Number(answ) == randomNumber) {
            console.log('Вы победили');
            logAnser('Победа');
        } else if(Number(answ) != randomNumber) {
            console.log('Вы проиграли');
            logAnser('Проигрыш');
        }
        rl.question('Желаете выграть еще раз (y/n) \n', (answ) => {
            if(answ.toLowerCase() === 'y') {
                playGame()
            } else {
                rl.close()
            }
        })
    }) 
}

playGame();


