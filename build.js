/*
 * @Author: nongqi
 * @Date: 2022-11-25 02:01:21
 * @LastEditTime: 2022-11-25 02:02:13
 * @LastEditors: nongqi
 * @Description: 
 */
import { build } from "esbuild";

const buildOptions = {
  entryPoints: ['./browser/index.js'],
  outfile: './dist/index.js',
  bundle: true,
  minify: true,
};

build(buildOptions);