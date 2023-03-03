if (require.main !== module) throw new Error("The programmatic API was removed in npm v8.0.0");

require("./vendor/v8-compile-cache"), require("./lib/cli.js")(process);