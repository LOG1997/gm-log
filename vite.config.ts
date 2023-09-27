/// <reference types="vitest" />
// vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';

import viteCompression from 'vite-plugin-compression';

import removeConsole from 'vite-plugin-remove-console';
function resolve(str: string) {
    return path.resolve(__dirname, str);
}

export default defineConfig({
    plugins: [
        removeConsole(),
        viteCompression(),
        typescript({
            target: 'es5',
            rootDir: resolve('packages/gm'),
            declaration: true,
            declarationDir: resolve('lib'),
            exclude: resolve('node_modules/**'),
            allowSyntheticDefaultImports: true,
        }),
    ],
    build: {
        // 打包输出的目录
        outDir: 'lib',

        // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
        // cssTarget: 'chrome61',
        lib: {
            // 组件库源码的入口文件
            entry: resolve('packages/gm/index.ts'),
            // 组件库名称
            name: 'gmecdh',
            // 文件名称, 打包结果举例: my-packages.umd.cjs
            fileName: 'index',
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            output: {},
        },
    },
    test: {
        globals: true, // --> 0.8.1+  请修改成globals
        environment: 'jsdom',
        // include: ['**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        // passWithNoTests: true,
        transformMode: {
            web: [/\.[jt]sx$/],
        },
    },
});
