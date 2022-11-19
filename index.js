/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:02
 * @LastEditTime: 2022-11-19 15:59:25
 * @LastEditors: nongqi
 * @Description: 
 */
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const url = import.meta.url; // 获取当前脚本文件的url
const filepath = resolve(dirname(fileURLToPath(url)), 'corpus/data.json')
const data = readFileSync(filepath, { encoding: 'utf-8' });
const corpus = JSON.parse(data)

console.log('====================================');
console.log(corpus);
console.log('====================================');