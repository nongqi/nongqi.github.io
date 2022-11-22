/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:02
 * @LastEditTime: 2022-11-22 11:07:07
 * @LastEditors: nongqi
 * @Description: index
 */

import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';
import { loadCorpus, saveCorpus } from './lib/corpus.js';
import { options } from './lib/cmd.js';


const corpus = loadCorpus('corpus/data.json');


const title = options.title || createRandomPicker(corpus.title)();

const article = generate(title, { corpus, ...options });

const output = saveCorpus(title, article);

console.log(`生成成功！文章保存于：${output}`);
