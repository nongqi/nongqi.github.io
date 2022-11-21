/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:02
 * @LastEditTime: 2022-11-22 05:50:20
 * @LastEditors: nongqi
 * @Description: index
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';
import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';


// 获取当前脚本文件所在目录
const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
  const filepath = resolve(__dirname, src);
  const data = readFileSync(filepath, { encoding: 'utf-8' });
  return JSON.parse(data);
}

function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, 'output');
  const time = dayjs().format('_YYYY-MM-DD_HH-mm-ss');
  const outputFile = resolve(outputDir, `${title}${time}.txt`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n    ${article.join('\n    ')}`;
  writeFileSync(outputFile, text);

  return outputFile;
}

const corpus = loadCorpus('corpus/data.json');
const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();

const article = generate(title, { corpus });

saveCorpus(title, article);
