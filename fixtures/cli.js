#!/usr/bin/env node
"use strict";

const importLocal = require("..");

importLocal(__filename) && console.log("local");