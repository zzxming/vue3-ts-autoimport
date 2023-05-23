import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

/** get icon:
 *    https://icones.netlify.app/
 *    https://icon-sets.iconify.design/
 */
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia'],
			dts: 'src/auto-imports.d.ts',
			// 自动引入 element-plus 组件
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			// 以 .vue 结尾的文件
			extensions: ['vue'],
			dts: 'src/components.d.ts',
			// 递归查找子目录
			deep: true,
			resolvers: [
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
				// 自动注册图标组件, ep -> element-plus, ant-design -> ant-design
				IconsResolver({
					// icon 组件前缀
					prefix: 'icon',
					// 包含的 icon 图标集, 如果不是必要可以不用, 会妨碍使用 icones.netlify.app 里的图标
					// enabledCollections: ['ep', 'ant-design', 'et'],
					customCollections: ['cus'],
				}),
			],
		}),
		// 引入自定义 svg
		Icons({
			// 自动安装
			autoInstall: true,
			compiler: 'vue3',
			customCollections: {
				// 为 svg 添加 fill
				cus: FileSystemIconLoader('src/assets/svg', (svg) =>
					svg.replace(/^<svg /, '<svg fill="currentColor" ')
				),
			},
		}),
		// 自动引入 element-plus 样式
		createStyleImportPlugin({
			libs: [
				{
					libraryName: 'element-plus',
					esModule: true,
					resolveStyle: (name) => {
						return `element-plus/theme-chalk/${name}.css`;
					},
				},
			],
		}),
	],
	server: {
		// 本地调试跨域
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	resolve: {
		// 路径别名
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				// 引入 less 全局变量, 会为每个 less 前加上此代码
				javascriptEnable: true,
				modifyVars: {
					hack: `true; @import "${resolve(__dirname, './src/assets/style/golbalVariable.less')}"`,
				},
			},
		},
		// postcss 配置
		postcss: {
			plugins: [require('autoprefixer'), require('postcss-pxtorem')],
		},
	},
});
