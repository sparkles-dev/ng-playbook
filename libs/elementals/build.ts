import * as ngc from '@angular/compiler-cli';
import * as ts from 'typescript';
import * as rollup from 'rollup';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as path from 'path';

const options: ngc.CompilerOptions = {
  skipTemplateCodegen: false,
  strictMetadataEmit: true,
  fullTemplateTypeCheck: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.ES2015,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  basePath: path.resolve(__dirname),
  outDir: path.resolve(__dirname, 'build')
};

const host = ngc.createCompilerHost({
  options
});

const program = ngc.createProgram({
  rootNames: [
    path.resolve(__dirname, 'src', 'index.ts')
  ],
  options,
  host
});

const result = program.emit({
  emitFlags: ngc.EmitFlags.Default
});

// TODO: keep track of emitted files
const input = [
  path.resolve(__dirname, 'build', 'libs', 'elementals', 'src', 'index.js'),
  path.resolve(__dirname, 'build', 'libs', 'elementals', 'src', 'lib', 'elementals.module.js'),
];

rollup.rollup({
  input: path.resolve(__dirname, 'build', 'libs', 'elementals', 'src', 'lib', 'elementals.module.ngfactory.js'),
  external: (id, parentId) => {
    return path.basename(id).startsWith('elementals.module') !== true;
  },
  plugins: [
    nodeResolve()
  ]
}).then((bundleSet) => {
  return bundleSet.write({
    file: path.resolve(__dirname, 'build', 'elementals.umd.js'),
    format: 'umd',
    name: 'ng-playbook-elementals',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/elements': 'ng.elements',
      '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
      '@angular/platform-browser': 'ng.platformBrowser',
    }
  });
})
.catch(err => console.error(err));
