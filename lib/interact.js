/*
 * @Author: nongqi
 * @Date: 2022-11-23 01:17:09
 * @LastEditTime: 2022-11-23 19:28:42
 * @LastEditors: nongqi
 * @Description: 控制台交互
 */

import readline from 'readline'

function question(rl, { text, value }) {
  const q = `${text}(${value})\n`
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value)
    })
  })
}

export async function interact(questions) {
  // questions 是一个数组，内容如 {text, value}

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const answers = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q)
    answers.push(answer)
  }

  rl.close()

  return answers;
  // process.stdin.setEncoding('utf8');

  // return new Promise((resolve) => {
  //   const answers = [];
  //   let i = 0;
  //   let { text, value } = questions[i++];
  //   console.log(`${text}(${value})`);
  //   process.stdin.on('readable', () => {
  //     const chunk = process.stdin.read().slice(0, -2);
  //     answers.push(chunk || value); // 保存用户的输入，如果用户输入为空，则使用缺省值
  //     const nextQuestion = questions[i++];
  //     if (nextQuestion) { // 如果问题还未结束，继续监听用户输入
  //       process.stdin.read();
  //       text = nextQuestion.text;
  //       value = nextQuestion.value;
  //       console.log(`${text}(${value})`);
  //     } else { // 如果问题结束了，结束readable监听事件
  //       resolve(answers);
  //     }
  //   });
  // });
}
