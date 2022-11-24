/*
 * @Author: nongqi
 * @Date: 2022-11-25 02:03:36
 * @LastEditTime: 2022-11-25 02:03:45
 * @LastEditors: nongqi
 * @Description: 
 */
import { generate } from '../lib/generator.js';
import { createRandomPicker } from '../lib/random.js';

const defaultCorpus = require('../corpus/data.json');

async function loadCorpus(corpuspath) {
  if (corpuspath) {
    const corpus = await (await fetch(corpuspath)).json();
    return corpus;
  }
  return defaultCorpus;
}

export { generate, createRandomPicker, loadCorpus };