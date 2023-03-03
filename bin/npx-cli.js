#!/usr/bin/env node
require("../vendor/v8-compile-cache");

const cli = require("../lib/cli.js");

process.argv[1] = require.resolve("./npm-cli.js"), process.argv.splice(2, 0, "exec");

const removedSwitches = new Set([ "always-spawn", "ignore-existing", "shell-auto-fallback" ]), removedOpts = new Set([ "npm", "node-arg", "n" ]), removed = new Set([ ...removedSwitches, ...removedOpts ]), {definitions, shorthands} = cli._config, npmSwitches = Object.entries(definitions).filter((([key, {type}]) => type === Boolean || Array.isArray(type) && type.includes(Boolean))).map((([key]) => key)), switches = new Set([ ...removedSwitches, ...npmSwitches, "no-install", "quiet", "q", "version", "v", "help", "h" ]), opts = new Set([ ...removedOpts, "package", "p", "cache", "userconfig", "call", "c", "shell", "npm", "node-arg", "n" ]);

let i, sawRemovedFlags = !1;

for (i = 3; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if ("--" === arg) break;
  if (!/^-/.test(arg)) {
    process.argv.splice(i, 0, "--");
    break;
  }
  {
    const [key, ...v] = arg.replace(/^-+/, "").split("=");
    switch (key) {
     case "p":
      process.argv[i] = [ "--package", ...v ].join("=");
      break;

     case "shell":
      process.argv[i] = [ "--script-shell", ...v ].join("=");
      break;

     case "no-install":
      process.argv[i] = "--yes=false";
      break;

     default:
      if (shorthands[key] && !removed.has(key)) {
        const a = [ ...shorthands[key] ];
        v.length && a.push(v.join("=")), process.argv.splice(i, 1, ...a), i--;
        continue;
      }
    }
    removed.has(key) && (console.error(`npx: the --${key} argument has been removed.`), 
    sawRemovedFlags = !0, process.argv.splice(i, 1), i--), 0 !== v.length || switches.has(key) || !opts.has(key) && /^-/.test(process.argv[i + 1]) || (removed.has(key) ? process.argv.splice(i + 1, 1) : i++);
  }
}

sawRemovedFlags && console.error("See `npm help exec` for more information"), cli(process);