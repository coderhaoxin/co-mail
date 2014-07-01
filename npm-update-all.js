#!/usr/bin/env node

'use strict';

var cp = require('child_process'),
  pkgInfo = require(process.cwd() + '/package.json'),
  params = process.argv.slice(2);

params = params.join(' ')
  .replace('--save', '')
  .replace('--save-dev', '')
  .split(' ');

if (pkgInfo.dependencies) {
  install(pkgInfo.dependencies, '--save');
}

if (pkgInfo.devDependencies) {
  install(pkgInfo.devDependencies, '--save-dev');
}

function install(deps, type) {
  var pkgs = Object.keys(deps);

  var args, result;

  for (var i = 0; i < pkgs.length; i++) {
    var version = deps[pkgs[i]];

    var pkg = pkgs[i] + '@latest';

    if (needSave(version)) {
      args = ['install', pkg, type].concat(params);
    } else {
      args = ['install', pkg].concat(params);
    }

    console.log('npm', args.join(' '));

    result = cp.spawnSync('npm', args);

    if (result.status) {
      console.error(result.stderr.toString());
    } else {
      console.info(result.stdout.toString());
    }
  }
}

function needSave(v) {
  // save
  // ~x.x.x, ^x.x.x, 0.0.x

  // not save
  // x, *
  if (v.indexOf('~') === 0 || v.indexOf('^') === 0 || v.indexOf('0.') === 0) {
    return true;
  }

  return false;
}
