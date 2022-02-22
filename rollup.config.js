import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
export default {
    input: 'src/index.js',
    output: [
        { file: 'dist/event.cjs.js', format: 'cjs' },
        { file: 'dist/event.esm.js', format: 'esm' },
        { file: "dist/event.umd.js", format: 'umd', name: "event" }
    ],
    plugins: [ 
        resolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
