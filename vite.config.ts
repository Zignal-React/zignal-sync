import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'ZignalSync',
			fileName: (format) => format === 'es' ? 'index.mjs' : 'index.cjs',
			formats: ['es', 'cjs'],
		},
		minify: 'terser',
		terserOptions: {
			compress: {
				passes: 3,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				unsafe_methods: true,
			},
			format: {
				comments: false,
			},
		},
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'React',
				},
			},
		},
	},
	plugins: [dts()],
}); 