/**
 * To load some modules automatically, we need a dynamic loader that can load files according to the file pattern at compile time.
 * We use webpack's require.context api for client build and this loader for node server.
 */

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import camelCase from 'lodash.camelcase';

import { isClient } from 'common/dist/client/utils';

const recursiveMatch = (dir, filePattern, modules) => {
  const baseDir = path.resolve(__dirname, dir);
  const files = fs.readdirSync(baseDir, { withFileTypes: true });

  files.forEach(file => {
    const fullPath = `${baseDir}${path.sep}${file.name}`;

    if (file.isFile() && filePattern.test(fullPath)) {
      // eslint-disable-next-line
      const module = eval(`require('${fullPath}')`);
      // const module = require(baseDir + path.sep + file.name);

      modules[fullPath] = module;
    }

    if (file.isDirectory()) {
      recursiveMatch(baseDir + path.sep + file.name, filePattern, modules);
    }
  });
};

const matchFiles = (dir, filePattern, useSubdirectories) => {
  const modules = {};

  if (useSubdirectories) {
    recursiveMatch(dir, filePattern, modules);
  } else {
    const baseDir = path.resolve(__dirname, dir);
    const files = fs.readdirSync(baseDir, { withFileTypes: true });

    files.forEach(file => {
      const fullPath = `${baseDir}${path.sep}${file.name}`;

      if (file.isFile() && filePattern.test(fullPath)) {
        // eslint-disable-next-line
        const module = eval(`require('${fullPath}')`);
        // const module = require(baseDir + path.sep + file.name);

        modules[fullPath] = module;
      }
    });
  }

  return modules;
};

export const importDynamicSagas = () => {
  let modules = [];

  if (isClient()) {
    const resolve = require.context('../containers', true, /saga\.js$/);

    resolve.keys().forEach(key => {
      modules.push(resolve(key).default);
    });
  } else {
    modules = Object.values(matchFiles('../containers', /saga\.js$/, true));
  }

  return modules;
};

export const importDynamicReducers = () => {
  let modules = {};

  if (isClient()) {
    const resolve = require.context(
      '../containers',
      true,
      /(?<!common)\/reducer\.js$/
    );

    resolve.keys().forEach(key => {
      const basename = key.substring(
        key.lastIndexOf('/', key.lastIndexOf('/' - 1)),
        key.lastIndexOf('/')
      );

      const reducerName = camelCase(basename);
      modules[reducerName] = resolve(key).default;
    });
  } else {
    const matched = matchFiles(
      '../containers',
      new RegExp('(?<!common)/reducer.js$'),
      true
    );

    modules = Object.keys(matched).reduce((reducers, cur) => {
      const reducerName = camelCase(path.basename(path.dirname(cur)));

      reducers[reducerName] = matched[cur];

      return reducers;
    }, {});
  }
  return modules;
};
