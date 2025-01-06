import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: "json" };

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.module,
            format: 'es',
            name: pkg.name
        },
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'default',
            name: pkg.name
        }
    ],
    plugins: [
        typescript(),
        nodeResolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true
        }),
        commonjs({ include: 'node_modules/**' })
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
};