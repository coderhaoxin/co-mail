#!/usr/bin/env node

'use strict';

var cp = require('child_process'),
  pkg = require(process.cwd() + '/package.json'),
  params = process.argv.slice(1);

params = params.join(' ');
params.replace('--save', '');
params.replace('--save-dev', '');

if (pkg.dependencies) {
  var deps = Object.keys(pkg.dependencies);

  for (var i = 0; i < deps.length; i++) {
    console.log('npm update', deps[i]);
    var result = cp.spawnSync('npm', ['update', deps[i], '--save', params]);
    if (result.status) {
      console.error(result.stderr.toString());
    } else {
      console.log(result.stdout.toString());
    }
  }
}

if (pkg.devDependencies) {
  var devDeps = Object.keys(pkg.devDependencies);

  for (var j = 0; j < devDeps.length; j++) {
    console.log('npm update', devDeps[j]);
    var result = cp.spawnSync('npm', ['update', devDeps[j], '--save-dev', params]);
    if (result.status) {
      console.error(result.stderr.toString());
    } else {
      console.log(result.stdout.toString());
    }
  }
}