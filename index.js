/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:02
 * @LastEditTime: 2022-11-22 10:56:38
 * @LastEditors: nongqi
 * @Description: index
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';


// 定义帮助的内容
const sections = [
  {
    header: '狗屁不通文章生成器',
    content: '生成随机的文章段落用于测试',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline string}',
        description: '文章的主题。',
      },
      {
        name: 'min',
        typeLabel: '{underline number}',
        description: '文章最小字数。',
      },
      {
        name: 'max',
        typeLabel: '{underline number}',
        description: '文章最大字数。',
      },
    ],
  },
];
const usage = commandLineUsage(sections); // 生成帮助文本
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

const optionDefinitions = [
  { name: 'help' }, // help命令配置
  { name: 'title', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number },
];
const options = commandLineArgs(optionDefinitions);
if ('help' in options) {
  console.log(usage);
} else {
  const title = options.title || createRandomPicker(corpus.title)();

  const article = generate(title, { corpus, ...options });

  const output = saveCorpus(title, article);

  console.log(`生成成功！文章保存于：${output}`);
}
