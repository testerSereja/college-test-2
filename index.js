#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN

console.log(content.split('\r\n'))

const rows = content.split('\r\n')
const data = rows.slice(1)
console.log(data.length)


const  cells = data.map(row => row.slice(2, row.length - 2).split(' | '));//отфильтровываем строки и в каждой ...
console.log(cells)


const priceForOne = (list) => Number(list[list.length-1]);//цена найма -последний элемент который мы перевели в числовой типа данных
  const countOfSU = 10;//число сильных юнитов
  const countOfSSU = 20;// число вторых по силе 
  const maxStrength = Math.max(...cells.map((el) => el[1]));//здесь мы вычислил наибольший показатель под индексом 1
  const sUnit = cells.filter((el) => el[1] === String(maxStrength)).flat();//
  const sSUnits =cells.filter((el) => el[1] !== String(maxStrength));
  const maxStrengthSSU = Math.max(...sSUnits.map((el) => el[1]));
  const sSUnit = sSUnits.filter((el) => el[1] === String(maxStrengthSSU)).flat();
  const price = priceForOne(sUnit) * countOfSU + priceForOne(sSUnit) * countOfSSU;
  console.log(`Цена найма 10 самых сильных существ и 20 существ вторых по силе: ${Math.round(price)}`);

// END
//.reduce((acc, el) => { acc += el; return acc; }, 0)   - 0 числовой аккум
//.reduce((acc, el) => {acc += el; return acc; }, '')   - '' строковый аккум. Строки так же складываются
//.reduce((acc, el) => {*что-то делаем с el *; return [...acc, *тут константа - результат действий с el*]; }, [])   - []  аккум - массив. Строки так же складываются
