/*
 * @Author: nongqi
 * @Date: 2022-11-22 11:03:52
 * @LastEditTime: 2022-11-22 11:18:22
 * @LastEditors: nongqi
 * @Description: 命令行相关的功能
 */

import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';


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

const optionDefinitions = [
  { name: 'help' }, // help命令配置
  { name: 'title', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number },
];
const options = commandLineArgs(optionDefinitions);


if ('help' in options) {
  console.log(usage);
  process.exit(); // 终止程序
}


export { options };