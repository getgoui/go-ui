#!/usr/bin/env node
require = require('esm')(module);

require('./cli').main(process.argv);
