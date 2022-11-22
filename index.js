/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:02
 * @LastEditTime: 2022-11-22 10:27:41
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

function parseOptions(options = {}) {
  const argv = process.argv;

  for (let i = 2; i < argv.length; i++) {
    const cmd = argv[i - 1];
    const value = argv[i];
    if (cmd === '--title') {
      options.title = value;
    } else if (cmd === '--min') {
      options.min = Number(value);
    } else if (cmd === '--max') {
      options.max = Number(value);
    }
  }

  return options;
}

const corpus = loadCorpus('corpus/data.json');
const options = parseOptions();
const title = options.title || createRandomPicker(corpus.title)();

const article = generate(title, { corpus, ...options });

const output = saveCorpus(title, article);

console.log(`生成成功！文章保存于：${output}`);