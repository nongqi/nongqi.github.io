/*
 * @Author: nongqi
 * @Date: 2022-11-19 01:11:29
 * @LastEditTime: 2022-11-22 03:46:03
 * @LastEditors: nongqi
 * @Description:
 */

/**
 * 返回一个大于 min，小于max的随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function randomInt(min, max) {
  const p = Math.random();
  return Math.floor(min * (1 - p) + max * p);
}

/**
 * 随机选出数组中的一个元素
 * @param {*} arr
 * @returns 返回 function，执行后即可得到语句（字符串）
 */
export function createRandomPicker(arr) {
  arr = [...arr];

  function randomPick() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];

    [arr[index], arr[len]] = [arr[len], arr[index]];
    return picked;
  }
  randomPick(); // 抛弃第一次选择结果
  return randomPick;
}
