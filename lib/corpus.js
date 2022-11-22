/*
 * @Author: nongqi
 * @Date: 2022-11-22 10:58:58
 * @LastEditTime: 2022-11-22 11:03:08
 * @LastEditors: nongqi
 * @Description: 加载和保存文件功能
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import dayjs from 'dayjs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


// 获取当前脚本文件所在目录
const __dirname = dirname(fileURLToPath(import.meta.url));


export function loadCorpus(src) {
  const filepath = resolve(__dirname, '..', src);
  const data = readFileSync(filepath, { encoding: 'utf-8' });
  return JSON.parse(data);
}

export function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, '..', 'output');
  const time = dayjs().format('_YYYY-MM-DD_HH-mm-ss');
  const outputFile = resolve(outputDir, `${title}${time}.txt`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n    ${article.join('\n    ')}`;
  writeFileSync(outputFile, text);

  return outputFile;
}