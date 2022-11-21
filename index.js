/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:02
 * @LastEditTime: 2022-11-22 02:13:06
 * @LastEditors: nongqi
 * @Description: index
 */
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';


// 获取当前脚本文件所在目录
const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
  const filepath = resolve(__dirname, src);
  const data = readFileSync(filepath, { encoding: 'utf-8' });
  return JSON.parse(data);
}

const corpus = loadCorpus('corpus/data.json');
const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();

const article = generate(title, { corpus });

console.log(`${title}\n\n    ${article.join('\n    ')}`);
