#!/usr/bin/env node
!function() {
  "use strict";
  var deferred, next, __webpack_modules__ = {
    67755: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
        autoRun: function() {
          return autoRun;
        },
        default: function() {
          return cli;
        },
        main: function() {
          return main;
        }
      });
      var lang_namespaceObject = {};
      __webpack_require__.r(lang_namespaceObject), __webpack_require__.d(lang_namespaceObject, {
        en: function() {
          return en;
        }
      });
      var cache_namespaceObject = {};
      __webpack_require__.r(cache_namespaceObject), __webpack_require__.d(cache_namespaceObject, {
        examples: function() {
          return examples;
        },
        getCachedPackagesDirs: function() {
          return getCachedPackagesDirs;
        },
        hasWrapper: function() {
          return hasWrapper;
        },
        run: function() {
          return run;
        },
        setFlags: function() {
          return setFlags;
        }
      });
      var login_namespaceObject = {};
      __webpack_require__.r(login_namespaceObject), __webpack_require__.d(login_namespaceObject, {
        getOneTimePassword: function() {
          return getOneTimePassword;
        },
        getToken: function() {
          return getToken;
        },
        hasWrapper: function() {
          return login_hasWrapper;
        },
        run: function() {
          return login_run;
        },
        setFlags: function() {
          return login_setFlags;
        }
      });
      var access_namespaceObject = {};
      __webpack_require__.r(access_namespaceObject), __webpack_require__.d(access_namespaceObject, {
        examples: function() {
          return access_examples;
        },
        hasWrapper: function() {
          return access_hasWrapper;
        },
        run: function() {
          return access_run;
        },
        setFlags: function() {
          return access_setFlags;
        }
      });
      var pack_namespaceObject = {};
      __webpack_require__.r(pack_namespaceObject), __webpack_require__.d(pack_namespaceObject, {
        hasWrapper: function() {
          return pack_hasWrapper;
        },
        pack: function() {
          return pack;
        },
        packTarball: function() {
          return packTarball;
        },
        packWithIgnoreAndHeaders: function() {
          return packWithIgnoreAndHeaders;
        },
        run: function() {
          return pack_run;
        },
        setFlags: function() {
          return pack_setFlags;
        }
      });
      var fetchers_namespaceObject = {};
      __webpack_require__.r(fetchers_namespaceObject), __webpack_require__.d(fetchers_namespaceObject, {
        base: function() {
          return BaseFetcher;
        },
        copy: function() {
          return CopyFetcher;
        },
        git: function() {
          return GitFetcher;
        },
        tarball: function() {
          return TarballFetcher;
        },
        workspace: function() {
          return WorkspaceFetcher;
        }
      });
      var autoclean_namespaceObject = {};
      __webpack_require__.r(autoclean_namespaceObject), __webpack_require__.d(autoclean_namespaceObject, {
        clean: function() {
          return autoclean_clean;
        },
        hasWrapper: function() {
          return autoclean_hasWrapper;
        },
        noArguments: function() {
          return noArguments;
        },
        requireLockfile: function() {
          return requireLockfile;
        },
        run: function() {
          return autoclean_run;
        },
        setFlags: function() {
          return autoclean_setFlags;
        }
      });
      var audit_namespaceObject = {};
      __webpack_require__.r(audit_namespaceObject), __webpack_require__.d(audit_namespaceObject, {
        default: function() {
          return Audit;
        },
        hasWrapper: function() {
          return audit_hasWrapper;
        },
        run: function() {
          return audit_run;
        },
        setFlags: function() {
          return audit_setFlags;
        }
      });
      var install_namespaceObject = {};
      __webpack_require__.r(install_namespaceObject), __webpack_require__.d(install_namespaceObject, {
        Install: function() {
          return Install;
        },
        hasWrapper: function() {
          return install_hasWrapper;
        },
        install: function() {
          return install;
        },
        run: function() {
          return install_run;
        },
        setFlags: function() {
          return install_setFlags;
        },
        wrapLifecycle: function() {
          return wrapLifecycle;
        }
      });
      var list_namespaceObject = {};
      __webpack_require__.r(list_namespaceObject), __webpack_require__.d(list_namespaceObject, {
        buildTree: function() {
          return list_buildTree;
        },
        filterTree: function() {
          return filterTree;
        },
        getDevDeps: function() {
          return getDevDeps;
        },
        getParent: function() {
          return list_getParent;
        },
        getReqDepth: function() {
          return getReqDepth;
        },
        hasWrapper: function() {
          return list_hasWrapper;
        },
        requireLockfile: function() {
          return list_requireLockfile;
        },
        run: function() {
          return list_run;
        },
        setFlags: function() {
          return list_setFlags;
        }
      });
      var add_namespaceObject = {};
      __webpack_require__.r(add_namespaceObject), __webpack_require__.d(add_namespaceObject, {
        Add: function() {
          return Add;
        },
        hasWrapper: function() {
          return add_hasWrapper;
        },
        run: function() {
          return add_run;
        },
        setFlags: function() {
          return add_setFlags;
        }
      });
      var run_namespaceObject = {};
      __webpack_require__.r(run_namespaceObject), __webpack_require__.d(run_namespaceObject, {
        getBinEntries: function() {
          return getBinEntries;
        },
        hasWrapper: function() {
          return run_hasWrapper;
        },
        run: function() {
          return run_run;
        },
        setFlags: function() {
          return run_setFlags;
        }
      });
      var bin_namespaceObject = {};
      __webpack_require__.r(bin_namespaceObject), __webpack_require__.d(bin_namespaceObject, {
        hasWrapper: function() {
          return bin_hasWrapper;
        },
        run: function() {
          return bin_run;
        },
        setFlags: function() {
          return bin_setFlags;
        }
      });
      var check_namespaceObject = {};
      __webpack_require__.r(check_namespaceObject), __webpack_require__.d(check_namespaceObject, {
        hasWrapper: function() {
          return check_hasWrapper;
        },
        noArguments: function() {
          return check_noArguments;
        },
        requireLockfile: function() {
          return check_requireLockfile;
        },
        run: function() {
          return check_run;
        },
        setFlags: function() {
          return check_setFlags;
        },
        verifyTreeCheck: function() {
          return verifyTreeCheck;
        }
      });
      var commands_config_namespaceObject = {};
      __webpack_require__.r(commands_config_namespaceObject), __webpack_require__.d(commands_config_namespaceObject, {
        examples: function() {
          return config_examples;
        },
        hasWrapper: function() {
          return config_hasWrapper;
        },
        run: function() {
          return config_run;
        },
        setFlags: function() {
          return config_setFlags;
        }
      });
      var remove_namespaceObject = {};
      __webpack_require__.r(remove_namespaceObject), __webpack_require__.d(remove_namespaceObject, {
        hasWrapper: function() {
          return remove_hasWrapper;
        },
        requireLockfile: function() {
          return remove_requireLockfile;
        },
        run: function() {
          return remove_run;
        },
        setFlags: function() {
          return remove_setFlags;
        }
      });
      var upgrade_namespaceObject = {};
      __webpack_require__.r(upgrade_namespaceObject), __webpack_require__.d(upgrade_namespaceObject, {
        cleanLockfile: function() {
          return cleanLockfile;
        },
        getOutdated: function() {
          return getOutdated;
        },
        hasWrapper: function() {
          return upgrade_hasWrapper;
        },
        requireLockfile: function() {
          return upgrade_requireLockfile;
        },
        run: function() {
          return upgrade_run;
        },
        setFlags: function() {
          return upgrade_setFlags;
        }
      });
      var upgrade_interactive_namespaceObject = {};
      __webpack_require__.r(upgrade_interactive_namespaceObject), __webpack_require__.d(upgrade_interactive_namespaceObject, {
        hasWrapper: function() {
          return upgrade_interactive_hasWrapper;
        },
        requireLockfile: function() {
          return upgrade_interactive_requireLockfile;
        },
        run: function() {
          return upgrade_interactive_run;
        },
        setFlags: function() {
          return upgrade_interactive_setFlags;
        }
      });
      var global_namespaceObject = {};
      __webpack_require__.r(global_namespaceObject), __webpack_require__.d(global_namespaceObject, {
        getBinFolder: function() {
          return getBinFolder;
        },
        hasWrapper: function() {
          return global_hasWrapper;
        },
        run: function() {
          return global_run;
        },
        setFlags: function() {
          return commands_global_setFlags;
        }
      });
      var create_namespaceObject = {};
      __webpack_require__.r(create_namespaceObject), __webpack_require__.d(create_namespaceObject, {
        coerceCreatePackageName: function() {
          return coerceCreatePackageName;
        },
        hasWrapper: function() {
          return create_hasWrapper;
        },
        parsePackageName: function() {
          return parsePackageName;
        },
        run: function() {
          return create_run;
        },
        setFlags: function() {
          return create_setFlags;
        }
      });
      var exec_namespaceObject = {};
      __webpack_require__.r(exec_namespaceObject), __webpack_require__.d(exec_namespaceObject, {
        hasWrapper: function() {
          return exec_hasWrapper;
        },
        run: function() {
          return exec_run;
        },
        setFlags: function() {
          return exec_setFlags;
        }
      });
      var generate_lock_entry_namespaceObject = {};
      __webpack_require__.r(generate_lock_entry_namespaceObject), __webpack_require__.d(generate_lock_entry_namespaceObject, {
        examples: function() {
          return generate_lock_entry_examples;
        },
        hasWrapper: function() {
          return generate_lock_entry_hasWrapper;
        },
        run: function() {
          return generate_lock_entry_run;
        },
        setFlags: function() {
          return generate_lock_entry_setFlags;
        }
      });
      var help_namespaceObject = {};
      __webpack_require__.r(help_namespaceObject), __webpack_require__.d(help_namespaceObject, {
        hasWrapper: function() {
          return help_hasWrapper;
        },
        run: function() {
          return help_run;
        },
        setFlags: function() {
          return help_setFlags;
        }
      });
      var import_namespaceObject = {};
      __webpack_require__.r(import_namespaceObject), __webpack_require__.d(import_namespaceObject, {
        Import: function() {
          return Import;
        },
        hasWrapper: function() {
          return import_hasWrapper;
        },
        noArguments: function() {
          return import_noArguments;
        },
        run: function() {
          return import_run;
        },
        setFlags: function() {
          return import_setFlags;
        }
      });
      var info_namespaceObject = {};
      __webpack_require__.r(info_namespaceObject), __webpack_require__.d(info_namespaceObject, {
        hasWrapper: function() {
          return info_hasWrapper;
        },
        run: function() {
          return info_run;
        },
        setFlags: function() {
          return info_setFlags;
        }
      });
      var init_namespaceObject = {};
      __webpack_require__.r(init_namespaceObject), __webpack_require__.d(init_namespaceObject, {
        getGitConfigInfo: function() {
          return getGitConfigInfo;
        },
        hasWrapper: function() {
          return init_hasWrapper;
        },
        run: function() {
          return init_run;
        },
        setFlags: function() {
          return init_setFlags;
        },
        shouldRunInCurrentCwd: function() {
          return shouldRunInCurrentCwd;
        }
      });
      var commands_licenses_namespaceObject = {};
      __webpack_require__.r(commands_licenses_namespaceObject), __webpack_require__.d(commands_licenses_namespaceObject, {
        examples: function() {
          return licenses_examples;
        },
        hasWrapper: function() {
          return licenses_hasWrapper;
        },
        run: function() {
          return licenses_run;
        },
        setFlags: function() {
          return licenses_setFlags;
        }
      });
      var link_namespaceObject = {};
      __webpack_require__.r(link_namespaceObject), __webpack_require__.d(link_namespaceObject, {
        getRegistryFolder: function() {
          return getRegistryFolder;
        },
        hasWrapper: function() {
          return link_hasWrapper;
        },
        run: function() {
          return link_run;
        },
        setFlags: function() {
          return link_setFlags;
        }
      });
      var logout_namespaceObject = {};
      __webpack_require__.r(logout_namespaceObject), __webpack_require__.d(logout_namespaceObject, {
        hasWrapper: function() {
          return logout_hasWrapper;
        },
        run: function() {
          return logout_run;
        },
        setFlags: function() {
          return logout_setFlags;
        }
      });
      var node_namespaceObject = {};
      __webpack_require__.r(node_namespaceObject), __webpack_require__.d(node_namespaceObject, {
        hasWrapper: function() {
          return node_hasWrapper;
        },
        run: function() {
          return node_run;
        },
        setFlags: function() {
          return node_setFlags;
        }
      });
      var outdated_namespaceObject = {};
      __webpack_require__.r(outdated_namespaceObject), __webpack_require__.d(outdated_namespaceObject, {
        hasWrapper: function() {
          return outdated_hasWrapper;
        },
        requireLockfile: function() {
          return outdated_requireLockfile;
        },
        run: function() {
          return outdated_run;
        },
        setFlags: function() {
          return outdated_setFlags;
        }
      });
      var tag_namespaceObject = {};
      __webpack_require__.r(tag_namespaceObject), __webpack_require__.d(tag_namespaceObject, {
        examples: function() {
          return tag_examples;
        },
        getName: function() {
          return tag_getName;
        },
        hasWrapper: function() {
          return tag_hasWrapper;
        },
        run: function() {
          return tag_run;
        },
        setFlags: function() {
          return tag_setFlags;
        }
      });
      var owner_namespaceObject = {};
      __webpack_require__.r(owner_namespaceObject), __webpack_require__.d(owner_namespaceObject, {
        examples: function() {
          return owner_examples;
        },
        hasWrapper: function() {
          return owner_hasWrapper;
        },
        mutate: function() {
          return mutate;
        },
        run: function() {
          return owner_run;
        },
        setFlags: function() {
          return owner_setFlags;
        }
      });
      var policies_namespaceObject = {};
      __webpack_require__.r(policies_namespaceObject), __webpack_require__.d(policies_namespaceObject, {
        examples: function() {
          return policies_examples;
        },
        hasWrapper: function() {
          return policies_hasWrapper;
        },
        run: function() {
          return policies_run;
        },
        setFlags: function() {
          return policies_setFlags;
        }
      });
      var commands_version_namespaceObject = {};
      __webpack_require__.r(commands_version_namespaceObject), __webpack_require__.d(commands_version_namespaceObject, {
        hasWrapper: function() {
          return version_hasWrapper;
        },
        run: function() {
          return version_run;
        },
        setFlags: function() {
          return version_setFlags;
        },
        setVersion: function() {
          return setVersion;
        }
      });
      var publish_namespaceObject = {};
      __webpack_require__.r(publish_namespaceObject), __webpack_require__.d(publish_namespaceObject, {
        hasWrapper: function() {
          return publish_hasWrapper;
        },
        run: function() {
          return publish_run;
        },
        setFlags: function() {
          return publish_setFlags;
        }
      });
      var team_namespaceObject = {};
      __webpack_require__.r(team_namespaceObject), __webpack_require__.d(team_namespaceObject, {
        examples: function() {
          return team_examples;
        },
        hasWrapper: function() {
          return team_hasWrapper;
        },
        run: function() {
          return team_run;
        },
        setFlags: function() {
          return team_setFlags;
        }
      });
      var unplug_namespaceObject = {};
      __webpack_require__.r(unplug_namespaceObject), __webpack_require__.d(unplug_namespaceObject, {
        clearAll: function() {
          return clearAll;
        },
        clearSome: function() {
          return clearSome;
        },
        hasWrapper: function() {
          return unplug_hasWrapper;
        },
        run: function() {
          return unplug_run;
        },
        setFlags: function() {
          return unplug_setFlags;
        }
      });
      var unlink_namespaceObject = {};
      __webpack_require__.r(unlink_namespaceObject), __webpack_require__.d(unlink_namespaceObject, {
        hasWrapper: function() {
          return unlink_hasWrapper;
        },
        run: function() {
          return unlink_run;
        },
        setFlags: function() {
          return unlink_setFlags;
        }
      });
      var versions_namespaceObject = {};
      __webpack_require__.r(versions_namespaceObject), __webpack_require__.d(versions_namespaceObject, {
        hasWrapper: function() {
          return versions_hasWrapper;
        },
        run: function() {
          return versions_run;
        },
        setFlags: function() {
          return versions_setFlags;
        }
      });
      var why_namespaceObject = {};
      __webpack_require__.r(why_namespaceObject), __webpack_require__.d(why_namespaceObject, {
        hasWrapper: function() {
          return why_hasWrapper;
        },
        queryWhy: function() {
          return queryWhy;
        },
        requireLockfile: function() {
          return why_requireLockfile;
        },
        run: function() {
          return why_run;
        },
        setFlags: function() {
          return why_setFlags;
        }
      });
      var workspaces_namespaceObject = {};
      __webpack_require__.r(workspaces_namespaceObject), __webpack_require__.d(workspaces_namespaceObject, {
        examples: function() {
          return workspaces_examples;
        },
        hasWrapper: function() {
          return workspaces_hasWrapper;
        },
        info: function() {
          return info;
        },
        run: function() {
          return workspaces_run;
        },
        runScript: function() {
          return runScript;
        },
        setFlags: function() {
          return workspaces_setFlags;
        }
      });
      var workspace_namespaceObject = {};
      function _extends() {
        return _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
          }
          return target;
        }, _extends.apply(this, arguments);
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg), value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      function asyncToGenerator_asyncToGenerator(fn) {
        return function() {
          var self = this, args = arguments;
          return new Promise((function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          }));
        };
      }
      function formatFunction() {
        var strs = Array.prototype.slice.call(arguments, 0);
        return strs.join(" ");
      }
      __webpack_require__.r(workspace_namespaceObject), __webpack_require__.d(workspace_namespaceObject, {
        hasWrapper: function() {
          return workspace_hasWrapper;
        },
        run: function() {
          return workspace_run;
        },
        setFlags: function() {
          return workspace_setFlags;
        }
      });
      var defaultFormatter = {
        bold: formatFunction,
        dim: formatFunction,
        italic: formatFunction,
        underline: formatFunction,
        inverse: formatFunction,
        strikethrough: formatFunction,
        black: formatFunction,
        red: formatFunction,
        green: formatFunction,
        yellow: formatFunction,
        blue: formatFunction,
        magenta: formatFunction,
        cyan: formatFunction,
        white: formatFunction,
        gray: formatFunction,
        grey: formatFunction,
        stripColor: formatFunction
      }, en = {
        upToDate: "Already up-to-date.",
        folderInSync: "Folder in sync.",
        nothingToInstall: "Nothing to install.",
        resolvingPackages: "Resolving packages",
        checkingManifest: "Validating package.json",
        fetchingPackages: "Fetching packages",
        linkingDependencies: "Linking dependencies",
        rebuildingPackages: "Rebuilding all packages",
        buildingFreshPackages: "Building fresh packages",
        cleaningModules: "Cleaning modules",
        bumpingVersion: "Bumping version",
        savingHar: "Saving HAR file: $0",
        answer: "Answer?",
        usage: "Usage",
        installCommandRenamed: "`install` has been replaced with `add` to add new dependencies. Run $0 instead.",
        globalFlagRemoved: "`--global` has been deprecated. Please run $0 instead.",
        waitingInstance: "Waiting for the other yarn instance to finish (pid $0, inside $1)",
        waitingNamedInstance: "Waiting for the other yarn instance to finish ($0)",
        offlineRetrying: "There appears to be trouble with your network connection. Retrying...",
        internalServerErrorRetrying: "There appears to be trouble with the npm registry (returned $1). Retrying...",
        clearedCache: "Cleared cache.",
        couldntClearPackageFromCache: "Couldn't clear package $0 from cache",
        clearedPackageFromCache: "Cleared package $0 from cache",
        packWroteTarball: "Wrote tarball to $0.",
        invalidBinField: "Invalid bin field for $0.",
        invalidBinEntry: "Invalid bin entry for $1 (in $0).",
        helpExamples: "  Examples:\n$0\n",
        helpCommands: "  Commands:\n$0\n",
        helpCommandsMore: "  Run `$0` for more information on specific commands.",
        helpLearnMore: "  Visit $0 to learn more about Yarn.\n",
        manifestPotentialTypo: "Potential typo $0, did you mean $1?",
        manifestBuiltinModule: "$0 is also the name of a node core module",
        manifestNameDot: "Name can't start with a dot",
        manifestNameIllegalChars: "Name contains illegal characters",
        manifestNameBlacklisted: "Name is blacklisted",
        manifestLicenseInvalid: "License should be a valid SPDX license expression",
        manifestLicenseNone: "No license field",
        manifestStringExpected: "$0 is not a string",
        manifestDependencyCollision: "$0 has dependency $1 with range $2 that collides with a dependency in $3 of the same name with version $4",
        manifestDirectoryNotFound: "Unable to read $0 directory of module $1",
        verboseFileCopy: "Copying $0 to $1.",
        verboseFileLink: "Creating hardlink at $0 to $1.",
        verboseFileSymlink: "Creating symlink at $0 to $1.",
        verboseFileSkip: "Skipping copying of file $0 as the file at $1 is the same size ($2) and mtime ($3).",
        verboseFileSkipSymlink: "Skipping copying of $0 as the file at $1 is the same symlink ($2).",
        verboseFileSkipHardlink: "Skipping copying of $0 as the file at $1 is the same hardlink ($2).",
        verboseFileRemoveExtraneous: "Removing extraneous file $0.",
        verboseFilePhantomExtraneous: "File $0 would be marked as extraneous but has been removed as it's listed as a phantom file.",
        verboseFileSkipArtifact: "Skipping copying of $0 as the file is marked as a built artifact and subject to change.",
        verboseFileFolder: "Creating directory $0.",
        verboseRequestStart: "Performing $0 request to $1.",
        verboseRequestFinish: "Request $0 finished with status code $1.",
        configSet: "Set $0 to $1.",
        configDelete: "Deleted $0.",
        configNpm: "npm config",
        configYarn: "yarn config",
        couldntFindPackagejson: "Couldn't find a package.json file in $0",
        couldntFindMatch: "Couldn't find match for $0 in $1 for $2.",
        couldntFindPackageInCache: "Couldn't find any versions for $0 that matches $1 in our cache (possible versions are $2). This is usually caused by a missing entry in the lockfile, running Yarn without the --offline flag may help fix this issue.",
        couldntFindVersionThatMatchesRange: "Couldn't find any versions for $0 that matches $1",
        chooseVersionFromList: "Please choose a version of $0 from this list:",
        moduleNotInManifest: "This module isn't specified in a package.json file.",
        moduleAlreadyInManifest: "$0 is already in $1. Please remove existing entry first before adding it to $2.",
        unknownFolderOrTarball: "Passed folder/tarball doesn't exist,",
        unknownPackage: "Couldn't find package $0.",
        unknownPackageName: "Couldn't find package name.",
        unknownUser: "Couldn't find user $0.",
        unknownRegistryResolver: "Unknown registry resolver $0",
        userNotAnOwner: "User $0 isn't an owner of this package.",
        invalidVersionArgument: "Use the $0 flag to create a new version.",
        invalidVersion: "Invalid version supplied.",
        requiredVersionInRange: "Required version in range.",
        packageNotFoundRegistry: "Couldn't find package $0 on the $1 registry.",
        requiredPackageNotFoundRegistry: "Couldn't find package $0 required by $1 on the $2 registry.",
        doesntExist: "Package $1 refers to a non-existing file '$0'.",
        missingRequiredPackageKey: "Package $0 doesn't have a $1.",
        invalidAccess: "Invalid argument for access, expected public or restricted.",
        invalidCommand: "Invalid subcommand. Try $0",
        invalidGistFragment: "Invalid gist fragment $0.",
        invalidHostedGitFragment: "Invalid hosted git fragment $0.",
        invalidFragment: "Invalid fragment $0.",
        invalidPackageName: "Invalid package name.",
        invalidPackageVersion: "Can't add $0: invalid package version $1.",
        couldntFindManifestIn: "Couldn't find manifest in $0.",
        shrinkwrapWarning: "npm-shrinkwrap.json found. This will not be updated or respected. See https://yarnpkg.com/en/docs/migrating-from-npm for more information.",
        npmLockfileWarning: "package-lock.json found. Your project contains lock files generated by tools other than Yarn. It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. To clear this warning, remove package-lock.json.",
        lockfileOutdated: "Outdated lockfile. Please run `yarn install` and try again.",
        lockfileMerged: "Merge conflict detected in yarn.lock and successfully merged.",
        lockfileConflict: "A merge conflict was found in yarn.lock but it could not be successfully merged, regenerating yarn.lock from scratch.",
        ignoredScripts: "Ignored scripts due to flag.",
        missingAddDependencies: "Missing list of packages to add to your project.",
        yesWarning: "The yes flag has been set. This will automatically answer yes to all questions, which may have security implications.",
        networkWarning: "You don't appear to have an internet connection. Try the --offline flag to use the cache for registry queries.",
        flatGlobalError: 'The package $0 requires a flat dependency graph. Add `"flat": true` to your package.json and try again.',
        noName: "Package doesn't have a name.",
        noVersion: "Package doesn't have a version.",
        answerRequired: "An answer is required.",
        missingWhyDependency: "Missing package name, folder or path to file to identify why a package has been installed",
        bugReport: "If you think this is a bug, please open a bug report with the information provided in $0.",
        unexpectedError: "An unexpected error occurred: $0.",
        jsonError: "Error parsing JSON at $0, $1.",
        noPermission: "Cannot create $0 due to insufficient permissions.",
        noGlobalFolder: "Cannot find a suitable global folder. Tried these: $0",
        allDependenciesUpToDate: "All of your dependencies are up to date.",
        legendColorsForVersionUpdates: "Color legend : \n $0    : Major Update backward-incompatible updates \n $1 : Minor Update backward-compatible features \n $2  : Patch Update backward-compatible bug fixes",
        frozenLockfileError: "Your lockfile needs to be updated, but yarn was run with `--frozen-lockfile`.",
        fileWriteError: "Could not write file $0: $1",
        multiplePackagesCantUnpackInSameDestination: "Pattern $0 is trying to unpack in the same destination $1 as pattern $2. This could result in non-deterministic behavior, skipping.",
        incorrectLockfileEntry: "Lockfile has incorrect entry for $0. Ignoring it.",
        invalidResolutionName: "Resolution field $0 does not end with a valid package name and will be ignored",
        invalidResolutionVersion: "Resolution field $0 has an invalid version entry and may be ignored",
        incompatibleResolutionVersion: "Resolution field $0 is incompatible with requested version $1",
        yarnOutdated: "Your current version of Yarn is out of date. The latest version is $0, while you're on $1.",
        yarnOutdatedInstaller: "To upgrade, download the latest installer at $0.",
        yarnOutdatedCommand: "To upgrade, run the following command:",
        tooManyArguments: "Too many arguments, maximum of $0.",
        tooFewArguments: "Not enough arguments, expected at least $0.",
        noArguments: "This command doesn't require any arguments.",
        ownerRemoving: "Removing owner $0 from package $1.",
        ownerRemoved: "Owner removed.",
        ownerRemoveError: "Couldn't remove owner.",
        ownerGetting: "Getting owners for package $0",
        ownerGettingFailed: "Couldn't get list of owners.",
        ownerAlready: "This user is already an owner of this package.",
        ownerAdded: "Added owner.",
        ownerAdding: "Adding owner $0 to package $1",
        ownerAddingFailed: "Couldn't add owner.",
        ownerNone: "No owners.",
        teamCreating: "Creating team",
        teamRemoving: "Removing team",
        teamAddingUser: "Adding user to team",
        teamRemovingUser: "Removing user from team",
        teamListing: "Listing teams",
        cleaning: "Cleaning modules",
        cleanCreatingFile: "Creating $0",
        cleanCreatedFile: 'Created $0. Please review the contents of this file then run "yarn autoclean --force" to perform a clean.',
        cleanAlreadyExists: "$0 already exists. To revert to the default file, delete $0 then rerun this command.",
        cleanRequiresForce: 'This command required the "--force" flag to perform the clean. This is a destructive operation. Files specified in $0 will be deleted.',
        cleanDoesNotExist: '$0 does not exist. Autoclean will delete files specified by $0. Run "autoclean --init" to create $0 with the default entries.',
        binLinkCollision: "There's already a linked binary called $0 in your global Yarn bin. Could not link this package's $0 bin entry.",
        linkCollision: "There's already a package called $0 registered. This command has had no effect. If this command was run in another folder with the same name, the other folder is still linked. Please run yarn unlink in the other folder if you want to register this folder.",
        linkMissing: "No registered package found called $0.",
        linkRegistered: "Registered $0.",
        linkRegisteredMessage: "You can now run `yarn link $0` in the projects where you want to use this package and it will be used instead.",
        linkUnregistered: "Unregistered $0.",
        linkUnregisteredMessage: "You can now run `yarn unlink $0` in the projects where you no longer want to use this package.",
        linkUsing: "Using linked package for $0.",
        linkDisusing: "Removed linked package $0.",
        linkDisusingMessage: "You will need to run `yarn install --force` to re-install the package that was linked.",
        linkTargetMissing: "The target of linked package $0 is missing. Removing link.",
        createInvalidBin: "Invalid bin entry found in package $0.",
        createMissingPackage: "Package not found - this is probably an internal error, and should be reported at https://github.com/yarnpkg/yarn/issues.",
        workspacesAddRootCheck: "Running this command will add the dependency to the workspace root rather than the workspace itself, which might not be what you want - if you really meant it, make it explicit by running this command again with the -W flag (or --ignore-workspace-root-check).",
        workspacesRemoveRootCheck: "Running this command will remove the dependency from the workspace root rather than the workspace itself, which might not be what you want - if you really meant it, make it explicit by running this command again with the -W flag (or --ignore-workspace-root-check).",
        workspacesFocusRootCheck: "This command can only be run inside an individual workspace.",
        workspacesRequirePrivateProjects: "Workspaces can only be enabled in private projects.",
        workspacesSettingMustBeArray: "The workspaces field in package.json must be an array.",
        workspacesDisabled: 'Your project root defines workspaces but the feature is disabled in your Yarn config. Please check "workspaces-experimental" in your .yarnrc file.',
        workspacesNohoistRequirePrivatePackages: "nohoist config is ignored in $0 because it is not a private package. If you think nohoist should be allowed in public packages, please submit an issue for your use case.",
        workspacesNohoistDisabled: '$0 defines nohoist but the feature is disabled in your Yarn config ("workspaces-nohoist-experimental" in .yarnrc file)',
        workspaceRootNotFound: "Cannot find the root of your workspace - are you sure you're currently in a workspace?",
        workspaceMissingWorkspace: "Missing workspace name.",
        workspaceMissingCommand: "Missing command name.",
        workspaceUnknownWorkspace: "Unknown workspace $0.",
        workspaceVersionMandatory: "Missing version in workspace at $0, ignoring.",
        workspaceNameMandatory: "Missing name in workspace at $0, ignoring.",
        workspaceNameDuplicate: "There are more than one workspace with name $0",
        cacheFolderSkipped: "Skipping preferred cache folder $0 because it is not writable.",
        cacheFolderMissing: "Yarn hasn't been able to find a cache folder it can use. Please use the explicit --cache-folder option to tell it what location to use, or make one of the preferred locations writable.",
        cacheFolderSelected: "Selected the next writable cache folder in the list, will be $0.",
        execMissingCommand: "Missing command name.",
        noScriptsAvailable: "There are no scripts specified inside package.json.",
        noBinAvailable: "There are no binary scripts available.",
        dashDashDeprecation: 'From Yarn 1.0 onwards, scripts don\'t require "--" for options to be forwarded. In a future version, any explicit "--" will be forwarded as-is to the scripts.',
        commandNotSpecified: "No command specified.",
        binCommands: "Commands available from binary scripts: ",
        possibleCommands: "Project commands",
        commandQuestion: "Which command would you like to run?",
        commandFailedWithCode: "Command failed with exit code $0.",
        commandFailedWithSignal: "Command failed with signal $0.",
        packageRequiresNodeGyp: 'This package requires node-gyp, which is not currently installed. Yarn will attempt to automatically install it. If this fails, you can run "yarn global add node-gyp" to manually install it.',
        nodeGypAutoInstallFailed: 'Failed to auto-install node-gyp. Please run "yarn global add node-gyp" manually. Error: $0',
        foundIncompatible: "Found incompatible module.",
        incompatibleEngine: "The engine $0 is incompatible with this module. Expected version $1. Got $2",
        incompatibleCPU: "The CPU architecture $0 is incompatible with this module.",
        incompatibleOS: "The platform $0 is incompatible with this module.",
        invalidEngine: "The engine $0 appears to be invalid.",
        cannotRunWithIncompatibleEnv: "Commands cannot run with an incompatible environment.",
        optionalCompatibilityExcluded: "$0 is an optional dependency and failed compatibility check. Excluding it from installation.",
        optionalModuleFail: "This module is OPTIONAL, you can safely ignore this error",
        optionalModuleScriptFail: "Error running install script for optional dependency: $0",
        optionalModuleCleanupFail: "Could not cleanup build artifacts from failed install: $0",
        unmetPeer: "$0 has unmet peer dependency $1.",
        incorrectPeer: "$0 has incorrect peer dependency $1.",
        selectedPeer: "Selecting $1 at level $2 as the peer dependency of $0.",
        missingBundledDependency: "$0 is missing a bundled dependency $1. This should be reported to the package maintainer.",
        savedNewDependency: "Saved 1 new dependency.",
        savedNewDependencies: "Saved $0 new dependencies.",
        directDependencies: "Direct dependencies",
        allDependencies: "All dependencies",
        foundWarnings: "Found $0 warnings.",
        foundErrors: "Found $0 errors.",
        savedLockfile: "Saved lockfile.",
        noRequiredLockfile: "No lockfile in this directory. Run `yarn install` to generate one.",
        noLockfileFound: "No lockfile found.",
        invalidSemver: "Invalid semver version",
        newVersion: "New version",
        currentVersion: "Current version",
        noVersionOnPublish: "Proceeding with current version",
        manualVersionResolution: "Unable to find a suitable version for $0, please choose one by typing one of the numbers below:",
        manualVersionResolutionOption: "$0 which resolved to $1",
        createdTag: "Created tag.",
        createdTagFail: "Couldn't add tag.",
        deletedTag: "Deleted tag.",
        deletedTagFail: "Couldn't delete tag.",
        gettingTags: "Getting tags",
        deletingTags: "Deleting tag",
        creatingTag: "Creating tag $0 = $1",
        whyStart: "Why do we have the module $0?",
        whyFinding: "Finding dependency",
        whyCalculating: "Calculating file sizes",
        whyUnknownMatch: "We couldn't find a match!",
        whyInitGraph: "Initialising dependency graph",
        whyWhoKnows: "We don't know why this module exists",
        whyDiskSizeWithout: "Disk size without dependencies: $0",
        whyDiskSizeUnique: "Disk size with unique dependencies: $0",
        whyDiskSizeTransitive: "Disk size with transitive dependencies: $0",
        whySharedDependencies: "Number of shared dependencies: $0",
        whyHoistedTo: "Has been hoisted to $0",
        whyHoistedFromSimple: "This module exists because it's hoisted from $0.",
        whyNotHoistedSimple: "This module exists here because it's in the nohoist list $0.",
        whyDependedOnSimple: "This module exists because $0 depends on it.",
        whySpecifiedSimple: "This module exists because it's specified in $0.",
        whyReasons: "Reasons this module exists",
        whyHoistedFrom: "Hoisted from $0",
        whyNotHoisted: "in the nohoist list $0",
        whyDependedOn: "$0 depends on it",
        whySpecified: "Specified in $0",
        whyMatch: "\r=> Found $0",
        uninstalledPackages: "Uninstalled packages.",
        uninstallRegenerate: "Regenerating lockfile and installing missing dependencies",
        cleanRemovedFiles: "Removed $0 files",
        cleanSavedSize: "Saved $0 MB.",
        configFileFound: "Found configuration file $0.",
        configPossibleFile: "Checking for configuration file $0.",
        npmUsername: "npm username",
        npmPassword: "npm password",
        npmEmail: "npm email",
        npmOneTimePassword: "npm one-time password",
        loggingIn: "Logging in",
        loggedIn: "Logged in.",
        notRevokingEnvToken: "Not revoking login token, specified via environment variable.",
        notRevokingConfigToken: "Not revoking login token, specified via config file.",
        noTokenToRevoke: "No login token to revoke.",
        revokingToken: "Revoking token",
        revokedToken: "Revoked login token.",
        loginAsPublic: "Logging in as public",
        incorrectCredentials: "Incorrect username or password.",
        incorrectOneTimePassword: "Incorrect one-time password.",
        twoFactorAuthenticationEnabled: "Two factor authentication enabled.",
        clearedCredentials: "Cleared login credentials.",
        publishFail: "Couldn't publish package: $0",
        publishPrivate: "Package marked as private, not publishing.",
        published: "Published.",
        publishing: "Publishing",
        nonInteractiveNoVersionSpecified: "You must specify a new version with --new-version when running with --non-interactive.",
        nonInteractiveNoToken: "No token found and can't prompt for login when running with --non-interactive.",
        infoFail: "Received invalid response from npm.",
        malformedRegistryResponse: "Received malformed response from registry for $0. The registry may be down.",
        registryNoVersions: "No valid versions found for $0. The package may be unpublished.",
        cantRequestOffline: "Can't make a request in offline mode ($0)",
        requestManagerNotSetupHAR: "RequestManager was not setup to capture HAR files",
        requestError: "Request $0 returned a $1",
        requestFailed: "Request failed $0",
        tarballNotInNetworkOrCache: "$0: Tarball is not in network and can not be located in cache ($1)",
        fetchBadIntegrityCache: "Incorrect integrity when fetching from the cache for $0. Cache has $1 and remote has $2. Run `yarn cache clean` to fix the problem",
        fetchBadHashCache: "Incorrect hash when fetching from the cache for $0. Cache has $1 and remote has $2. Run `yarn cache clean` to fix the problem",
        fetchBadHashWithPath: "Integrity check failed for $0 (computed integrity doesn't match our records, got $2)",
        fetchBadIntegrityAlgorithm: "Integrity checked failed for $0 (none of the specified algorithms are supported)",
        fetchErrorCorrupt: "$0. Mirror tarball appears to be corrupt. You can resolve this by running:\n\n  rm -rf $1\n  yarn install",
        errorExtractingTarball: "Extracting tar content of $1 failed, the file appears to be corrupt: $0",
        updateInstalling: "Installing $0...",
        hostedGitResolveError: "Error connecting to repository. Please, check the url.",
        unauthorizedResponse: "Received a 401 from $0. $1",
        unknownFetcherFor: "Unknown fetcher for $0",
        downloadGitWithoutCommit: "Downloading the git repo $0 over plain git without a commit hash",
        downloadHTTPWithoutCommit: "Downloading the git repo $0 over HTTP without a commit hash",
        unplugDisabled: "Packages can only be unplugged when Plug'n'Play is enabled.",
        plugnplaySuggestV2L1: "Plug'n'Play support has been greatly improved on the Yarn v2 development branch.",
        plugnplaySuggestV2L2: "Please give it a try and tell us what you think! - https://next.yarnpkg.com/getting-started/install",
        plugnplayWindowsSupport: "Plug'n'Play on Windows doesn't support the cache and project to be kept on separate drives",
        packageInstalledWithBinaries: "Installed $0 with binaries:",
        packageHasBinaries: "$0 has binaries:",
        packageHasNoBinaries: "$0 has no binaries",
        packageBinaryNotFound: "Couldn't find a binary named $0",
        couldBeDeduped: "$0 could be deduped from $1 to $2",
        lockfileNotContainPattern: "Lockfile does not contain pattern: $0",
        integrityCheckFailed: "Integrity check failed",
        noIntegrityFile: "Couldn't find an integrity file",
        integrityFailedExpectedIsNotAJSON: "Integrity check: integrity file is not a json",
        integrityCheckLinkedModulesDontMatch: "Integrity check: Linked modules don't match",
        integrityFlagsDontMatch: "Integrity check: Flags don't match",
        integrityLockfilesDontMatch: "Integrity check: Lock files don't match",
        integrityFailedFilesMissing: "Integrity check: Files are missing",
        integrityPatternsDontMatch: "Integrity check: Top level patterns don't match",
        integrityModulesFoldersMissing: "Integrity check: Some module folders are missing",
        integritySystemParamsDontMatch: "Integrity check: System parameters don't match",
        packageNotInstalled: "$0 not installed",
        optionalDepNotInstalled: "Optional dependency $0 not installed",
        packageWrongVersion: "$0 is wrong version: expected $1, got $2",
        packageDontSatisfy: "$0 doesn't satisfy found match of $1",
        lockfileExists: "Lockfile already exists, not importing.",
        skippingImport: "Skipping import of $0 for $1",
        importFailed: "Import of $0 for $1 failed, resolving normally.",
        importResolveFailed: "Import of $0 failed starting in $1",
        importResolvedRangeMatch: "Using version $0 of $1 instead of $2 for $3",
        importSourceFilesCorrupted: "Failed to import from package-lock.json, source file(s) corrupted",
        importPackageLock: "found npm package-lock.json, converting to yarn.lock",
        importNodeModules: "creating yarn.lock from local node_modules folder",
        packageContainsYarnAsGlobal: "Installing Yarn via Yarn will result in you having two separate versions of Yarn installed at the same time, which is not recommended. To update Yarn please follow https://yarnpkg.com/en/docs/install .",
        scopeNotValid: "The specified scope is not valid.",
        deprecatedCommand: "$0 is deprecated. Please use $1.",
        deprecatedListArgs: "Filtering by arguments is deprecated. Please use the pattern option instead.",
        implicitFileDeprecated: 'Using the "file:" protocol implicitly is deprecated. Please either prepend the protocol or prepend the path $0 with "./".',
        unsupportedNodeVersion: "You are using Node $0 which is not supported and may encounter bugs or unexpected behavior. Yarn supports the following semver range: $1",
        verboseUpgradeBecauseRequested: "Considering upgrade of $0 to $1 because it was directly requested.",
        verboseUpgradeBecauseOutdated: "Considering upgrade of $0 to $1 because a newer version exists in the registry.",
        verboseUpgradeNotUnlocking: "Not unlocking $0 in the lockfile because it is a new or direct dependency.",
        verboseUpgradeUnlocking: "Unlocking $0 in the lockfile.",
        folderMissing: "Directory $0 doesn't exist",
        mutexPortBusy: "Cannot use the network mutex on port $0. It is probably used by another app.",
        auditRunning: "Auditing packages",
        auditSummary: "$0 vulnerabilities found - Packages audited: $1",
        auditSummarySeverity: "Severity:",
        auditCritical: "$0 Critical",
        auditHigh: "$0 High",
        auditModerate: "$0 Moderate",
        auditLow: "$0 Low",
        auditInfo: "$0 Info",
        auditResolveCommand: "# Run $0 to resolve $1 $2",
        auditSemverMajorChange: "SEMVER WARNING: Recommended action is a potentially breaking change",
        auditManualReview: "Manual Review\nSome vulnerabilities require your attention to resolve\n\nVisit https://go.npm.me/audit-guide for additional guidance",
        auditRunAuditForDetails: 'Security audit found potential problems. Run "yarn audit" for additional details.',
        auditOffline: "Skipping audit. Security audit cannot be performed in offline mode."
      }, isCI = __webpack_require__(81876), os = __webpack_require__(22037), util = __webpack_require__(73837), EventEmitter = __webpack_require__(82361).EventEmitter;
      class BaseReporter {
        constructor(opts) {
          void 0 === opts && (opts = {});
          this.language = "en", this.stdout = opts.stdout || process.stdout, this.stderr = opts.stderr || process.stderr, 
          this.stdin = opts.stdin || this._getStandardInput(), this.emoji = !!opts.emoji, 
          this.nonInteractive = !!opts.nonInteractive, this.noProgress = !!opts.noProgress || isCI, 
          this.isVerbose = !!opts.verbose, this.isTTY = this.stdout.isTTY, this.peakMemory = 0, 
          this.startTime = Date.now(), this.format = defaultFormatter;
        }
        lang(key) {
          var msg = lang_namespaceObject[this.language][key] || en[key];
          if (!msg) throw new ReferenceError(`No message defined for language key ${key}`);
          var stringifiedArgs = function(args) {
            return args.map((function(val) {
              if (null != val && val.inspect) return val.inspect();
              try {
                return (JSON.stringify(val) || val + "").replace(/((?:^|[^\\])(?:\\{2})*)\\u001[bB]/g, "$1").replace(/[\\]r[\\]n|([\\])?[\\]n/g, ((match, precededBacklash) => precededBacklash ? match : os.EOL));
              } catch (e) {
                return util.inspect(val);
              }
            }));
          }(Array.prototype.slice.call(arguments, 1));
          return msg.replace(/\$(\d+)/g, ((str, i) => stringifiedArgs[i]));
        }
        rawText(str) {
          return {
            inspect: () => str
          };
        }
        verbose(msg) {
          this.isVerbose && this._verbose(msg);
        }
        verboseInspect(val) {
          this.isVerbose && this._verboseInspect(val);
        }
        _verbose(msg) {}
        _verboseInspect(val) {}
        _getStandardInput() {
          var standardInput;
          try {
            standardInput = process.stdin;
          } catch (e) {
            console.warn(e.message), delete process.stdin, process.stdin = new EventEmitter, 
            standardInput = process.stdin;
          }
          return standardInput;
        }
        initPeakMemoryCounter() {
          this.checkPeakMemory(), this.peakMemoryInterval = setInterval((() => {
            this.checkPeakMemory();
          }), 1e3), this.peakMemoryInterval.unref();
        }
        checkPeakMemory() {
          var heapTotal = process.memoryUsage().heapTotal;
          heapTotal > this.peakMemory && (this.peakMemory = heapTotal);
        }
        close() {
          this.peakMemoryInterval && (clearInterval(this.peakMemoryInterval), this.peakMemoryInterval = null);
        }
        getTotalTime() {
          return Date.now() - this.startTime;
        }
        list(key, items, hints) {}
        tree(key, obj, _temp) {
          (void 0 === _temp ? {} : _temp).force;
        }
        step(current, total, message, emoji) {}
        error(message) {}
        info(message) {}
        warn(message) {}
        success(message) {}
        log(message, _temp2) {
          (void 0 === _temp2 ? {} : _temp2).force;
        }
        command(command) {}
        inspect(value) {}
        header(command, pkg) {}
        footer(showPeakMemory) {}
        table(head, body) {}
        auditAction(recommendation) {}
        auditManualReview() {}
        auditAdvisory(resolution, auditAdvisory) {}
        auditSummary(auditMetadata) {}
        activity() {
          return {
            tick(name) {},
            end() {}
          };
        }
        activitySet(total, workers) {
          return {
            spinners: Array(workers).fill({
              clear() {},
              setPrefix() {},
              tick() {},
              end() {}
            }),
            end() {}
          };
        }
        question(question, options) {
          return void 0 === options && (options = {}), Promise.reject(new Error("Not implemented"));
        }
        questionAffirm(question) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (_this.nonInteractive) return !0;
            for (;;) {
              var answer = yield _this.question(question);
              if ("y" === (answer = answer.toLowerCase()) || "yes" === answer) return !0;
              if ("n" === answer || "no" === answer) return !1;
              _this.error("Invalid answer for question");
            }
            return !1;
          }))();
        }
        select(header, question, options) {
          return Promise.reject(new Error("Not implemented"));
        }
        progress(total) {
          return function() {};
        }
        disableProgress() {
          this.noProgress = !0;
        }
        prompt(message, choices, options) {
          return void 0 === options && (options = {}), Promise.reject(new Error("Not implemented"));
        }
      }
      var tty = __webpack_require__(76224), readline = __webpack_require__(14521), supportsColor = __webpack_require__(48075).supportsColor;
      function clearLine(stdout) {
        supportsColor ? (readline.clearLine(stdout, 0), readline.cursorTo(stdout, 0)) : stdout instanceof tty.WriteStream && (stdout.columns > 0 && stdout.write(`\r${" ".repeat(stdout.columns - 1)}`), 
        stdout.write("\r"));
      }
      class ProgressBar {
        constructor(total, stdout, callback) {
          void 0 === stdout && (stdout = process.stderr), this.stdout = stdout, this.total = total, 
          this.chars = ProgressBar.bars[0], this.delay = 60, this.curr = 0, this._callback = callback, 
          clearLine(stdout);
        }
        tick() {
          this.curr >= this.total || (this.curr++, this.id || (this.id = setTimeout((() => this.render()), this.delay)));
        }
        cancelTick() {
          this.id && (clearTimeout(this.id), this.id = null);
        }
        stop() {
          this.curr = this.total, this.cancelTick(), clearLine(this.stdout), this._callback && this._callback(this);
        }
        render() {
          this.cancelTick();
          var ratio = this.curr / this.total;
          ratio = Math.min(Math.max(ratio, 0), 1);
          var stdout, bar = ` ${this.curr}/${this.total}`, availableSpace = Math.max(0, this.stdout.columns - bar.length - 3), width = Math.min(this.total, availableSpace), completeLength = Math.round(width * ratio);
          bar = `[${this.chars[0].repeat(completeLength)}${this.chars[1].repeat(width - completeLength)}]${bar}`, 
          stdout = this.stdout, supportsColor ? readline.cursorTo(stdout, 0) : stdout.write("\r"), 
          this.stdout.write(bar);
        }
      }
      ProgressBar.bars = [ [ "#", "-" ] ];
      class Spinner {
        constructor(stdout, lineNumber) {
          void 0 === stdout && (stdout = process.stderr), void 0 === lineNumber && (lineNumber = 0), 
          this.current = 0, this.prefix = "", this.lineNumber = lineNumber, this.stdout = stdout, 
          this.delay = 60, this.chars = Spinner.spinners[28].split(""), this.text = "", this.id = null;
        }
        setPrefix(prefix) {
          this.prefix = prefix;
        }
        setText(text) {
          this.text = text;
        }
        start() {
          this.current = 0, this.render();
        }
        render() {
          this.id && clearTimeout(this.id);
          var msg = `${this.prefix}${this.chars[this.current]} ${this.text}`, columns = "number" == typeof this.stdout.columns ? this.stdout.columns : 100;
          msg = msg.slice(0, columns), function(stdout, n, msg) {
            if (supportsColor) {
              if (0 == n) return readline.cursorTo(stdout, 0), stdout.write(msg), void readline.clearLine(stdout, 1);
              readline.cursorTo(stdout, 0), readline.moveCursor(stdout, 0, -n), stdout.write(msg), 
              readline.clearLine(stdout, 1), readline.cursorTo(stdout, 0), readline.moveCursor(stdout, 0, n);
            }
          }(this.stdout, this.lineNumber, msg), this.current = ++this.current % this.chars.length, 
          this.id = setTimeout((() => this.render()), this.delay);
        }
        stop() {
          var stdout, n;
          this.id && (clearTimeout(this.id), this.id = null), stdout = this.stdout, n = this.lineNumber, 
          supportsColor && (0 != n ? (readline.cursorTo(stdout, 0), readline.moveCursor(stdout, 0, -n), 
          readline.clearLine(stdout, 0), readline.moveCursor(stdout, 0, n)) : clearLine(stdout));
        }
      }
      Spinner.spinners = [ "|/-\\", "⠂-–—–-", "◐◓◑◒", "◴◷◶◵", "◰◳◲◱", "▖▘▝▗", "■□▪▫", "▌▀▐▄", "▉▊▋▌▍▎▏▎▍▌▋▊▉", "▁▃▄▅▆▇█▇▆▅▄▃", "←↖↑↗→↘↓↙", "┤┘┴└├┌┬┐", "◢◣◤◥", ".oO°Oo.", ".oO@*", "🌍🌎🌏", "◡◡ ⊙⊙ ◠◠", "☱☲☴", "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏", "⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓", "⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆", "⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋", "⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁", "⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈", "⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈", "⢄⢂⢁⡁⡈⡐⡠", "⢹⢺⢼⣸⣇⡧⡗⡏", "⣾⣽⣻⢿⡿⣟⣯⣷", "⠁⠂⠄⡀⢀⠠⠐⠈" ];
      var _camelCase = __webpack_require__(51067);
      function sortAlpha(a, b) {
        for (var shortLen = Math.min(a.length, b.length), i = 0; i < shortLen; i++) {
          var aChar = a.charCodeAt(i), bChar = b.charCodeAt(i);
          if (aChar !== bChar) return aChar - bChar;
        }
        return a.length - b.length;
      }
      function sortOptionsByFlags(a, b) {
        return sortAlpha(a.flags.replace(/-/g, ""), b.flags.replace(/-/g, ""));
      }
      function entries(obj) {
        var entries = [];
        if (obj) for (var _key in obj) entries.push([ _key, obj[_key] ]);
        return entries;
      }
      function removePrefix(pattern, prefix) {
        return pattern.startsWith(prefix) && (pattern = pattern.slice(prefix.length)), pattern;
      }
      function removeSuffix(pattern, suffix) {
        return pattern.endsWith(suffix) ? pattern.slice(0, -suffix.length) : pattern;
      }
      function addSuffix(pattern, suffix) {
        return pattern.endsWith(suffix) ? pattern : pattern + suffix;
      }
      function hyphenate(str) {
        return str.replace(/[A-Z]/g, (match => "-" + match.charAt(0).toLowerCase()));
      }
      function camelCase(str) {
        return /[A-Z]/.test(str) ? null : _camelCase(str);
      }
      function compareSortedArrays(array1, array2) {
        if (array1.length !== array2.length) return !1;
        for (var i = 0, len = array1.length; i < len; i++) if (array1[i] !== array2[i]) return !1;
        return !0;
      }
      function sortTrees(trees) {
        return trees.sort((function(tree1, tree2) {
          return tree1.name.localeCompare(tree2.name);
        }));
      }
      function recurseTree(tree, prefix, recurseFunc) {
        for (var treeLen = tree.length, treeEnd = treeLen - 1, i = 0; i < treeLen; i++) {
          var atEnd = i === treeEnd;
          recurseFunc(tree[i], prefix + (atEnd ? "└" : "├"), prefix + getNextIndentChar(atEnd));
        }
      }
      function getNextIndentChar(end) {
        return end ? "   " : "│  ";
      }
      var inquirer = __webpack_require__(73446), Table = __webpack_require__(99228), inspect = __webpack_require__(73837).inspect, console_reporter_readline = __webpack_require__(14521), chalk = __webpack_require__(48075), stripAnsi = __webpack_require__(76003), read = __webpack_require__(8753), console_reporter_tty = __webpack_require__(76224), AUDIT_COL_WIDTHS = [ 15, 62 ], auditSeverityColors = {
        info: chalk.bold,
        low: chalk.bold,
        moderate: chalk.yellow,
        high: chalk.red,
        critical: chalk.bgRed
      };
      "win32" !== process.platform || process.env.TERM && /^xterm/i.test(process.env.TERM) || (chalk.bold._styles[0].close += "[m");
      class ConsoleReporter extends BaseReporter {
        constructor(opts) {
          super(opts), this._lastCategorySize = 0, this._spinners = new Set, this.format = chalk, 
          this.format.stripColor = stripAnsi, this.isSilent = !!opts.isSilent;
        }
        _prependEmoji(msg, emoji) {
          return this.emoji && emoji && this.isTTY && (msg = `${emoji}  ${msg}`), msg;
        }
        _logCategory(category, color, msg) {
          this._lastCategorySize = category.length, this._log(`${this.format[color](category)} ${msg}`);
        }
        _verbose(msg) {
          this._logCategory("verbose", "grey", `${process.uptime()} ${msg}`);
        }
        _verboseInspect(obj) {
          this.inspect(obj);
        }
        close() {
          for (var spinner of this._spinners) spinner.stop();
          this._spinners.clear(), this.stopProgress(), super.close();
        }
        table(head, body) {
          for (var _this = this, rows = [ head = head.map((field => this.format.underline(field))) ].concat(body), cols = [], _loop = function(i) {
            var widths = rows.map((row => _this.format.stripColor(row[i]).length));
            cols[i] = Math.max.apply(Math, widths);
          }, i = 0; i < head.length; i++) _loop(i);
          var builtRows = rows.map((row => {
            for (var _i = 0; _i < row.length; _i++) {
              var field = row[_i], padding = cols[_i] - this.format.stripColor(field).length;
              row[_i] = field + " ".repeat(padding);
            }
            return row.join(" ");
          }));
          this.log(builtRows.join("\n"));
        }
        step(current, total, msg, emoji) {
          (msg = this._prependEmoji(msg, emoji)).endsWith("?") ? msg = `${removeSuffix(msg, "?")}...?` : msg += "...", 
          this.log(`${this.format.dim(`[${current}/${total}]`)} ${msg}`);
        }
        inspect(value) {
          "number" != typeof value && "string" != typeof value && (value = inspect(value, {
            breakLength: 0,
            colors: this.isTTY,
            depth: null,
            maxArrayLength: null
          })), this.log(String(value), {
            force: !0
          });
        }
        list(key, items, hints) {
          var gutterWidth = (this._lastCategorySize || 2) - 1;
          if (hints) for (var item of items) this._log(`${" ".repeat(gutterWidth)}- ${this.format.bold(item)}`), 
          this._log(`  ${" ".repeat(gutterWidth)} ${hints[item]}`); else for (var _item of items) this._log(`${" ".repeat(gutterWidth)}- ${_item}`);
        }
        header(command, pkg) {
          this.log(this.format.bold(`${pkg.name} ${command} v${pkg.version}`));
        }
        footer(showPeakMemory) {
          this.stopProgress();
          var msg = `Done in ${(this.getTotalTime() / 1e3).toFixed(2)}s.`;
          showPeakMemory && (msg += ` Peak memory usage ${(this.peakMemory / 1024 / 1024).toFixed(2)}MB.`);
          this.log(this._prependEmoji(msg, "✨"));
        }
        log(msg, _temp) {
          var _ref$force = (void 0 === _temp ? {} : _temp).force, force = void 0 !== _ref$force && _ref$force;
          this._lastCategorySize = 0, this._log(msg, {
            force: force
          });
        }
        _log(msg, _temp2) {
          var _ref2$force = (void 0 === _temp2 ? {} : _temp2).force, force = void 0 !== _ref2$force && _ref2$force;
          this.isSilent && !force || (clearLine(this.stdout), this.stdout.write(`${msg}\n`));
        }
        success(msg) {
          this._logCategory("success", "green", msg);
        }
        error(msg) {
          clearLine(this.stderr), this.stderr.write(`${this.format.red("error")} ${msg}\n`);
        }
        info(msg) {
          this._logCategory("info", "blue", msg);
        }
        command(command) {
          this.log(this.format.dim(`$ ${command}`));
        }
        warn(msg) {
          clearLine(this.stderr), this.stderr.write(`${this.format.yellow("warning")} ${msg}\n`);
        }
        question(question, options) {
          return void 0 === options && (options = {}), process.stdout.isTTY ? new Promise(((resolve, reject) => {
            read({
              prompt: `${this.format.dim("question")} ${question}: `,
              silent: !!options.password,
              output: this.stdout,
              input: this.stdin
            }, ((err, answer) => {
              err ? ("canceled" === err.message && (process.exitCode = 1), reject(err)) : !answer && options.required ? (this.error(this.lang("answerRequired")), 
              resolve(this.question(question, options))) : resolve(answer);
            }));
          })) : Promise.reject(new Error("Can't answer a question unless a user TTY"));
        }
        tree(key, trees, _temp3) {
          var _ref3$force = (void 0 === _temp3 ? {} : _temp3).force, force = void 0 !== _ref3$force && _ref3$force;
          if (this.stopProgress(), !this.isSilent || force) {
            var output = (_ref4, titlePrefix, childrenPrefix) => {
              var name = _ref4.name, children = _ref4.children, out = function(fmt) {
                var color, strToFormat, formatter, item = (color = fmt.color, strToFormat = fmt.name, 
                formatter = fmt.formatter, color ? formatter[color](strToFormat) : strToFormat), suffix = function(hint, formatter) {
                  return hint ? ` (${formatter.grey(hint)})` : "";
                }(fmt.hint, fmt.formatter);
                return `${fmt.prefix}─ ${item}${suffix}\n`;
              }({
                prefix: titlePrefix,
                hint: _ref4.hint,
                color: _ref4.color,
                name: name,
                formatter: this.format
              });
              this.stdout.write(out), children && children.length && recurseTree(sortTrees(children), childrenPrefix, output);
            };
            recurseTree(sortTrees(trees), "", output);
          }
        }
        activitySet(total, workers) {
          var _this2 = this;
          if (!this.isTTY || this.noProgress) return super.activitySet(total, workers);
          for (var spinners = [], reporterSpinners = this._spinners, i = 1; i < workers; i++) this.log("");
          for (var _loop2 = function(_i2) {
            var spinner = new Spinner(_this2.stderr, _i2);
            reporterSpinners.add(spinner), spinner.start();
            var prefix = null, current = 0, updatePrefix = () => {
              spinner.setPrefix(`${_this2.format.dim(`[${0 === current ? "-" : current}/${total}]`)} `);
            }, clear = () => {
              prefix = null, current = 0, updatePrefix(), spinner.setText("waiting...");
            };
            clear(), spinners.unshift({
              clear: clear,
              setPrefix(_current, _prefix) {
                current = _current, prefix = _prefix, spinner.setText(prefix), updatePrefix();
              },
              tick(msg) {
                prefix && (msg = `${prefix}: ${msg}`), spinner.setText(msg);
              },
              end() {
                spinner.stop(), reporterSpinners.delete(spinner);
              }
            });
          }, _i2 = 0; _i2 < workers; _i2++) _loop2(_i2);
          return {
            spinners: spinners,
            end: () => {
              for (var spinner of spinners) spinner.end();
              console_reporter_readline.moveCursor(this.stdout, 0, 1 - workers);
            }
          };
        }
        activity() {
          if (!this.isTTY) return {
            tick() {},
            end() {}
          };
          var reporterSpinners = this._spinners, spinner = new Spinner(this.stderr);
          return spinner.start(), reporterSpinners.add(spinner), {
            tick(name) {
              spinner.setText(name);
            },
            end() {
              spinner.stop(), reporterSpinners.delete(spinner);
            }
          };
        }
        select(header, question, options) {
          if (!this.isTTY) return Promise.reject(new Error("Can't answer a question unless a user TTY"));
          var rl = console_reporter_readline.createInterface({
            input: this.stdin,
            output: this.stdout,
            terminal: !0
          }), questions = options.map((opt => opt.name)), answers = options.map((opt => opt.value));
          return new Promise((resolve => {
            this.info(header);
            for (var i = 0; i < questions.length; i++) this.log(`  ${this.format.dim(`${i + 1})`)} ${questions[i]}`);
            var ask = () => {
              rl.question(`${question}: `, (input => {
                var index = function(input) {
                  var index = answers.indexOf(input);
                  return index >= 0 ? index : +input;
                }(input);
                return isNaN(index) ? (this.log("Not a number"), void ask()) : index <= 0 || index > options.length ? (this.log("Outside answer range"), 
                void ask()) : (index--, rl.close(), void resolve(answers[index]));
              }));
            };
            ask();
          }));
        }
        progress(count) {
          if (this.noProgress || count <= 0) return function() {};
          if (!this.isTTY) return function() {};
          this.stopProgress();
          var bar = this._progressBar = new ProgressBar(count, this.stderr, (progress => {
            progress === this._progressBar && (this._progressBar = null);
          }));
          return bar.render(), function() {
            bar.tick();
          };
        }
        stopProgress() {
          this._progressBar && this._progressBar.stop();
        }
        prompt(message, choices, options) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (void 0 === options && (options = {}), !process.stdout.isTTY) return Promise.reject(new Error("Can't answer a question unless a user TTY"));
            var pageSize;
            process.stdout instanceof console_reporter_tty.WriteStream && (pageSize = process.stdout.rows - 2);
            var rl = console_reporter_readline.createInterface({
              input: _this3.stdin,
              output: _this3.stdout,
              terminal: !0
            }), prompt = inquirer.createPromptModule({
              input: _this3.stdin,
              output: _this3.stdout
            }), _options = options, _options$name = _options.name, name = void 0 === _options$name ? "prompt" : _options$name, _options$type = _options.type, type = void 0 === _options$type ? "input" : _options$type, validate = _options.validate, answers = yield prompt([ {
              name: name,
              type: type,
              message: message,
              choices: choices,
              pageSize: pageSize,
              validate: validate
            } ]);
            return rl.close(), answers[name];
          }))();
        }
        auditSummary(auditMetadata) {
          var totalDependencies = auditMetadata.totalDependencies, vulnerabilities = auditMetadata.vulnerabilities, totalVulnerabilities = vulnerabilities.info + vulnerabilities.low + vulnerabilities.moderate + vulnerabilities.high + vulnerabilities.critical, summary = this.lang("auditSummary", totalVulnerabilities > 0 ? this.rawText(chalk.red(totalVulnerabilities.toString())) : totalVulnerabilities, totalDependencies);
          if (this._log(summary), totalVulnerabilities) {
            var severities = [];
            vulnerabilities.info && severities.push(this.lang("auditInfo", vulnerabilities.info)), 
            vulnerabilities.low && severities.push(this.lang("auditLow", vulnerabilities.low)), 
            vulnerabilities.moderate && severities.push(this.lang("auditModerate", vulnerabilities.moderate)), 
            vulnerabilities.high && severities.push(this.lang("auditHigh", vulnerabilities.high)), 
            vulnerabilities.critical && severities.push(this.lang("auditCritical", vulnerabilities.critical)), 
            this._log(`${this.lang("auditSummarySeverity")} ${severities.join(" | ")}`);
          }
        }
        auditAction(recommendation) {
          var label = 1 === recommendation.action.resolves.length ? "vulnerability" : "vulnerabilities";
          this._log(this.lang("auditResolveCommand", this.rawText(chalk.inverse(recommendation.cmd)), recommendation.action.resolves.length, this.rawText(label))), 
          recommendation.isBreaking && this._log(this.lang("auditSemverMajorChange"));
        }
        auditManualReview() {
          var table = new Table({
            colWidths: [ 78 ]
          });
          table.push([ {
            content: this.lang("auditManualReview"),
            vAlign: "center",
            hAlign: "center"
          } ]), this._log(table.toString());
        }
        auditAdvisory(resolution, auditAdvisory) {
          var table = new Table({
            colWidths: AUDIT_COL_WIDTHS,
            wordWrap: !0
          }), patchedIn = "<0.0.0" === auditAdvisory.patched_versions.replace(" ", "") ? "No patch available" : auditAdvisory.patched_versions;
          table.push.apply(table, function(patchedIn) {
            var severity, message, patchRows = [];
            return patchedIn && patchRows.push({
              "Patched in": patchedIn
            }), [ {
              [chalk.bold((severity = auditAdvisory.severity, auditSeverityColors[severity](message || severity)))]: chalk.bold(auditAdvisory.title)
            }, {
              Package: auditAdvisory.module_name
            } ].concat(patchRows, [ {
              "Dependency of": `${resolution.path.split(">")[0]} ${resolution.dev ? "[dev]" : ""}`
            }, {
              Path: resolution.path.split(">").join(" > ")
            }, {
              "More info": `https://www.npmjs.com/advisories/${auditAdvisory.id}`
            } ]);
          }(patchedIn)), this._log(table.toString());
        }
      }
      class json_reporter_JSONReporter extends BaseReporter {
        constructor(opts) {
          super(opts), this._activityId = 0, this._progressId = 0;
        }
        _dump(type, data, error) {
          var stdout = this.stdout;
          error && (stdout = this.stderr), stdout.write(`${JSON.stringify({
            type: type,
            data: data
          })}\n`);
        }
        _verbose(msg) {
          this._dump("verbose", msg);
        }
        list(type, items, hints) {
          this._dump("list", {
            type: type,
            items: items,
            hints: hints
          });
        }
        tree(type, trees) {
          this._dump("tree", {
            type: type,
            trees: trees
          });
        }
        step(current, total, message) {
          this._dump("step", {
            message: message,
            current: current,
            total: total
          });
        }
        inspect(value) {
          this._dump("inspect", value);
        }
        footer(showPeakMemory) {
          this._dump("finished", this.getTotalTime());
        }
        log(msg) {
          this._dump("log", msg);
        }
        command(msg) {
          this._dump("command", msg);
        }
        table(head, body) {
          this._dump("table", {
            head: head,
            body: body
          });
        }
        success(msg) {
          this._dump("success", msg);
        }
        error(msg) {
          this._dump("error", msg, !0);
        }
        warn(msg) {
          this._dump("warning", msg, !0);
        }
        info(msg) {
          this._dump("info", msg);
        }
        activitySet(total, workers) {
          var _this = this;
          if (!this.isTTY || this.noProgress) return super.activitySet(total, workers);
          var id = this._activityId++;
          this._dump("activitySetStart", {
            id: id,
            total: total,
            workers: workers
          });
          for (var spinners = [], _loop = function(i) {
            var current = 0, header = "";
            spinners.push({
              clear() {},
              setPrefix(_current, _header) {
                current = _current, header = _header;
              },
              tick: msg => {
                _this._dump("activitySetTick", {
                  id: id,
                  header: header,
                  current: current,
                  worker: i,
                  message: msg
                });
              },
              end() {}
            });
          }, i = 0; i < workers; i++) _loop(i);
          return {
            spinners: spinners,
            end: () => {
              this._dump("activitySetEnd", {
                id: id
              });
            }
          };
        }
        activity() {
          return this._activity({});
        }
        _activity(data) {
          if (!this.isTTY || this.noProgress) return {
            tick() {},
            end() {}
          };
          var id = this._activityId++;
          return this._dump("activityStart", _extends({
            id: id
          }, data)), {
            tick: name => {
              this._dump("activityTick", {
                id: id,
                name: name
              });
            },
            end: () => {
              this._dump("activityEnd", {
                id: id
              });
            }
          };
        }
        progress(total) {
          if (this.noProgress) return function() {};
          var id = this._progressId++, current = 0;
          return this._dump("progressStart", {
            id: id,
            total: total
          }), () => {
            current++, this._dump("progressTick", {
              id: id,
              current: current
            }), current === total && this._dump("progressFinish", {
              id: id
            });
          };
        }
        auditAction(recommendation) {
          this._dump("auditAction", recommendation);
        }
        auditAdvisory(resolution, auditAdvisory) {
          this._dump("auditAdvisory", {
            resolution: resolution,
            advisory: auditAdvisory
          });
        }
        auditSummary(auditMetadata) {
          this._dump("auditSummary", auditMetadata);
        }
      }
      var event_reporter_EventEmitter = __webpack_require__(82361).EventEmitter;
      Object.assign(class extends json_reporter_JSONReporter {
        constructor(opts) {
          super(opts), event_reporter_EventEmitter.call(this);
        }
        _dump(type, data) {
          this.emit(type, data);
        }
      }.prototype, event_reporter_EventEmitter.prototype);
      class NoopReporter extends BaseReporter {
        lang(key) {
          return "do nothing";
        }
        verbose(msg) {}
        verboseInspect(val) {}
        initPeakMemoryCounter() {}
        checkPeakMemory() {}
        close() {}
        getTotalTime() {
          return 0;
        }
        list(key, items, hints) {}
        tree(key, obj) {}
        step(current, total, message, emoji) {}
        error(message) {}
        info(message) {}
        warn(message) {}
        success(message) {}
        log(message) {}
        command(command) {}
        inspect(value) {}
        header(command, pkg) {}
        footer(showPeakMemory) {}
        table(head, body) {}
        activity() {
          return {
            tick(name) {},
            end() {}
          };
        }
        activitySet(total, workers) {
          return {
            spinners: Array(workers).fill({
              clear() {},
              setPrefix() {},
              tick() {},
              end() {}
            }),
            end() {}
          };
        }
        question(question, options) {
          return void 0 === options && (options = {}), Promise.reject(new Error("Not implemented"));
        }
        questionAffirm(question) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return yield _this.question(question), !1;
          }))();
        }
        select(header, question, options) {
          return Promise.reject(new Error("Not implemented"));
        }
        progress(total) {
          return function() {};
        }
        disableProgress() {
          this.noProgress = !0;
        }
        prompt(message, choices, options) {
          return void 0 === options && (options = {}), Promise.reject(new Error("Not implemented"));
        }
      }
      var root_user = function(uid) {
        return 0 === uid;
      }("win32" !== process.platform && process.getuid ? process.getuid() : null) && !Boolean(process.env.FAKEROOTKEY);
      var path = __webpack_require__(71017), home = __webpack_require__(22037).homedir(), user_home_dir = root_user ? path.resolve("/usr/local/share") : home, user_dirs_path = __webpack_require__(71017), FALLBACK_CONFIG_DIR = user_dirs_path.join(user_home_dir, ".config", "yarn"), FALLBACK_CACHE_DIR = user_dirs_path.join(user_home_dir, ".cache", "yarn");
      function getLocalAppDataDir() {
        return process.env.LOCALAPPDATA ? user_dirs_path.join(process.env.LOCALAPPDATA, "Yarn") : null;
      }
      var constants_os = __webpack_require__(22037), constants_path = __webpack_require__(71017), isWebpackBundle = __webpack_require__(28494), DEPENDENCY_TYPES = [ "devDependencies", "dependencies", "optionalDependencies", "peerDependencies" ], OWNED_DEPENDENCY_TYPES = [ "devDependencies", "dependencies", "optionalDependencies" ], MANIFEST_FIELDS = [ "resolutions" ].concat(DEPENDENCY_TYPES), YARN_REGISTRY = "https://registry.yarnpkg.com", NPM_REGISTRY_RE = /https?:\/\/registry\.npmjs\.org/g, YARN_DOCS = "https://yarnpkg.com/en/docs/cli/", REQUIRED_PACKAGE_KEYS = [ "name", "version", "_uid" ];
      var preferredCacheDirectories, PREFERRED_MODULE_CACHE_DIRECTORIES = (preferredCacheDirectories = [ "win32" === process.platform ? user_dirs_path.join(getLocalAppDataDir() || user_dirs_path.join(user_home_dir, "AppData", "Local", "Yarn"), "Cache") : process.env.XDG_CACHE_HOME ? user_dirs_path.join(process.env.XDG_CACHE_HOME, "yarn") : "darwin" === process.platform ? user_dirs_path.join(user_home_dir, "Library", "Caches", "Yarn") : FALLBACK_CACHE_DIR ], 
      process.getuid && preferredCacheDirectories.push(constants_path.join(constants_os.tmpdir(), `.yarn-cache-${process.getuid()}`)), 
      preferredCacheDirectories.push(constants_path.join(constants_os.tmpdir(), ".yarn-cache")), 
      preferredCacheDirectories), CONFIG_DIRECTORY = function() {
        if ("win32" === process.platform) {
          var WIN32_APPDATA_DIR = getLocalAppDataDir();
          return null == WIN32_APPDATA_DIR ? FALLBACK_CONFIG_DIR : user_dirs_path.join(WIN32_APPDATA_DIR, "Config");
        }
        return process.env.XDG_CONFIG_HOME ? user_dirs_path.join(process.env.XDG_CONFIG_HOME, "yarn") : FALLBACK_CONFIG_DIR;
      }(), DATA_DIRECTORY = function() {
        if ("win32" === process.platform) {
          var WIN32_APPDATA_DIR = getLocalAppDataDir();
          return null == WIN32_APPDATA_DIR ? FALLBACK_CONFIG_DIR : user_dirs_path.join(WIN32_APPDATA_DIR, "Data");
        }
        return process.env.XDG_DATA_HOME ? user_dirs_path.join(process.env.XDG_DATA_HOME, "yarn") : FALLBACK_CONFIG_DIR;
      }(), LINK_REGISTRY_DIRECTORY = constants_path.join(DATA_DIRECTORY, "link"), GLOBAL_MODULE_DIRECTORY = constants_path.join(DATA_DIRECTORY, "global"), NODE_BIN_PATH = process.execPath, YARN_BIN_PATH = isWebpackBundle ? __filename : constants_path.join(__dirname, "..", "bin", "yarn.js");
      var POSIX_GLOBAL_PREFIX = `${process.env.DESTDIR || ""}/usr/local`, FALLBACK_GLOBAL_PREFIX = constants_path.join(user_home_dir, ".yarn"), ENV_PATH_KEY = function(platform, env) {
        var pathKey = "PATH";
        if ("win32" === platform) for (var _key in pathKey = "Path", env) "path" === _key.toLowerCase() && (pathKey = _key);
        return pathKey;
      }(process.platform, process.env);
      var VERSION_COLOR_SCHEME = {
        major: "red",
        premajor: "red",
        minor: "yellow",
        preminor: "yellow",
        patch: "green",
        prepatch: "green",
        prerelease: "red",
        unchanged: "white",
        unknown: "red"
      };
      function nullify(obj) {
        if (void 0 === obj && (obj = {}), Array.isArray(obj)) for (var item of obj) nullify(item); else if ((null !== obj && "object" == typeof obj || "function" == typeof obj) && (Object.setPrototypeOf(obj, null), 
        "object" == typeof obj)) for (var key in obj) nullify(obj[key]);
        return obj;
      }
      var debug = __webpack_require__(92256)("yarn");
      class BlockingQueue {
        constructor(alias, maxConcurrency) {
          void 0 === maxConcurrency && (maxConcurrency = 1 / 0), this.concurrencyQueue = [], 
          this.maxConcurrency = maxConcurrency, this.runningCount = 0, this.warnedStuck = !1, 
          this.alias = alias, this.first = !0, this.running = nullify(), this.queue = nullify(), 
          this.stuckTick = this.stuckTick.bind(this);
        }
        stillActive() {
          this.stuckTimer && clearTimeout(this.stuckTimer), this.stuckTimer = setTimeout(this.stuckTick, 5e3), 
          this.stuckTimer.unref && this.stuckTimer.unref();
        }
        stuckTick() {
          1 === this.runningCount && (this.warnedStuck = !0, debug(`The ${JSON.stringify(this.alias)} blocking queue may be stuck. 5 seconds without any activity with 1 worker: ${Object.keys(this.running)[0]}`));
        }
        push(key, factory) {
          return this.first ? this.first = !1 : this.stillActive(), new Promise(((resolve, reject) => {
            (this.queue[key] = this.queue[key] || []).push({
              factory: factory,
              resolve: resolve,
              reject: reject
            }), this.running[key] || this.shift(key);
          }));
        }
        shift(key) {
          this.running[key] && (delete this.running[key], this.runningCount--, this.stuckTimer && (clearTimeout(this.stuckTimer), 
          this.stuckTimer = null), this.warnedStuck && (this.warnedStuck = !1, debug(`${JSON.stringify(this.alias)} blocking queue finally resolved. Nothing to worry about.`)));
          var queue = this.queue[key];
          if (queue) {
            var _queue$shift = queue.shift(), resolve = _queue$shift.resolve, reject = _queue$shift.reject, factory = _queue$shift.factory;
            queue.length || delete this.queue[key];
            var next = () => {
              this.shift(key), this.shiftConcurrencyQueue();
            };
            this.maybePushConcurrencyQueue((() => {
              this.running[key] = !0, this.runningCount++, factory().then((function(val) {
                return resolve(val), next(), null;
              })).catch((function(err) {
                reject(err), next();
              }));
            }));
          }
        }
        maybePushConcurrencyQueue(run) {
          this.runningCount < this.maxConcurrency ? run() : this.concurrencyQueue.push(run);
        }
        shiftConcurrencyQueue() {
          if (this.runningCount < this.maxConcurrency) {
            var fn = this.concurrencyQueue.shift();
            fn && fn();
          }
        }
      }
      function promisify(fn, firstData) {
        return function() {
          var args = Array.prototype.slice.call(arguments, 0);
          return new Promise((function(resolve, reject) {
            args.push((function(err) {
              var res;
              firstData ? (res = err, err = null) : res = arguments.length <= 2 ? arguments[1] : Array.prototype.slice.call(arguments, 1), 
              err ? reject(err) : resolve(res);
            })), fn.apply(null, args);
          }));
        };
      }
      function promise_queue(arr, promiseProducer, concurrency) {
        void 0 === concurrency && (concurrency = 1 / 0), concurrency = Math.min(concurrency, arr.length), 
        arr = arr.slice();
        var results = [], total = arr.length;
        return total ? new Promise(((resolve, reject) => {
          for (var i = 0; i < concurrency; i++) next();
          function next() {
            var item = arr.shift();
            promiseProducer(item).then((function(result) {
              results.push(result), 0 === --total ? resolve(results) : arr.length && next();
            }), reject);
          }
        })) : Promise.resolve(results);
      }
      var fs = __webpack_require__(57147), disableTimestampCorrection = void 0, readFileBuffer = promisify(fs.readFile), fs_normalized_close = promisify(fs.close), lstat = promisify(fs.lstat), fs_normalized_open = promisify(fs.open), futimes = promisify(fs.futimes), write = promisify(fs.write), unlink = promisify(__webpack_require__(79303)), copyFile = function() {
        var _ref = asyncToGenerator_asyncToGenerator((function*(data, cleanup) {
          var ficloneFlag = constants.COPYFILE_FICLONE || 0;
          try {
            yield unlink(data.dest), yield copyFilePoly(data.src, data.dest, ficloneFlag, data);
          } finally {
            cleanup && cleanup();
          }
        }));
        return function() {
          return _ref.apply(this, arguments);
        };
      }(), copyFilePoly = (src, dest, flags, data) => fs.copyFile ? new Promise(((resolve, reject) => fs.copyFile(src, dest, flags, (err => {
        err ? reject(err) : fixTimes(void 0, dest, data).then((() => resolve())).catch((ex => reject(ex)));
      })))) : copyWithBuffer(src, dest, flags, data), copyWithBuffer = function() {
        var _ref2 = asyncToGenerator_asyncToGenerator((function*(src, dest, flags, data) {
          var fd = yield fs_normalized_open(dest, "w", data.mode);
          try {
            var _buffer = yield readFileBuffer(src);
            yield write(fd, _buffer, 0, _buffer.length), yield fixTimes(fd, dest, data);
          } finally {
            yield fs_normalized_close(fd);
          }
        }));
        return function() {
          return _ref2.apply(this, arguments);
        };
      }();
      function fixTimes() {
        return _fixTimes.apply(this, arguments);
      }
      function _fixTimes() {
        return (_fixTimes = asyncToGenerator_asyncToGenerator((function*(fd, dest, data) {
          var doOpen = void 0 === fd, openfd = fd || -1;
          if (void 0 === disableTimestampCorrection) {
            var destStat = yield lstat(dest);
            disableTimestampCorrection = fileDatesEqual(destStat.mtime, data.mtime);
          }
          if (!disableTimestampCorrection) {
            if (doOpen) try {
              openfd = yield fs_normalized_open(dest, "a", data.mode);
            } catch (er) {
              try {
                openfd = yield fs_normalized_open(dest, "r", data.mode);
              } catch (err) {
                return;
              }
            }
            try {
              openfd && (yield futimes(openfd, data.atime, data.mtime));
            } catch (er) {} finally {
              doOpen && openfd && (yield fs_normalized_close(openfd));
            }
          }
        }))).apply(this, arguments);
      }
      var fileDatesEqual = (a, b) => {
        var aTime = a.getTime(), bTime = b.getTime();
        if ("win32" !== process.platform) return aTime === bTime;
        if (Math.abs(aTime - bTime) <= 1) return !0;
        var aTimeSec = Math.floor(aTime / 1e3), bTimeSec = Math.floor(bTime / 1e3);
        return aTime - 1e3 * aTimeSec == 0 || bTime - 1e3 * bTimeSec == 0 ? aTimeSec === bTimeSec : aTime === bTime;
      }, fs_fs = __webpack_require__(57147), globModule = __webpack_require__(4170), fs_os = __webpack_require__(22037), fs_path = __webpack_require__(71017), constants = void 0 !== fs_fs.constants ? fs_fs.constants : {
        R_OK: fs_fs.R_OK,
        W_OK: fs_fs.W_OK,
        X_OK: fs_fs.X_OK
      }, lockQueue = new BlockingQueue("fs lock"), fs_readFileBuffer = promisify(fs_fs.readFile), fs_open = promisify(fs_fs.open), writeFile = promisify(fs_fs.writeFile), readlink = promisify(fs_fs.readlink), realpath = promisify(fs_fs.realpath), readdir = promisify(fs_fs.readdir), rename = promisify(fs_fs.rename), access = promisify(fs_fs.access), stat = promisify(fs_fs.stat), mkdirp = promisify(__webpack_require__(43034)), fs_exists = promisify(fs_fs.exists, !0), fs_lstat = promisify(fs_fs.lstat), chmod = promisify(fs_fs.chmod), fs_link = promisify(fs_fs.link), glob = promisify(globModule), CONCURRENT_QUEUE_ITEMS = fs_fs.copyFile ? 128 : 4, fsSymlink = promisify(fs_fs.symlink), invariant = __webpack_require__(46128), stripBOM = __webpack_require__(98403), noop = () => {};
      function buildActionsForCopy() {
        return _buildActionsForCopy.apply(this, arguments);
      }
      function _buildActionsForCopy() {
        return _buildActionsForCopy = asyncToGenerator_asyncToGenerator((function*(queue, events, possibleExtraneous, reporter) {
          var artifactFiles = new Set(events.artifactFiles || []), files = new Set, _loop = function(item) {
            var onDone = item.onDone;
            item.onDone = () => {
              events.onProgress(item.dest), onDone && onDone();
            };
          };
          for (var item of queue) _loop(item);
          events.onStart(queue.length);
          for (var actions = {
            file: [],
            symlink: [],
            link: []
          }; queue.length; ) {
            var items = queue.splice(0, CONCURRENT_QUEUE_ITEMS);
            yield Promise.all(items.map(build));
          }
          for (var file of artifactFiles) possibleExtraneous.has(file) && (reporter.verbose(reporter.lang("verboseFilePhantomExtraneous", file)), 
          possibleExtraneous.delete(file));
          for (var loc of possibleExtraneous) files.has(loc.toLowerCase()) && possibleExtraneous.delete(loc);
          return actions;
          function build() {
            return _build.apply(this, arguments);
          }
          function _build() {
            return (_build = asyncToGenerator_asyncToGenerator((function*(data) {
              var src = data.src, dest = data.dest, type = data.type, onFresh = data.onFresh || noop, onDone = data.onDone || noop;
              if (files.has(dest.toLowerCase()) ? reporter.verbose(`The case-insensitive file ${dest} shouldn't be copied twice in one bulk copy`) : files.add(dest.toLowerCase()), 
              "symlink" === type) return yield mkdirp(fs_path.dirname(dest)), onFresh(), actions.symlink.push({
                dest: dest,
                linkname: src
              }), void onDone();
              if (!(events.ignoreBasenames.indexOf(fs_path.basename(src)) >= 0)) {
                var srcFiles, destStat, srcStat = yield fs_lstat(src);
                srcStat.isDirectory() && (srcFiles = yield readdir(src));
                try {
                  destStat = yield fs_lstat(dest);
                } catch (e) {
                  if ("ENOENT" !== e.code) throw e;
                }
                if (destStat) {
                  var bothSymlinks = srcStat.isSymbolicLink() && destStat.isSymbolicLink(), bothFolders = srcStat.isDirectory() && destStat.isDirectory(), bothFiles = srcStat.isFile() && destStat.isFile();
                  if (bothFiles && artifactFiles.has(dest)) return onDone(), void reporter.verbose(reporter.lang("verboseFileSkipArtifact", src));
                  if (bothFiles && srcStat.size === destStat.size && fileDatesEqual(srcStat.mtime, destStat.mtime)) return onDone(), 
                  void reporter.verbose(reporter.lang("verboseFileSkip", src, dest, srcStat.size, +srcStat.mtime));
                  if (bothSymlinks) {
                    var srcReallink = yield readlink(src);
                    if (srcReallink === (yield readlink(dest))) return onDone(), void reporter.verbose(reporter.lang("verboseFileSkipSymlink", src, dest, srcReallink));
                  }
                  if (bothFolders) {
                    var destFiles = yield readdir(dest);
                    for (var _file of (invariant(srcFiles, "src files not initialised"), destFiles)) if (srcFiles.indexOf(_file) < 0) {
                      var _loc = fs_path.join(dest, _file);
                      if (possibleExtraneous.add(_loc), (yield fs_lstat(_loc)).isDirectory()) for (var _file2 of yield readdir(_loc)) possibleExtraneous.add(fs_path.join(_loc, _file2));
                    }
                  }
                }
                if (destStat && destStat.isSymbolicLink() && (yield unlink(dest), destStat = null), 
                srcStat.isSymbolicLink()) {
                  onFresh();
                  var linkname = yield readlink(src);
                  actions.symlink.push({
                    dest: dest,
                    linkname: linkname
                  }), onDone();
                } else if (srcStat.isDirectory()) yield* function*() {
                  destStat || (reporter.verbose(reporter.lang("verboseFileFolder", dest)), yield mkdirp(dest));
                  for (var destParts = dest.split(fs_path.sep); destParts.length; ) files.add(destParts.join(fs_path.sep).toLowerCase()), 
                  destParts.pop();
                  invariant(srcFiles, "src files not initialised");
                  var remaining = srcFiles.length;
                  for (var _file3 of (remaining || onDone(), srcFiles)) queue.push({
                    dest: fs_path.join(dest, _file3),
                    onFresh: onFresh,
                    onDone: () => {
                      0 == --remaining && onDone();
                    },
                    src: fs_path.join(src, _file3)
                  });
                }(); else {
                  if (!srcStat.isFile()) throw new Error(`unsure how to copy this: ${src}`);
                  onFresh(), actions.file.push({
                    src: src,
                    dest: dest,
                    atime: srcStat.atime,
                    mtime: srcStat.mtime,
                    mode: srcStat.mode
                  }), onDone();
                }
              }
            }))).apply(this, arguments);
          }
        })), _buildActionsForCopy.apply(this, arguments);
      }
      function buildActionsForHardlink() {
        return _buildActionsForHardlink.apply(this, arguments);
      }
      function _buildActionsForHardlink() {
        return _buildActionsForHardlink = asyncToGenerator_asyncToGenerator((function*(queue, events, possibleExtraneous, reporter) {
          var artifactFiles = new Set(events.artifactFiles || []), files = new Set, _loop2 = function(item) {
            var onDone = item.onDone || noop;
            item.onDone = () => {
              events.onProgress(item.dest), onDone();
            };
          };
          for (var item of queue) _loop2(item);
          events.onStart(queue.length);
          for (var actions = {
            file: [],
            symlink: [],
            link: []
          }; queue.length; ) {
            var items = queue.splice(0, CONCURRENT_QUEUE_ITEMS);
            yield Promise.all(items.map(build));
          }
          for (var file of artifactFiles) possibleExtraneous.has(file) && (reporter.verbose(reporter.lang("verboseFilePhantomExtraneous", file)), 
          possibleExtraneous.delete(file));
          for (var loc of possibleExtraneous) files.has(loc.toLowerCase()) && possibleExtraneous.delete(loc);
          return actions;
          function build() {
            return _build2.apply(this, arguments);
          }
          function _build2() {
            return (_build2 = asyncToGenerator_asyncToGenerator((function*(data) {
              var src = data.src, dest = data.dest, onFresh = data.onFresh || noop, onDone = data.onDone || noop;
              if (files.has(dest.toLowerCase())) onDone(); else if (files.add(dest.toLowerCase()), 
              !(events.ignoreBasenames.indexOf(fs_path.basename(src)) >= 0)) {
                var srcFiles, srcStat = yield fs_lstat(src);
                srcStat.isDirectory() && (srcFiles = yield readdir(src));
                var destExists = yield fs_exists(dest);
                if (destExists) {
                  var destStat = yield fs_lstat(dest), bothSymlinks = srcStat.isSymbolicLink() && destStat.isSymbolicLink(), bothFolders = srcStat.isDirectory() && destStat.isDirectory(), bothFiles = srcStat.isFile() && destStat.isFile();
                  if (srcStat.mode !== destStat.mode) try {
                    yield access(dest, srcStat.mode);
                  } catch (err) {
                    reporter.verbose(err);
                  }
                  if (bothFiles && artifactFiles.has(dest)) return onDone(), void reporter.verbose(reporter.lang("verboseFileSkipArtifact", src));
                  if (bothFiles && null !== srcStat.ino && srcStat.ino === destStat.ino) return onDone(), 
                  void reporter.verbose(reporter.lang("verboseFileSkip", src, dest, srcStat.ino));
                  if (bothSymlinks) {
                    var srcReallink = yield readlink(src);
                    if (srcReallink === (yield readlink(dest))) return onDone(), void reporter.verbose(reporter.lang("verboseFileSkipSymlink", src, dest, srcReallink));
                  }
                  if (bothFolders) {
                    var destFiles = yield readdir(dest);
                    for (var _file4 of (invariant(srcFiles, "src files not initialised"), destFiles)) if (srcFiles.indexOf(_file4) < 0) {
                      var _loc2 = fs_path.join(dest, _file4);
                      if (possibleExtraneous.add(_loc2), (yield fs_lstat(_loc2)).isDirectory()) for (var _file5 of yield readdir(_loc2)) possibleExtraneous.add(fs_path.join(_loc2, _file5));
                    }
                  }
                }
                if (srcStat.isSymbolicLink()) {
                  onFresh();
                  var linkname = yield readlink(src);
                  actions.symlink.push({
                    dest: dest,
                    linkname: linkname
                  }), onDone();
                } else if (srcStat.isDirectory()) yield* function*() {
                  reporter.verbose(reporter.lang("verboseFileFolder", dest)), yield mkdirp(dest);
                  for (var destParts = dest.split(fs_path.sep); destParts.length; ) files.add(destParts.join(fs_path.sep).toLowerCase()), 
                  destParts.pop();
                  invariant(srcFiles, "src files not initialised");
                  var remaining = srcFiles.length;
                  for (var _file6 of (remaining || onDone(), srcFiles)) queue.push({
                    onFresh: onFresh,
                    src: fs_path.join(src, _file6),
                    dest: fs_path.join(dest, _file6),
                    onDone: () => {
                      0 == --remaining && onDone();
                    }
                  });
                }(); else {
                  if (!srcStat.isFile()) throw new Error(`unsure how to copy this: ${src}`);
                  onFresh(), actions.link.push({
                    src: src,
                    dest: dest,
                    removeDest: destExists
                  }), onDone();
                }
              }
            }))).apply(this, arguments);
          }
        })), _buildActionsForHardlink.apply(this, arguments);
      }
      function copy(src, dest, reporter) {
        return copyBulk([ {
          src: src,
          dest: dest
        } ], reporter);
      }
      function copyBulk() {
        return _copyBulk.apply(this, arguments);
      }
      function _copyBulk() {
        return _copyBulk = asyncToGenerator_asyncToGenerator((function*(queue, reporter, _events) {
          var events = {
            onStart: _events && _events.onStart || noop,
            onProgress: _events && _events.onProgress || noop,
            possibleExtraneous: _events ? _events.possibleExtraneous : new Set,
            ignoreBasenames: _events && _events.ignoreBasenames || [],
            artifactFiles: _events && _events.artifactFiles || []
          }, actions = yield buildActionsForCopy(queue, events, events.possibleExtraneous, reporter);
          events.onStart(actions.file.length + actions.symlink.length + actions.link.length);
          var fileActions = actions.file, currentlyWriting = new Map;
          yield promise_queue(fileActions, function() {
            var _ref = asyncToGenerator_asyncToGenerator((function*(data) {
              for (var writePromise; writePromise = currentlyWriting.get(data.dest); ) yield writePromise;
              reporter.verbose(reporter.lang("verboseFileCopy", data.src, data.dest));
              var copier = copyFile(data, (() => currentlyWriting.delete(data.dest)));
              return currentlyWriting.set(data.dest, copier), events.onProgress(data.dest), copier;
            }));
            return function() {
              return _ref.apply(this, arguments);
            };
          }(), CONCURRENT_QUEUE_ITEMS);
          var symlinkActions = actions.symlink;
          yield promise_queue(symlinkActions, (data => {
            var linkname = fs_path.resolve(fs_path.dirname(data.dest), data.linkname);
            return reporter.verbose(reporter.lang("verboseFileSymlink", data.dest, linkname)), 
            symlink(linkname, data.dest);
          }));
        })), _copyBulk.apply(this, arguments);
      }
      function _hardlinkBulk() {
        return _hardlinkBulk = asyncToGenerator_asyncToGenerator((function*(queue, reporter, _events) {
          var events = {
            onStart: _events && _events.onStart || noop,
            onProgress: _events && _events.onProgress || noop,
            possibleExtraneous: _events ? _events.possibleExtraneous : new Set,
            artifactFiles: _events && _events.artifactFiles || [],
            ignoreBasenames: []
          }, actions = yield buildActionsForHardlink(queue, events, events.possibleExtraneous, reporter);
          events.onStart(actions.file.length + actions.symlink.length + actions.link.length);
          var fileActions = actions.link;
          yield promise_queue(fileActions, function() {
            var _ref2 = asyncToGenerator_asyncToGenerator((function*(data) {
              reporter.verbose(reporter.lang("verboseFileLink", data.src, data.dest)), data.removeDest && (yield unlink(data.dest)), 
              yield fs_link(data.src, data.dest);
            }));
            return function() {
              return _ref2.apply(this, arguments);
            };
          }(), CONCURRENT_QUEUE_ITEMS);
          var symlinkActions = actions.symlink;
          yield promise_queue(symlinkActions, (data => {
            var linkname = fs_path.resolve(fs_path.dirname(data.dest), data.linkname);
            return reporter.verbose(reporter.lang("verboseFileSymlink", data.dest, linkname)), 
            symlink(linkname, data.dest);
          }));
        })), _hardlinkBulk.apply(this, arguments);
      }
      function _readFile(loc, encoding) {
        return new Promise(((resolve, reject) => {
          fs_fs.readFile(loc, encoding, (function(err, content) {
            err ? reject(err) : resolve(content);
          }));
        }));
      }
      function readFile(loc) {
        return _readFile(loc, "utf8").then(normalizeOS);
      }
      function readJson() {
        return _readJson.apply(this, arguments);
      }
      function _readJson() {
        return (_readJson = asyncToGenerator_asyncToGenerator((function*(loc) {
          return (yield readJsonAndFile(loc)).object;
        }))).apply(this, arguments);
      }
      function readJsonAndFile() {
        return _readJsonAndFile.apply(this, arguments);
      }
      function _readJsonAndFile() {
        return (_readJsonAndFile = asyncToGenerator_asyncToGenerator((function*(loc) {
          var file = yield readFile(loc);
          try {
            return {
              object: nullify(JSON.parse(stripBOM(file))),
              content: file
            };
          } catch (err) {
            throw err.message = `${loc}: ${err.message}`, err;
          }
        }))).apply(this, arguments);
      }
      function symlink() {
        return _symlink.apply(this, arguments);
      }
      function _symlink() {
        return (_symlink = asyncToGenerator_asyncToGenerator((function*(src, dest) {
          "win32" !== process.platform && (src = (src = fs_path.relative(fs_path.dirname(dest), src)) || ".");
          try {
            if ((yield fs_lstat(dest)).isSymbolicLink()) if (dest === src) return;
          } catch (err) {
            if ("ENOENT" !== err.code) throw err;
          }
          yield unlink(dest), "win32" === process.platform ? yield fsSymlink(src, dest, "junction") : yield fsSymlink(src, dest);
        }))).apply(this, arguments);
      }
      function walk() {
        return _walk.apply(this, arguments);
      }
      function _walk() {
        return (_walk = asyncToGenerator_asyncToGenerator((function*(dir, relativeDir, ignoreBasenames) {
          void 0 === ignoreBasenames && (ignoreBasenames = new Set);
          var files = [], filenames = yield readdir(dir);
          for (var name of (ignoreBasenames.size && (filenames = filenames.filter((name => !ignoreBasenames.has(name)))), 
          filenames)) {
            var relative = relativeDir ? fs_path.join(relativeDir, name) : name, loc = fs_path.join(dir, name), _stat = yield fs_lstat(loc);
            files.push({
              relative: relative,
              basename: name,
              absolute: loc,
              mtime: +_stat.mtime
            }), _stat.isDirectory() && (files = files.concat(yield walk(loc, relative, ignoreBasenames)));
          }
          return files;
        }))).apply(this, arguments);
      }
      function getFileSizeOnDisk() {
        return _getFileSizeOnDisk.apply(this, arguments);
      }
      function _getFileSizeOnDisk() {
        return _getFileSizeOnDisk = asyncToGenerator_asyncToGenerator((function*(loc) {
          var stat = yield fs_lstat(loc), size = stat.size, blockSize = stat.blksize;
          return Math.ceil(size / blockSize) * blockSize;
        })), _getFileSizeOnDisk.apply(this, arguments);
      }
      function normalizeOS(body) {
        return body.replace(/\r\n/g, "\n");
      }
      var cr = "\r".charCodeAt(0), lf = "\n".charCodeAt(0);
      function getEolFromFile() {
        return _getEolFromFile.apply(this, arguments);
      }
      function _getEolFromFile() {
        return _getEolFromFile = asyncToGenerator_asyncToGenerator((function*(path) {
          if (yield fs_exists(path)) for (var buffer = yield fs_readFileBuffer(path), i = 0; i < buffer.length; ++i) {
            if (buffer[i] === cr) return "\r\n";
            if (buffer[i] === lf) return "\n";
          }
        })), _getEolFromFile.apply(this, arguments);
      }
      function writeFilePreservingEol() {
        return _writeFilePreservingEol.apply(this, arguments);
      }
      function _writeFilePreservingEol() {
        return _writeFilePreservingEol = asyncToGenerator_asyncToGenerator((function*(path, data) {
          var eol = (yield getEolFromFile(path)) || fs_os.EOL;
          "\n" !== eol && (data = data.replace(/\n/g, eol)), yield writeFile(path, data);
        })), _writeFilePreservingEol.apply(this, arguments);
      }
      function _hardlinksWork() {
        return (_hardlinksWork = asyncToGenerator_asyncToGenerator((function*(dir) {
          var filename = "test-file" + Math.random(), file = fs_path.join(dir, filename), fileLink = fs_path.join(dir, filename + "-link");
          try {
            yield writeFile(file, "test"), yield fs_link(file, fileLink);
          } catch (err) {
            return !1;
          } finally {
            yield unlink(file), yield unlink(fileLink);
          }
          return !0;
        }))).apply(this, arguments);
      }
      function makeTempDir() {
        return _makeTempDir.apply(this, arguments);
      }
      function _makeTempDir() {
        return (_makeTempDir = asyncToGenerator_asyncToGenerator((function*(prefix) {
          var dir = fs_path.join(fs_os.tmpdir(), `yarn-${prefix || ""}-${Date.now()}-${Math.random()}`);
          return yield unlink(dir), yield mkdirp(dir), dir;
        }))).apply(this, arguments);
      }
      function readFirstAvailableStream() {
        return _readFirstAvailableStream.apply(this, arguments);
      }
      function _readFirstAvailableStream() {
        return (_readFirstAvailableStream = asyncToGenerator_asyncToGenerator((function*(paths) {
          for (var _path of paths) try {
            var fd = yield fs_open(_path, "r");
            return fs_fs.createReadStream(_path, {
              fd: fd
            });
          } catch (err) {}
          return null;
        }))).apply(this, arguments);
      }
      function getFirstSuitableFolder() {
        return _getFirstSuitableFolder.apply(this, arguments);
      }
      function _getFirstSuitableFolder() {
        return (_getFirstSuitableFolder = asyncToGenerator_asyncToGenerator((function*(paths, mode) {
          void 0 === mode && (mode = constants.W_OK | constants.X_OK);
          var result = {
            skipped: [],
            folder: null
          };
          for (var folder of paths) try {
            return yield mkdirp(folder), yield access(folder, mode), result.folder = folder, 
            result;
          } catch (error) {
            result.skipped.push({
              error: error,
              folder: folder
            });
          }
          return result;
        }))).apply(this, arguments);
      }
      class MessageError extends Error {
        constructor(msg, code) {
          super(msg), this.code = code;
        }
      }
      class ProcessSpawnError extends MessageError {
        constructor(msg, code, process) {
          super(msg, code), this.process = process;
        }
      }
      class SecurityError extends MessageError {}
      class ProcessTermError extends MessageError {
        constructor(msg, code) {
          super(msg, code), this.EXIT_CODE = void 0, this.EXIT_SIGNAL = void 0;
        }
      }
      class ResponseError extends Error {
        constructor(msg, responseCode) {
          super(msg), this.responseCode = responseCode;
        }
      }
      class OneTimePasswordError extends Error {
        constructor(notice) {
          super(), this.notice = notice;
        }
      }
      function _build_sub_commands(rootCommandName, subCommands, usage) {
        void 0 === usage && (usage = []);
        var subCommandNames = Object.keys(subCommands).map(hyphenate);
        function _run() {
          return (_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
            var subName = camelCase(args.shift() || "");
            if (subName && subCommands[subName]) {
              var command = subCommands[subName];
              if (!1 !== (yield command(config, reporter, flags, args))) return Promise.resolve();
            }
            if (usage && usage.length) for (var msg of (reporter.error(`${reporter.lang("usage")}:`), 
            usage)) reporter.error(`yarn ${rootCommandName} ${msg}`);
            return Promise.reject(new MessageError(reporter.lang("invalidCommand", subCommandNames.join(", "))));
          }))).apply(this, arguments);
        }
        return {
          run: function() {
            return _run.apply(this, arguments);
          },
          setFlags: function(commander) {
            commander.usage(`${rootCommandName} [${subCommandNames.join("|")}] [flags]`);
          },
          hasWrapper: function(commander, args) {
            return !0;
          },
          examples: usage.map((cmd => `${rootCommandName} ${cmd}`))
        };
      }
      var cache_invariant = __webpack_require__(46128), cache_path = __webpack_require__(71017), micromatch = __webpack_require__(70850);
      function hasWrapper(flags, args) {
        return "dir" !== args[0];
      }
      function getCachedPackagesDirs() {
        return _getCachedPackagesDirs.apply(this, arguments);
      }
      function _getCachedPackagesDirs() {
        return (_getCachedPackagesDirs = asyncToGenerator_asyncToGenerator((function*(config, currentPath) {
          var results = [];
          if (!(yield fs_lstat(currentPath)).isDirectory()) return results;
          var folders = yield readdir(currentPath);
          for (var folder of folders) if ("." !== folder[0]) {
            var packageParentPath = cache_path.join(currentPath, folder, "node_modules"), candidates = yield readdir(packageParentPath);
            for (var candidate of (cache_invariant(1 === candidates.length, `There should only be one folder in a package cache (got ${candidates.join(",")} in ${packageParentPath})`), 
            candidates)) {
              var candidatePath = cache_path.join(packageParentPath, candidate);
              if ("@" === candidate.charAt(0)) {
                var subCandidates = yield readdir(candidatePath);
                for (var subCandidate of (cache_invariant(1 === subCandidates.length, `There should only be one folder in a package cache (got ${subCandidates.join(",")} in ${candidatePath})`), 
                subCandidates)) {
                  var subCandidatePath = cache_path.join(candidatePath, subCandidate);
                  results.push(subCandidatePath);
                }
              } else results.push(candidatePath);
            }
          }
          return results;
        }))).apply(this, arguments);
      }
      function _getMetadataWithPath(getMetadataFn, paths) {
        return Promise.all(paths.map((path => getMetadataFn(path).then((r => (r._path = path, 
        r))).catch((error => {})))));
      }
      function getCachedPackages() {
        return _getCachedPackages.apply(this, arguments);
      }
      function _getCachedPackages() {
        return (_getCachedPackages = asyncToGenerator_asyncToGenerator((function*(config) {
          var paths = yield getCachedPackagesDirs(config, config.cacheFolder);
          return _getMetadataWithPath(config.readPackageMetadata.bind(config), paths).then((packages => packages.filter((p => !!p))));
        }))).apply(this, arguments);
      }
      function list() {
        return _list.apply(this, arguments);
      }
      function _list() {
        return (_list = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var body = (yield getCachedPackages(config)).filter((function(_temp) {
            var _ref = void 0 === _temp ? {} : _temp, manifest = (_ref.registry, _ref.package);
            _ref.remote;
            return !(flags.pattern && !micromatch.contains(manifest.name, flags.pattern));
          })).map((function(_temp2) {
            var _ref2 = void 0 === _temp2 ? {} : _temp2, registry = _ref2.registry, manifest = _ref2.package, remote = _ref2.remote;
            return [ manifest.name, manifest.version, registry, remote && remote.resolved || "" ];
          }));
          reporter.table([ "Name", "Version", "Registry", "Resolved" ], body);
        }))).apply(this, arguments);
      }
      function _clean() {
        return (_clean = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (config.cacheFolder) {
            var activity = reporter.activity();
            if (args.length > 0) {
              var packagesToDelete = (yield getCachedPackages(config)).filter((function(_temp3) {
                var _ref3 = void 0 === _temp3 ? {} : _temp3, manifest = (_ref3.registry, _ref3.package);
                _ref3.remote;
                return -1 !== args.indexOf(manifest.name);
              }));
              for (var manifest of packagesToDelete) for (var relativePath = cache_path.relative(config.cacheFolder, manifest._path); relativePath && "." !== relativePath; ) yield unlink(cache_path.resolve(config.cacheFolder, relativePath)), 
              relativePath = cache_path.dirname(relativePath);
              activity.end(), reporter.success(reporter.lang("clearedPackageFromCache", args[0]));
            } else yield unlink(config._cacheRootFolder), yield mkdirp(config.cacheFolder), 
            activity.end(), reporter.success(reporter.lang("clearedCache"));
          }
        }))).apply(this, arguments);
      }
      var _buildSubCommands = _build_sub_commands("cache", {
        ls: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          reporter.warn("`yarn cache ls` is deprecated. Please use `yarn cache list`."), yield list(config, reporter, flags, args);
        }))(),
        list: list,
        clean: function() {
          return _clean.apply(this, arguments);
        },
        dir(config, reporter) {
          reporter.log(config.cacheFolder, {
            force: !0
          });
        }
      }), run = _buildSubCommands.run, _setFlags = _buildSubCommands.setFlags, examples = _buildSubCommands.examples;
      function setFlags(commander) {
        _setFlags(commander), commander.description("Yarn cache list will print out every cached package."), 
        commander.option("--pattern [pattern]", "filter cached packages by pattern");
      }
      function _setPrototypeOf(o, p) {
        return _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
          return o.__proto__ = p, o;
        }, _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
          !0;
        } catch (e) {
          return !1;
        }
      }
      function _construct(Parent, args, Class) {
        return _construct = _isNativeReflectConstruct() ? Reflect.construct : function(Parent, args, Class) {
          var a = [ null ];
          a.push.apply(a, args);
          var instance = new (Function.bind.apply(Parent, a));
          return Class && _setPrototypeOf(instance, Class.prototype), instance;
        }, _construct.apply(null, arguments);
      }
      class BaseResolver {
        constructor(request, fragment) {
          this.resolver = request.resolver, this.reporter = request.reporter, this.fragment = fragment, 
          this.registry = request.registry, this.request = request, this.pattern = request.pattern, 
          this.config = request.config;
        }
        fork(Resolver, resolveArg) {
          var args = Array.prototype.slice.call(arguments, 2), resolver = _construct(Resolver, [ this.request ].concat(args));
          return resolver.registry = this.registry, resolver.resolve(resolveArg);
        }
        resolve(resolveArg) {
          throw new Error("Not implemented");
        }
      }
      class RegistryResolver extends BaseResolver {
        constructor(request, name, range) {
          super(request, `${name}@${range}`), this.name = name, this.range = range, this.registryConfig = request.config.registries[this.constructor.registry].config;
        }
      }
      function getPlatformSpecificPackageFilename(pkg) {
        var name, suffix = getSystemParams();
        return `${name = pkg.name, "@" === name[0] ? name.substr(1).replace("/", "-") : name}-v${pkg.version}-${suffix}`;
      }
      function getSystemParams() {
        return `${process.platform}-${process.arch}-${process.versions.modules || ""}`;
      }
      var npm_resolver_inquirer = __webpack_require__(73446), npm_resolver_tty = __webpack_require__(76224), npm_resolver_path = __webpack_require__(71017), semver = __webpack_require__(92878), ssri = __webpack_require__(44240);
      class NpmResolver extends RegistryResolver {
        static findVersionInRegistryResponse(config, name, range, body, request) {
          return asyncToGenerator_asyncToGenerator((function*() {
            if (body.versions && 0 === Object.keys(body.versions).length) throw new MessageError(config.reporter.lang("registryNoVersions", body.name));
            if (!body["dist-tags"] || !body.versions) throw new MessageError(config.reporter.lang("malformedRegistryResponse", name));
            if (range in body["dist-tags"] && (range = body["dist-tags"][range]), config.packageDateLimit && body.time) {
              var releaseDates = body.time, closestVersion = null;
              if (semver.rsort(Object.keys(body.versions)).some((v => !!(releaseDates[v] && semver.satisfies(v, range) && (closestVersion = v, 
              releaseDates[v] < config.packageDateLimit)))), closestVersion) return body.versions[closestVersion];
            }
            var latestVersion = body["dist-tags"] ? body["dist-tags"].latest : void 0;
            if (latestVersion && semver.satisfies(latestVersion, range)) return body.versions[latestVersion];
            var satisfied = yield config.resolveConstraints(Object.keys(body.versions), range);
            if (satisfied) return body.versions[satisfied];
            if (request && !config.nonInteractive) {
              var pageSize;
              request.resolver && request.resolver.activity && request.resolver.activity.end(), 
              config.reporter.log(config.reporter.lang("couldntFindVersionThatMatchesRange", body.name, range)), 
              process.stdout instanceof npm_resolver_tty.WriteStream && (pageSize = process.stdout.rows - 2);
              var response = yield npm_resolver_inquirer.prompt([ {
                name: "package",
                type: "list",
                message: config.reporter.lang("chooseVersionFromList", body.name),
                choices: semver.rsort(Object.keys(body.versions)),
                pageSize: pageSize
              } ]);
              if (response && response.package) return body.versions[response.package];
            }
            throw new MessageError(config.reporter.lang("couldntFindVersionThatMatchesRange", body.name, range));
          }))();
        }
        resolveRequest(desiredVersion) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (_this.config.offline) {
              var res = yield _this.resolveRequestOffline();
              if (null != res) return res;
            }
            var escapedName = NpmRegistry.escapeName(_this.name), desiredRange = desiredVersion || _this.range, body = yield _this.config.registries.npm.request(escapedName, {
              unfiltered: !!_this.config.packageDateLimit
            });
            return body ? NpmResolver.findVersionInRegistryResponse(_this.config, escapedName, desiredRange, body, _this.request) : null;
          }))();
        }
        resolveRequestOffline() {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var packageDirs = yield _this2.config.getCache("cachedPackages", (() => getCachedPackagesDirs(_this2.config, _this2.config.cacheFolder))), versions = nullify();
            for (var dir of packageDirs) if (-1 !== dir.indexOf("npm-")) {
              var pkg = yield _this2.config.readManifest(dir, "npm");
              if (pkg.name === _this2.name) {
                var metadata = yield _this2.config.readPackageMetadata(dir);
                metadata.remote && (versions[pkg.version] = Object.assign({}, pkg, {
                  _remote: metadata.remote
                }));
              }
            }
            var satisfied = yield _this2.config.resolveConstraints(Object.keys(versions), _this2.range);
            if (satisfied) return versions[satisfied];
            if (_this2.config.preferOffline) return null;
            throw new MessageError(_this2.reporter.lang("couldntFindPackageInCache", _this2.name, _this2.range, Object.keys(versions).join(", ")));
          }))();
        }
        cleanRegistry(url) {
          return this.config.getOption("registry") === YARN_REGISTRY ? url.replace(NPM_REGISTRY_RE, YARN_REGISTRY) : url;
        }
        resolve() {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var shrunk = _this3.request.getLocked("tarball");
            if (shrunk && _this3.config.packBuiltPackages && shrunk.prebuiltVariants && shrunk._remote) {
              var prebuiltVariants = shrunk.prebuiltVariants, prebuiltName = getPlatformSpecificPackageFilename(shrunk), offlineMirrorPath = _this3.config.getOfflineMirrorPath();
              if (prebuiltVariants[prebuiltName] && offlineMirrorPath) {
                var filename = npm_resolver_path.join(offlineMirrorPath, "prebuilt", prebuiltName + ".tgz"), _remote = shrunk._remote;
                _remote && (yield fs_exists(filename)) && (_remote.reference = `file:${filename}`, 
                _remote.hash = prebuiltVariants[prebuiltName], _remote.integrity = ssri.fromHex(_remote.hash, "sha1").toString());
              }
            }
            if (shrunk && shrunk._remote && (shrunk._remote.integrity || _this3.config.offline || !_this3.config.autoAddIntegrity)) return shrunk;
            var desiredVersion = shrunk && shrunk.version ? shrunk.version : null, info = yield _this3.resolveRequest(desiredVersion);
            if (null == info) throw new MessageError(_this3.reporter.lang("packageNotFoundRegistry", _this3.name, "npm"));
            var deprecated = info.deprecated, dist = info.dist;
            if (shrunk && shrunk._remote) return shrunk._remote.integrity = dist && dist.integrity ? ssri.parse(dist.integrity) : ssri.fromHex(dist && dist.shasum ? dist.shasum : "", "sha1"), 
            shrunk;
            if ("string" == typeof deprecated) {
              var human = `${info.name}@${info.version}`, parentNames = _this3.request.parentNames;
              parentNames.length && (human = parentNames.concat(human).join(" > ")), _this3.reporter.warn(`${human}: ${deprecated}`);
            }
            return null != dist && dist.tarball && (info._remote = {
              resolved: `${_this3.cleanRegistry(dist.tarball)}#${dist.shasum}`,
              type: "tarball",
              reference: _this3.cleanRegistry(dist.tarball),
              hash: dist.shasum,
              integrity: dist.integrity ? ssri.parse(dist.integrity) : ssri.fromHex(dist.shasum, "sha1"),
              registry: "npm",
              packageName: info.name
            }), info._uid = info.version, info;
          }))();
        }
      }
      NpmResolver.registry = "npm";
      var ENV_EXPR = /(\\*)\$\{([^}]+)\}/g;
      function envReplace(value, env) {
        return void 0 === env && (env = process.env), "string" == typeof value && value ? value.replace(ENV_EXPR, ((match, esc, envVarName) => {
          if (esc.length && esc.length % 2) return match;
          if (void 0 === env[envVarName]) throw new Error("Failed to replace env in config: " + match);
          return env[envVarName] || "";
        })) : value;
      }
      var objectPath = __webpack_require__(31528), base_registry_path = __webpack_require__(71017);
      class BaseRegistry {
        constructor(cwd, registries, requestManager, reporter, enableDefaultRc, extraneousRcFiles) {
          this.reporter = reporter, this.requestManager = requestManager, this.registries = registries, 
          this.config = {}, this.folder = "", this.token = "", this.loc = "", this.cwd = cwd, 
          this.enableDefaultRc = enableDefaultRc, this.extraneousRcFiles = extraneousRcFiles;
        }
        setToken(token) {
          this.token = token;
        }
        setOtp(otp) {
          this.otp = otp;
        }
        getOption(key) {
          return this.config[key];
        }
        getAvailableRegistries() {
          var config = this.config;
          return Object.keys(config).reduce(((registries, option) => ("registry" !== option && "registry" !== option.split(":")[1] || registries.push(config[option]), 
          registries)), []);
        }
        loadConfig() {
          return Promise.resolve();
        }
        checkOutdated(config, name, range) {
          return Promise.reject(new Error("unimplemented"));
        }
        saveHomeConfig(config) {
          return Promise.reject(new Error("unimplemented"));
        }
        request(pathname, opts) {
          return void 0 === opts && (opts = {}), this.requestManager.request(_extends({
            url: pathname
          }, opts));
        }
        init(overrides) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var override of (void 0 === overrides && (overrides = {}), _this.mergeEnv("yarn_"), 
            yield _this.loadConfig(), Object.keys(overrides))) {
              var val = overrides[override];
              void 0 !== val && (_this.config[override] = val);
            }
            _this.loc = base_registry_path.join(_this.cwd, _this.folder);
          }))();
        }
        static normalizeConfig(config) {
          for (var key in config) config[key] = BaseRegistry.normalizeConfigOption(config[key]);
          return config;
        }
        static normalizeConfigOption(val) {
          return "true" === val || "false" !== val && val;
        }
        mergeEnv(prefix) {
          for (var envKey in process.env) {
            var key = envKey.toLowerCase();
            if (0 === key.indexOf(prefix.toLowerCase())) {
              var val = BaseRegistry.normalizeConfigOption(process.env[envKey]);
              key = (key = (key = removePrefix(key, prefix.toLowerCase())).replace(/__/g, ".")).replace(/([^_])_/g, "$1-"), 
              objectPath.set(this.config, key, val);
            }
          }
        }
      }
      var resolve = __webpack_require__(71017).resolve;
      function resolveWithHome(path) {
        return ("win32" === process.platform ? /^~(\/|\\)/ : /^~\//).test(path) ? resolve(user_home_dir, path.substr(2)) : resolve(path);
      }
      function getCredentials() {
        return _getCredentials.apply(this, arguments);
      }
      function _getCredentials() {
        return (_getCredentials = asyncToGenerator_asyncToGenerator((function*(config, reporter) {
          var _config$registries$ya = config.registries.yarn.config, username = _config$registries$ya.username, email = _config$registries$ya.email;
          if (username) reporter.info(`${reporter.lang("npmUsername")}: ${username}`); else if (!(username = yield reporter.question(reporter.lang("npmUsername")))) return null;
          if (email) reporter.info(`${reporter.lang("npmEmail")}: ${email}`); else if (!(email = yield reporter.question(reporter.lang("npmEmail")))) return null;
          return yield config.registries.yarn.saveHomeConfig({
            username: username,
            email: email
          }), {
            username: username,
            email: email
          };
        }))).apply(this, arguments);
      }
      function getOneTimePassword(reporter) {
        return reporter.question(reporter.lang("npmOneTimePassword"));
      }
      function getToken() {
        return _getToken.apply(this, arguments);
      }
      function _getToken() {
        return _getToken = asyncToGenerator_asyncToGenerator((function*(config, reporter, name, flags, registry) {
          void 0 === name && (name = ""), void 0 === flags && (flags = {}), void 0 === registry && (registry = "");
          var auth = registry ? config.registries.npm.getAuthByRegistry(registry) : config.registries.npm.getAuth(name);
          if (config.otp && config.registries.npm.setOtp(config.otp), auth) return config.registries.npm.setToken(auth), 
          function() {
            return reporter.info(reporter.lang("notRevokingConfigToken")), Promise.resolve();
          };
          var env = process.env.YARN_AUTH_TOKEN || process.env.NPM_AUTH_TOKEN;
          if (env) return config.registries.npm.setToken(`Bearer ${env}`), function() {
            return reporter.info(reporter.lang("notRevokingEnvToken")), Promise.resolve();
          };
          if (flags.nonInteractive || config.nonInteractive) throw new MessageError(reporter.lang("nonInteractiveNoToken"));
          var creds = yield getCredentials(config, reporter);
          if (!creds) return reporter.warn(reporter.lang("loginAsPublic")), function() {
            return reporter.info(reporter.lang("noTokenToRevoke")), Promise.resolve();
          };
          var username = creds.username, email = creds.email, password = yield reporter.question(reporter.lang("npmPassword"), {
            password: !0,
            required: !0
          }), userobj = {
            _id: `org.couchdb.user:${username}`,
            name: username,
            password: password,
            email: email,
            type: "user",
            roles: [],
            date: (new Date).toISOString()
          }, res = yield config.registries.npm.request(`-/user/org.couchdb.user:${encodeURIComponent(username)}`, {
            method: "PUT",
            registry: registry,
            body: userobj,
            auth: {
              username: username,
              password: password,
              email: email
            }
          });
          if (res && res.ok) {
            reporter.success(reporter.lang("loggedIn"));
            var token = res.token;
            return config.registries.npm.setToken(`Bearer ${token}`), function() {
              var _revoke = asyncToGenerator_asyncToGenerator((function*() {
                reporter.success(reporter.lang("revokedToken")), yield config.registries.npm.request(`-/user/token/${token}`, {
                  method: "DELETE",
                  registry: registry
                });
              }));
              return function() {
                return _revoke.apply(this, arguments);
              };
            }();
          }
          throw new MessageError(reporter.lang("incorrectCredentials"));
        })), _getToken.apply(this, arguments);
      }
      function login_hasWrapper(commander, args) {
        return !0;
      }
      function login_setFlags(commander) {
        commander.description("Stores registry username and email.");
      }
      function login_run() {
        return _run.apply(this, arguments);
      }
      function _run() {
        return (_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          yield getCredentials(config, reporter);
        }))).apply(this, arguments);
      }
      var normalizeUrl = __webpack_require__(65657), npm_registry_path = __webpack_require__(71017), url = __webpack_require__(57310), ini = __webpack_require__(16363), REGEX_REGISTRY_ENFORCED_HTTPS = /^https?:\/\/([^\/]+\.)?(yarnpkg\.com|npmjs\.(org|com))(\/|$)/, REGEX_REGISTRY_HTTP_PROTOCOL = /^https?:/i, REGEX_REGISTRY_PREFIX = /^(https?:)?\/\//i, REGEX_REGISTRY_SUFFIX = /registry\/?$/, SCOPED_PKG_REGEXP = /(?:^|\/)(@[^\/?]+?)(?=%2f|\/)/;
      function getGlobalPrefix() {
        if (process.env.PREFIX) return process.env.PREFIX;
        if ("win32" === process.platform) return npm_registry_path.dirname(process.execPath);
        var prefix = npm_registry_path.dirname(npm_registry_path.dirname(process.execPath));
        return process.env.DESTDIR && (prefix = npm_registry_path.join(process.env.DESTDIR, prefix)), 
        prefix;
      }
      var PATH_CONFIG_OPTIONS = new Set([ "cache", "cafile", "prefix", "userconfig" ]);
      function isPathConfigOption(key) {
        return PATH_CONFIG_OPTIONS.has(key);
      }
      function normalizePath(val) {
        if (void 0 !== val) return "string" != typeof val && (val = String(val)), resolveWithHome(val);
      }
      function urlParts(requestUrl) {
        var normalizedUrl = normalizeUrl(requestUrl), parsed = url.parse(normalizedUrl);
        return {
          host: parsed.host || "",
          path: parsed.path || ""
        };
      }
      class NpmRegistry extends BaseRegistry {
        constructor(cwd, registries, requestManager, reporter, enableDefaultRc, extraneousRcFiles) {
          super(cwd, registries, requestManager, reporter, enableDefaultRc, extraneousRcFiles), 
          this.folder = "node_modules";
        }
        static escapeName(name) {
          return name.replace("/", "%2f");
        }
        isScopedPackage(packageIdent) {
          return SCOPED_PKG_REGEXP.test(packageIdent);
        }
        getRequestUrl(registry, pathname) {
          var resolved = pathname;
          return REGEX_REGISTRY_PREFIX.test(pathname) || (resolved = url.resolve(addSuffix(registry, "/"), `./${pathname}`)), 
          REGEX_REGISTRY_ENFORCED_HTTPS.test(resolved) && (resolved = resolved.replace(/^http:\/\//, "https://")), 
          resolved;
        }
        isRequestToRegistry(requestUrl, registryUrl) {
          var request = urlParts(requestUrl), registry = urlParts(registryUrl), customHostSuffix = this.getRegistryOrGlobalOption(registryUrl, "custom-host-suffix"), requestToRegistryHost = request.host === registry.host, requestToYarn = YARN_REGISTRY.includes(request.host) && "https://registry.npmjs.org/".includes(registry.host), requestToRegistryPath = request.path.startsWith(registry.path), customHostSuffixInUse = "string" == typeof customHostSuffix && request.host.endsWith(customHostSuffix);
          return (requestToRegistryHost || requestToYarn) && (requestToRegistryPath || customHostSuffixInUse);
        }
        request(pathname, opts, packageName) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            void 0 === opts && (opts = {});
            var packageIdent = packageName && NpmRegistry.escapeName(packageName) || pathname, registry = opts.registry || _this.getRegistry(packageIdent), requestUrl = _this.getRequestUrl(registry, pathname), alwaysAuth = _this.getRegistryOrGlobalOption(registry, "always-auth"), headers = _extends({
              Accept: opts.unfiltered ? "application/json" : "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*"
            }, opts.headers), isToRegistry = _this.isRequestToRegistry(requestUrl, registry) || _this.requestNeedsAuth(requestUrl);
            if (_this.token || isToRegistry && (alwaysAuth || _this.isScopedPackage(packageIdent))) {
              var authorization = _this.getAuth(packageIdent);
              authorization && (headers.authorization = authorization);
            }
            _this.otp && (headers["npm-otp"] = _this.otp);
            try {
              return yield _this.requestManager.request({
                url: requestUrl,
                method: opts.method,
                body: opts.body,
                auth: opts.auth,
                headers: headers,
                json: !opts.buffer,
                buffer: opts.buffer,
                process: opts.process,
                gzip: !0
              });
            } catch (error) {
              if (error instanceof OneTimePasswordError) {
                if (_this.otp) throw new MessageError(_this.reporter.lang("incorrectOneTimePassword"));
                return _this.reporter.info(_this.reporter.lang("twoFactorAuthenticationEnabled")), 
                error.notice && _this.reporter.info(error.notice), _this.otp = yield getOneTimePassword(_this.reporter), 
                _this.requestManager.clearCache(), _this.request(pathname, opts, packageName);
              }
              throw error;
            }
          }))();
        }
        requestNeedsAuth(requestUrl) {
          var config = this.config, requestParts = urlParts(requestUrl);
          return !!Object.keys(config).find((option => {
            var parts = option.split(":");
            if (2 === parts.length && "_authToken" === parts[1] || "_password" === parts[1]) {
              var registryParts = urlParts(parts[0]);
              if (requestParts.host === registryParts.host && requestParts.path.startsWith(registryParts.path)) return !0;
            }
            return !1;
          }));
        }
        checkOutdated(config, name, range) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var escapedName = NpmRegistry.escapeName(name), req = yield _this2.request(escapedName, {
              unfiltered: !0
            });
            if (!req) throw new Error(`couldn't find ${name}`);
            var repository = req.repository, homepage = req.homepage, wantedPkg = yield NpmResolver.findVersionInRegistryResponse(config, escapedName, range, req);
            repository || homepage || (repository = wantedPkg.repository, homepage = wantedPkg.homepage);
            var latest = req["dist-tags"].latest;
            latest || (latest = wantedPkg.version);
            var url = homepage || repository && repository.url || "";
            return {
              latest: latest,
              wanted: wantedPkg.version,
              url: url
            };
          }))();
        }
        getPossibleConfigLocations(filename, reporter) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var possibles = [];
            for (var rcFile of _this3.extraneousRcFiles.slice().reverse()) possibles.push([ !1, npm_registry_path.resolve(process.cwd(), rcFile) ]);
            if (_this3.enableDefaultRc) {
              var localfile = "." + filename;
              possibles = possibles.concat([ [ !1, npm_registry_path.join(_this3.cwd, localfile) ], [ !0, _this3.config.userconfig || npm_registry_path.join(user_home_dir, localfile) ], [ !1, npm_registry_path.join(getGlobalPrefix(), "etc", filename) ] ]), 
              home !== user_home_dir && possibles.push([ !0, npm_registry_path.join(home, localfile) ]);
              for (var foldersFromRootToCwd = function(path) {
                return path.replace(/\\/g, "/");
              }(_this3.cwd).split("/"); foldersFromRootToCwd.length > 1; ) possibles.push([ !1, npm_registry_path.join(foldersFromRootToCwd.join(npm_registry_path.sep), localfile) ]), 
              foldersFromRootToCwd.pop();
            }
            var actuals = [];
            for (var _ref of possibles) {
              var isHome = _ref[0], loc = _ref[1];
              reporter.verbose(reporter.lang("configPossibleFile", loc)), (yield fs_exists(loc)) && (reporter.verbose(reporter.lang("configFileFound", loc)), 
              actuals.push([ isHome, loc, yield readFile(loc) ]));
            }
            return actuals;
          }))();
        }
        static getConfigEnv(env) {
          void 0 === env && (env = process.env);
          var overrideEnv = {
            HOME: home
          };
          return Object.assign({}, env, overrideEnv);
        }
        static normalizeConfig(config) {
          var env = NpmRegistry.getConfigEnv();
          for (var key in config = BaseRegistry.normalizeConfig(config)) config[key] = envReplace(config[key], env), 
          isPathConfigOption(key) && (config[key] = normalizePath(config[key]));
          return config;
        }
        loadConfig() {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var _ref2 of (_this4.mergeEnv("npm_config_"), yield _this4.getPossibleConfigLocations("npmrc", _this4.reporter))) {
              var loc = _ref2[1], file = _ref2[2], config = NpmRegistry.normalizeConfig(ini.parse(file)), offlineLoc = config["yarn-offline-mirror"];
              if (!_this4.config["yarn-offline-mirror"] && offlineLoc) {
                var mirrorLoc = config["yarn-offline-mirror"] = npm_registry_path.resolve(npm_registry_path.dirname(loc), offlineLoc);
                yield mkdirp(mirrorLoc);
              }
              _this4.config = Object.assign({}, config, _this4.config);
            }
          }))();
        }
        getScope(packageIdent) {
          var match = packageIdent.match(SCOPED_PKG_REGEXP);
          return match && match[1] || "";
        }
        getRegistry(packageIdent) {
          if (packageIdent.match(REGEX_REGISTRY_PREFIX)) {
            var registry = this.getAvailableRegistries().find((registry => packageIdent.startsWith(registry)));
            if (registry) return String(registry);
          }
          for (var scope of [ this.getScope(packageIdent), "" ]) {
            var _registry = this.getScopedOption(scope, "registry") || this.registries.yarn.getScopedOption(scope, "registry");
            if (_registry) return String(_registry);
          }
          return "https://registry.npmjs.org/";
        }
        getAuthByRegistry(registry) {
          var authToken = this.getRegistryOrGlobalOption(registry, "_authToken");
          if (authToken) return `Bearer ${String(authToken)}`;
          var auth = this.getRegistryOrGlobalOption(registry, "_auth");
          if (auth) return `Basic ${String(auth)}`;
          var username = this.getRegistryOrGlobalOption(registry, "username"), password = this.getRegistryOrGlobalOption(registry, "_password");
          if (username && password) {
            var pw = Buffer.from(String(password), "base64").toString();
            return "Basic " + Buffer.from(String(username) + ":" + pw).toString("base64");
          }
          return "";
        }
        getAuth(packageIdent) {
          if (this.token) return this.token;
          var baseRegistry = this.getRegistry(packageIdent), registries = [ baseRegistry ];
          for (var registry of (baseRegistry === YARN_REGISTRY && registries.push("https://registry.npmjs.org/"), 
          registries)) {
            var auth = this.getAuthByRegistry(registry);
            if (auth) return auth;
          }
          return "";
        }
        getScopedOption(scope, option) {
          return this.getOption(scope + (scope ? ":" : "") + option);
        }
        getRegistryOption(registry, option) {
          var pre = REGEX_REGISTRY_HTTP_PROTOCOL, suf = REGEX_REGISTRY_SUFFIX, reg = addSuffix(registry, "/");
          return this.getScopedOption(reg, option) || pre.test(reg) && this.getRegistryOption(reg.replace(pre, ""), option) || suf.test(reg) && this.getRegistryOption(reg.replace(suf, ""), option);
        }
        getRegistryOrGlobalOption(registry, option) {
          return this.getRegistryOption(registry, option) || this.getOption(option);
        }
      }
      function normalizePattern(pattern) {
        var hasVersion = !1, range = "latest", name = pattern, isScoped = !1;
        "@" === name[0] && (isScoped = !0, name = name.slice(1));
        var parts = name.split("@");
        return parts.length > 1 && (name = parts.shift(), (range = parts.join("@")) ? hasVersion = !0 : range = "*"), 
        isScoped && (name = `@${name}`), {
          name: name,
          range: range,
          hasVersion: hasVersion
        };
      }
      NpmRegistry.filename = "package.json";
      var parse_util = __webpack_require__(73837), parse_invariant = __webpack_require__(46128), parse_stripBOM = __webpack_require__(98403), parse_require = __webpack_require__(39962), safeLoad = parse_require.safeLoad, FAILSAFE_SCHEMA = parse_require.FAILSAFE_SCHEMA, VERSION_REGEX = /^yarn lockfile v(\d+)$/, TOKEN_TYPES_boolean = "BOOLEAN", TOKEN_TYPES_string = "STRING", TOKEN_TYPES_eof = "EOF", TOKEN_TYPES_colon = "COLON", TOKEN_TYPES_newline = "NEWLINE", TOKEN_TYPES_comment = "COMMENT", TOKEN_TYPES_indent = "INDENT", TOKEN_TYPES_invalid = "INVALID", TOKEN_TYPES_number = "NUMBER", TOKEN_TYPES_comma = "COMMA", VALID_PROP_VALUE_TOKENS = [ TOKEN_TYPES_boolean, TOKEN_TYPES_string, TOKEN_TYPES_number ];
      class Parser {
        constructor(input, fileLoc) {
          void 0 === fileLoc && (fileLoc = "lockfile"), this.comments = [], this.tokens = function*(input) {
            var lastNewline = !1, line = 1, col = 0;
            function buildToken(type, value) {
              return {
                line: line,
                col: col,
                type: type,
                value: value
              };
            }
            for (;input.length; ) {
              var chop = 0;
              if ("\n" === input[0] || "\r" === input[0]) chop++, "\n" === input[1] && chop++, 
              line++, col = 0, yield buildToken(TOKEN_TYPES_newline); else if ("#" === input[0]) {
                chop++;
                var nextNewline = input.indexOf("\n", chop);
                nextNewline < 0 && (nextNewline = input.length);
                var val = input.substring(chop, nextNewline);
                chop = nextNewline, yield buildToken(TOKEN_TYPES_comment, val);
              } else if (" " === input[0]) if (lastNewline) {
                for (var indentSize = 1, i = 1; " " === input[i]; i++) indentSize++;
                if (indentSize % 2) throw new TypeError("Invalid number of spaces");
                chop = indentSize, yield buildToken(TOKEN_TYPES_indent, indentSize / 2);
              } else chop++; else if ('"' === input[0]) {
                for (var _i = 1; _i < input.length; _i++) if ('"' === input[_i] && ("\\" !== input[_i - 1] || "\\" === input[_i - 2])) {
                  _i++;
                  break;
                }
                var _val = input.substring(0, _i);
                chop = _i;
                try {
                  yield buildToken(TOKEN_TYPES_string, JSON.parse(_val));
                } catch (err) {
                  if (!(err instanceof SyntaxError)) throw err;
                  yield buildToken(TOKEN_TYPES_invalid);
                }
              } else if (/^[0-9]/.test(input)) {
                var _val2 = /^[0-9]+/.exec(input)[0];
                chop = _val2.length, yield buildToken(TOKEN_TYPES_number, +_val2);
              } else if (/^true/.test(input)) yield buildToken(TOKEN_TYPES_boolean, !0), chop = 4; else if (/^false/.test(input)) yield buildToken(TOKEN_TYPES_boolean, !1), 
              chop = 5; else if (":" === input[0]) yield buildToken(TOKEN_TYPES_colon), chop++; else if ("," === input[0]) yield buildToken(TOKEN_TYPES_comma), 
              chop++; else if (/^[a-zA-Z\/.-]/g.test(input)) {
                for (var _i2 = 0; _i2 < input.length; _i2++) {
                  var char = input[_i2];
                  if (":" === char || " " === char || "\n" === char || "\r" === char || "," === char) break;
                }
                var name = input.substring(0, _i2);
                chop = _i2, yield buildToken(TOKEN_TYPES_string, name);
              } else yield buildToken(TOKEN_TYPES_invalid);
              chop || (yield buildToken(TOKEN_TYPES_invalid)), col += chop, lastNewline = "\n" === input[0] || "\r" === input[0] && "\n" === input[1], 
              input = input.slice(chop);
            }
            yield buildToken(TOKEN_TYPES_eof);
          }(input), this.fileLoc = fileLoc;
        }
        onComment(token) {
          var value = token.value;
          parse_invariant("string" == typeof value, "expected token value to be a string");
          var comment = value.trim(), versionMatch = comment.match(VERSION_REGEX);
          if (versionMatch) {
            var version = +versionMatch[1];
            if (version > 1) throw new MessageError(`Can't install from a lockfile of version ${version} as you're on an old yarn version that only supports versions up to 1. Run \`$ yarn self-update\` to upgrade to the latest version.`);
          }
          this.comments.push(comment);
        }
        next() {
          var item = this.tokens.next();
          parse_invariant(item, "expected a token");
          var done = item.done, value = item.value;
          if (done || !value) throw new Error("No more tokens");
          return value.type === TOKEN_TYPES_comment ? (this.onComment(value), this.next()) : this.token = value;
        }
        unexpected(msg) {
          throw void 0 === msg && (msg = "Unexpected token"), new SyntaxError(`${msg} ${this.token.line}:${this.token.col} in ${this.fileLoc}`);
        }
        expect(tokType) {
          this.token.type === tokType ? this.next() : this.unexpected();
        }
        eat(tokType) {
          return this.token.type === tokType && (this.next(), !0);
        }
        parse(indent) {
          void 0 === indent && (indent = 0);
          for (var token, obj = nullify(); ;) {
            var propToken = this.token;
            if (propToken.type === TOKEN_TYPES_newline) {
              var nextToken = this.next();
              if (!indent) continue;
              if (nextToken.type !== TOKEN_TYPES_indent) break;
              if (nextToken.value !== indent) break;
              this.next();
            } else if (propToken.type === TOKEN_TYPES_indent) {
              if (propToken.value !== indent) break;
              this.next();
            } else {
              if (propToken.type === TOKEN_TYPES_eof) break;
              if (propToken.type === TOKEN_TYPES_string) {
                var key = propToken.value;
                parse_invariant(key, "Expected a key");
                var keys = [ key ];
                for (this.next(); this.token.type === TOKEN_TYPES_comma; ) {
                  this.next();
                  var keyToken = this.token;
                  keyToken.type !== TOKEN_TYPES_string && this.unexpected("Expected string");
                  var _key = keyToken.value;
                  parse_invariant(_key, "Expected a key"), keys.push(_key), this.next();
                }
                var wasColon = this.token.type === TOKEN_TYPES_colon;
                if (wasColon && this.next(), token = this.token, VALID_PROP_VALUE_TOKENS.indexOf(token.type) >= 0) {
                  for (var _key2 of keys) obj[_key2] = this.token.value;
                  this.next();
                } else if (wasColon) {
                  var val = this.parse(indent + 1);
                  for (var _key3 of keys) obj[_key3] = val;
                  if (indent && this.token.type !== TOKEN_TYPES_indent) break;
                } else this.unexpected("Invalid value type");
              } else this.unexpected(`Unknown token: ${parse_util.inspect(propToken)}`);
            }
          }
          return obj;
        }
      }
      function parse(str, fileLoc) {
        var error, parser = new Parser(str, fileLoc);
        if (parser.next(), !fileLoc.endsWith(".yml")) try {
          return parser.parse();
        } catch (err) {
          error = err;
        }
        try {
          var result = safeLoad(str, {
            schema: FAILSAFE_SCHEMA
          });
          return "object" == typeof result ? result : {};
        } catch (err) {
          throw error || err;
        }
      }
      function lockfile_parse(str, fileLoc) {
        return void 0 === fileLoc && (fileLoc = "lockfile"), function(str) {
          return str.includes("<<<<<<<") && str.includes("=======") && str.includes(">>>>>>>");
        }(str = parse_stripBOM(str)) ? function(str, fileLoc) {
          var variants = function(str) {
            for (var variants = [ [], [] ], lines = str.split(/\r?\n/g), skip = !1; lines.length; ) {
              var line = lines.shift();
              if (line.startsWith("<<<<<<<")) {
                for (;lines.length; ) {
                  var conflictLine = lines.shift();
                  if ("=======" === conflictLine) {
                    skip = !1;
                    break;
                  }
                  skip || conflictLine.startsWith("|||||||") ? skip = !0 : variants[0].push(conflictLine);
                }
                for (;lines.length; ) {
                  var _conflictLine = lines.shift();
                  if (_conflictLine.startsWith(">>>>>>>")) break;
                  variants[1].push(_conflictLine);
                }
              } else variants[0].push(line), variants[1].push(line);
            }
            return [ variants[0].join("\n"), variants[1].join("\n") ];
          }(str);
          try {
            return {
              type: "merge",
              object: Object.assign({}, parse(variants[0], fileLoc), parse(variants[1], fileLoc))
            };
          } catch (err) {
            if (err instanceof SyntaxError) return {
              type: "conflict",
              object: {}
            };
            throw err;
          }
        }(str, fileLoc) : {
          type: "success",
          object: parse(str, fileLoc)
        };
      }
      var package_namespaceObject = JSON.parse('{"Fw":"unknown","i8":"1.22.19"}'), NODE_VERSION = process.version;
      function maybeWrap(str) {
        return "boolean" == typeof str || "number" == typeof str || function(str) {
          return 0 === str.indexOf("true") || 0 === str.indexOf("false") || /[:\s\n\\",\[\]]/g.test(str) || /^[0-9]/g.test(str) || !/^[a-zA-Z]/g.test(str);
        }(str) ? JSON.stringify(str) : str;
      }
      var priorities = {
        name: 1,
        version: 2,
        uid: 3,
        resolved: 4,
        integrity: 5,
        registry: 6,
        dependencies: 7
      };
      function priorityThenAlphaSort(a, b) {
        return priorities[a] || priorities[b] ? (priorities[a] || 100) > (priorities[b] || 100) ? 1 : -1 : sortAlpha(a, b);
      }
      function _stringify(obj, options) {
        if ("object" != typeof obj) throw new TypeError;
        for (var indent = options.indent, lines = [], keys = Object.keys(obj).sort(priorityThenAlphaSort), addedKeys = [], i = 0; i < keys.length; i++) {
          var _key = keys[i], val = obj[_key];
          if (!(null == val || addedKeys.indexOf(_key) >= 0)) {
            var valKeys = [ _key ];
            if ("object" == typeof val) for (var j = i + 1; j < keys.length; j++) {
              var _key2 = keys[j];
              val === obj[_key2] && valKeys.push(_key2);
            }
            var keyLine = valKeys.sort(sortAlpha).map(maybeWrap).join(", ");
            if ("string" == typeof val || "boolean" == typeof val || "number" == typeof val) lines.push(`${keyLine} ${maybeWrap(val)}`); else {
              if ("object" != typeof val) throw new TypeError;
              lines.push(`${keyLine}:\n${_stringify(val, {
                indent: indent + "  "
              })}` + (options.topLevel ? "\n" : ""));
            }
            addedKeys = addedKeys.concat(valKeys);
          }
        }
        return indent + lines.join(`\n${indent}`);
      }
      function stringify(obj, noHeader, enableVersions) {
        var val = _stringify(obj, {
          indent: "",
          topLevel: !0
        });
        if (noHeader) return val;
        var lines = [];
        return lines.push("# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY."), 
        lines.push("# yarn lockfile v1"), enableVersions && (lines.push(`# yarn v${package_namespaceObject.i8}`), 
        lines.push(`# node ${NODE_VERSION}`)), lines.push("\n"), lines.push(val), lines.join("\n");
      }
      var lockfile_invariant = __webpack_require__(46128), lockfile_path = __webpack_require__(71017), lockfile_ssri = __webpack_require__(44240);
      function getName(pattern) {
        return normalizePattern(pattern).name;
      }
      function blankObjectUndefined(obj) {
        return obj && Object.keys(obj).length ? obj : void 0;
      }
      function keyForRemote(remote) {
        return remote.resolved || (remote.reference && remote.hash ? `${remote.reference}#${remote.hash}` : null);
      }
      function implodeEntry(pattern, obj) {
        var inferredName = getName(pattern), integrity = obj.integrity ? function(integrity) {
          return integrity.toString().split(" ").sort().join(" ");
        }(obj.integrity) : "", imploded = {
          name: inferredName === obj.name ? void 0 : obj.name,
          version: obj.version,
          uid: obj.uid === obj.version ? void 0 : obj.uid,
          resolved: obj.resolved,
          registry: "npm" === obj.registry ? void 0 : obj.registry,
          dependencies: blankObjectUndefined(obj.dependencies),
          optionalDependencies: blankObjectUndefined(obj.optionalDependencies),
          permissions: blankObjectUndefined(obj.permissions),
          prebuiltVariants: blankObjectUndefined(obj.prebuiltVariants)
        };
        return integrity && (imploded.integrity = integrity), imploded;
      }
      class Lockfile {
        constructor(_temp) {
          var _ref = void 0 === _temp ? {} : _temp, cache = _ref.cache, source = _ref.source, parseResultType = _ref.parseResultType;
          this.source = source || "", this.cache = cache, this.parseResultType = parseResultType;
        }
        hasEntriesExistWithoutIntegrity() {
          if (!this.cache) return !1;
          for (var _key in this.cache) if (!/^.*@(file:|http)/.test(_key) && this.cache[_key] && !this.cache[_key].integrity) return !0;
          return !1;
        }
        static fromDirectory(dir, reporter) {
          return asyncToGenerator_asyncToGenerator((function*() {
            var lockfile, parseResult, lockfileLoc = lockfile_path.join(dir, "yarn.lock"), rawLockfile = "";
            if ((yield fs_exists(lockfileLoc)) ? (parseResult = lockfile_parse(rawLockfile = yield readFile(lockfileLoc), lockfileLoc), 
            reporter && ("merge" === parseResult.type ? reporter.info(reporter.lang("lockfileMerged")) : "conflict" === parseResult.type && reporter.warn(reporter.lang("lockfileConflict"))), 
            lockfile = parseResult.object) : reporter && reporter.info(reporter.lang("noLockfileFound")), 
            lockfile && lockfile.__metadata) {
              lockfile = {};
            }
            return new Lockfile({
              cache: lockfile,
              source: rawLockfile,
              parseResultType: parseResult && parseResult.type
            });
          }))();
        }
        getLocked(pattern) {
          var cache = this.cache;
          if (cache) {
            var shrunk = pattern in cache && cache[pattern];
            return "string" == typeof shrunk ? this.getLocked(shrunk) : shrunk ? (function(pattern, obj) {
              obj.optionalDependencies = obj.optionalDependencies || {}, obj.dependencies = obj.dependencies || {}, 
              obj.uid = obj.uid || obj.version, obj.permissions = obj.permissions || {}, obj.registry = obj.registry || "npm", 
              obj.name = obj.name || getName(pattern);
              var integrity = obj.integrity;
              integrity && integrity.isIntegrity && (obj.integrity = lockfile_ssri.parse(integrity));
            }(pattern, shrunk), shrunk) : void 0;
          }
        }
        removePattern(pattern) {
          var cache = this.cache;
          cache && delete cache[pattern];
        }
        getLockfile(patterns) {
          var lockfile = {}, seen = new Map, sortedPatternsKeys = Object.keys(patterns).sort(sortAlpha);
          for (var pattern of sortedPatternsKeys) {
            var pkg = patterns[pattern], remote = pkg._remote, ref = pkg._reference;
            lockfile_invariant(ref, "Package is missing a reference"), lockfile_invariant(remote, "Package is missing a remote");
            var remoteKey = keyForRemote(remote), seenPattern = remoteKey && seen.get(remoteKey);
            if (seenPattern) lockfile[pattern] = seenPattern, seenPattern.name || getName(pattern) === pkg.name || (seenPattern.name = pkg.name); else {
              var obj = implodeEntry(pattern, {
                name: pkg.name,
                version: pkg.version,
                uid: pkg._uid,
                resolved: remote.resolved,
                integrity: remote.integrity,
                registry: remote.registry,
                dependencies: pkg.dependencies,
                peerDependencies: pkg.peerDependencies,
                optionalDependencies: pkg.optionalDependencies,
                permissions: ref.permissions,
                prebuiltVariants: pkg.prebuiltVariants
              });
              lockfile[pattern] = obj, remoteKey && seen.set(remoteKey, obj);
            }
          }
          return lockfile;
        }
      }
      var yarn_version_fs = __webpack_require__(57147), yarn_version_path = __webpack_require__(71017);
      function _getInstallationMethod() {
        return (_getInstallationMethod = asyncToGenerator_asyncToGenerator((function*() {
          var installationMethod = package_namespaceObject.Fw;
          try {
            var manifestPath = yarn_version_path.join(__dirname, "..", "package.json");
            if (yarn_version_fs.existsSync(manifestPath)) {
              var manifest = yield readJson(manifestPath);
              manifest.installationMethod && (installationMethod = manifest.installationMethod);
            }
          } catch (e) {}
          return installationMethod;
        }))).apply(this, arguments);
      }
      var yarn_registry_path = __webpack_require__(71017), DEFAULTS = {
        "version-tag-prefix": "v",
        "version-git-tag": !0,
        "version-commit-hooks": !0,
        "version-git-sign": !1,
        "version-git-message": "v%s",
        "init-version": "1.0.0",
        "init-license": "MIT",
        "save-prefix": "^",
        "bin-links": !0,
        "ignore-scripts": !1,
        "ignore-optional": !1,
        registry: YARN_REGISTRY,
        "strict-ssl": !0,
        "user-agent": [ `yarn/${package_namespaceObject.i8}`, "npm/?", `node/${process.version}`, process.platform, process.arch ].join(" ")
      }, RELATIVE_KEYS = [ "yarn-offline-mirror", "cache-folder", "global-folder", "offline-cache-folder", "yarn-path" ], FOLDER_KEY = [ "yarn-offline-mirror", "cache-folder", "global-folder", "offline-cache-folder" ], npmMap = {
        "version-git-sign": "sign-git-tag",
        "version-tag-prefix": "tag-version-prefix",
        "version-git-tag": "git-tag-version",
        "version-commit-hooks": "commit-hooks",
        "version-git-message": "message"
      };
      class YarnRegistry extends NpmRegistry {
        constructor(cwd, registries, requestManager, reporter, enableDefaultRc, extraneousRcFiles) {
          super(cwd, registries, requestManager, reporter, enableDefaultRc, extraneousRcFiles), 
          this.homeConfigLoc = yarn_registry_path.join(user_home_dir, ".yarnrc"), this.homeConfig = {};
        }
        getOption(key) {
          var val = this.config[key];
          return void 0 === val && (val = this.registries.npm.getOption(npmMap[key])), void 0 === val && (val = this.registries.npm.getOption(key)), 
          void 0 === val && (val = DEFAULTS[key]), val;
        }
        loadConfig() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var locations = yield _this.getPossibleConfigLocations("yarnrc", _this.reporter);
            for (var _ref of locations) {
              var isHome = _ref[0], loc = _ref[1], config = lockfile_parse(_ref[2], loc).object;
              for (var key of (isHome && (_this.homeConfig = config), RELATIVE_KEYS)) {
                var valueLoc = config[key];
                if (!_this.config[key] && valueLoc) {
                  var resolvedLoc = config[key] = yarn_registry_path.resolve(yarn_registry_path.dirname(loc), valueLoc);
                  -1 !== FOLDER_KEY.indexOf(key) && (yield mkdirp(resolvedLoc));
                }
              }
              var env = config.env;
              if (env) {
                var existingEnv = _this.config.env;
                existingEnv && (_this.config.env = Object.assign({}, env, existingEnv));
              }
              _this.config = Object.assign({}, config, _this.config);
            }
            _this.config = Object.assign({}, DEFAULTS, _this.config);
          }))();
        }
        saveHomeConfig(config) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var key in YarnRegistry.normalizeConfig(config), config) {
              var val = config[key];
              _this2.homeConfig[key] === _this2.config[key] && (_this2.config[key] = val), _this2.homeConfig[key] = config[key];
            }
            yield writeFilePreservingEol(_this2.homeConfigLoc, `${stringify(_this2.homeConfig)}\n`);
          }))();
        }
      }
      YarnRegistry.filename = "yarn.json";
      var registries = {
        npm: NpmRegistry,
        yarn: YarnRegistry
      }, registryNames = Object.keys(registries), notYetImplemented = () => Promise.reject(new Error("This command is not implemented yet."));
      function access_setFlags(commander) {
        commander.description("Has not been implemented yet");
      }
      var access_buildSubCommands = _build_sub_commands("access", {
        public: notYetImplemented,
        restricted: notYetImplemented,
        grant: notYetImplemented,
        revoke: notYetImplemented,
        lsPackages: notYetImplemented,
        lsCollaborators: notYetImplemented,
        edit: notYetImplemented
      }, [ "WARNING: This command yet to be implemented.", "public [<package>]", "restricted [<package>]", "grant <read-only|read-write> <scope:team> [<package>]", "revoke <scope:team> [<package>]", "ls-packages [<user>|<scope>|<scope:team>]", "ls-collaborators [<package> [<user>]]", "edit [<package>]" ]), access_run = access_buildSubCommands.run, access_hasWrapper = access_buildSubCommands.hasWrapper, access_examples = access_buildSubCommands.examples, workspace_layout_semver = __webpack_require__(92878);
      class WorkspaceLayout {
        constructor(workspaces, config) {
          this.workspaces = workspaces, this.config = config;
        }
        getWorkspaceManifest(key) {
          return this.workspaces[key];
        }
        getManifestByPattern(pattern) {
          var _normalizePattern = normalizePattern(pattern), name = _normalizePattern.name, range = _normalizePattern.range, workspace = this.getWorkspaceManifest(name);
          return workspace && workspace_layout_semver.satisfies(workspace.manifest.version, range, this.config.looseSemver) ? workspace : null;
        }
      }
      function explodeHashedUrl(url) {
        var parts = url.split("#");
        return {
          hash: parts[1] || "",
          url: parts[0]
        };
      }
      var guess_name_url = __webpack_require__(57310);
      function cleanup(name) {
        return (name = name.replace(/-\d+\.\d+\.\d+/, "")).replace(/\.git$|\.zip$|\.tar\.gz$|\.tar\.bz2$/, "");
      }
      function guessNameFallback(source) {
        var parts = source.split("/");
        return cleanup(parts[parts.length - 1]);
      }
      function guessName(source) {
        try {
          var parsed = guess_name_url.parse(source);
          if (!parsed.pathname) return guessNameFallback(source);
          var parts = parsed.pathname.split("/");
          for (var part of parts) if (part.match(/\.git$/)) return cleanup(part);
          return null == parsed.host ? cleanup(parts[parts.length - 1]) : parts.length > 2 ? cleanup(parts[2]) : parts.length > 1 ? cleanup(parts[1]) : guessNameFallback(source);
        } catch (e) {
          return guessNameFallback(source);
        }
      }
      class ExoticResolver extends BaseResolver {
        static isVersion(pattern) {
          var proto = this.protocol;
          if (proto) return pattern.startsWith(`${proto}:`);
          throw new Error("No protocol specified");
        }
      }
      var child = __webpack_require__(32081), child_fs = __webpack_require__(57147), child_path = __webpack_require__(71017), queue = new BlockingQueue("child", 5), uid = 0;
      promisify(child.exec);
      function validate(program, opts) {
        if (void 0 === opts && (opts = {}), !program.match(/[\\\/]/) && "win32" === process.platform && process.env.PATHEXT) {
          var cwd = opts.cwd || process.cwd(), pathext = process.env.PATHEXT;
          for (var ext of pathext.split(";")) {
            var candidate = child_path.join(cwd, `${program}${ext}`);
            if (child_fs.existsSync(candidate)) throw new Error(`Potentially dangerous call to "${program}" in ${cwd}`);
          }
        }
      }
      function forkp(program, args, opts) {
        validate(program, opts);
        var key = String(++uid);
        return new Promise(((resolve, reject) => {
          var proc = child.fork(program, args, opts);
          spawnedProcesses[key] = proc, proc.on("error", (error => {
            reject(error);
          })), proc.on("close", (exitCode => {
            resolve(exitCode);
          }));
        }));
      }
      function spawnp(program, args, opts) {
        validate(program, opts);
        var key = String(++uid);
        return new Promise(((resolve, reject) => {
          var proc = child.spawn(program, args, opts);
          spawnedProcesses[key] = proc, proc.on("error", (error => {
            reject(error);
          })), proc.on("close", (exitCode => {
            resolve(exitCode);
          }));
        }));
      }
      var spawnedProcesses = {};
      function child_spawn(program, args, opts, onData) {
        void 0 === opts && (opts = {});
        var key = opts.cwd || String(++uid);
        return queue.push(key, (() => new Promise(((resolve, reject) => {
          validate(program, opts);
          var proc = child.spawn(program, args, opts);
          spawnedProcesses[key] = proc;
          var processingDone = !1, processClosed = !1, err = null, stdout = "";
          function updateStdout(chunk) {
            stdout += chunk, onData && onData(chunk);
          }
          function finish() {
            delete spawnedProcesses[key], err ? reject(err) : resolve(stdout.trim());
          }
          proc.on("error", (err => {
            "ENOENT" === err.code ? reject(new ProcessSpawnError(`Couldn't find the binary ${program}`, err.code, program)) : reject(err);
          })), "function" == typeof opts.process ? opts.process(proc, updateStdout, reject, (function() {
            processClosed ? finish() : processingDone = !0;
          })) : (proc.stderr && proc.stderr.on("data", updateStdout), proc.stdout && proc.stdout.on("data", updateStdout), 
          processingDone = !0), proc.on("close", ((code, signal) => {
            (signal || code >= 1) && ((err = new ProcessTermError([ "Command failed.", signal ? `Exit signal: ${signal}` : `Exit code: ${code}`, `Command: ${program}`, `Arguments: ${args.join(" ")}`, `Directory: ${opts.cwd || process.cwd()}`, `Output:\n${stdout.trim()}` ].join("\n"))).EXIT_SIGNAL = signal, 
            err.EXIT_CODE = code), processingDone || err ? finish() : processClosed = !0;
          }));
        }))));
      }
      var git_spawn_path = __webpack_require__(71017), BATCH_MODE_ARGS = new Map([ [ "ssh", "-oBatchMode=yes" ], [ "plink", "-batch" ] ]), env = _extends({
        GIT_ASKPASS: "",
        GIT_TERMINAL_PROMPT: 0
      }, process.env), sshCommand = env.GIT_SSH || "ssh", sshExecutable = git_spawn_path.basename(sshCommand.toLowerCase(), ".exe"), sshBatchArgs = BATCH_MODE_ARGS.get(sshExecutable);
      !env.GIT_SSH_COMMAND && sshBatchArgs && (env.GIT_SSH_VARIANT = sshExecutable, env.GIT_SSH_COMMAND = `"${sshCommand}" ${sshBatchArgs}`);
      var spawn = function(args, opts) {
        return void 0 === opts && (opts = {}), child_spawn("git", args, _extends({}, opts, {
          env: env
        }));
      }, git_ref_resolver_semver = __webpack_require__(92878), GIT_REF_LINE_REGEXP = /^([a-fA-F0-9]+)\s+(refs\/(?:tags|heads|pull|remotes)\/.*)$/, COMMIT_SHA_REGEXP = /^[a-f0-9]{5,40}$/, REF_NAME_REGEXP = /^refs\/(tags|heads)\/(.+)$/, isCommitSha = target => COMMIT_SHA_REGEXP.test(target), tryRef = (refs, ref) => {
        var sha = refs.get(ref);
        return sha ? {
          sha: sha,
          ref: ref
        } : null;
      }, findSemver = (version, config, namesList) => config.resolveConstraints(namesList, version), tryVersionAsTagSemver = function() {
        var _ref12 = asyncToGenerator_asyncToGenerator((function*(_ref11, names) {
          var version = _ref11.version, config = _ref11.config, refs = _ref11.refs, result = yield findSemver(version.replace(/^semver:/, ""), config, names.tags);
          return result ? tryRef(refs, `refs/tags/${result}`) : null;
        }));
        return function() {
          return _ref12.apply(this, arguments);
        };
      }(), tryVersionAsBranchSemver = function() {
        var _ref14 = asyncToGenerator_asyncToGenerator((function*(_ref13, names) {
          var version = _ref13.version, config = _ref13.config, refs = _ref13.refs, result = yield findSemver(version.replace(/^semver:/, ""), config, names.heads);
          return result ? tryRef(refs, `refs/heads/${result}`) : null;
        }));
        return function() {
          return _ref14.apply(this, arguments);
        };
      }(), tryVersionAsSemverRange = function() {
        var _ref15 = asyncToGenerator_asyncToGenerator((function*(options) {
          var names = (_ref10 => {
            var config = _ref10.config, refs = _ref10.refs, names = {
              tags: [],
              heads: []
            };
            for (var ref of refs.keys()) {
              var match = REF_NAME_REGEXP.exec(ref);
              if (match) {
                var type = match[1], name = match[2];
                git_ref_resolver_semver.valid(name, config.looseSemver) && names[type].push(name);
              }
            }
            return names;
          })(options);
          return (yield tryVersionAsTagSemver(options, names)) || tryVersionAsBranchSemver(options, names);
        }));
        return function() {
          return _ref15.apply(this, arguments);
        };
      }(), VERSION_RESOLUTION_STEPS = [ _ref3 => {
        var version = _ref3.version, git = _ref3.git;
        return "" === version.trim() ? git.resolveDefaultBranch() : Promise.resolve(null);
      }, _ref => {
        var version = _ref.version, refs = _ref.refs, git = _ref.git, lowercaseVersion = version.toLowerCase();
        if (!isCommitSha(lowercaseVersion)) return Promise.resolve(null);
        for (var _ref2 of refs.entries()) {
          var ref = _ref2[0], _sha = _ref2[1];
          if (_sha.startsWith(lowercaseVersion)) return Promise.resolve({
            sha: _sha,
            ref: ref
          });
        }
        return git.resolveCommit(lowercaseVersion);
      }, _ref5 => {
        var version = _ref5.version, refs = _ref5.refs;
        return version.startsWith("refs/") ? tryRef(refs, version) : null;
      }, _ref6 => {
        var version = _ref6.version, refs = _ref6.refs;
        return tryRef(refs, `refs/tags/${version}`);
      }, _ref7 => {
        var version = _ref7.version, refs = _ref7.refs;
        return tryRef(refs, `refs/pull/${version}`);
      }, _ref8 => {
        var version = _ref8.version, refs = _ref8.refs;
        return tryRef(refs, `refs/heads/${version}`);
      }, tryVersionAsSemverRange, _ref4 => {
        var version = _ref4.version, git = _ref4.git;
        return "*" === version ? git.resolveDefaultBranch() : Promise.resolve(null);
      }, _ref9 => {
        var version = _ref9.version, refs = _ref9.refs;
        return tryRef(refs, `refs/${version}`);
      } ], resolveVersion = function() {
        var _ref16 = asyncToGenerator_asyncToGenerator((function*(options) {
          for (var testFunction of VERSION_RESOLUTION_STEPS) {
            var result = yield testFunction(options);
            if (null !== result) return result;
          }
          return null;
        }));
        return function() {
          return _ref16.apply(this, arguments);
        };
      }(), parseRefs = stdout => {
        var refs = new Map, refLines = stdout.split("\n");
        for (var line of refLines) {
          var match = GIT_REF_LINE_REGEXP.exec(line);
          if (match) {
            var _sha2 = match[1], name = removeSuffix(match[2], "^{}");
            refs.set(name, _sha2);
          }
        }
        return refs;
      }, crypto_crypto = __webpack_require__(6113), stream = __webpack_require__(12781);
      function crypto_hash(content, type) {
        return void 0 === type && (type = "md5"), crypto_crypto.createHash(type).update(content).digest("hex");
      }
      class HashStream extends stream.Transform {
        constructor(options) {
          super(options), this._hash = crypto_crypto.createHash("sha1"), this._updated = !1;
        }
        _transform(chunk, encoding, callback) {
          this._updated = !0, this._hash.update(chunk), callback(null, chunk);
        }
        getHash() {
          return this._hash.digest("hex");
        }
        test(sum) {
          return this._updated && sum === this.getHash();
        }
      }
      var git_invariant = __webpack_require__(46128), StringDecoder = __webpack_require__(71576).StringDecoder, tarFs = __webpack_require__(95931), tarStream = __webpack_require__(75494), git_url = __webpack_require__(57310), createWriteStream = __webpack_require__(57147).createWriteStream, GIT_VALID_REF_LINE_REGEXP = /^([a-fA-F0-9]+|ref)/, validRef = line => GIT_VALID_REF_LINE_REGEXP.exec(line), supportsArchiveCache = nullify({
        "github.com": !1
      }), handleSpawnError = err => {
        if (err instanceof ProcessSpawnError) throw err;
      }, SHORTHAND_SERVICES = nullify({
        "github:": parsedUrl => _extends({}, parsedUrl, {
          slashes: !0,
          auth: "git",
          protocol: "ssh:",
          host: "github.com",
          hostname: "github.com",
          pathname: `/${parsedUrl.hostname}${parsedUrl.pathname}`
        }),
        "bitbucket:": parsedUrl => _extends({}, parsedUrl, {
          slashes: !0,
          auth: "git",
          protocol: "ssh:",
          host: "bitbucket.com",
          hostname: "bitbucket.com",
          pathname: `/${parsedUrl.hostname}${parsedUrl.pathname}`
        })
      });
      class Git {
        constructor(config, gitUrl, hash) {
          this.supportsArchive = !1, this.fetched = !1, this.config = config, this.reporter = config.reporter, 
          this.hash = hash, this.ref = hash, this.gitUrl = gitUrl, this.cwd = this.config.getTemp(crypto_hash(this.gitUrl.repository));
        }
        static npmUrlToGitUrl(npmUrl) {
          npmUrl = removePrefix(npmUrl, "git+");
          var repository, parsed = git_url.parse(npmUrl), expander = parsed.protocol && SHORTHAND_SERVICES[parsed.protocol];
          if (expander && (parsed = expander(parsed)), "ssh:" === parsed.protocol && parsed.hostname && parsed.path && parsed.path.startsWith("/:") && null === parsed.port) {
            var auth = parsed.auth ? parsed.auth + "@" : "", pathname = parsed.path.slice("/:".length);
            return {
              hostname: parsed.hostname,
              protocol: parsed.protocol,
              repository: `${auth}${parsed.hostname}:${pathname}`
            };
          }
          return repository = "file:" === parsed.protocol ? parsed.path : git_url.format(_extends({}, parsed, {
            hash: ""
          })), {
            hostname: parsed.hostname || null,
            protocol: parsed.protocol || "file:",
            repository: repository || ""
          };
        }
        static hasArchiveCapability(ref) {
          return asyncToGenerator_asyncToGenerator((function*() {
            var hostname = ref.hostname;
            if ("ssh:" !== ref.protocol || null == hostname) return !1;
            if (hostname in supportsArchiveCache) return supportsArchiveCache[hostname];
            try {
              throw yield spawn([ "archive", `--remote=${ref.repository}`, "HEAD", Date.now() + "" ]), 
              new Error;
            } catch (err) {
              handleSpawnError(err);
              var supports = err.message.indexOf("did not match any files") >= 0;
              return supportsArchiveCache[hostname] = supports;
            }
          }))();
        }
        static repoExists(ref) {
          return asyncToGenerator_asyncToGenerator((function*() {
            var isLocal = "file:" === ref.protocol;
            try {
              return isLocal ? yield spawn([ "show-ref", "-t" ], {
                cwd: ref.repository
              }) : yield spawn([ "ls-remote", "-t", ref.repository ]), !0;
            } catch (err) {
              return handleSpawnError(err), !1;
            }
          }))();
        }
        static replaceProtocol(ref, protocol) {
          return {
            hostname: ref.hostname,
            protocol: protocol,
            repository: ref.repository.replace(/^(?:git|http):/, protocol)
          };
        }
        static secureGitUrl(ref, hash, reporter) {
          return asyncToGenerator_asyncToGenerator((function*() {
            if (isCommitSha(hash)) return ref;
            if ("git:" === ref.protocol) {
              var secureUrl = Git.replaceProtocol(ref, "https:");
              return (yield Git.repoExists(secureUrl)) ? secureUrl : (reporter.warn(reporter.lang("downloadGitWithoutCommit", ref.repository)), 
              ref);
            }
            if ("http:" === ref.protocol) {
              var secureRef = Git.replaceProtocol(ref, "https:");
              return (yield Git.repoExists(secureRef)) ? secureRef : (reporter.warn(reporter.lang("downloadHTTPWithoutCommit", ref.repository)), 
              ref);
            }
            return ref;
          }))();
        }
        archive(dest) {
          return this.supportsArchive ? this._archiveViaRemoteArchive(dest) : this._archiveViaLocalFetched(dest);
        }
        _archiveViaRemoteArchive(dest) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var hashStream = new HashStream;
            return yield spawn([ "archive", `--remote=${_this.gitUrl.repository}`, _this.ref ], {
              process(proc, resolve, reject, done) {
                var writeStream = createWriteStream(dest);
                proc.on("error", reject), writeStream.on("error", reject), writeStream.on("end", done), 
                writeStream.on("open", (function() {
                  proc.stdout.pipe(hashStream).pipe(writeStream);
                })), writeStream.once("finish", done);
              }
            }), hashStream.getHash();
          }))();
        }
        _archiveViaLocalFetched(dest) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var hashStream = new HashStream;
            return yield spawn([ "archive", _this2.hash ], {
              cwd: _this2.cwd,
              process(proc, resolve, reject, done) {
                var writeStream = createWriteStream(dest);
                proc.on("error", reject), writeStream.on("error", reject), writeStream.on("open", (function() {
                  proc.stdout.pipe(hashStream).pipe(writeStream);
                })), writeStream.once("finish", done);
              }
            }), hashStream.getHash();
          }))();
        }
        clone(dest) {
          return this.supportsArchive ? this._cloneViaRemoteArchive(dest) : this._cloneViaLocalFetched(dest);
        }
        _cloneViaRemoteArchive(dest) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            yield spawn([ "archive", `--remote=${_this3.gitUrl.repository}`, _this3.ref ], {
              process(proc, update, reject, done) {
                var extractor = tarFs.extract(dest, {
                  dmode: 365,
                  fmode: 292
                });
                extractor.on("error", reject), extractor.on("finish", done), proc.stdout.pipe(extractor), 
                proc.on("error", reject);
              }
            });
          }))();
        }
        _cloneViaLocalFetched(dest) {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            yield spawn([ "archive", _this4.hash ], {
              cwd: _this4.cwd,
              process(proc, resolve, reject, done) {
                var extractor = tarFs.extract(dest, {
                  dmode: 365,
                  fmode: 292
                });
                extractor.on("error", reject), extractor.on("finish", done), proc.stdout.pipe(extractor);
              }
            });
          }))();
        }
        fetch() {
          var _this5 = this, gitUrl = this.gitUrl, cwd = this.cwd;
          return lockQueue.push(gitUrl.repository, asyncToGenerator_asyncToGenerator((function*() {
            (yield fs_exists(cwd)) ? (yield spawn([ "fetch", "--tags" ], {
              cwd: cwd
            }), yield spawn([ "pull" ], {
              cwd: cwd
            })) : yield spawn([ "clone", gitUrl.repository, cwd ]), _this5.fetched = !0;
          })));
        }
        getFile(filename) {
          return this.supportsArchive ? this._getFileFromArchive(filename) : this._getFileFromClone(filename);
        }
        _getFileFromArchive(filename) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            try {
              return yield spawn([ "archive", `--remote=${_this6.gitUrl.repository}`, _this6.ref, filename ], {
                process(proc, update, reject, done) {
                  var parser = tarStream.extract();
                  parser.on("error", reject), parser.on("finish", done), parser.on("entry", ((header, stream, next) => {
                    var decoder = new StringDecoder("utf8"), fileContent = "";
                    stream.on("data", (buffer => {
                      fileContent += decoder.write(buffer);
                    })), stream.on("end", (() => {
                      var remaining = decoder.end();
                      update(fileContent + remaining), next();
                    })), stream.resume();
                  })), proc.stdout.pipe(parser);
                }
              });
            } catch (err) {
              if (err.message.indexOf("did not match any files") >= 0) return !1;
              throw err;
            }
          }))();
        }
        _getFileFromClone(filename) {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            git_invariant(_this7.fetched, "Repo not fetched");
            try {
              return yield spawn([ "show", `${_this7.hash}:${filename}` ], {
                cwd: _this7.cwd
              });
            } catch (err) {
              return handleSpawnError(err), !1;
            }
          }))();
        }
        init() {
          var _this8 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return _this8.gitUrl = yield Git.secureGitUrl(_this8.gitUrl, _this8.hash, _this8.reporter), 
            yield _this8.setRefRemote(), "" !== _this8.ref && (yield Git.hasArchiveCapability(_this8.gitUrl)) ? _this8.supportsArchive = !0 : yield _this8.fetch(), 
            _this8.hash;
          }))();
        }
        setRefRemote() {
          var _this9 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var stdout;
            stdout = "file:" === _this9.gitUrl.protocol ? yield spawn([ "show-ref", "--tags", "--heads" ], {
              cwd: _this9.gitUrl.repository
            }) : yield spawn([ "ls-remote", "--tags", "--heads", _this9.gitUrl.repository ]);
            var refs = parseRefs(stdout);
            return _this9.setRef(refs);
          }))();
        }
        setRefHosted(hostedRefsList) {
          var refs = parseRefs(hostedRefsList);
          return this.setRef(refs);
        }
        resolveDefaultBranch() {
          var _this10 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var isLocal = "file:" === _this10.gitUrl.protocol;
            try {
              var stdout;
              if (isLocal) {
                stdout = yield spawn([ "show-ref", "HEAD" ], {
                  cwd: _this10.gitUrl.repository
                });
                var sha = parseRefs(stdout).values().next().value;
                if (sha) return {
                  sha: sha,
                  ref: void 0
                };
                throw new Error("Unable to find SHA for git HEAD");
              }
              var lines = (stdout = yield spawn([ "ls-remote", "--symref", _this10.gitUrl.repository, "HEAD" ])).split("\n").filter(validRef), ref = lines[0].split(/\s+/)[1];
              return {
                sha: lines[1].split(/\s+/)[0],
                ref: ref
              };
            } catch (err) {
              return handleSpawnError(err), {
                sha: (yield spawn([ "ls-remote", _this10.gitUrl.repository, "HEAD" ])).split("\n").filter(validRef)[0].split(/\s+/)[0],
                ref: void 0
              };
            }
          }))();
        }
        resolveCommit(shaToResolve) {
          var _this11 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            try {
              yield _this11.fetch();
              var revListArgs = [ "rev-list", "-n", "1", "--no-abbrev-commit", "--format=oneline", shaToResolve ];
              return {
                sha: (yield spawn(revListArgs, {
                  cwd: _this11.cwd
                })).split(/\s+/)[0],
                ref: void 0
              };
            } catch (err) {
              return handleSpawnError(err), null;
            }
          }))();
        }
        setRef(refs) {
          var _this12 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var version = _this12.hash, resolvedResult = yield resolveVersion({
              config: _this12.config,
              git: _this12,
              version: version,
              refs: refs
            });
            if (!resolvedResult) throw new MessageError(_this12.reporter.lang("couldntFindMatch", version, Array.from(refs.keys()).join(","), _this12.gitUrl.repository));
            return _this12.hash = resolvedResult.sha, _this12.ref = resolvedResult.ref || "", 
            _this12.hash;
          }))();
        }
      }
      var urlParse = __webpack_require__(57310).parse, GIT_HOSTS = [ "github.com", "gitlab.com", "bitbucket.com", "bitbucket.org" ], GIT_PATTERN_MATCHERS = [ /^git:/, /^git\+.+:/, /^ssh:/, /^https?:.+\.git$/, /^https?:.+\.git#.+/ ];
      class GitResolver extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment);
          var _versionUtil$explodeH = explodeHashedUrl(fragment), url = _versionUtil$explodeH.url, hash = _versionUtil$explodeH.hash;
          this.url = url, this.hash = hash;
        }
        static isVersion(pattern) {
          for (var matcher of GIT_PATTERN_MATCHERS) if (matcher.test(pattern)) return !0;
          var _urlParse = urlParse(pattern), hostname = _urlParse.hostname, path = _urlParse.path;
          return !!(hostname && path && GIT_HOSTS.indexOf(hostname) >= 0) && 2 === path.split("/").filter((p => !!p)).length;
        }
        resolve(forked) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var url = _this.url, shrunk = (urlParse(url), _this.request.getLocked("git"));
            if (shrunk) return shrunk;
            var config = _this.config, gitUrl = Git.npmUrlToGitUrl(url), client = new Git(config, gitUrl, _this.hash), commit = yield client.init();
            function tryRegistry() {
              return _tryRegistry.apply(this, arguments);
            }
            function _tryRegistry() {
              return _tryRegistry = asyncToGenerator_asyncToGenerator((function*(registry) {
                var filename = registries[registry].filename, file = yield client.getFile(filename);
                if (!file) return null;
                var json = yield config.readJson(`${url}/${filename}`, (() => JSON.parse(file)));
                return json._uid = commit, json._remote = {
                  resolved: `${url}#${commit}`,
                  type: "git",
                  reference: url,
                  hash: commit,
                  registry: registry
                }, json;
              })), _tryRegistry.apply(this, arguments);
            }
            var file = yield tryRegistry(_this.registry);
            if (file) return file;
            for (var registry in registries) if (registry !== _this.registry) {
              var _file = yield tryRegistry(registry);
              if (_file) return _file;
            }
            return {
              name: guessName(url),
              version: "0.0.0",
              _uid: commit,
              _remote: {
                resolved: `${url}#${commit}`,
                type: "git",
                reference: url,
                hash: commit,
                registry: "npm"
              }
            };
          }))();
        }
      }
      var file_resolver_path = __webpack_require__(71017), file_resolver_invariant = __webpack_require__(46128), uuid = __webpack_require__(67730);
      class FileResolver extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment), this.loc = removePrefix(fragment, "file:");
        }
        static isVersion(pattern) {
          return super.isVersion.call(this, pattern) || this.prefixMatcher.test(pattern) || file_resolver_path.isAbsolute(pattern);
        }
        resolve() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var loc = _this.loc;
            if (file_resolver_path.isAbsolute(loc) || (loc = file_resolver_path.resolve(_this.config.lockfileFolder, loc)), 
            _this.config.linkFileDependencies) {
              var _manifest = {
                _uid: "",
                name: "",
                version: "0.0.0",
                _registry: "npm"
              };
              return _manifest._remote = {
                type: "link",
                registry: "npm",
                hash: null,
                reference: loc
              }, _manifest._uid = _manifest.version, _manifest;
            }
            if (!(yield fs_exists(loc))) throw new MessageError(_this.reporter.lang("doesntExist", loc, _this.pattern.split("@")[0]));
            var manifest = yield asyncToGenerator_asyncToGenerator((function*() {
              try {
                return yield _this.config.readManifest(loc, _this.registry);
              } catch (e) {
                if ("ENOENT" === e.code) return {
                  name: file_resolver_path.dirname(loc),
                  version: "0.0.0",
                  _uid: "0.0.0",
                  _registry: "npm"
                };
                throw e;
              }
            }))(), registry = manifest._registry;
            return file_resolver_invariant(registry, "expected registry"), manifest._remote = {
              type: "copy",
              registry: registry,
              hash: `${uuid.v4()}-${(new Date).getTime()}`,
              reference: loc
            }, manifest._uid = manifest.version, manifest;
          }))();
        }
      }
      FileResolver.protocol = "file", FileResolver.prefixMatcher = /^\.{1,2}\//;
      var link_resolver_path = __webpack_require__(71017);
      class LinkResolver extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment), this.loc = removePrefix(fragment, "link:");
        }
        resolve() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var loc = _this.loc;
            link_resolver_path.isAbsolute(loc) || (loc = link_resolver_path.resolve(_this.config.lockfileFolder, loc));
            var name = link_resolver_path.basename(loc), manifest = (yield fs_exists(`${loc}/package.json`)) && loc !== _this.config.lockfileFolder ? yield _this.config.readManifest(loc, _this.registry) : {
              _uid: "",
              name: name,
              version: "0.0.0",
              _registry: "npm"
            };
            return manifest._remote = {
              type: "link",
              registry: "npm",
              hash: null,
              reference: loc
            }, manifest._uid = manifest.version, manifest;
          }))();
        }
      }
      LinkResolver.protocol = "link";
      var resolve_relative_invariant = __webpack_require__(46128), resolve_relative_path = __webpack_require__(71017);
      var util_path = __webpack_require__(71017), validateLicense = __webpack_require__(88556), PARENT_PATH = /^\.\.([\\\/]|$)/;
      function isValidLicense(license) {
        return !!license && validateLicense(license).validForNewPackages;
      }
      function isValidBin(bin) {
        return !util_path.isAbsolute(bin) && !PARENT_PATH.test(util_path.normalize(bin));
      }
      function stringifyPerson(person) {
        if (!person || "object" != typeof person) return person;
        var parts = [];
        person.name && parts.push(person.name);
        var email = person.email || person.mail;
        "string" == typeof email && parts.push(`<${email}>`);
        var url = person.url || person.web;
        return "string" == typeof url && parts.push(`(${url})`), parts.join(" ");
      }
      function normalizePerson(person) {
        return function(person) {
          if ("string" != typeof person) return person;
          var obj = {}, name = person.match(/^([^\(<]+)/);
          name && (name = name[0].trim()) && (obj.name = name);
          var email = person.match(/<([^>]+)>/);
          email && (obj.email = email[1]);
          var url = person.match(/\(([^\)]+)\)/);
          return url && (obj.url = url[1]), obj;
        }(stringifyPerson(person));
      }
      function extractRepositoryUrl(repository) {
        return repository && "object" == typeof repository ? repository.url : repository;
      }
      var typos = {
        autohr: "author",
        autor: "author",
        contributers: "contributors",
        depdenencies: "dependencies",
        dependancies: "dependencies",
        dependecies: "dependencies",
        depends: "dependencies",
        "dev-dependencies": "devDependencies",
        devDependences: "devDependencies",
        devDepenencies: "devDependencies",
        devEependencies: "devDependencies",
        devdependencies: "devDependencies",
        hampage: "homepage",
        hompage: "homepage",
        prefereGlobal: "preferGlobal",
        publicationConfig: "publishConfig",
        repo: "repository",
        repostitory: "repository",
        script: "scripts"
      }, isBuiltinModule = __webpack_require__(88707), strings = [ "name", "version" ], dependencyKeys = [ "optionalDependencies", "dependencies", "devDependencies" ];
      function isValidName(name) {
        return !name.match(/[\/@\s\+%:]/) && encodeURIComponent(name) === name;
      }
      function isValidPackageName(name) {
        return isValidName(name) || function(name) {
          if ("@" !== name[0]) return !1;
          var parts = name.slice(1).split("/");
          return 2 === parts.length && isValidName(parts[0]) && isValidName(parts[1]);
        }(name);
      }
      function cleanDependencies(info, isRoot, reporter, warn) {
        var depTypes = [];
        for (var type of dependencyKeys) {
          var deps = info[type];
          deps && "object" == typeof deps && depTypes.push([ type, deps ]);
        }
        var nonTrivialDeps = new Map;
        for (var _ref of depTypes) {
          var _type = _ref[0], _deps = _ref[1];
          for (var name of Object.keys(_deps)) {
            var version = _deps[name];
            !nonTrivialDeps.has(name) && version && "*" !== version && nonTrivialDeps.set(name, {
              type: _type,
              version: version
            });
          }
        }
        var setDeps = new Set;
        for (var _ref2 of depTypes) {
          var _type2 = _ref2[0], _deps2 = _ref2[1];
          for (var _name of Object.keys(_deps2)) {
            var _version = _deps2[_name], dep = nonTrivialDeps.get(_name);
            dep && (_version && "*" !== _version && _version !== dep.version && isRoot && warn(reporter.lang("manifestDependencyCollision", dep.type, _name, dep.version, _type2, _version)), 
            _version = dep.version), setDeps.has(_name) ? delete _deps2[_name] : (_deps2[_name] = _version, 
            setDeps.add(_name));
          }
        }
      }
      var licenses = {
        "Apache-2.0": new RegExp("(licensed under the apache license version the license you may not use this file except in compliance with the license you may obtain a copy of the license at http www apache org licenses license unless required by applicable law or agreed to in writing software distributed under the license is distributed on an as is basis without warranties or conditions of any kind either express or implied see the license for the specific language governing permissions and limitations under the license$|apache license version january http www apache org licenses terms and conditions for use reproduction and distribution definitions license shall mean the terms and conditions for use reproduction and distribution as defined by sections through of this document licensor shall mean the copyright owner or entity authorized by the copyright owner that is granting the license legal entity shall mean the union of the acting entity and all other entities that control are controlled by or are under common control with that entity for the purposes of this definition control means i the power direct or indirect to cause the direction or management of such entity whether by contract or otherwise or ii ownership of fifty percent or more of the outstanding shares or iii beneficial ownership of such entity you or your shall mean an individual or legal entity exercising permissions granted by this license source form shall mean the preferred form for making modifications including but not limited to software source code documentation source and configuration files object form shall mean any form resulting from mechanical transformation or translation of a source form including but not limited to compiled object code generated documentation and conversions to other media types work shall mean the work of authorship whether in source or object form made available under the license as indicated by a copyright notice that is included in or attached to the work an example is provided in the appendix below derivative works shall mean any work whether in source or object form that is based on or derived from the work and for which the editorial revisions annotations elaborations or other modifications represent as a whole an original work of authorship for the purposes of this license derivative works shall not include works that remain separable from or merely link or bind by name to the interfaces of the work and derivative works thereof contribution shall mean any work of authorship including the original version of the work and any modifications or additions to that work or derivative works thereof that is intentionally submitted to licensor for inclusion in the work by the copyright owner or by an individual or legal entity authorized to submit on behalf of the copyright owner for the purposes of this definition submitted means any form of electronic verbal or written communication sent to the licensor or its representatives including but not limited to communication on electronic mailing lists source code control systems and issue tracking systems that are managed by or on behalf of the licensor for the purpose of discussing and improving the work but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as not a contribution contributor shall mean licensor and any individual or legal entity on behalf of whom a contribution has been received by licensor and subsequently incorporated within the work grant of copyright license subject to the terms and conditions of this license each contributor hereby grants to you a perpetual worldwide non exclusive no charge royalty free irrevocable copyright license to reproduce prepare derivative works of publicly display publicly perform sublicense and distribute the work and such derivative works in source or object form grant of patent license subject to the terms and conditions of this license each contributor hereby grants to you a perpetual worldwide non exclusive no charge royalty free irrevocable except as stated in this section patent license to make have made use offer to sell sell import and otherwise transfer the work where such license applies only to those patent claims licensable by such contributor that are necessarily infringed by their contribution s alone or by combination of their contribution s with the work to which such contribution s was submitted if you institute patent litigation against any entity including a cross claim or counterclaim in a lawsuit alleging that the work or a contribution incorporated within the work constitutes direct or contributory patent infringement then any patent licenses granted to you under this license for that work shall terminate as of the date such litigation is filed redistribution you may reproduce and distribute copies of the work or derivative works thereof in any medium with or without modifications and in source or object form provided that you meet the following conditions a you must give any other recipients of the work or derivative works a copy of this license and b you must cause any modified files to carry prominent notices stating that you changed the files and c you must retain in the source form of any derivative works that you distribute all copyright patent trademark and attribution notices from the source form of the work excluding those notices that do not pertain to any part of the derivative works and d if the work includes a notice text file as part of its distribution then any derivative works that you distribute must include a readable copy of the attribution notices contained within such notice file excluding those notices that do not pertain to any part of the derivative works in at least one of the following places within a notice text file distributed as part of the derivative works within the source form or documentation if provided along with the derivative works or within a display generated by the derivative works if and wherever such third party notices normally appear the contents of the notice file are for informational purposes only and do not modify the license you may add your own attribution notices within derivative works that you distribute alongside or as an addendum to the notice text from the work provided that such additional attribution notices cannot be construed as modifying the license you may add your own copyright statement to your modifications and may provide additional or different license terms and conditions for use reproduction or distribution of your modifications or for any such derivative works as a whole provided your use reproduction and distribution of the work otherwise complies with the conditions stated in this license submission of contributions unless you explicitly state otherwise any contribution intentionally submitted for inclusion in the work by you to the licensor shall be under the terms and conditions of this license without any additional terms or conditions notwithstanding the above nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with licensor regarding such contributions trademarks this license does not grant permission to use the trade names trademarks service marks or product names of the licensor except as required for reasonable and customary use in describing the origin of the work and reproducing the content of the notice file disclaimer of warranty unless required by applicable law or agreed to in writing licensor provides the work and each contributor provides its contributions on an as is basis without warranties or conditions of any kind either express or implied including without limitation any warranties or conditions of title non infringement merchantability or fitness for a particular purpose you are solely responsible for determining the appropriateness of using or redistributing the work and assume any risks associated with your exercise of permissions under this license limitation of liability in no event and under no legal theory whether in tort including negligence contract or otherwise unless required by applicable law such as deliberate and grossly negligent acts or agreed to in writing shall any contributor be liable to you for damages including any direct indirect special incidental or consequential damages of any character arising as a result of this license or out of the use or inability to use the work including but not limited to damages for loss of goodwill work stoppage computer failure or malfunction or any and all other commercial damages or losses even if such contributor has been advised of the possibility of such damages accepting warranty or additional liability while redistributing the work or derivative works thereof you may choose to offer and charge a fee for acceptance of support warranty indemnity or other liability obligations and or rights consistent with this license however in accepting such obligations you may act only on your own behalf and on your sole responsibility not on behalf of any other contributor and only if you agree to indemnify defend and hold each contributor harmless for any liability incurred by or claims asserted against such contributor by reason of your accepting any such warranty or additional liability end of terms and conditions$)", "g"),
        "BSD-2-Clause": new RegExp("(redistribution and use in source and binary forms with or without modification are permitted provided that the following conditions are met redistributions of source code must retain the above copyright notice this list of conditions and the following disclaimer redistributions in binary form must reproduce the above copyright notice this list of conditions and the following disclaimer in the documentation and or other materials provided with the distribution this(.*?| )is provided by the copyright holders and contributors as is and any express or implied warranties including but not limited to the implied warranties of merchantability and fitness for a particular purpose are disclaimed in no event shall(.*?| )be liable for any direct indirect incidental special exemplary or consequential damages including but not limited to procurement of substitute goods or services loss of use data or profits or business interruption however caused and on any theory of liability whether in contract strict liability or tort including negligence or otherwise arising in any way out of the use of this(.*?| )even if advised of the possibility of such damage$|redistribution and use in source and binary forms with or without modification are permitted provided that the following conditions are met redistributions of source code must retain the above copyright notice this list of conditions and the following disclaimer redistributions in binary form must reproduce the above copyright notice this list of conditions and the following disclaimer in the documentation and or other materials provided with the distribution this software is provided by the copyright holders and contributors as is and any express or implied warranties including but not limited to the implied warranties of merchantability and fitness for a particular purpose are disclaimed in no event shall(.*?| )be liable for any direct indirect incidental special exemplary or consequential damages including but not limited to procurement of substitute goods or services loss of use data or profits or business interruption however caused and on any theory of liability whether in contract strict liability or tort including negligence or otherwise arising in any way out of the use of this software even if advised of the possibility of such damage$)", "g"),
        "BSD-3-Clause": new RegExp("(redistribution and use in source and binary forms with or without modification are permitted provided that the following conditions are met redistributions of source code must retain the above copyright notice this list of conditions and the following disclaimer redistributions in binary form must reproduce the above copyright notice this list of conditions and the following disclaimer in the documentation and or other materials provided with the distribution neither the name of(.*?| )nor the names of the contributors may be used to endorse or promote products derived from this software without specific prior written permission this software is provided by the copyright holders and contributors as is and any express or implied warranties including but not limited to the implied warranties of merchantability and fitness for a particular purpose are disclaimed in no event shall(.*?| )be liable for any direct indirect incidental special exemplary or consequential damages including but not limited to procurement of substitute goods or services loss of use data or profits or business interruption however caused and on any theory of liability whether in contract strict liability or tort including negligence or otherwise arising in any way out of the use of this software even if advised of the possibility of such damage$|(redistribution and use in source and binary forms with or without modification are permitted provided that the following conditions are met redistributions of source code must retain the above copyright notice this list of conditions and the following disclaimer redistributions in binary form must reproduce the above copyright notice this list of conditions and the following disclaimer in the documentation and or other materials provided with the distribution the names of any contributors may not be used to endorse or promote products derived from this software without specific prior written permission this software is provided by the copyright holders and contributors as is and any express or implied warranties including but not limited to the implied warranties of merchantability and fitness for a particular purpose are disclaimed in no event shall the copyright holders and contributors be liable for any direct indirect incidental special exemplary or consequential damages including but not limited to procurement of substitute goods or services loss of use data or profits or business interruption however caused and on any theory of liability whether in contract strict liability or tort including negligence or otherwise arising in any way out of the use of this software even if advised of the possibility of such damage$|redistribution and use in source and binary forms with or without modification are permitted provided that the following conditions are met redistributions of source code must retain the above copyright notice this list of conditions and the following disclaimer redistributions in binary form must reproduce the above copyright notice this list of conditions and the following disclaimer in the documentation and or other materials provided with the distribution neither the name(.*?| )nor the names of(.*?| )contributors may be used to endorse or promote products derived from this software without specific prior written permission this software is provided by(.*?| )as is and any express or implied warranties including but not limited to the implied warranties of merchantability and fitness for a particular purpose are disclaimed in no event shall(.*?| )be liable for any direct indirect incidental special exemplary or consequential damages including but not limited to procurement of substitute goods or services loss of use data or profits or business interruption however caused and on any theory of liability whether in contract strict liability or tort including negligence or otherwise arising in any way out of the use of this software even if advised of the possibility of such damage$))", "g"),
        MIT: new RegExp("permission is hereby granted free of charge to any person obtaining a copy of this software and associated documentation files the software to deal in the software without restriction including without limitation the rights to use copy modify merge publish distribute sublicense and or sell copies of the software and to permit persons to whom the software is furnished to do so subject to the following conditions the above copyright notice and this permission notice shall be included in all copies or substantial portions of the software the software is provided as is without warranty of any kind express or implied including but not limited to the warranties of merchantability fitness for a particular purpose and noninfringement in no event shall the authors or copyright holders be liable for any claim damages or other liability whether in an action of contract tort or otherwise arising from out of or in connection with the software or the use or other dealings in the software$", "g"),
        Unlicense: new RegExp("this is free and unencumbered software released into the public domain anyone is free to copy modify publish use compile sell or distribute this software either in source code form or as a compiled binary for any purpose commercial or non commercial and by any means in jurisdictions that recognize copyright laws the author or authors of this software dedicate any and all copyright interest in the software to the public domain we make this dedication for the benefit of the public at large and to the detriment of our heirs and successors we intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law the software is provided as is without warranty of any kind express or implied including but not limited to the warranties of merchantability fitness for a particular purpose and noninfringement in no event shall the authors be liable for any claim damages or other liability whether in an action of contract tort or otherwise arising from out of or in connection with the software or the use or other dealings in the software for more information please refer to wildcard$", "g")
      };
      var REGEXES = {
        Apache: [ /Apache License\b/ ],
        BSD: [ /BSD\b/ ],
        ISC: [ /The ISC License/, /ISC\b/ ],
        MIT: [ /MIT\b/ ],
        Unlicense: [ /http:\/\/unlicense.org\// ],
        WTFPL: [ /DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE/, /WTFPL\b/ ]
      };
      function inferLicense(license) {
        var cleanLicense = license.replace(/[^A-Za-z\s]/g, " ").replace(/[\s]+/g, " ").trim().toLowerCase();
        for (var licenseName in licenses) {
          var testLicense = licenses[licenseName];
          if (cleanLicense.search(testLicense) >= 0) return licenseName;
        }
        for (var _licenseName in REGEXES) for (var regex of REGEXES[_licenseName]) if (license.search(regex) >= 0) return `${_licenseName}*`;
        return null;
      }
      var fix_semver = __webpack_require__(92878), fix_path = __webpack_require__(71017), fix_url = __webpack_require__(57310), VALID_BIN_KEYS = /^(?!\.{0,2}$)[a-z0-9._-]+$/i, LICENSE_RENAMES = {
        "MIT/X11": "MIT",
        X11: "MIT"
      }, fix = function() {
        var _ref = asyncToGenerator_asyncToGenerator((function*(info, moduleLoc, reporter, warn, looseSemver) {
          var files = yield readdir(moduleLoc);
          if ("string" == typeof info.version && (info.version = fix_semver.clean(info.version, looseSemver) || info.version), 
          info.name = info.name || "", info.version = info.version || "", "string" == typeof info.man && (info.man = [ info.man ]), 
          "string" == typeof info.keywords && (info.keywords = info.keywords.split(/\s+/g)), 
          !info.contributors && files.indexOf("AUTHORS") >= 0) {
            var authorsFilepath = fix_path.join(moduleLoc, "AUTHORS");
            if ((yield stat(authorsFilepath)).isFile()) {
              var authors = yield readFile(authorsFilepath);
              authors = authors.split(/\r?\n/g).map((line => line.replace(/^\s*#.*$/, "").trim())).filter((line => !!line)), 
              info.contributors = authors;
            }
          }
          if ("string" != typeof info.author && "object" != typeof info.author || (info.author = normalizePerson(info.author)), 
          Array.isArray(info.contributors) && (info.contributors = info.contributors.map(normalizePerson)), 
          Array.isArray(info.maintainers) && (info.maintainers = info.maintainers.map(normalizePerson)), 
          !info.readme) {
            var readmeCandidates = files.filter((filename => {
              var lower = filename.toLowerCase();
              return "readme" === lower || 0 === lower.indexOf("readme.");
            })).sort(((filename1, filename2) => filename2.indexOf(".") - filename1.indexOf(".")));
            for (var readmeFilename of readmeCandidates) {
              var readmeFilepath = fix_path.join(moduleLoc, readmeFilename);
              if ((yield stat(readmeFilepath)).isFile()) {
                info.readmeFilename = readmeFilename, info.readme = yield readFile(readmeFilepath);
                break;
              }
            }
          }
          if (!info.description && info.readme) {
            var desc = function(readme) {
              if ("string" == typeof readme && "" !== readme) {
                for (var lines = readme.trim().split("\n").map((line => line.trim())), start = 0; start < lines.length; start++) {
                  var line = lines[start];
                  if (line && line.match(/^(#|$)/)) {
                    start++;
                    break;
                  }
                }
                for (;start < lines.length && !lines[start]; ) start++;
                for (var end = start; end < lines.length && lines[end]; ) end++;
                return lines.slice(start, end).join(" ");
              }
            }(info.readme);
            desc && (info.description = desc);
          }
          if (Array.isArray(info.engines)) {
            var engines = {};
            for (var str of info.engines) if ("string" == typeof str) {
              var _str$trim$split = str.trim().split(/ +/g), name = _str$trim$split[0], patternParts = _str$trim$split.slice(1);
              engines[name] = patternParts.join(" ");
            }
            info.engines = engines;
          }
          "string" == typeof info.repository && (info.repository = {
            type: "git",
            url: info.repository
          });
          var scripts, repo = info.repository;
          if (repo && "object" == typeof repo && "string" == typeof repo.url && (repo.url = function(fragment, reporter) {
            for (var key in hostedGit) {
              var Resolver = hostedGit[key];
              if (Resolver.isVersion(fragment)) return Resolver.getGitHTTPUrl(explodeHostedGitFragment(fragment, reporter));
            }
            return fragment;
          }(repo.url, reporter)), "string" == typeof info.bugs && (info.bugs = {
            url: info.bugs
          }), "string" == typeof info.homepage) {
            var parts = fix_url.parse(info.homepage);
            parts.protocol = parts.protocol || "http:", parts.pathname && !parts.hostname && (parts.hostname = parts.pathname, 
            parts.pathname = ""), info.homepage = fix_url.format(parts);
          }
          if ("string" == typeof info.name && "string" == typeof info.bin && info.bin.length > 0) {
            var _name = info.name.replace(/^@[^\/]+\//, "");
            info.bin = {
              [_name]: info.bin
            };
          }
          if ("object" == typeof info.bin && null !== info.bin) {
            var bin = info.bin;
            for (var _key of Object.keys(bin)) {
              var target = bin[_key];
              VALID_BIN_KEYS.test(_key) && isValidBin(target) ? bin[_key] = fix_path.normalize(target) : (delete bin[_key], 
              warn(reporter.lang("invalidBinEntry", info.name, _key)));
            }
          } else void 0 !== info.bin && (delete info.bin, warn(reporter.lang("invalidBinField", info.name)));
          info.bundledDependencies && (info.bundleDependencies = info.bundledDependencies, 
          delete info.bundledDependencies), !(scripts = info.scripts && "object" == typeof info.scripts ? info.scripts : {}).start && files.indexOf("server.js") >= 0 && (scripts.start = "node server.js"), 
          !scripts.install && files.indexOf("binding.gyp") >= 0 && (scripts.install = "node-gyp rebuild"), 
          Object.keys(scripts).length && (info.scripts = scripts);
          var dirs = info.directories;
          if (dirs && "object" == typeof dirs) {
            var binDir = dirs.bin;
            if (!info.bin && binDir && "string" == typeof binDir) {
              var _bin = info.bin = {}, fullBinDir = fix_path.join(moduleLoc, binDir);
              if (yield fs_exists(fullBinDir)) for (var scriptName of yield readdir(fullBinDir)) "." !== scriptName[0] && (_bin[scriptName] = fix_path.join(".", binDir, scriptName)); else warn(reporter.lang("manifestDirectoryNotFound", binDir, info.name));
            }
            var manDir = dirs.man;
            if (!info.man && "string" == typeof manDir) {
              var man = info.man = [], fullManDir = fix_path.join(moduleLoc, manDir);
              if (yield fs_exists(fullManDir)) for (var filename of yield readdir(fullManDir)) /^(.*?)\.[0-9]$/.test(filename) && man.push(fix_path.join(".", manDir, filename)); else warn(reporter.lang("manifestDirectoryNotFound", manDir, info.name));
            }
          }
          delete info.directories;
          var licenses = info.licenses;
          if (Array.isArray(licenses) && !info.license) {
            var licenseTypes = [];
            for (var _license of licenses) _license && "object" == typeof _license && (_license = _license.type), 
            "string" == typeof _license && licenseTypes.push(_license);
            1 === (licenseTypes = licenseTypes.filter(isValidLicense)).length ? info.license = licenseTypes[0] : licenseTypes.length && (info.license = `(${licenseTypes.join(" OR ")})`);
          }
          var license = info.license;
          license && "object" == typeof license && (info.license = license.type);
          var licenseFile = files.find((filename => {
            var lower = filename.toLowerCase();
            return "license" === lower || lower.startsWith("license.") || "unlicense" === lower || lower.startsWith("unlicense.");
          }));
          if (licenseFile) {
            var licenseFilepath = fix_path.join(moduleLoc, licenseFile);
            if ((yield stat(licenseFilepath)).isFile()) {
              var licenseContent = yield readFile(licenseFilepath), inferredLicense = inferLicense(licenseContent);
              info.licenseText = licenseContent;
              var _license2 = info.license;
              if ("string" == typeof _license2) {
                if (inferredLicense && isValidLicense(inferredLicense) && !isValidLicense(_license2)) {
                  var basicLicense = _license2.toLowerCase().replace(/(-like|\*)$/g, "");
                  inferredLicense.toLowerCase().startsWith(basicLicense) && (info.license = inferredLicense);
                }
              } else info.license = inferredLicense || `SEE LICENSE IN ${licenseFile}`;
            }
          }
          if ("string" == typeof info.license) info.license = LICENSE_RENAMES[info.license] || info.license; else if ("string" == typeof info.readme) {
            var _inferredLicense = inferLicense(info.readme);
            _inferredLicense && (info.license = _inferredLicense);
          }
          var noticeFile = files.find((filename => {
            var lower = filename.toLowerCase();
            return "notice" === lower || lower.startsWith("notice.");
          }));
          if (noticeFile) {
            var noticeFilepath = fix_path.join(moduleLoc, noticeFile);
            (yield stat(noticeFilepath)).isFile() && (info.noticeText = yield readFile(noticeFilepath));
          }
          for (var dependencyType of MANIFEST_FIELDS) {
            var dependencyList = info[dependencyType];
            if (dependencyList && "object" == typeof dependencyList) for (var _name2 in delete dependencyList["//"], 
            dependencyList) dependencyList[_name2] = dependencyList[_name2] || "";
          }
        }));
        return function() {
          return _ref.apply(this, arguments);
        };
      }(), normalize_manifest_path = __webpack_require__(71017), normalize_manifest = function() {
        var _ref = asyncToGenerator_asyncToGenerator((function*(info, moduleLoc, config, isRoot) {
          var human, name = info.name, version = info.version;
          function warn(msg) {
            human && (msg = `${human}: ${msg}`), config.reporter.warn(msg);
          }
          if ("string" == typeof name && (human = name), human && "string" == typeof version && version && (human += `@${version}`), 
          isRoot && info._loc && (human = normalize_manifest_path.relative(config.cwd, info._loc)), 
          yield fix(info, moduleLoc, config.reporter, warn, config.looseSemver), function(info, moduleLoc, lockfileFolder) {
            if (lockfileFolder) for (var dependencyType of DEPENDENCY_TYPES) {
              var dependencies = info[dependencyType];
              if (dependencies) for (var name of Object.keys(dependencies)) {
                var value = dependencies[name];
                resolve_relative_path.isAbsolute(value) && (value = "file:" + value);
                var prefix = void 0;
                if (value.startsWith("file:")) prefix = "file:"; else {
                  if (!value.startsWith("link:")) continue;
                  prefix = "link:";
                }
                resolve_relative_invariant(prefix, "prefix is definitely defined here");
                var unprefixed = value.substr(prefix.length), hasPathPrefix = /^\.(\/|$)/.test(unprefixed), absoluteTarget = resolve_relative_path.resolve(lockfileFolder, moduleLoc, unprefixed), relativeTarget = resolve_relative_path.relative(lockfileFolder, absoluteTarget) || ".";
                absoluteTarget === lockfileFolder ? relativeTarget = "." : hasPathPrefix && (relativeTarget = relativeTarget.replace(/^(?!\.{0,2}\/)/, "./")), 
                dependencies[name] = prefix + relativeTarget.replace(/\\/g, "/");
              }
            }
          }(info, moduleLoc, config.lockfileFolder), config.cwd === config.globalFolder) return info;
          try {
            !function(info, isRoot, reporter, warn) {
              if (isRoot) for (var key in typos) key in info && warn(reporter.lang("manifestPotentialTypo", key, typos[key]));
              var name = info.name;
              if ("string" == typeof name) {
                if (isRoot && isBuiltinModule(name) && warn(reporter.lang("manifestBuiltinModule", name)), 
                "." === name[0]) throw new MessageError(reporter.lang("manifestNameDot"));
                if (!isValidPackageName(name)) throw new MessageError(reporter.lang("manifestNameIllegalChars"));
                var lower = name.toLowerCase();
                if ("node_modules" === lower || "favicon.ico" === lower) throw new MessageError(reporter.lang("manifestNameBlacklisted"));
              }
              for (var _key of (isRoot && !info.private && ("string" == typeof info.license ? isValidLicense(info.license.replace(/\*$/g, "")) || warn(reporter.lang("manifestLicenseInvalid")) : warn(reporter.lang("manifestLicenseNone"))), 
              strings)) {
                var val = info[_key];
                if (val && "string" != typeof val) throw new MessageError(reporter.lang("manifestStringExpected", _key));
              }
              cleanDependencies(info, isRoot, reporter, warn);
            }(info, isRoot, config.reporter, warn);
          } catch (err) {
            throw human && (err.message = `${human}: ${err.message}`), err;
          }
          return info;
        }));
        return function() {
          return _ref.apply(this, arguments);
        };
      }(), lockPromises = new Map, mutex = key => {
        var unlockNext, willLock = new Promise((resolve => unlockNext = resolve)), lockPromise = lockPromises.get(key) || Promise.resolve(), willUnlock = lockPromise.then((() => unlockNext));
        return lockPromises.set(key, lockPromise.then((() => willLock))), willUnlock;
      }, cmdShim = __webpack_require__(28450), base_fetcher_path = __webpack_require__(71017);
      class BaseFetcher {
        constructor(dest, remote, config) {
          this.reporter = config.reporter, this.packageName = remote.packageName, this.reference = remote.reference, 
          this.registry = remote.registry, this.hash = remote.hash, this.remote = remote, 
          this.config = config, this.dest = dest;
        }
        setupMirrorFromCache() {
          return Promise.resolve();
        }
        _fetch() {
          return Promise.reject(new Error("Not implemented"));
        }
        fetch(defaultManifest) {
          var _this = this;
          return lockQueue.push(this.dest, asyncToGenerator_asyncToGenerator((function*() {
            yield mkdirp(_this.dest);
            var hash = (yield _this._fetch()).hash, pkg = yield asyncToGenerator_asyncToGenerator((function*() {
              try {
                return yield _this.config.readManifest(_this.dest, _this.registry);
              } catch (e) {
                if ("ENOENT" === e.code && defaultManifest) return normalize_manifest(defaultManifest, _this.dest, _this.config, !1);
                throw e;
              }
            }))();
            if (pkg.bin) for (var binName of Object.keys(pkg.bin)) {
              var binDest = `${_this.dest}/.bin`, src = base_fetcher_path.resolve(_this.dest, pkg.bin[binName]);
              if ((yield fs_exists(src)) && (yield chmod(src, 493)), yield mkdirp(binDest), "win32" === process.platform) {
                var unlockMutex = yield mutex(src);
                try {
                  yield cmdShim.ifExists(src, `${binDest}/${binName}`, {
                    createPwshFile: !1
                  });
                } finally {
                  unlockMutex();
                }
              } else yield symlink(src, `${binDest}/${binName}`);
            }
            return yield writeFile(base_fetcher_path.join(_this.dest, ".yarn-metadata.json"), JSON.stringify({
              manifest: pkg,
              artifacts: [],
              remote: _this.remote,
              registry: _this.registry,
              hash: hash
            }, null, "  ")), {
              hash: hash,
              dest: _this.dest,
              package: pkg,
              cached: !1
            };
          })));
        }
      }
      var tarball_fetcher_normalizeUrl = __webpack_require__(65657), tarball_fetcher_crypto = __webpack_require__(6113), tarball_fetcher_path = __webpack_require__(71017), tarball_fetcher_tarFs = __webpack_require__(95931), tarball_fetcher_url = __webpack_require__(57310), tarball_fetcher_fs = __webpack_require__(57147), gunzip = (__webpack_require__(12781), 
      __webpack_require__(86693)), tarball_fetcher_invariant = __webpack_require__(46128), tarball_fetcher_ssri = __webpack_require__(44240), RE_URL_NAME_MATCH = /\/(?:(@[^/]+)(?:\/|%2f))?[^/]+\/(?:-|_attachments)\/(?:@[^/]+\/)?([^/]+)$/, isHashAlgorithmSupported = name => {
        var cachedResult = isHashAlgorithmSupported.__cache[name];
        if (null != cachedResult) return cachedResult;
        var supported = !0;
        try {
          tarball_fetcher_crypto.createHash(name);
        } catch (error) {
          if ("Digest method not supported" !== error.message) throw error;
          supported = !1;
        }
        return isHashAlgorithmSupported.__cache[name] = supported, supported;
      };
      isHashAlgorithmSupported.__cache = {};
      class TarballFetcher extends BaseFetcher {
        constructor(dest, remote, config) {
          super(dest, remote, config), this.validateError = null, this.validateIntegrity = null;
        }
        setupMirrorFromCache() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var tarballMirrorPath = _this.getTarballMirrorPath(), tarballCachePath = _this.getTarballCachePath();
            null != tarballMirrorPath && !(yield fs_exists(tarballMirrorPath)) && (yield fs_exists(tarballCachePath)) && (yield mkdirp(tarball_fetcher_path.dirname(tarballMirrorPath)), 
            yield copy(tarballCachePath, tarballMirrorPath, _this.reporter));
          }))();
        }
        getTarballCachePath() {
          return tarball_fetcher_path.join(this.dest, ".yarn-tarball.tgz");
        }
        getTarballMirrorPath() {
          var pathname = tarball_fetcher_url.parse(this.reference).pathname;
          if (null == pathname) return null;
          var packageFilename, match = pathname.match(RE_URL_NAME_MATCH);
          if (match) {
            var scope = match[1], tarballBasename = match[2];
            packageFilename = scope ? `${scope}-${tarballBasename}` : tarballBasename;
          } else packageFilename = tarball_fetcher_path.basename(pathname);
          return this.config.getOfflineMirrorPath(packageFilename);
        }
        createExtractor(resolve, reject, tarballPath) {
          var hashInfo = this._supportedIntegrity({
            hashOnly: !0
          }), integrityInfo = this._supportedIntegrity({
            hashOnly: !1
          }), now = new Date, fs = __webpack_require__(57147), patchedFs = Object.assign({}, fs, {
            utimes: (path, atime, mtime, cb) => {
              fs.stat(path, ((err, stat) => {
                err ? cb(err) : stat.isDirectory() ? fs.utimes(path, atime, mtime, cb) : fs.open(path, "a", ((err, fd) => {
                  err ? cb(err) : fs.futimes(fd, atime, mtime, (err => {
                    err ? fs.close(fd, (() => cb(err))) : fs.close(fd, (err => cb(err)));
                  }));
                }));
              }));
            }
          }), hashValidateStream = new tarball_fetcher_ssri.integrityStream(hashInfo), integrityValidateStream = new tarball_fetcher_ssri.integrityStream(integrityInfo), untarStream = tarball_fetcher_tarFs.extract(this.dest, {
            strip: 1,
            dmode: 493,
            fmode: 420,
            chown: !1,
            map: header => {
              if (header.mtime = now, header.linkname) {
                var basePath = tarball_fetcher_path.posix.dirname(tarball_fetcher_path.join("/", header.name)), jailPath = tarball_fetcher_path.posix.join(basePath, header.linkname);
                header.linkname = tarball_fetcher_path.posix.relative("/", jailPath);
              }
              return header;
            },
            fs: patchedFs
          }), extractorStream = gunzip();
          return hashValidateStream.once("error", (err => {
            this.validateError = err;
          })), integrityValidateStream.once("error", (err => {
            this.validateError = err;
          })), integrityValidateStream.once("integrity", (sri => {
            this.validateIntegrity = sri;
          })), untarStream.on("error", (err => {
            reject(new MessageError(this.config.reporter.lang("errorExtractingTarball", err.message, tarballPath)));
          })), extractorStream.pipe(untarStream).on("finish", (() => {
            var error = this.validateError, hexDigest = this.validateIntegrity ? this.validateIntegrity.hexDigest() : "";
            if (this.config.updateChecksums && this.remote.integrity && this.validateIntegrity && this.remote.integrity !== this.validateIntegrity.toString() ? this.remote.integrity = this.validateIntegrity.toString() : this.validateIntegrity && (this.remote.cacheIntegrity = this.validateIntegrity.toString()), 
            integrityInfo.integrity && 0 === Object.keys(integrityInfo.integrity).length) return reject(new SecurityError(this.config.reporter.lang("fetchBadIntegrityAlgorithm", this.packageName, this.remote.reference)));
            if (error) {
              if (!this.config.updateChecksums) return reject(new SecurityError(this.config.reporter.lang("fetchBadHashWithPath", this.packageName, this.remote.reference, error.found.toString(), error.expected.toString())));
              this.remote.integrity = error.found.toString();
            }
            return resolve({
              hash: this.hash || hexDigest
            });
          })), {
            hashValidateStream: hashValidateStream,
            integrityValidateStream: integrityValidateStream,
            extractorStream: extractorStream
          };
        }
        getLocalPaths(override) {
          return [ override ? tarball_fetcher_path.resolve(this.config.cwd, override) : null, this.getTarballMirrorPath(), this.getTarballCachePath() ].filter((path => null != path));
        }
        fetchFromLocal(override) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var tarPaths = _this2.getLocalPaths(override), stream = yield readFirstAvailableStream(tarPaths);
            return new Promise(((resolve, reject) => {
              if (stream) {
                tarball_fetcher_invariant(stream, "stream should be available at this point");
                var tarballPath = stream.path, _this2$createExtracto = _this2.createExtractor(resolve, reject, tarballPath), hashValidateStream = _this2$createExtracto.hashValidateStream, integrityValidateStream = _this2$createExtracto.integrityValidateStream, extractorStream = _this2$createExtracto.extractorStream;
                stream.pipe(hashValidateStream), hashValidateStream.pipe(integrityValidateStream), 
                integrityValidateStream.pipe(extractorStream).on("error", (err => {
                  reject(new MessageError(_this2.config.reporter.lang("fetchErrorCorrupt", err.message, tarballPath)));
                }));
              } else reject(new MessageError(_this2.reporter.lang("tarballNotInNetworkOrCache", _this2.reference, tarPaths)));
            }));
          }))();
        }
        fetchFromExternal() {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var registry = _this3.config.registries[_this3.registry];
            try {
              var headers = _this3.requestHeaders();
              return yield registry.request(_this3.reference, {
                headers: _extends({
                  "Accept-Encoding": "gzip"
                }, headers),
                buffer: !0,
                process: (req, resolve, reject) => {
                  var tarballMirrorPath = _this3.getTarballMirrorPath(), tarballCachePath = _this3.getTarballCachePath(), _this3$createExtracto = _this3.createExtractor(resolve, reject), hashValidateStream = _this3$createExtracto.hashValidateStream, integrityValidateStream = _this3$createExtracto.integrityValidateStream, extractorStream = _this3$createExtracto.extractorStream;
                  req.pipe(hashValidateStream), hashValidateStream.pipe(integrityValidateStream), 
                  tarballMirrorPath && integrityValidateStream.pipe(tarball_fetcher_fs.createWriteStream(tarballMirrorPath)).on("error", reject), 
                  tarballCachePath && integrityValidateStream.pipe(tarball_fetcher_fs.createWriteStream(tarballCachePath)).on("error", reject), 
                  integrityValidateStream.pipe(extractorStream).on("error", reject);
                }
              }, _this3.packageName);
            } catch (err) {
              var tarballMirrorPath = _this3.getTarballMirrorPath(), tarballCachePath = _this3.getTarballCachePath();
              throw tarballMirrorPath && (yield fs_exists(tarballMirrorPath)) && (yield unlink(tarballMirrorPath)), 
              tarballCachePath && (yield fs_exists(tarballCachePath)) && (yield unlink(tarballCachePath)), 
              err;
            }
          }))();
        }
        requestHeaders() {
          var config = this.config.registries.yarn.config, requestParts = tarball_fetcher_urlParts(this.reference);
          return Object.keys(config).reduce(((headers, option) => {
            var parts = option.split(":");
            if (3 === parts.length && "_header" === parts[1]) {
              var registryParts = tarball_fetcher_urlParts(parts[0]);
              if (requestParts.host === registryParts.host && requestParts.path.startsWith(registryParts.path)) {
                var headerName = parts[2], headerValue = config[option];
                headers[headerName] = headerValue;
              }
            }
            return headers;
          }), {});
        }
        _fetch() {
          var isFilePath = this.reference.startsWith("file:");
          this.reference = removePrefix(this.reference, "file:");
          var urlParse = tarball_fetcher_url.parse(this.reference), isRelativePath = urlParse.protocol ? urlParse.protocol.match(/^[a-z]:$/i) : !!urlParse.pathname && urlParse.pathname.match(/^(?:\.{1,2})?[\\\/]/);
          return isFilePath || isRelativePath ? this.fetchFromLocal(this.reference) : this.fetchFromLocal().catch((err => this.fetchFromExternal()));
        }
        _findIntegrity(_ref) {
          var hashOnly = _ref.hashOnly;
          return this.remote.integrity && !hashOnly ? tarball_fetcher_ssri.parse(this.remote.integrity) : this.hash ? tarball_fetcher_ssri.fromHex(this.hash, "sha1") : null;
        }
        _supportedIntegrity(_ref2) {
          var hashOnly = _ref2.hashOnly, expectedIntegrity = this._findIntegrity({
            hashOnly: hashOnly
          }) || {}, expectedIntegrityAlgorithms = Object.keys(expectedIntegrity), shouldValidateIntegrity = (this.hash || this.remote.integrity) && !this.config.updateChecksums;
          if (0 === expectedIntegrityAlgorithms.length && (!shouldValidateIntegrity || hashOnly)) return {
            integrity: null,
            algorithms: this.config.updateChecksums ? [ "sha512" ] : [ "sha1" ]
          };
          var algorithms = new Set([ "sha512", "sha1" ]), integrity = {};
          for (var algorithm of expectedIntegrityAlgorithms) isHashAlgorithmSupported(algorithm) && (algorithms.add(algorithm), 
          integrity[algorithm] = expectedIntegrity[algorithm]);
          return {
            integrity: integrity,
            algorithms: Array.from(algorithms)
          };
        }
      }
      function tarball_fetcher_urlParts(requestUrl) {
        var normalizedUrl = tarball_fetcher_normalizeUrl(requestUrl), parsed = tarball_fetcher_url.parse(normalizedUrl);
        return {
          host: parsed.host || "",
          path: parsed.path || ""
        };
      }
      var tarball_resolver_invariant = __webpack_require__(46128);
      function explodeHostedGitFragment(fragment, reporter) {
        var hash = function(fragment) {
          var hashPosition = fragment.indexOf("#");
          return -1 === hashPosition ? "" : fragment.substr(hashPosition + 1);
        }(fragment), preParts = fragment.split("@");
        preParts.length > 2 && (fragment = preParts[1] + "@" + preParts[2]);
        var parts = fragment.replace(/(.*?)#.*/, "$1").replace(/.*:(.*)/, "$1").replace(/.git$/, "").split("/"), user = parts[parts.length - 2], repo = parts[parts.length - 1];
        if (void 0 === user || void 0 === repo) throw new MessageError(reporter.lang("invalidHostedGitFragment", fragment));
        return {
          user: user,
          repo: repo,
          hash: hash
        };
      }
      class HostedGitResolver extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment);
          var exploded = this.exploded = explodeHostedGitFragment(fragment, this.reporter), user = exploded.user, repo = exploded.repo, hash = exploded.hash;
          this.user = user, this.repo = repo, this.hash = hash;
        }
        static getTarballUrl(exploded, commit) {
          throw new Error("Not implemented");
        }
        static getGitHTTPUrl(exploded) {
          throw new Error("Not implemented");
        }
        static getGitHTTPBaseUrl(exploded) {
          throw new Error("Not implemented");
        }
        static getGitSSHUrl(exploded) {
          throw new Error("Not implemented");
        }
        static getHTTPFileUrl(exploded, filename, commit) {
          throw new Error("Not implemented");
        }
        getRefOverHTTP(url) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var gitUrl = Git.npmUrlToGitUrl(url), client = new Git(_this.config, gitUrl, _this.hash), out = yield _this.config.requestManager.request({
              url: `${url}/info/refs?service=git-upload-pack`,
              queue: _this.resolver.fetchingQueue
            });
            if (!out) throw new Error(_this.reporter.lang("hostedGitResolveError"));
            var lines = out.trim().split("\n");
            return (lines = lines.slice(2)).pop(), out = (lines = lines.map((line => line.slice(4)))).join("\n"), 
            client.setRefHosted(out);
          }))();
        }
        resolveOverHTTP(url) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var commit = yield _this2.getRefOverHTTP(url), config = _this2.config, tarballUrl = _this2.constructor.getTarballUrl(_this2.exploded, commit), tryRegistry = function() {
              var _ref = asyncToGenerator_asyncToGenerator((function*(registry) {
                var filename = registries[registry].filename, href = _this2.constructor.getHTTPFileUrl(_this2.exploded, filename, commit), file = yield config.requestManager.request({
                  url: href,
                  queue: _this2.resolver.fetchingQueue
                });
                if (!file) return null;
                var json = yield config.readJson(href, (() => JSON.parse(file)));
                return json._uid = commit, json._remote = {
                  resolved: tarballUrl,
                  type: "tarball",
                  reference: tarballUrl,
                  registry: registry
                }, json;
              }));
              return function() {
                return _ref.apply(this, arguments);
              };
            }(), file = yield tryRegistry(_this2.registry);
            if (file) return file;
            for (var registry in registries) if (registry !== _this2.registry) {
              var _file = yield tryRegistry(registry);
              if (_file) return _file;
            }
            return {
              name: guessName(url),
              version: "0.0.0",
              _uid: commit,
              _remote: {
                resolved: tarballUrl,
                type: "tarball",
                reference: tarballUrl,
                registry: "npm",
                hash: void 0
              }
            };
          }))();
        }
        hasHTTPCapability(url) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return !1 !== (yield _this3.config.requestManager.request({
              url: url,
              method: "HEAD",
              queue: _this3.resolver.fetchingQueue,
              followRedirect: !1
            }));
          }))();
        }
        resolve() {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var shrunk = _this4.request.getLocked("tarball");
            if (shrunk) return shrunk;
            var httpUrl = _this4.constructor.getGitHTTPUrl(_this4.exploded), httpBaseUrl = _this4.constructor.getGitHTTPBaseUrl(_this4.exploded), sshUrl = _this4.constructor.getGitSSHUrl(_this4.exploded);
            if (yield _this4.hasHTTPCapability(httpBaseUrl)) return _this4.resolveOverHTTP(httpUrl);
            var sshGitUrl = Git.npmUrlToGitUrl(sshUrl);
            if (yield Git.hasArchiveCapability(sshGitUrl)) {
              var archiveClient = new Git(_this4.config, sshGitUrl, _this4.hash), commit = yield archiveClient.init();
              return _this4.fork(GitResolver, !0, `${sshUrl}#${commit}`);
            }
            return _this4.fork(GitResolver, !0, sshUrl);
          }))();
        }
      }
      class GitHubResolver extends HostedGitResolver {
        static isVersion(pattern) {
          return !!pattern.startsWith("github:") || !!/^[^:@%/\s.-][^:@%/\s]*[/][^:@\s/%]+(?:#.*)?$/.test(pattern);
        }
        static getTarballUrl(parts, hash) {
          return `https://codeload.${this.hostname}/${parts.user}/${parts.repo}/tar.gz/${hash}`;
        }
        static getGitSSHUrl(parts) {
          return `git+ssh://git@${this.hostname}/${parts.user}/${parts.repo}.git` + (parts.hash ? "#" + decodeURIComponent(parts.hash) : "");
        }
        static getGitHTTPBaseUrl(parts) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}`;
        }
        static getGitHTTPUrl(parts) {
          return `${GitHubResolver.getGitHTTPBaseUrl(parts)}.git`;
        }
        static getHTTPFileUrl(parts, filename, commit) {
          return `https://raw.githubusercontent.com/${parts.user}/${parts.repo}/${commit}/${filename}`;
        }
      }
      GitHubResolver.protocol = "github", GitHubResolver.hostname = "github.com";
      class GitLabResolver extends HostedGitResolver {
        static getTarballUrl(parts, hash) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}/repository/archive.tar.gz?ref=${hash}`;
        }
        static getGitHTTPBaseUrl(parts) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}`;
        }
        static getGitHTTPUrl(parts) {
          return `${GitLabResolver.getGitHTTPBaseUrl(parts)}.git`;
        }
        static getGitSSHUrl(parts) {
          return `git+ssh://git@${this.hostname}/${parts.user}/${parts.repo}.git` + (parts.hash ? "#" + decodeURIComponent(parts.hash) : "");
        }
        static getHTTPFileUrl(parts, filename, commit) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}/raw/${commit}/${filename}`;
        }
      }
      function explodeGistFragment(fragment, reporter) {
        var parts = (fragment = removePrefix(fragment, "gist:")).split("#");
        if (parts.length <= 2) return {
          id: parts[0],
          hash: parts[1] || ""
        };
        throw new MessageError(reporter.lang("invalidGistFragment", fragment));
      }
      GitLabResolver.hostname = "gitlab.com", GitLabResolver.protocol = "gitlab";
      class GistResolver extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment);
          var _explodeGistFragment = explodeGistFragment(fragment, this.reporter), id = _explodeGistFragment.id, hash = _explodeGistFragment.hash;
          this.id = id, this.hash = hash;
        }
        resolve() {
          return this.fork(GitResolver, !1, `https://gist.github.com/${this.id}.git#${this.hash}`);
        }
      }
      GistResolver.protocol = "gist";
      class BitbucketResolver extends HostedGitResolver {
        static getTarballUrl(parts, hash) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}/get/${hash}.tar.gz`;
        }
        static getGitHTTPBaseUrl(parts) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}`;
        }
        static getGitHTTPUrl(parts) {
          return `${BitbucketResolver.getGitHTTPBaseUrl(parts)}.git`;
        }
        static getGitSSHUrl(parts) {
          return `git+ssh://git@${this.hostname}/${parts.user}/${parts.repo}.git` + (parts.hash ? "#" + decodeURIComponent(parts.hash) : "");
        }
        static getHTTPFileUrl(parts, filename, commit) {
          return `https://${this.hostname}/${parts.user}/${parts.repo}/raw/${commit}/${filename}`;
        }
        hasHTTPCapability(url) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return !1 !== (yield _this.config.requestManager.request({
              url: url,
              method: "HEAD",
              queue: _this.resolver.fetchingQueue,
              followRedirect: !1,
              rejectStatusCode: 302
            }));
          }))();
        }
      }
      BitbucketResolver.hostname = "bitbucket.org", BitbucketResolver.protocol = "bitbucket";
      class registry_resolver_RegistryResolver extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment);
          var match = fragment.match(/^(\S+):(@?.*?)(@(.*?)|)$/);
          if (!match) throw new MessageError(this.reporter.lang("invalidFragment", fragment));
          this.range = match[4] || "latest", this.name = match[2], this.registry = this.constructor.protocol;
        }
        resolve() {
          return this.fork(this.constructor.factory, !1, this.name, this.range);
        }
      }
      var resolvers_registries = {
        npm: NpmResolver,
        yarn: class extends NpmResolver {}
      }, exotics = new Set([ GitResolver, class extends ExoticResolver {
        constructor(request, fragment) {
          super(request, fragment);
          var _versionUtil$explodeH = explodeHashedUrl(fragment), hash = _versionUtil$explodeH.hash, url = _versionUtil$explodeH.url;
          this.hash = hash, this.url = url;
        }
        static isVersion(pattern) {
          return !GitResolver.isVersion(pattern) && (!(!pattern.startsWith("http://") && !pattern.startsWith("https://")) || !!(pattern.indexOf("@") < 0 && (pattern.endsWith(".tgz") || pattern.endsWith(".tar.gz"))));
        }
        resolve() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var shrunk = _this.request.getLocked("tarball");
            if (shrunk) return shrunk;
            var pkgJson, url = _this.url, hash = _this.hash, registry = _this.registry, dest = _this.config.getTemp(crypto_hash(url));
            if (yield _this.config.isValidModuleDest(dest)) {
              var _yield$_this$config$r = yield _this.config.readPackageMetadata(dest);
              pkgJson = _yield$_this$config$r.package, hash = _yield$_this$config$r.hash, registry = _yield$_this$config$r.registry;
            } else {
              yield unlink(dest);
              var fetcher = new TarballFetcher(dest, {
                type: "tarball",
                reference: url,
                registry: registry,
                hash: hash
              }, _this.config), fetched = yield fetcher.fetch({
                name: guessName(url),
                version: "0.0.0",
                _registry: "npm"
              });
              pkgJson = fetched.package, hash = fetched.hash, registry = pkgJson._registry, tarball_resolver_invariant(registry, "expected registry");
            }
            return pkgJson._uid = hash, pkgJson._remote = {
              type: "copy",
              resolved: `${url}#${hash}`,
              hash: hash,
              registry: registry,
              reference: dest
            }, pkgJson;
          }))();
        }
      }, GitHubResolver, FileResolver, LinkResolver, GitLabResolver, GistResolver, BitbucketResolver ]);
      function getExoticResolver(pattern) {
        for (var Resolver of exotics) if (Resolver.isVersion(pattern)) return Resolver;
        return null;
      }
      var hostedGit = {
        github: GitHubResolver,
        gitlab: GitLabResolver,
        bitbucket: BitbucketResolver
      };
      for (var key in resolvers_registries) {
        var _class, resolvers_RegistryResolver = resolvers_registries[key];
        exotics.add(((_class = class extends registry_resolver_RegistryResolver {}).protocol = key, 
        _class.factory = resolvers_RegistryResolver, _class));
      }
      function callThroughHook(type, fn, context) {
        if ("undefined" == typeof global) return fn();
        if ("object" != typeof global.experimentalYarnHooks || !global.experimentalYarnHooks) return fn();
        var hook = global.experimentalYarnHooks[type];
        return hook ? hook(fn, context) : fn();
      }
      var integrity_checker_invariant = __webpack_require__(46128), integrity_checker_path = __webpack_require__(71017), integrityErrors = {
        EXPECTED_IS_NOT_A_JSON: "integrityFailedExpectedIsNotAJSON",
        FILES_MISSING: "integrityFailedFilesMissing",
        LOCKFILE_DONT_MATCH: "integrityLockfilesDontMatch",
        FLAGS_DONT_MATCH: "integrityFlagsDontMatch",
        LINKED_MODULES_DONT_MATCH: "integrityCheckLinkedModulesDontMatch",
        PATTERNS_DONT_MATCH: "integrityPatternsDontMatch",
        MODULES_FOLDERS_MISSING: "integrityModulesFoldersMissing",
        SYSTEM_PARAMS_DONT_MATCH: "integritySystemParamsDontMatch"
      }, INTEGRITY_FILE_DEFAULTS = () => ({
        systemParams: getSystemParams(),
        modulesFolders: [],
        flags: [],
        linkedModules: [],
        topLevelPatterns: [],
        lockfileEntries: {},
        files: []
      });
      class InstallationIntegrityChecker {
        constructor(config) {
          this.config = config;
        }
        _getModulesRootFolder() {
          return this.config.modulesFolder ? this.config.modulesFolder : this.config.workspaceRootFolder ? this.config.workspaceRootFolder : integrity_checker_path.join(this.config.lockfileFolder, "node_modules");
        }
        _getIntegrityFileFolder() {
          return this.config.modulesFolder ? this.config.modulesFolder : this.config.enableMetaFolder ? integrity_checker_path.join(this.config.lockfileFolder, ".yarn-meta") : integrity_checker_path.join(this.config.lockfileFolder, "node_modules");
        }
        _getIntegrityFileLocation() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var locationFolder = _this._getIntegrityFileFolder(), locationPath = integrity_checker_path.join(locationFolder, ".yarn-integrity");
            return {
              locationFolder: locationFolder,
              locationPath: locationPath,
              exists: yield fs_exists(locationPath)
            };
          }))();
        }
        _getModulesFolders(_temp) {
          var workspaceLayout = (void 0 === _temp ? {} : _temp).workspaceLayout, locations = [];
          if (this.config.modulesFolder ? locations.push(this.config.modulesFolder) : locations.push(integrity_checker_path.join(this.config.lockfileFolder, "node_modules")), 
          workspaceLayout) for (var workspaceName of Object.keys(workspaceLayout.workspaces)) {
            var loc = workspaceLayout.workspaces[workspaceName].loc;
            loc && locations.push(integrity_checker_path.join(loc, "node_modules"));
          }
          return locations.sort(sortAlpha);
        }
        _getIntegrityListing(_temp2) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var workspaceLayout = (void 0 === _temp2 ? {} : _temp2).workspaceLayout, files = [], recurse = function() {
              var _ref3 = asyncToGenerator_asyncToGenerator((function*(dir) {
                for (var file of yield readdir(dir)) {
                  var entry = integrity_checker_path.join(dir, file);
                  (yield fs_lstat(entry)).isDirectory() ? yield recurse(entry) : files.push(entry);
                }
              }));
              return function() {
                return _ref3.apply(this, arguments);
              };
            }();
            for (var modulesFolder of _this2._getModulesFolders({
              workspaceLayout: workspaceLayout
            })) (yield fs_exists(modulesFolder)) && (yield recurse(modulesFolder));
            return files;
          }))();
        }
        _generateIntegrityFile(lockfile, patterns, flags, workspaceLayout, artifacts) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var result = _extends({}, INTEGRITY_FILE_DEFAULTS(), {
              artifacts: artifacts
            });
            if (result.topLevelPatterns = patterns, workspaceLayout) for (var name of (result.topLevelPatterns = result.topLevelPatterns.filter((p => !workspaceLayout.getManifestByPattern(p))), 
            Object.keys(workspaceLayout.workspaces))) if (workspaceLayout.workspaces[name].loc) {
              var manifest = workspaceLayout.workspaces[name].manifest;
              if (manifest) for (var dependencyType of DEPENDENCY_TYPES) {
                var dependencies = manifest[dependencyType];
                if (dependencies) for (var dep of Object.keys(dependencies)) result.topLevelPatterns.push(`${dep}@${dependencies[dep]}`);
              }
            }
            result.topLevelPatterns.sort(sortAlpha), flags.checkFiles && result.flags.push("checkFiles"), 
            flags.flat && result.flags.push("flat"), _this3.config.ignoreScripts && result.flags.push("ignoreScripts"), 
            _this3.config.focus && result.flags.push("focus: " + _this3.config.focusedWorkspaceName), 
            _this3.config.production && result.flags.push("production"), _this3.config.plugnplayEnabled && result.flags.push("plugnplay");
            var linkedModules = _this3.config.linkedModules;
            for (var _key of (linkedModules.length && (result.linkedModules = linkedModules.sort(sortAlpha)), 
            Object.keys(lockfile))) result.lockfileEntries[_key] = lockfile[_key].resolved || "";
            for (var modulesFolder of _this3._getModulesFolders({
              workspaceLayout: workspaceLayout
            })) (yield fs_exists(modulesFolder)) && result.modulesFolders.push(integrity_checker_path.relative(_this3.config.lockfileFolder, modulesFolder));
            if (flags.checkFiles) {
              var modulesRoot = _this3._getModulesRootFolder();
              result.files = (yield _this3._getIntegrityListing({
                workspaceLayout: workspaceLayout
              })).map((entry => integrity_checker_path.relative(modulesRoot, entry))).sort(sortAlpha);
            }
            return result;
          }))();
        }
        _getIntegrityFile(locationPath) {
          return asyncToGenerator_asyncToGenerator((function*() {
            var expectedRaw = yield readFile(locationPath);
            try {
              return _extends({}, INTEGRITY_FILE_DEFAULTS(), JSON.parse(expectedRaw));
            } catch (e) {}
            return null;
          }))();
        }
        _compareIntegrityFiles(actual, expected, checkFiles, workspaceLayout) {
          if (!expected) return "EXPECTED_IS_NOT_A_JSON";
          if (!compareSortedArrays(actual.linkedModules, expected.linkedModules)) return "LINKED_MODULES_DONT_MATCH";
          if (actual.systemParams !== expected.systemParams) return "SYSTEM_PARAMS_DONT_MATCH";
          var relevantExpectedFlags = expected.flags.slice();
          if (-1 === actual.flags.indexOf("checkFiles") && (relevantExpectedFlags = relevantExpectedFlags.filter((flag => "checkFiles" !== flag))), 
          !compareSortedArrays(actual.flags, relevantExpectedFlags)) return "FLAGS_DONT_MATCH";
          if (!compareSortedArrays(actual.topLevelPatterns, expected.topLevelPatterns || [])) return "PATTERNS_DONT_MATCH";
          for (var _key2 of Object.keys(actual.lockfileEntries)) if (actual.lockfileEntries[_key2] !== expected.lockfileEntries[_key2]) return "LOCKFILE_DONT_MATCH";
          for (var _key3 of Object.keys(expected.lockfileEntries)) if (actual.lockfileEntries[_key3] !== expected.lockfileEntries[_key3]) return "LOCKFILE_DONT_MATCH";
          if (checkFiles) {
            if (expected.files.length > actual.files.length) return "FILES_MISSING";
            for (var u = 0, v = 0; u < expected.files.length; ++u) {
              for (var max = v + (actual.files.length - v) - (expected.files.length - u) + 1; v < max && actual.files[v] !== expected.files[u]; ) v += 1;
              if (v === max) return "FILES_MISSING";
            }
          }
          return "OK";
        }
        check(patterns, lockfile, flags, workspaceLayout) {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var missingPatterns = patterns.filter((p => !(lockfile[p] || workspaceLayout && workspaceLayout.getManifestByPattern(p)))), loc = yield _this4._getIntegrityFileLocation();
            if (missingPatterns.length || !loc.exists) return {
              integrityFileMissing: !loc.exists,
              missingPatterns: missingPatterns
            };
            var actual = yield _this4._generateIntegrityFile(lockfile, patterns, flags, workspaceLayout), expected = yield _this4._getIntegrityFile(loc.locationPath), integrityMatches = _this4._compareIntegrityFiles(actual, expected, flags.checkFiles, workspaceLayout);
            if ("OK" === integrityMatches) for (var modulesFolder of (integrity_checker_invariant(expected, "The integrity shouldn't pass without integrity file"), 
            expected.modulesFolders)) (yield fs_exists(integrity_checker_path.join(_this4.config.lockfileFolder, modulesFolder))) || (integrityMatches = "MODULES_FOLDERS_MISSING");
            return {
              integrityFileMissing: !1,
              integrityMatches: "OK" === integrityMatches,
              integrityError: "OK" === integrityMatches ? void 0 : integrityMatches,
              missingPatterns: missingPatterns,
              hardRefreshRequired: "SYSTEM_PARAMS_DONT_MATCH" === integrityMatches
            };
          }))();
        }
        getArtifacts() {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var loc = yield _this5._getIntegrityFileLocation();
            if (!loc.exists) return null;
            var expected, expectedRaw = yield readFile(loc.locationPath);
            try {
              expected = JSON.parse(expectedRaw);
            } catch (e) {}
            return expected ? expected.artifacts : null;
          }))();
        }
        save(patterns, lockfile, flags, workspaceLayout, artifacts) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var integrityFile = yield _this6._generateIntegrityFile(lockfile, patterns, flags, workspaceLayout, artifacts), loc = yield _this6._getIntegrityFileLocation();
            integrity_checker_invariant(loc.locationPath, "expected integrity hash location"), 
            yield mkdirp(integrity_checker_path.dirname(loc.locationPath)), yield writeFile(loc.locationPath, JSON.stringify(integrityFile, null, 2));
          }))();
        }
        removeIntegrityFile() {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var loc = yield _this7._getIntegrityFileLocation();
            loc.exists && (yield unlink(loc.locationPath));
          }))();
        }
      }
      class CopyFetcher extends BaseFetcher {
        _fetch() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return yield copy(_this.reference, _this.dest, _this.reporter), {
              hash: _this.hash || "",
              resolved: null
            };
          }))();
        }
      }
      var dynamicRequire = require, portable_script_path = __webpack_require__(71017);
      function _makePortableProxyScriptUnix() {
        return (_makePortableProxyScriptUnix = asyncToGenerator_asyncToGenerator((function*(source, destination, options) {
          var environment = options.extraEnvironment ? Array.from(options.extraEnvironment.entries()).map((_ref => `${_ref[0]}="${_ref[1]}"`)).join(" ") + " " : "", prependedArguments = options.prependArguments ? " " + options.prependArguments.map((arg => `"${arg}"`)).join(" ") : "", appendedArguments = options.appendArguments ? " " + options.appendArguments.map((arg => `"${arg}"`)).join(" ") : "", filePath = `${destination}/${options.proxyBasename || portable_script_path.basename(source)}`, sourcePath = portable_script_path.isAbsolute(source) ? source : `$(dirname "$0")/../${source}`;
          yield mkdirp(destination), "win32" === process.platform ? yield writeFile(filePath + ".cmd", `@${environment}"${sourcePath}" ${prependedArguments} ${appendedArguments} %*\r\n`) : (yield writeFile(filePath, `#!/bin/sh\n\n${environment}exec "${sourcePath}"${prependedArguments} "$@"${appendedArguments}\n`), 
          yield chmod(filePath, 493));
        }))).apply(this, arguments);
      }
      function makePortableProxyScript(source, destination, options) {
        return void 0 === options && (options = {}), function() {
          return _makePortableProxyScriptUnix.apply(this, arguments);
        }(source, destination, options);
      }
      function fixCmdWinSlashes(cmd) {
        function findQuotes(quoteSymbol) {
          var quotes = [], regEx = new RegExp(quoteSymbol + ".*" + quoteSymbol);
          return cmd.replace(regEx, ((_, index) => (quotes.push({
            from: index,
            to: index + _.length
          }), _))), quotes;
        }
        var quotes = findQuotes('"').concat(findQuotes("'"));
        var regExp = new RegExp("((?:^|&&|&|\\|\\||\\|)\\s*)(\".*?\"|'.*?'|\\S*)", "g");
        return cmd.replace(regExp, ((whole, pre, cmd, index) => "&" !== pre[0] && "|" !== pre[0] || !function(index) {
          return quotes.reduce(((result, quote) => result || quote.from <= index && index <= quote.to), !1);
        }(index) ? pre + cmd.replace(/\//g, "\\") : whole));
      }
      var execute_lifecycle_script_path = __webpack_require__(71017), IGNORE_MANIFEST_KEYS = new Set([ "readme", "notice", "licenseText", "activationEvents", "contributes" ]), IGNORE_CONFIG_KEYS = [ "lastUpdateCheck" ], wrappersFolder = null;
      function getWrappersFolder() {
        return _getWrappersFolder.apply(this, arguments);
      }
      function _getWrappersFolder() {
        return (_getWrappersFolder = asyncToGenerator_asyncToGenerator((function*(config) {
          return wrappersFolder || (wrappersFolder = yield makeTempDir(), yield makePortableProxyScript(process.execPath, wrappersFolder, {
            proxyBasename: "node"
          }), yield makePortableProxyScript(process.execPath, wrappersFolder, {
            proxyBasename: "yarn",
            prependArguments: [ process.argv[1] ]
          }), wrappersFolder);
        }))).apply(this, arguments);
      }
      var INVALID_CHAR_REGEX = /\W/g;
      function makeEnv() {
        return _makeEnv.apply(this, arguments);
      }
      function _makeEnv() {
        return _makeEnv = asyncToGenerator_asyncToGenerator((function*(stage, cwd, config) {
          var env = _extends({
            NODE: process.execPath,
            INIT_CWD: process.cwd()
          }, process.env), customEnv = config.getOption("env");
          customEnv && "object" == typeof customEnv && Object.assign(env, customEnv), env.npm_lifecycle_event = stage, 
          env.npm_node_execpath = env.NODE, env.npm_execpath = env.npm_execpath || process.mainModule && process.mainModule.filename, 
          config.production && (env.NODE_ENV = "production"), env.npm_config_argv = JSON.stringify({
            remain: [],
            cooked: "run" === config.commandName ? [ config.commandName, stage ] : [ config.commandName ],
            original: process.argv.slice(2)
          });
          var manifest = yield config.maybeReadManifest(cwd);
          if (manifest) {
            manifest.scripts && Object.prototype.hasOwnProperty.call(manifest.scripts, stage) && (env.npm_lifecycle_script = manifest.scripts[stage]);
            for (var queue = [ [ "", manifest ] ]; queue.length; ) {
              var _queue$pop = queue.pop(), _key = _queue$pop[0], val = _queue$pop[1];
              if ("object" == typeof val) for (var subKey in val) {
                var fullKey = [ _key, subKey ].filter(Boolean).join("_");
                fullKey && "_" !== fullKey[0] && !IGNORE_MANIFEST_KEYS.has(fullKey) && queue.push([ fullKey, val[subKey] ]);
              } else {
                var cleanVal = String(val);
                cleanVal.indexOf("\n") >= 0 && (cleanVal = JSON.stringify(cleanVal)), env[`npm_package_${_key.replace(INVALID_CHAR_REGEX, "_")}`] = cleanVal;
              }
            }
          }
          var keys = new Set([].concat(Object.keys(config.registries.yarn.config), Object.keys(config.registries.npm.config))), cleaned = Array.from(keys).filter((key => !key.match(/:_/) && -1 === IGNORE_CONFIG_KEYS.indexOf(key))).map((key => {
            var val = config.getOption(key);
            return val ? "number" == typeof val ? val = "" + val : "string" != typeof val && (val = JSON.stringify(val)) : val = "", 
            val.indexOf("\n") >= 0 && (val = JSON.stringify(val)), [ key, val ];
          }));
          for (var _ref3 of cleaned) {
            var _key2 = _ref3[0], _val = _ref3[1];
            env[`npm_config_${_key2.replace(/^_+/, "")}`.replace(INVALID_CHAR_REGEX, "_")] = _val;
          }
          if (manifest && manifest.name) {
            var packageConfigPrefix = `${manifest.name}:`;
            for (var _ref4 of cleaned) {
              var _key3 = _ref4[0], _val2 = _ref4[1];
              if (0 === _key3.indexOf(packageConfigPrefix)) env[`npm_package_config_${_key3.replace(/^_+/, "").replace(packageConfigPrefix, "")}`.replace(INVALID_CHAR_REGEX, "_")] = _val2;
            }
          }
          var envPath = env[ENV_PATH_KEY], pathParts = envPath ? envPath.split(execute_lifecycle_script_path.delimiter) : [];
          pathParts.unshift(execute_lifecycle_script_path.join(execute_lifecycle_script_path.dirname(process.execPath), "node_modules", "npm", "bin", "node-gyp-bin")), 
          pathParts.unshift(execute_lifecycle_script_path.join(execute_lifecycle_script_path.dirname(process.execPath), "..", "lib", "node_modules", "npm", "bin", "node-gyp-bin")), 
          pathParts.unshift(execute_lifecycle_script_path.join(execute_lifecycle_script_path.dirname(process.execPath), "..", "libexec", "lib", "node_modules", "npm", "bin", "node-gyp-bin"));
          var pnpFile, globalBin = yield getBinFolder(config, {});
          for (var registryFolder of (-1 === pathParts.indexOf(globalBin) && pathParts.unshift(globalBin), 
          config.registryFolders)) {
            var binFolder = execute_lifecycle_script_path.join(registryFolder, ".bin");
            config.workspacesEnabled && config.workspaceRootFolder && pathParts.unshift(execute_lifecycle_script_path.join(config.workspaceRootFolder, binFolder)), 
            pathParts.unshift(execute_lifecycle_script_path.join(config.linkFolder, binFolder)), 
            pathParts.unshift(execute_lifecycle_script_path.join(cwd, binFolder));
          }
          if (process.versions.pnp) pnpFile = dynamicRequire.resolve("pnpapi"); else {
            var candidate = `${config.lockfileFolder}/.pnp.js`;
            (yield fs_exists(candidate)) && (pnpFile = candidate);
          }
          if (pnpFile) {
            var pnpApi = dynamicRequire(pnpFile), packageLocator = pnpApi.findPackageLocator(`${cwd}/`), packageInformation = pnpApi.getPackageInformation(packageLocator);
            for (var _ref5 of packageInformation.packageDependencies.entries()) {
              var name = _ref5[0], reference = _ref5[1], dependencyInformation = pnpApi.getPackageInformation({
                name: name,
                reference: reference
              });
              if (dependencyInformation && dependencyInformation.packageLocation) {
                var _binFolder = `${dependencyInformation.packageLocation}/.bin`;
                (yield fs_exists(_binFolder)) && pathParts.unshift(_binFolder);
              }
            }
            env.NODE_OPTIONS = env.NODE_OPTIONS || "", env.NODE_OPTIONS = `--require ${pnpFile} ${env.NODE_OPTIONS}`;
          }
          return config.disableWrappersFolder || pathParts.unshift(yield getWrappersFolder(config)), 
          env[ENV_PATH_KEY] = pathParts.join(execute_lifecycle_script_path.delimiter), env;
        })), _makeEnv.apply(this, arguments);
      }
      function executeLifecycleScript() {
        return _executeLifecycleScript.apply(this, arguments);
      }
      function _executeLifecycleScript() {
        return _executeLifecycleScript = asyncToGenerator_asyncToGenerator((function*(_ref) {
          var stage = _ref.stage, config = _ref.config, cwd = _ref.cwd, cmd = _ref.cmd, isInteractive = _ref.isInteractive, onProgress = _ref.onProgress, customShell = _ref.customShell, env = yield makeEnv(stage, cwd, config);
          yield checkForGypIfNeeded(config, cmd, env[ENV_PATH_KEY].split(execute_lifecycle_script_path.delimiter)), 
          "win32" !== process.platform || customShell && "cmd" !== customShell || (cmd = fixCmdWinSlashes(cmd));
          var stdio = [ "ignore", "pipe", "pipe" ], detached = "win32" !== process.platform;
          isInteractive && (stdio = "inherit", detached = !1);
          var shell = customShell || !0;
          return {
            cwd: cwd,
            command: cmd,
            stdout: yield child_spawn(cmd, [], {
              cwd: cwd,
              env: env,
              stdio: stdio,
              detached: detached,
              shell: shell
            }, onProgress)
          };
        })), _executeLifecycleScript.apply(this, arguments);
      }
      var execute_lifecycle_script = executeLifecycleScript, checkGypPromise = null;
      function checkForGypIfNeeded(config, cmd, paths) {
        return "node-gyp" !== cmd.substr(0, cmd.indexOf(" ")) ? Promise.resolve() : (checkGypPromise || (checkGypPromise = function() {
          return _checkForGyp2.apply(this, arguments);
        }(config, paths)), checkGypPromise);
      }
      function _checkForGyp2() {
        return (_checkForGyp2 = asyncToGenerator_asyncToGenerator((function*(config, paths) {
          var reporter = config.reporter;
          if (!(yield Promise.all(paths.map((dir => fs_exists(execute_lifecycle_script_path.join(dir, "node-gyp")))))).some(Boolean)) {
            reporter.info(reporter.lang("packageRequiresNodeGyp"));
            try {
              yield global_run(config, reporter, {}, [ "add", "node-gyp" ]);
            } catch (e) {
              throw new MessageError(reporter.lang("nodeGypAutoInstallFailed", e.message));
            }
          }
        }))).apply(this, arguments);
      }
      function _execFromManifest() {
        return (_execFromManifest = asyncToGenerator_asyncToGenerator((function*(config, commandName, cwd) {
          var pkg = yield config.maybeReadManifest(cwd);
          if (pkg && pkg.scripts) {
            var cmd = pkg.scripts[commandName];
            cmd && (yield execCommand({
              stage: commandName,
              config: config,
              cmd: cmd,
              cwd: cwd,
              isInteractive: !0
            }));
          }
        }))).apply(this, arguments);
      }
      function execCommand() {
        return _execCommand.apply(this, arguments);
      }
      function _execCommand() {
        return (_execCommand = asyncToGenerator_asyncToGenerator((function*(_ref2) {
          var stage = _ref2.stage, config = _ref2.config, cmd = _ref2.cmd, cwd = _ref2.cwd, isInteractive = _ref2.isInteractive, customShell = _ref2.customShell, reporter = config.reporter;
          try {
            return reporter.command(cmd), yield executeLifecycleScript({
              stage: stage,
              config: config,
              cwd: cwd,
              cmd: cmd,
              isInteractive: isInteractive,
              customShell: customShell
            }), Promise.resolve();
          } catch (err) {
            if (err instanceof ProcessTermError) {
              var formattedError = new ProcessTermError(err.EXIT_SIGNAL ? reporter.lang("commandFailedWithSignal", err.EXIT_SIGNAL) : reporter.lang("commandFailedWithCode", err.EXIT_CODE));
              throw formattedError.EXIT_CODE = err.EXIT_CODE, formattedError.EXIT_SIGNAL = err.EXIT_SIGNAL, 
              formattedError;
            }
            throw err;
          }
        }))).apply(this, arguments);
      }
      var FALSY_STRINGS = new Set([ "0", "false" ]);
      function boolify(val) {
        return !FALSY_STRINGS.has(val.toString().toLowerCase());
      }
      function boolifyWithDefault(val, defaultResult) {
        return "" === val || null == val ? defaultResult : boolify(val);
      }
      var package_constraint_resolver_semver = __webpack_require__(92878);
      class PackageConstraintResolver {
        constructor(config, reporter) {
          this.reporter = reporter, this.config = config;
        }
        reduce(versions, range) {
          return "latest" === range ? Promise.resolve(versions[versions.length - 1]) : Promise.resolve(package_constraint_resolver_semver.maxSatisfying(versions, range, this.config.looseSemver));
        }
      }
      var network_os = __webpack_require__(22037), IGNORE_INTERFACES = [ "lo0", "awdl0", "bridge0" ], LOCAL_IPS = [ "127.0.0.1", "::1" ];
      function isOffline() {
        var interfaces;
        try {
          interfaces = network_os.networkInterfaces();
        } catch (e) {
          if ("uv_interface_addresses" === e.syscall) return !1;
          throw e;
        }
        for (var name in interfaces) if (!(IGNORE_INTERFACES.indexOf(name) >= 0)) {
          var addrs = interfaces[name];
          for (var addr of addrs) if (LOCAL_IPS.indexOf(addr.address) < 0) return !1;
        }
        return !0;
      }
      var request_manager_fs = __webpack_require__(57147), http = __webpack_require__(13685), request_manager_url = __webpack_require__(57310), dnscache = __webpack_require__(74925), request_manager_invariant = __webpack_require__(46128), RequestCaptureHar = __webpack_require__(37179);
      dnscache({
        enable: !0,
        ttl: 300,
        cachesize: 10
      });
      var successHosts = nullify(), controlOffline = isOffline();
      class RequestManager {
        constructor(reporter) {
          this.offlineNoRequests = !1, this._requestCaptureHar = null, this._requestModule = null, 
          this.offlineQueue = [], this.captureHar = !1, this.httpsProxy = "", this.ca = null, 
          this.httpProxy = "", this.strictSSL = !0, this.userAgent = "", this.reporter = reporter, 
          this.running = 0, this.queue = [], this.cache = {}, this.max = 8, this.maxRetryAttempts = 5;
        }
        setOptions(opts) {
          if (null != opts.userAgent && (this.userAgent = opts.userAgent), null != opts.offline && (this.offlineNoRequests = opts.offline), 
          null != opts.captureHar && (this.captureHar = opts.captureHar), null != opts.httpProxy && (this.httpProxy = opts.httpProxy || ""), 
          "" === opts.httpsProxy ? this.httpsProxy = opts.httpProxy || "" : !1 === opts.httpsProxy ? this.httpsProxy = !1 : this.httpsProxy = opts.httpsProxy || "", 
          null !== opts.strictSSL && void 0 !== opts.strictSSL && (this.strictSSL = opts.strictSSL), 
          null != opts.ca && opts.ca.length > 0 && (this.ca = opts.ca), null != opts.networkConcurrency && (this.max = opts.networkConcurrency), 
          null != opts.networkTimeout && (this.timeout = opts.networkTimeout), null != opts.maxRetryAttempts && (this.maxRetryAttempts = opts.maxRetryAttempts), 
          null != opts.cafile && "" != opts.cafile) try {
            var bundle = request_manager_fs.readFileSync(opts.cafile).toString();
            this.ca = bundle.split(/(-----BEGIN .*\r?\n[^-]+\r?\n--.*)/).filter((block => block.startsWith("-----BEGIN ")));
          } catch (err) {
            this.reporter.error(`Could not open cafile: ${err.message}`);
          }
          null != opts.cert && (this.cert = opts.cert), null != opts.key && (this.key = opts.key);
        }
        _getRequestModule() {
          if (!this._requestModule) {
            var request = __webpack_require__(34079);
            this.captureHar ? (this._requestCaptureHar = new RequestCaptureHar(request), this._requestModule = this._requestCaptureHar.request.bind(this._requestCaptureHar)) : this._requestModule = request;
          }
          return this._requestModule;
        }
        request(params) {
          if (this.offlineNoRequests) return Promise.reject(new MessageError(this.reporter.lang("cantRequestOffline", params.url)));
          var cached = this.cache[params.url];
          if (cached) return cached;
          params.method = params.method || "GET", params.forever = !0, params.retryAttempts = 0, 
          params.strictSSL = this.strictSSL, params.headers = Object.assign({
            "User-Agent": this.userAgent
          }, params.headers);
          var promise = new Promise(((resolve, reject) => {
            this.queue.push({
              params: params,
              reject: reject,
              resolve: resolve
            }), this.shiftQueue();
          }));
          return params.process || (this.cache[params.url] = promise), promise;
        }
        clearCache() {
          this.cache = {}, null != this._requestCaptureHar && this._requestCaptureHar.clear();
        }
        isPossibleOfflineError(err) {
          var code = err.code, hostname = err.hostname;
          if (!code) return !1;
          var possibleOfflineChange = !controlOffline && !isOffline();
          return !("ENOTFOUND" !== code || !possibleOfflineChange) || (!("ENOTFOUND" !== code || !hostname || !successHosts[hostname]) || (!("ENOTFOUND" !== code || !controlOffline) || ("ECONNRESET" === code || ("ESOCKETTIMEDOUT" === code || "ETIMEDOUT" === code))));
        }
        queueForRetry(opts) {
          if (opts.retryReason) {
            var containsReason = !1;
            for (var queuedOpts of this.offlineQueue) if (queuedOpts.retryReason === opts.retryReason) {
              containsReason = !0;
              break;
            }
            containsReason || this.reporter.info(opts.retryReason);
          }
          this.offlineQueue.length || this.initOfflineRetry(), this.offlineQueue.push(opts);
        }
        initOfflineRetry() {
          setTimeout((() => {
            var queue = this.offlineQueue;
            for (var opts of (this.offlineQueue = [], queue)) this.execute(opts);
          }), 3e3);
        }
        execute(opts) {
          var params = opts.params, reporter = this.reporter, buildNext = fn => data => {
            fn(data), this.running--, this.shiftQueue();
          }, resolve = buildNext(opts.resolve), rejectNext = buildNext(opts.reject), reject = function(err) {
            err.message = `${params.url}: ${err.message}`, rejectNext(err);
          }, queueForRetry = reason => {
            var attempts = params.retryAttempts || 0;
            return !(attempts >= this.maxRetryAttempts - 1) && ((!opts.params.method || "GET" === opts.params.method.toUpperCase()) && (params.retryAttempts = attempts + 1, 
            "function" == typeof params.cleanup && params.cleanup(), opts.retryReason = reason, 
            this.queueForRetry(opts), !0));
          }, calledOnError = !1, onError = err => {
            calledOnError || (calledOnError = !0, this.isPossibleOfflineError(err) && queueForRetry(this.reporter.lang("offlineRetrying")) || reject(err));
          };
          if (!params.process) {
            var parts = request_manager_url.parse(params.url);
            params.callback = (err, res, body) => {
              if (err) onError(err); else {
                if (successHosts[parts.hostname] = !0, this.reporter.verbose(this.reporter.lang("verboseRequestFinish", params.url, res.statusCode)), 
                408 === res.statusCode || res.statusCode >= 500) {
                  var description = `${res.statusCode} ${http.STATUS_CODES[res.statusCode]}`;
                  if (queueForRetry(this.reporter.lang("internalServerErrorRetrying", description))) return;
                  throw new ResponseError(this.reporter.lang("requestFailed", description), res.statusCode);
                }
                if (401 === res.statusCode && res.caseless && "GitHub.com" === res.caseless.get("server")) {
                  var message = `${res.body.message}. If using GITHUB_TOKEN in your env, check that it is valid.`;
                  !function(err) {
                    err.message = err.message, rejectNext(err);
                  }(new Error(this.reporter.lang("unauthorizedResponse", res.caseless.get("server"), message)));
                }
                if (401 === res.statusCode && res.headers["www-authenticate"]) if (-1 !== res.headers["www-authenticate"].split(/,\s*/).map((s => s.toLowerCase())).indexOf("otp")) return void reject(new OneTimePasswordError(res.headers["npm-notice"]));
                if (body && "string" == typeof body.error) reject(new Error(body.error)); else if (-1 !== [ 400, 401, 404 ].concat(params.rejectStatusCode || []).indexOf(res.statusCode)) resolve(!1); else if (res.statusCode >= 400) {
                  var errMsg = body && body.message || reporter.lang("requestError", params.url, res.statusCode);
                  reject(new Error(errMsg));
                } else resolve(body);
              }
            };
          }
          params.buffer && (params.encoding = null);
          var proxy = this.httpProxy;
          params.url.startsWith("https:") && (proxy = this.httpsProxy), proxy ? params.proxy = String(proxy) : !1 === proxy && (params.proxy = ""), 
          null != this.ca && (params.ca = this.ca), null != this.cert && (params.cert = this.cert), 
          null != this.key && (params.key = this.key), null != this.timeout && (params.timeout = this.timeout);
          var req = this._getRequestModule()(params);
          this.reporter.verbose(this.reporter.lang("verboseRequestStart", params.method, params.url)), 
          req.on("error", onError);
          var queue = params.queue;
          queue && req.on("data", queue.stillActive.bind(queue));
          var process = params.process;
          process && (req.on("response", (res => {
            if (!(res.statusCode >= 200 && res.statusCode < 300)) {
              var description = `${res.statusCode} ${http.STATUS_CODES[res.statusCode]}`;
              reject(new ResponseError(this.reporter.lang("requestFailed", description), res.statusCode)), 
              req.abort();
            }
          })), process(req, resolve, reject));
        }
        shiftQueue() {
          if (!(this.running >= this.max) && this.queue.length) {
            var opts = this.queue.shift();
            this.running++, this.execute(opts);
          }
        }
        saveHar(filename) {
          if (!this.captureHar) throw new Error(this.reporter.lang("requestManagerNotSetupHAR"));
          this._getRequestModule(), request_manager_invariant(null != this._requestCaptureHar, "request-capture-har not setup"), 
          this._requestCaptureHar.saveHar(filename);
        }
      }
      __webpack_require__(6113);
      var detectIndent = __webpack_require__(90447), config_invariant = __webpack_require__(46128), config_path = __webpack_require__(71017), config_micromatch = __webpack_require__(70850), isCi = __webpack_require__(81876);
      function sortObject(object) {
        var sortedObject = {};
        return Object.keys(object).sort().forEach((item => {
          sortedObject[item] = object[item];
        })), sortedObject;
      }
      class Config {
        constructor(reporter) {
          this.constraintResolver = new PackageConstraintResolver(this, reporter), this.requestManager = new RequestManager(reporter), 
          this.reporter = reporter, this._init({});
        }
        getCache(key, factory) {
          var cached = this.cache[key];
          return cached || (this.cache[key] = factory().catch((err => {
            throw this.cache[key] = null, err;
          })));
        }
        getOption(key, resolve) {
          void 0 === resolve && (resolve = !1);
          var value = this.registries.yarn.getOption(key);
          return resolve && "string" == typeof value && value.length ? resolveWithHome(value) : value;
        }
        resolveConstraints(versions, range) {
          return this.constraintResolver.reduce(versions, range);
        }
        init(opts) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (void 0 === opts && (opts = {}), _this._init(opts), _this.workspaceRootFolder = yield _this.findWorkspaceRoot(_this.cwd), 
            _this.lockfileFolder = _this.workspaceRootFolder || _this.cwd, _this.focus && (!_this.workspaceRootFolder || _this.cwd === _this.workspaceRootFolder)) throw new MessageError(_this.reporter.lang("workspacesFocusRootCheck"));
            if (_this.focus) {
              var focusedWorkspaceManifest = yield _this.readRootManifest();
              _this.focusedWorkspaceName = focusedWorkspaceManifest.name;
            }
            var linkedModules;
            _this.linkedModules = [];
            try {
              linkedModules = yield readdir(_this.linkFolder);
            } catch (err) {
              if ("ENOENT" !== err.code) throw err;
              linkedModules = [];
            }
            var _loop = function*(dir) {
              var linkedPath = config_path.join(_this.linkFolder, dir);
              if ("@" === dir[0]) {
                var _this$linkedModules, scopedLinked = yield readdir(linkedPath);
                (_this$linkedModules = _this.linkedModules).push.apply(_this$linkedModules, scopedLinked.map((scopedDir => config_path.join(dir, scopedDir))));
              } else _this.linkedModules.push(dir);
            };
            for (var dir of linkedModules) yield* _loop(dir);
            for (var _key of Object.keys(registries)) {
              var Registry = registries[_key], extraneousRcFiles = Registry === registries.yarn ? _this.extraneousYarnrcFiles : [], registry = new Registry(_this.cwd, _this.registries, _this.requestManager, _this.reporter, _this.enableDefaultRc, extraneousRcFiles);
              yield registry.init({
                registry: opts.registry
              }), _this.registries[_key] = registry, -1 === _this.registryFolders.indexOf(registry.folder) && _this.registryFolders.push(registry.folder);
            }
            _this.modulesFolder && (_this.registryFolders = [ _this.modulesFolder ]), _this.networkConcurrency = opts.networkConcurrency || Number(_this.getOption("network-concurrency")) || 8, 
            _this.childConcurrency = opts.childConcurrency || Number(_this.getOption("child-concurrency")) || Number(process.env.CHILD_CONCURRENCY) || 5, 
            _this.networkTimeout = opts.networkTimeout || Number(_this.getOption("network-timeout")) || 3e4;
            var httpProxy = opts.httpProxy || _this.getOption("proxy"), httpsProxy = opts.httpsProxy || _this.getOption("https-proxy");
            _this.requestManager.setOptions({
              userAgent: String(_this.getOption("user-agent")),
              httpProxy: !1 !== httpProxy && String(httpProxy || ""),
              httpsProxy: !1 !== httpsProxy && String(httpsProxy || ""),
              strictSSL: Boolean(_this.getOption("strict-ssl")),
              ca: Array.prototype.concat(opts.ca || _this.getOption("ca") || []).map(String),
              cafile: String(opts.cafile || _this.getOption("cafile", !0) || ""),
              cert: String(opts.cert || _this.getOption("cert") || ""),
              key: String(opts.key || _this.getOption("key") || ""),
              networkConcurrency: _this.networkConcurrency,
              networkTimeout: _this.networkTimeout
            }), _this.packageDateLimit = opts.packageDateLimit || String(_this.getOption("package-date-limit") || "") || null, 
            _this.disableWrappersFolder = Boolean(_this.getOption("disable-wrappers-folder")), 
            _this.globalFolder = opts.globalFolder || String(_this.getOption("global-folder", !0)), 
            "undefined" === _this.globalFolder && (_this.globalFolder = GLOBAL_MODULE_DIRECTORY);
            var cacheRootFolder = opts.cacheFolder || _this.getOption("cache-folder", !0);
            if (!cacheRootFolder) {
              var preferredCacheFolders = PREFERRED_MODULE_CACHE_DIRECTORIES, preferredCacheFolder = opts.preferredCacheFolder || _this.getOption("preferred-cache-folder", !0);
              preferredCacheFolder && (preferredCacheFolders = [ String(preferredCacheFolder) ].concat(preferredCacheFolders));
              var cacheFolderQuery = yield getFirstSuitableFolder(preferredCacheFolders, constants.W_OK | constants.X_OK | constants.R_OK);
              for (var skippedEntry of cacheFolderQuery.skipped) _this.reporter.warn(_this.reporter.lang("cacheFolderSkipped", skippedEntry.folder));
              (cacheRootFolder = cacheFolderQuery.folder) && cacheFolderQuery.skipped.length > 0 && _this.reporter.warn(_this.reporter.lang("cacheFolderSelected", cacheRootFolder));
            }
            if (!cacheRootFolder) throw new MessageError(_this.reporter.lang("cacheFolderMissing"));
            _this._cacheRootFolder = String(cacheRootFolder);
            var manifest = yield _this.maybeReadManifest(_this.lockfileFolder), plugnplayByEnv = _this.getOption("plugnplay-override");
            (null != plugnplayByEnv ? (_this.plugnplayEnabled = "false" !== plugnplayByEnv && "0" !== plugnplayByEnv, 
            _this.plugnplayPersist = !1) : opts.enablePnp || opts.disablePnp ? (_this.plugnplayEnabled = !!opts.enablePnp, 
            _this.plugnplayPersist = !0) : manifest && manifest.installConfig && manifest.installConfig.pnp ? (_this.plugnplayEnabled = !!manifest.installConfig.pnp, 
            _this.plugnplayPersist = !1) : (_this.plugnplayEnabled = !1, _this.plugnplayPersist = !1), 
            "win32" === process.platform) && (config_path.parse(_this._cacheRootFolder).root.toLowerCase() !== config_path.parse(_this.lockfileFolder).root.toLowerCase() && (_this.plugnplayEnabled && _this.reporter.warn(_this.reporter.lang("plugnplayWindowsSupport")), 
            _this.plugnplayEnabled = !1, _this.plugnplayPersist = !1));
            if (_this.plugnplayShebang = String(_this.getOption("plugnplay-shebang") || "") || "/usr/bin/env node", 
            _this.plugnplayBlacklist = String(_this.getOption("plugnplay-blacklist") || "") || null, 
            _this.ignoreScripts = opts.ignoreScripts || Boolean(_this.getOption("ignore-scripts", !1)), 
            _this.workspacesEnabled = !1 !== _this.getOption("workspaces-experimental"), _this.workspacesNohoistEnabled = !1 !== _this.getOption("workspaces-nohoist-experimental"), 
            _this.offlineCacheFolder = String(_this.getOption("offline-cache-folder") || "") || null, 
            _this.pruneOfflineMirror = Boolean(_this.getOption("yarn-offline-mirror-pruning")), 
            _this.enableMetaFolder = Boolean(_this.getOption("enable-meta-folder")), _this.enableLockfileVersions = Boolean(_this.getOption("yarn-enable-lockfile-versions")), 
            _this.linkFileDependencies = Boolean(_this.getOption("yarn-link-file-dependencies")), 
            _this.packBuiltPackages = Boolean(_this.getOption("experimental-pack-script-packages-in-mirror")), 
            _this.autoAddIntegrity = !boolifyWithDefault(String(_this.getOption("unsafe-disable-integrity-migration")), !0), 
            _this.cacheFolder = config_path.join(_this._cacheRootFolder, "v" + String(6)), _this.tempFolder = opts.tempFolder || config_path.join(_this.cacheFolder, ".tmp"), 
            yield mkdirp(_this.cacheFolder), yield mkdirp(_this.tempFolder), void 0 !== opts.production ? _this.production = Boolean(opts.production) : _this.production = Boolean(_this.getOption("production")) || "production" === process.env.NODE_ENV && "false" !== process.env.NPM_CONFIG_PRODUCTION && "false" !== process.env.YARN_PRODUCTION, 
            _this.workspaceRootFolder && !_this.workspacesEnabled) throw new MessageError(_this.reporter.lang("workspacesDisabled"));
          }))();
        }
        _init(opts) {
          this.registryFolders = [], this.linkedModules = [], this.registries = nullify(), 
          this.cache = nullify(), this.cwd = config_path.resolve(opts.cwd || this.cwd || process.cwd()), 
          this.looseSemver = null == opts.looseSemver || opts.looseSemver, this.commandName = opts.commandName || "", 
          this.enableDefaultRc = !1 !== opts.enableDefaultRc, this.extraneousYarnrcFiles = opts.extraneousYarnrcFiles || [], 
          this.preferOffline = !!opts.preferOffline, this.modulesFolder = opts.modulesFolder, 
          this.linkFolder = opts.linkFolder || LINK_REGISTRY_DIRECTORY, this.offline = !!opts.offline, 
          this.binLinks = !!opts.binLinks, this.updateChecksums = !!opts.updateChecksums, 
          this.plugnplayUnplugged = [], this.plugnplayPurgeUnpluggedPackages = !1, this.ignorePlatform = !!opts.ignorePlatform, 
          this.ignoreScripts = !!opts.ignoreScripts, this.disablePrepublish = !!opts.disablePrepublish, 
          this.nonInteractive = !!opts.nonInteractive || isCi || !process.stdout.isTTY, this.requestManager.setOptions({
            offline: !!opts.offline && !opts.preferOffline,
            captureHar: !!opts.captureHar
          }), this.focus = !!opts.focus, this.focusedWorkspaceName = "", this.otp = opts.otp || "";
        }
        generateUniquePackageSlug(pkg) {
          var slug = pkg.name;
          slug = (slug = slug.replace(/[^@a-z0-9]+/g, "-")).replace(/^-+|-+$/g, ""), slug = pkg.registry ? `${pkg.registry}-${slug}` : `unknown-${slug}`;
          var hash = pkg.remote.hash;
          return pkg.version && (slug += `-${pkg.version}`), pkg.uid && pkg.version !== pkg.uid ? slug += `-${pkg.uid}` : hash && (slug += `-${hash}`), 
          pkg.remote.integrity && (slug += "-integrity"), slug;
        }
        generateModuleCachePath(pkg) {
          config_invariant(this.cacheFolder, "No package root"), config_invariant(pkg, "Undefined package");
          var slug = this.generateUniquePackageSlug(pkg);
          return config_path.join(this.cacheFolder, slug, "node_modules", pkg.name);
        }
        getUnpluggedPath() {
          return config_path.join(this.lockfileFolder, ".pnp", "unplugged");
        }
        generatePackageUnpluggedPath(pkg) {
          var slug = this.generateUniquePackageSlug(pkg);
          return config_path.join(this.getUnpluggedPath(), slug, "node_modules", pkg.name);
        }
        listUnpluggedPackageFolders() {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var unpluggedPackages = new Map, unpluggedPath = _this2.getUnpluggedPath();
            if (!(yield fs_exists(unpluggedPath))) return unpluggedPackages;
            for (var unpluggedName of yield readdir(unpluggedPath)) {
              var nmListing = yield readdir(config_path.join(unpluggedPath, unpluggedName, "node_modules"));
              config_invariant(1 === nmListing.length, "A single folder should be in the unplugged directory");
              var target = config_path.join(unpluggedPath, unpluggedName, "node_modules", nmListing[0]);
              unpluggedPackages.set(unpluggedName, target);
            }
            return unpluggedPackages;
          }))();
        }
        executeLifecycleScript(commandName, cwd) {
          return this.ignoreScripts ? Promise.resolve() : function() {
            return _execFromManifest.apply(this, arguments);
          }(this, commandName, cwd || this.cwd);
        }
        getTemp(filename) {
          return config_invariant(this.tempFolder, "No temp folder"), config_path.join(this.tempFolder, filename);
        }
        getOfflineMirrorPath(packageFilename) {
          var mirrorPath;
          for (var _key2 of [ "npm", "yarn" ]) {
            var registry = this.registries[_key2];
            if (null != registry) {
              var registryMirrorPath = registry.config["yarn-offline-mirror"];
              if (!1 === registryMirrorPath) return null;
              null != registryMirrorPath && (mirrorPath = registryMirrorPath);
            }
          }
          return null == mirrorPath ? null : null == packageFilename ? mirrorPath : config_path.join(mirrorPath, config_path.basename(packageFilename));
        }
        isValidModuleDest(dest) {
          return asyncToGenerator_asyncToGenerator((function*() {
            return !!(yield fs_exists(dest)) && !!(yield fs_exists(config_path.join(dest, ".yarn-metadata.json")));
          }))();
        }
        readPackageMetadata(dir) {
          var _this3 = this;
          return this.getCache(`metadata-${dir}`, asyncToGenerator_asyncToGenerator((function*() {
            var metadata = yield _this3.readJson(config_path.join(dir, ".yarn-metadata.json"));
            return {
              package: yield _this3.readManifest(dir, metadata.registry),
              artifacts: metadata.artifacts || [],
              hash: metadata.hash,
              remote: metadata.remote,
              registry: metadata.registry
            };
          })));
        }
        readManifest(dir, priorityRegistry, isRoot) {
          var _this4 = this;
          return void 0 === isRoot && (isRoot = !1), this.getCache(`manifest-${dir}`, asyncToGenerator_asyncToGenerator((function*() {
            var manifest = yield _this4.maybeReadManifest(dir, priorityRegistry, isRoot);
            if (manifest) return manifest;
            throw new MessageError(_this4.reporter.lang("couldntFindPackagejson", dir), "ENOENT");
          })));
        }
        maybeReadManifest(dir, priorityRegistry, isRoot) {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            void 0 === isRoot && (isRoot = !1);
            var metadataLoc = config_path.join(dir, ".yarn-metadata.json");
            if (yield fs_exists(metadataLoc)) {
              var metadata = yield _this5.readJson(metadataLoc);
              if (priorityRegistry || (priorityRegistry = metadata.priorityRegistry), void 0 !== metadata.manifest) return metadata.manifest;
            }
            if (priorityRegistry) {
              var file = yield _this5.tryManifest(dir, priorityRegistry, isRoot);
              if (file) return file;
            }
            for (var registry of Object.keys(registries)) if (priorityRegistry !== registry) {
              var _file = yield _this5.tryManifest(dir, registry, isRoot);
              if (_file) return _file;
            }
            return null;
          }))();
        }
        readRootManifest() {
          return this.readManifest(this.cwd, "npm", !0);
        }
        tryManifest(dir, registry, isRoot) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var filename = registries[registry].filename, loc = config_path.join(dir, filename);
            if (yield fs_exists(loc)) {
              var data = yield _this6.readJson(loc);
              return data._registry = registry, data._loc = loc, normalize_manifest(data, dir, _this6, isRoot);
            }
            return null;
          }))();
        }
        findManifest(dir, isRoot) {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var registry of registryNames) {
              var manifest = yield _this7.tryManifest(dir, registry, isRoot);
              if (manifest) return manifest;
            }
            return null;
          }))();
        }
        findWorkspaceRoot(initial) {
          var _this8 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var previous = null, current = config_path.normalize(initial);
            if (!(yield fs_exists(current))) throw new MessageError(_this8.reporter.lang("folderMissing", current));
            do {
              var ws = extractWorkspaces(yield _this8.findManifest(current, !0));
              if (ws && ws.packages) {
                var relativePath = config_path.relative(current, initial);
                return "" === relativePath || config_micromatch([ relativePath ], ws.packages).length > 0 ? current : null;
              }
              previous = current, current = config_path.dirname(current);
            } while (current !== previous);
            return null;
          }))();
        }
        resolveWorkspaces(root, rootManifest) {
          var _this9 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var workspaces = {};
            if (!_this9.workspacesEnabled) return workspaces;
            var ws = _this9.getWorkspaces(rootManifest, !0), patterns = ws && ws.packages ? ws.packages : [];
            if (!Array.isArray(patterns)) throw new MessageError(_this9.reporter.lang("workspacesSettingMustBeArray"));
            var registryFilenames = registryNames.map((registryName => _this9.registries[registryName].constructor.filename)).join("|"), trailingPattern = `/+(${registryFilenames})`, ignorePatterns = _this9.registryFolders.map((folder => `/${folder}/**/+(${registryFilenames})`)), files = yield Promise.all(patterns.map((pattern => glob(pattern.replace(/\/?$/, trailingPattern), {
              cwd: root,
              ignore: ignorePatterns.map((ignorePattern => pattern.replace(/\/?$/, ignorePattern)))
            }))));
            for (var file of new Set(Array.prototype.concat.apply([], files))) {
              var loc = config_path.join(root, config_path.dirname(file)), manifest = yield _this9.findManifest(loc, !1);
              if (manifest) if (manifest.name) if (manifest.version) {
                if (Object.prototype.hasOwnProperty.call(workspaces, manifest.name)) throw new MessageError(_this9.reporter.lang("workspaceNameDuplicate", manifest.name));
                workspaces[manifest.name] = {
                  loc: loc,
                  manifest: manifest
                };
              } else _this9.reporter.warn(_this9.reporter.lang("workspaceVersionMandatory", loc)); else _this9.reporter.warn(_this9.reporter.lang("workspaceNameMandatory", loc));
            }
            return workspaces;
          }))();
        }
        getWorkspaces(manifest, shouldThrow) {
          if (void 0 === shouldThrow && (shouldThrow = !1), manifest && this.workspacesEnabled) {
            var ws = extractWorkspaces(manifest);
            if (!ws) return ws;
            var wsCopy = _extends({}, ws), warnings = [], errors = [];
            if (wsCopy.packages && wsCopy.packages.length > 0 && !manifest.private && (errors.push(this.reporter.lang("workspacesRequirePrivateProjects")), 
            wsCopy = void 0), wsCopy && wsCopy.nohoist && wsCopy.nohoist.length > 0 && (this.workspacesNohoistEnabled ? manifest.private || (errors.push(this.reporter.lang("workspacesNohoistRequirePrivatePackages", manifest.name)), 
            wsCopy.nohoist = void 0) : (warnings.push(this.reporter.lang("workspacesNohoistDisabled", manifest.name)), 
            wsCopy.nohoist = void 0)), errors.length > 0 && shouldThrow) throw new MessageError(errors.join("\n"));
            var msg = errors.concat(warnings).join("\n");
            return msg.length > 0 && this.reporter.warn(msg), wsCopy;
          }
        }
        getFolder(pkg) {
          var registryName = pkg._registry;
          if (!registryName) {
            var ref = pkg._reference;
            config_invariant(ref, "expected reference"), registryName = ref.registry;
          }
          return this.registries[registryName].folder;
        }
        getRootManifests() {
          var _this10 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var manifests = {};
            for (var _registryName of registryNames) {
              var registry = registries[_registryName], jsonLoc = config_path.join(_this10.cwd, registry.filename), object = {}, exists = !1, indent = void 0;
              if (yield fs_exists(jsonLoc)) {
                exists = !0;
                var info = yield _this10.readJson(jsonLoc, readJsonAndFile);
                object = info.object, indent = detectIndent(info.content).indent || void 0;
              }
              manifests[_registryName] = {
                loc: jsonLoc,
                object: object,
                exists: exists,
                indent: indent
              };
            }
            return manifests;
          }))();
        }
        saveRootManifests(manifests) {
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var _registryName2 of registryNames) {
              var _manifests$_registryN = manifests[_registryName2], loc = _manifests$_registryN.loc, object = _manifests$_registryN.object, exists = _manifests$_registryN.exists, indent = _manifests$_registryN.indent;
              if (exists || Object.keys(object).length) {
                for (var field of DEPENDENCY_TYPES) object[field] && (object[field] = sortObject(object[field]));
                yield writeFilePreservingEol(loc, JSON.stringify(object, null, indent || "  ") + "\n");
              }
            }
          }))();
        }
        readJson(loc, factory) {
          void 0 === factory && (factory = readJson);
          try {
            return factory(loc);
          } catch (err) {
            throw err instanceof SyntaxError ? new MessageError(this.reporter.lang("jsonError", loc, err.message)) : err;
          }
        }
        static create(opts, reporter) {
          return asyncToGenerator_asyncToGenerator((function*() {
            void 0 === opts && (opts = {}), void 0 === reporter && (reporter = new NoopReporter);
            var config = new Config(reporter);
            return yield config.init(opts), config;
          }))();
        }
      }
      function extractWorkspaces(manifest) {
        if (manifest && manifest.workspaces) return Array.isArray(manifest.workspaces) ? {
          packages: manifest.workspaces
        } : manifest.workspaces.packages && Array.isArray(manifest.workspaces.packages) || manifest.workspaces.nohoist && Array.isArray(manifest.workspaces.nohoist) ? manifest.workspaces : void 0;
      }
      var mm = __webpack_require__(70850), filter_path = __webpack_require__(71017), WHITESPACE_RE = /^\s+$/;
      function sortFilter(files, filters, keepFiles, possibleKeepFiles, ignoreFiles) {
        for (var file of (void 0 === keepFiles && (keepFiles = new Set), void 0 === possibleKeepFiles && (possibleKeepFiles = new Set), 
        void 0 === ignoreFiles && (ignoreFiles = new Set), files)) {
          var keep = !1;
          for (var filter of filters) if (filter.isNegation && matchesFilter(filter, file.basename, file.relative)) {
            keep = !0;
            break;
          }
          if (keep) keepFiles.add(file.relative); else {
            for (var _filter of (keep = !0, filters)) if (!_filter.isNegation && matchesFilter(_filter, file.basename, file.relative)) {
              keep = !1;
              break;
            }
            keep ? possibleKeepFiles.add(file.relative) : ignoreFiles.add(file.relative);
          }
        }
        for (var _file of possibleKeepFiles) for (var parts = filter_path.dirname(_file).split(filter_path.sep); parts.length; ) {
          var folder = parts.join(filter_path.sep);
          if (ignoreFiles.has(folder)) {
            ignoreFiles.add(_file);
            break;
          }
          parts.pop();
        }
        for (var _file2 of possibleKeepFiles) ignoreFiles.has(_file2) || keepFiles.add(_file2);
        for (var _file3 of keepFiles) for (var _parts = filter_path.dirname(_file3).split(filter_path.sep); _parts.length; ) ignoreFiles.delete(_parts.join(filter_path.sep)), 
        _parts.pop();
        return {
          ignoreFiles: ignoreFiles,
          keepFiles: keepFiles
        };
      }
      function matchesFilter(filter, basename, loc) {
        var filterByBasename = !0;
        return filter.base && "." !== filter.base && (loc = filter_path.relative(filter.base, loc), 
        filterByBasename = !1), loc = loc.replace(/\\/g, "/"), filter.regex.test(loc) || filter.regex.test(`/${loc}`) || filterByBasename && filter.regex.test(basename) || mm.isMatch(loc, filter.pattern);
      }
      function ignoreLinesToRegex(lines, base) {
        return void 0 === base && (base = "."), lines.map((line => {
          if ("" === line || "!" === line || "#" === line[0] || WHITESPACE_RE.test(line)) return null;
          var pattern = line, isNegation = !1;
          "!" === pattern[0] && (isNegation = !0, pattern = pattern.slice(1)), pattern = removeSuffix(pattern, "/");
          var regex = mm.makeRe(pattern.trim(), {
            dot: !0,
            nocase: !0
          });
          return regex ? {
            base: base,
            isNegation: isNegation,
            pattern: pattern,
            regex: regex
          } : null;
        })).filter(Boolean);
      }
      function filterOverridenGitignores(files) {
        var IGNORE_FILENAMES = [ ".yarnignore", ".npmignore", ".gitignore" ], GITIGNORE_NAME = IGNORE_FILENAMES[2];
        return files.filter((file => IGNORE_FILENAMES.indexOf(file.basename) > -1)).reduce(((acc, file) => {
          if (file.basename !== GITIGNORE_NAME) return [].concat(acc, [ file ]);
          var dir = filter_path.dirname(file.absolute), higherPriorityIgnoreFilePaths = [ filter_path.join(dir, IGNORE_FILENAMES[0]), filter_path.join(dir, IGNORE_FILENAMES[1]) ], hasHigherPriorityFiles = files.find((file => higherPriorityIgnoreFilePaths.indexOf(filter_path.normalize(file.absolute)) > -1));
          return hasHigherPriorityFiles ? acc : [].concat(acc, [ file ]);
        }), []);
      }
      var zlib = __webpack_require__(59796), pack_path = __webpack_require__(71017), tar = __webpack_require__(95931), fs2 = __webpack_require__(57147), depsFor = __webpack_require__(6172), FOLDERS_IGNORE = [ ".git", "CVS", ".svn", ".hg", "node_modules" ], DEFAULT_IGNORE = ignoreLinesToRegex([].concat(FOLDERS_IGNORE, [ "yarn.lock", ".lock-wscript", ".wafpickle-{0..9}", "*.swp", "._*", "npm-debug.log", "yarn-error.log", ".npmrc", ".yarnrc", ".yarnrc.yml", ".npmignore", ".gitignore", ".DS_Store" ])), NEVER_IGNORE = ignoreLinesToRegex([ "!/package.json", "!/readme*", "!/+(license|licence)*", "!/+(changes|changelog|history)*" ]);
      function packTarball() {
        return _packTarball.apply(this, arguments);
      }
      function _packTarball() {
        return _packTarball = asyncToGenerator_asyncToGenerator((function*(config, _temp) {
          var mapHeader = (void 0 === _temp ? {} : _temp).mapHeader, pkg = yield config.readRootManifest(), bundleDependencies = pkg.bundleDependencies, main = pkg.main, onlyFiles = pkg.files, filters = NEVER_IGNORE.slice();
          onlyFiles || (filters = filters.concat(DEFAULT_IGNORE)), main && (filters = filters.concat(ignoreLinesToRegex([ "!/" + main ])));
          var bundleDependenciesFiles = [];
          if (bundleDependencies) for (var dependency of bundleDependencies) {
            var dependencyList = depsFor(dependency, config.cwd);
            for (var dep of dependencyList) {
              var filesForBundledDep = yield walk(dep.baseDir, null, new Set(FOLDERS_IGNORE));
              bundleDependenciesFiles = bundleDependenciesFiles.concat(filesForBundledDep);
            }
          }
          if (onlyFiles) {
            var lines = [ "*" ], regexes = ignoreLinesToRegex(lines = lines.concat(onlyFiles.map((filename => `!${filename}`)), onlyFiles.map((filename => `!${pack_path.join(filename, "**")}`))), "./");
            filters = filters.concat(regexes);
          }
          var files = yield walk(config.cwd, null, new Set(FOLDERS_IGNORE)), dotIgnoreFiles = filterOverridenGitignores(files);
          for (var file of dotIgnoreFiles) {
            var _regexes = ignoreLinesToRegex((yield readFile(file.absolute)).split("\n"), pack_path.dirname(file.relative));
            filters = filters.concat(_regexes);
          }
          var keepFiles = new Set, ignoredFiles = new Set, possibleKeepFiles = new Set;
          for (var _file of (sortFilter(files, filters, keepFiles, possibleKeepFiles, ignoredFiles), 
          bundleDependenciesFiles)) {
            var realPath = yield realpath(config.cwd);
            keepFiles.add(pack_path.relative(realPath, _file.absolute));
          }
          return packWithIgnoreAndHeaders(config.cwd, (name => {
            var relative = pack_path.relative(config.cwd, name);
            if (fs2.lstatSync(name).isDirectory()) {
              var isParentOfKeptFile = Array.from(keepFiles).some((name => !pack_path.relative(relative, name).startsWith("..")));
              return !isParentOfKeptFile;
            }
            return !keepFiles.has(relative);
          }), {
            mapHeader: mapHeader
          });
        })), _packTarball.apply(this, arguments);
      }
      function packWithIgnoreAndHeaders(cwd, ignoreFunction, _temp2) {
        var mapHeader = (void 0 === _temp2 ? {} : _temp2).mapHeader;
        return tar.pack(cwd, {
          ignore: ignoreFunction,
          sort: !0,
          map: header => {
            var suffix = "." === header.name ? "" : `/${header.name}`;
            return header.name = `package${suffix}`, delete header.uid, delete header.gid, mapHeader ? mapHeader(header) : header;
          }
        });
      }
      function pack() {
        return _pack.apply(this, arguments);
      }
      function _pack() {
        return (_pack = asyncToGenerator_asyncToGenerator((function*(config) {
          return (yield packTarball(config)).pipe(new zlib.Gzip);
        }))).apply(this, arguments);
      }
      function pack_setFlags(commander) {
        commander.description("Creates a compressed gzip archive of package dependencies."), 
        commander.option("-f, --filename <filename>", "filename");
      }
      function pack_hasWrapper(commander, args) {
        return !0;
      }
      function pack_run() {
        return commands_pack_run.apply(this, arguments);
      }
      function commands_pack_run() {
        return commands_pack_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var pkg = yield config.readRootManifest();
          if (!pkg.name) throw new MessageError(reporter.lang("noName"));
          if (!pkg.version) throw new MessageError(reporter.lang("noVersion"));
          var name, filename = flags.filename || pack_path.join(config.cwd, `${name = pkg.name, 
          "@" === name[0] ? name.substr(1).replace("/", "-") : name}-v${pkg.version}.tgz`);
          yield config.executeLifecycleScript("prepack");
          var stream = yield pack(config);
          yield new Promise(((resolve, reject) => {
            stream.pipe(fs2.createWriteStream(filename)), stream.on("error", reject), stream.on("close", resolve);
          })), yield config.executeLifecycleScript("postpack"), reporter.success(reporter.lang("packWroteTarball", filename));
        })), commands_pack_run.apply(this, arguments);
      }
      var git_fetcher_tarFs = __webpack_require__(95931), git_fetcher_url = __webpack_require__(57310), git_fetcher_path = __webpack_require__(71017), git_fetcher_fs = __webpack_require__(57147), git_fetcher_invariant = __webpack_require__(46128);
      class GitFetcher extends BaseFetcher {
        setupMirrorFromCache() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var tarballMirrorPath = _this.getTarballMirrorPath(), tarballCachePath = _this.getTarballCachePath();
            null != tarballMirrorPath && !(yield fs_exists(tarballMirrorPath)) && (yield fs_exists(tarballCachePath)) && (yield mkdirp(git_fetcher_path.dirname(tarballMirrorPath)), 
            yield copy(tarballCachePath, tarballMirrorPath, _this.reporter));
          }))();
        }
        getTarballMirrorPath(_temp) {
          var _ref$withCommit = (void 0 === _temp ? {} : _temp).withCommit, withCommit = void 0 === _ref$withCommit || _ref$withCommit, pathname = git_fetcher_url.parse(this.reference).pathname;
          if (null == pathname) return null;
          var hash = this.hash, packageFilename = withCommit && hash ? `${git_fetcher_path.basename(pathname)}-${hash}` : `${git_fetcher_path.basename(pathname)}`;
          return packageFilename.startsWith(":") && (packageFilename = packageFilename.substr(1)), 
          this.config.getOfflineMirrorPath(packageFilename);
        }
        getTarballCachePath() {
          return git_fetcher_path.join(this.dest, ".yarn-tarball.tgz");
        }
        getLocalPaths(override) {
          return [ override ? git_fetcher_path.resolve(this.config.cwd, override) : null, this.getTarballMirrorPath(), this.getTarballMirrorPath({
            withCommit: !1
          }), this.getTarballCachePath() ].filter((path => null != path));
        }
        fetchFromLocal(override) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var tarPaths = _this2.getLocalPaths(override), stream = yield readFirstAvailableStream(tarPaths);
            return new Promise(((resolve, reject) => {
              if (stream) {
                git_fetcher_invariant(stream, "cachedStream should be available at this point");
                var tarballPath = stream.path, untarStream = _this2._createUntarStream(_this2.dest), hashStream = new HashStream;
                stream.pipe(hashStream).pipe(untarStream).on("finish", (() => {
                  var expectHash = _this2.hash;
                  git_fetcher_invariant(expectHash, "Commit hash required");
                  hashStream.getHash();
                  resolve({
                    hash: expectHash
                  });
                })).on("error", (function(err) {
                  reject(new MessageError(this.reporter.lang("fetchErrorCorrupt", err.message, tarballPath)));
                }));
              } else reject(new MessageError(_this2.reporter.lang("tarballNotInNetworkOrCache", _this2.reference, tarPaths)));
            }));
          }))();
        }
        hasPrepareScript(git) {
          return asyncToGenerator_asyncToGenerator((function*() {
            var manifestFile = yield git.getFile("package.json");
            if (manifestFile) {
              var scripts = JSON.parse(manifestFile).scripts;
              return Boolean(scripts && scripts.prepare);
            }
            return !1;
          }))();
        }
        fetchFromExternal() {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var hash = _this3.hash;
            git_fetcher_invariant(hash, "Commit hash required");
            var gitUrl = Git.npmUrlToGitUrl(_this3.reference), git = new Git(_this3.config, gitUrl, hash);
            return yield git.init(), (yield _this3.hasPrepareScript(git)) ? yield _this3.fetchFromInstallAndPack(git) : yield _this3.fetchFromGitArchive(git), 
            {
              hash: hash
            };
          }))();
        }
        fetchFromInstallAndPack(git) {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var prepareDirectory = _this4.config.getTemp(`${crypto_hash(git.gitUrl.repository)}.${git.hash}.prepare`);
            yield unlink(prepareDirectory), yield git.clone(prepareDirectory);
            var _yield$Promise$all = yield Promise.all([ Config.create({
              binLinks: !0,
              cwd: prepareDirectory,
              disablePrepublish: !0,
              production: !1
            }, _this4.reporter), Lockfile.fromDirectory(prepareDirectory, _this4.reporter) ]), prepareConfig = _yield$Promise$all[0], prepareLockFile = _yield$Promise$all[1];
            yield install(prepareConfig, _this4.reporter, {}, prepareLockFile);
            var tarballMirrorPath = _this4.getTarballMirrorPath(), tarballCachePath = _this4.getTarballCachePath();
            tarballMirrorPath && (yield _this4._packToTarball(prepareConfig, tarballMirrorPath)), 
            tarballCachePath && (yield _this4._packToTarball(prepareConfig, tarballCachePath)), 
            yield _this4._packToDirectory(prepareConfig, _this4.dest), yield unlink(prepareDirectory);
          }))();
        }
        _packToTarball(config, path) {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var tarballStream = yield _this5._createTarballStream(config);
            yield new Promise(((resolve, reject) => {
              var writeStream = git_fetcher_fs.createWriteStream(path);
              tarballStream.on("error", reject), writeStream.on("error", reject), writeStream.on("end", resolve), 
              writeStream.on("open", (() => {
                tarballStream.pipe(writeStream);
              })), writeStream.once("finish", resolve);
            }));
          }))();
        }
        _packToDirectory(config, dest) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var tarballStream = yield _this6._createTarballStream(config);
            yield new Promise(((resolve, reject) => {
              var untarStream = _this6._createUntarStream(dest);
              tarballStream.on("error", reject), untarStream.on("error", reject), untarStream.on("end", resolve), 
              untarStream.once("finish", resolve), tarballStream.pipe(untarStream);
            }));
          }))();
        }
        _createTarballStream(config) {
          var savedPackedHeader = !1;
          return packTarball(config, {
            mapHeader: header => (savedPackedHeader || (savedPackedHeader = !0, header.pax = header.pax || {}, 
            header.pax.packed = "1"), header)
          });
        }
        _createUntarStream(dest) {
          var isPackedTarball = void 0;
          return git_fetcher_tarFs.extract(dest, {
            dmode: 365,
            fmode: 292,
            chown: !1,
            map: header => {
              void 0 === isPackedTarball && (isPackedTarball = header.pax && "1" === header.pax.packed), 
              isPackedTarball && (header.name = header.name.substr("package/".length));
            }
          });
        }
        fetchFromGitArchive(git) {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            yield git.clone(_this7.dest);
            var tarballMirrorPath = _this7.getTarballMirrorPath(), tarballCachePath = _this7.getTarballCachePath();
            tarballMirrorPath && (yield git.archive(tarballMirrorPath)), tarballCachePath && (yield git.archive(tarballCachePath));
          }))();
        }
        _fetch() {
          return this.fetchFromLocal().catch((err => this.fetchFromExternal()));
        }
      }
      class WorkspaceFetcher {
        constructor(dest, remote, config) {
          this.config = config, this.dest = dest, this.registry = remote.registry, this.workspaceDir = remote.reference, 
          this.registryRemote = remote.registryRemote;
        }
        setupMirrorFromCache() {
          return Promise.resolve();
        }
        fetch() {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var pkg = yield _this.config.readManifest(_this.workspaceDir, _this.registry);
            return _this.registryRemote && (yield _this.fetchRemoteWorkspace(_this.registryRemote, pkg)), 
            {
              resolved: null,
              hash: "",
              cached: !1,
              dest: _this.dest,
              package: _extends({}, pkg, {
                _uid: pkg.version
              })
            };
          }))();
        }
        fetchRemoteWorkspace(remote, manifest) {
          return fetchOneRemote(remote, manifest.name, manifest.version, this.dest, this.config);
        }
      }
      var package_fetcher_ssri = __webpack_require__(44240);
      function fetchCache() {
        return _fetchCache.apply(this, arguments);
      }
      function _fetchCache() {
        return (_fetchCache = asyncToGenerator_asyncToGenerator((function*(dest, fetcher, config, remote) {
          var _yield$config$readPac = yield config.readPackageMetadata(dest), hash = _yield$config$readPac.hash, pkg = _yield$config$readPac.package, cacheRemote = _yield$config$readPac.remote, cacheIntegrity = cacheRemote.cacheIntegrity || cacheRemote.integrity, cacheHash = cacheRemote.hash;
          if (remote.integrity && (!cacheIntegrity || !package_fetcher_ssri.parse(cacheIntegrity).match(remote.integrity))) throw new SecurityError(config.reporter.lang("fetchBadIntegrityCache", pkg.name, cacheIntegrity, remote.integrity));
          if (remote.hash && (!cacheHash || cacheHash !== remote.hash)) throw new SecurityError(config.reporter.lang("fetchBadHashCache", pkg.name, cacheHash, remote.hash));
          return yield fetcher.setupMirrorFromCache(), {
            package: pkg,
            hash: hash,
            dest: dest,
            cached: !0
          };
        }))).apply(this, arguments);
      }
      function fetchOneRemote() {
        return _fetchOneRemote.apply(this, arguments);
      }
      function _fetchOneRemote() {
        return (_fetchOneRemote = asyncToGenerator_asyncToGenerator((function*(remote, name, version, dest, config) {
          if ("link" === remote.type) {
            return Promise.resolve({
              resolved: null,
              hash: "",
              dest: dest,
              package: {
                _uid: "",
                name: "",
                version: "0.0.0"
              },
              cached: !1
            });
          }
          var Fetcher = fetchers_namespaceObject[remote.type];
          if (!Fetcher) throw new MessageError(config.reporter.lang("unknownFetcherFor", remote.type));
          var fetcher = new Fetcher(dest, remote, config);
          if (yield config.isValidModuleDest(dest)) return fetchCache(dest, fetcher, config, remote);
          yield unlink(dest);
          try {
            return yield fetcher.fetch({
              name: name,
              version: version
            });
          } catch (err) {
            try {
              yield unlink(dest);
            } catch (err2) {}
            throw err;
          }
        }))).apply(this, arguments);
      }
      function fetchOne(ref, config) {
        var dest = config.generateModuleCachePath(ref);
        return fetchOneRemote(ref.remote, ref.name, ref.version, dest, config);
      }
      function _maybeFetchOne() {
        return (_maybeFetchOne = asyncToGenerator_asyncToGenerator((function*(ref, config) {
          try {
            return yield fetchOne(ref, config);
          } catch (err) {
            if (ref.optional) return config.reporter.error(err.message), null;
            throw err;
          }
        }))).apply(this, arguments);
      }
      function fetch(pkgs, config) {
        var pkgsPerDest = new Map;
        pkgs = pkgs.filter((pkg => {
          var ref = pkg._reference;
          if (!ref) return !1;
          var dest = config.generateModuleCachePath(ref), otherPkg = pkgsPerDest.get(dest);
          return otherPkg ? (config.reporter.warn(config.reporter.lang("multiplePackagesCantUnpackInSameDestination", ref.patterns, dest, otherPkg.patterns)), 
          !1) : (pkgsPerDest.set(dest, ref), !0);
        }));
        var tick = config.reporter.progress(pkgs.length);
        return promise_queue(pkgs, function() {
          var _ref = asyncToGenerator_asyncToGenerator((function*(pkg) {
            var ref = pkg._reference;
            if (!ref) return pkg;
            var newPkg, res = yield function() {
              return _maybeFetchOne.apply(this, arguments);
            }(ref, config);
            if (res && (newPkg = res.package, ref.remote.hash)) {
              if (ref.remote.hash !== res.hash && config.updateChecksums) {
                var oldHash = ref.remote.hash;
                ref.remote.resolved && (ref.remote.resolved = ref.remote.resolved.replace(oldHash, res.hash)), 
                ref.config.cache = Object.keys(ref.config.cache).reduce(((cache, entry) => (cache[entry.replace(oldHash, res.hash)] = ref.config.cache[entry], 
                cache)), {});
              }
              ref.remote.hash = res.hash || ref.remote.hash;
            }
            return tick && tick(), newPkg ? (newPkg._reference = ref, newPkg._remote = ref.remote, 
            newPkg.name = pkg.name, newPkg.fresh = pkg.fresh, newPkg) : pkg;
          }));
          return function() {
            return _ref.apply(this, arguments);
          };
        }(), config.networkConcurrency);
      }
      var package_install_scripts_fs = __webpack_require__(57147), package_install_scripts_invariant = __webpack_require__(46128), package_install_scripts_path = __webpack_require__(71017), INSTALL_STAGES = [ "preinstall", "install", "postinstall" ];
      class PackageInstallScripts {
        constructor(config, resolver, force) {
          this.installed = 0, this.resolver = resolver, this.reporter = config.reporter, this.config = config, 
          this.force = force, this.artifacts = {};
        }
        setForce(force) {
          this.force = force;
        }
        setArtifacts(artifacts) {
          this.artifacts = artifacts;
        }
        getArtifacts() {
          return this.artifacts;
        }
        getInstallCommands(pkg) {
          var scripts = pkg.scripts;
          if (scripts) {
            var cmds = [];
            for (var stage of INSTALL_STAGES) {
              var cmd = scripts[stage];
              cmd && cmds.push([ stage, cmd ]);
            }
            return cmds;
          }
          return [];
        }
        walk(loc) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var files = yield walk(loc, null, new Set(_this.config.registryFolders)), mtimes = new Map;
            for (var file of files) mtimes.set(file.relative, file.mtime);
            return mtimes;
          }))();
        }
        saveBuildArtifacts(loc, pkg, beforeFiles, spinner) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var afterFiles = yield _this2.walk(loc), buildArtifacts = [];
            for (var _ref of afterFiles) {
              var file = _ref[0], mtime = _ref[1];
              beforeFiles.has(file) && beforeFiles.get(file) === mtime || buildArtifacts.push(file);
            }
            if (buildArtifacts.length) {
              var ref = pkg._reference;
              package_install_scripts_invariant(ref, "expected reference"), _this2.artifacts[`${pkg.name}@${pkg.version}`] = buildArtifacts;
            }
          }))();
        }
        install(cmds, pkg, spinner) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var ref = pkg._reference;
            package_install_scripts_invariant(ref, "expected reference");
            var updateProgress, locs = ref.locations;
            cmds.length > 0 && (updateProgress = data => {
              var dataStr = data.toString().trim();
              package_install_scripts_invariant(spinner && spinner.tick, "We should have spinner and its ticker here"), 
              dataStr && spinner.tick(dataStr.substr(dataStr.lastIndexOf("\n") + 1).replace(/\t/g, " "));
            });
            try {
              var _loop = function*(_ref2) {
                var stage = _ref2[0], cmd = _ref2[1];
                yield Promise.all(locs.map(function() {
                  var _ref3 = asyncToGenerator_asyncToGenerator((function*(loc) {
                    var stdout = (yield execute_lifecycle_script({
                      stage: stage,
                      config: _this3.config,
                      cwd: loc,
                      cmd: cmd,
                      isInteractive: !1,
                      updateProgress: updateProgress
                    })).stdout;
                    _this3.reporter.verbose(stdout);
                  }));
                  return function() {
                    return _ref3.apply(this, arguments);
                  };
                }()));
              };
              for (var _ref2 of cmds) yield* _loop(_ref2);
            } catch (err) {
              if (err.message = `${locs.join(", ")}: ${err.message}`, package_install_scripts_invariant(ref, "expected reference"), 
              !ref.optional) throw err;
              ref.ignore = !0, ref.incompatible = !0, _this3.reporter.warn(_this3.reporter.lang("optionalModuleScriptFail", err.message)), 
              _this3.reporter.info(_this3.reporter.lang("optionalModuleFail"));
              try {
                yield Promise.all(locs.map(function() {
                  var _ref4 = asyncToGenerator_asyncToGenerator((function*(loc) {
                    yield unlink(loc);
                  }));
                  return function() {
                    return _ref4.apply(this, arguments);
                  };
                }()));
              } catch (e) {
                _this3.reporter.error(_this3.reporter.lang("optionalModuleCleanupFail", e.message));
              }
            }
          }))();
        }
        packageCanBeInstalled(pkg) {
          if (!this.getInstallCommands(pkg).length) return !1;
          if (this.config.packBuiltPackages && pkg.prebuiltVariants) for (var variant in pkg.prebuiltVariants) if (pkg._remote && pkg._remote.reference && pkg._remote.reference.includes(variant)) return !1;
          var ref = pkg._reference;
          return package_install_scripts_invariant(ref, "Missing package reference"), !(!ref.fresh && !this.force) && (!!ref.locations.length && !ref.ignore);
        }
        runCommand(spinner, pkg) {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var cmds = _this4.getInstallCommands(pkg);
            spinner.setPrefix(++_this4.installed, pkg.name), yield _this4.install(cmds, pkg, spinner);
          }))();
        }
        detectCircularDependencies(root, seenManifests, pkg) {
          var ref = pkg._reference;
          package_install_scripts_invariant(ref, "expected reference");
          var deps = ref.dependencies;
          for (var dep of deps) {
            var pkgDep = this.resolver.getStrictResolvedPattern(dep);
            if (!seenManifests.has(pkgDep)) {
              if (seenManifests.add(pkgDep), pkgDep == root) return !0;
              if (this.detectCircularDependencies(root, seenManifests, pkgDep)) return !0;
            }
          }
          return !1;
        }
        findInstallablePackage(workQueue, installed) {
          for (var pkg of workQueue) {
            var ref = pkg._reference;
            package_install_scripts_invariant(ref, "expected reference");
            var deps = ref.dependencies, dependenciesFulfilled = !0;
            for (var dep of deps) {
              var pkgDep = this.resolver.getStrictResolvedPattern(dep);
              if (!installed.has(pkgDep)) {
                dependenciesFulfilled = !1;
                break;
              }
            }
            if (dependenciesFulfilled) return pkg;
            if (this.detectCircularDependencies(pkg, new Set, pkg)) return pkg;
          }
          return null;
        }
        worker(spinner, workQueue, installed, waitQueue) {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            for (;workQueue.size > 0; ) {
              var pkg = _this5.findInstallablePackage(workQueue, installed);
              if (null != pkg) {
                for (var workerResolve of (workQueue.delete(pkg), _this5.packageCanBeInstalled(pkg) && (yield _this5.runCommand(spinner, pkg)), 
                installed.add(pkg), waitQueue)) workerResolve();
                waitQueue.clear();
              } else spinner.clear(), yield new Promise((resolve => waitQueue.add(resolve)));
            }
          }))();
        }
        init(seedPatterns) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var workQueue = new Set, installed = new Set, pkgs = _this6.resolver.getTopologicalManifests(seedPatterns), installablePkgs = 0, beforeFilesMap = new Map;
            for (var pkg of pkgs) {
              if (_this6.packageCanBeInstalled(pkg)) {
                var ref = pkg._reference;
                package_install_scripts_invariant(ref, "expected reference"), yield Promise.all(ref.locations.map(function() {
                  var _ref5 = asyncToGenerator_asyncToGenerator((function*(loc) {
                    beforeFilesMap.set(loc, yield _this6.walk(loc)), installablePkgs += 1;
                  }));
                  return function() {
                    return _ref5.apply(this, arguments);
                  };
                }()));
              }
              workQueue.add(pkg);
            }
            var set = _this6.reporter.activitySet(installablePkgs, Math.min(installablePkgs, _this6.config.childConcurrency)), waitQueue = new Set;
            yield Promise.all(set.spinners.map((spinner => _this6.worker(spinner, workQueue, installed, waitQueue))));
            var offlineMirrorPath = _this6.config.getOfflineMirrorPath();
            if (_this6.config.packBuiltPackages && offlineMirrorPath) {
              var _loop2 = function*(_pkg) {
                if (_this6.packageCanBeInstalled(_pkg)) {
                  var prebuiltPath = package_install_scripts_path.join(offlineMirrorPath, "prebuilt");
                  yield mkdirp(prebuiltPath);
                  var prebuiltFilename = getPlatformSpecificPackageFilename(_pkg);
                  prebuiltPath = package_install_scripts_path.join(prebuiltPath, prebuiltFilename + ".tgz");
                  var _ref6 = _pkg._reference;
                  package_install_scripts_invariant(_ref6, "expected reference");
                  var builtPackagePaths = _ref6.locations;
                  yield Promise.all(builtPackagePaths.map(function() {
                    var _ref7 = asyncToGenerator_asyncToGenerator((function*(builtPackagePath) {
                      var stream = yield packWithIgnoreAndHeaders(builtPackagePath), hash = yield new Promise(((resolve, reject) => {
                        var validateStream = new HashStream;
                        stream.pipe(validateStream).pipe(package_install_scripts_fs.createWriteStream(prebuiltPath)).on("error", reject).on("close", (() => resolve(validateStream.getHash())));
                      }));
                      _pkg.prebuiltVariants = _pkg.prebuiltVariants || {}, _pkg.prebuiltVariants[prebuiltFilename] = hash;
                    }));
                    return function() {
                      return _ref7.apply(this, arguments);
                    };
                  }()));
                }
              };
              for (var _pkg of pkgs) yield* _loop2(_pkg);
            } else {
              var _loop3 = function*(_pkg2) {
                if (_this6.packageCanBeInstalled(_pkg2)) {
                  var _ref8 = _pkg2._reference;
                  package_install_scripts_invariant(_ref8, "expected reference");
                  var beforeFiles = _ref8.locations.map((loc => beforeFilesMap.get(loc)));
                  yield Promise.all(beforeFiles.map(function() {
                    var _ref9 = asyncToGenerator_asyncToGenerator((function*(b, index) {
                      package_install_scripts_invariant(b, "files before installation should always be recorded"), 
                      yield _this6.saveBuildArtifacts(_ref8.locations[index], _pkg2, b, set.spinners[0]);
                    }));
                    return function() {
                      return _ref9.apply(this, arguments);
                    };
                  }()));
                }
              };
              for (var _pkg2 of pkgs) yield* _loop3(_pkg2);
            }
            set.end();
          }))();
        }
      }
      var semver_semver = __webpack_require__(92878);
      function satisfiesWithPrereleases(version, range, loose) {
        var semverRange, semverVersion;
        void 0 === loose && (loose = !1);
        try {
          semverRange = new semver_semver.Range(range, loose);
        } catch (err) {
          return !1;
        }
        if (!version) return !1;
        try {
          semverVersion = new semver_semver.SemVer(version, semverRange.loose);
        } catch (err) {
          return !1;
        }
        return semverRange.set.some((comparatorSet => !(comparatorSet = comparatorSet.map((comparator => {
          if ("<" !== comparator.operator || !comparator.value || comparator.semver.prerelease.length) return comparator;
          comparator.semver.inc("pre", 0);
          var comparatorString = comparator.operator + comparator.semver.version;
          return new semver_semver.Comparator(comparatorString, comparator.loose);
        }))).some((comparator => !comparator.test(semverVersion)))));
      }
      var PRE_RELEASES = {
        major: "premajor",
        minor: "preminor",
        patch: "prepatch"
      };
      var package_compatibility_semver = __webpack_require__(92878), VERSIONS = Object.assign({}, process.versions, {
        yarn: package_namespaceObject.i8
      });
      function isValid(items, actual) {
        var isNotWhitelist = !0, isBlacklist = !1;
        for (var item of items) if ("!" === item[0]) {
          if (isBlacklist = !0, actual === item.slice(1)) return !1;
        } else if (isNotWhitelist = !1, item === actual) return !0;
        return isBlacklist && isNotWhitelist;
      }
      var aliases = nullify({
        iojs: "node"
      }), ignore = [ "npm", "teleport", "rhino", "cordovaDependencies", "parcel" ];
      function testEngine(name, range, versions, looseSemver) {
        var actual = versions[name];
        if (!actual) return !1;
        if (!package_compatibility_semver.valid(actual, looseSemver)) return !1;
        if (package_compatibility_semver.satisfies(actual, range, looseSemver)) return !0;
        if ("yarn" === name && satisfiesWithPrereleases(actual, range, looseSemver)) return !0;
        if ("node" === name && package_compatibility_semver.gt(actual, "1.0.0", looseSemver)) {
          var major = package_compatibility_semver.major(actual, looseSemver), fakes = [ `0.10.${major}`, `0.11.${major}`, `0.12.${major}`, `0.13.${major}` ];
          for (var actualFake of fakes) if (package_compatibility_semver.satisfies(actualFake, range, looseSemver)) return !0;
        }
        return !1;
      }
      function checkOne(info, config, ignoreEngines) {
        var didIgnore = !1, didError = !1, reporter = config.reporter, human = `${info.name}@${info.version}`, pushError = msg => {
          var ref = info._reference;
          ref && ref.optional ? (ref.ignore = !0, ref.incompatible = !0, didIgnore || (didIgnore = !0)) : (reporter.error(`${human}: ${msg}`), 
          didError = !0);
        }, os = info.os, cpu = info.cpu, engines = info.engines;
        if (shouldCheckPlatform(os, config.ignorePlatform) && !isValid(os, process.platform) && pushError(reporter.lang("incompatibleOS", process.platform)), 
        shouldCheckCpu(cpu, config.ignorePlatform) && !isValid(cpu, process.arch) && pushError(reporter.lang("incompatibleCPU", process.arch)), 
        shouldCheckEngines(engines, ignoreEngines)) for (var entry of entries(info.engines)) {
          var name = entry[0], range = entry[1];
          aliases[name] && (name = aliases[name]), VERSIONS[name] ? testEngine(name, range, VERSIONS, config.looseSemver) || pushError(reporter.lang("incompatibleEngine", name, range, VERSIONS[name])) : ignore.indexOf(name) < 0 && reporter.warn(`${human}: ${reporter.lang("invalidEngine", name)}`);
        }
        if (didError) throw new MessageError(reporter.lang("foundIncompatible"));
      }
      function check(infos, config, ignoreEngines) {
        for (var info of infos) checkOne(info, config, ignoreEngines);
      }
      function shouldCheckCpu(cpu, ignorePlatform) {
        return !ignorePlatform && Array.isArray(cpu) && cpu.length > 0;
      }
      function shouldCheckPlatform(os, ignorePlatform) {
        return !ignorePlatform && Array.isArray(os) && os.length > 0;
      }
      function shouldCheckEngines(engines, ignoreEngines) {
        return !ignoreEngines && "object" == typeof engines;
      }
      class PackageReference {
        constructor(request, info, remote) {
          this.resolver = request.resolver, this.lockfile = request.lockfile, this.requests = [], 
          this.config = request.config, this.hint = request.hint, this.isPlugnplay = !1, this.registry = remote.registry, 
          this.version = info.version, this.name = info.name, this.uid = info._uid, this.remote = remote, 
          this.dependencies = [], this.permissions = {}, this.patterns = [], this.optional = null, 
          this.level = 1 / 0, this.ignore = !1, this.incompatible = !1, this.fresh = !1, this.locations = [], 
          this.addRequest(request);
        }
        setFresh(fresh) {
          this.fresh = fresh;
        }
        addLocation(loc) {
          -1 === this.locations.indexOf(loc) && this.locations.push(loc);
        }
        addRequest(request) {
          this.requests.push(request), this.level = Math.min(this.level, request.parentNames.length);
        }
        prune() {
          for (var selfPattern of this.patterns) this.resolver.removePattern(selfPattern);
        }
        addDependencies(deps) {
          this.dependencies = this.dependencies.concat(deps);
        }
        setPermission(key, val) {
          this.permissions[key] = val;
        }
        hasPermission(key) {
          return key in this.permissions && this.permissions[key];
        }
        addPattern(pattern, manifest) {
          this.resolver.addPattern(pattern, manifest), this.patterns.push(pattern);
          var shrunk = this.lockfile.getLocked(pattern);
          if (shrunk && shrunk.permissions) for (var _ref of entries(shrunk.permissions)) {
            var _key = _ref[0], perm = _ref[1];
            this.setPermission(_key, perm);
          }
        }
        addOptional(optional) {
          null == this.optional ? this.optional = optional : optional || (this.optional = !1);
        }
      }
      var workspace_resolver_invariant = __webpack_require__(46128);
      class WorkspaceResolver extends BaseResolver {
        static isWorkspace(pattern, workspaceLayout) {
          return !!workspaceLayout && !!workspaceLayout.getManifestByPattern(pattern);
        }
        constructor(request, fragment, workspaceLayout) {
          super(request, fragment), this.workspaceLayout = workspaceLayout;
        }
        resolve(downloadedManifest) {
          var workspace = this.workspaceLayout.getManifestByPattern(this.request.pattern);
          workspace_resolver_invariant(workspace, "expected workspace");
          var manifest = workspace.manifest, loc = workspace.loc;
          if (manifest._remote && manifest._remote.registryRemote) return Promise.resolve(manifest);
          var registry = manifest._registry;
          workspace_resolver_invariant(registry, "expected reference");
          var registryRemote, hash = "";
          return downloadedManifest && manifest.version === downloadedManifest.version ? (registryRemote = downloadedManifest._remote, 
          workspace_resolver_invariant(registryRemote, "missing remote info"), hash = registryRemote.hash, 
          Object.keys(manifest).forEach((k => k.startsWith("_") || delete manifest[k])), Object.assign(manifest, downloadedManifest)) : manifest._remote && manifest._remote.hash && (workspace_resolver_invariant(workspace.manifest._remote, "missing remote info"), 
          registryRemote = workspace.manifest._remote.registryRemote, hash = manifest._remote.hash), 
          registryRemote && (registryRemote = _extends({}, registryRemote)), manifest._remote = Object.assign(manifest._remote || {}, {
            type: "workspace",
            registryRemote: registryRemote,
            registry: registry,
            hash: hash,
            reference: loc
          }), manifest._uid = manifest.version, Promise.resolve(manifest);
        }
      }
      var package_request_path = __webpack_require__(71017), package_request_invariant = __webpack_require__(46128), package_request_semver = __webpack_require__(92878), package_request_micromatch = __webpack_require__(70850);
      class PackageRequest {
        constructor(req, resolver) {
          this.parentRequest = req.parentRequest, this.parentNames = req.parentNames || [], 
          this.lockfile = resolver.lockfile, this.registry = req.registry, this.reporter = resolver.reporter, 
          this.resolver = resolver, this.optional = req.optional, this.hint = req.hint, this.pattern = req.pattern, 
          this.config = resolver.config, this.foundInfo = null;
        }
        init() {
          this.resolver.usedRegistries.add(this.registry);
        }
        getLocked(remoteType) {
          var shrunk = this.lockfile.getLocked(this.pattern);
          if (shrunk && shrunk.resolved) {
            var resolvedParts = explodeHashedUrl(shrunk.resolved), preferredRemoteType = /^git(\+[a-z0-9]+)?:\/\//.test(resolvedParts.url) ? "git" : remoteType;
            return {
              name: shrunk.name,
              version: shrunk.version,
              _uid: shrunk.uid,
              _remote: {
                resolved: shrunk.resolved,
                type: preferredRemoteType,
                reference: resolvedParts.url,
                hash: resolvedParts.hash,
                integrity: shrunk.integrity,
                registry: shrunk.registry,
                packageName: shrunk.name
              },
              optionalDependencies: shrunk.optionalDependencies || {},
              dependencies: shrunk.dependencies || {},
              prebuiltVariants: shrunk.prebuiltVariants || {}
            };
          }
          return null;
        }
        findVersionOnRegistry(pattern) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _yield$_this$normaliz = yield _this.normalize(pattern), range = _yield$_this$normaliz.range, name = _yield$_this$normaliz.name, exoticResolver = getExoticResolver(range);
            if (exoticResolver) {
              var data = yield _this.findExoticVersionInfo(exoticResolver, range);
              return (data = Object.assign({}, data)).name = name, data;
            }
            var resolver = new (_this.getRegistryResolver())(_this, name, range);
            try {
              return yield resolver.resolve();
            } catch (err) {
              if (!(err instanceof MessageError) && _this.parentRequest && _this.parentRequest.pattern) throw new MessageError(_this.reporter.lang("requiredPackageNotFoundRegistry", pattern, _this.parentRequest.pattern, _this.registry));
              throw err;
            }
          }))();
        }
        getRegistryResolver() {
          var Resolver = resolvers_registries[this.registry];
          if (Resolver) return Resolver;
          throw new MessageError(this.reporter.lang("unknownRegistryResolver", this.registry));
        }
        normalizeRange(pattern) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (pattern.indexOf(":") > -1 || pattern.indexOf("@") > -1 || getExoticResolver(pattern)) return pattern;
            if (!package_request_semver.validRange(pattern)) try {
              if (yield fs_exists(package_request_path.join(_this2.config.cwd, pattern, "package.json"))) return _this2.reporter.warn(_this2.reporter.lang("implicitFileDeprecated", pattern)), 
              `file:${pattern}`;
            } catch (err) {}
            return pattern;
          }))();
        }
        normalize(pattern) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _normalizePattern = normalizePattern(pattern), name = _normalizePattern.name, range = _normalizePattern.range, hasVersion = _normalizePattern.hasVersion;
            return {
              name: name,
              range: yield _this3.normalizeRange(range),
              hasVersion: hasVersion
            };
          }))();
        }
        findExoticVersionInfo(ExoticResolver, range) {
          return new ExoticResolver(this, range).resolve();
        }
        findVersionInfo() {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var exoticResolver = getExoticResolver(_this4.pattern);
            if (exoticResolver) return _this4.findExoticVersionInfo(exoticResolver, _this4.pattern);
            if (WorkspaceResolver.isWorkspace(_this4.pattern, _this4.resolver.workspaceLayout)) {
              package_request_invariant(_this4.resolver.workspaceLayout, "expected workspaceLayout");
              var manifest, resolver = new WorkspaceResolver(_this4, _this4.pattern, _this4.resolver.workspaceLayout);
              if (_this4.config.focus && !_this4.pattern.includes(_this4.resolver.workspaceLayout.virtualManifestName) && !_this4.pattern.startsWith(_this4.config.focusedWorkspaceName + "@")) {
                var localInfo = _this4.resolver.workspaceLayout.getManifestByPattern(_this4.pattern);
                package_request_invariant(localInfo, "expected local info for " + _this4.pattern);
                var localManifest = localInfo.manifest, requestPattern = localManifest.name + "@" + localManifest.version;
                manifest = yield _this4.findVersionOnRegistry(requestPattern);
              }
              return resolver.resolve(manifest);
            }
            return _this4.findVersionOnRegistry(_this4.pattern);
          }))();
        }
        reportResolvedRangeMatch(info, resolved) {}
        resolveToExistingVersion(info) {
          var _normalizePattern2 = normalizePattern(this.pattern), range = _normalizePattern2.range, name = _normalizePattern2.name, solvedRange = package_request_semver.validRange(range) ? info.version : range, resolved = this.resolver.getHighestRangeVersionMatch(name, solvedRange, info);
          package_request_invariant(resolved, "should have a resolved reference"), this.reportResolvedRangeMatch(info, resolved);
          var ref = resolved._reference;
          package_request_invariant(ref, "Resolved package info has no package reference"), 
          ref.addRequest(this), ref.addPattern(this.pattern, resolved), ref.addOptional(this.optional);
        }
        find(_ref) {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var fresh = _ref.fresh, frozen = _ref.frozen, info = yield _this5.findVersionInfo();
            if (!package_request_semver.valid(info.version)) throw new MessageError(_this5.reporter.lang("invalidPackageVersion", info.name, info.version));
            info.fresh = fresh, cleanDependencies(info, !1, _this5.reporter, (() => {}));
            var _normalizePattern3 = normalizePattern(_this5.pattern), range = _normalizePattern3.range, name = _normalizePattern3.name, solvedRange = package_request_semver.validRange(range) ? info.version : range;
            if (!info.fresh || frozen ? _this5.resolver.getExactVersionMatch(name, solvedRange, info) : _this5.resolver.getHighestRangeVersionMatch(name, solvedRange, info)) _this5.resolver.reportPackageWithExistingVersion(_this5, info); else {
              if (info.flat && !_this5.resolver.flat) throw new MessageError(_this5.reporter.lang("flatGlobalError", `${info.name}@${info.version}`));
              PackageRequest.validateVersionInfo(info, _this5.reporter);
              var remote = info._remote;
              package_request_invariant(remote, "Missing remote");
              var ref = new PackageReference(_this5, info, remote);
              ref.addPattern(_this5.pattern, info), ref.addOptional(_this5.optional), ref.setFresh(fresh), 
              info._reference = ref, info._remote = remote;
              var promises = [], deps = [], parentNames = [].concat(_this5.parentNames, [ name ]);
              for (var depName in info.dependencies) {
                var depPattern = depName + "@" + info.dependencies[depName];
                deps.push(depPattern), promises.push(_this5.resolver.find({
                  pattern: depPattern,
                  registry: remote.registry,
                  optional: _this5.optional,
                  parentRequest: _this5,
                  parentNames: parentNames
                }));
              }
              for (var _depName in info.optionalDependencies) {
                var _depPattern = _depName + "@" + info.optionalDependencies[_depName];
                deps.push(_depPattern), promises.push(_this5.resolver.find({
                  hint: "optional",
                  pattern: _depPattern,
                  registry: remote.registry,
                  optional: !0,
                  parentRequest: _this5,
                  parentNames: parentNames
                }));
              }
              if ("workspace" === remote.type && !_this5.config.production) for (var _depName2 in info.devDependencies) {
                var _depPattern2 = _depName2 + "@" + info.devDependencies[_depName2];
                deps.push(_depPattern2), promises.push(_this5.resolver.find({
                  hint: "dev",
                  pattern: _depPattern2,
                  registry: remote.registry,
                  optional: !1,
                  parentRequest: _this5,
                  parentNames: parentNames
                }));
              }
              for (var promise of promises) yield promise;
              for (var otherRequest of (ref.addDependencies(deps), ref.requests.slice(1))) ref.addOptional(otherRequest.optional);
            }
          }))();
        }
        static validateVersionInfo(info, reporter) {
          var human = `${info.name}@${info.version}`;
          for (var key of (info.version = PackageRequest.getPackageVersion(info), REQUIRED_PACKAGE_KEYS)) if (!info[key]) throw new MessageError(reporter.lang("missingRequiredPackageKey", human, key));
        }
        static getPackageVersion(info) {
          return void 0 === info.version ? info._uid : info.version;
        }
        static getOutdatedPackages(lockfile, install, config, reporter, filterByPatterns, flags) {
          return asyncToGenerator_asyncToGenerator((function*() {
            var _yield$install$fetchR = yield install.fetchRequestFromCwd(), reqPatterns = _yield$install$fetchR.requests, workspaceLayout = _yield$install$fetchR.workspaceLayout, depReqPatterns = workspaceLayout ? reqPatterns.filter((p => !workspaceLayout.getManifestByPattern(p.pattern))) : reqPatterns;
            if (filterByPatterns && filterByPatterns.length || flags && flags.pattern) {
              var filterByNames = filterByPatterns && filterByPatterns.length ? filterByPatterns.map((pattern => normalizePattern(pattern).name)) : [];
              depReqPatterns = depReqPatterns.filter((dep => filterByNames.indexOf(normalizePattern(dep.pattern).name) >= 0 || flags && flags.pattern && package_request_micromatch.contains(normalizePattern(dep.pattern).name, flags.pattern)));
            }
            var deps = yield Promise.all(depReqPatterns.map(function() {
              var _ref3 = asyncToGenerator_asyncToGenerator((function*(_ref2) {
                var pattern = _ref2.pattern, hint = _ref2.hint, workspaceName = _ref2.workspaceName, workspaceLoc = _ref2.workspaceLoc, locked = lockfile.getLocked(pattern);
                if (!locked) throw new MessageError(reporter.lang("lockfileOutdated"));
                var name = locked.name, current = locked.version, latest = "", wanted = "", url = "", normalized = normalizePattern(pattern);
                if (getExoticResolver(pattern) || getExoticResolver(normalized.range)) latest = wanted = "exotic", 
                url = normalized.range; else {
                  var registry = config.registries[locked.registry], _yield$registry$check = yield registry.checkOutdated(config, name, normalized.range);
                  latest = _yield$registry$check.latest, wanted = _yield$registry$check.wanted, url = _yield$registry$check.url;
                }
                return {
                  name: name,
                  current: current,
                  wanted: wanted,
                  latest: latest,
                  url: url,
                  hint: hint,
                  range: normalized.range,
                  upgradeTo: "",
                  workspaceName: workspaceName || "",
                  workspaceLoc: workspaceLoc || ""
                };
              }));
              return function() {
                return _ref3.apply(this, arguments);
              };
            }()));
            return deps.filter((_ref4 => {
              var current = _ref4.current, latest = _ref4.latest, wanted = _ref4.wanted;
              return "exotic" === latest || package_request_semver.lt(current, wanted) || package_request_semver.lt(current, latest);
            })).sort(((depA, depB) => depA.name.localeCompare(depB.name)));
          }))();
        }
      }
      var WRONG_PATTERNS = /\/$|\/{2,}|\*+$/;
      var resolution_map_semver = __webpack_require__(92878), minimatch = __webpack_require__(60186);
      class ResolutionMap {
        constructor(config) {
          this.resolutionsByPackage = nullify(), this.config = config, this.reporter = config.reporter, 
          this.delayQueue = new Set;
        }
        init(resolutions) {
          for (var globPattern in void 0 === resolutions && (resolutions = {}), resolutions) {
            var info = this.parsePatternInfo(globPattern, resolutions[globPattern]);
            if (info) {
              var resolution = this.resolutionsByPackage[info.name] || [];
              this.resolutionsByPackage[info.name] = [].concat(resolution, [ info ]);
            }
          }
        }
        addToDelayQueue(req) {
          this.delayQueue.add(req);
        }
        parsePatternInfo(globPattern, range) {
          if (input = globPattern, WRONG_PATTERNS.test(input)) return this.reporter.warn(this.reporter.lang("invalidResolutionName", globPattern)), 
          null;
          var input, directories = function(input) {
            return input.match(/(@[^\/]+\/)?([^/]+)/g) || [];
          }(globPattern), name = directories.pop();
          return resolution_map_semver.validRange(range) || getExoticResolver(range) ? (name === globPattern && (globPattern = `**/${name}`), 
          {
            name: name,
            range: range,
            globPattern: globPattern,
            pattern: `${name}@${range}`
          }) : (this.reporter.warn(this.reporter.lang("invalidResolutionVersion", range)), 
          null);
        }
        find(reqPattern, parentNames) {
          var _normalizePattern = normalizePattern(reqPattern), name = _normalizePattern.name, reqRange = _normalizePattern.range, resolutions = this.resolutionsByPackage[name];
          if (!resolutions) return "";
          var modulePath = [].concat(parentNames, [ name ]).join("/"), _ref = resolutions.find((_ref2 => {
            var globPattern = _ref2.globPattern;
            return minimatch(modulePath, globPattern);
          })) || {}, pattern = _ref.pattern, range = _ref.range;
          return pattern && resolution_map_semver.validRange(reqRange) && resolution_map_semver.valid(range) && !resolution_map_semver.satisfies(range, reqRange) && this.reporter.warn(this.reporter.lang("incompatibleResolutionVersion", pattern, reqPattern)), 
          pattern;
        }
      }
      var package_resolver_invariant = __webpack_require__(46128), package_resolver_semver = __webpack_require__(92878);
      class PackageResolver {
        constructor(config, lockfile, resolutionMap) {
          void 0 === resolutionMap && (resolutionMap = new ResolutionMap(config)), this.patternsByPackage = nullify(), 
          this.fetchingPatterns = new Set, this.fetchingQueue = new BlockingQueue("resolver fetching"), 
          this.patterns = nullify(), this.resolutionMap = resolutionMap, this.usedRegistries = new Set, 
          this.flat = !1, this.reporter = config.reporter, this.lockfile = lockfile, this.config = config, 
          this.delayedResolveQueue = [];
        }
        isNewPattern(pattern) {
          return !!this.patterns[pattern].fresh;
        }
        updateManifest(ref, newPkg) {
          var oldPkg = this.patterns[ref.patterns[0]];
          for (var pattern of (newPkg._reference = ref, newPkg._remote = ref.remote, newPkg.name = oldPkg.name, 
          newPkg.fresh = oldPkg.fresh, newPkg.prebuiltVariants = oldPkg.prebuiltVariants, 
          ref.patterns)) this.patterns[pattern] = newPkg;
          return Promise.resolve();
        }
        updateManifests(newPkgs) {
          for (var newPkg of newPkgs) if (newPkg._reference) for (var pattern of newPkg._reference.patterns) {
            var oldPkg = this.patterns[pattern];
            newPkg.prebuiltVariants = oldPkg.prebuiltVariants, this.patterns[pattern] = newPkg;
          }
          return Promise.resolve();
        }
        dedupePatterns(patterns) {
          var deduped = [], seen = new Set;
          for (var pattern of patterns) {
            var info = this.getResolvedPattern(pattern);
            seen.has(info) || (seen.add(info), deduped.push(pattern));
          }
          return deduped;
        }
        getTopologicalManifests(seedPatterns) {
          var pkgs = new Set, skip = new Set, add = seedPatterns => {
            for (var pattern of seedPatterns) {
              var pkg = this.getStrictResolvedPattern(pattern);
              if (!skip.has(pkg)) {
                var ref = pkg._reference;
                package_resolver_invariant(ref, "expected reference"), skip.add(pkg), add(ref.dependencies), 
                pkgs.add(pkg);
              }
            }
          };
          return add(seedPatterns), pkgs;
        }
        getLevelOrderManifests(seedPatterns) {
          var pkgs = new Set, skip = new Set, add = seedPatterns => {
            var refs = [];
            for (var pattern of seedPatterns) {
              var pkg = this.getStrictResolvedPattern(pattern);
              if (!skip.has(pkg)) {
                var ref = pkg._reference;
                package_resolver_invariant(ref, "expected reference"), refs.push(ref), skip.add(pkg), 
                pkgs.add(pkg);
              }
            }
            for (var _ref of refs) add(_ref.dependencies);
          };
          return add(seedPatterns), pkgs;
        }
        getAllDependencyNamesByLevelOrder(seedPatterns) {
          var names = new Set;
          for (var _ref2 of this.getLevelOrderManifests(seedPatterns)) {
            var _name = _ref2.name;
            names.add(_name);
          }
          return names;
        }
        getAllInfoForPackageName(name) {
          var patterns = this.patternsByPackage[name] || [];
          return this.getAllInfoForPatterns(patterns);
        }
        getAllInfoForPatterns(patterns) {
          var infos = [], seen = new Set;
          for (var pattern of patterns) {
            var info = this.patterns[pattern];
            seen.has(info) || (seen.add(info), infos.push(info));
          }
          return infos;
        }
        getManifests() {
          var infos = [], seen = new Set;
          for (var pattern in this.patterns) {
            var info = this.patterns[pattern];
            seen.has(info) || (infos.push(info), seen.add(info));
          }
          return infos;
        }
        replacePattern(pattern, newPattern) {
          var pkg = this.getResolvedPattern(pattern);
          package_resolver_invariant(pkg, `missing package ${pattern}`);
          var ref = pkg._reference;
          package_resolver_invariant(ref, "expected package reference"), ref.patterns = [ newPattern ], 
          this.addPattern(newPattern, pkg), this.removePattern(pattern);
        }
        collapseAllVersionsOfPackage(name, version) {
          var patterns = this.dedupePatterns(this.patternsByPackage[name]);
          return this.collapsePackageVersions(name, version, patterns);
        }
        collapsePackageVersions(name, version, patterns) {
          var collapseToReference, collapseToManifest, collapseToPattern, human = `${name}@${version}`;
          for (var pattern of patterns) {
            var _manifest = this.patterns[pattern];
            if (_manifest.version === version) {
              collapseToReference = _manifest._reference, collapseToManifest = _manifest, collapseToPattern = pattern;
              break;
            }
          }
          for (var _pattern of (package_resolver_invariant(collapseToReference && collapseToManifest && collapseToPattern, `Couldn't find package manifest for ${human}`), 
          patterns)) if (_pattern !== collapseToPattern) {
            var ref = this.getStrictResolvedPattern(_pattern)._reference;
            package_resolver_invariant(ref, "expected package reference");
            var refPatterns = ref.patterns.slice();
            for (var _pattern2 of (ref.prune(), refPatterns)) collapseToReference.addPattern(_pattern2, collapseToManifest);
          }
          return collapseToPattern;
        }
        addPattern(pattern, info) {
          this.patterns[pattern] = info;
          var byName = this.patternsByPackage[info.name] = this.patternsByPackage[info.name] || [];
          -1 === byName.indexOf(pattern) && byName.push(pattern);
        }
        removePattern(pattern) {
          var pkg = this.patterns[pattern];
          if (pkg) {
            var byName = this.patternsByPackage[pkg.name];
            byName && (byName.splice(byName.indexOf(pattern), 1), delete this.patterns[pattern]);
          }
        }
        getResolvedPattern(pattern) {
          return this.patterns[pattern];
        }
        getStrictResolvedPattern(pattern) {
          var manifest = this.getResolvedPattern(pattern);
          return package_resolver_invariant(manifest, "expected manifest"), manifest;
        }
        getExactVersionMatch(name, version, manifest) {
          var patterns = this.patternsByPackage[name];
          if (!patterns) return null;
          for (var pattern of patterns) {
            var info = this.getStrictResolvedPattern(pattern);
            if (info.version === version) return info;
          }
          return manifest && getExoticResolver(version) ? this.exoticRangeMatch(patterns.map(this.getStrictResolvedPattern.bind(this)), manifest) : null;
        }
        getHighestRangeVersionMatch(name, range, manifest) {
          var patterns = this.patternsByPackage[name];
          if (!patterns) return null;
          var versionNumbers = [], resolvedPatterns = patterns.map((pattern => {
            var info = this.getStrictResolvedPattern(pattern);
            return versionNumbers.push(info.version), info;
          })), maxValidRange = package_resolver_semver.maxSatisfying(versionNumbers, range);
          return maxValidRange ? resolvedPatterns[versionNumbers.indexOf(maxValidRange)] : manifest && getExoticResolver(range) ? this.exoticRangeMatch(resolvedPatterns, manifest) : null;
        }
        exoticRangeMatch(resolvedPkgs, manifest) {
          var remote = manifest._remote;
          if (!remote || !remote.reference || "copy" !== remote.type) return null;
          var matchedPkg = resolvedPkgs.find((_ref3 => {
            var pkgRemote = _ref3._remote;
            return pkgRemote && pkgRemote.reference === remote.reference && "copy" === pkgRemote.type;
          }));
          return matchedPkg && (manifest._remote = matchedPkg._remote), matchedPkg;
        }
        isLockfileEntryOutdated(version, range, hasVersion) {
          return !(!package_resolver_semver.validRange(range) || !package_resolver_semver.valid(version) || getExoticResolver(range) || !hasVersion || package_resolver_semver.satisfies(version, range));
        }
        find(initialReq) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var req = _this.resolveToResolution(initialReq);
            if (req) {
              var request = new PackageRequest(req, _this), fetchKey = `${req.registry}:${req.pattern}:${String(req.optional)}`, initialFetch = !_this.fetchingPatterns.has(fetchKey), fresh = !1;
              if (_this.activity && _this.activity.tick(req.pattern), initialFetch) {
                _this.fetchingPatterns.add(fetchKey);
                var lockfileEntry = _this.lockfile.getLocked(req.pattern);
                if (lockfileEntry) {
                  var _normalizePattern = normalizePattern(req.pattern), range = _normalizePattern.range, hasVersion = _normalizePattern.hasVersion;
                  _this.isLockfileEntryOutdated(lockfileEntry.version, range, hasVersion) && (_this.reporter.warn(_this.reporter.lang("incorrectLockfileEntry", req.pattern)), 
                  _this.removePattern(req.pattern), _this.lockfile.removePattern(req.pattern), fresh = !0);
                } else fresh = !0;
                request.init();
              }
              yield request.find({
                fresh: fresh,
                frozen: _this.frozen
              });
            }
          }))();
        }
        init(deps, _temp) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _ref4 = void 0 === _temp ? {
              isFlat: !1,
              isFrozen: !1,
              workspaceLayout: void 0
            } : _temp, isFlat = _ref4.isFlat, isFrozen = _ref4.isFrozen, workspaceLayout = _ref4.workspaceLayout;
            _this2.flat = Boolean(isFlat), _this2.frozen = Boolean(isFrozen), _this2.workspaceLayout = workspaceLayout;
            var activity = _this2.activity = _this2.reporter.activity();
            for (var req of deps) yield _this2.find(req);
            for (var _req of (_this2.resolvePackagesWithExistingVersions(), _this2.resolutionMap.delayQueue)) _this2.resolveToResolution(_req);
            if (isFlat) for (var dep of deps) {
              var _name2 = normalizePattern(dep.pattern).name;
              _this2.optimizeResolutions(_name2);
            }
            activity.end(), _this2.activity = null;
          }))();
        }
        optimizeResolutions(name) {
          var _this3 = this, collapsablePatterns = this.dedupePatterns(this.patternsByPackage[name] || []).filter((pattern => {
            var remote = this.patterns[pattern]._remote;
            return !(this.lockfile.getLocked(pattern) || remote && "workspace" === remote.type);
          }));
          if (!(collapsablePatterns.length < 2)) {
            var availableVersions = this.getAllInfoForPatterns(collapsablePatterns).map((manifest => manifest.version));
            availableVersions.sort(package_resolver_semver.rcompare);
            var ranges = collapsablePatterns.map((pattern => normalizePattern(pattern).range)), _loop = function(version) {
              if (ranges.every((range => package_resolver_semver.satisfies(version, range)))) return _this3.collapsePackageVersions(name, version, collapsablePatterns), 
              {
                v: void 0
              };
            };
            for (var version of availableVersions) {
              var _ret = _loop(version);
              if ("object" == typeof _ret) return _ret.v;
            }
          }
        }
        reportPackageWithExistingVersion(req, info) {
          this.delayedResolveQueue.push({
            req: req,
            info: info
          });
        }
        resolvePackagesWithExistingVersions() {
          for (var _ref5 of this.delayedResolveQueue) {
            var req = _ref5.req, info = _ref5.info;
            req.resolveToExistingVersion(info);
          }
        }
        resolveToResolution(req) {
          var parentNames = req.parentNames, pattern = req.pattern;
          if (!parentNames || this.flat) return req;
          var lockfileEntry, resolutionEntry, resolution = this.resolutionMap.find(pattern, parentNames);
          if (resolution) {
            var resolutionManifest = this.getResolvedPattern(resolution);
            if (resolutionManifest) {
              package_resolver_invariant(resolutionManifest._reference, "resolutions should have a resolved reference"), 
              resolutionManifest._reference.patterns.push(pattern), this.addPattern(pattern, resolutionManifest);
              var lockManifest = this.lockfile.getLocked(pattern);
              lockfileEntry = lockManifest, resolutionEntry = resolutionManifest._reference, lockfileEntry && resolutionEntry && lockfileEntry.resolved !== resolutionEntry.remote.resolved && this.lockfile.removePattern(pattern);
            } else this.resolutionMap.addToDelayQueue(req);
            return null;
          }
          return req;
        }
      }
      var package_hoister_mm = __webpack_require__(70850), package_hoister_invariant = __webpack_require__(46128), package_hoister_path = __webpack_require__(71017), historyCounter = 0, LINK_TYPES = new Set([ "workspace", "link" ]);
      class HoistManifest {
        constructor(key, parts, pkg, loc, isDirectRequire, isRequired, isIncompatible) {
          this.isDirectRequire = isDirectRequire, this.isRequired = isRequired, this.isIncompatible = isIncompatible, 
          this.loc = loc, this.pkg = pkg, this.key = key, this.parts = parts, this.originalKey = key, 
          this.previousPaths = [], this.history = [], this.addHistory(`Start position = ${key}`), 
          this.isNohoist = !1, this.originalParentPath = "", this.shallowPaths = [], this.isShallow = !1;
        }
        addHistory(msg) {
          this.history.push(`${++historyCounter}: ${msg}`);
        }
      }
      class PackageHoister {
        constructor(config, resolver, _temp) {
          var _ref = void 0 === _temp ? {} : _temp, ignoreOptional = _ref.ignoreOptional, workspaceLayout = _ref.workspaceLayout;
          this.resolver = resolver, this.config = config, this.ignoreOptional = ignoreOptional, 
          this.taintedKeys = new Map, this.levelQueue = [], this.tree = new Map, this.workspaceLayout = workspaceLayout, 
          this.nohoistResolver = new NohoistResolver(config, resolver);
        }
        taintKey(key, info) {
          var existingTaint = this.taintedKeys.get(key);
          return (!existingTaint || existingTaint.loc === info.loc) && (this.taintedKeys.set(key, info), 
          !0);
        }
        implodeKey(parts) {
          return parts.join("#");
        }
        seed(patterns) {
          var _this = this;
          for (var pattern of (this.prepass(patterns), this.resolver.dedupePatterns(patterns))) this._seed(pattern, {
            isDirectRequire: !0
          });
          for (var _loop = function() {
            var queue = _this.levelQueue;
            if (!queue.length) return _this._propagateRequired(), {
              v: void 0
            };
            _this.levelQueue = [], queue = queue.sort(((_ref2, _ref3) => sortAlpha(_ref2[0], _ref3[0])));
            for (var sortedQueue = [], availableSet = new Set, hasChanged = !0; queue.length > 0 && hasChanged; ) {
              hasChanged = !1;
              var queueCopy = queue;
              queue = [];
              for (var t = 0; t < queueCopy.length; ++t) {
                var queueItem = queueCopy[t], _pattern = queueItem[0], pkg = _this.resolver.getStrictResolvedPattern(_pattern);
                Object.keys(pkg.peerDependencies || {}).every((peerDependency => availableSet.has(peerDependency))) ? (sortedQueue.push(queueItem), 
                availableSet.add(_pattern), hasChanged = !0) : queue.push(queueItem);
              }
            }
            for (var _ref4 of sortedQueue = sortedQueue.concat(queue)) {
              var _pattern2 = _ref4[0], parent = _ref4[1], info = _this._seed(_pattern2, {
                isDirectRequire: !1,
                parent: parent
              });
              info && _this.hoist(info);
            }
          }; ;) {
            var _ret = _loop();
            if ("object" == typeof _ret) return _ret.v;
          }
        }
        _seed(pattern, _ref5) {
          var isDirectRequire = _ref5.isDirectRequire, parent = _ref5.parent, pkg = this.resolver.getStrictResolvedPattern(pattern), ref = pkg._reference;
          package_hoister_invariant(ref, "expected reference");
          var parentParts = [], isIncompatible = ref.incompatible, isMarkedAsOptional = ref.optional && this.ignoreOptional, isRequired = isDirectRequire && !ref.ignore && !isIncompatible && !isMarkedAsOptional;
          if (parent) {
            if (!this.tree.get(parent.key)) return null;
            isDirectRequire || isIncompatible || !parent.isRequired || isMarkedAsOptional || (isRequired = !0), 
            parentParts = parent.parts;
          }
          var loc = this.config.generateModuleCachePath(ref), parts = parentParts.concat(pkg.name), key = this.implodeKey(parts), info = new HoistManifest(key, parts, pkg, loc, isDirectRequire, isRequired, isIncompatible);
          this.nohoistResolver.initNohoist(info, parent), this.tree.set(key, info), this.taintKey(key, info);
          var pushed = new Set;
          for (var depPattern of ref.dependencies) pushed.has(depPattern) || (this.levelQueue.push([ depPattern, info ]), 
          pushed.add(depPattern));
          return info;
        }
        _propagateRequired() {
          var toVisit = [];
          for (var entry of this.tree.entries()) entry[1].isRequired && toVisit.push(entry[1]);
          for (;toVisit.length; ) {
            var info = toVisit.shift(), ref = info.pkg._reference;
            for (var depPattern of (package_hoister_invariant(ref, "expected reference"), ref.dependencies)) {
              var depinfo = this._lookupDependency(info, depPattern);
              if (depinfo) {
                var depRef = depinfo.pkg._reference, isMarkedAsOptional = depRef && depRef.optional && this.ignoreOptional && !(info.isRequired && "optional" !== depRef.hint);
                depinfo.isRequired || depinfo.isIncompatible || isMarkedAsOptional || (depinfo.isRequired = !0, 
                depinfo.addHistory(`Mark as non-ignored because of usage by ${info.key}`), toVisit.push(depinfo));
              }
            }
          }
        }
        _lookupDependency(info, depPattern) {
          var pkg = this.resolver.getStrictResolvedPattern(depPattern), ref = pkg._reference;
          package_hoister_invariant(ref, "expected reference");
          for (var i = info.parts.length; i >= 0; i--) {
            var checkParts = info.parts.slice(0, i).concat(pkg.name), checkKey = this.implodeKey(checkParts), existing = this.tree.get(checkKey);
            if (existing) return existing;
          }
          return null;
        }
        getNewParts(key, info, parts) {
          var stepUp = !1, highestHoistingPoint = this.nohoistResolver.highestHoistingPoint(info) || 0, fullKey = this.implodeKey(parts), stack = [], name = parts.pop();
          info.isNohoist && info.addHistory(`Marked as nohoist, will not be hoisted above '${parts[highestHoistingPoint]}'`);
          for (var i = parts.length - 1; i >= highestHoistingPoint; i--) {
            var checkParts = parts.slice(0, i).concat(name), checkKey = this.implodeKey(checkParts);
            info.addHistory(`Looked at ${checkKey} for a match`);
            var existing = this.tree.get(checkKey);
            if (existing) {
              if (existing.loc === info.loc) return !existing.isRequired && info.isRequired ? (existing.addHistory(`Deduped ${fullKey} to this item, marking as required`), 
              existing.isRequired = !0) : existing.addHistory(`Deduped ${fullKey} to this item`), 
              {
                parts: checkParts,
                duplicate: !0
              };
              info.addHistory(`Found a collision at ${checkKey}`);
              break;
            }
            var existingTaint = this.taintedKeys.get(checkKey);
            if (existingTaint && existingTaint.loc !== info.loc) {
              info.addHistory(`Broken by ${checkKey}`);
              break;
            }
          }
          var peerDependencies = Object.keys(info.pkg.peerDependencies || {});
          hoistLoop: for (;parts.length > highestHoistingPoint; ) {
            for (var peerDependency of peerDependencies) {
              var _checkParts2 = parts.concat(peerDependency), _checkKey2 = this.implodeKey(_checkParts2);
              if (info.addHistory(`Looked at ${_checkKey2} for a peer dependency match`), this.tree.get(_checkKey2)) {
                info.addHistory(`Found a peer dependency requirement at ${_checkKey2}`);
                break hoistLoop;
              }
            }
            var _checkParts = parts.concat(name), _checkKey = this.implodeKey(_checkParts);
            if (this.tree.get(_checkKey)) {
              stepUp = !0;
              break;
            }
            if (key !== _checkKey && this.taintedKeys.has(_checkKey)) {
              stepUp = !0;
              break;
            }
            stack.push(parts.pop());
          }
          parts.push(name);
          var isValidPosition = parts => {
            if (parts.length <= highestHoistingPoint) return !1;
            var key = this.implodeKey(parts), existing = this.tree.get(key);
            if (existing && existing.loc === info.loc) return !0;
            var existingTaint = this.taintedKeys.get(key);
            return !existingTaint || existingTaint.loc === info.loc;
          };
          for (isValidPosition(parts) || (stepUp = !0); stepUp && stack.length; ) info.addHistory(`Stepping up from ${this.implodeKey(parts)}`), 
          parts.pop(), parts.push(stack.pop(), name), isValidPosition(parts) && (info.addHistory(`Found valid position ${this.implodeKey(parts)}`), 
          stepUp = !1);
          return {
            parts: parts,
            duplicate: !1
          };
        }
        hoist(info) {
          var oldKey = info.key, rawParts = info.parts;
          this.tree.delete(oldKey);
          var _this$getNewParts = this.getNewParts(oldKey, info, rawParts.slice()), parts = _this$getNewParts.parts, duplicate = _this$getNewParts.duplicate, newKey = this.implodeKey(parts);
          return duplicate ? (info.addHistory(`Satisfied from above by ${newKey}`), this.declareRename(info, rawParts, parts), 
          void this.updateHoistHistory(this.nohoistResolver._originalPath(info), this.implodeKey(parts))) : oldKey === newKey ? (info.addHistory("Didn't hoist - see reason above"), 
          void this.setKey(info, oldKey, rawParts)) : (this.declareRename(info, rawParts, parts), 
          void this.setKey(info, newKey, parts));
        }
        declareRename(info, oldParts, newParts) {
          this.taintParents(info, oldParts.slice(0, -1), newParts.length - 1);
        }
        taintParents(info, processParts, start) {
          for (var i = start; i < processParts.length; i++) {
            var parts = processParts.slice(0, i).concat(info.pkg.name), key = this.implodeKey(parts);
            this.taintKey(key, info) && info.addHistory(`Tainted ${key} to prevent collisions`);
          }
        }
        updateHoistHistory(fromPath, toKey) {
          var info = this.tree.get(toKey);
          package_hoister_invariant(info, `expect to find hoist-to ${toKey}`), info.previousPaths.push(fromPath);
        }
        setKey(info, newKey, parts) {
          var oldKey = info.key;
          if (info.key = newKey, info.parts = parts, this.tree.set(newKey, info), oldKey !== newKey) {
            var fromInfo = this.tree.get(newKey);
            package_hoister_invariant(fromInfo, `expect to find hoist-from ${newKey}`), info.previousPaths.push(this.nohoistResolver._originalPath(fromInfo)), 
            info.addHistory(`New position = ${newKey}`);
          }
        }
        prepass(patterns) {
          patterns = this.resolver.dedupePatterns(patterns).sort();
          var visited = new Map, occurences = {}, visitAdd = (pkg, ancestry, pattern) => {
            var versions = occurences[pkg.name] = occurences[pkg.name] || {}, version = versions[pkg.version] = versions[pkg.version] || {
              occurences: new Set,
              pattern: pattern
            };
            ancestry.length && version.occurences.add(ancestry[ancestry.length - 1]);
          }, add = (pattern, ancestry, ancestryPatterns) => {
            var pkg = this.resolver.getStrictResolvedPattern(pattern);
            if (!(ancestry.indexOf(pkg) >= 0)) {
              var visitedPattern = visited.get(pattern);
              if (visitedPattern) return visitedPattern.forEach((visitPkg => {
                visitAdd(visitPkg.pkg, visitPkg.ancestry, visitPkg.pattern);
              })), void visitAdd(pkg, ancestry, pattern);
              var ref = pkg._reference;
              for (var depPattern of (package_hoister_invariant(ref, "expected reference"), visitAdd(pkg, ancestry, pattern), 
              ref.dependencies)) {
                var depAncestry = ancestry.concat(pkg), depAncestryPatterns = ancestryPatterns.concat(depPattern);
                add(depPattern, depAncestry, depAncestryPatterns);
              }
              visitedPattern = visited.get(pattern) || [], visited.set(pattern, visitedPattern), 
              visitedPattern.push({
                pkg: pkg,
                ancestry: ancestry,
                pattern: pattern
              }), ancestryPatterns.forEach((ancestryPattern => {
                var visitedAncestryPattern = visited.get(ancestryPattern);
                visitedAncestryPattern && visitedAncestryPattern.push({
                  pkg: pkg,
                  ancestry: ancestry,
                  pattern: pattern
                });
              }));
            }
          }, rootPackageNames = new Set;
          for (var pattern of patterns) {
            var pkg = this.resolver.getStrictResolvedPattern(pattern);
            rootPackageNames.add(pkg.name), add(pattern, [], []);
          }
          for (var _packageName of Object.keys(occurences).sort()) {
            var versionOccurences = occurences[_packageName];
            if (1 !== Object.keys(versionOccurences).length && (!this.tree.get(_packageName) && !rootPackageNames.has(_packageName))) {
              var mostOccurenceCount = void 0, mostOccurencePattern = void 0;
              for (var _version of Object.keys(versionOccurences).sort()) {
                var _versionOccurences$_v = versionOccurences[_version], _occurences = _versionOccurences$_v.occurences, _pattern3 = _versionOccurences$_v.pattern, occurenceCount = _occurences.size;
                (!mostOccurenceCount || occurenceCount > mostOccurenceCount) && (mostOccurenceCount = occurenceCount, 
                mostOccurencePattern = _pattern3);
              }
              package_hoister_invariant(mostOccurencePattern, "expected most occurring pattern"), 
              package_hoister_invariant(mostOccurenceCount, "expected most occurring count"), 
              mostOccurenceCount > 1 && this._seed(mostOccurencePattern, {
                isDirectRequire: !1
              });
            }
          }
        }
        markShallowWorkspaceEntries() {
          var targetWorkspace = this.config.focusedWorkspaceName, targetHoistManifest = this.tree.get(targetWorkspace);
          package_hoister_invariant(targetHoistManifest, `targetHoistManifest from ${targetWorkspace} missing`);
          var dependentWorkspaces = Array.from(new Set(this._getDependentWorkspaces(targetHoistManifest)));
          Array.from(this.tree).forEach((_ref6 => {
            var key = _ref6[0], info = _ref6[1], splitPath = key.split("#");
            if (dependentWorkspaces.some((w => {
              if (splitPath[0] !== w) return !1;
              if (!splitPath[1]) return !0;
              var treeEntry = this.tree.get(w);
              package_hoister_invariant(treeEntry, "treeEntry is not defined for " + w);
              var pkg = treeEntry.pkg;
              return !(info.isNohoist || pkg.devDependencies && splitPath[1] in pkg.devDependencies);
            }))) info.shallowPaths = [ null ]; else if (2 === splitPath.length && splitPath[0] === targetWorkspace) {
              var unhoistedDependency = splitPath[1], unhoistedInfo = this.tree.get(unhoistedDependency);
              unhoistedInfo && dependentWorkspaces.forEach((w => {
                this._packageDependsOnHoistedPackage(w, unhoistedDependency, !1) && unhoistedInfo.shallowPaths.push(w);
              }));
            }
          }));
        }
        _getDependentWorkspaces(parent, allowDevDeps, alreadySeen) {
          void 0 === allowDevDeps && (allowDevDeps = !0), void 0 === alreadySeen && (alreadySeen = new Set);
          var parentName = parent.pkg.name;
          if (alreadySeen.has(parentName)) return [];
          alreadySeen.add(parentName), package_hoister_invariant(this.workspaceLayout, "missing workspaceLayout");
          var _this$workspaceLayout = this.workspaceLayout, virtualManifestName = _this$workspaceLayout.virtualManifestName, workspaces = _this$workspaceLayout.workspaces, directDependencies = [], ignored = [];
          Object.keys(workspaces).forEach((workspace => {
            if (!alreadySeen.has(workspace) && workspace !== virtualManifestName) {
              var info = this.tree.get(`${parentName}#${workspace}`);
              if (info) {
                var workspaceVersion = workspaces[workspace].manifest.version;
                info.isNohoist && info.originalParentPath.startsWith(`/${WS_ROOT_ALIAS}/${parentName}`) && info.pkg.version === workspaceVersion ? directDependencies.push(info.key) : ignored.push(workspace);
              } else {
                var searchPath = `/${WS_ROOT_ALIAS}/${parentName}`;
                info = this.tree.get(workspace), package_hoister_invariant(info, "missing workspace tree entry " + workspace), 
                info.previousPaths.some((p => p.startsWith(searchPath))) && (!allowDevDeps && parent.pkg.devDependencies && workspace in parent.pkg.devDependencies || directDependencies.push(workspace));
              }
            }
          }));
          var nested = directDependencies.map((d => {
            var dependencyEntry = this.tree.get(d);
            return package_hoister_invariant(dependencyEntry, "missing dependencyEntry " + d), 
            this._getDependentWorkspaces(dependencyEntry, !1, alreadySeen);
          }));
          return nested = [].concat.apply([], nested), directDependencies.map((d => d.split("#").slice(-1)[0])).concat(nested).filter((w => -1 === ignored.indexOf(w)));
        }
        _packageDependsOnHoistedPackage(p, hoisted, checkDevDeps, checked) {
          if (void 0 === checkDevDeps && (checkDevDeps = !0), void 0 === checked && (checked = new Set), 
          checked.has(p) || this.tree.has(`${p}#${hoisted}`)) return !1;
          checked.add(p);
          var info = this.tree.get(p);
          if (!info) return !1;
          var pkg = info.pkg;
          if (!pkg) return !1;
          var deps = [];
          return pkg.dependencies && (deps = deps.concat(Object.keys(pkg.dependencies))), 
          checkDevDeps && pkg.devDependencies && (deps = deps.concat(Object.keys(pkg.devDependencies))), 
          -1 !== deps.indexOf(hoisted) || deps.some((dep => this._packageDependsOnHoistedPackage(dep, hoisted, !1, checked)));
        }
        init() {
          var _this2 = this, flatTree = [], _loop2 = function(_ref7) {
            var key = _ref7[0], info = _ref7[1], parts = [], keyParts = key.split("#"), isWorkspaceEntry = _this2.workspaceLayout && keyParts[0] === _this2.workspaceLayout.virtualManifestName;
            if (isWorkspaceEntry && keyParts.length <= 2) return "continue";
            for (var i = 0; i < keyParts.length; i++) {
              var _key = keyParts.slice(0, i + 1).join("#"), hoisted = _this2.tree.get(_key);
              package_hoister_invariant(hoisted, `expected hoisted manifest for "${_key}"`), parts.push(_this2.config.getFolder(hoisted.pkg)), 
              parts.push(keyParts[i]);
            }
            if (_this2.workspaceLayout && isWorkspaceEntry) {
              var wspPkg = _this2.workspaceLayout.workspaces[keyParts[1]];
              package_hoister_invariant(wspPkg, `expected workspace package to exist for "${keyParts[1]}"`), 
              parts.splice(0, 4, wspPkg.loc);
            } else _this2.config.modulesFolder ? parts.splice(0, 1, _this2.config.modulesFolder) : parts.splice(0, 0, _this2.config.lockfileFolder);
            var shallowLocs = [];
            info.shallowPaths.forEach((shallowPath => {
              var shallowCopyParts = parts.slice();
              if (shallowCopyParts[0] = _this2.config.cwd, _this2.config.modulesFolder) {
                var treeEntry = _this2.tree.get(keyParts[0]);
                package_hoister_invariant(treeEntry, "expected treeEntry for " + keyParts[0]);
                var moduleFolderName = _this2.config.getFolder(treeEntry.pkg);
                shallowCopyParts.splice(1, 0, moduleFolderName);
              }
              if (shallowPath) {
                var targetWorkspace = _this2.config.focusedWorkspaceName, _treeEntry = _this2.tree.get(`${targetWorkspace}#${shallowPath}`) || _this2.tree.get(shallowPath);
                package_hoister_invariant(_treeEntry, "expected treeEntry for " + shallowPath);
                var _moduleFolderName = _this2.config.getFolder(_treeEntry.pkg);
                shallowCopyParts.splice(1, 0, _moduleFolderName, shallowPath);
              }
              shallowLocs.push(package_hoister_path.join.apply(package_hoister_path, shallowCopyParts));
            }));
            var loc = package_hoister_path.join.apply(package_hoister_path, parts);
            flatTree.push([ loc, info ]), shallowLocs.forEach((shallowLoc => {
              var newManifest = _extends({}, info, {
                isShallow: !0
              });
              flatTree.push([ shallowLoc, newManifest ]);
            }));
          };
          for (var _ref7 of this.tree.entries()) _loop2(_ref7);
          var visibleFlatTree = [];
          for (var _ref8 of flatTree) {
            var loc = _ref8[0], info = _ref8[1], ref = info.pkg._reference;
            package_hoister_invariant(ref, "expected reference"), info.isRequired ? visibleFlatTree.push([ loc, info ]) : info.addHistory("Deleted as this module was ignored");
          }
          return visibleFlatTree;
        }
      }
      var WS_ROOT_ALIAS = "_project_";
      class NohoistResolver {
        constructor(config, resolver) {
          if (this._resolver = resolver, this._config = config, resolver.workspaceLayout) {
            this._wsRootPackageName = resolver.workspaceLayout.virtualManifestName;
            var manifest = resolver.workspaceLayout.getWorkspaceManifest(this._wsRootPackageName).manifest;
            this._wsRootNohoistList = this._extractNohoistList(manifest, manifest.name);
          }
        }
        initNohoist(info, parent) {
          var parentNohoistList, originalParentPath = info.originalParentPath;
          parent ? (parentNohoistList = parent.nohoistList, originalParentPath = this._originalPath(parent)) : (package_hoister_invariant(this._isTopPackage(info), `${info.key} doesn't have parent nor a top package`), 
          info.pkg.name !== this._wsRootPackageName && (parentNohoistList = this._wsRootNohoistList, 
          originalParentPath = this._wsRootPackageName || "")), info.originalParentPath = originalParentPath;
          var nohoistList = this._extractNohoistList(info.pkg, this._originalPath(info)) || [];
          parentNohoistList && (nohoistList = nohoistList.concat(parentNohoistList)), info.nohoistList = nohoistList.length > 0 ? nohoistList : null, 
          info.isNohoist = this._isNohoist(info);
        }
        highestHoistingPoint(info) {
          return info.isNohoist && info.parts.length > 1 ? 1 : null;
        }
        _isNohoist(info) {
          return !this._isTopPackage(info) && (!!(info.nohoistList && info.nohoistList.length > 0 && package_hoister_mm.any(this._originalPath(info), info.nohoistList)) || !!this._config.plugnplayEnabled);
        }
        _isRootPackage(pkg) {
          return pkg.name === this._wsRootPackageName;
        }
        _originalPath(info) {
          return this._makePath(info.originalParentPath, info.pkg.name);
        }
        _makePath() {
          var result = Array.prototype.slice.call(arguments, 0).map((s => s === this._wsRootPackageName ? WS_ROOT_ALIAS : s)).join("/");
          return "/" === result[0] ? result : "/" + result;
        }
        _isTopPackage(info) {
          var parentParts = info.parts.slice(0, -1);
          return !parentParts || parentParts.length <= 0 || 1 === parentParts.length && parentParts[0] === this._wsRootPackageName;
        }
        _isLink(info) {
          return null != info.pkg._remote && LINK_TYPES.has(info.pkg._remote.type);
        }
        _extractNohoistList(pkg, pathPrefix) {
          var nohoistList, ws = this._config.getWorkspaces(pkg);
          return ws && ws.nohoist && (nohoistList = ws.nohoist.map((p => this._makePath(pathPrefix, p)))), 
          nohoistList;
        }
      }
      var package_linker_invariant = __webpack_require__(46128), package_linker_cmdShim = __webpack_require__(28450), package_linker_path = __webpack_require__(71017), package_linker_semver = __webpack_require__(92878);
      function linkBin() {
        return _linkBin.apply(this, arguments);
      }
      function _linkBin() {
        return (_linkBin = asyncToGenerator_asyncToGenerator((function*(src, dest) {
          if ("win32" === process.platform) {
            var unlockMutex = yield mutex(src);
            try {
              yield package_linker_cmdShim(src, dest, {
                createPwshFile: !1
              });
            } finally {
              unlockMutex();
            }
          } else yield mkdirp(package_linker_path.dirname(dest)), yield symlink(src, dest), 
          yield chmod(dest, "755");
        }))).apply(this, arguments);
      }
      class PackageLinker {
        constructor(config, resolver) {
          this.resolver = resolver, this.reporter = config.reporter, this.config = config, 
          this.artifacts = {}, this.topLevelBinLinking = !0, this.unplugged = [];
        }
        setArtifacts(artifacts) {
          this.artifacts = artifacts;
        }
        setTopLevelBinLinking(topLevelBinLinking) {
          this.topLevelBinLinking = topLevelBinLinking;
        }
        linkSelfDependencies(pkg, pkgLoc, targetBinLoc, override) {
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var _ref of (void 0 === override && (override = !1), targetBinLoc = package_linker_path.join(targetBinLoc, ".bin"), 
            yield mkdirp(targetBinLoc), targetBinLoc = yield realpath(targetBinLoc), pkgLoc = yield realpath(pkgLoc), 
            entries(pkg.bin))) {
              var scriptName = _ref[0], scriptCmd = _ref[1], dest = package_linker_path.join(targetBinLoc, scriptName), src = package_linker_path.join(pkgLoc, scriptCmd);
              ((yield fs_exists(src)) || override) && (yield linkBin(src, dest));
            }
          }))();
        }
        linkBinDependencies(pkg, dir) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var deps = [], ref = pkg._reference;
            package_linker_invariant(ref, "Package reference is missing");
            var remote = pkg._remote;
            for (var pattern of (package_linker_invariant(remote, "Package remote is missing"), 
            ref.dependencies)) {
              var dep = _this.resolver.getStrictResolvedPattern(pattern);
              if (dep._reference && dep._reference.locations.length && dep.bin && Object.keys(dep.bin).length) {
                var loc = yield _this.findNearestInstalledVersionOfPackage(dep, dir);
                deps.push({
                  dep: dep,
                  loc: loc
                });
              }
            }
            if (pkg.bundleDependencies) {
              var _loop = function*(depName) {
                var locs = ref.locations.map((loc => package_linker_path.join(loc, _this.config.getFolder(pkg), depName)));
                try {
                  var _dep = yield _this.config.readManifest(locs[0], remote.registry);
                  _dep.bin && Object.keys(_dep.bin).length && deps.push.apply(deps, locs.map((loc => ({
                    dep: _dep,
                    loc: loc
                  }))));
                } catch (ex) {
                  if ("ENOENT" !== ex.code) throw ex;
                }
              };
              for (var depName of pkg.bundleDependencies) yield* _loop(depName);
            }
            if (deps.length) for (var _ref2 of deps) {
              var _dep2 = _ref2.dep, _loc = _ref2.loc;
              _dep2._reference && _dep2._reference.locations.length && (package_linker_invariant(!_dep2._reference.isPlugnplay, "Plug'n'play packages should not be referenced here"), 
              yield _this.linkSelfDependencies(_dep2, _loc, dir));
            }
          }))();
        }
        findNearestInstalledVersionOfPackage(pkg, binLoc) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var ref = pkg._reference;
            package_linker_invariant(ref, "expected pkg reference for " + pkg.name);
            var moduleFolder = _this2.config.getFolder(pkg);
            yield mkdirp(binLoc);
            var realBinLoc = yield realpath(binLoc), allLocations = [].concat(ref.locations);
            (yield Promise.all(ref.locations.map((loc => realpath(loc))))).forEach((loc => -1 !== allLocations.indexOf(loc) || allLocations.push(loc)));
            var locationBinLocPairs = allLocations.map((loc => [ loc, binLoc ]));
            binLoc !== realBinLoc && locationBinLocPairs.push.apply(locationBinLocPairs, allLocations.map((loc => [ loc, realBinLoc ])));
            var filteredDistancePairs = locationBinLocPairs.map((_ref3 => {
              for (var loc = _ref3[0], distance = 0, curLoc = _ref3[1], notFound = !1; package_linker_path.join(curLoc, ref.name) !== loc && package_linker_path.join(curLoc, moduleFolder, ref.name) !== loc; ) {
                var next = package_linker_path.dirname(curLoc);
                if (curLoc === next) {
                  notFound = !0;
                  break;
                }
                distance++, curLoc = next;
              }
              return notFound ? null : [ loc, distance ];
            })).filter((d => d));
            package_linker_invariant(filteredDistancePairs.length > 0, `could not find a copy of ${pkg.name} to link in ${binLoc}`);
            var minItem = filteredDistancePairs.reduce(((min, cur) => cur[1] < min[1] ? cur : min));
            return package_linker_invariant(minItem[1] >= 0, "could not find a target for bin dir of " + minItem.toString()), 
            minItem[0];
          }))();
        }
        getFlatHoistedTree(patterns, workspaceLayout, _temp) {
          var ignoreOptional = (void 0 === _temp ? {} : _temp).ignoreOptional, hoister = new PackageHoister(this.config, this.resolver, {
            ignoreOptional: ignoreOptional,
            workspaceLayout: workspaceLayout
          });
          return hoister.seed(patterns), this.config.focus && hoister.markShallowWorkspaceEntries(), 
          hoister.init();
        }
        copyModules(patterns, workspaceLayout, _temp2) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _ref5 = void 0 === _temp2 ? {} : _temp2, linkDuplicates = _ref5.linkDuplicates, ignoreOptional = _ref5.ignoreOptional, flatTree = _this3.getFlatHoistedTree(patterns, workspaceLayout, {
              ignoreOptional: ignoreOptional
            });
            flatTree = flatTree.sort((function(dep1, dep2) {
              return dep1[0].localeCompare(dep2[0]);
            }));
            var artifactFiles = [], copyQueue = new Map, hardlinkQueue = new Map, hardlinksEnabled = linkDuplicates && (yield function() {
              return _hardlinksWork.apply(this, arguments);
            }(_this3.config.cwd)), copiedSrcs = new Map, symlinkPaths = new Map, _loop2 = function*(_ref6) {
              var folder = _ref6[0], _ref6$ = _ref6[1], pkg = _ref6$.pkg, loc = _ref6$.loc, isShallow = _ref6$.isShallow, remote = pkg._remote || {
                type: ""
              }, ref = pkg._reference, dest = folder;
              package_linker_invariant(ref, "expected package reference");
              var src = loc, type = "";
              if ("link" === remote.type) src = remote.reference, type = "symlink"; else if (workspaceLayout && "workspace" === remote.type && !isShallow) src = remote.reference, 
              type = "symlink", symlinkPaths.set(dest, src); else {
                var metadata = yield _this3.config.readPackageMetadata(src);
                for (var file of metadata.artifacts) artifactFiles.push(package_linker_path.join(dest, file));
              }
              for (var _ref13 of symlinkPaths.entries()) {
                var symlink = _ref13[0], realpath = _ref13[1];
                0 === dest.indexOf(symlink + package_linker_path.sep) && (dest = dest.replace(symlink, realpath));
              }
              if (_this3.config.plugnplayEnabled) {
                if (ref.isPlugnplay = !0, !(yield _this3._isUnplugged(pkg, ref))) return ref.addLocation(src), 
                "continue";
                if (dest = _this3.config.generatePackageUnpluggedPath(ref), yield fs_exists(dest)) return ref.addLocation(dest), 
                "continue";
              }
              ref.addLocation(dest);
              var integrityArtifacts = _this3.artifacts[`${pkg.name}@${pkg.version}`];
              if (integrityArtifacts) for (var _file of integrityArtifacts) artifactFiles.push(package_linker_path.join(dest, _file));
              var copiedDest = copiedSrcs.get(src);
              copiedDest ? hardlinkQueue.set(dest, {
                src: copiedDest,
                dest: dest,
                onFresh() {
                  ref && ref.setFresh(!0);
                }
              }) : (hardlinksEnabled && "symlink" !== type && copiedSrcs.set(src, dest), copyQueue.set(dest, {
                src: src,
                dest: dest,
                type: type,
                onFresh() {
                  ref && ref.setFresh(!0);
                }
              }));
            };
            for (var _ref6 of flatTree) yield* _loop2(_ref6);
            var possibleExtraneous = new Set, scopedPaths = new Set, findExtraneousFiles = function() {
              var _ref7 = asyncToGenerator_asyncToGenerator((function*(basePath) {
                for (var folder of _this3.config.registryFolders) {
                  var loc = package_linker_path.resolve(basePath, folder);
                  if (yield fs_exists(loc)) {
                    var files = yield readdir(loc);
                    for (var file of files) {
                      var filepath = package_linker_path.join(loc, file);
                      if ("@" === file[0]) for (var subfile of (scopedPaths.add(filepath), yield readdir(filepath))) possibleExtraneous.add(package_linker_path.join(filepath, subfile)); else "." === file[0] && ".bin" !== file && (yield fs_lstat(filepath)).isDirectory() || possibleExtraneous.add(filepath);
                    }
                  }
                }
              }));
              return function() {
                return _ref7.apply(this, arguments);
              };
            }();
            if (yield findExtraneousFiles(_this3.config.lockfileFolder), workspaceLayout) for (var workspaceName of Object.keys(workspaceLayout.workspaces)) yield findExtraneousFiles(workspaceLayout.workspaces[workspaceName].loc);
            var linkedModules, tick, linkTargets = new Map;
            try {
              linkedModules = yield readdir(_this3.config.linkFolder);
            } catch (err) {
              if ("ENOENT" !== err.code) throw err;
              linkedModules = [];
            }
            for (var entry of linkedModules) {
              var entryPath = package_linker_path.join(_this3.config.linkFolder, entry), stat = yield fs_lstat(entryPath);
              if (stat.isSymbolicLink()) try {
                var entryTarget = yield realpath(entryPath);
                linkTargets.set(entry, entryTarget);
              } catch (err) {
                _this3.reporter.warn(_this3.reporter.lang("linkTargetMissing", entry)), yield unlink(entryPath);
              } else if (stat.isDirectory() && "@" === entry[0]) {
                var scopeName = entry;
                for (var entry2 of yield readdir(entryPath)) {
                  var entryPath2 = package_linker_path.join(entryPath, entry2);
                  if ((yield fs_lstat(entryPath2)).isSymbolicLink()) {
                    var packageName = `${scopeName}/${entry2}`;
                    try {
                      var _entryTarget = yield realpath(entryPath2);
                      linkTargets.set(packageName, _entryTarget);
                    } catch (err) {
                      _this3.reporter.warn(_this3.reporter.lang("linkTargetMissing", packageName)), yield unlink(entryPath2);
                    }
                  }
                }
              }
            }
            for (var loc of possibleExtraneous) {
              var _packageName = package_linker_path.basename(loc), _scopeName = package_linker_path.basename(package_linker_path.dirname(loc));
              "@" === _scopeName[0] && (_packageName = `${_scopeName}/${_packageName}`), (yield fs_lstat(loc)).isSymbolicLink() && linkTargets.has(_packageName) && linkTargets.get(_packageName) === (yield realpath(loc)) && (possibleExtraneous.delete(loc), 
              copyQueue.delete(loc));
            }
            for (var _loc2 of (yield copyBulk(Array.from(copyQueue.values()), _this3.reporter, {
              possibleExtraneous: possibleExtraneous,
              artifactFiles: artifactFiles,
              ignoreBasenames: [ ".yarn-metadata.json", ".yarn-tarball.tgz", ".bin" ],
              onStart: num => {
                tick = _this3.reporter.progress(num);
              },
              onProgress(src) {
                tick && tick();
              }
            }), yield function() {
              return _hardlinkBulk.apply(this, arguments);
            }(Array.from(hardlinkQueue.values()), _this3.reporter, {
              possibleExtraneous: possibleExtraneous,
              artifactFiles: artifactFiles,
              onStart: num => {
                tick = _this3.reporter.progress(num);
              },
              onProgress(src) {
                tick && tick();
              }
            }), possibleExtraneous)) _this3.reporter.verbose(_this3.reporter.lang("verboseFileRemoveExtraneous", _loc2)), 
            yield unlink(_loc2);
            for (var scopedPath of scopedPaths) {
              0 === (yield readdir(scopedPath)).length && (yield unlink(scopedPath));
            }
            if (_this3.config.getOption("bin-links") && !1 !== _this3.config.binLinks) {
              var topLevelDependencies = _this3.determineTopLevelBinLinkOrder(flatTree), tickBin = _this3.reporter.progress(flatTree.length + topLevelDependencies.length);
              yield promise_queue(flatTree, function() {
                var _ref9 = asyncToGenerator_asyncToGenerator((function*(_ref8) {
                  var dest = _ref8[0], _ref8$ = _ref8[1], pkg = _ref8$.pkg, isNohoist = _ref8$.isNohoist, parts = _ref8$.parts;
                  if (pkg._reference && pkg._reference.locations.length && !pkg._reference.isPlugnplay) {
                    var binLoc = package_linker_path.join(dest, _this3.config.getFolder(pkg));
                    if (yield _this3.linkBinDependencies(pkg, binLoc), isNohoist) {
                      var parentBinLoc = _this3.getParentBinLoc(parts, flatTree);
                      yield _this3.linkSelfDependencies(pkg, dest, parentBinLoc, !0);
                    }
                    tickBin();
                  }
                  tickBin();
                }));
                return function() {
                  return _ref9.apply(this, arguments);
                };
              }(), 1), yield promise_queue(topLevelDependencies, function() {
                var _ref11 = asyncToGenerator_asyncToGenerator((function*(_ref10) {
                  var binLoc, dest = _ref10[0], pkg = _ref10[1].pkg;
                  pkg._reference && pkg._reference.locations.length && !pkg._reference.isPlugnplay && pkg.bin && Object.keys(pkg.bin).length && (binLoc = _this3.config.modulesFolder ? package_linker_path.join(_this3.config.modulesFolder) : package_linker_path.join(_this3.config.lockfileFolder, _this3.config.getFolder(pkg)), 
                  yield _this3.linkSelfDependencies(pkg, dest, binLoc));
                  tickBin();
                }));
                return function() {
                  return _ref11.apply(this, arguments);
                };
              }(), 1);
            }
            for (var _ref12 of flatTree) {
              var pkg = _ref12[1].pkg;
              yield _this3._warnForMissingBundledDependencies(pkg);
            }
          }))();
        }
        _buildTreeHash(flatTree) {
          var hash = new Map;
          for (var _ref14 of flatTree) {
            var dest = _ref14[0], hoistManifest = _ref14[1], key = hoistManifest.parts.join("#");
            hash.set(key, [ dest, hoistManifest ]);
          }
          return this._treeHash = hash, hash;
        }
        getParentBinLoc(parts, flatTree) {
          var hash = this._treeHash || this._buildTreeHash(flatTree), parent = parts.slice(0, -1).join("#"), tuple = hash.get(parent);
          if (!tuple) throw new Error(`failed to get parent '${parent}' binLoc`);
          var dest = tuple[0], hoistManifest = tuple[1];
          return package_linker_path.join(dest, this.config.getFolder(hoistManifest.pkg));
        }
        determineTopLevelBinLinkOrder(flatTree) {
          var linksToCreate = new Map;
          for (var _ref15 of flatTree) {
            var dest = _ref15[0], hoistManifest = _ref15[1], pkg = hoistManifest.pkg, isDirectRequire = hoistManifest.isDirectRequire, isNohoist = hoistManifest.isNohoist, isShallow = hoistManifest.isShallow, name = pkg.name;
            isNohoist || isShallow || !(isDirectRequire || this.topLevelBinLinking && !linksToCreate.has(name)) || linksToCreate.set(name, [ dest, hoistManifest ]);
          }
          var transientBins = [], topLevelBins = [];
          for (var linkToCreate of Array.from(linksToCreate.values())) linkToCreate[1].isDirectRequire ? topLevelBins.push(linkToCreate) : transientBins.push(linkToCreate);
          return [].concat(transientBins, topLevelBins);
        }
        resolvePeerModules() {
          var _this4 = this, _loop3 = function(pkg) {
            var peerDeps = pkg.peerDependencies, peerDepsMeta = pkg.peerDependenciesMeta;
            if (!peerDeps) return "continue";
            var ref = pkg._reference;
            package_linker_invariant(ref, "Package reference is missing");
            var refTree = ref.requests.map((req => req.parentNames)).sort(((arr1, arr2) => arr1.length - arr2.length))[0], getLevelDistance = pkgRef => {
              var minDistance = 1 / 0;
              for (var req of pkgRef.requests) {
                var distance = refTree.length - req.parentNames.length;
                distance >= 0 && distance < minDistance && req.parentNames.every(((name, idx) => name === refTree[idx])) && (minDistance = distance);
              }
              return minDistance;
            };
            for (var peerDepName in peerDeps) {
              var range = peerDeps[peerDepName], meta = peerDepsMeta && peerDepsMeta[peerDepName], isOptional = !(!meta || !meta.optional), peerPkgs = _this4.resolver.getAllInfoForPackageName(peerDepName), peerError = "unmetPeer", resolvedLevelDistance = 1 / 0, resolvedPeerPkg = void 0;
              for (var peerPkg of peerPkgs) {
                var peerPkgRef = peerPkg._reference;
                if (peerPkgRef && peerPkgRef.patterns) {
                  var levelDistance = getLevelDistance(peerPkgRef);
                  isFinite(levelDistance) && levelDistance < resolvedLevelDistance && (_this4._satisfiesPeerDependency(range, peerPkgRef.version) ? (resolvedLevelDistance = levelDistance, 
                  resolvedPeerPkg = peerPkgRef) : peerError = "incorrectPeer");
                }
              }
              resolvedPeerPkg ? (ref.addDependencies(resolvedPeerPkg.patterns), _this4.reporter.verbose(_this4.reporter.lang("selectedPeer", `${pkg.name}@${pkg.version}`, `${peerDepName}@${resolvedPeerPkg.version}`, resolvedPeerPkg.level))) : isOptional || _this4.reporter.warn(_this4.reporter.lang(peerError, `${refTree.join(" > ")} > ${pkg.name}@${pkg.version}`, `${peerDepName}@${range}`));
            }
          };
          for (var pkg of this.resolver.getManifests()) _loop3(pkg);
        }
        _satisfiesPeerDependency(range, version) {
          return "*" === range || satisfiesWithPrereleases(version, range, this.config.looseSemver);
        }
        _warnForMissingBundledDependencies(pkg) {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var ref = pkg._reference;
            if (package_linker_invariant(ref, "missing package ref " + pkg.name), pkg.bundleDependencies) {
              var _loop4 = function*(depName) {
                var locs = ref.locations.map((loc => package_linker_path.join(loc, _this5.config.getFolder(pkg), depName)));
                if ((yield Promise.all(locs.map((loc => fs_exists(loc))))).some((e => !e))) {
                  var pkgHuman = `${pkg.name}@${pkg.version}`;
                  _this5.reporter.warn(_this5.reporter.lang("missingBundledDependency", pkgHuman, depName));
                }
              };
              for (var depName of pkg.bundleDependencies) yield* _loop4(depName);
            }
          }))();
        }
        _isUnplugged(pkg, ref) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return !!(yield fs_exists(_this6.config.generatePackageUnpluggedPath(ref))) || (!(_this6.config.ignoreScripts || !pkg.scripts || !(pkg.scripts.preinstall || pkg.scripts.install || pkg.scripts.postinstall)) || _this6.unplugged.some((patternToUnplug => {
              var _normalizePattern = normalizePattern(patternToUnplug), name = _normalizePattern.name, range = _normalizePattern.range, satisfiesSemver = !_normalizePattern.hasVersion || package_linker_semver.satisfies(ref.version, range);
              return name === ref.name && satisfiesSemver;
            })));
          }))();
        }
        init(patterns, workspaceLayout, _temp3) {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _ref16 = void 0 === _temp3 ? {} : _temp3, linkDuplicates = _ref16.linkDuplicates, ignoreOptional = _ref16.ignoreOptional;
            _this7.resolvePeerModules(), yield _this7.copyModules(patterns, workspaceLayout, {
              linkDuplicates: linkDuplicates,
              ignoreOptional: ignoreOptional
            }), _this7.config.plugnplayEnabled || (yield unlink(`${_this7.config.lockfileFolder}/.pnp.js`));
          }))();
        }
      }
      var autoclean_invariant = __webpack_require__(46128), autoclean_path = __webpack_require__(71017), requireLockfile = !0, noArguments = !0, DEFAULT_FILTER = "\n# test directories\n__tests__\ntest\ntests\npowered-test\n\n# asset directories\ndocs\ndoc\nwebsite\nimages\nassets\n\n# examples\nexample\nexamples\n\n# code coverage directories\ncoverage\n.nyc_output\n\n# build scripts\nMakefile\nGulpfile.js\nGruntfile.js\n\n# configs\nappveyor.yml\ncircle.yml\ncodeship-services.yml\ncodeship-steps.yml\nwercker.yml\n.tern-project\n.gitattributes\n.editorconfig\n.*ignore\n.eslintrc\n.jshintrc\n.flowconfig\n.documentup.json\n.yarn-metadata.json\n.travis.yml\n\n# misc\n*.md\n".trim();
      function autoclean_clean() {
        return commands_autoclean_clean.apply(this, arguments);
      }
      function commands_autoclean_clean() {
        return (commands_autoclean_clean = asyncToGenerator_asyncToGenerator((function*(config, reporter) {
          var loc = autoclean_path.join(config.lockfileFolder, ".yarnclean"), filters = ignoreLinesToRegex((yield readFile(loc)).split("\n")), removedFiles = 0, removedSize = 0, locs = new Set;
          for (var registryFolder of config.registryFolders) locs.add(autoclean_path.resolve(config.lockfileFolder, registryFolder));
          var workspaceRootFolder = config.workspaceRootFolder;
          if (workspaceRootFolder) {
            var manifest = yield config.findManifest(workspaceRootFolder, !1);
            autoclean_invariant(manifest && manifest.workspaces, 'We must find a manifest with a "workspaces" property');
            var workspaces = yield config.resolveWorkspaces(workspaceRootFolder, manifest);
            for (var workspaceName of Object.keys(workspaces)) for (var name of registryNames) {
              var registry = config.registries[name];
              locs.add(autoclean_path.join(workspaces[workspaceName].loc, registry.folder));
            }
          }
          for (var folder of locs) if (yield fs_exists(folder)) {
            var spinner = reporter.activity(), ignoreFiles = sortFilter(yield walk(folder), filters).ignoreFiles;
            spinner.end();
            var tick = reporter.progress(ignoreFiles.size);
            for (var _file of ignoreFiles) {
              var _loc = autoclean_path.join(folder, _file);
              removedSize += (yield fs_lstat(_loc)).size, removedFiles++;
            }
            for (var _file2 of ignoreFiles) {
              var _loc2 = autoclean_path.join(folder, _file2);
              yield unlink(_loc2), tick();
            }
          }
          return {
            removedFiles: removedFiles,
            removedSize: removedSize
          };
        }))).apply(this, arguments);
      }
      function runInit() {
        return _runInit.apply(this, arguments);
      }
      function _runInit() {
        return (_runInit = asyncToGenerator_asyncToGenerator((function*(cwd, reporter) {
          reporter.step(1, 1, reporter.lang("cleanCreatingFile", ".yarnclean"));
          var cleanLoc = autoclean_path.join(cwd, ".yarnclean");
          yield writeFile(cleanLoc, `${DEFAULT_FILTER}\n`, {
            flag: "wx"
          }), reporter.info(reporter.lang("cleanCreatedFile", ".yarnclean"));
        }))).apply(this, arguments);
      }
      function runAutoClean() {
        return _runAutoClean.apply(this, arguments);
      }
      function _runAutoClean() {
        return (_runAutoClean = asyncToGenerator_asyncToGenerator((function*(config, reporter) {
          reporter.step(1, 1, reporter.lang("cleaning"));
          var _yield$clean = yield autoclean_clean(config, reporter), removedFiles = _yield$clean.removedFiles, removedSize = _yield$clean.removedSize;
          reporter.info(reporter.lang("cleanRemovedFiles", removedFiles)), reporter.info(reporter.lang("cleanSavedSize", Number((removedSize / 1024 / 1024).toFixed(2))));
        }))).apply(this, arguments);
      }
      function checkForCleanFile() {
        return _checkForCleanFile.apply(this, arguments);
      }
      function _checkForCleanFile() {
        return (_checkForCleanFile = asyncToGenerator_asyncToGenerator((function*(cwd) {
          var cleanLoc = autoclean_path.join(cwd, ".yarnclean");
          return yield fs_exists(cleanLoc);
        }))).apply(this, arguments);
      }
      function autoclean_run() {
        return commands_autoclean_run.apply(this, arguments);
      }
      function commands_autoclean_run() {
        return (commands_autoclean_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var cleanFileExists = yield checkForCleanFile(config.cwd);
          flags.init && cleanFileExists ? reporter.info(reporter.lang("cleanAlreadyExists", ".yarnclean")) : flags.init ? yield runInit(config.cwd, reporter) : flags.force && cleanFileExists ? yield runAutoClean(config, reporter) : cleanFileExists ? reporter.info(reporter.lang("cleanRequiresForce", ".yarnclean")) : reporter.info(reporter.lang("cleanDoesNotExist", ".yarnclean"));
        }))).apply(this, arguments);
      }
      function autoclean_setFlags(commander) {
        commander.description("Cleans and removes unnecessary files from package dependencies."), 
        commander.usage("autoclean [flags]"), commander.option("-I, --init", 'Create ".yarnclean" file with the default entries.'), 
        commander.option("-F, --force", 'Run autoclean using the existing ".yarnclean" file.');
      }
      function autoclean_hasWrapper(commander) {
        return !0;
      }
      var pnpApi = '#!$$SHEBANG\n\n/* eslint-disable max-len, flowtype/require-valid-file-annotation, flowtype/require-return-type */\n/* global packageInformationStores, $$BLACKLIST, $$SETUP_STATIC_TABLES */\n\n// Used for the resolveUnqualified part of the resolution (ie resolving folder/index.js & file extensions)\n// Deconstructed so that they aren\'t affected by any fs monkeypatching occuring later during the execution\nconst {statSync, lstatSync, readlinkSync, readFileSync, existsSync, realpathSync} = require(\'fs\');\n\nconst Module = require(\'module\');\nconst path = require(\'path\');\nconst StringDecoder = require(\'string_decoder\');\n\nconst ignorePattern = $$BLACKLIST ? new RegExp($$BLACKLIST) : null;\n\nconst pnpFile = path.resolve(__dirname, __filename);\nconst builtinModules = new Set(Module.builtinModules || Object.keys(process.binding(\'natives\')));\n\nconst topLevelLocator = {name: null, reference: null};\nconst blacklistedLocator = {name: NaN, reference: NaN};\n\n// Used for compatibility purposes - cf setupCompatibilityLayer\nconst patchedModules = [];\nconst fallbackLocators = [topLevelLocator];\n\n// Matches backslashes of Windows paths\nconst backwardSlashRegExp = /\\\\/g;\n\n// Matches if the path must point to a directory (ie ends with /)\nconst isDirRegExp = /\\/$/;\n\n// Matches if the path starts with a valid path qualifier (./, ../, /)\n// eslint-disable-next-line no-unused-vars\nconst isStrictRegExp = /^\\.{0,2}\\//;\n\n// Splits a require request into its components, or return null if the request is a file path\nconst pathRegExp = /^(?![a-zA-Z]:[\\\\\\/]|\\\\\\\\|\\.{0,2}(?:\\/|$))((?:@[^\\/]+\\/)?[^\\/]+)\\/?(.*|)$/;\n\n// Keep a reference around ("module" is a common name in this context, so better rename it to something more significant)\nconst pnpModule = module;\n\n/**\n * Used to disable the resolution hooks (for when we want to fallback to the previous resolution - we then need\n * a way to "reset" the environment temporarily)\n */\n\nlet enableNativeHooks = true;\n\n/**\n * Simple helper function that assign an error code to an error, so that it can more easily be caught and used\n * by third-parties.\n */\n\nfunction makeError(code, message, data = {}) {\n  const error = new Error(message);\n  return Object.assign(error, {code, data});\n}\n\n/**\n * Ensures that the returned locator isn\'t a blacklisted one.\n *\n * Blacklisted packages are packages that cannot be used because their dependencies cannot be deduced. This only\n * happens with peer dependencies, which effectively have different sets of dependencies depending on their parents.\n *\n * In order to deambiguate those different sets of dependencies, the Yarn implementation of PnP will generate a\n * symlink for each combination of <package name>/<package version>/<dependent package> it will find, and will\n * blacklist the target of those symlinks. By doing this, we ensure that files loaded through a specific path\n * will always have the same set of dependencies, provided the symlinks are correctly preserved.\n *\n * Unfortunately, some tools do not preserve them, and when it happens PnP isn\'t able anymore to deduce the set of\n * dependencies based on the path of the file that makes the require calls. But since we\'ve blacklisted those paths,\n * we\'re able to print a more helpful error message that points out that a third-party package is doing something\n * incompatible!\n */\n\n// eslint-disable-next-line no-unused-vars\nfunction blacklistCheck(locator) {\n  if (locator === blacklistedLocator) {\n    throw makeError(\n      `BLACKLISTED`,\n      [\n        `A package has been resolved through a blacklisted path - this is usually caused by one of your tools calling`,\n        `"realpath" on the return value of "require.resolve". Since the returned values use symlinks to disambiguate`,\n        `peer dependencies, they must be passed untransformed to "require".`,\n      ].join(` `)\n    );\n  }\n\n  return locator;\n}\n\n$$SETUP_STATIC_TABLES();\n\n/**\n * Returns the module that should be used to resolve require calls. It\'s usually the direct parent, except if we\'re\n * inside an eval expression.\n */\n\nfunction getIssuerModule(parent) {\n  let issuer = parent;\n\n  while (issuer && (issuer.id === \'[eval]\' || issuer.id === \'<repl>\' || !issuer.filename)) {\n    issuer = issuer.parent;\n  }\n\n  return issuer;\n}\n\n/**\n * Returns information about a package in a safe way (will throw if they cannot be retrieved)\n */\n\nfunction getPackageInformationSafe(packageLocator) {\n  const packageInformation = exports.getPackageInformation(packageLocator);\n\n  if (!packageInformation) {\n    throw makeError(\n      `INTERNAL`,\n      `Couldn\'t find a matching entry in the dependency tree for the specified parent (this is probably an internal error)`\n    );\n  }\n\n  return packageInformation;\n}\n\n/**\n * Implements the node resolution for folder access and extension selection\n */\n\nfunction applyNodeExtensionResolution(unqualifiedPath, {extensions}) {\n  // We use this "infinite while" so that we can restart the process as long as we hit package folders\n  while (true) {\n    let stat;\n\n    try {\n      stat = statSync(unqualifiedPath);\n    } catch (error) {}\n\n    // If the file exists and is a file, we can stop right there\n\n    if (stat && !stat.isDirectory()) {\n      // If the very last component of the resolved path is a symlink to a file, we then resolve it to a file. We only\n      // do this first the last component, and not the rest of the path! This allows us to support the case of bin\n      // symlinks, where a symlink in "/xyz/pkg-name/.bin/bin-name" will point somewhere else (like "/xyz/pkg-name/index.js").\n      // In such a case, we want relative requires to be resolved relative to "/xyz/pkg-name/" rather than "/xyz/pkg-name/.bin/".\n      //\n      // Also note that the reason we must use readlink on the last component (instead of realpath on the whole path)\n      // is that we must preserve the other symlinks, in particular those used by pnp to deambiguate packages using\n      // peer dependencies. For example, "/xyz/.pnp/local/pnp-01234569/.bin/bin-name" should see its relative requires\n      // be resolved relative to "/xyz/.pnp/local/pnp-0123456789/" rather than "/xyz/pkg-with-peers/", because otherwise\n      // we would lose the information that would tell us what are the dependencies of pkg-with-peers relative to its\n      // ancestors.\n\n      if (lstatSync(unqualifiedPath).isSymbolicLink()) {\n        unqualifiedPath = path.normalize(path.resolve(path.dirname(unqualifiedPath), readlinkSync(unqualifiedPath)));\n      }\n\n      return unqualifiedPath;\n    }\n\n    // If the file is a directory, we must check if it contains a package.json with a "main" entry\n\n    if (stat && stat.isDirectory()) {\n      let pkgJson;\n\n      try {\n        pkgJson = JSON.parse(readFileSync(`${unqualifiedPath}/package.json`, \'utf-8\'));\n      } catch (error) {}\n\n      let nextUnqualifiedPath;\n\n      if (pkgJson && pkgJson.main) {\n        nextUnqualifiedPath = path.resolve(unqualifiedPath, pkgJson.main);\n      }\n\n      // If the "main" field changed the path, we start again from this new location\n\n      if (nextUnqualifiedPath && nextUnqualifiedPath !== unqualifiedPath) {\n        const resolution = applyNodeExtensionResolution(nextUnqualifiedPath, {extensions});\n\n        if (resolution !== null) {\n          return resolution;\n        }\n      }\n    }\n\n    // Otherwise we check if we find a file that match one of the supported extensions\n\n    const qualifiedPath = extensions\n      .map(extension => {\n        return `${unqualifiedPath}${extension}`;\n      })\n      .find(candidateFile => {\n        return existsSync(candidateFile);\n      });\n\n    if (qualifiedPath) {\n      return qualifiedPath;\n    }\n\n    // Otherwise, we check if the path is a folder - in such a case, we try to use its index\n\n    if (stat && stat.isDirectory()) {\n      const indexPath = extensions\n        .map(extension => {\n          return `${unqualifiedPath}/index${extension}`;\n        })\n        .find(candidateFile => {\n          return existsSync(candidateFile);\n        });\n\n      if (indexPath) {\n        return indexPath;\n      }\n    }\n\n    // Otherwise there\'s nothing else we can do :(\n\n    return null;\n  }\n}\n\n/**\n * This function creates fake modules that can be used with the _resolveFilename function.\n * Ideally it would be nice to be able to avoid this, since it causes useless allocations\n * and cannot be cached efficiently (we recompute the nodeModulePaths every time).\n *\n * Fortunately, this should only affect the fallback, and there hopefully shouldn\'t be a\n * lot of them.\n */\n\nfunction makeFakeModule(path) {\n  const fakeModule = new Module(path, false);\n  fakeModule.filename = path;\n  fakeModule.paths = Module._nodeModulePaths(path);\n  return fakeModule;\n}\n\n/**\n * Normalize path to posix format.\n */\n\nfunction normalizePath(fsPath) {\n  fsPath = path.normalize(fsPath);\n\n  if (process.platform === \'win32\') {\n    fsPath = fsPath.replace(backwardSlashRegExp, \'/\');\n  }\n\n  return fsPath;\n}\n\n/**\n * Forward the resolution to the next resolver (usually the native one)\n */\n\nfunction callNativeResolution(request, issuer) {\n  if (issuer.endsWith(\'/\')) {\n    issuer += \'internal.js\';\n  }\n\n  try {\n    enableNativeHooks = false;\n\n    // Since we would need to create a fake module anyway (to call _resolveLookupPath that\n    // would give us the paths to give to _resolveFilename), we can as well not use\n    // the {paths} option at all, since it internally makes _resolveFilename create another\n    // fake module anyway.\n    return Module._resolveFilename(request, makeFakeModule(issuer), false);\n  } finally {\n    enableNativeHooks = true;\n  }\n}\n\n/**\n * This key indicates which version of the standard is implemented by this resolver. The `std` key is the\n * Plug\'n\'Play standard, and any other key are third-party extensions. Third-party extensions are not allowed\n * to override the standard, and can only offer new methods.\n *\n * If an new version of the Plug\'n\'Play standard is released and some extensions conflict with newly added\n * functions, they\'ll just have to fix the conflicts and bump their own version number.\n */\n\nexports.VERSIONS = {std: 1};\n\n/**\n * Useful when used together with getPackageInformation to fetch information about the top-level package.\n */\n\nexports.topLevel = {name: null, reference: null};\n\n/**\n * Gets the package information for a given locator. Returns null if they cannot be retrieved.\n */\n\nexports.getPackageInformation = function getPackageInformation({name, reference}) {\n  const packageInformationStore = packageInformationStores.get(name);\n\n  if (!packageInformationStore) {\n    return null;\n  }\n\n  const packageInformation = packageInformationStore.get(reference);\n\n  if (!packageInformation) {\n    return null;\n  }\n\n  return packageInformation;\n};\n\n/**\n * Transforms a request (what\'s typically passed as argument to the require function) into an unqualified path.\n * This path is called "unqualified" because it only changes the package name to the package location on the disk,\n * which means that the end result still cannot be directly accessed (for example, it doesn\'t try to resolve the\n * file extension, or to resolve directories to their "index.js" content). Use the "resolveUnqualified" function\n * to convert them to fully-qualified paths, or just use "resolveRequest" that do both operations in one go.\n *\n * Note that it is extremely important that the `issuer` path ends with a forward slash if the issuer is to be\n * treated as a folder (ie. "/tmp/foo/" rather than "/tmp/foo" if "foo" is a directory). Otherwise relative\n * imports won\'t be computed correctly (they\'ll get resolved relative to "/tmp/" instead of "/tmp/foo/").\n */\n\nexports.resolveToUnqualified = function resolveToUnqualified(request, issuer, {considerBuiltins = true} = {}) {\n  // The \'pnpapi\' request is reserved and will always return the path to the PnP file, from everywhere\n\n  if (request === `pnpapi`) {\n    return pnpFile;\n  }\n\n  // Bailout if the request is a native module\n\n  if (considerBuiltins && builtinModules.has(request)) {\n    return null;\n  }\n\n  // We allow disabling the pnp resolution for some subpaths. This is because some projects, often legacy,\n  // contain multiple levels of dependencies (ie. a yarn.lock inside a subfolder of a yarn.lock). This is\n  // typically solved using workspaces, but not all of them have been converted already.\n\n  if (ignorePattern && ignorePattern.test(normalizePath(issuer))) {\n    const result = callNativeResolution(request, issuer);\n\n    if (result === false) {\n      throw makeError(\n        `BUILTIN_NODE_RESOLUTION_FAIL`,\n        `The builtin node resolution algorithm was unable to resolve the module referenced by "${request}" and requested from "${issuer}" (it didn\'t go through the pnp resolver because the issuer was explicitely ignored by the regexp "$$BLACKLIST")`,\n        {\n          request,\n          issuer,\n        }\n      );\n    }\n\n    return result;\n  }\n\n  let unqualifiedPath;\n\n  // If the request is a relative or absolute path, we just return it normalized\n\n  const dependencyNameMatch = request.match(pathRegExp);\n\n  if (!dependencyNameMatch) {\n    if (path.isAbsolute(request)) {\n      unqualifiedPath = path.normalize(request);\n    } else if (issuer.match(isDirRegExp)) {\n      unqualifiedPath = path.normalize(path.resolve(issuer, request));\n    } else {\n      unqualifiedPath = path.normalize(path.resolve(path.dirname(issuer), request));\n    }\n  }\n\n  // Things are more hairy if it\'s a package require - we then need to figure out which package is needed, and in\n  // particular the exact version for the given location on the dependency tree\n\n  if (dependencyNameMatch) {\n    const [, dependencyName, subPath] = dependencyNameMatch;\n\n    const issuerLocator = exports.findPackageLocator(issuer);\n\n    // If the issuer file doesn\'t seem to be owned by a package managed through pnp, then we resort to using the next\n    // resolution algorithm in the chain, usually the native Node resolution one\n\n    if (!issuerLocator) {\n      const result = callNativeResolution(request, issuer);\n\n      if (result === false) {\n        throw makeError(\n          `BUILTIN_NODE_RESOLUTION_FAIL`,\n          `The builtin node resolution algorithm was unable to resolve the module referenced by "${request}" and requested from "${issuer}" (it didn\'t go through the pnp resolver because the issuer doesn\'t seem to be part of the Yarn-managed dependency tree)`,\n          {\n            request,\n            issuer,\n          }\n        );\n      }\n\n      return result;\n    }\n\n    const issuerInformation = getPackageInformationSafe(issuerLocator);\n\n    // We obtain the dependency reference in regard to the package that request it\n\n    let dependencyReference = issuerInformation.packageDependencies.get(dependencyName);\n\n    // If we can\'t find it, we check if we can potentially load it from the packages that have been defined as potential fallbacks.\n    // It\'s a bit of a hack, but it improves compatibility with the existing Node ecosystem. Hopefully we should eventually be able\n    // to kill this logic and become stricter once pnp gets enough traction and the affected packages fix themselves.\n\n    if (issuerLocator !== topLevelLocator) {\n      for (let t = 0, T = fallbackLocators.length; dependencyReference === undefined && t < T; ++t) {\n        const fallbackInformation = getPackageInformationSafe(fallbackLocators[t]);\n        dependencyReference = fallbackInformation.packageDependencies.get(dependencyName);\n      }\n    }\n\n    // If we can\'t find the path, and if the package making the request is the top-level, we can offer nicer error messages\n\n    if (!dependencyReference) {\n      if (dependencyReference === null) {\n        if (issuerLocator === topLevelLocator) {\n          throw makeError(\n            `MISSING_PEER_DEPENDENCY`,\n            `You seem to be requiring a peer dependency ("${dependencyName}"), but it is not installed (which might be because you\'re the top-level package)`,\n            {request, issuer, dependencyName}\n          );\n        } else {\n          throw makeError(\n            `MISSING_PEER_DEPENDENCY`,\n            `Package "${issuerLocator.name}@${issuerLocator.reference}" is trying to access a peer dependency ("${dependencyName}") that should be provided by its direct ancestor but isn\'t`,\n            {request, issuer, issuerLocator: Object.assign({}, issuerLocator), dependencyName}\n          );\n        }\n      } else {\n        if (issuerLocator === topLevelLocator) {\n          throw makeError(\n            `UNDECLARED_DEPENDENCY`,\n            `You cannot require a package ("${dependencyName}") that is not declared in your dependencies (via "${issuer}")`,\n            {request, issuer, dependencyName}\n          );\n        } else {\n          const candidates = Array.from(issuerInformation.packageDependencies.keys());\n          throw makeError(\n            `UNDECLARED_DEPENDENCY`,\n            `Package "${issuerLocator.name}@${issuerLocator.reference}" (via "${issuer}") is trying to require the package "${dependencyName}" (via "${request}") without it being listed in its dependencies (${candidates.join(\n              `, `\n            )})`,\n            {request, issuer, issuerLocator: Object.assign({}, issuerLocator), dependencyName, candidates}\n          );\n        }\n      }\n    }\n\n    // We need to check that the package exists on the filesystem, because it might not have been installed\n\n    const dependencyLocator = {name: dependencyName, reference: dependencyReference};\n    const dependencyInformation = exports.getPackageInformation(dependencyLocator);\n    const dependencyLocation = path.resolve(__dirname, dependencyInformation.packageLocation);\n\n    if (!dependencyLocation) {\n      throw makeError(\n        `MISSING_DEPENDENCY`,\n        `Package "${dependencyLocator.name}@${dependencyLocator.reference}" is a valid dependency, but hasn\'t been installed and thus cannot be required (it might be caused if you install a partial tree, such as on production environments)`,\n        {request, issuer, dependencyLocator: Object.assign({}, dependencyLocator)}\n      );\n    }\n\n    // Now that we know which package we should resolve to, we only have to find out the file location\n\n    if (subPath) {\n      unqualifiedPath = path.resolve(dependencyLocation, subPath);\n    } else {\n      unqualifiedPath = dependencyLocation;\n    }\n  }\n\n  return path.normalize(unqualifiedPath);\n};\n\n/**\n * Transforms an unqualified path into a qualified path by using the Node resolution algorithm (which automatically\n * appends ".js" / ".json", and transforms directory accesses into "index.js").\n */\n\nexports.resolveUnqualified = function resolveUnqualified(\n  unqualifiedPath,\n  {extensions = Object.keys(Module._extensions)} = {}\n) {\n  const qualifiedPath = applyNodeExtensionResolution(unqualifiedPath, {extensions});\n\n  if (qualifiedPath) {\n    return path.normalize(qualifiedPath);\n  } else {\n    throw makeError(\n      `QUALIFIED_PATH_RESOLUTION_FAILED`,\n      `Couldn\'t find a suitable Node resolution for unqualified path "${unqualifiedPath}"`,\n      {unqualifiedPath}\n    );\n  }\n};\n\n/**\n * Transforms a request into a fully qualified path.\n *\n * Note that it is extremely important that the `issuer` path ends with a forward slash if the issuer is to be\n * treated as a folder (ie. "/tmp/foo/" rather than "/tmp/foo" if "foo" is a directory). Otherwise relative\n * imports won\'t be computed correctly (they\'ll get resolved relative to "/tmp/" instead of "/tmp/foo/").\n */\n\nexports.resolveRequest = function resolveRequest(request, issuer, {considerBuiltins, extensions} = {}) {\n  let unqualifiedPath;\n\n  try {\n    unqualifiedPath = exports.resolveToUnqualified(request, issuer, {considerBuiltins});\n  } catch (originalError) {\n    // If we get a BUILTIN_NODE_RESOLUTION_FAIL error there, it means that we\'ve had to use the builtin node\n    // resolution, which usually shouldn\'t happen. It might be because the user is trying to require something\n    // from a path loaded through a symlink (which is not possible, because we need something normalized to\n    // figure out which package is making the require call), so we try to make the same request using a fully\n    // resolved issuer and throws a better and more actionable error if it works.\n    if (originalError.code === `BUILTIN_NODE_RESOLUTION_FAIL`) {\n      let realIssuer;\n\n      try {\n        realIssuer = realpathSync(issuer);\n      } catch (error) {}\n\n      if (realIssuer) {\n        if (issuer.endsWith(`/`)) {\n          realIssuer = realIssuer.replace(/\\/?$/, `/`);\n        }\n\n        try {\n          exports.resolveToUnqualified(request, realIssuer, {considerBuiltins});\n        } catch (error) {\n          // If an error was thrown, the problem doesn\'t seem to come from a path not being normalized, so we\n          // can just throw the original error which was legit.\n          throw originalError;\n        }\n\n        // If we reach this stage, it means that resolveToUnqualified didn\'t fail when using the fully resolved\n        // file path, which is very likely caused by a module being invoked through Node with a path not being\n        // correctly normalized (ie you should use "node $(realpath script.js)" instead of "node script.js").\n        throw makeError(\n          `SYMLINKED_PATH_DETECTED`,\n          `A pnp module ("${request}") has been required from what seems to be a symlinked path ("${issuer}"). This is not possible, you must ensure that your modules are invoked through their fully resolved path on the filesystem (in this case "${realIssuer}").`,\n          {\n            request,\n            issuer,\n            realIssuer,\n          }\n        );\n      }\n    }\n    throw originalError;\n  }\n\n  if (unqualifiedPath === null) {\n    return null;\n  }\n\n  try {\n    return exports.resolveUnqualified(unqualifiedPath, {extensions});\n  } catch (resolutionError) {\n    if (resolutionError.code === \'QUALIFIED_PATH_RESOLUTION_FAILED\') {\n      Object.assign(resolutionError.data, {request, issuer});\n    }\n    throw resolutionError;\n  }\n};\n\n/**\n * Setups the hook into the Node environment.\n *\n * From this point on, any call to `require()` will go through the "resolveRequest" function, and the result will\n * be used as path of the file to load.\n */\n\nexports.setup = function setup() {\n  // A small note: we don\'t replace the cache here (and instead use the native one). This is an effort to not\n  // break code similar to "delete require.cache[require.resolve(FOO)]", where FOO is a package located outside\n  // of the Yarn dependency tree. In this case, we defer the load to the native loader. If we were to replace the\n  // cache by our own, the native loader would populate its own cache, which wouldn\'t be exposed anymore, so the\n  // delete call would be broken.\n\n  const originalModuleLoad = Module._load;\n\n  Module._load = function(request, parent, isMain) {\n    if (!enableNativeHooks) {\n      return originalModuleLoad.call(Module, request, parent, isMain);\n    }\n\n    // Builtins are managed by the regular Node loader\n\n    if (builtinModules.has(request)) {\n      try {\n        enableNativeHooks = false;\n        return originalModuleLoad.call(Module, request, parent, isMain);\n      } finally {\n        enableNativeHooks = true;\n      }\n    }\n\n    // The \'pnpapi\' name is reserved to return the PnP api currently in use by the program\n\n    if (request === `pnpapi`) {\n      return pnpModule.exports;\n    }\n\n    // Request `Module._resolveFilename` (ie. `resolveRequest`) to tell us which file we should load\n\n    const modulePath = Module._resolveFilename(request, parent, isMain);\n\n    // Check if the module has already been created for the given file\n\n    const cacheEntry = Module._cache[modulePath];\n\n    if (cacheEntry) {\n      return cacheEntry.exports;\n    }\n\n    // Create a new module and store it into the cache\n\n    const module = new Module(modulePath, parent);\n    Module._cache[modulePath] = module;\n\n    // The main module is exposed as global variable\n\n    if (isMain) {\n      process.mainModule = module;\n      module.id = \'.\';\n    }\n\n    // Try to load the module, and remove it from the cache if it fails\n\n    let hasThrown = true;\n\n    try {\n      module.load(modulePath);\n      hasThrown = false;\n    } finally {\n      if (hasThrown) {\n        delete Module._cache[modulePath];\n      }\n    }\n\n    // Some modules might have to be patched for compatibility purposes\n\n    for (const [filter, patchFn] of patchedModules) {\n      if (filter.test(request)) {\n        module.exports = patchFn(exports.findPackageLocator(parent.filename), module.exports);\n      }\n    }\n\n    return module.exports;\n  };\n\n  const originalModuleResolveFilename = Module._resolveFilename;\n\n  Module._resolveFilename = function(request, parent, isMain, options) {\n    if (!enableNativeHooks) {\n      return originalModuleResolveFilename.call(Module, request, parent, isMain, options);\n    }\n\n    let issuers;\n\n    if (options) {\n      const optionNames = new Set(Object.keys(options));\n      optionNames.delete(\'paths\');\n\n      if (optionNames.size > 0) {\n        throw makeError(\n          `UNSUPPORTED`,\n          `Some options passed to require() aren\'t supported by PnP yet (${Array.from(optionNames).join(\', \')})`\n        );\n      }\n\n      if (options.paths) {\n        issuers = options.paths.map(entry => `${path.normalize(entry)}/`);\n      }\n    }\n\n    if (!issuers) {\n      const issuerModule = getIssuerModule(parent);\n      const issuer = issuerModule ? issuerModule.filename : `${process.cwd()}/`;\n\n      issuers = [issuer];\n    }\n\n    let firstError;\n\n    for (const issuer of issuers) {\n      let resolution;\n\n      try {\n        resolution = exports.resolveRequest(request, issuer);\n      } catch (error) {\n        firstError = firstError || error;\n        continue;\n      }\n\n      return resolution !== null ? resolution : request;\n    }\n\n    throw firstError;\n  };\n\n  const originalFindPath = Module._findPath;\n\n  Module._findPath = function(request, paths, isMain) {\n    if (!enableNativeHooks) {\n      return originalFindPath.call(Module, request, paths, isMain);\n    }\n\n    for (const path of paths || []) {\n      let resolution;\n\n      try {\n        resolution = exports.resolveRequest(request, path);\n      } catch (error) {\n        continue;\n      }\n\n      if (resolution) {\n        return resolution;\n      }\n    }\n\n    return false;\n  };\n\n  process.versions.pnp = String(exports.VERSIONS.std);\n};\n\nexports.setupCompatibilityLayer = () => {\n  // ESLint currently doesn\'t have any portable way for shared configs to specify their own\n  // plugins that should be used (https://github.com/eslint/eslint/issues/10125). This will\n  // likely get fixed at some point, but it\'ll take time and in the meantime we\'ll just add\n  // additional fallback entries for common shared configs.\n\n  for (const name of [`react-scripts`]) {\n    const packageInformationStore = packageInformationStores.get(name);\n    if (packageInformationStore) {\n      for (const reference of packageInformationStore.keys()) {\n        fallbackLocators.push({name, reference});\n      }\n    }\n  }\n\n  // Modern versions of `resolve` support a specific entry point that custom resolvers can use\n  // to inject a specific resolution logic without having to patch the whole package.\n  //\n  // Cf: https://github.com/browserify/resolve/pull/174\n\n  patchedModules.push([\n    /^\\.\\/normalize-options\\.js$/,\n    (issuer, normalizeOptions) => {\n      if (!issuer || issuer.name !== \'resolve\') {\n        return normalizeOptions;\n      }\n\n      return (request, opts) => {\n        opts = opts || {};\n\n        if (opts.forceNodeResolution) {\n          return opts;\n        }\n\n        opts.preserveSymlinks = true;\n        opts.paths = function(request, basedir, getNodeModulesDir, opts) {\n          // Extract the name of the package being requested (1=full name, 2=scope name, 3=local name)\n          const parts = request.match(/^((?:(@[^\\/]+)\\/)?([^\\/]+))/);\n\n          // make sure that basedir ends with a slash\n          if (basedir.charAt(basedir.length - 1) !== \'/\') {\n            basedir = path.join(basedir, \'/\');\n          }\n          // This is guaranteed to return the path to the "package.json" file from the given package\n          const manifestPath = exports.resolveToUnqualified(`${parts[1]}/package.json`, basedir);\n\n          // The first dirname strips the package.json, the second strips the local named folder\n          let nodeModules = path.dirname(path.dirname(manifestPath));\n\n          // Strips the scope named folder if needed\n          if (parts[2]) {\n            nodeModules = path.dirname(nodeModules);\n          }\n\n          return [nodeModules];\n        };\n\n        return opts;\n      };\n    },\n  ]);\n};\n\nif (module.parent && module.parent.id === \'internal/preload\') {\n  exports.setupCompatibilityLayer();\n\n  exports.setup();\n}\n\nif (process.mainModule === module) {\n  exports.setupCompatibilityLayer();\n\n  const reportError = (code, message, data) => {\n    process.stdout.write(`${JSON.stringify([{code, message, data}, null])}\\n`);\n  };\n\n  const reportSuccess = resolution => {\n    process.stdout.write(`${JSON.stringify([null, resolution])}\\n`);\n  };\n\n  const processResolution = (request, issuer) => {\n    try {\n      reportSuccess(exports.resolveRequest(request, issuer));\n    } catch (error) {\n      reportError(error.code, error.message, error.data);\n    }\n  };\n\n  const processRequest = data => {\n    try {\n      const [request, issuer] = JSON.parse(data);\n      processResolution(request, issuer);\n    } catch (error) {\n      reportError(`INVALID_JSON`, error.message, error.data);\n    }\n  };\n\n  if (process.argv.length > 2) {\n    if (process.argv.length !== 4) {\n      process.stderr.write(`Usage: ${process.argv[0]} ${process.argv[1]} <request> <issuer>\\n`);\n      process.exitCode = 64; /* EX_USAGE */\n    } else {\n      processResolution(process.argv[2], process.argv[3]);\n    }\n  } else {\n    let buffer = \'\';\n    const decoder = new StringDecoder.StringDecoder();\n\n    process.stdin.on(\'data\', chunk => {\n      buffer += decoder.write(chunk);\n\n      do {\n        const index = buffer.indexOf(\'\\n\');\n        if (index === -1) {\n          break;\n        }\n\n        const line = buffer.slice(0, index);\n        buffer = buffer.slice(index + 1);\n\n        processRequest(line);\n      } while (true);\n    });\n  }\n}\n', generate_pnp_map_crypto = __webpack_require__(6113), generate_pnp_map_invariant = __webpack_require__(46128), generate_pnp_map_path = __webpack_require__(71017), backwardSlashRegExp = /\\/g;
      function generateMaps(packageInformationStores, blacklistedLocations) {
        var code = "";
        for (var _ref of (code += "let packageInformationStores = new Map([\n", packageInformationStores)) {
          var packageName = _ref[0], packageInformationStore = _ref[1];
          for (var _ref2 of (code += `  [${JSON.stringify(packageName)}, new Map([\n`, packageInformationStore)) {
            var packageReference = _ref2[0], _ref2$ = _ref2[1], packageLocation = _ref2$.packageLocation, packageDependencies = _ref2$.packageDependencies;
            for (var _ref3 of (code += `    [${JSON.stringify(packageReference)}, {\n`, code += `      packageLocation: path.resolve(__dirname, ${JSON.stringify(packageLocation)}),\n`, 
            code += "      packageDependencies: new Map([\n", packageDependencies.entries())) {
              var dependencyName = _ref3[0], dependencyReference = _ref3[1];
              code += `        [${JSON.stringify(dependencyName)}, ${JSON.stringify(dependencyReference)}],\n`;
            }
            code += "      ]),\n", code += "    }],\n";
          }
          code += "  ])],\n";
        }
        for (var blacklistedLocation of (code += "]);\n", code += "\n", code += "let locatorsByLocations = new Map([\n", 
        blacklistedLocations)) code += `  [${JSON.stringify(blacklistedLocation)}, blacklistedLocator],\n`;
        for (var _ref4 of packageInformationStores) {
          var _packageName = _ref4[0], _packageInformationStore = _ref4[1];
          for (var _ref5 of _packageInformationStore) {
            var _packageReference = _ref5[0], _packageLocation = _ref5[1].packageLocation;
            code += null !== _packageName ? `  [${JSON.stringify(_packageLocation)}, ${JSON.stringify({
              name: _packageName,
              reference: _packageReference
            })}],\n` : `  [${JSON.stringify(_packageLocation)}, topLevelLocator],\n`;
          }
        }
        return code += "]);\n";
      }
      function generateFindPackageLocator(packageInformationStores) {
        var code = "", lengths = new Map;
        for (var packageInformationStore of packageInformationStores.values()) for (var _ref6 of packageInformationStore.values()) {
          var packageLocation = _ref6.packageLocation;
          if (null !== packageLocation) {
            var length = packageLocation.length, count = (lengths.get(length) || 0) + 1;
            lengths.set(length, count);
          }
        }
        var sortedLengths = Array.from(lengths.entries()).sort(((a, b) => b[0] - a[0]));
        for (var _ref7 of (code += "exports.findPackageLocator = function findPackageLocator(location) {\n", 
        code += "  let relativeLocation = normalizePath(path.relative(__dirname, location));\n", 
        code += "\n", code += "  if (!relativeLocation.match(isStrictRegExp))\n", code += "    relativeLocation = `./${relativeLocation}`;\n", 
        code += "\n", code += "  if (location.match(isDirRegExp) && relativeLocation.charAt(relativeLocation.length - 1) !== '/')\n", 
        code += "    relativeLocation = `${relativeLocation}/`;\n", code += "\n", code += "  let match;\n", 
        sortedLengths)) {
          var _length = _ref7[0];
          code += "\n", code += `  if (relativeLocation.length >= ${_length} && relativeLocation[${_length - 1}] === '/')\n`, 
          code += `    if (match = locatorsByLocations.get(relativeLocation.substr(0, ${_length})))\n`, 
          code += "      return blacklistCheck(match);\n";
        }
        return code += "\n", code += "  return null;\n", code += "};\n";
      }
      function getPackageInformationStores() {
        return _getPackageInformationStores.apply(this, arguments);
      }
      function _getPackageInformationStores() {
        return _getPackageInformationStores = asyncToGenerator_asyncToGenerator((function*(config, seedPatterns, _ref8) {
          var resolver = _ref8.resolver, targetPath = (_ref8.reporter, _ref8.targetPath), workspaceLayout = _ref8.workspaceLayout, targetDirectory = generate_pnp_map_path.dirname(targetPath), offlineCacheFolder = config.offlineCacheFolder, packageInformationStores = new Map, blacklistedLocations = new Set, getCachePath = fsPath => {
            var cacheRelativePath = normalizePath(generate_pnp_map_path.relative(config.cacheFolder, fsPath));
            return cacheRelativePath.match(/^\.\.\//) ? null : cacheRelativePath;
          }, resolveOfflineCacheFolder = fsPath => {
            if (!offlineCacheFolder) return fsPath;
            var cacheRelativePath = getCachePath(fsPath);
            if (!cacheRelativePath) return fsPath;
            var components = cacheRelativePath.split(/\//g), cacheEntry = components[0], internalPath = components.slice(1);
            return generate_pnp_map_path.resolve(offlineCacheFolder, `${cacheEntry}.zip`, internalPath.join("/"));
          }, normalizePath = fsPath => "win32" === process.platform ? fsPath.replace(backwardSlashRegExp, "/") : fsPath, normalizeDirectoryPath = fsPath => {
            var relativePath = normalizePath(generate_pnp_map_path.relative(targetDirectory, resolveOfflineCacheFolder(fsPath)));
            return relativePath.match(/^\.{0,2}\//) || generate_pnp_map_path.isAbsolute(relativePath) || (relativePath = `./${relativePath}`), 
            relativePath.replace(/\/?$/, "/");
          }, getResolverEntry = pattern => {
            var pkg = resolver.getStrictResolvedPattern(pattern), ref = pkg._reference;
            if (!ref) return null;
            generate_pnp_map_invariant(ref.locations.length <= 1, "Must have at most one location (usually in the cache)");
            var loc = ref.locations[0];
            return loc ? {
              pkg: pkg,
              ref: ref,
              loc: loc
            } : null;
          }, visit = function() {
            var _ref10 = asyncToGenerator_asyncToGenerator((function*(precomputedResolutions, seedPatterns, parentData) {
              void 0 === parentData && (parentData = []);
              var resolutions = new Map(precomputedResolutions), locations = new Map, _loop = function*(pattern) {
                var entry = getResolverEntry(pattern);
                if (!entry) return "continue";
                var pkg = entry.pkg, ref = entry.ref, loc = entry.loc, packageName = pkg.name, packageReference = pkg.version;
                if (new Set(Array.from(Object.keys(pkg.peerDependencies || {}))).size > 0 && ref.requests.length > 1) {
                  var symlinkSource, symlinkFile, hash = (data => {
                    var hashGenerator = generate_pnp_map_crypto.createHash("sha1");
                    for (var datum of data) hashGenerator.update(datum);
                    return hashGenerator.digest("hex");
                  })([].concat(parentData, [ packageName, packageReference ]));
                  if ("workspace" === ref.remote.type) symlinkSource = loc, loc = symlinkFile = generate_pnp_map_path.resolve(config.lockfileFolder, ".pnp", "workspaces", `pnp-${hash}`, packageName); else {
                    var isFromCache = getCachePath(loc), hashName = isFromCache && offlineCacheFolder ? `pnp-${hash}.zip` : `pnp-${hash}`, newLoc = generate_pnp_map_path.resolve(config.lockfileFolder, ".pnp", "externals", hashName, "node_modules", packageName);
                    if (isFromCache) {
                      var getBase = source => generate_pnp_map_path.resolve(source, "../".repeat(1 + packageName.split("/").length));
                      symlinkSource = resolveOfflineCacheFolder(getBase(loc)), symlinkFile = getBase(newLoc);
                    } else symlinkSource = loc, symlinkFile = newLoc;
                    loc = newLoc;
                  }
                  yield mkdirp(generate_pnp_map_path.dirname(symlinkFile)), yield symlink(symlinkSource, symlinkFile), 
                  packageReference = `pnp:${hash}`, blacklistedLocations.add(normalizeDirectoryPath(loc));
                }
                resolutions.set(packageName, packageReference), locations.set(packageName, loc);
              };
              for (var pattern of seedPatterns) yield* _loop(pattern);
              var _loop2 = function*(_pattern) {
                var entry = getResolverEntry(_pattern);
                if (!entry) return "continue";
                var pkg = entry.pkg, ref = entry.ref, packageName = pkg.name, packageReference = resolutions.get(packageName);
                generate_pnp_map_invariant(packageReference, "Package reference should have been computed during the pre-pass");
                var loc = locations.get(packageName);
                generate_pnp_map_invariant(loc, "Package location should have been computed during the pre-pass");
                var packageInformationStore = packageInformationStores.get(packageName);
                packageInformationStore || (packageInformationStore = new Map, packageInformationStores.set(packageName, packageInformationStore));
                var packageInformation = packageInformationStore.get(packageReference);
                if (packageInformation) return "continue";
                packageInformation = {
                  packageLocation: normalizeDirectoryPath(loc),
                  packageDependencies: new Map
                };
                var peerDependencies = new Set(Array.from(Object.keys(pkg.peerDependencies || {}))), directDependencies = ref.dependencies.filter((pattern => {
                  var pkg = resolver.getStrictResolvedPattern(pattern);
                  return !pkg || !peerDependencies.has(pkg.name);
                }));
                for (var dependencyName of (packageInformationStore.set(packageReference, packageInformation), 
                peerDependencies)) {
                  var dependencyReference = resolutions.get(dependencyName);
                  dependencyReference && packageInformation.packageDependencies.set(dependencyName, dependencyReference);
                }
                var childResolutions = yield visit(packageInformation.packageDependencies, directDependencies, [ packageName, packageReference ]);
                for (var _ref11 of childResolutions.entries()) {
                  var name = _ref11[0], reference = _ref11[1];
                  packageInformation.packageDependencies.set(name, reference);
                }
                packageInformation.packageDependencies.has(packageName) || packageInformation.packageDependencies.set(packageName, packageReference);
              };
              for (var _pattern of seedPatterns) yield* _loop2(_pattern);
              return resolutions;
            }));
            return function() {
              return _ref10.apply(this, arguments);
            };
          }();
          if (workspaceLayout) for (var name of Object.keys(workspaceLayout.workspaces)) {
            var pkg = workspaceLayout.workspaces[name].manifest;
            if (!pkg.workspaces) {
              var ref = pkg._reference;
              generate_pnp_map_invariant(ref, "Workspaces should have a reference"), generate_pnp_map_invariant(1 === ref.locations.length, "Workspaces should have exactly one location");
              var loc = ref.locations[0];
              generate_pnp_map_invariant(loc, "Workspaces should have a location");
              var packageInformationStore = packageInformationStores.get(name);
              packageInformationStore || (packageInformationStore = new Map, packageInformationStores.set(name, packageInformationStore)), 
              packageInformationStore.set(pkg.version, {
                packageLocation: normalizeDirectoryPath(loc),
                packageDependencies: yield visit(new Map, ref.dependencies, [ name, pkg.version ])
              });
            }
          }
          return packageInformationStores.set(null, new Map([ [ null, {
            packageLocation: normalizeDirectoryPath(config.lockfileFolder),
            packageDependencies: yield visit(new Map, seedPatterns)
          } ] ])), [ packageInformationStores, blacklistedLocations ];
        })), _getPackageInformationStores.apply(this, arguments);
      }
      function _generatePnpMap() {
        return (_generatePnpMap = asyncToGenerator_asyncToGenerator((function*(config, seedPatterns, _ref9) {
          var resolver = _ref9.resolver, reporter = _ref9.reporter, workspaceLayout = _ref9.workspaceLayout, targetPath = _ref9.targetPath, _yield$getPackageInfo = yield getPackageInformationStores(config, seedPatterns, {
            resolver: resolver,
            reporter: reporter,
            targetPath: targetPath,
            workspaceLayout: workspaceLayout
          }), packageInformationStores = _yield$getPackageInfo[0], setupStaticTables = [ generateMaps(packageInformationStores, _yield$getPackageInfo[1]), generateFindPackageLocator(packageInformationStores) ].join("");
          return pnpApi.replace(/\$\$SHEBANG/g, config.plugnplayShebang).replace(/\$\$BLACKLIST/g, JSON.stringify(config.plugnplayBlacklist)).replace(/\$\$SETUP_STATIC_TABLES\(\);/g, setupStaticTables);
        }))).apply(this, arguments);
      }
      var hoisted_tree_builder_invariant = __webpack_require__(46128);
      function getParent(key, treesByKey) {
        return treesByKey[key.slice(0, key.lastIndexOf("#"))];
      }
      function _buildTree() {
        return _buildTree = asyncToGenerator_asyncToGenerator((function*(resolver, linker, patterns, ignoreHoisted) {
          var treesByKey = {}, trees = [], flatTree = yield linker.getFlatHoistedTree(patterns), workspaceLayout = resolver.workspaceLayout, hoisted = workspaceLayout && workspaceLayout.virtualManifestName ? flatTree.filter((_ref => -1 === _ref[0].indexOf(workspaceLayout.virtualManifestName))) : flatTree, hoistedByKey = {};
          for (var _ref2 of hoisted) {
            var key = _ref2[0], info = _ref2[1];
            hoistedByKey[key] = info;
          }
          for (var _ref3 of hoisted) {
            var _info = _ref3[1], ref = _info.pkg._reference;
            hoisted_tree_builder_invariant(ref, "expected reference"), treesByKey[_info.key] = {
              name: _info.pkg.name,
              version: _info.pkg.version,
              children: [],
              manifest: _info
            };
          }
          for (var _ref4 of hoisted) {
            var _info2 = _ref4[1], tree = treesByKey[_info2.key], parent = getParent(_info2.key, treesByKey);
            tree && (1 !== _info2.key.split("#").length ? parent && parent.children.push(tree) : trees.push(tree));
          }
          return trees;
        })), _buildTree.apply(this, arguments);
      }
      function dependenciesObjectToPatterns(dependencies) {
        return dependencies ? Object.keys(dependencies).map((name => `${name}@${(dependencies || {})[name]}`)) : [];
      }
      function getTransitiveDependencies(lockfile, roots) {
        var queue = [], patterns = new Set, enqueue = pattern => {
          patterns.has(pattern) || (patterns.add(pattern), queue.push(pattern));
        };
        roots.forEach(enqueue);
        for (var transitiveDependencies = new Set; queue.length > 0; ) {
          var pattern = queue.shift(), lockManifest = lockfile.getLocked(pattern);
          if (lockManifest) transitiveDependencies.add(`${lockManifest.name}@${lockManifest.version}`), 
          dependenciesObjectToPatterns(lockManifest.dependencies).forEach(enqueue), dependenciesObjectToPatterns(lockManifest.optionalDependencies).forEach(enqueue);
        }
        return transitiveDependencies;
      }
      function getTransitiveDevDependencies(packageManifest, workspaceLayout, lockfile) {
        var manifests = [ packageManifest ];
        if (workspaceLayout) for (var name of Object.keys(workspaceLayout.workspaces)) manifests.push(workspaceLayout.workspaces[name].manifest);
        var productionRoots = [], developmentRoots = [];
        for (var manifest of manifests) productionRoots = (productionRoots = productionRoots.concat(dependenciesObjectToPatterns(manifest.dependencies))).concat(dependenciesObjectToPatterns(manifest.optionalDependencies)), 
        developmentRoots = developmentRoots.concat(dependenciesObjectToPatterns(manifest.devDependencies));
        var y, productionDependencies = getTransitiveDependencies(lockfile, productionRoots), developmentDependencies = getTransitiveDependencies(lockfile, developmentRoots);
        return y = productionDependencies, new Set([].concat(developmentDependencies).filter((value => !y.has(value))));
      }
      var gzip = promisify(__webpack_require__(59796).gzip);
      function audit_setFlags(commander) {
        commander.description("Checks for known security issues with the installed packages."), 
        commander.option("--summary", "Only print the summary."), commander.option("--groups <group_name> [<group_name> ...]", `Only audit dependencies from listed groups. Default: ${OWNED_DEPENDENCY_TYPES.join(", ")}`, (groups => groups.split(" ")), OWNED_DEPENDENCY_TYPES), 
        commander.option("--level <severity>", "Only print advisories with severity greater than or equal to one of the following:     info|low|moderate|high|critical. Default: info", "info");
      }
      function audit_hasWrapper(commander, args) {
        return !0;
      }
      function audit_run() {
        return commands_audit_run.apply(this, arguments);
      }
      function commands_audit_run() {
        return commands_audit_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var audit = new Audit(config, reporter, {
            groups: flags.groups || OWNED_DEPENDENCY_TYPES,
            level: flags.level || "info"
          }), lockfile = yield Lockfile.fromDirectory(config.lockfileFolder, reporter), install = new Install({}, config, reporter, lockfile), _yield$install$fetchR = yield install.fetchRequestFromCwd(), manifest = _yield$install$fetchR.manifest, requests = _yield$install$fetchR.requests, patterns = _yield$install$fetchR.patterns, workspaceLayout = _yield$install$fetchR.workspaceLayout;
          yield install.resolver.init(requests, {
            workspaceLayout: workspaceLayout
          });
          var vulnerabilities = yield audit.performAudit(manifest, lockfile, install.resolver, install.linker, patterns), exitCode = (vulnerabilities.info ? 1 : 0) + (vulnerabilities.low ? 2 : 0) + (vulnerabilities.moderate ? 4 : 0) + (vulnerabilities.high ? 8 : 0) + (vulnerabilities.critical ? 16 : 0);
          return flags.summary ? audit.summary() : audit.report(), exitCode;
        })), commands_audit_run.apply(this, arguments);
      }
      class Audit {
        constructor(config, reporter, options) {
          this.severityLevels = [ "info", "low", "moderate", "high", "critical" ], this.config = config, 
          this.reporter = reporter, this.options = options;
        }
        _mapHoistedNodes(auditNode, hoistedNodes, transitiveDevDeps) {
          for (var node of hoistedNodes) {
            var pkg = node.manifest.pkg, requires = Object.assign({}, pkg.dependencies || {}, pkg.optionalDependencies || {});
            for (var name of Object.keys(requires)) requires[name] || (requires[name] = "*");
            auditNode.dependencies[node.name] = {
              version: node.version,
              integrity: pkg._remote && pkg._remote.integrity || "",
              requires: requires,
              dependencies: {},
              dev: transitiveDevDeps.has(`${node.name}@${node.version}`)
            }, node.children && this._mapHoistedNodes(auditNode.dependencies[node.name], node.children, transitiveDevDeps);
          }
        }
        _mapHoistedTreesToAuditTree(manifest, hoistedTrees, transitiveDevDeps) {
          var requiresGroups = this.options.groups.map((function(group) {
            return manifest[group] || {};
          })), auditTree = {
            name: manifest.name || void 0,
            version: manifest.version || void 0,
            install: [],
            remove: [],
            metadata: {},
            requires: Object.assign.apply(Object, [ {} ].concat(requiresGroups)),
            integrity: void 0,
            dependencies: {},
            dev: !1
          };
          return this._mapHoistedNodes(auditTree, hoistedTrees, transitiveDevDeps), auditTree;
        }
        _fetchAudit(auditTree) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var responseJson;
            _this.reporter.verbose(`Audit Request: ${JSON.stringify(auditTree, null, 2)}`);
            var requestBody = yield gzip(JSON.stringify(auditTree)), response = yield _this.config.requestManager.request({
              url: "https://registry.yarnpkg.com/-/npm/v1/security/audits",
              method: "POST",
              body: requestBody,
              headers: {
                "Content-Encoding": "gzip",
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            });
            try {
              responseJson = JSON.parse(response);
            } catch (ex) {
              throw new Error(`Unexpected audit response (Invalid JSON): ${response}`);
            }
            if (!responseJson.metadata) throw new Error(`Unexpected audit response (Missing Metadata): ${JSON.stringify(responseJson, null, 2)}`);
            return _this.reporter.verbose(`Audit Response: ${JSON.stringify(responseJson, null, 2)}`), 
            responseJson;
          }))();
        }
        _insertWorkspacePackagesIntoManifest(manifest, resolver) {
          if (resolver.workspaceLayout) {
            var workspaceAggregatorName = resolver.workspaceLayout.virtualManifestName, workspaceManifest = resolver.workspaceLayout.workspaces[workspaceAggregatorName].manifest;
            manifest.dependencies = Object.assign(manifest.dependencies || {}, workspaceManifest.dependencies), 
            manifest.devDependencies = Object.assign(manifest.devDependencies || {}, workspaceManifest.devDependencies), 
            manifest.optionalDependencies = Object.assign(manifest.optionalDependencies || {}, workspaceManifest.optionalDependencies);
          }
        }
        performAudit(manifest, lockfile, resolver, linker, patterns) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            _this2._insertWorkspacePackagesIntoManifest(manifest, resolver);
            var transitiveDevDeps = getTransitiveDevDependencies(manifest, resolver.workspaceLayout, lockfile), hoistedTrees = yield function() {
              return _buildTree.apply(this, arguments);
            }(resolver, linker, patterns), auditTree = _this2._mapHoistedTreesToAuditTree(manifest, hoistedTrees, transitiveDevDeps);
            return _this2.auditData = yield _this2._fetchAudit(auditTree), _this2.auditData.metadata.vulnerabilities;
          }))();
        }
        summary() {
          this.auditData && this.reporter.auditSummary(this.auditData.metadata);
        }
        report() {
          if (this.auditData) {
            var startLoggingAt = Math.max(0, this.severityLevels.indexOf(this.options.level)), reportAdvisory = resolution => {
              var advisory = this.auditData.advisories[resolution.id.toString()];
              this.severityLevels.indexOf(advisory.severity) >= startLoggingAt && this.reporter.auditAdvisory(resolution, advisory);
            };
            0 !== Object.keys(this.auditData.advisories).length && this.auditData.actions.forEach((action => {
              action.resolves.forEach(reportAdvisory);
            })), this.summary();
          }
        }
      }
      var install_objectPath = __webpack_require__(31528), deepEqual = __webpack_require__(27965), emoji = __webpack_require__(30736), install_invariant = __webpack_require__(46128), install_path = __webpack_require__(71017), install_semver = __webpack_require__(92878), install_uuid = __webpack_require__(67730), install_ssri = __webpack_require__(44240);
      class Install {
        constructor(flags, config, reporter, lockfile) {
          this.rootManifestRegistries = [], this.rootPatternsToOrigin = nullify(), this.lockfile = lockfile, 
          this.reporter = reporter, this.config = config, this.flags = function(config, rawFlags) {
            var flags = {
              har: !!rawFlags.har,
              ignorePlatform: !!rawFlags.ignorePlatform,
              ignoreEngines: !!rawFlags.ignoreEngines,
              ignoreScripts: !!rawFlags.ignoreScripts,
              ignoreOptional: !!rawFlags.ignoreOptional,
              force: !!rawFlags.force,
              flat: !!rawFlags.flat,
              lockfile: !1 !== rawFlags.lockfile,
              pureLockfile: !!rawFlags.pureLockfile,
              updateChecksums: !!rawFlags.updateChecksums,
              skipIntegrityCheck: !!rawFlags.skipIntegrityCheck,
              frozenLockfile: !!rawFlags.frozenLockfile,
              linkDuplicates: !!rawFlags.linkDuplicates,
              checkFiles: !!rawFlags.checkFiles,
              audit: !!rawFlags.audit,
              peer: !!rawFlags.peer,
              dev: !!rawFlags.dev,
              optional: !!rawFlags.optional,
              exact: !!rawFlags.exact,
              tilde: !!rawFlags.tilde,
              ignoreWorkspaceRootCheck: !!rawFlags.ignoreWorkspaceRootCheck,
              includeWorkspaceDeps: !!rawFlags.includeWorkspaceDeps,
              workspaceRootIsCwd: !1 !== rawFlags.workspaceRootIsCwd
            };
            return config.getOption("ignore-scripts") && (flags.ignoreScripts = !0), config.getOption("ignore-platform") && (flags.ignorePlatform = !0), 
            config.getOption("ignore-engines") && (flags.ignoreEngines = !0), config.getOption("ignore-optional") && (flags.ignoreOptional = !0), 
            config.getOption("force") && (flags.force = !0), flags;
          }(config, flags), this.resolutions = nullify(), this.resolutionMap = new ResolutionMap(config), 
          this.resolver = new PackageResolver(config, lockfile, this.resolutionMap), this.integrityChecker = new InstallationIntegrityChecker(config), 
          this.linker = new PackageLinker(config, this.resolver), this.scripts = new PackageInstallScripts(config, this.resolver, this.flags.force);
        }
        fetchRequestFromCwd(excludePatterns, ignoreUnusedPatterns) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            void 0 === excludePatterns && (excludePatterns = []), void 0 === ignoreUnusedPatterns && (ignoreUnusedPatterns = !1);
            var workspaceLayout, patterns = [], deps = [], resolutionDeps = [], manifest = {}, ignorePatterns = [], usedPatterns = [], cwd = _this.flags.includeWorkspaceDeps || _this.flags.workspaceRootIsCwd ? _this.config.lockfileFolder : _this.config.cwd, cwdIsRoot = !_this.config.workspaceRootFolder || _this.config.lockfileFolder === cwd, excludeNames = [];
            for (var _pattern of excludePatterns) if (getExoticResolver(_pattern)) excludeNames.push(guessName(_pattern)); else {
              var parts = normalizePattern(_pattern);
              excludeNames.push(parts.name);
            }
            var _loop = function*(registry) {
              var filename = registries[registry].filename, loc = install_path.join(cwd, filename);
              if (!(yield fs_exists(loc))) return "continue";
              _this.rootManifestRegistries.push(registry);
              var projectManifestJson = yield _this.config.readJson(loc);
              for (var _packageName of (yield normalize_manifest(projectManifestJson, cwd, _this.config, cwdIsRoot), 
              Object.assign(_this.resolutions, projectManifestJson.resolutions), Object.assign(manifest, projectManifestJson), 
              _this.resolutionMap.init(_this.resolutions), Object.keys(_this.resolutionMap.resolutionsByPackage))) {
                var optional = install_objectPath.has(manifest.optionalDependencies, _packageName) && _this.flags.ignoreOptional;
                for (var _ref of _this.resolutionMap.resolutionsByPackage[_packageName]) {
                  var _pattern2 = _ref.pattern;
                  resolutionDeps = [].concat(resolutionDeps, [ {
                    registry: registry,
                    pattern: _pattern2,
                    optional: optional,
                    hint: "resolution"
                  } ]);
                }
              }
              var pushDeps = (depType, manifest, _ref2, isUsed) => {
                var hint = _ref2.hint, optional = _ref2.optional;
                if ((!ignoreUnusedPatterns || isUsed) && (!_this.flags.flat || isUsed)) {
                  var depMap = manifest[depType];
                  for (var name in depMap) if (!(excludeNames.indexOf(name) >= 0)) {
                    var _pattern3 = name;
                    _this.lockfile.getLocked(_pattern3) || (_pattern3 += "@" + depMap[name]), isUsed ? usedPatterns.push(_pattern3) : ignorePatterns.push(_pattern3), 
                    _this.rootPatternsToOrigin[_pattern3] = depType, patterns.push(_pattern3), deps.push({
                      pattern: _pattern3,
                      registry: registry,
                      hint: hint,
                      optional: optional,
                      workspaceName: manifest.name,
                      workspaceLoc: manifest._loc
                    });
                  }
                }
              };
              if (cwdIsRoot && (pushDeps("dependencies", projectManifestJson, {
                hint: null,
                optional: !1
              }, !0), pushDeps("devDependencies", projectManifestJson, {
                hint: "dev",
                optional: !1
              }, !_this.config.production), pushDeps("optionalDependencies", projectManifestJson, {
                hint: "optional",
                optional: !0
              }, !0)), _this.config.workspaceRootFolder) {
                var workspaceLoc = cwdIsRoot ? loc : install_path.join(_this.config.lockfileFolder, filename), workspacesRoot = install_path.dirname(workspaceLoc), workspaceManifestJson = projectManifestJson;
                cwdIsRoot || (workspaceManifestJson = yield _this.config.readJson(workspaceLoc), 
                yield normalize_manifest(workspaceManifestJson, workspacesRoot, _this.config, !0));
                var workspaces = yield _this.config.resolveWorkspaces(workspacesRoot, workspaceManifestJson);
                workspaceLayout = new WorkspaceLayout(workspaces, _this.config);
                var workspaceDependencies = _extends({}, workspaceManifestJson.dependencies);
                for (var workspaceName of Object.keys(workspaces)) {
                  var workspaceManifest = workspaces[workspaceName].manifest;
                  workspaceDependencies[workspaceName] = workspaceManifest.version, _this.flags.includeWorkspaceDeps && (pushDeps("dependencies", workspaceManifest, {
                    hint: null,
                    optional: !1
                  }, !0), pushDeps("devDependencies", workspaceManifest, {
                    hint: "dev",
                    optional: !1
                  }, !_this.config.production), pushDeps("optionalDependencies", workspaceManifest, {
                    hint: "optional",
                    optional: !0
                  }, !0));
                }
                var virtualDependencyManifest = {
                  _uid: "",
                  name: `workspace-aggregator-${install_uuid.v4()}`,
                  version: "1.0.0",
                  _registry: "npm",
                  _loc: workspacesRoot,
                  dependencies: workspaceDependencies,
                  devDependencies: _extends({}, workspaceManifestJson.devDependencies),
                  optionalDependencies: _extends({}, workspaceManifestJson.optionalDependencies),
                  private: workspaceManifestJson.private,
                  workspaces: workspaceManifestJson.workspaces
                };
                workspaceLayout.virtualManifestName = virtualDependencyManifest.name;
                var virtualDep = {};
                virtualDep[virtualDependencyManifest.name] = virtualDependencyManifest.version, 
                workspaces[virtualDependencyManifest.name] = {
                  loc: workspacesRoot,
                  manifest: virtualDependencyManifest
                }, (manifest => {
                  for (var exclude of excludeNames) manifest.dependencies && manifest.dependencies[exclude] && delete manifest.dependencies[exclude], 
                  manifest.devDependencies && manifest.devDependencies[exclude] && delete manifest.devDependencies[exclude], 
                  manifest.optionalDependencies && manifest.optionalDependencies[exclude] && delete manifest.optionalDependencies[exclude];
                })(cwdIsRoot ? virtualDependencyManifest : workspaces[projectManifestJson.name].manifest), 
                pushDeps("workspaces", {
                  workspaces: virtualDep
                }, {
                  hint: "workspaces",
                  optional: !1
                }, !0);
                var implicitWorkspaceDependencies = _extends({}, workspaceDependencies);
                for (var type of OWNED_DEPENDENCY_TYPES) for (var dependencyName of Object.keys(projectManifestJson[type] || {})) delete implicitWorkspaceDependencies[dependencyName];
                pushDeps("dependencies", {
                  dependencies: implicitWorkspaceDependencies
                }, {
                  hint: "workspaces",
                  optional: !1
                }, !0);
              }
              return "break";
            };
            for (var registry of Object.keys(registries)) {
              var _ret = yield* _loop(registry);
              if ("continue" !== _ret && "break" === _ret) break;
            }
            return manifest.flat && (_this.flags.flat = !0), {
              requests: [].concat(resolutionDeps, deps),
              patterns: patterns,
              manifest: manifest,
              usedPatterns: usedPatterns,
              ignorePatterns: ignorePatterns,
              workspaceLayout: workspaceLayout
            };
          }))();
        }
        prepareRequests(requests) {
          return requests;
        }
        preparePatterns(patterns) {
          return patterns;
        }
        preparePatternsForLinking(patterns, cwdManifest, cwdIsRoot) {
          return patterns;
        }
        prepareManifests() {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return yield _this2.config.getRootManifests();
          }))();
        }
        bailout(patterns, workspaceLayout) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (_this3.flags.audit) return !1;
            if (_this3.config.plugnplayEnabled) return !1;
            if (_this3.flags.skipIntegrityCheck || _this3.flags.force) return !1;
            var lockfileCache = _this3.lockfile.cache;
            if (!lockfileCache) return !1;
            var lockfileClean = "success" === _this3.lockfile.parseResultType, match = yield _this3.integrityChecker.check(patterns, lockfileCache, _this3.flags, workspaceLayout);
            if (_this3.flags.frozenLockfile && (!lockfileClean || match.missingPatterns.length > 0)) throw new MessageError(_this3.reporter.lang("frozenLockfileError"));
            var haveLockfile = yield fs_exists(install_path.join(_this3.config.lockfileFolder, "yarn.lock")), integrityBailout = !_this3.lockfile.hasEntriesExistWithoutIntegrity() || !_this3.config.autoAddIntegrity;
            return match.integrityMatches && haveLockfile && lockfileClean && integrityBailout ? (_this3.reporter.success(_this3.reporter.lang("upToDate")), 
            !0) : match.integrityFileMissing && haveLockfile || match.hardRefreshRequired ? (_this3.scripts.setForce(!0), 
            !1) : !patterns.length && !match.integrityFileMissing && (_this3.reporter.success(_this3.reporter.lang("nothingToInstall")), 
            yield _this3.createEmptyManifestFolders(), yield _this3.saveLockfileAndIntegrity(patterns, workspaceLayout), 
            !0);
          }))();
        }
        createEmptyManifestFolders() {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (!_this4.config.modulesFolder) for (var registryName of _this4.rootManifestRegistries) {
              var folder = _this4.config.registries[registryName].folder;
              yield mkdirp(install_path.join(_this4.config.lockfileFolder, folder));
            }
          }))();
        }
        markIgnored(patterns) {
          for (var _pattern4 of patterns) {
            var ref = this.resolver.getStrictResolvedPattern(_pattern4)._reference;
            install_invariant(ref, "expected package reference"), ref.ignore = !0;
          }
        }
        getFlattenedDeps() {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _yield$_this5$fetchRe = yield _this5.fetchRequestFromCwd(), depRequests = _yield$_this5$fetchRe.requests, rawPatterns = _yield$_this5$fetchRe.patterns;
            yield _this5.resolver.init(depRequests, {});
            var manifests = yield fetch(_this5.resolver.getManifests(), _this5.config);
            return _this5.resolver.updateManifests(manifests), _this5.flatten(rawPatterns);
          }))();
        }
        init() {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            _this6.checkUpdate(), (yield fs_exists(install_path.join(_this6.config.lockfileFolder, "npm-shrinkwrap.json"))) && _this6.reporter.warn(_this6.reporter.lang("shrinkwrapWarning")), 
            (yield fs_exists(install_path.join(_this6.config.lockfileFolder, "package-lock.json"))) && _this6.reporter.warn(_this6.reporter.lang("npmLockfileWarning")), 
            _this6.config.plugnplayEnabled && (_this6.reporter.info(_this6.reporter.lang("plugnplaySuggestV2L1")), 
            _this6.reporter.info(_this6.reporter.lang("plugnplaySuggestV2L2")));
            var flattenedTopLevelPatterns = [], steps = [], _yield$_this6$fetchRe = yield _this6.fetchRequestFromCwd(), depRequests = _yield$_this6$fetchRe.requests, rawPatterns = _yield$_this6$fetchRe.patterns, ignorePatterns = _yield$_this6$fetchRe.ignorePatterns, workspaceLayout = _yield$_this6$fetchRe.workspaceLayout, manifest = _yield$_this6$fetchRe.manifest, topLevelPatterns = [], artifacts = yield _this6.integrityChecker.getArtifacts();
            artifacts && (_this6.linker.setArtifacts(artifacts), _this6.scripts.setArtifacts(artifacts)), 
            function(manifest, options) {
              return shouldCheckCpu(manifest.cpu, options.ignorePlatform) || shouldCheckPlatform(manifest.os, options.ignorePlatform) || shouldCheckEngines(manifest.engines, options.ignoreEngines);
            }(manifest, _this6.flags) && steps.push(function() {
              var _ref3 = asyncToGenerator_asyncToGenerator((function*(curr, total) {
                _this6.reporter.step(curr, total, _this6.reporter.lang("checkingManifest"), emoji.get("mag")), 
                yield _this6.checkCompatibility();
              }));
              return function() {
                return _ref3.apply(this, arguments);
              };
            }());
            var audit = new Audit(_this6.config, _this6.reporter, {
              groups: OWNED_DEPENDENCY_TYPES
            }), auditFoundProblems = !1;
            steps.push(((curr, total) => callThroughHook("resolveStep", asyncToGenerator_asyncToGenerator((function*() {
              return _this6.reporter.step(curr, total, _this6.reporter.lang("resolvingPackages"), emoji.get("mag")), 
              yield _this6.resolver.init(_this6.prepareRequests(depRequests), {
                isFlat: _this6.flags.flat,
                isFrozen: _this6.flags.frozenLockfile,
                workspaceLayout: workspaceLayout
              }), topLevelPatterns = _this6.preparePatterns(rawPatterns), flattenedTopLevelPatterns = yield _this6.flatten(topLevelPatterns), 
              {
                bailout: !_this6.flags.audit && (yield _this6.bailout(topLevelPatterns, workspaceLayout))
              };
            }))))), _this6.flags.audit && steps.push(((curr, total) => callThroughHook("auditStep", asyncToGenerator_asyncToGenerator((function*() {
              if (_this6.reporter.step(curr, total, _this6.reporter.lang("auditRunning"), emoji.get("mag")), 
              _this6.flags.offline) return _this6.reporter.warn(_this6.reporter.lang("auditOffline")), 
              {
                bailout: !1
              };
              var preparedManifests = yield _this6.prepareManifests(), mergedManifest = Object.assign.apply(Object, [ {} ].concat(Object.values(preparedManifests).map((m => m.object)))), auditVulnerabilityCounts = yield audit.performAudit(mergedManifest, _this6.lockfile, _this6.resolver, _this6.linker, topLevelPatterns);
              return auditFoundProblems = auditVulnerabilityCounts.info || auditVulnerabilityCounts.low || auditVulnerabilityCounts.moderate || auditVulnerabilityCounts.high || auditVulnerabilityCounts.critical, 
              {
                bailout: yield _this6.bailout(topLevelPatterns, workspaceLayout)
              };
            }))))), steps.push(((curr, total) => callThroughHook("fetchStep", asyncToGenerator_asyncToGenerator((function*() {
              _this6.markIgnored(ignorePatterns), _this6.reporter.step(curr, total, _this6.reporter.lang("fetchingPackages"), emoji.get("truck"));
              var manifests = yield fetch(_this6.resolver.getManifests(), _this6.config);
              _this6.resolver.updateManifests(manifests), yield check(_this6.resolver.getManifests(), _this6.config, _this6.flags.ignoreEngines);
            }))))), steps.push(((curr, total) => callThroughHook("linkStep", asyncToGenerator_asyncToGenerator((function*() {
              yield _this6.integrityChecker.removeIntegrityFile(), _this6.reporter.step(curr, total, _this6.reporter.lang("linkingDependencies"), emoji.get("link")), 
              flattenedTopLevelPatterns = _this6.preparePatternsForLinking(flattenedTopLevelPatterns, manifest, _this6.config.lockfileFolder === _this6.config.cwd), 
              yield _this6.linker.init(flattenedTopLevelPatterns, workspaceLayout, {
                linkDuplicates: _this6.flags.linkDuplicates,
                ignoreOptional: _this6.flags.ignoreOptional
              });
            }))))), _this6.config.plugnplayEnabled && steps.push(((curr, total) => callThroughHook("pnpStep", asyncToGenerator_asyncToGenerator((function*() {
              var pnpPath = `${_this6.config.lockfileFolder}/.pnp.js`, code = yield function() {
                return _generatePnpMap.apply(this, arguments);
              }(_this6.config, flattenedTopLevelPatterns, {
                resolver: _this6.resolver,
                reporter: _this6.reporter,
                targetPath: pnpPath,
                workspaceLayout: workspaceLayout
              });
              try {
                if ((yield readFile(pnpPath)) === code) return;
              } catch (error) {}
              yield writeFile(pnpPath, code), yield chmod(pnpPath, 493);
            }))))), steps.push(((curr, total) => callThroughHook("buildStep", asyncToGenerator_asyncToGenerator((function*() {
              _this6.reporter.step(curr, total, _this6.flags.force ? _this6.reporter.lang("rebuildingPackages") : _this6.reporter.lang("buildingFreshPackages"), emoji.get("hammer")), 
              _this6.config.ignoreScripts ? _this6.reporter.warn(_this6.reporter.lang("ignoredScripts")) : yield _this6.scripts.init(flattenedTopLevelPatterns);
            }))))), _this6.flags.har && steps.push(function() {
              var _ref10 = asyncToGenerator_asyncToGenerator((function*(curr, total) {
                var filename = `yarn-install_${(new Date).toISOString().replace(/:/g, "-")}.har`;
                _this6.reporter.step(curr, total, _this6.reporter.lang("savingHar", filename), emoji.get("black_circle_for_record")), 
                yield _this6.config.requestManager.saveHar(filename);
              }));
              return function() {
                return _ref10.apply(this, arguments);
              };
            }()), (yield _this6.shouldClean()) && steps.push(function() {
              var _ref11 = asyncToGenerator_asyncToGenerator((function*(curr, total) {
                _this6.reporter.step(curr, total, _this6.reporter.lang("cleaningModules"), emoji.get("recycle")), 
                yield autoclean_clean(_this6.config, _this6.reporter);
              }));
              return function() {
                return _ref11.apply(this, arguments);
              };
            }());
            var currentStep = 0;
            for (var step of steps) {
              var stepResult = yield step(++currentStep, steps.length);
              if (stepResult && stepResult.bailout) return _this6.flags.audit && audit.summary(), 
              auditFoundProblems && _this6.reporter.warn(_this6.reporter.lang("auditRunAuditForDetails")), 
              _this6.maybeOutputUpdate(), flattenedTopLevelPatterns;
            }
            return _this6.flags.audit && audit.summary(), auditFoundProblems && _this6.reporter.warn(_this6.reporter.lang("auditRunAuditForDetails")), 
            yield _this6.saveLockfileAndIntegrity(topLevelPatterns, workspaceLayout), yield _this6.persistChanges(), 
            _this6.maybeOutputUpdate(), _this6.config.requestManager.clearCache(), flattenedTopLevelPatterns;
          }))();
        }
        checkCompatibility() {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var manifest = (yield _this7.fetchRequestFromCwd()).manifest;
            yield checkOne(manifest, _this7.config, _this7.flags.ignoreEngines);
          }))();
        }
        persistChanges() {
          var _this8 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var manifests = yield _this8.config.getRootManifests();
            (yield _this8.applyChanges(manifests)) && (yield _this8.config.saveRootManifests(manifests));
          }))();
        }
        applyChanges(manifests) {
          var hasChanged = !1;
          if (this.config.plugnplayPersist) {
            var object = manifests.npm.object;
            "object" != typeof object.installConfig && (object.installConfig = {}), this.config.plugnplayEnabled && !0 !== object.installConfig.pnp ? (object.installConfig.pnp = !0, 
            hasChanged = !0) : this.config.plugnplayEnabled || void 0 === object.installConfig.pnp || (delete object.installConfig.pnp, 
            hasChanged = !0), 0 === Object.keys(object.installConfig).length && delete object.installConfig;
          }
          return Promise.resolve(hasChanged);
        }
        shouldClean() {
          return fs_exists(install_path.join(this.config.lockfileFolder, ".yarnclean"));
        }
        flatten(patterns) {
          var _this9 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (!_this9.flags.flat) return patterns;
            var flattenedPatterns = [];
            for (var name of _this9.resolver.getAllDependencyNamesByLevelOrder(patterns)) {
              var infos = _this9.resolver.getAllInfoForPackageName(name).filter((manifest => {
                var ref = manifest._reference;
                return install_invariant(ref, "expected package reference"), !ref.ignore;
              }));
              if (0 !== infos.length) if (1 !== infos.length) {
                var options = infos.map((info => {
                  var ref = info._reference;
                  return install_invariant(ref, "expected reference"), {
                    name: _this9.reporter.lang("manualVersionResolutionOption", ref.patterns.join(", "), info.version),
                    value: info.version
                  };
                })), versions = infos.map((info => info.version)), version = void 0, resolutionVersion = _this9.resolutions[name];
                resolutionVersion && versions.indexOf(resolutionVersion) >= 0 ? version = resolutionVersion : (version = yield _this9.reporter.select(_this9.reporter.lang("manualVersionResolution", name), _this9.reporter.lang("answer"), options), 
                _this9.resolutions[name] = version), flattenedPatterns.push(_this9.resolver.collapseAllVersionsOfPackage(name, version));
              } else flattenedPatterns.push(_this9.resolver.patternsByPackage[name][0]);
            }
            if (Object.keys(_this9.resolutions).length) {
              var manifests = yield _this9.config.getRootManifests();
              for (var _name in _this9.resolutions) {
                var _version = _this9.resolutions[_name], _patterns = _this9.resolver.patternsByPackage[_name];
                if (_patterns) {
                  var manifest = void 0;
                  for (var _pattern5 of _patterns) if (manifest = _this9.resolver.getResolvedPattern(_pattern5)) break;
                  install_invariant(manifest, "expected manifest");
                  var ref = manifest._reference;
                  install_invariant(ref, "expected reference");
                  var object = manifests[ref.registry].object;
                  object.resolutions = object.resolutions || {}, object.resolutions[_name] = _version;
                }
              }
              yield _this9.config.saveRootManifests(manifests);
            }
            return flattenedPatterns;
          }))();
        }
        pruneOfflineMirror(lockfile) {
          var _this10 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var mirror = _this10.config.getOfflineMirrorPath();
            if (mirror) {
              var requiredTarballs = new Set;
              for (var dependency in lockfile) {
                var resolved = lockfile[dependency].resolved;
                if (resolved) {
                  var basename = install_path.basename(resolved.split("#")[0]);
                  "@" === dependency[0] && "@" !== basename[0] && requiredTarballs.add(`${dependency.split("/")[0]}-${basename}`), 
                  requiredTarballs.add(basename);
                }
              }
              var mirrorFiles = yield walk(mirror);
              for (var file of mirrorFiles) {
                var isTarball = ".tgz" === install_path.extname(file.basename), hasPrebuiltPackage = file.relative.startsWith("prebuilt/");
                !isTarball || hasPrebuiltPackage || requiredTarballs.has(file.basename) || (yield unlink(file.absolute));
              }
            }
          }))();
        }
        saveLockfileAndIntegrity(patterns, workspaceLayout) {
          var _this11 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var resolvedPatterns = {};
            Object.keys(_this11.resolver.patterns).forEach((pattern => {
              workspaceLayout && workspaceLayout.getManifestByPattern(pattern) || (resolvedPatterns[pattern] = _this11.resolver.patterns[pattern]);
            })), patterns = patterns.filter((p => !workspaceLayout || !workspaceLayout.getManifestByPattern(p)));
            var lockfileBasedOnResolver = _this11.lockfile.getLockfile(resolvedPatterns);
            if (_this11.config.pruneOfflineMirror && (yield _this11.pruneOfflineMirror(lockfileBasedOnResolver)), 
            _this11.config.plugnplayEnabled || (yield _this11.integrityChecker.save(patterns, lockfileBasedOnResolver, _this11.flags, workspaceLayout, _this11.scripts.getArtifacts())), 
            !1 !== _this11.flags.lockfile && !_this11.flags.pureLockfile && !_this11.flags.frozenLockfile) {
              var lockFileHasAllPatterns = patterns.every((p => _this11.lockfile.getLocked(p))), lockfilePatternsMatch = Object.keys(_this11.lockfile.cache || {}).every((p => lockfileBasedOnResolver[p])), resolverPatternsAreSameAsInLockfile = Object.keys(lockfileBasedOnResolver).every((pattern => {
                var manifest = _this11.lockfile.getLocked(pattern);
                return manifest && manifest.resolved === lockfileBasedOnResolver[pattern].resolved && deepEqual(manifest.prebuiltVariants, lockfileBasedOnResolver[pattern].prebuiltVariants);
              })), integrityPatternsAreSameAsInLockfile = Object.keys(lockfileBasedOnResolver).every((pattern => {
                var existingIntegrityInfo = lockfileBasedOnResolver[pattern].integrity;
                if (!existingIntegrityInfo) return !0;
                var manifest = _this11.lockfile.getLocked(pattern);
                return !(!manifest || !manifest.integrity) && install_ssri.stringify(manifest.integrity) === existingIntegrityInfo;
              }));
              if (!(!_this11.flags.force && "success" === _this11.lockfile.parseResultType && lockFileHasAllPatterns && lockfilePatternsMatch && resolverPatternsAreSameAsInLockfile && integrityPatternsAreSameAsInLockfile && patterns.length)) {
                var loc = install_path.join(_this11.config.lockfileFolder, "yarn.lock"), lockSource = stringify(lockfileBasedOnResolver, !1, _this11.config.enableLockfileVersions);
                yield writeFilePreservingEol(loc, lockSource), _this11._logSuccessSaveLockfile();
              }
            }
          }))();
        }
        _logSuccessSaveLockfile() {
          this.reporter.success(this.reporter.lang("savedLockfile"));
        }
        hydrate(ignoreUnusedPatterns) {
          var _this12 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var request = yield _this12.fetchRequestFromCwd([], ignoreUnusedPatterns), depRequests = request.requests, rawPatterns = request.patterns, ignorePatterns = request.ignorePatterns, workspaceLayout = request.workspaceLayout;
            yield _this12.resolver.init(depRequests, {
              isFlat: _this12.flags.flat,
              isFrozen: _this12.flags.frozenLockfile,
              workspaceLayout: workspaceLayout
            }), yield _this12.flatten(rawPatterns), _this12.markIgnored(ignorePatterns);
            var manifests = yield fetch(_this12.resolver.getManifests(), _this12.config);
            for (var manifest of (_this12.resolver.updateManifests(manifests), yield check(_this12.resolver.getManifests(), _this12.config, _this12.flags.ignoreEngines), 
            _this12.resolver.getManifests())) {
              var ref = manifest._reference;
              install_invariant(ref, "expected reference");
              var type = ref.remote.type, loc = "";
              if ("link" !== type) {
                if ("workspace" === type) {
                  if (!ref.remote.reference) continue;
                  loc = ref.remote.reference;
                } else loc = _this12.config.generateModuleCachePath(ref);
                var newPkg = yield _this12.config.readManifest(loc);
                yield _this12.resolver.updateManifest(ref, newPkg);
              }
            }
            return request;
          }))();
        }
        checkUpdate() {
          if (!this.config.nonInteractive && !this.config.getOption("disable-self-update-check")) {
            var lastUpdateCheck = Number(this.config.getOption("lastUpdateCheck")) || 0;
            lastUpdateCheck && Date.now() - lastUpdateCheck < 864e5 || package_namespaceObject.i8.indexOf("-") >= 0 || this._checkUpdate().catch((() => {}));
          }
        }
        _checkUpdate() {
          var _this13 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var latestVersion = yield _this13.config.requestManager.request({
              url: "https://yarnpkg.com/latest-version"
            });
            if (install_invariant("string" == typeof latestVersion, "expected string"), latestVersion = latestVersion.trim(), 
            install_semver.valid(latestVersion) && (_this13.config.registries.yarn.saveHomeConfig({
              lastUpdateCheck: Date.now()
            }), install_semver.gt(latestVersion, package_namespaceObject.i8))) {
              var installationMethod = yield function() {
                return _getInstallationMethod.apply(this, arguments);
              }();
              _this13.maybeOutputUpdate = () => {
                _this13.reporter.warn(_this13.reporter.lang("yarnOutdated", latestVersion, package_namespaceObject.i8));
                var command = function(installationMethod) {
                  return "tar" === installationMethod ? "curl --compressed -o- -L https://yarnpkg.com/install.sh | bash" : "homebrew" === installationMethod ? "brew upgrade yarn" : "deb" === installationMethod ? "sudo apt-get update && sudo apt-get install yarn" : "rpm" === installationMethod ? "sudo yum install yarn" : "npm" === installationMethod ? "npm install --global yarn" : "chocolatey" === installationMethod ? "choco upgrade yarn" : "apk" === installationMethod ? "apk update && apk add -u yarn" : "portage" === installationMethod ? "sudo emerge --sync && sudo emerge -au sys-apps/yarn" : null;
                }(installationMethod);
                if (command) _this13.reporter.info(_this13.reporter.lang("yarnOutdatedCommand")), 
                _this13.reporter.command(command); else {
                  var installer = function(installationMethod) {
                    return "msi" === installationMethod ? "https://yarnpkg.com/latest.msi" : null;
                  }(installationMethod);
                  installer && _this13.reporter.info(_this13.reporter.lang("yarnOutdatedInstaller", installer));
                }
              };
            }
          }))();
        }
        maybeOutputUpdate() {}
      }
      function install_hasWrapper(commander, args) {
        return !0;
      }
      function install_setFlags(commander) {
        commander.description("Yarn install is used to install all dependencies for a project."), 
        commander.usage("install [flags]"), commander.option("-A, --audit", "Run vulnerability audit on installed packages"), 
        commander.option("-g, --global", "DEPRECATED"), commander.option("-S, --save", "DEPRECATED - save package to your `dependencies`"), 
        commander.option("-D, --save-dev", "DEPRECATED - save package to your `devDependencies`"), 
        commander.option("-P, --save-peer", "DEPRECATED - save package to your `peerDependencies`"), 
        commander.option("-O, --save-optional", "DEPRECATED - save package to your `optionalDependencies`"), 
        commander.option("-E, --save-exact", "DEPRECATED"), commander.option("-T, --save-tilde", "DEPRECATED");
      }
      function install() {
        return _install.apply(this, arguments);
      }
      function _install() {
        return _install = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, lockfile) {
          yield wrapLifecycle(config, flags, asyncToGenerator_asyncToGenerator((function*() {
            var install = new Install(flags, config, reporter, lockfile);
            yield install.init();
          })));
        })), _install.apply(this, arguments);
      }
      function install_run() {
        return commands_install_run.apply(this, arguments);
      }
      function commands_install_run() {
        return commands_install_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var lockfile, error = "installCommandRenamed";
          if (lockfile = !1 === flags.lockfile ? new Lockfile : yield Lockfile.fromDirectory(config.lockfileFolder, reporter), 
          args.length) {
            var exampleArgs = args.slice();
            flags.saveDev && exampleArgs.push("--dev"), flags.savePeer && exampleArgs.push("--peer"), 
            flags.saveOptional && exampleArgs.push("--optional"), flags.saveExact && exampleArgs.push("--exact"), 
            flags.saveTilde && exampleArgs.push("--tilde");
            var command = "add";
            throw flags.global && (error = "globalFlagRemoved", command = "global add"), new MessageError(reporter.lang(error, `yarn ${command} ${exampleArgs.join(" ")}`));
          }
          yield install(config, reporter, flags, lockfile);
        })), commands_install_run.apply(this, arguments);
      }
      function wrapLifecycle() {
        return _wrapLifecycle.apply(this, arguments);
      }
      function _wrapLifecycle() {
        return (_wrapLifecycle = asyncToGenerator_asyncToGenerator((function*(config, flags, factory) {
          yield config.executeLifecycleScript("preinstall"), yield factory(), yield config.executeLifecycleScript("install"), 
          yield config.executeLifecycleScript("postinstall"), config.production || (config.disablePrepublish || (yield config.executeLifecycleScript("prepublish")), 
          yield config.executeLifecycleScript("prepare"));
        }))).apply(this, arguments);
      }
      var list_invariant = __webpack_require__(46128), list_micromatch = __webpack_require__(70850), list_requireLockfile = !0;
      function buildCount(trees) {
        if (!trees || !trees.length) return 0;
        var count = 0;
        for (var tree of trees) tree.shadow || (count++, count += buildCount(tree.children));
        return count;
      }
      function list_buildTree() {
        return commands_list_buildTree.apply(this, arguments);
      }
      function commands_list_buildTree() {
        return commands_list_buildTree = asyncToGenerator_asyncToGenerator((function*(resolver, linker, patterns, opts, onlyFresh, ignoreHoisted) {
          var treesByKey = {}, trees = [], flatTree = yield linker.getFlatHoistedTree(patterns), workspaceLayout = resolver.workspaceLayout, hoisted = workspaceLayout && workspaceLayout.virtualManifestName ? flatTree.filter((_ref => -1 === _ref[0].indexOf(workspaceLayout.virtualManifestName))) : flatTree, hoistedByKey = {};
          for (var _ref2 of hoisted) {
            var key = _ref2[0], info = _ref2[1];
            hoistedByKey[key] = info;
          }
          for (var _ref3 of hoisted) {
            var _info = _ref3[1], ref = _info.pkg._reference, parent = list_getParent(_info.key, treesByKey), children = [], depth = 0, color = "bold";
            if (list_invariant(ref, "expected reference"), onlyFresh) {
              var isFresh = !1;
              for (var pattern of ref.patterns) if (resolver.isNewPattern(pattern)) {
                isFresh = !0;
                break;
              }
              if (!isFresh) continue;
            }
            _info.originalKey === _info.key && 0 !== opts.reqDepth || (color = null), depth = parent && parent.depth > 0 ? parent.depth + 1 : 0;
            var topLevel = 0 === opts.reqDepth && !parent, showAll = -1 === opts.reqDepth, nextDepthIsValid = depth + 1 <= Number(opts.reqDepth);
            (topLevel || nextDepthIsValid || showAll) && (treesByKey[_info.key] = {
              name: `${_info.pkg.name}@${_info.pkg.version}`,
              children: children,
              hint: null,
              color: color,
              depth: depth
            });
            var nextChildDepthIsValid = depth + 1 < Number(opts.reqDepth);
            if (list_invariant(ref, "expected reference"), !ignoreHoisted && nextDepthIsValid || showAll) for (var _pattern of resolver.dedupePatterns(ref.dependencies)) {
              var pkg = resolver.getStrictResolvedPattern(_pattern);
              hoistedByKey[`${_info.key}#${pkg.name}`] || !nextChildDepthIsValid && !showAll || children.push({
                name: _pattern,
                color: "dim",
                shadow: !0
              });
            }
          }
          for (var _ref4 of hoisted) {
            var _info2 = _ref4[1], tree = treesByKey[_info2.key], _parent = list_getParent(_info2.key, treesByKey);
            tree && (1 !== _info2.key.split("#").length ? _parent && _parent.children.push(tree) : trees.push(tree));
          }
          return {
            trees: trees,
            count: buildCount(trees)
          };
        })), commands_list_buildTree.apply(this, arguments);
      }
      function list_getParent(key, treesByKey) {
        return treesByKey[key.slice(0, key.lastIndexOf("#"))];
      }
      function list_hasWrapper(commander, args) {
        return !0;
      }
      function list_setFlags(commander) {
        commander.description("Lists installed packages."), commander.option("--depth [depth]", "Limit the depth of the shown dependencies"), 
        commander.option("--pattern [pattern]", "Filter dependencies by pattern");
      }
      function getReqDepth(inputDepth) {
        return inputDepth && /^\d+$/.test(inputDepth) ? Number(inputDepth) : -1;
      }
      function filterTree(tree, filters, pattern) {
        void 0 === pattern && (pattern = ""), tree.children && (tree.children = tree.children.filter((child => filterTree(child, filters, pattern))));
        var notDim = "dim" !== tree.color, hasChildren = null != tree.children && tree.children.length > 0, name = tree.name.slice(0, tree.name.lastIndexOf("@")), found = list_micromatch.any(name, filters) || list_micromatch.contains(name, pattern);
        return notDim && (found || hasChildren);
      }
      function getDevDeps(manifest) {
        return manifest.devDependencies ? new Set(Object.keys(manifest.devDependencies).map((key => `${key}@${manifest.devDependencies[key]}`))) : new Set;
      }
      function list_run() {
        return commands_list_run.apply(this, arguments);
      }
      function commands_list_run() {
        return commands_list_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var lockfile = yield Lockfile.fromDirectory(config.lockfileFolder, reporter), install = new Install(flags, config, reporter, lockfile), _yield$install$fetchR = yield install.fetchRequestFromCwd(), depRequests = _yield$install$fetchR.requests, patterns = _yield$install$fetchR.patterns, manifest = _yield$install$fetchR.manifest, workspaceLayout = _yield$install$fetchR.workspaceLayout;
          yield install.resolver.init(depRequests, {
            isFlat: install.flags.flat,
            isFrozen: install.flags.frozenLockfile,
            workspaceLayout: workspaceLayout
          });
          var activePatterns = [];
          if (config.production) {
            var devDeps = getDevDeps(manifest);
            activePatterns = patterns.filter((pattern => !devDeps.has(pattern)));
          } else activePatterns = patterns;
          var opts = {
            reqDepth: getReqDepth(flags.depth)
          }, trees = (yield list_buildTree(install.resolver, install.linker, activePatterns, opts)).trees;
          args.length && reporter.warn(reporter.lang("deprecatedListArgs")), (args.length || flags.pattern) && (trees = trees.filter((tree => filterTree(tree, args, flags.pattern)))), 
          reporter.tree("list", trees, {
            force: !0
          });
        })), commands_list_run.apply(this, arguments);
      }
      var add_invariant = __webpack_require__(46128), add_path = __webpack_require__(71017), add_semver = __webpack_require__(92878), SILENCE_DEPENDENCY_TYPE_WARNINGS = [ "upgrade", "upgrade-interactive" ];
      class Add extends Install {
        constructor(args, flags, config, reporter, lockfile) {
          var workspaceRootIsCwd = config.cwd === config.lockfileFolder;
          super(flags ? _extends({}, flags, {
            workspaceRootIsCwd: workspaceRootIsCwd
          }) : {
            workspaceRootIsCwd: workspaceRootIsCwd
          }, config, reporter, lockfile), this.args = args, this.flagToOrigin = [ flags.dev && "devDependencies", flags.optional && "optionalDependencies", flags.peer && "peerDependencies", "dependencies" ].filter(Boolean).shift();
        }
        prepareRequests(requests) {
          var requestsWithArgs = requests.slice();
          for (var _pattern of this.args) requestsWithArgs.push({
            pattern: _pattern,
            registry: "npm",
            optional: !1
          });
          return requestsWithArgs;
        }
        getPatternVersion(pattern, pkg) {
          var version, tilde = this.flags.tilde, configPrefix = String(this.config.getOption("save-prefix")), exact = this.flags.exact || Boolean(this.config.getOption("save-exact")) || "" === configPrefix, _normalizePattern = normalizePattern(pattern), hasVersion = _normalizePattern.hasVersion, range = _normalizePattern.range;
          if (getExoticResolver(pattern) ? version = pattern : hasVersion && range && (add_semver.satisfies(pkg.version, range) || getExoticResolver(range)) && (version = range), 
          !version || add_semver.valid(version)) {
            var prefix = configPrefix || "^";
            tilde ? prefix = "~" : (version || exact) && (prefix = ""), version = `${prefix}${pkg.version}`;
          }
          return version;
        }
        preparePatterns(patterns) {
          var preparedPatterns = patterns.slice();
          for (var _pattern2 of this.resolver.dedupePatterns(this.args)) {
            var pkg = this.resolver.getResolvedPattern(_pattern2);
            add_invariant(pkg, `missing package ${_pattern2}`);
            var _version = this.getPatternVersion(_pattern2, pkg), newPattern = `${pkg.name}@${_version}`;
            preparedPatterns.push(newPattern), this.addedPatterns.push(newPattern), newPattern !== _pattern2 && this.resolver.replacePattern(_pattern2, newPattern);
          }
          return preparedPatterns;
        }
        preparePatternsForLinking(patterns, cwdManifest, cwdIsRoot) {
          if (cwdIsRoot) return patterns;
          var manifest, cwdPackage = `${cwdManifest.name}@${cwdManifest.version}`;
          try {
            manifest = this.resolver.getStrictResolvedPattern(cwdPackage);
          } catch (e) {
            return this.reporter.warn(this.reporter.lang("unknownPackage", cwdPackage)), patterns;
          }
          var newPatterns = patterns;
          return this._iterateAddedPackages(((pattern, registry, dependencyType, pkgName, version) => {
            var filtered = newPatterns.filter((p => p !== pattern));
            if (add_invariant(newPatterns.length - filtered.length > 0, `expect added pattern '${pattern}' in the list: ${patterns.toString()}`), 
            newPatterns = filtered, manifest[dependencyType] = manifest[dependencyType] || {}, 
            manifest[dependencyType][pkgName] !== version) {
              add_invariant(manifest._reference, "manifest._reference should not be null");
              var ref = manifest._reference;
              ref.dependencies = ref.dependencies || [], ref.dependencies.push(pattern);
            }
          })), newPatterns;
        }
        bailout(patterns, workspaceLayout) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var lockfileCache = _this.lockfile.cache;
            if (!lockfileCache) return !1;
            var match = yield _this.integrityChecker.check(patterns, lockfileCache, _this.flags, workspaceLayout), haveLockfile = yield fs_exists(add_path.join(_this.config.lockfileFolder, "yarn.lock"));
            return match.integrityFileMissing && haveLockfile && _this.scripts.setForce(!0), 
            !1;
          }))();
        }
        init() {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (_this2.config.workspaceRootFolder && _this2.config.cwd === _this2.config.workspaceRootFolder && !_this2.flags.ignoreWorkspaceRootCheck) throw new MessageError(_this2.reporter.lang("workspacesAddRootCheck"));
            _this2.addedPatterns = [];
            var patterns = yield Install.prototype.init.call(_this2);
            return yield _this2.maybeOutputSaveTree(patterns), patterns;
          }))();
        }
        applyChanges(manifests) {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            return yield Install.prototype.applyChanges.call(_this3, manifests), yield Install.prototype.fetchRequestFromCwd.call(_this3), 
            _this3._iterateAddedPackages(((pattern, registry, dependencyType, pkgName, version) => {
              var object = manifests[registry].object;
              object[dependencyType] = object[dependencyType] || {}, object[dependencyType][pkgName] = version, 
              -1 === SILENCE_DEPENDENCY_TYPE_WARNINGS.indexOf(_this3.config.commandName) && dependencyType !== _this3.flagToOrigin && _this3.reporter.warn(_this3.reporter.lang("moduleAlreadyInManifest", pkgName, dependencyType, _this3.flagToOrigin));
            })), !0;
          }))();
        }
        fetchRequestFromCwd() {
          return Install.prototype.fetchRequestFromCwd.call(this, this.args);
        }
        maybeOutputSaveTree(patterns) {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var merged = [].concat(patterns, _this4.addedPatterns), _yield$buildTree = yield list_buildTree(_this4.resolver, _this4.linker, merged, {
              reqDepth: 0
            }, !0, !0), trees = _yield$buildTree.trees, count = _yield$buildTree.count;
            if (1 === count ? _this4.reporter.success(_this4.reporter.lang("savedNewDependency")) : _this4.reporter.success(_this4.reporter.lang("savedNewDependencies", count)), 
            count) {
              var resolverPatterns = new Set;
              for (var _pattern3 of patterns) {
                var _ref = _this4.resolver.getResolvedPattern(_pattern3) || {}, _version2 = _ref.version, name = _ref.name;
                resolverPatterns.add(`${name}@${_version2}`);
              }
              var directRequireDependencies = trees.filter((_ref2 => {
                var name = _ref2.name;
                return resolverPatterns.has(name);
              }));
              _this4.reporter.info(_this4.reporter.lang("directDependencies")), _this4.reporter.tree("newDirectDependencies", directRequireDependencies), 
              _this4.reporter.info(_this4.reporter.lang("allDependencies")), _this4.reporter.tree("newAllDependencies", trees);
            }
          }))();
        }
        savePackages() {
          return asyncToGenerator_asyncToGenerator((function*() {}))();
        }
        _iterateAddedPackages(f) {
          var _this5 = this, patternOrigins = Object.keys(this.rootPatternsToOrigin), _loop = function(_pattern4) {
            var pkg = _this5.resolver.getResolvedPattern(_pattern4);
            add_invariant(pkg, `missing package ${_pattern4}`);
            var version = _this5.getPatternVersion(_pattern4, pkg), ref = pkg._reference;
            add_invariant(ref, "expected package reference");
            var target = patternOrigins.reduce(((acc, prev) => 0 === prev.indexOf(`${pkg.name}@`) ? _this5.rootPatternsToOrigin[prev] : acc), null) || _this5.flagToOrigin;
            f(_pattern4, ref.registry, target, pkg.name, version);
          };
          for (var _pattern4 of this.addedPatterns) _loop(_pattern4);
        }
      }
      function add_hasWrapper(commander) {
        return !0;
      }
      function add_setFlags(commander) {
        commander.description("Installs a package and any packages that it depends on."), 
        commander.usage("add [packages ...] [flags]"), commander.option("-W, --ignore-workspace-root-check", "required to run yarn add inside a workspace root"), 
        commander.option("-D, --dev", "save package to your `devDependencies`"), commander.option("-P, --peer", "save package to your `peerDependencies`"), 
        commander.option("-O, --optional", "save package to your `optionalDependencies`"), 
        commander.option("-E, --exact", "install exact version"), commander.option("-T, --tilde", "install most recent release with the same minor version"), 
        commander.option("-A, --audit", "Run vulnerability audit on installed packages");
      }
      function add_run() {
        return commands_add_run.apply(this, arguments);
      }
      function commands_add_run() {
        return commands_add_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (!args.length) throw new MessageError(reporter.lang("missingAddDependencies"));
          var lockfile = yield Lockfile.fromDirectory(config.lockfileFolder, reporter);
          yield wrapLifecycle(config, flags, asyncToGenerator_asyncToGenerator((function*() {
            var install = new Add(args, flags, config, reporter, lockfile);
            yield install.init();
          })));
        })), commands_add_run.apply(this, arguments);
      }
      var run_invariant = __webpack_require__(46128), leven = __webpack_require__(12937), run_path = __webpack_require__(71017), run_require = __webpack_require__(65523), quoteForShell = run_require.quoteForShell, sh = run_require.sh, unquoted = run_require.unquoted;
      function toObject(input) {
        var output = Object.create(null);
        for (var _ref of input.entries()) {
          var key = _ref[0], val = _ref[1];
          output[key] = val;
        }
        return output;
      }
      function getBinEntries() {
        return _getBinEntries.apply(this, arguments);
      }
      function _getBinEntries() {
        return _getBinEntries = asyncToGenerator_asyncToGenerator((function*(config) {
          var binFolders = new Set, binEntries = new Map;
          for (var registryFolder of config.registryFolders) binFolders.add(run_path.resolve(config.cwd, registryFolder, ".bin")), 
          binFolders.add(run_path.resolve(config.lockfileFolder, registryFolder, ".bin"));
          if (yield fs_exists(`${config.lockfileFolder}/.pnp.js`)) {
            var pnpApi = dynamicRequire(`${config.lockfileFolder}/.pnp.js`), packageLocator = pnpApi.findPackageLocator(`${config.cwd}/`), packageInformation = pnpApi.getPackageInformation(packageLocator);
            for (var _ref2 of packageInformation.packageDependencies.entries()) {
              var name = _ref2[0], reference = _ref2[1], dependencyInformation = pnpApi.getPackageInformation({
                name: name,
                reference: reference
              });
              dependencyInformation.packageLocation && binFolders.add(`${dependencyInformation.packageLocation}/.bin`);
            }
          }
          for (var binFolder of binFolders) if (yield fs_exists(binFolder)) for (var _name of yield readdir(binFolder)) binEntries.set(_name, run_path.join(binFolder, _name));
          return binEntries;
        })), _getBinEntries.apply(this, arguments);
      }
      function run_setFlags(commander) {
        commander.description("Runs a defined package script.");
      }
      function run_hasWrapper(commander, args) {
        return !0;
      }
      function run_run() {
        return commands_run_run.apply(this, arguments);
      }
      function commands_run_run() {
        return commands_run_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var pkg = yield config.readManifest(config.cwd), binCommands = new Set, pkgCommands = new Set, scripts = new Map;
          for (var _ref3 of yield getBinEntries(config)) {
            var name = _ref3[0], loc = _ref3[1];
            scripts.set(name, quoteForShell(loc)), binCommands.add(name);
          }
          var pkgScripts = pkg.scripts;
          if (pkgScripts) for (var _name2 of Object.keys(pkgScripts).sort()) scripts.set(_name2, pkgScripts[_name2] || ""), 
          pkgCommands.add(_name2);
          function runCommand(_ref4) {
            var action = _ref4[0], args = _ref4.slice(1);
            return callThroughHook("runScript", (() => function() {
              return _realRunCommand.apply(this, arguments);
            }(action, args)), {
              action: action,
              args: args
            });
          }
          function _realRunCommand() {
            return _realRunCommand = asyncToGenerator_asyncToGenerator((function*(action, args) {
              var cmds = [];
              if (pkgScripts && action in pkgScripts) {
                var preAction = `pre${action}`;
                preAction in pkgScripts && cmds.push([ preAction, pkgScripts[preAction] ]);
                var script = scripts.get(action);
                run_invariant(script, "Script must exist"), cmds.push([ action, script ]);
                var postAction = `post${action}`;
                postAction in pkgScripts && cmds.push([ postAction, pkgScripts[postAction] ]);
              } else if (scripts.has(action)) {
                var _script = scripts.get(action);
                run_invariant(_script, "Script must exist"), cmds.push([ action, _script ]);
              }
              if (cmds.length) {
                var ignoreEngines = !(!flags.ignoreEngines && !config.getOption("ignore-engines"));
                try {
                  yield checkOne(pkg, config, ignoreEngines);
                } catch (err) {
                  throw err instanceof MessageError ? new MessageError(reporter.lang("cannotRunWithIncompatibleEnv")) : err;
                }
                for (var _ref5 of (process.env.YARN_WRAP_OUTPUT = "false", cmds)) {
                  var stage = _ref5[0], cmd = _ref5[1], cmdWithArgs = stage === action ? sh`${unquoted(cmd)} ${args}` : cmd, customShell = config.getOption("script-shell");
                  yield execCommand({
                    stage: stage,
                    config: config,
                    cmd: cmdWithArgs,
                    cwd: flags.into || config.cwd,
                    isInteractive: !0,
                    customShell: customShell ? String(customShell) : void 0
                  });
                }
              } else {
                if ("env" !== action) {
                  var suggestion;
                  for (var commandName of scripts.keys()) {
                    leven(commandName, action) < 2 && (suggestion = commandName);
                  }
                  var msg = `Command ${JSON.stringify(action)} not found.`;
                  throw suggestion && (msg += ` Did you mean ${JSON.stringify(suggestion)}?`), new MessageError(msg);
                }
                reporter.log(JSON.stringify(yield makeEnv("env", config.cwd, config), null, 2), {
                  force: !0
                });
              }
            })), _realRunCommand.apply(this, arguments);
          }
          if (0 === args.length) {
            binCommands.size > 0 ? reporter.info(`${reporter.lang("binCommands") + Array.from(binCommands).join(", ")}`) : reporter.error(reporter.lang("noBinAvailable"));
            var printedCommands = new Map;
            for (var pkgCommand of pkgCommands) {
              var action = scripts.get(pkgCommand);
              run_invariant(action, "Action must exists"), printedCommands.set(pkgCommand, action);
            }
            return pkgCommands.size > 0 ? (reporter.info(`${reporter.lang("possibleCommands")}`), 
            reporter.list("possibleCommands", Array.from(pkgCommands), toObject(printedCommands)), 
            flags.nonInteractive || (yield reporter.question(reporter.lang("commandQuestion")).then((answer => runCommand(answer.trim().split(" "))), (() => reporter.error(reporter.lang("commandNotSpecified")))))) : reporter.error(reporter.lang("noScriptsAvailable")), 
            Promise.resolve();
          }
          return runCommand(args);
        })), commands_run_run.apply(this, arguments);
      }
      var bin_path = __webpack_require__(71017);
      function bin_hasWrapper(commander) {
        return !1;
      }
      function bin_setFlags(commander) {
        commander.description("Displays the location of the yarn bin folder.");
      }
      function bin_run() {
        return commands_bin_run.apply(this, arguments);
      }
      function commands_bin_run() {
        return (commands_bin_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var binFolder = bin_path.join(config.cwd, config.registryFolders[0], ".bin");
          if (0 === args.length) reporter.log(binFolder, {
            force: !0
          }); else {
            var binEntries = yield getBinEntries(config), binName = args[0], binPath = binEntries.get(binName);
            binPath ? reporter.log(binPath, {
              force: !0
            }) : reporter.error(reporter.lang("packageBinaryNotFound", binName));
          }
        }))).apply(this, arguments);
      }
      var check_semver = __webpack_require__(92878), check_path = __webpack_require__(71017), check_requireLockfile = !1, check_noArguments = !0;
      function check_hasWrapper(commander) {
        return !0;
      }
      function check_setFlags(commander) {
        commander.description("Verifies if versions in the current project’s package.json match that of yarn’s lock file."), 
        commander.option("--integrity"), commander.option("--verify-tree");
      }
      function verifyTreeCheck() {
        return _verifyTreeCheck.apply(this, arguments);
      }
      function _verifyTreeCheck() {
        return _verifyTreeCheck = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var errCount = 0;
          function reportError(msg) {
            var vars = Array.prototype.slice.call(arguments, 1);
            reporter.error(reporter.lang.apply(reporter, [ msg ].concat(vars))), errCount++;
          }
          var registryFolder = config.registryFolders[0], cwd = config.workspaceRootFolder ? config.lockfileFolder : config.cwd, rootManifest = yield config.readManifest(cwd, "yarn"), dependenciesToCheckVersion = [];
          if (rootManifest.dependencies) for (var name in rootManifest.dependencies) {
            var version = rootManifest.dependencies[name];
            /^link:/i.test(version) || /^file:/i.test(version) && config.linkFileDependencies || dependenciesToCheckVersion.push({
              name: name,
              originalKey: name,
              parentCwd: cwd,
              version: version
            });
          }
          if (rootManifest.devDependencies && !config.production) for (var _name in rootManifest.devDependencies) {
            var _version = rootManifest.devDependencies[_name];
            /^link:/i.test(_version) || /^file:/i.test(_version) && config.linkFileDependencies || dependenciesToCheckVersion.push({
              name: _name,
              originalKey: _name,
              parentCwd: cwd,
              version: _version
            });
          }
          for (var locationsVisited = new Set; dependenciesToCheckVersion.length; ) {
            var dep = dependenciesToCheckVersion.shift(), manifestLoc = check_path.resolve(dep.parentCwd, registryFolder, dep.name);
            if (!locationsVisited.has(manifestLoc + `@${dep.version}`) && (locationsVisited.add(manifestLoc + `@${dep.version}`), 
            !config.plugnplayEnabled)) if (yield fs_exists(manifestLoc)) {
              if (yield fs_exists(check_path.join(manifestLoc, "package.json"))) {
                var pkg = yield config.readManifest(manifestLoc, "yarn");
                if (!check_semver.validRange(dep.version, config.looseSemver) || check_semver.satisfies(pkg.version, dep.version, config.looseSemver)) {
                  var dependencies = pkg.dependencies;
                  if (dependencies) for (var subdep in dependencies) {
                    var subDepPath = check_path.resolve(manifestLoc, registryFolder, subdep), found = !1, relative = check_path.relative(cwd, subDepPath), locations = check_path.normalize(relative).split(registryFolder + check_path.sep).filter((dir => !!dir));
                    for (locations.pop(); locations.length >= 0; ) {
                      var possiblePath = void 0;
                      if (possiblePath = locations.length > 0 ? check_path.join(cwd, registryFolder, locations.join(check_path.sep + registryFolder + check_path.sep)) : cwd, 
                      yield fs_exists(check_path.resolve(possiblePath, registryFolder, subdep))) {
                        dependenciesToCheckVersion.push({
                          name: subdep,
                          originalKey: `${dep.originalKey}#${subdep}`,
                          parentCwd: possiblePath,
                          version: dependencies[subdep]
                        }), found = !0;
                        break;
                      }
                      if (!locations.length) break;
                      locations.pop();
                    }
                    found || reportError("packageNotInstalled", `${dep.originalKey}#${subdep}`);
                  }
                } else reportError("packageWrongVersion", dep.originalKey, dep.version, pkg.version);
              }
            } else reportError("packageNotInstalled", `${dep.originalKey}`);
          }
          if (errCount > 0) throw new MessageError(reporter.lang("foundErrors", errCount));
          reporter.success(reporter.lang("folderInSync"));
        })), _verifyTreeCheck.apply(this, arguments);
      }
      function integrityHashCheck() {
        return _integrityHashCheck.apply(this, arguments);
      }
      function _integrityHashCheck() {
        return _integrityHashCheck = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var errCount = 0;
          function reportError(msg) {
            var vars = Array.prototype.slice.call(arguments, 1);
            reporter.error(reporter.lang.apply(reporter, [ msg ].concat(vars))), errCount++;
          }
          var integrityChecker = new InstallationIntegrityChecker(config), lockfile = yield Lockfile.fromDirectory(config.cwd), install = new Install(flags, config, reporter, lockfile), _yield$install$fetchR = yield install.fetchRequestFromCwd(), patterns = _yield$install$fetchR.patterns, workspaceLayout = _yield$install$fetchR.workspaceLayout, match = yield integrityChecker.check(patterns, lockfile.cache, flags, workspaceLayout);
          for (var pattern of match.missingPatterns) reportError("lockfileNotContainPattern", pattern);
          if (match.integrityFileMissing && reportError("noIntegrityFile"), !1 === match.integrityMatches && (reporter.warn(reporter.lang(integrityErrors[match.integrityError])), 
          reportError("integrityCheckFailed")), errCount > 0) throw new MessageError(reporter.lang("foundErrors", errCount));
          reporter.success(reporter.lang("folderInSync"));
        })), _integrityHashCheck.apply(this, arguments);
      }
      function check_run() {
        return commands_check_run.apply(this, arguments);
      }
      function commands_check_run() {
        return commands_check_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (flags.verifyTree) yield verifyTreeCheck(config, reporter, flags, args); else if (flags.integrity) yield integrityHashCheck(config, reporter, flags, args); else {
            var lockfile = yield Lockfile.fromDirectory(config.cwd), install = new Install(flags, config, reporter, lockfile), warningCount = 0, errCount = 0, _yield$install$hydrat = yield install.hydrate(), rawPatterns = _yield$install$hydrat.patterns, workspaceLayout = _yield$install$hydrat.workspaceLayout, patterns = yield install.flatten(rawPatterns);
            for (var pattern of patterns) lockfile.getLocked(pattern) || workspaceLayout && workspaceLayout.getManifestByPattern(pattern) || reportError("lockfileNotContainPattern", pattern);
            var bundledDeps = {}, res = yield install.linker.getFlatHoistedTree(patterns, workspaceLayout);
            for (var _ref of res) {
              var loc = _ref[0], _ref$ = _ref[1], originalKey = _ref$.originalKey, pkg = _ref$.pkg;
              if (!_ref$.ignore) {
                var parts = humaniseLocation(loc), human = originalKey, hoistedParts = parts.slice();
                if (human !== parts.join("#")) {
                  for (var humanParts = human.split("#"), i = 0; i < humanParts.length; i++) {
                    var humanPart = humanParts[i];
                    hoistedParts[0] === humanPart ? (hoistedParts.shift(), i < humanParts.length - 1 && (humanParts[i] += "#")) : humanParts[i] = reporter.format.dim(`${humanPart}#`);
                  }
                  human = humanParts.join("");
                }
                var remoteType = pkg._reference.remote.type, isLinkedDependency = "link" === remoteType || "workspace" === remoteType || "file" === remoteType && config.linkFileDependencies, isResolution = "resolution" === pkg._reference.hint;
                if (!isLinkedDependency && !isResolution) if (yield fs_exists(loc)) {
                  var pkgLoc = check_path.join(loc, "package.json");
                  if (yield fs_exists(pkgLoc)) {
                    var packageJson = yield config.readJson(pkgLoc);
                    packageJson.version = check_semver.clean(packageJson.version), pkg.version !== packageJson.version && reportError("packageWrongVersion", human, pkg.version, packageJson.version);
                    var deps = Object.assign({}, packageJson.dependencies, packageJson.peerDependencies);
                    for (var name in bundledDeps[packageJson.name] = packageJson.bundledDependencies || [], 
                    deps) {
                      var range = deps[name];
                      if (check_semver.validRange(range, config.looseSemver)) {
                        for (var subHuman = `${human}#${name}@${range}`, possibles = [], depLoc = void 0, _i = parts.length; _i >= 0; _i--) {
                          var myParts = parts.slice(0, _i).concat(name), myDepPkgLoc = check_path.join(config.cwd, "node_modules", myParts.join(`${check_path.sep}node_modules${check_path.sep}`));
                          possibles.push(myDepPkgLoc);
                        }
                        for (;possibles.length; ) {
                          var _myDepPkgLoc = possibles.shift();
                          if (yield fs_exists(_myDepPkgLoc)) {
                            depLoc = _myDepPkgLoc;
                            break;
                          }
                        }
                        if (depLoc) {
                          var depPkgLoc = check_path.join(depLoc, "package.json");
                          if (yield fs_exists(depPkgLoc)) {
                            var depPkg = yield config.readJson(depPkgLoc), foundHuman = `${humaniseLocation(check_path.dirname(depPkgLoc)).join("#")}@${depPkg.version}`;
                            if (!check_semver.satisfies(depPkg.version, range, config.looseSemver)) {
                              var resPattern = install.resolutionMap.find(name, originalKey.split("#"));
                              if (resPattern) {
                                var resHuman = `${human}#${resPattern}`, resRange = normalizePattern(resPattern).range;
                                check_semver.satisfies(depPkg.version, resRange, config.looseSemver) ? (reporter.warn(reporter.lang("incompatibleResolutionVersion", foundHuman, subHuman)), 
                                warningCount++) : reportError("packageDontSatisfy", resHuman, foundHuman);
                              } else reportError("packageDontSatisfy", subHuman, foundHuman);
                              continue;
                            }
                            for (var _loc of possibles) {
                              var locPkg = check_path.join(_loc, "package.json");
                              if (yield fs_exists(locPkg)) {
                                var _packageJson = yield config.readJson(locPkg), packagePath = originalKey.split("#"), rootDep = packagePath[0], packageName = packagePath[1] || _packageJson.name;
                                !(bundledDeps[rootDep] && -1 !== bundledDeps[rootDep].indexOf(packageName)) && (_packageJson.version === depPkg.version || check_semver.satisfies(_packageJson.version, range, config.looseSemver) && check_semver.gt(_packageJson.version, depPkg.version, config.looseSemver)) && (reporter.warn(reporter.lang("couldBeDeduped", subHuman, _packageJson.version, `${humaniseLocation(check_path.dirname(locPkg)).join("#")}@${_packageJson.version}`)), 
                                warningCount++);
                                break;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else pkg._reference.optional ? reporter.warn(reporter.lang("optionalDepNotInstalled", human)) : reportError("packageNotInstalled", human);
              }
            }
            if (warningCount > 1 && reporter.info(reporter.lang("foundWarnings", warningCount)), 
            errCount > 0) throw new MessageError(reporter.lang("foundErrors", errCount));
            reporter.success(reporter.lang("folderInSync"));
          }
          function humaniseLocation(loc) {
            var relative = check_path.relative(check_path.join(config.cwd, "node_modules"), loc);
            return check_path.normalize(relative).split(check_path.sep).filter((p => "node_modules" !== p)).reduce(((result, part) => {
              var length = result.length;
              return length && result[length - 1].startsWith("@") && -1 === result[length - 1].indexOf(check_path.sep) ? result[length - 1] += check_path.sep + part : result.push(part), 
              result;
            }), []);
          }
          function reportError(msg) {
            var vars = Array.prototype.slice.call(arguments, 1);
            reporter.error(reporter.lang.apply(reporter, [ msg ].concat(vars))), errCount++;
          }
        })), commands_check_run.apply(this, arguments);
      }
      var CONFIG_KEYS = [ "registryFolders", "linkedModules", "cache", "cwd", "looseSemver", "commandName", "preferOffline", "modulesFolder", "globalFolder", "linkFolder", "offline", "binLinks", "ignorePlatform", "ignoreScripts", "disablePrepublish", "nonInteractive", "workspaceRootFolder", "lockfileFolder", "networkConcurrency", "childConcurrency", "networkTimeout", "workspacesEnabled", "workspacesNohoistEnabled", "pruneOfflineMirror", "enableMetaFolder", "enableLockfileVersions", "linkFileDependencies", "cacheFolder", "tempFolder", "production", "packageDateLimit", "disableWrappersFolder" ];
      function config_hasWrapper(flags, args) {
        return "get" !== args[0];
      }
      function config_setFlags(commander) {
        commander.description("Manages the yarn configuration files.");
      }
      var _ref, config_buildSubCommands = _build_sub_commands("config", {
        set: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          if (0 === args.length || args.length > 2) return !1;
          var key = args[0], _args$ = args[1], val = void 0 === _args$ || _args$, yarnConfig = config.registries.yarn;
          return yield yarnConfig.saveHomeConfig({
            [key]: val
          }), reporter.success(reporter.lang("configSet", key, val)), !0;
        }))(),
        get: (config, reporter, flags, args) => 1 === args.length && (reporter.log(String(config.getOption(args[0])), {
          force: !0
        }), !0),
        delete: (_ref = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (1 !== args.length) return !1;
          var key = args[0], yarnConfig = config.registries.yarn;
          return yield yarnConfig.saveHomeConfig({
            [key]: void 0
          }), reporter.success(reporter.lang("configDelete", key)), !0;
        })), function() {
          return _ref.apply(this, arguments);
        }),
        list: (config, reporter, flags, args) => !args.length && (reporter.info(reporter.lang("configYarn")), 
        reporter.inspect(config.registries.yarn.config), reporter.info(reporter.lang("configNpm")), 
        reporter.inspect(config.registries.npm.config), !0),
        current: (config, reporter, flags, args) => !args.length && (reporter.log(JSON.stringify(config, CONFIG_KEYS, 2), {
          force: !0
        }), !0)
      }), config_run = config_buildSubCommands.run, config_examples = config_buildSubCommands.examples, remove_path = __webpack_require__(71017), remove_emoji = __webpack_require__(30736), remove_requireLockfile = !0;
      function remove_setFlags(commander) {
        commander.description("Removes a package from your direct dependencies updating your package.json and yarn.lock."), 
        commander.usage("remove [packages ...] [flags]"), commander.option("-W, --ignore-workspace-root-check", "required to run yarn remove inside a workspace root");
      }
      function remove_hasWrapper(commander, args) {
        return !0;
      }
      function remove_run() {
        return commands_remove_run.apply(this, arguments);
      }
      function commands_remove_run() {
        return commands_remove_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var isWorkspaceRoot = config.workspaceRootFolder && config.cwd === config.workspaceRootFolder;
          if (!args.length) throw new MessageError(reporter.lang("tooFewArguments", 1));
          if (isWorkspaceRoot && !flags.ignoreWorkspaceRootCheck) throw new MessageError(reporter.lang("workspacesRemoveRootCheck"));
          var totalSteps = args.length + 1, step = 0, lockfile = yield Lockfile.fromDirectory(config.lockfileFolder), rootManifests = yield config.getRootManifests(), manifests = [];
          for (var name of args) {
            reporter.step(++step, totalSteps, `Removing module ${name}`, remove_emoji.get("wastebasket"));
            var found = !1;
            for (var registryName of Object.keys(registries)) {
              var registry = config.registries[registryName], object = rootManifests[registryName].object;
              for (var type of DEPENDENCY_TYPES) {
                var deps = object[type];
                deps && deps[name] && (found = !0, delete deps[name]);
              }
              var possibleManifestLoc = remove_path.join(config.cwd, registry.folder, name);
              if (yield fs_exists(possibleManifestLoc)) {
                var manifest = yield config.maybeReadManifest(possibleManifestLoc, registryName);
                manifest && manifests.push([ possibleManifestLoc, manifest ]);
              }
            }
            if (!found) throw new MessageError(reporter.lang("moduleNotInManifest"));
          }
          for (var action of (yield config.saveRootManifests(rootManifests), [ "preuninstall", "uninstall", "postuninstall" ])) for (var _ref of manifests) {
            var loc = _ref[0];
            yield config.executeLifecycleScript(action, loc);
          }
          reporter.step(++step, totalSteps, reporter.lang("uninstallRegenerate"), remove_emoji.get("hammer"));
          var installFlags = _extends({
            force: !0,
            workspaceRootIsCwd: !0
          }, flags), reinstall = new Install(installFlags, config, new NoopReporter, lockfile);
          yield reinstall.init(), reporter.success(reporter.lang("uninstalledPackages"));
        })), commands_remove_run.apply(this, arguments);
      }
      var basicSemverOperatorRegex = new RegExp("^(\\^|~|>=|<=)?[^ |&,]+$"), validScopeRegex = /^@[a-zA-Z0-9-][a-zA-Z0-9_.-]*\/$/;
      function setUserRequestedPackageVersions(deps, args, latest, packagePatterns, reporter) {
        args.forEach((requestedPattern => {
          var found = !1, normalized = normalizePattern(requestedPattern);
          normalized.hasVersion || latest || packagePatterns.forEach((packagePattern => {
            var packageNormalized = normalizePattern(packagePattern.pattern);
            packageNormalized.name === normalized.name && (normalized = packageNormalized);
          }));
          var newPattern = `${normalized.name}@${normalized.range}`;
          deps.forEach((dep => {
            normalized.hasVersion && dep.name === normalized.name && (found = !0, dep.upgradeTo = newPattern, 
            reporter.verbose(reporter.lang("verboseUpgradeBecauseRequested", requestedPattern, newPattern)));
          })), normalized.hasVersion && !found && (deps.push({
            name: normalized.name,
            wanted: "",
            latest: "",
            url: "",
            hint: "",
            range: "",
            current: "",
            upgradeTo: newPattern,
            workspaceName: "",
            workspaceLoc: ""
          }), reporter.verbose(reporter.lang("verboseUpgradeBecauseRequested", requestedPattern, newPattern)));
        }));
      }
      function buildPatternToUpgradeTo(dep, flags) {
        if ("exotic" === dep.latest) return `${dep.name}@${dep.url}`;
        var version, result, toLatest = flags.latest, toVersion = toLatest ? dep.latest : dep.range, rangeOperator = "";
        return toLatest && (flags.caret ? rangeOperator = "^" : flags.tilde ? rangeOperator = "~" : flags.exact ? rangeOperator = "" : (version = dep.range, 
        rangeOperator = (result = basicSemverOperatorRegex.exec(version)) ? result[1] || "" : "^")), 
        `${dep.name}@${rangeOperator}${toVersion}`;
      }
      function scopeFilter(flags, dep) {
        return !validScopeRegex.test(flags.scope) || dep.name.startsWith(flags.scope);
      }
      function cleanLockfile(lockfile, deps, packagePatterns, reporter) {
        function cleanDepFromLockfile(pattern, depth) {
          var lockManifest = lockfile.getLocked(pattern);
          if (!lockManifest || depth > 1 && packagePatterns.some((packagePattern => packagePattern.pattern === pattern))) reporter.verbose(reporter.lang("verboseUpgradeNotUnlocking", pattern)); else {
            var dependencies = Object.assign({}, lockManifest.dependencies || {}, lockManifest.optionalDependencies || {}), depPatterns = Object.keys(dependencies).map((key => `${key}@${dependencies[key]}`));
            reporter.verbose(reporter.lang("verboseUpgradeUnlocking", pattern)), lockfile.removePattern(pattern), 
            depPatterns.forEach((pattern => cleanDepFromLockfile(pattern, depth + 1)));
          }
        }
        deps.map((dep => dep.upgradeTo)).forEach((pattern => cleanDepFromLockfile(pattern, 1)));
      }
      function upgrade_setFlags(commander) {
        commander.description("Upgrades packages to their latest version based on the specified range."), 
        commander.usage("upgrade [flags]"), commander.option("-S, --scope <scope>", "upgrade packages under the specified scope"), 
        commander.option("-L, --latest", "list the latest version of packages, ignoring version ranges in package.json"), 
        commander.option("-E, --exact", "install exact version. Only used when --latest is specified."), 
        commander.option("-P, --pattern [pattern]", "upgrade packages that match pattern"), 
        commander.option("-T, --tilde", "install most recent release with the same minor version. Only used when --latest is specified."), 
        commander.option("-C, --caret", "install most recent release with the same major version. Only used when --latest is specified."), 
        commander.option("-A, --audit", "Run vulnerability audit on installed packages");
      }
      function upgrade_hasWrapper(commander, args) {
        return !0;
      }
      var upgrade_requireLockfile = !0;
      function upgrade_run() {
        return commands_upgrade_run.apply(this, arguments);
      }
      function commands_upgrade_run() {
        return commands_upgrade_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var addArgs = [], upgradeAll = 0 === args.length && void 0 === flags.scope && void 0 === flags.pattern, addFlags = Object.assign({}, flags, {
            force: !0,
            ignoreWorkspaceRootCheck: !0,
            workspaceRootIsCwd: config.cwd === config.lockfileFolder
          }), lockfile = yield Lockfile.fromDirectory(config.lockfileFolder, reporter), deps = yield getOutdated(config, reporter, flags, lockfile, args), install = new Install(flags, config, reporter, lockfile), packagePatterns = (yield install.fetchRequestFromCwd()).requests;
          setUserRequestedPackageVersions(deps, args, flags.latest, packagePatterns, reporter), 
          cleanLockfile(lockfile, deps, packagePatterns, reporter), addArgs = deps.map((dep => dep.upgradeTo)), 
          flags.scope && validScopeRegex.test(flags.scope) && (addArgs = addArgs.filter((depName => depName.startsWith(flags.scope))));
          var add = new Add(addArgs, addFlags, config, reporter, upgradeAll ? new Lockfile : lockfile);
          yield add.init();
        })), commands_upgrade_run.apply(this, arguments);
      }
      function getOutdated() {
        return _getOutdated.apply(this, arguments);
      }
      function _getOutdated() {
        return _getOutdated = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, lockfile, patterns) {
          var install = new Install(flags, config, reporter, lockfile), outdatedFieldName = flags.latest ? "latest" : "wanted";
          flags.latest || (flags.tilde = !1, flags.exact = !1, flags.caret = !1), flags.scope && (flags.scope.startsWith("@") || (flags.scope = "@" + flags.scope), 
          flags.scope.endsWith("/") || (flags.scope += "/"));
          var deps = (yield PackageRequest.getOutdatedPackages(lockfile, install, config, reporter, patterns, flags)).filter((function(dep) {
            return dep.current !== dep[outdatedFieldName];
          })).filter(scopeFilter.bind(this, flags));
          return deps.forEach((dep => {
            dep.upgradeTo = buildPatternToUpgradeTo(dep, flags), reporter.verbose(reporter.lang("verboseUpgradeBecauseOutdated", dep.name, dep.upgradeTo));
          })), deps;
        })), _getOutdated.apply(this, arguments);
      }
      var color_for_versions_semver = __webpack_require__(92878);
      function color_for_versions(from, to) {
        var validFrom = color_for_versions_semver.valid(from), validTo = color_for_versions_semver.valid(to), versionBump = "unknown";
        return validFrom && validTo && (versionBump = function(version1, version2) {
          if (!1 === semver_semver.eq(version1, version2)) {
            var v1 = semver_semver.parse(version1), v2 = semver_semver.parse(version2);
            if (null != v1 && null != v2) {
              var isPreRelease = v1.prerelease.length > 0 || v2.prerelease.length > 0, preMajor = 0 === v1.major || 0 === v2.major, preMinor = preMajor && (0 === v1.minor || 0 === v2.minor), diff = null;
              return v1.major !== v2.major ? diff = "major" : v1.minor !== v2.minor ? diff = preMajor ? "major" : "minor" : v1.patch !== v2.patch && (diff = preMinor ? "major" : preMajor ? "minor" : "patch"), 
              isPreRelease && (diff = null != diff ? PRE_RELEASES[diff] : "prerelease"), diff;
            }
          }
          return null;
        }(validFrom, validTo) || "unchanged"), VERSION_COLOR_SCHEME[versionBump];
      }
      function colorize_diff(from, to, reporter) {
        var parts = to.split("."), fromParts = from.split("."), splitIndex = parts.findIndex(((part, i) => part !== fromParts[i]));
        if (-1 === splitIndex) return from;
        var colorized = reporter.format.green(parts.slice(splitIndex).join("."));
        return parts.slice(0, splitIndex).concat(colorized).join(".");
      }
      var upgrade_interactive_inquirer = __webpack_require__(73446), upgrade_interactive_path = __webpack_require__(71017), upgrade_interactive_requireLockfile = !0;
      function upgrade_interactive_setFlags(commander) {
        commander.description("Provides an easy way to update outdated packages."), commander.usage("upgrade-interactive [flags]"), 
        commander.option("-S, --scope <scope>", "upgrade packages under the specified scope"), 
        commander.option("--latest", "list the latest version of packages, ignoring version ranges in package.json"), 
        commander.option("-E, --exact", "install exact version. Only used when --latest is specified."), 
        commander.option("-T, --tilde", "install most recent release with the same minor version. Only used when --latest is specified."), 
        commander.option("-C, --caret", "install most recent release with the same major version. Only used when --latest is specified.");
      }
      function upgrade_interactive_hasWrapper(commander, args) {
        return !0;
      }
      function upgrade_interactive_run() {
        return commands_upgrade_interactive_run.apply(this, arguments);
      }
      function commands_upgrade_interactive_run() {
        return commands_upgrade_interactive_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var outdatedFieldName = flags.latest ? "latest" : "wanted", lockfile = yield Lockfile.fromDirectory(config.lockfileFolder), deps = yield getOutdated(config, reporter, _extends({}, flags, {
            includeWorkspaceDeps: !0
          }), lockfile, args);
          if (0 !== deps.length) {
            var install = new Install(flags, config, reporter, lockfile);
            yield install.checkCompatibility();
            var usesWorkspaces = !!config.workspaceRootFolder, maxLengthArr = {
              name: "name".length,
              current: "from".length,
              range: "latest".length,
              [outdatedFieldName]: "to".length,
              workspaceName: "workspace".length
            }, keysWithDynamicLength = [ "name", "current", outdatedFieldName ];
            flags.latest || (maxLengthArr.range = "range".length, keysWithDynamicLength.push("range")), 
            usesWorkspaces && keysWithDynamicLength.push("workspaceName"), deps.forEach((dep => keysWithDynamicLength.forEach((key => {
              maxLengthArr[key] = Math.max(maxLengthArr[key], dep[key].length);
            }))));
            var headerPadding = (header, key) => `${reporter.format.bold.underline(header)}${" ".repeat(maxLengthArr[key] - header.length)}`, getNameFromHint = hint => hint ? `${hint}Dependencies` : "dependencies", makeRow = dep => {
              var from, to, padding = (dep => key => `${dep[key]}${" ".repeat(maxLengthArr[key] - dep[key].length)}`)(dep), name = (from = dep.current, 
              to = dep[outdatedFieldName], reporter.format[color_for_versions(from, to)])(padding("name")), current = reporter.format.blue(padding("current")), latest = colorize_diff(dep.current, padding(outdatedFieldName), reporter), url = reporter.format.cyan(dep.url), range = reporter.format.blue(flags.latest ? "latest" : padding("range"));
              return usesWorkspaces ? `${name}  ${range}  ${current}  ❯  ${latest}  ${padding("workspaceName")}  ${url}` : `${name}  ${range}  ${current}  ❯  ${latest}  ${url}`;
            }, makeHeaderRow = () => {
              var name = headerPadding("name", "name"), range = headerPadding("range", "range"), from = headerPadding("from", "current"), to = headerPadding("to", outdatedFieldName), url = reporter.format.bold.underline("url");
              return usesWorkspaces ? `  ${name}  ${range}  ${from}     ${to}  ${headerPadding("workspace", "workspaceName")}  ${url}` : `  ${name}  ${range}  ${from}     ${to}  ${url}`;
            }, groupedDeps = deps.reduce(((acc, dep) => {
              var hint = dep.hint, name = dep.name, upgradeTo = dep.upgradeTo, version = dep[outdatedFieldName], key = getNameFromHint(hint), xs = acc[key] || [];
              return acc[key] = xs.concat({
                name: makeRow(dep),
                value: dep,
                short: `${name}@${version}`,
                upgradeTo: upgradeTo
              }), acc;
            }), {}), flatten = xs => xs.reduce(((ys, y) => ys.concat(Array.isArray(y) ? flatten(y) : y)), []), choices = flatten(Object.keys(groupedDeps).map((key => [ new upgrade_interactive_inquirer.Separator(reporter.format.bold.underline.green(key)), new upgrade_interactive_inquirer.Separator(makeHeaderRow()), groupedDeps[key], new upgrade_interactive_inquirer.Separator(" ") ])));
            try {
              var red = reporter.format.red("<red>"), yellow = reporter.format.yellow("<yellow>"), green = reporter.format.green("<green>");
              reporter.info(reporter.lang("legendColorsForVersionUpdates", red, yellow, green));
              var answers = yield reporter.prompt("Choose which packages to update.", choices, {
                name: "packages",
                type: "checkbox",
                validate: answer => !!answer.length || "You must choose at least one package."
              }), getPattern = _ref => _ref.upgradeTo, isHint = x => _ref2 => _ref2.hint === x;
              for (var hint of [ null, "dev", "optional", "peer" ]) {
                flags.dev = "dev" === hint, flags.peer = "peer" === hint, flags.optional = "optional" === hint, 
                flags.ignoreWorkspaceRootCheck = !0, flags.includeWorkspaceDeps = !1, flags.workspaceRootIsCwd = !1;
                var _deps = answers.filter(isHint(hint));
                if (_deps.length) {
                  var _install = new Install(flags, config, reporter, lockfile), packagePatterns = (yield _install.fetchRequestFromCwd()).requests, depsByWorkspace = _deps.reduce(((acc, dep) => {
                    var workspaceLoc = dep.workspaceLoc, xs = acc[workspaceLoc] || [];
                    return acc[workspaceLoc] = xs.concat(dep), acc;
                  }), {}), cwd = config.cwd;
                  for (var loc of Object.keys(depsByWorkspace)) {
                    var patterns = depsByWorkspace[loc].map(getPattern);
                    cleanLockfile(lockfile, _deps, packagePatterns, reporter), reporter.info(reporter.lang("updateInstalling", getNameFromHint(hint))), 
                    "" !== loc && (config.cwd = upgrade_interactive_path.resolve(upgrade_interactive_path.dirname(loc)));
                    var add = new Add(patterns, flags, config, reporter, lockfile);
                    yield add.init(), config.cwd = cwd;
                  }
                }
              }
            } catch (e) {
              Promise.reject(e);
            }
          } else reporter.success(reporter.lang("allDependenciesUpToDate"));
        })), commands_upgrade_interactive_run.apply(this, arguments);
      }
      class GlobalAdd extends Add {
        constructor(args, flags, config, reporter, lockfile) {
          super(args, flags, config, reporter, lockfile), this.linker.setTopLevelBinLinking(!1);
        }
        maybeOutputSaveTree() {
          for (var pattern of this.addedPatterns) {
            ls(this.resolver.getStrictResolvedPattern(pattern), this.reporter, !0);
          }
          return Promise.resolve();
        }
        _logSuccessSaveLockfile() {}
      }
      var global_path = __webpack_require__(71017);
      function global_hasWrapper(flags, args) {
        return "bin" !== args[0] && "dir" !== args[0];
      }
      function updateCwd() {
        return _updateCwd.apply(this, arguments);
      }
      function _updateCwd() {
        return (_updateCwd = asyncToGenerator_asyncToGenerator((function*(config) {
          yield mkdirp(config.globalFolder), yield config.init({
            cwd: config.globalFolder,
            offline: config.offline,
            binLinks: !0,
            globalFolder: config.globalFolder,
            cacheFolder: config._cacheRootFolder,
            linkFolder: config.linkFolder,
            enableDefaultRc: config.enableDefaultRc,
            extraneousYarnrcFiles: config.extraneousYarnrcFiles
          });
        }))).apply(this, arguments);
      }
      function getBins() {
        return _getBins.apply(this, arguments);
      }
      function _getBins() {
        return (_getBins = asyncToGenerator_asyncToGenerator((function*(config) {
          var dirs = [];
          for (var registryName of Object.keys(registries)) {
            var registry = config.registries[registryName];
            dirs.push(registry.loc);
          }
          var paths = new Set;
          for (var dir of dirs) {
            var binDir = global_path.join(dir, ".bin");
            if (yield fs_exists(binDir)) for (var name of yield readdir(binDir)) paths.add(global_path.join(binDir, name));
          }
          return paths;
        }))).apply(this, arguments);
      }
      function global_getGlobalPrefix() {
        return _getGlobalPrefix.apply(this, arguments);
      }
      function _getGlobalPrefix() {
        return (_getGlobalPrefix = asyncToGenerator_asyncToGenerator((function*(config, flags) {
          if (flags.prefix) return flags.prefix;
          if (config.getOption("prefix", !0)) return String(config.getOption("prefix", !0));
          if (process.env.PREFIX) return process.env.PREFIX;
          var potentialPrefixFolders = [ FALLBACK_GLOBAL_PREFIX ];
          "win32" === process.platform ? process.env.LOCALAPPDATA && potentialPrefixFolders.unshift(global_path.join(process.env.LOCALAPPDATA, "Yarn")) : potentialPrefixFolders.unshift(POSIX_GLOBAL_PREFIX);
          var binFolders = potentialPrefixFolders.map((prefix => global_path.join(prefix, "bin"))), prefixFolderQueryResult = yield getFirstSuitableFolder(binFolders), prefix = prefixFolderQueryResult.folder && global_path.dirname(prefixFolderQueryResult.folder);
          return prefix || (config.reporter.warn(config.reporter.lang("noGlobalFolder", prefixFolderQueryResult.skipped.map((item => global_path.dirname(item.folder))).join(", "))), 
          FALLBACK_GLOBAL_PREFIX);
        }))).apply(this, arguments);
      }
      function getBinFolder() {
        return _getBinFolder.apply(this, arguments);
      }
      function _getBinFolder() {
        return (_getBinFolder = asyncToGenerator_asyncToGenerator((function*(config, flags) {
          var prefix = yield global_getGlobalPrefix(config, flags);
          return global_path.resolve(prefix, "bin");
        }))).apply(this, arguments);
      }
      function initUpdateBins() {
        return _initUpdateBins.apply(this, arguments);
      }
      function _initUpdateBins() {
        return (_initUpdateBins = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags) {
          var beforeBins = yield getBins(config), binFolder = yield getBinFolder(config, flags);
          function throwPermError(err, dest) {
            throw "EACCES" === err.code ? new MessageError(reporter.lang("noPermission", dest)) : err;
          }
          return asyncToGenerator_asyncToGenerator((function*() {
            try {
              yield mkdirp(binFolder);
            } catch (err) {
              throwPermError(err, binFolder);
            }
            var afterBins = yield getBins(config);
            for (var src of beforeBins) if (!afterBins.has(src)) {
              var dest = global_path.join(binFolder, global_path.basename(src));
              try {
                yield unlink(dest);
              } catch (err) {
                throwPermError(err, dest);
              }
            }
            for (var _src of afterBins) {
              var _dest = global_path.join(binFolder, global_path.basename(_src));
              try {
                yield unlink(_dest), yield linkBin(_src, _dest), "win32" === process.platform && -1 !== _dest.indexOf(".cmd") && (yield rename(_dest + ".cmd", _dest));
              } catch (err) {
                throwPermError(err, _dest);
              }
            }
          }));
        }))).apply(this, arguments);
      }
      function ls(manifest, reporter, saved) {
        var bins = manifest.bin ? Object.keys(manifest.bin) : [], human = `${manifest.name}@${manifest.version}`;
        bins.length ? (saved ? reporter.success(reporter.lang("packageInstalledWithBinaries", human)) : reporter.info(reporter.lang("packageHasBinaries", human)), 
        reporter.list(`bins-${manifest.name}`, bins)) : saved && reporter.warn(reporter.lang("packageHasNoBinaries", human));
      }
      function global_list() {
        return commands_global_list.apply(this, arguments);
      }
      function commands_global_list() {
        return commands_global_list = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          yield updateCwd(config);
          var lockfile = yield Lockfile.fromDirectory(config.cwd), install = new Install({}, config, new BaseReporter, lockfile), patterns = yield install.getFlattenedDeps();
          for (var pattern of patterns) {
            ls(install.resolver.getStrictResolvedPattern(pattern), reporter, !1);
          }
        })), commands_global_list.apply(this, arguments);
      }
      var global_buildSubCommands = _build_sub_commands("global", {
        add: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield updateCwd(config);
          var updateBins = yield initUpdateBins(config, reporter, flags);
          -1 !== args.indexOf("yarn") && reporter.warn(reporter.lang("packageContainsYarnAsGlobal"));
          var lockfile = yield Lockfile.fromDirectory(config.cwd), install = new GlobalAdd(args, flags, config, reporter, lockfile);
          yield install.init(), yield updateBins();
        }))(),
        bin: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          reporter.log(yield getBinFolder(config, flags), {
            force: !0
          });
        }))(),
        dir: (config, reporter, flags, args) => (reporter.log(config.globalFolder, {
          force: !0
        }), Promise.resolve()),
        ls: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          reporter.warn("`yarn global ls` is deprecated. Please use `yarn global list`."), 
          yield global_list(config, reporter, flags, args);
        }))(),
        list: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield global_list(config, reporter, flags, args);
        }))(),
        remove: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield updateCwd(config);
          var updateBins = yield initUpdateBins(config, reporter, flags);
          yield remove_run(config, reporter, flags, args), yield updateBins();
        }))(),
        upgrade: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield updateCwd(config);
          var updateBins = yield initUpdateBins(config, reporter, flags);
          yield upgrade_run(config, reporter, flags, args), yield updateBins();
        }))(),
        upgradeInteractive: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield updateCwd(config);
          var updateBins = yield initUpdateBins(config, reporter, flags);
          yield upgrade_interactive_run(config, reporter, flags, args), yield updateBins();
        }))()
      }), global_run = global_buildSubCommands.run, global_setFlags = global_buildSubCommands.setFlags;
      function commands_global_setFlags(commander) {
        global_setFlags(commander), commander.description("Installs packages globally on your operating system."), 
        commander.option("--prefix <prefix>", "bin prefix to use to install binaries"), 
        commander.option("--latest", "upgrade to the latest version of packages");
      }
      var create_path = __webpack_require__(71017);
      function create_setFlags(commander) {
        commander.description("Creates new projects from any create-* starter kits.");
      }
      function create_hasWrapper(commander, args) {
        return !0;
      }
      function parsePackageName(str) {
        if ("/" === str.charAt(0)) throw new Error(`Name should not start with "/", got "${str}"`);
        if ("." === str.charAt(0)) throw new Error(`Name should not start with ".", got "${str}"`);
        var parts = str.split("/"), isScoped = "@" === str.charAt(0);
        if (isScoped && "@" === parts[0]) throw new Error(`Scope should not be empty, got "${str}"`);
        var scope = isScoped ? parts[0] : "", name = parts[isScoped ? 1 : 0] || "", path = parts.slice(isScoped ? 2 : 1).join("/"), fullName = [ scope, name ].filter(Boolean).join("/"), full = [ scope, name, path ].filter(Boolean).join("/");
        return {
          fullName: fullName,
          name: name,
          scope: scope,
          path: path,
          full: full
        };
      }
      function coerceCreatePackageName(str) {
        var pkgNameObj = parsePackageName(str), coercedName = "" !== pkgNameObj.name ? `create-${pkgNameObj.name}` : "create";
        return _extends({}, pkgNameObj, {
          name: coercedName,
          fullName: [ pkgNameObj.scope, coercedName ].filter(Boolean).join("/"),
          full: [ pkgNameObj.scope, coercedName, pkgNameObj.path ].filter(Boolean).join("/")
        });
      }
      function create_run() {
        return commands_create_run.apply(this, arguments);
      }
      function commands_create_run() {
        return commands_create_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var builderName = args[0], rest = args.slice(1);
          if (!builderName) throw new MessageError(reporter.lang("invalidPackageName"));
          var _coerceCreatePackageN = coerceCreatePackageName(builderName), packageName = _coerceCreatePackageN.fullName, commandName = _coerceCreatePackageN.name, linkLoc = create_path.join(config.linkFolder, commandName);
          (yield fs_exists(linkLoc)) ? reporter.info(reporter.lang("linkUsing", packageName)) : yield global_run(config, reporter, {}, [ "add", packageName ]);
          var binFolder = yield getBinFolder(config, {}), command = create_path.resolve(binFolder, commandName), env = yield makeEnv("create", config.cwd, config);
          yield child_spawn(command, rest, {
            stdio: "inherit",
            shell: !0,
            env: env
          });
        })), commands_create_run.apply(this, arguments);
      }
      function exec_setFlags(commander) {}
      function exec_hasWrapper(commander, args) {
        return !0;
      }
      function exec_run() {
        return commands_exec_run.apply(this, arguments);
      }
      function commands_exec_run() {
        return commands_exec_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var env = yield makeEnv("exec", config.cwd, config);
          if (args.length < 1) throw new MessageError(reporter.lang("execMissingCommand"));
          var execName = args[0], rest = args.slice(1);
          yield child_spawn(execName, rest, {
            stdio: "inherit",
            env: env
          });
        })), commands_exec_run.apply(this, arguments);
      }
      function generate_lock_entry_hasWrapper(commander, args) {
        return !1;
      }
      function generate_lock_entry_run() {
        return commands_generate_lock_entry_run.apply(this, arguments);
      }
      function commands_generate_lock_entry_run() {
        return (commands_generate_lock_entry_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var manifest;
          if (!(manifest = flags.useManifest ? yield config.readJson(flags.useManifest) : yield config.readRootManifest()).name) throw new MessageError(reporter.lang("noName"));
          if (!manifest.version) throw new MessageError(reporter.lang("noVersion"));
          var entry = {
            name: manifest.name,
            version: manifest.version,
            resolved: flags.resolved,
            registry: flags.registry || manifest._registry,
            optionalDependencies: manifest.optionalDependencies,
            dependencies: manifest.dependencies
          }, pattern = flags.pattern || `${entry.name}@${entry.version}`;
          reporter.log(stringify({
            [pattern]: implodeEntry(pattern, entry)
          }));
        }))).apply(this, arguments);
      }
      function generate_lock_entry_setFlags(commander) {
        commander.description("Generates a lock file entry."), commander.option("--use-manifest <location>", "description"), 
        commander.option("--resolved <resolved>", "description"), commander.option("--registry <registry>", "description");
      }
      var generate_lock_entry_examples = [ "generate-lock-entry", "generate-lock-entry --use-manifest ./package.json", "generate-lock-entry --resolved local-file.tgz#hash" ], cli_aliases = {
        "upgrade-interactive": "upgradeInteractive",
        "generate-lock-entry": "generateLockEntry"
      }, help_chalk = __webpack_require__(48075);
      function help_hasWrapper(flags, args) {
        return !1;
      }
      function help_setFlags(commander) {
        commander.description("Displays help information.");
      }
      function help_run(config, reporter, commander, args) {
        if (args.length) {
          var commandName = args.shift();
          if (Object.prototype.hasOwnProperty.call(cli_commands, commandName)) {
            var command = cli_commands[commandName];
            if (command) {
              command.setFlags(commander);
              var examples = (command.examples || []).map((example => `    $ yarn ${example}`));
              return examples.length && commander.on("--help", (() => {
                reporter.log(reporter.lang("helpExamples", reporter.rawText(examples.join("\n"))));
              })), commander.on("--help", (() => reporter.log("  " + command.getDocsInfo + "\n"))), 
              commander.help(), Promise.resolve();
            }
          }
        }
        return commander.on("--help", (() => {
          var commandsText = [];
          for (var name of Object.keys(cli_commands).sort(sortAlpha)) cli_commands[name].useless || Object.keys(cli_aliases).map((key => cli_aliases[key])).indexOf(name) > -1 || (cli_aliases[name] ? commandsText.push(`    - ${hyphenate(name)} / ${cli_aliases[name]}`) : commandsText.push(`    - ${hyphenate(name)}`));
          reporter.log(reporter.lang("helpCommands", reporter.rawText(commandsText.join("\n")))), 
          reporter.log(reporter.lang("helpCommandsMore", reporter.rawText(help_chalk.bold("yarn help COMMAND")))), 
          reporter.log(reporter.lang("helpLearnMore", reporter.rawText(help_chalk.bold(YARN_DOCS))));
        })), commander.options.sort(sortOptionsByFlags), commander.help(), Promise.resolve();
      }
      var npmLogicalTree = __webpack_require__(24639);
      class LogicalDependencyTree {
        constructor(packageJson, packageLock) {
          this.tree = npmLogicalTree(JSON.parse(packageJson), JSON.parse(packageLock));
        }
        _findNode(name, parentNames) {
          var parentTree = parentNames ? parentNames.reduce(((node, ancestor) => node.dependencies.get(ancestor)), this.tree) : this.tree;
          return parentTree.dependencies.get(name);
        }
        getFixedVersionPattern(name, parentNames) {
          var node = this._findNode(name, parentNames), version = node.version;
          return `${node.name}@${version}`;
        }
      }
      var import_semver = __webpack_require__(92878), import_invariant = __webpack_require__(46128), import_path = __webpack_require__(71017), import_uuid = __webpack_require__(67730), import_ssri = __webpack_require__(44240), nodeVersion = process.versions.node.split("-")[0], import_noArguments = !0;
      class ImportResolver extends BaseResolver {
        getCwd() {
          if (this.request.parentRequest) {
            var parent = this.resolver.getStrictResolvedPattern(this.request.parentRequest.pattern);
            return import_invariant(parent._loc, "expected package location"), import_path.dirname(parent._loc);
          }
          return this.config.cwd;
        }
        resolveHostedGit(info, Resolver) {
          var exploded = explodeHostedGitFragment(normalizePattern(this.pattern).range, this.reporter), hash = info.gitHead;
          import_invariant(hash, "expected package gitHead");
          var url = Resolver.getTarballUrl(exploded, hash);
          return info._uid = hash, info._remote = {
            resolved: url,
            type: "tarball",
            registry: this.registry,
            reference: url,
            hash: null
          }, info;
        }
        resolveGist(info, Resolver) {
          var id = explodeGistFragment(normalizePattern(this.pattern).range, this.reporter).id, hash = info.gitHead;
          import_invariant(hash, "expected package gitHead");
          var url = `https://gist.github.com/${id}.git`;
          return info._uid = hash, info._remote = {
            resolved: `${url}#${hash}`,
            type: "git",
            registry: this.registry,
            reference: url,
            hash: hash
          }, info;
        }
        resolveGit(info, Resolver) {
          var url = info._resolved, hash = info.gitHead;
          return import_invariant(url, "expected package _resolved"), import_invariant(hash, "expected package gitHead"), 
          info._uid = hash, info._remote = {
            resolved: `${url}#${hash}`,
            type: "git",
            registry: this.registry,
            reference: url,
            hash: hash
          }, info;
        }
        resolveFile(info, Resolver) {
          var loc = removePrefix(normalizePattern(this.pattern).range, "file:");
          return import_path.isAbsolute(loc) || (loc = import_path.join(this.config.cwd, loc)), 
          info._uid = info.version, info._remote = {
            type: "copy",
            registry: this.registry,
            hash: `${import_uuid.v4()}-${(new Date).getTime()}`,
            reference: loc
          }, info;
        }
        resolveRegistry(info) {
          var url = info._resolved, hash = info._shasum;
          return import_invariant(url, "expected package _resolved"), import_invariant(hash, "expected package _shasum"), 
          this.config.getOption("registry") === YARN_REGISTRY && (url = url.replace(NPM_REGISTRY_RE, YARN_REGISTRY)), 
          info._uid = info.version, info._remote = {
            resolved: `${url}#${hash}`,
            type: "tarball",
            registry: this.registry,
            reference: url,
            integrity: info._integrity ? import_ssri.parse(info._integrity) : import_ssri.fromHex(hash, "sha1"),
            hash: hash
          }, info;
        }
        resolveImport(info) {
          var Resolver = getExoticResolver(normalizePattern(this.pattern).range);
          return Resolver && Resolver.prototype instanceof HostedGitResolver ? this.resolveHostedGit(info, Resolver) : Resolver && Resolver === GistResolver ? this.resolveGist(info, Resolver) : Resolver && Resolver === GitResolver ? this.resolveGit(info, Resolver) : Resolver && Resolver === FileResolver ? this.resolveFile(info, Resolver) : this.resolveRegistry(info);
        }
        resolveLocation(loc) {
          var _this = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var info = yield _this.config.tryManifest(loc, "npm", !1);
            return info ? _this.resolveImport(info) : null;
          }))();
        }
        resolveFixedVersion(fixedVersionPattern) {
          var _this2 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var range = normalizePattern(fixedVersionPattern).range, exoticResolver = getExoticResolver(range);
            return exoticResolver ? yield _this2.request.findExoticVersionInfo(exoticResolver, range) : yield _this2.request.findVersionOnRegistry(fixedVersionPattern);
          }))();
        }
        _resolveFromFixedVersions() {
          var _this3 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            import_invariant(_this3.request instanceof ImportPackageRequest, "request must be ImportPackageRequest");
            var name = normalizePattern(_this3.pattern).name;
            import_invariant(_this3.request.dependencyTree instanceof LogicalDependencyTree, "dependencyTree on request must be LogicalDependencyTree");
            var fixedVersionPattern = _this3.request.dependencyTree.getFixedVersionPattern(name, _this3.request.parentNames), info = yield _this3.config.getCache(`import-resolver-${fixedVersionPattern}`, (() => _this3.resolveFixedVersion(fixedVersionPattern)));
            if (info) return info;
            throw new MessageError(_this3.reporter.lang("importResolveFailed", name, _this3.getCwd()));
          }))();
        }
        _resolveFromNodeModules() {
          var _this4 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            for (var name = normalizePattern(_this4.pattern).name, cwd = _this4.getCwd(), _loop = function*() {
              var loc = import_path.join(cwd, "node_modules", name), info = yield _this4.config.getCache(`import-resolver-${loc}`, (() => _this4.resolveLocation(loc)));
              if (info) return {
                v: info
              };
              cwd = import_path.resolve(cwd, "../..");
            }; !import_path.relative(_this4.config.cwd, cwd).startsWith(".."); ) {
              var _ret = yield* _loop();
              if ("object" == typeof _ret) return _ret.v;
            }
            throw new MessageError(_this4.reporter.lang("importResolveFailed", name, _this4.getCwd()));
          }))();
        }
        resolve() {
          return this.request instanceof ImportPackageRequest && this.request.dependencyTree ? this._resolveFromFixedVersions() : this._resolveFromNodeModules();
        }
      }
      class ImportPackageRequest extends PackageRequest {
        constructor(req, dependencyTree, resolver) {
          super(req, resolver), this.import = !(this.parentRequest instanceof ImportPackageRequest) || this.parentRequest.import, 
          this.dependencyTree = dependencyTree;
        }
        getRootName() {
          return this.resolver instanceof ImportPackageResolver && this.resolver.rootName || "root";
        }
        getParentHumanName() {
          return [ this.getRootName() ].concat(this.parentNames).join(" > ");
        }
        reportResolvedRangeMatch(info, resolved) {
          info.version !== resolved.version && this.reporter.warn(this.reporter.lang("importResolvedRangeMatch", resolved.version, resolved.name, info.version, this.getParentHumanName()));
        }
        _findResolvedManifest(info) {
          var _normalizePattern8 = normalizePattern(this.pattern), range = _normalizePattern8.range, name = _normalizePattern8.name, solvedRange = import_semver.validRange(range) ? info.version : range, resolved = this.resolver.getExactVersionMatch(name, solvedRange, info);
          if (resolved) return resolved;
          import_invariant(info._remote, "expected package remote");
          var ref = new PackageReference(this, info, info._remote);
          return info._reference = ref, info;
        }
        resolveToExistingVersion(info) {
          var resolved = this._findResolvedManifest(info);
          import_invariant(resolved, "should have found a resolved reference");
          var ref = resolved._reference;
          import_invariant(ref, "should have a package reference"), ref.addRequest(this), 
          ref.addPattern(this.pattern, resolved), ref.addOptional(this.optional);
        }
        findVersionInfo() {
          return this.import ? new ImportResolver(this, this.pattern).resolve().catch((() => (this.import = !1, 
          this.reporter.warn(this.reporter.lang("importFailed", this.pattern, this.getParentHumanName())), 
          super.findVersionInfo()))) : (this.reporter.verbose(this.reporter.lang("skippingImport", this.pattern, this.getParentHumanName())), 
          super.findVersionInfo());
        }
      }
      class ImportPackageResolver extends PackageResolver {
        constructor(config, lockfile) {
          super(config, lockfile), this.next = [], this.rootName = "root";
        }
        find(req) {
          return this.next.push(req), Promise.resolve();
        }
        findOne(req) {
          var _this5 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            _this5.activity && _this5.activity.tick(req.pattern);
            var request = new ImportPackageRequest(req, _this5.dependencyTree, _this5);
            yield request.find({
              fresh: !1
            });
          }))();
        }
        findAll(deps) {
          var _this6 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            yield Promise.all(deps.map((dep => _this6.findOne(dep)))), deps = _this6.next, _this6.next = [], 
            deps.length ? yield _this6.findAll(deps) : _this6.resolvePackagesWithExistingVersions();
          }))();
        }
        resetOptional() {
          for (var pattern in this.patterns) {
            var ref = this.patterns[pattern]._reference;
            for (var req of (import_invariant(ref, "expected reference"), ref.optional = null, 
            ref.requests)) ref.addOptional(req.optional);
          }
        }
        init(deps, _temp) {
          var _this7 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            var _ref = void 0 === _temp ? {
              isFlat: !1,
              isFrozen: !1,
              workspaceLayout: void 0
            } : _temp, isFlat = _ref.isFlat;
            _ref.isFrozen, _ref.workspaceLayout;
            _this7.flat = Boolean(isFlat);
            var activity = _this7.activity = _this7.reporter.activity();
            yield _this7.findAll(deps), _this7.resetOptional(), activity.end(), _this7.activity = null;
          }))();
        }
      }
      class Import extends Install {
        constructor(flags, config, reporter, lockfile) {
          super(flags, config, reporter, lockfile), this.resolver = new ImportPackageResolver(this.config, this.lockfile), 
          this.linker = new PackageLinker(config, this.resolver);
        }
        createLogicalDependencyTree(packageJson, packageLock) {
          import_invariant(packageJson, "package.json should exist"), import_invariant(packageLock, "package-lock.json should exist"), 
          import_invariant(this.resolver instanceof ImportPackageResolver, "resolver should be an ImportPackageResolver");
          try {
            this.resolver.dependencyTree = new LogicalDependencyTree(packageJson, packageLock);
          } catch (e) {
            throw new MessageError(this.reporter.lang("importSourceFilesCorrupted"));
          }
        }
        getExternalLockfileContents() {
          var _this8 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            try {
              var _yield$Promise$all = yield Promise.all([ readFile(import_path.join(_this8.config.cwd, "package.json")), readFile(import_path.join(_this8.config.cwd, "package-lock.json")) ]);
              return {
                packageJson: _yield$Promise$all[0],
                packageLock: _yield$Promise$all[1]
              };
            } catch (e) {
              return {
                packageJson: null,
                packageLock: null
              };
            }
          }))();
        }
        init() {
          var _this9 = this;
          return asyncToGenerator_asyncToGenerator((function*() {
            if (yield fs_exists(import_path.join(_this9.config.cwd, "yarn.lock"))) throw new MessageError(_this9.reporter.lang("lockfileExists"));
            var _yield$_this9$getExte = yield _this9.getExternalLockfileContents(), packageJson = _yield$_this9$getExte.packageJson, packageLock = _yield$_this9$getExte.packageLock, importSource = packageJson && packageLock && import_semver.satisfies(nodeVersion, ">=5.0.0") ? "package-lock.json" : "node_modules";
            "package-lock.json" === importSource && (_this9.reporter.info(_this9.reporter.lang("importPackageLock")), 
            _this9.createLogicalDependencyTree(packageJson, packageLock)), "node_modules" === importSource && (_this9.reporter.info(_this9.reporter.lang("importNodeModules")), 
            yield verifyTreeCheck(_this9.config, _this9.reporter, {}, []));
            var _yield$_this9$fetchRe = yield _this9.fetchRequestFromCwd(), requests = _yield$_this9$fetchRe.requests, patterns = _yield$_this9$fetchRe.patterns, manifest = _yield$_this9$fetchRe.manifest;
            manifest.name && _this9.resolver instanceof ImportPackageResolver && (_this9.resolver.rootName = manifest.name), 
            yield _this9.resolver.init(requests, {
              isFlat: _this9.flags.flat,
              isFrozen: _this9.flags.frozenLockfile
            });
            var manifests = yield fetch(_this9.resolver.getManifests(), _this9.config);
            return _this9.resolver.updateManifests(manifests), yield check(_this9.resolver.getManifests(), _this9.config, _this9.flags.ignoreEngines), 
            yield _this9.linker.resolvePeerModules(), yield _this9.saveLockfileAndIntegrity(patterns), 
            patterns;
          }))();
        }
      }
      function import_setFlags(commander) {
        commander.description("Generates yarn.lock from an npm package-lock.json file or an existing npm-installed node_modules folder.");
      }
      function import_hasWrapper(commander, args) {
        return !0;
      }
      function import_run() {
        return commands_import_run.apply(this, arguments);
      }
      function commands_import_run() {
        return (commands_import_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var imp = new Import(flags, config, reporter, new Lockfile({
            cache: {}
          }));
          yield imp.init();
        }))).apply(this, arguments);
      }
      var PKG_INPUT = /(^\S?[^\s@]+)(?:@(\S+))?$/;
      function parse_package_name_parsePackageName(input) {
        var _PKG_INPUT$exec = PKG_INPUT.exec(input);
        return {
          name: _PKG_INPUT$exec[1],
          version: _PKG_INPUT$exec[2]
        };
      }
      var info_semver = __webpack_require__(92878);
      function info_clean(object) {
        if (Array.isArray(object)) {
          var result = [];
          return object.forEach((item => {
            (item = info_clean(item)) && result.push(item);
          })), result;
        }
        if ("object" == typeof object) {
          var _result = {};
          for (var key in object) if (!key.startsWith("_")) {
            var item = info_clean(object[key]);
            item && (_result[key] = item);
          }
          return _result;
        }
        return object || null;
      }
      function info_setFlags(commander) {
        commander.description("Shows information about a package.");
      }
      function info_hasWrapper(commander, args) {
        return !0;
      }
      function info_run() {
        return commands_info_run.apply(this, arguments);
      }
      function commands_info_run() {
        return (commands_info_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (args.length > 2) reporter.error(reporter.lang("tooManyArguments", 2)); else {
            var packageName = args.shift() || ".";
            "." === packageName && (packageName = (yield config.readRootManifest()).name);
            var result, _parsePackageName = parse_package_name_parsePackageName(NpmRegistry.escapeName(packageName)), name = _parsePackageName.name, version = _parsePackageName.version;
            try {
              result = yield config.registries.npm.request(name, {
                unfiltered: !0
              });
            } catch (e) {
              return void reporter.error(reporter.lang("infoFail"));
            }
            if (result) {
              var versions = (result = info_clean(result)).versions;
              result.versions = Object.keys(versions).sort(info_semver.compareLoose), result.version = version || result["dist-tags"].latest, 
              result = Object.assign(result, versions[result.version]);
              var fieldPath = args.shift(), fields = fieldPath ? fieldPath.split(".") : [];
              "readme" !== fields[0] && delete result.readme, result = fields.reduce(((prev, cur) => prev && prev[cur]), result), 
              reporter.inspect(result);
            } else reporter.error(reporter.lang("infoFail"));
          }
        }))).apply(this, arguments);
      }
      var init_objectPath = __webpack_require__(31528), init_path = __webpack_require__(71017), yn = __webpack_require__(30590);
      function init_setFlags(commander) {
        commander.description("Interactively creates or updates a package.json file."), 
        commander.option("-y, --yes", "use default options"), commander.option("-p, --private", "use default options and private true"), 
        commander.option("-i, --install <value>", "install a specific Yarn release"), commander.option("-2", "generates the project using Yarn 2");
      }
      function init_hasWrapper(commander, args) {
        return !0;
      }
      var shouldRunInCurrentCwd = !0;
      function init_run() {
        return commands_init_run.apply(this, arguments);
      }
      function commands_init_run() {
        return commands_init_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var installVersion = flags[2] ? "berry" : flags.install, forwardedArgs = process.argv.slice(process.argv.indexOf("init", 2) + 1);
          if (installVersion) if (flags[2] && process.env.COREPACK_ROOT) yield child_spawn(NODE_BIN_PATH, [ init_path.join(process.env.COREPACK_ROOT, "dist/corepack.js"), `yarn@${flags.install || "stable"}`, "init" ].concat(forwardedArgs, [ "--install=self" ]), {
            stdio: "inherit",
            cwd: config.cwd
          }); else {
            var lockfilePath = init_path.resolve(config.cwd, "yarn.lock");
            (yield fs_exists(lockfilePath)) || (yield writeFile(lockfilePath, "")), yield child_spawn(NODE_BIN_PATH, [ process.argv[1], "policies", "set-version", installVersion, "--silent" ], {
              stdio: "inherit",
              cwd: config.cwd
            }), yield child_spawn(NODE_BIN_PATH, [ process.argv[1], "init" ].concat(forwardedArgs), {
              stdio: "inherit",
              cwd: config.cwd
            });
          } else {
            var manifests = yield config.getRootManifests(), repository = {}, author = {
              name: config.getOption("init-author-name"),
              email: config.getOption("init-author-email"),
              url: config.getOption("init-author-url")
            };
            if (yield fs_exists(init_path.join(config.cwd, ".git"))) {
              try {
                repository = {
                  type: "git",
                  url: yield child_spawn("git", [ "config", "remote.origin.url" ], {
                    cwd: config.cwd
                  })
                };
              } catch (ex) {}
              void 0 === author.name && (author.name = yield getGitConfigInfo("user.name")), void 0 === author.email && (author.email = yield getGitConfigInfo("user.email"));
            }
            var keys = [ {
              key: "name",
              question: "name",
              default: init_path.basename(config.cwd),
              validation: isValidPackageName,
              validationError: "invalidPackageName"
            }, {
              key: "version",
              question: "version",
              default: String(config.getOption("init-version"))
            }, {
              key: "description",
              question: "description",
              default: ""
            }, {
              key: "main",
              question: "entry point",
              default: "index.js"
            }, {
              key: "repository",
              question: "repository url",
              default: extractRepositoryUrl(repository)
            }, {
              key: "author",
              question: "author",
              default: stringifyPerson(author)
            }, {
              key: "license",
              question: "license",
              default: String(config.getOption("init-license"))
            }, {
              key: "private",
              question: "private",
              default: config.getOption("init-private") || "",
              inputFormatter: yn
            } ], pkg = {};
            for (var entry of keys) {
              var yes = flags.yes, privateFlag = flags.private, manifestKey = entry.key, question = entry.question, def = entry.default;
              for (var registryName of registryNames) {
                var object = manifests[registryName].object, val = init_objectPath.get(object, manifestKey);
                if (!val) break;
                "object" == typeof val && ("author" === manifestKey ? val = stringifyPerson(val) : "repository" === manifestKey && (val = extractRepositoryUrl(val))), 
                def = val;
              }
              "private" === manifestKey && privateFlag && (def = !0), def && (question += ` (${String(def)})`);
              var answer = void 0, validAnswer = !1;
              if (yes) answer = def; else if (entry.validation) for (;!validAnswer; ) answer = (yield reporter.question(question)) || def, 
              entry.validation(String(answer)) ? validAnswer = !0 : reporter.error(reporter.lang("invalidPackageName")); else answer = (yield reporter.question(question)) || def;
              answer && (entry.inputFormatter && (answer = entry.inputFormatter(answer)), init_objectPath.set(pkg, manifestKey, answer));
            }
            pkg.repository && GitHubResolver.isVersion(pkg.repository) && (pkg.repository = `https://github.com/${pkg.repository}`);
            var targetManifests = [];
            for (var _registryName of registryNames) {
              var info = manifests[_registryName];
              info.exists && targetManifests.push(info);
            }
            for (var targetManifest of (targetManifests.length || targetManifests.push(manifests.npm), 
            targetManifests)) Object.assign(targetManifest.object, pkg), reporter.success(`Saved ${init_path.basename(targetManifest.loc)}`);
            yield config.saveRootManifests(manifests);
          }
        })), commands_init_run.apply(this, arguments);
      }
      function getGitConfigInfo() {
        return _getGitConfigInfo.apply(this, arguments);
      }
      function _getGitConfigInfo() {
        return _getGitConfigInfo = asyncToGenerator_asyncToGenerator((function*(credential, spawn) {
          void 0 === spawn && (spawn = child_spawn);
          try {
            return yield spawn("git", [ "config", credential ]);
          } catch (e) {
            return "";
          }
        })), _getGitConfigInfo.apply(this, arguments);
      }
      var licenses_invariant = __webpack_require__(46128);
      function licenses_hasWrapper(flags, args) {
        return "generate-disclaimer" != args[0];
      }
      function getManifests() {
        return _getManifests.apply(this, arguments);
      }
      function _getManifests() {
        return _getManifests = asyncToGenerator_asyncToGenerator((function*(config, flags) {
          var lockfile = yield Lockfile.fromDirectory(config.cwd), install = new Install(_extends({
            skipIntegrityCheck: !0
          }, flags), config, new BaseReporter, lockfile);
          yield install.hydrate(!0);
          var manifests = install.resolver.getManifests();
          return manifests = (manifests = manifests.sort((function(a, b) {
            return a.name || b.name ? a.name ? b.name ? a.name.localeCompare(b.name) : -1 : 1 : 0;
          }))).filter((manifest => {
            var ref = manifest._reference;
            return !!ref && !ref.ignore;
          }));
        })), _getManifests.apply(this, arguments);
      }
      function licenses_list() {
        return commands_licenses_list.apply(this, arguments);
      }
      function commands_licenses_list() {
        return commands_licenses_list = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var manifests = yield getManifests(config, flags), manifestsByLicense = new Map;
          for (var _ref3 of manifests) {
            var name = _ref3.name, version = _ref3.version, license = _ref3.license, repository = _ref3.repository, homepage = _ref3.homepage, author = _ref3.author, licenseKey = license || "UNKNOWN", url = repository ? repository.url : homepage, vendorUrl = homepage || author && author.url, vendorName = author && author.name;
            manifestsByLicense.has(licenseKey) || manifestsByLicense.set(licenseKey, new Map);
            var byLicense = manifestsByLicense.get(licenseKey);
            licenses_invariant(byLicense, "expected value"), byLicense.set(`${name}@${version}`, {
              name: name,
              version: version,
              url: url,
              vendorUrl: vendorUrl,
              vendorName: vendorName
            });
          }
          if (flags.json) {
            var body = [];
            manifestsByLicense.forEach(((license, licenseKey) => {
              license.forEach((_ref4 => {
                var name = _ref4.name, version = _ref4.version, url = _ref4.url, vendorUrl = _ref4.vendorUrl, vendorName = _ref4.vendorName;
                body.push([ name, version, licenseKey, url || "Unknown", vendorUrl || "Unknown", vendorName || "Unknown" ]);
              }));
            })), reporter.table([ "Name", "Version", "License", "URL", "VendorUrl", "VendorName" ], body);
          } else {
            var trees = [];
            manifestsByLicense.forEach(((license, licenseKey) => {
              var licenseTree = [];
              license.forEach((_ref5 => {
                var name = _ref5.name, version = _ref5.version, url = _ref5.url, vendorUrl = _ref5.vendorUrl, vendorName = _ref5.vendorName, children = [];
                url && children.push({
                  name: `${reporter.format.bold("URL:")} ${url}`
                }), vendorUrl && children.push({
                  name: `${reporter.format.bold("VendorUrl:")} ${vendorUrl}`
                }), vendorName && children.push({
                  name: `${reporter.format.bold("VendorName:")} ${vendorName}`
                }), licenseTree.push({
                  name: `${name}@${version}`,
                  children: children
                });
              })), trees.push({
                name: licenseKey,
                children: licenseTree
              });
            })), reporter.tree("licenses", trees, {
              force: !0
            });
          }
        })), commands_licenses_list.apply(this, arguments);
      }
      function licenses_setFlags(commander) {
        commander.description("Lists licenses for installed packages.");
      }
      var licenses_buildSubCommands = _build_sub_commands("licenses", {
        ls: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          reporter.warn("`yarn licenses ls` is deprecated. Please use `yarn licenses list`."), 
          yield licenses_list(config, reporter, flags, args);
        }))(),
        list: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield licenses_list(config, reporter, flags, args);
        }))(),
        generateDisclaimer: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          var manifests = yield getManifests(config, flags), manifest = yield config.readRootManifest(), manifestsByLicense = new Map;
          for (var _manifest of manifests) {
            var licenseText = _manifest.licenseText, noticeText = _manifest.noticeText, licenseKey = void 0;
            if (licenseText) {
              licenseKey = noticeText ? `${licenseText}\n\nNOTICE\n\n${noticeText}` : licenseText, 
              manifestsByLicense.has(licenseKey) || manifestsByLicense.set(licenseKey, new Map);
              var byLicense = manifestsByLicense.get(licenseKey);
              licenses_invariant(byLicense, "expected value"), byLicense.set(_manifest.name, _manifest);
            }
          }
          for (var _ref of (console.log(`THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THE ${String(manifest.name).toUpperCase().replace(/-/g, " ")} PRODUCT.`), 
          console.log(), manifestsByLicense)) {
            var _licenseKey = _ref[0], _manifests = _ref[1];
            console.log("-----"), console.log();
            var names = [], urls = [];
            for (var _ref2 of _manifests) {
              var name = _ref2[0], repository = _ref2[1].repository;
              names.push(name), repository && repository.url && urls.push(1 === _manifests.size ? repository.url : `${repository.url} (${name})`);
            }
            var heading = [];
            heading.push(`The following software may be included in this product: ${names.join(", ")}.`), 
            urls.length > 0 && heading.push(`A copy of the source code may be downloaded from ${urls.join(", ")}.`), 
            heading.push("This software contains the following license and notice below:"), 
            console.log(heading.join(" ")), console.log(), _licenseKey && console.log(_licenseKey.trim()), 
            console.log();
          }
        }))()
      }), licenses_run = licenses_buildSubCommands.run, licenses_examples = licenses_buildSubCommands.examples, link_invariant = __webpack_require__(46128), link_cmdShim = __webpack_require__(28450), link_path = __webpack_require__(71017);
      function getRegistryFolder() {
        return _getRegistryFolder.apply(this, arguments);
      }
      function _getRegistryFolder() {
        return (_getRegistryFolder = asyncToGenerator_asyncToGenerator((function*(config, name) {
          if (config.modulesFolder) return config.modulesFolder;
          var src = link_path.join(config.linkFolder, name), _registry = (yield config.readManifest(src))._registry;
          link_invariant(_registry, "expected registry");
          var registryFolder = config.registries[_registry].folder;
          return link_path.join(config.cwd, registryFolder);
        }))).apply(this, arguments);
      }
      function link_hasWrapper(commander, args) {
        return !0;
      }
      function link_setFlags(commander) {
        commander.description("Symlink a package folder during development.");
      }
      function link_run() {
        return commands_link_run.apply(this, arguments);
      }
      function commands_link_run() {
        return (commands_link_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (args.length) for (var name of args) {
            var src = link_path.join(config.linkFolder, name);
            if (!(yield fs_exists(src))) throw new MessageError(reporter.lang("linkMissing", name));
            var folder = yield getRegistryFolder(config, name), dest = link_path.join(folder, name);
            yield unlink(dest), yield mkdirp(link_path.dirname(dest)), yield symlink(src, dest), 
            reporter.success(reporter.lang("linkUsing", name));
          } else {
            var manifest = yield config.readRootManifest(), _name = manifest.name;
            if (!_name) throw new MessageError(reporter.lang("unknownPackageName"));
            var linkLoc = link_path.join(config.linkFolder, _name);
            if (yield fs_exists(linkLoc)) reporter.warn(reporter.lang("linkCollision", _name)); else {
              if (yield mkdirp(link_path.dirname(linkLoc)), yield symlink(config.cwd, linkLoc), 
              manifest.bin) {
                var globalBinFolder = yield getBinFolder(config, flags);
                for (var binName in manifest.bin) {
                  var binSrc = manifest.bin[binName], binSrcLoc = link_path.join(linkLoc, binSrc), binDestLoc = link_path.join(globalBinFolder, binName);
                  (yield fs_exists(binDestLoc)) ? reporter.warn(reporter.lang("binLinkCollision", binName)) : "win32" === process.platform ? yield link_cmdShim(binSrcLoc, binDestLoc, {
                    createPwshFile: !1
                  }) : yield symlink(binSrcLoc, binDestLoc);
                }
              }
              reporter.success(reporter.lang("linkRegistered", _name)), reporter.info(reporter.lang("linkRegisteredMessage", _name));
            }
          }
        }))).apply(this, arguments);
      }
      function logout_setFlags(commander) {
        commander.description("Clears registry username and email.");
      }
      function logout_hasWrapper(commander, args) {
        return !0;
      }
      function logout_run() {
        return commands_logout_run.apply(this, arguments);
      }
      function commands_logout_run() {
        return (commands_logout_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          yield config.registries.yarn.saveHomeConfig({
            username: void 0,
            email: void 0
          }), reporter.success(reporter.lang("clearedCredentials"));
        }))).apply(this, arguments);
      }
      function node_setFlags(commander) {
        commander.description("Runs Node with the same version that the one used by Yarn itself, and by default from the project root"), 
        commander.usage("node [--into PATH] [... args]"), commander.option("--into <path>", "Sets the cwd to the specified location");
      }
      function node_hasWrapper(commander, args) {
        return !0;
      }
      function node_run() {
        return commands_node_run.apply(this, arguments);
      }
      function commands_node_run() {
        return (commands_node_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var pnpPath = `${config.lockfileFolder}/.pnp.js`, nodeOptions = process.env.NODE_OPTIONS || "";
          (yield fs_exists(pnpPath)) && (nodeOptions = `--require ${pnpPath} ${nodeOptions}`);
          try {
            yield child_spawn(NODE_BIN_PATH, args, {
              stdio: "inherit",
              cwd: flags.into || config.cwd,
              env: _extends({}, process.env, {
                NODE_OPTIONS: nodeOptions
              })
            });
          } catch (err) {
            throw err;
          }
        }))).apply(this, arguments);
      }
      var outdated_requireLockfile = !0;
      function outdated_setFlags(commander) {
        commander.description("Checks for outdated package dependencies."), commander.usage("outdated [packages ...]");
      }
      function outdated_hasWrapper(commander, args) {
        return !0;
      }
      function outdated_run() {
        return commands_outdated_run.apply(this, arguments);
      }
      function commands_outdated_run() {
        return commands_outdated_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var lockfile = yield Lockfile.fromDirectory(config.lockfileFolder), install = new Install(_extends({}, flags, {
            includeWorkspaceDeps: !0
          }), config, reporter, lockfile), deps = yield PackageRequest.getOutdatedPackages(lockfile, install, config, reporter);
          if (args.length) {
            var requested = new Set(args);
            deps = deps.filter((_ref => {
              var name = _ref.name;
              return requested.has(name);
            }));
          }
          if (deps.length) {
            var usesWorkspaces = !!config.workspaceRootFolder, body = deps.map((info => {
              var hint, _ref2, current, latest, name, row = [ (_ref2 = info, current = _ref2.current, 
              latest = _ref2.latest, name = _ref2.name, reporter.format[color_for_versions(current, latest)](name)), info.current, colorize_diff(info.current, info.wanted, reporter), reporter.format.cyan(info.latest), info.workspaceName || "", (hint = info.hint, 
              hint ? `${hint}Dependencies` : "dependencies"), reporter.format.cyan(info.url) ];
              return usesWorkspaces || row.splice(4, 1), row;
            })), red = reporter.format.red("<red>"), yellow = reporter.format.yellow("<yellow>"), green = reporter.format.green("<green>");
            reporter.info(reporter.lang("legendColorsForVersionUpdates", red, yellow, green));
            var header = [ "Package", "Current", "Wanted", "Latest", "Workspace", "Package Type", "URL" ];
            return usesWorkspaces || header.splice(4, 1), reporter.table(header, body), 1;
          }
          return 0;
        })), commands_outdated_run.apply(this, arguments);
      }
      function tag_getName() {
        return _getName.apply(this, arguments);
      }
      function _getName() {
        return (_getName = asyncToGenerator_asyncToGenerator((function*(args, config) {
          var name = args.shift();
          name || (name = (yield config.readRootManifest()).name);
          if (name) {
            if (!isValidPackageName(name)) throw new MessageError(config.reporter.lang("invalidPackageName"));
            return NpmRegistry.escapeName(name);
          }
          throw new MessageError(config.reporter.lang("unknownPackageName"));
        }))).apply(this, arguments);
      }
      function tag_list() {
        return commands_tag_list.apply(this, arguments);
      }
      function commands_tag_list() {
        return (commands_tag_list = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var name = yield tag_getName(args, config);
          reporter.step(1, 1, reporter.lang("gettingTags"));
          var tags = yield config.registries.npm.request(`-/package/${name}/dist-tags`);
          if (tags) for (var _name in reporter.info(`Package ${name}`), tags) reporter.info(`${_name}: ${tags[_name]}`);
          if (!tags) throw new MessageError(reporter.lang("packageNotFoundRegistry", name, "npm"));
        }))).apply(this, arguments);
      }
      function remove() {
        return _remove.apply(this, arguments);
      }
      function _remove() {
        return (_remove = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (2 !== args.length) return !1;
          var name = yield tag_getName(args, config), tag = args.shift();
          reporter.step(1, 3, reporter.lang("loggingIn"));
          var revoke = yield getToken(config, reporter, name);
          reporter.step(2, 3, reporter.lang("deletingTags"));
          var result = yield config.registries.npm.request(`-/package/${name}/dist-tags/${encodeURI(tag)}`, {
            method: "DELETE"
          });
          if (!1 === result ? reporter.error(reporter.lang("deletedTagFail")) : reporter.success(reporter.lang("deletedTag")), 
          reporter.step(3, 3, reporter.lang("revokingToken")), yield revoke(), !1 === result) throw new Error;
          return !0;
        }))).apply(this, arguments);
      }
      function tag_setFlags(commander) {
        commander.description("Add, remove, or list tags on a package.");
      }
      var tag_buildSubCommands = _build_sub_commands("tag", {
        add: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          if (2 !== args.length) return !1;
          var _normalizePattern = normalizePattern(args.shift()), name = _normalizePattern.name, range = _normalizePattern.range;
          if (!_normalizePattern.hasVersion) throw new MessageError(reporter.lang("requiredVersionInRange"));
          if (!isValidPackageName(name)) throw new MessageError(reporter.lang("invalidPackageName"));
          var tag = args.shift();
          reporter.step(1, 3, reporter.lang("loggingIn"));
          var revoke = yield getToken(config, reporter, name);
          reporter.step(2, 3, reporter.lang("creatingTag", tag, range));
          var result = yield config.registries.npm.request(`-/package/${NpmRegistry.escapeName(name)}/dist-tags/${encodeURI(tag)}`, {
            method: "PUT",
            body: range
          });
          if (null != result && result.ok ? reporter.success(reporter.lang("createdTag")) : reporter.error(reporter.lang("createdTagFail")), 
          reporter.step(3, 3, reporter.lang("revokingToken")), yield revoke(), null != result && result.ok) return !0;
          throw new Error;
        }))(),
        rm: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          reporter.warn("`yarn tag rm` is deprecated. Please use `yarn tag remove`."), yield remove(config, reporter, flags, args);
        }))(),
        remove: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield remove(config, reporter, flags, args);
        }))(),
        ls: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          reporter.warn("`yarn tag ls` is deprecated. Please use `yarn tag list`."), yield tag_list(config, reporter, flags, args);
        }))(),
        list: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield tag_list(config, reporter, flags, args);
        }))()
      }, [ "add <pkg>@<version> [<tag>]", "remove <pkg> <tag>", "list [<pkg>]" ]), tag_run = tag_buildSubCommands.run, tag_hasWrapper = tag_buildSubCommands.hasWrapper, tag_examples = tag_buildSubCommands.examples;
      function mutate() {
        return _mutate.apply(this, arguments);
      }
      function _mutate() {
        return (_mutate = asyncToGenerator_asyncToGenerator((function*(args, config, reporter, buildMessages, mutator) {
          if (2 !== args.length && 1 !== args.length) return !1;
          var username = args.shift(), name = yield tag_getName(args, config);
          if (!isValidPackageName(name)) throw new MessageError(reporter.lang("invalidPackageName"));
          var msgs = buildMessages(username, name);
          reporter.step(1, 3, reporter.lang("loggingIn"));
          var revoke = yield getToken(config, reporter, name);
          reporter.step(2, 3, msgs.info);
          var user = yield config.registries.npm.request(`-/user/org.couchdb.user:${username}`), error = !1;
          if (user) {
            var _pkg = yield config.registries.npm.request(NpmRegistry.escapeName(name));
            if (_pkg ? (_pkg.maintainers = _pkg.maintainers || [], error = mutator({
              name: user.name,
              email: user.email
            }, _pkg)) : (error = !0, reporter.error(reporter.lang("unknownPackage", name))), 
            _pkg && !error) {
              var res = yield config.registries.npm.request(`${NpmRegistry.escapeName(name)}/-rev/${_pkg._rev}`, {
                method: "PUT",
                body: {
                  _id: _pkg._id,
                  _rev: _pkg._rev,
                  maintainers: _pkg.maintainers
                }
              });
              null != res && res.success ? reporter.success(msgs.success) : (error = !0, reporter.error(msgs.error));
            }
          } else error = !0, reporter.error(reporter.lang("unknownUser", username));
          if (reporter.step(3, 3, reporter.lang("revokingToken")), yield revoke(), error) throw new Error;
          return !0;
        }))).apply(this, arguments);
      }
      function owner_list() {
        return commands_owner_list.apply(this, arguments);
      }
      function commands_owner_list() {
        return (commands_owner_list = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (args.length > 1) return !1;
          var name = yield tag_getName(args, config);
          reporter.step(1, 1, reporter.lang("ownerGetting", name));
          var pkg = yield config.registries.npm.request(name, {
            unfiltered: !0
          });
          if (pkg) {
            var owners = pkg.maintainers;
            if (owners && owners.length) for (var owner of owners) reporter.info(`${owner.name} <${owner.email}>`); else reporter.warn(reporter.lang("ownerNone"));
          } else reporter.error(reporter.lang("ownerGettingFailed"));
          if (pkg) return !0;
          throw new Error;
        }))).apply(this, arguments);
      }
      function owner_remove(config, reporter, flags, args) {
        return mutate(args, config, reporter, ((username, name) => ({
          info: reporter.lang("ownerRemoving", username, name),
          success: reporter.lang("ownerRemoved"),
          error: reporter.lang("ownerRemoveError")
        })), ((user, pkg) => {
          var found = !1;
          return pkg.maintainers = pkg.maintainers.filter((o => {
            var match = o.name === user.name;
            return found = found || match, !match;
          })), found || reporter.error(reporter.lang("userNotAnOwner", user.name)), found;
        }));
      }
      function owner_setFlags(commander) {
        commander.description("Manages package owners.");
      }
      var owner_buildSubCommands = _build_sub_commands("owner", {
        add: (config, reporter, flags, args) => mutate(args, config, reporter, ((username, name) => ({
          info: reporter.lang("ownerAdding", username, name),
          success: reporter.lang("ownerAdded"),
          error: reporter.lang("ownerAddingFailed")
        })), ((user, pkg) => {
          for (var owner of pkg.maintainers) if (owner.name === user) return reporter.error(reporter.lang("ownerAlready")), 
          !0;
          return pkg.maintainers.push(user), !1;
        })),
        rm: (config, reporter, flags, args) => (reporter.warn("`yarn owner rm` is deprecated. Please use `yarn owner remove`."), 
        owner_remove(config, reporter, 0, args)),
        remove: (config, reporter, flags, args) => owner_remove(config, reporter, 0, args),
        ls: (config, reporter, flags, args) => (reporter.warn("`yarn owner ls` is deprecated. Please use `yarn owner list`."), 
        owner_list(config, reporter, flags, args)),
        list: (config, reporter, flags, args) => owner_list(config, reporter, flags, args)
      }, [ "add <user> [[<@scope>/]<pkg>]", "remove <user> [[<@scope>/]<pkg>]", "list [<@scope>/]<pkg>" ]), owner_run = owner_buildSubCommands.run, owner_hasWrapper = owner_buildSubCommands.hasWrapper, owner_examples = owner_buildSubCommands.examples, readFileSync = __webpack_require__(57147).readFileSync, rc_path = __webpack_require__(71017), isWin = "win32" === process.platform, rc_home = isWin ? process.env.USERPROFILE : process.env.HOME;
      function findRc(name, cwd, parser) {
        return function(paths, parser) {
          return Object.assign.apply(Object, [ {} ].concat(paths.map((path => {
            try {
              return parser(readFileSync(path).toString(), path);
            } catch (error) {
              if ("ENOENT" === error.code || "EISDIR" === error.code) return {};
              throw error;
            }
          }))));
        }(function(name, cwd) {
          var configPaths = [];
          function pushConfigPath() {
            var segments = Array.prototype.slice.call(arguments, 0);
            configPaths.push(rc_path.join.apply(rc_path, segments)), segments[segments.length - 1] === `.${name}rc` && configPaths.push(rc_path.join.apply(rc_path, segments.slice(0, -1).concat([ `.${name}rc.yml` ])));
          }
          function unshiftConfigPath() {
            var segments = Array.prototype.slice.call(arguments, 0);
            segments[segments.length - 1] === `.${name}rc` && configPaths.unshift(rc_path.join.apply(rc_path, segments.slice(0, -1).concat([ `.${name}rc.yml` ]))), 
            configPaths.unshift(rc_path.join.apply(rc_path, segments));
          }
          for (isWin || (pushConfigPath("/etc", name, "config"), pushConfigPath("/etc", `${name}rc`)), 
          rc_home && (pushConfigPath(CONFIG_DIRECTORY), pushConfigPath(rc_home, ".config", name, "config"), 
          pushConfigPath(rc_home, ".config", name), pushConfigPath(rc_home, `.${name}`, "config"), 
          pushConfigPath(rc_home, `.${name}rc`)); ;) {
            unshiftConfigPath(cwd, `.${name}rc`);
            var upperCwd = rc_path.dirname(cwd);
            if (upperCwd === cwd) break;
            cwd = upperCwd;
          }
          var envVariable = `${name}_config`.toUpperCase();
          return process.env[envVariable] && pushConfigPath(process.env[envVariable]), configPaths;
        }(name, cwd), parser);
      }
      var src_rc_require = __webpack_require__(57147), existsSync = src_rc_require.existsSync, rc_readFileSync = src_rc_require.readFileSync, rc_require2 = __webpack_require__(71017), dirname = rc_require2.dirname, rc_resolve = rc_require2.resolve, commander = __webpack_require__(56302), PATH_KEYS = new Set([ "yarn-path", "cache-folder", "global-folder", "modules-folder", "cwd", "offline-cache-folder" ]);
      function getRcConfigForCwd(cwd, args) {
        var config = {};
        -1 === args.indexOf("--no-default-rc") && Object.assign(config, findRc("yarn", cwd, ((fileText, filePath) => loadRcFile(fileText, filePath))));
        for (var index = args.indexOf("--use-yarnrc"); -1 !== index; index = args.indexOf("--use-yarnrc", index + 1)) {
          var value = args[index + 1];
          value && "-" !== value.charAt(0) && Object.assign(config, loadRcFile(rc_readFileSync(value, "utf8"), value));
        }
        return config;
      }
      function loadRcFile(fileText, filePath) {
        var values = lockfile_parse(fileText, filePath).object;
        for (var _key in filePath.match(/\.yml$/) && "string" == typeof values.yarnPath && (values = {
          "yarn-path": values.yarnPath
        }), values) PATH_KEYS.has(_key.replace(/^(--)?([^.]+\.)*/, "")) && (values[_key] = rc_resolve(dirname(filePath), values[_key]));
        return values;
      }
      function extractCwdArg(args) {
        for (var i = 0, I = args.length; i < I; ++i) {
          var arg = args[i];
          if ("--" === arg) return null;
          if ("--cwd" === arg) return args[i + 1];
        }
        return null;
      }
      function getRcArgs(commandName, args, previousCwds) {
        void 0 === previousCwds && (previousCwds = []);
        var origCwd = extractCwdArg(args) || process.cwd(), argMap = function(cwd, args) {
          var config = getRcConfigForCwd(cwd, args), argsForCommands = new Map;
          for (var _key2 in config) {
            var keyMatch = _key2.match(/^--(?:([^.]+)\.)?(.*)$/);
            if (keyMatch) {
              var commandName = keyMatch[1] || "*", arg = keyMatch[2], value = config[_key2], _args = argsForCommands.get(commandName) || [];
              argsForCommands.set(commandName, _args);
              var option = commander.optionFor(`--${arg}`);
              !option || option.optional || option.required ? _args.push(`--${arg}`, value) : !0 === value && _args.push(`--${arg}`);
            }
          }
          return argsForCommands;
        }(origCwd, args), newArgs = [].concat(argMap.get("*") || [], argMap.get(commandName) || []), newCwd = extractCwdArg(newArgs);
        if (newCwd && newCwd !== origCwd) {
          if (-1 !== previousCwds.indexOf(newCwd)) throw new Error("Recursive .yarnrc files specifying --cwd flags. Bailing out.");
          return getRcArgs(commandName, newArgs, previousCwds.concat(origCwd));
        }
        return newArgs;
      }
      var V2_NAMES = [ "berry", "stable", "canary", "v2", "2" ], policies_chalk = __webpack_require__(48075), policies_invariant = __webpack_require__(46128), policies_path = __webpack_require__(71017), policies_semver = __webpack_require__(92878);
      function getBundleAsset(release) {
        return release.assets.find((asset => asset.name.match(/^yarn-[0-9]+\.[0-9]+\.[0-9]+\.js$/)));
      }
      function _fetchReleases() {
        return (_fetchReleases = asyncToGenerator_asyncToGenerator((function*(config, _temp) {
          var _ref$includePrereleas = (void 0 === _temp ? {} : _temp).includePrereleases, includePrereleases = void 0 !== _ref$includePrereleas && _ref$includePrereleas, token = process.env.GITHUB_TOKEN, tokenUrlParameter = token ? `?access_token=${token}` : "", releases = (yield config.requestManager.request({
            url: `https://api.github.com/repos/yarnpkg/yarn/releases${tokenUrlParameter}`,
            json: !0
          })).filter((release => !release.draft && (!(release.prerelease && !includePrereleases) && (release.version = policies_semver.coerce(release.tag_name), 
          !!release.version && !!getBundleAsset(release)))));
          return releases.sort(((a, b) => -policies_semver.compare(a.version, b.version))), 
          releases;
        }))).apply(this, arguments);
      }
      function fetchBundle(config, url) {
        return config.requestManager.request({
          url: url,
          buffer: !0
        });
      }
      function policies_hasWrapper(flags, args) {
        return !1;
      }
      var policies_buildSubCommands = _build_sub_commands("policies", {
        setVersion: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          var bundleUrl, bundleVersion, initialRange = args[0] || "latest", range = initialRange, allowRc = flags.rc;
          "rc" === range && (reporter.log(`${policies_chalk.yellow("Warning:")} Your current Yarn binary is currently Yarn ${package_namespaceObject.i8}; to avoid potential breaking changes, 'set version rc' won't receive upgrades past the 1.22.x branch.\n         To upgrade to the latest versions, run ${policies_chalk.cyan("yarn set version")} ${policies_chalk.yellow.underline("canary")} instead. Sorry for the inconvenience.\n`), 
          range = "*", allowRc = !0), "latest" === range && (reporter.log(`${policies_chalk.yellow("Warning:")} Your current Yarn binary is currently Yarn ${package_namespaceObject.i8}; to avoid potential breaking changes, 'set version latest' won't receive upgrades past the 1.22.x branch.\n         To upgrade to the latest versions, run ${policies_chalk.cyan("yarn set version")} ${policies_chalk.yellow.underline("stable")} instead. Sorry for the inconvenience.\n`), 
          range = "*"), "classic" === range && (range = "*");
          var version;
          if ("nightly" === range || "nightlies" === range) reporter.log(`${policies_chalk.yellow("Warning:")} Nightlies only exist for Yarn 1.x; starting from 2.x onwards, you should use 'canary' instead`), 
          bundleUrl = "https://nightly.yarnpkg.com/latest.js", bundleVersion = "nightly"; else {
            if (-1 !== V2_NAMES.indexOf(range) || ((version = range).match(/^\.{0,2}[\\/]/) || policies_path.isAbsolute(version)) || (version => satisfiesWithPrereleases(version, ">=2.0.0"))(range)) {
              var normalizedRange = "canary" === range ? "canary" : "stable";
              if (process.env.COREPACK_ROOT) return void (yield child_spawn(NODE_BIN_PATH, [ policies_path.join(process.env.COREPACK_ROOT, "dist/corepack.js"), `yarn@${normalizedRange}`, "set", "version", normalizedRange ], {
                stdio: "inherit",
                cwd: config.cwd
              }));
              var _bundle = yield fetchBundle(config, "https://github.com/yarnpkg/berry/raw/master/packages/yarnpkg-cli/bin/yarn.js"), _yarnPath = policies_path.resolve(config.lockfileFolder, ".yarn/releases/yarn-stable-temp.cjs");
              yield mkdirp(policies_path.dirname(_yarnPath)), yield writeFile(_yarnPath, _bundle), 
              yield chmod(_yarnPath, 493);
              try {
                yield child_spawn(NODE_BIN_PATH, [ _yarnPath, "set", "version", range ], {
                  stdio: "inherit",
                  cwd: config.lockfileFolder,
                  env: _extends({}, process.env, {
                    YARN_IGNORE_PATH: "1"
                  })
                });
              } catch (err) {
                process.exit(1);
              }
              return;
            }
            reporter.log(`Resolving ${policies_chalk.yellow(initialRange)} to a url...`);
            var releases = [];
            try {
              releases = yield function() {
                return _fetchReleases.apply(this, arguments);
              }(config, {
                includePrereleases: allowRc
              });
            } catch (e) {
              return void reporter.error(e.message);
            }
            var release = releases.find((release => policies_semver.satisfies(release.version, range)));
            if (!release) throw new Error(`Release not found: ${range}`);
            var asset = getBundleAsset(release);
            policies_invariant(asset, "The bundle asset should exist"), bundleUrl = asset.browser_download_url, 
            bundleVersion = release.version.version;
          }
          reporter.log(`Downloading ${policies_chalk.green(bundleUrl)}...`);
          var bundle = yield fetchBundle(config, bundleUrl), yarnPath = policies_path.resolve(config.lockfileFolder, `.yarn/releases/yarn-${bundleVersion}.cjs`);
          reporter.log(`Saving it into ${policies_chalk.magenta(yarnPath)}...`), yield mkdirp(policies_path.dirname(yarnPath)), 
          yield writeFile(yarnPath, bundle), yield chmod(yarnPath, 493);
          var targetPath = policies_path.relative(config.lockfileFolder, yarnPath).replace(/\\/g, "/"), _rcPath = `${config.lockfileFolder}/.yarnrc`;
          reporter.log(`Updating ${policies_chalk.magenta(_rcPath)}...`);
          var cwd, filePath, rc = (cwd = config.lockfileFolder, filePath = rc_resolve(cwd, ".yarnrc"), 
          existsSync(filePath) ? loadRcFile(rc_readFileSync(filePath, "utf8"), filePath) : {});
          rc["yarn-path"] = targetPath, yield writeFilePreservingEol(_rcPath, `${stringify(rc)}\n`), 
          reporter.log("Done!");
        }))()
      }), policies_run = policies_buildSubCommands.run, policies_setFlags = policies_buildSubCommands.setFlags, policies_examples = policies_buildSubCommands.examples, version_invariant = __webpack_require__(46128), version_semver = __webpack_require__(92878), version_path = __webpack_require__(71017);
      function isValidNewVersion(oldVersion, newVersion, looseSemver, identifier) {
        return !(!version_semver.valid(newVersion, looseSemver) && !version_semver.inc(oldVersion, newVersion, looseSemver, identifier));
      }
      function version_setFlags(commander) {
        commander.description("Update the version of your package via the command line."), 
        commander.option("--new-version [version]", "new version"), commander.option("--major", "auto-increment major version number"), 
        commander.option("--minor", "auto-increment minor version number"), commander.option("--patch", "auto-increment patch version number"), 
        commander.option("--premajor", "auto-increment premajor version number"), commander.option("--preminor", "auto-increment preminor version number"), 
        commander.option("--prepatch", "auto-increment prepatch version number"), commander.option("--prerelease", "auto-increment prerelease version number"), 
        commander.option("--preid [preid]", "add a custom identifier to the prerelease"), 
        commander.option("--message [message]", "message"), commander.option("--no-git-tag-version", "no git tag version"), 
        commander.option("--no-commit-hooks", "bypass git hooks when committing new version");
      }
      function version_hasWrapper(commander, args) {
        return !0;
      }
      function setVersion() {
        return _setVersion.apply(this, arguments);
      }
      function _setVersion() {
        return (_setVersion = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args, required) {
          var pkg = yield config.readRootManifest(), pkgLoc = pkg._loc, scripts = nullify(), newVersion = flags.newVersion, identifier = void 0;
          if (flags.preid && (identifier = flags.preid), version_invariant(pkgLoc, "expected package location"), 
          args.length && !newVersion) throw new MessageError(reporter.lang("invalidVersionArgument", "--new-version [version]"));
          function runLifecycle(lifecycle) {
            return scripts[lifecycle] ? execCommand({
              stage: lifecycle,
              config: config,
              cmd: scripts[lifecycle],
              cwd: config.cwd,
              isInteractive: !0
            }) : Promise.resolve();
          }
          pkg.scripts && Object.assign(scripts, pkg.scripts);
          var oldVersion = pkg.version;
          if (oldVersion ? reporter.info(`${reporter.lang("currentVersion")}: ${oldVersion}`) : oldVersion = "0.0.0", 
          newVersion && !isValidNewVersion(oldVersion, newVersion, config.looseSemver, identifier)) throw new MessageError(reporter.lang("invalidVersion"));
          for (newVersion || (flags.major ? newVersion = version_semver.inc(oldVersion, "major") : flags.minor ? newVersion = version_semver.inc(oldVersion, "minor") : flags.patch ? newVersion = version_semver.inc(oldVersion, "patch") : flags.premajor ? newVersion = version_semver.inc(oldVersion, "premajor", identifier) : flags.preminor ? newVersion = version_semver.inc(oldVersion, "preminor", identifier) : flags.prepatch ? newVersion = version_semver.inc(oldVersion, "prepatch", identifier) : flags.prerelease && (newVersion = version_semver.inc(oldVersion, "prerelease", identifier))); !newVersion; ) {
            if (flags.nonInteractive || config.nonInteractive) {
              newVersion = oldVersion;
              break;
            }
            try {
              (newVersion = yield reporter.question(reporter.lang("newVersion"))) || (newVersion = oldVersion);
            } catch (err) {
              newVersion = oldVersion;
            }
            if (!required && !newVersion) return reporter.info(`${reporter.lang("noVersionOnPublish")}: ${oldVersion}`), 
            function() {
              return Promise.resolve();
            };
            if (isValidNewVersion(oldVersion, newVersion, config.looseSemver, identifier)) break;
            newVersion = null, reporter.error(reporter.lang("invalidSemver"));
          }
          if (newVersion && (newVersion = version_semver.inc(oldVersion, newVersion, config.looseSemver, identifier) || newVersion), 
          version_invariant(newVersion, "expected new version"), newVersion === pkg.version) return function() {
            return Promise.resolve();
          };
          yield runLifecycle("preversion"), reporter.info(`${reporter.lang("newVersion")}: ${newVersion}`), 
          pkg.version = newVersion;
          var manifests = yield config.getRootManifests();
          for (var registryName of registryNames) {
            var manifest = manifests[registryName];
            manifest.exists && (manifest.object.version = newVersion);
          }
          return yield config.saveRootManifests(manifests), yield runLifecycle("version"), 
          asyncToGenerator_asyncToGenerator((function*() {
            if (version_invariant(newVersion, "expected version"), flags.gitTagVersion && config.getOption("version-git-tag")) {
              for (var isGit = !1, parts = config.cwd.split(version_path.sep); parts.length && !(isGit = yield fs_exists(version_path.join(parts.join(version_path.sep), ".git"))); ) parts.pop();
              if (isGit) {
                var message = (flags.message || String(config.getOption("version-git-message"))).replace(/%s/g, newVersion), flag = Boolean(config.getOption("version-sign-git-tag")) ? "-sm" : "-am", prefix = String(config.getOption("version-tag-prefix")), _args = [ "commit", "-m", message ].concat(!1 === flags.commitHooks || !1 === config.getOption("version-commit-hooks") ? [ "-n" ] : []), gitRoot = (yield spawn([ "rev-parse", "--show-toplevel" ], {
                  cwd: config.cwd
                })).trim();
                yield spawn([ "add", version_path.relative(gitRoot, pkgLoc) ], {
                  cwd: gitRoot
                }), yield spawn(_args, {
                  cwd: gitRoot
                }), yield spawn([ "tag", `${prefix}${newVersion}`, flag, message ], {
                  cwd: gitRoot
                });
              }
            }
            yield runLifecycle("postversion");
          }));
        }))).apply(this, arguments);
      }
      function version_run() {
        return commands_version_run.apply(this, arguments);
      }
      function commands_version_run() {
        return (commands_version_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var commit = yield setVersion(config, reporter, flags, args, !0);
          yield commit();
        }))).apply(this, arguments);
      }
      var publish_path = __webpack_require__(71017), publish_invariant = __webpack_require__(46128), publish_crypto = __webpack_require__(6113), publish_url = __webpack_require__(57310), publish_fs2 = __webpack_require__(57147), publish_ssri = __webpack_require__(44240);
      function publish_setFlags(commander) {
        version_setFlags(commander), commander.description("Publishes a package to the npm registry."), 
        commander.usage("publish [<tarball>|<folder>] [--tag <tag>] [--access <public|restricted>]"), 
        commander.option("--access [access]", "access"), commander.option("--tag [tag]", "tag");
      }
      function publish_hasWrapper(commander, args) {
        return !0;
      }
      function publish() {
        return _publish.apply(this, arguments);
      }
      function _publish() {
        return _publish = asyncToGenerator_asyncToGenerator((function*(config, pkg, flags, dir) {
          var access = flags.access;
          if (!access && pkg && pkg.publishConfig && pkg.publishConfig.access && (access = pkg.publishConfig.access), 
          access && "public" !== access && "restricted" !== access) throw new MessageError(config.reporter.lang("invalidAccess"));
          yield config.executeLifecycleScript("prepublish"), yield config.executeLifecycleScript("prepare"), 
          yield config.executeLifecycleScript("prepublishOnly"), yield config.executeLifecycleScript("prepack");
          var stream, stat = yield fs_lstat(dir);
          if (stat.isDirectory()) stream = yield pack(config); else {
            if (!stat.isFile()) throw new Error("Don't know how to handle this file type");
            stream = publish_fs2.createReadStream(dir);
          }
          var buffer = yield new Promise(((resolve, reject) => {
            var data = [];
            publish_invariant(stream, "expected stream"), stream.on("data", data.push.bind(data)).on("end", (() => resolve(Buffer.concat(data)))).on("error", reject);
          }));
          for (var key in yield config.executeLifecycleScript("postpack"), pkg = Object.assign({}, pkg)) "_" === key[0] && delete pkg[key];
          var tag = flags.tag || "latest", tbName = `${pkg.name}-${pkg.version}.tgz`, tbURI = `${pkg.name}/-/${tbName}`, root = {
            _id: pkg.name,
            access: access,
            name: pkg.name,
            description: pkg.description,
            "dist-tags": {
              [tag]: pkg.version
            },
            versions: {
              [pkg.version]: pkg
            },
            readme: pkg.readme || "",
            _attachments: {
              [tbName]: {
                content_type: "application/octet-stream",
                data: buffer.toString("base64"),
                length: buffer.length
              }
            }
          };
          pkg._id = `${pkg.name}@${pkg.version}`, pkg.dist = pkg.dist || {}, pkg.dist.shasum = publish_crypto.createHash("sha1").update(buffer).digest("hex"), 
          pkg.dist.integrity = publish_ssri.fromData(buffer).toString();
          var registry = String(config.getOption("registry"));
          pkg.dist.tarball = publish_url.resolve(registry, tbURI).replace(/^https:\/\//, "http://");
          try {
            yield config.registries.npm.request(NpmRegistry.escapeName(pkg.name), {
              registry: pkg && pkg.publishConfig && pkg.publishConfig.registry,
              method: "PUT",
              body: root
            });
          } catch (error) {
            throw new MessageError(config.reporter.lang("publishFail", error.message));
          }
          yield config.executeLifecycleScript("publish"), yield config.executeLifecycleScript("postpublish");
        })), _publish.apply(this, arguments);
      }
      function publish_run() {
        return commands_publish_run.apply(this, arguments);
      }
      function commands_publish_run() {
        return (commands_publish_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var dir = args[0] ? publish_path.resolve(config.cwd, args[0]) : config.cwd;
          if (args.length > 1) throw new MessageError(reporter.lang("tooManyArguments", 1));
          if (!(yield fs_exists(dir))) throw new MessageError(reporter.lang("unknownFolderOrTarball"));
          var publishPath = dir;
          (yield fs_lstat(dir)).isDirectory() && (config.cwd = publish_path.resolve(dir), 
          publishPath = config.cwd);
          var pkg = yield config.readRootManifest();
          if (pkg.private) throw new MessageError(reporter.lang("publishPrivate"));
          if (!pkg.name) throw new MessageError(reporter.lang("noName"));
          var registry = "";
          pkg && pkg.publishConfig && pkg.publishConfig.registry && (registry = pkg.publishConfig.registry), 
          reporter.step(1, 4, reporter.lang("bumpingVersion"));
          var commitVersion = yield setVersion(config, reporter, flags, [], !1);
          reporter.step(2, 4, reporter.lang("loggingIn"));
          var revoke = yield getToken(config, reporter, pkg.name, flags, registry);
          reporter.step(3, 4, reporter.lang("publishing")), yield publish(config, pkg, flags, publishPath), 
          yield commitVersion(), reporter.success(reporter.lang("published")), reporter.step(4, 4, reporter.lang("revokingToken")), 
          yield revoke();
        }))).apply(this, arguments);
      }
      function wrapRequired(callback, requireTeam, deprecationInfo) {
        return function() {
          var _ref = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
            if (deprecationInfo && function(reporter, deprecationWarning) {
              reporter.warn(reporter.lang("deprecatedCommand", `yarn team ${deprecationWarning.deprecatedCommand}`, `yarn team ${deprecationWarning.currentCommand}`));
            }(reporter, deprecationInfo), !args.length) return !1;
            var parts = function(arg, requireTeam, reporter) {
              var _arg$split = arg.split(":"), scope = _arg$split[0], team = _arg$split[1];
              return !_arg$split.slice(2).length && !(requireTeam && !team) && {
                scope: scope || "",
                team: team || "",
                user: ""
              };
            }(args[0], requireTeam);
            if (!parts) return !1;
            reporter.step(1, 3, reporter.lang("loggingIn"));
            var revoke = yield getToken(config, reporter), res = yield callback(parts, config, reporter, flags, args);
            return res ? (reporter.step(3, 3, reporter.lang("revokingToken")), yield revoke(), 
            !0) : res;
          }));
          return function() {
            return _ref.apply(this, arguments);
          };
        }();
      }
      function wrapRequiredTeam(callback, requireTeam, subCommandDeprecated) {
        return void 0 === requireTeam && (requireTeam = !0), wrapRequired((function(parts, config, reporter, flags, args) {
          return 1 === args.length && callback(parts, config, reporter, flags, args);
        }), requireTeam, subCommandDeprecated);
      }
      function wrapRequiredUser(callback, subCommandDeprecated) {
        return wrapRequired((function(parts, config, reporter, flags, args) {
          return 2 === args.length && callback(_extends({
            user: args[1]
          }, parts), config, reporter, flags, args);
        }), !0, subCommandDeprecated);
      }
      function removeTeamUser() {
        return _removeTeamUser.apply(this, arguments);
      }
      function _removeTeamUser() {
        return (_removeTeamUser = asyncToGenerator_asyncToGenerator((function*(parts, config, reporter) {
          return reporter.step(2, 3, reporter.lang("teamRemovingUser")), reporter.inspect(yield config.registries.npm.request(`team/${parts.scope}/${parts.team}/user`, {
            method: "DELETE",
            body: {
              user: parts.user
            }
          })), !0;
        }))).apply(this, arguments);
      }
      function team_list() {
        return commands_team_list.apply(this, arguments);
      }
      function commands_team_list() {
        return (commands_team_list = asyncToGenerator_asyncToGenerator((function*(parts, config, reporter) {
          reporter.step(2, 3, reporter.lang("teamListing"));
          return parts.team ? reporter.inspect(yield config.registries.npm.request(`team/${parts.scope}/${parts.team}/user?format=cli`)) : reporter.inspect(yield config.registries.npm.request(`org/${parts.scope}/team?format=cli`)), 
          !0;
        }))).apply(this, arguments);
      }
      function team_setFlags(commander) {
        commander.description("Maintain team memberships");
      }
      var team_buildSubCommands = _build_sub_commands("team", {
        create: wrapRequiredTeam(function() {
          var _ref2 = asyncToGenerator_asyncToGenerator((function*(parts, config, reporter, flags, args) {
            return reporter.step(2, 3, reporter.lang("teamCreating")), reporter.inspect(yield config.registries.npm.request(`team/${parts.scope}`, {
              method: "PUT",
              body: {
                team: parts.team
              }
            })), !0;
          }));
          return function() {
            return _ref2.apply(this, arguments);
          };
        }()),
        destroy: wrapRequiredTeam(function() {
          var _ref3 = asyncToGenerator_asyncToGenerator((function*(parts, config, reporter, flags, args) {
            return reporter.step(2, 3, reporter.lang("teamRemoving")), reporter.inspect(yield config.registries.npm.request(`team/${parts.scope}/${parts.team}`, {
              method: "DELETE"
            })), !0;
          }));
          return function() {
            return _ref3.apply(this, arguments);
          };
        }()),
        add: wrapRequiredUser(function() {
          var _ref4 = asyncToGenerator_asyncToGenerator((function*(parts, config, reporter, flags, args) {
            return reporter.step(2, 3, reporter.lang("teamAddingUser")), reporter.inspect(yield config.registries.npm.request(`team/${parts.scope}/${parts.team}/user`, {
              method: "PUT",
              body: {
                user: parts.user
              }
            })), !0;
          }));
          return function() {
            return _ref4.apply(this, arguments);
          };
        }()),
        rm: wrapRequiredUser((function(parts, config, reporter, flags, args) {
          removeTeamUser(parts, config, reporter);
        }), {
          deprecatedCommand: "rm",
          currentCommand: "remove"
        }),
        remove: wrapRequiredUser((function(parts, config, reporter, flags, args) {
          removeTeamUser(parts, config, reporter);
        })),
        ls: wrapRequiredTeam((function(parts, config, reporter, flags, args) {
          team_list(parts, config, reporter);
        }), !1, {
          deprecatedCommand: "ls",
          currentCommand: "list"
        }),
        list: wrapRequiredTeam((function(parts, config, reporter, flags, args) {
          team_list(parts, config, reporter);
        }), !1)
      }, [ "create <scope:team>", "destroy <scope:team>", "add <scope:team> <user>", "remove <scope:team> <user>", "list <scope>|<scope:team>" ]), team_run = team_buildSubCommands.run, team_hasWrapper = team_buildSubCommands.hasWrapper, team_examples = team_buildSubCommands.examples, unplug_path = __webpack_require__(71017);
      function unplug_hasWrapper(commander) {
        return !0;
      }
      function unplug_setFlags(commander) {
        commander.description("Temporarily copies a package (with an optional @range suffix) outside of the global cache for debugging purposes"), 
        commander.usage("unplug [packages ...] [flags]"), commander.option("--clear", "Delete the selected packages"), 
        commander.option("--clear-all", "Delete all unplugged packages");
      }
      function unplug_run() {
        return commands_unplug_run.apply(this, arguments);
      }
      function commands_unplug_run() {
        return commands_unplug_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (!config.plugnplayEnabled) throw new MessageError(reporter.lang("unplugDisabled"));
          if (!args.length && flags.clear) throw new MessageError(reporter.lang("tooFewArguments", 1));
          if (args.length && flags.clearAll) throw new MessageError(reporter.lang("noArguments"));
          if (flags.clearAll) yield clearAll(config); else if (flags.clear) yield clearSome(config, new Set(args)); else if (args.length > 0) {
            var lockfile = yield Lockfile.fromDirectory(config.lockfileFolder, reporter);
            yield wrapLifecycle(config, flags, asyncToGenerator_asyncToGenerator((function*() {
              var install = new Install(flags, config, reporter, lockfile);
              install.linker.unplugged = args, yield install.init();
            })));
          }
          var unpluggedPackageFolders = yield config.listUnpluggedPackageFolders();
          for (var target of unpluggedPackageFolders.values()) reporter.log(target, {
            force: !0
          });
        })), commands_unplug_run.apply(this, arguments);
      }
      function clearSome() {
        return _clearSome.apply(this, arguments);
      }
      function _clearSome() {
        return (_clearSome = asyncToGenerator_asyncToGenerator((function*(config, filters) {
          var unpluggedPackageFolders = yield config.listUnpluggedPackageFolders(), removeList = [];
          for (var _ref2 of unpluggedPackageFolders.entries()) {
            var unpluggedName = _ref2[0], target = _ref2[1], name = (yield readJson(unplug_path.join(target, "package.json"))).name;
            filters.has(name) && removeList.push(unplug_path.join(config.getUnpluggedPath(), unpluggedName));
          }
          if (removeList.length === unpluggedPackageFolders.size) yield unlink(config.getUnpluggedPath()); else for (var unpluggedPackagePath of removeList) yield unlink(unpluggedPackagePath);
        }))).apply(this, arguments);
      }
      function clearAll() {
        return _clearAll.apply(this, arguments);
      }
      function _clearAll() {
        return (_clearAll = asyncToGenerator_asyncToGenerator((function*(config) {
          yield unlink(config.getUnpluggedPath());
        }))).apply(this, arguments);
      }
      var unlink_path = __webpack_require__(71017);
      function unlink_setFlags(commander) {
        commander.description("Unlink a previously created symlink for a package.");
      }
      function unlink_hasWrapper(commander, args) {
        return !0;
      }
      function unlink_run() {
        return commands_unlink_run.apply(this, arguments);
      }
      function commands_unlink_run() {
        return (commands_unlink_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (args.length) for (var name of args) {
            var linkLoc = unlink_path.join(config.linkFolder, name);
            if (!(yield fs_exists(linkLoc))) throw new MessageError(reporter.lang("linkMissing", name));
            yield unlink(unlink_path.join(yield getRegistryFolder(config, name), name)), reporter.success(reporter.lang("linkDisusing", name)), 
            reporter.info(reporter.lang("linkDisusingMessage", name));
          } else {
            var manifest = yield config.readRootManifest(), _name = manifest.name;
            if (!_name) throw new MessageError(reporter.lang("unknownPackageName"));
            var _linkLoc = unlink_path.join(config.linkFolder, _name);
            if (!(yield fs_exists(_linkLoc))) throw new MessageError(reporter.lang("linkMissing", _name));
            if (manifest.bin) {
              var globalBinFolder = yield getBinFolder(config, flags);
              for (var binName in manifest.bin) {
                var binDestLoc = unlink_path.join(globalBinFolder, binName);
                (yield fs_exists(binDestLoc)) && (yield unlink(binDestLoc), "win32" === process.platform && (yield unlink(binDestLoc + ".cmd")));
              }
            }
            yield unlink(_linkLoc), reporter.success(reporter.lang("linkUnregistered", _name)), 
            reporter.info(reporter.lang("linkUnregisteredMessage", _name));
          }
        }))).apply(this, arguments);
      }
      function versions_setFlags(commander) {
        commander.description("Displays version information of currently installed Yarn, Node.js, and its dependencies.");
      }
      function versions_hasWrapper(commander, args) {
        return !0;
      }
      function versions_run() {
        return commands_versions_run.apply(this, arguments);
      }
      function commands_versions_run() {
        return (commands_versions_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var versions = {
            yarn: package_namespaceObject.i8
          }, pkg = yield config.maybeReadManifest(config.cwd);
          pkg && pkg.name && pkg.version && (versions[pkg.name] = pkg.version), Object.assign(versions, process.versions), 
          reporter.inspect(versions);
        }))).apply(this, arguments);
      }
      var why_requireLockfile = !0, why_invariant = __webpack_require__(46128), bytes = __webpack_require__(79830), why_emoji = __webpack_require__(30736), why_path = __webpack_require__(71017);
      function cleanQuery() {
        return _cleanQuery.apply(this, arguments);
      }
      function _cleanQuery() {
        return (_cleanQuery = asyncToGenerator_asyncToGenerator((function*(config, query) {
          why_path.isAbsolute(query) && (yield fs_exists(query)) && (query = why_path.relative(config.cwd, query));
          var queryParts = (query = (query = query.replace(/([\\/]|^)node_modules[\\/]/g, "#")).replace(/^#+/g, "")).split("#");
          return query = (queryParts = queryParts.map((part => {
            var parts = part.split(/[\\/]/g);
            return (parts = "@" === part[0] ? parts.slice(0, 2) : parts.slice(0, 1)).join("/");
          }))).join("#");
        }))).apply(this, arguments);
      }
      function getPackageSize() {
        return _getPackageSize.apply(this, arguments);
      }
      function _getPackageSize() {
        return (_getPackageSize = asyncToGenerator_asyncToGenerator((function*(tuple) {
          var loc = tuple[0], files = yield walk(loc, null, new Set([ ".yarn-metadata.json", ".yarn-tarball.tgz" ]));
          return sum(yield Promise.all(files.map((walkFile => getFileSizeOnDisk(walkFile.absolute)))));
        }))).apply(this, arguments);
      }
      function sum(array) {
        return array.length ? array.reduce(((a, b) => a + b), 0) : 0;
      }
      function collect(hoistManifests, allDependencies, dependency, _temp) {
        var recursive = (void 0 === _temp ? {
          recursive: !1
        } : _temp).recursive, deps = dependency[1].pkg.dependencies;
        if (!deps) return allDependencies;
        var dependencyKeys = new Set(Object.keys(deps)), directDependencies = [];
        for (var dep of hoistManifests) {
          var info = dep[1];
          !allDependencies.has(dep) && dependencyKeys.has(info.key) && (allDependencies.add(dep), 
          directDependencies.push(dep));
        }
        return recursive && directDependencies.forEach((dependency => collect(hoistManifests, allDependencies, dependency, {
          recursive: !0
        }))), allDependencies;
      }
      function getSharedDependencies(hoistManifests, transitiveKeys) {
        var sharedDependencies = new Set;
        for (var _ref2 of hoistManifests) {
          var info = _ref2[1];
          !transitiveKeys.has(info.key) && info.pkg.dependencies && Object.keys(info.pkg.dependencies).forEach((dependency => {
            transitiveKeys.has(dependency) && !sharedDependencies.has(dependency) && sharedDependencies.add(dependency);
          }));
        }
        return sharedDependencies;
      }
      function why_setFlags(commander) {
        commander.description("Identifies why a package has been installed, detailing which other packages depend on it.");
      }
      function why_hasWrapper(commander, args) {
        return !0;
      }
      function toStandardPathString(pathString) {
        var str = pathString.replace(/\//g, "#");
        return "#" === str[0] ? str.slice(1) : str;
      }
      function why_run() {
        return commands_why_run.apply(this, arguments);
      }
      function commands_why_run() {
        return commands_why_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          if (!args.length) throw new MessageError(reporter.lang("missingWhyDependency"));
          if (args.length > 1) throw new MessageError(reporter.lang("tooManyArguments", 1));
          var query = yield cleanQuery(config, args[0]);
          reporter.step(1, 4, reporter.lang("whyStart", args[0]), why_emoji.get("thinking_face")), 
          reporter.step(2, 4, reporter.lang("whyInitGraph"), why_emoji.get("truck"));
          var lockfile = yield Lockfile.fromDirectory(config.lockfileFolder, reporter), install = new Install(flags, config, reporter, lockfile), _yield$install$fetchR = yield install.fetchRequestFromCwd(), depRequests = _yield$install$fetchR.requests, patterns = _yield$install$fetchR.patterns, workspaceLayout = _yield$install$fetchR.workspaceLayout;
          yield install.resolver.init(depRequests, {
            isFlat: install.flags.flat,
            isFrozen: install.flags.frozenLockfile,
            workspaceLayout: workspaceLayout
          });
          var hoisted = yield install.linker.getFlatHoistedTree(patterns);
          reporter.step(3, 4, reporter.lang("whyFinding"), why_emoji.get("mag"));
          var matches = queryWhy(query, hoisted);
          if (matches.length <= 0) reporter.error(reporter.lang("whyUnknownMatch")); else {
            var processMatch = function() {
              var _ref4 = asyncToGenerator_asyncToGenerator((function*(match) {
                var matchInfo = match[1], matchRef = matchInfo.pkg._reference;
                why_invariant(matchRef, "expected reference");
                var rootType, distinctMatchPatterns = new Set(matchRef.patterns), reasons = [];
                for (var pattern of (matchInfo.originalParentPath.length > 0 && reasons.push({
                  type: "whyDependedOn",
                  typeSimple: "whyDependedOnSimple",
                  value: toStandardPathString(matchInfo.originalParentPath)
                }), distinctMatchPatterns)) (rootType = install.rootPatternsToOrigin[pattern]) && reasons.push({
                  type: "whySpecified",
                  typeSimple: "whySpecifiedSimple",
                  value: rootType
                });
                for (var _path of matchInfo.previousPaths) reasons.push({
                  type: "whyHoistedFrom",
                  typeSimple: "whyHoistedFromSimple",
                  value: toStandardPathString(_path)
                });
                var packageSize = 0, directSizes = [], transitiveSizes = [];
                try {
                  packageSize = yield getPackageSize(match);
                } catch (e) {}
                var dependencies = Array.from(collect(hoisted, new Set, match)), transitiveDependencies = Array.from(collect(hoisted, new Set, match, {
                  recursive: !0
                }));
                try {
                  directSizes = yield Promise.all(dependencies.map(getPackageSize)), transitiveSizes = yield Promise.all(transitiveDependencies.map(getPackageSize));
                } catch (e) {}
                var transitiveKeys = new Set(transitiveDependencies.map((_ref5 => _ref5[1].key))), sharedDependencies = getSharedDependencies(hoisted, transitiveKeys);
                reporter.info(reporter.lang("whyMatch", `${matchInfo.key}@${matchInfo.pkg.version}`)), 
                matchInfo.isNohoist ? reasons.push({
                  type: "whyNotHoisted",
                  typeSimple: "whyNotHoistedSimple",
                  value: matchInfo.nohoistList
                }) : query === matchInfo.originalKey && reporter.info(reporter.lang("whyHoistedTo", matchInfo.key)), 
                1 === reasons.length ? reporter.info(reporter.lang(reasons[0].typeSimple, reasons[0].value)) : reasons.length > 1 ? (reporter.info(reporter.lang("whyReasons")), 
                reporter.list("reasons", reasons.map((reason => reporter.lang(reason.type, reason.value))))) : reporter.error(reporter.lang("whyWhoKnows")), 
                packageSize && (reporter.info(reporter.lang("whyDiskSizeWithout", bytes(packageSize))), 
                reporter.info(reporter.lang("whyDiskSizeUnique", bytes(packageSize + sum(directSizes)))), 
                reporter.info(reporter.lang("whyDiskSizeTransitive", bytes(packageSize + sum(transitiveSizes)))), 
                reporter.info(reporter.lang("whySharedDependencies", sharedDependencies.size)));
              }));
              return function() {
                return _ref4.apply(this, arguments);
              };
            }();
            for (var match of (reporter.step(4, 4, reporter.lang("whyCalculating"), why_emoji.get("aerial_tramway")), 
            matches)) yield processMatch(match);
          }
        })), commands_why_run.apply(this, arguments);
      }
      function queryWhy(pattern, hoisted) {
        var nohoistPattern = `#${pattern}`, found = [];
        for (var _ref3 of hoisted) {
          var loc = _ref3[0], info = _ref3[1];
          (info.key === pattern || info.previousPaths.indexOf(pattern) >= 0 || info.key.endsWith(nohoistPattern)) && found.push([ loc, info ]);
        }
        return found;
      }
      var workspaces_invariant = __webpack_require__(46128), workspaces_path = __webpack_require__(71017), workspaces_os = __webpack_require__(22037), workspaces_semver = __webpack_require__(92878);
      function workspaces_hasWrapper(commander, args) {
        return !0;
      }
      function info() {
        return _info.apply(this, arguments);
      }
      function _info() {
        return (_info = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var workspaceRootFolder = config.workspaceRootFolder;
          if (!workspaceRootFolder) throw new MessageError(reporter.lang("workspaceRootNotFound", config.cwd));
          var manifest = yield config.findManifest(workspaceRootFolder, !1);
          workspaces_invariant(manifest && manifest.workspaces, 'We must find a manifest with a "workspaces" property');
          var workspaces = yield config.resolveWorkspaces(workspaceRootFolder, manifest), publicData = {};
          for (var workspaceName of Object.keys(workspaces)) {
            var _workspaces$workspace = workspaces[workspaceName], loc = _workspaces$workspace.loc, _manifest = _workspaces$workspace.manifest, workspaceDependencies = new Set, mismatchedWorkspaceDependencies = new Set;
            for (var dependencyType of DEPENDENCY_TYPES) if ("peerDependencies" !== dependencyType) for (var dependencyName of Object.keys(_manifest[dependencyType] || {})) if (Object.prototype.hasOwnProperty.call(workspaces, dependencyName)) {
              workspaces_invariant(_manifest && _manifest[dependencyType], "The request should exist");
              var requestedRange = _manifest[dependencyType][dependencyName];
              workspaces_semver.satisfies(workspaces[dependencyName].manifest.version, requestedRange) ? workspaceDependencies.add(dependencyName) : mismatchedWorkspaceDependencies.add(dependencyName);
            }
            publicData[workspaceName] = {
              location: workspaces_path.relative(config.lockfileFolder, loc).replace(/\\/g, "/"),
              workspaceDependencies: Array.from(workspaceDependencies),
              mismatchedWorkspaceDependencies: Array.from(mismatchedWorkspaceDependencies)
            };
          }
          reporter.log(JSON.stringify(publicData, null, 2), {
            force: !0
          });
        }))).apply(this, arguments);
      }
      function runScript() {
        return _runScript.apply(this, arguments);
      }
      function _runScript() {
        return (_runScript = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var workspaceRootFolder = config.workspaceRootFolder;
          if (!workspaceRootFolder) throw new MessageError(reporter.lang("workspaceRootNotFound", config.cwd));
          var manifest = yield config.findManifest(workspaceRootFolder, !1);
          workspaces_invariant(manifest && manifest.workspaces, 'We must find a manifest with a "workspaces" property');
          var workspaces = yield config.resolveWorkspaces(workspaceRootFolder, manifest);
          try {
            for (var workspaceName of Object.keys(workspaces)) {
              var loc = workspaces[workspaceName].loc;
              reporter.log(`${workspaces_os.EOL}> ${workspaceName}`), yield child_spawn(NODE_BIN_PATH, [ YARN_BIN_PATH, "run" ].concat(args), {
                stdio: "inherit",
                cwd: loc
              });
            }
          } catch (err) {
            throw err;
          }
        }))).apply(this, arguments);
      }
      var workspaces_buildSubCommands = _build_sub_commands("workspaces", {
        info: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield info(config, reporter, flags, args);
        }))(),
        run: (config, reporter, flags, args) => asyncToGenerator_asyncToGenerator((function*() {
          yield runScript(config, reporter, flags, args);
        }))()
      }), workspaces_run = workspaces_buildSubCommands.run, workspaces_setFlags = workspaces_buildSubCommands.setFlags, workspaces_examples = workspaces_buildSubCommands.examples, workspace_invariant = __webpack_require__(46128);
      function workspace_setFlags(commander) {}
      function workspace_hasWrapper(commander, args) {
        return !0;
      }
      function workspace_run() {
        return commands_workspace_run.apply(this, arguments);
      }
      function commands_workspace_run() {
        return commands_workspace_run = asyncToGenerator_asyncToGenerator((function*(config, reporter, flags, args) {
          var workspaceRootFolder = config.workspaceRootFolder;
          if (!workspaceRootFolder) throw new MessageError(reporter.lang("workspaceRootNotFound", config.cwd));
          if (args.length < 1) throw new MessageError(reporter.lang("workspaceMissingWorkspace"));
          if (args.length < 2) throw new MessageError(reporter.lang("workspaceMissingCommand"));
          var manifest = yield config.findManifest(workspaceRootFolder, !1);
          workspace_invariant(manifest && manifest.workspaces, 'We must find a manifest with a "workspaces" property');
          var workspaces = yield config.resolveWorkspaces(workspaceRootFolder, manifest), _ref = args || [], workspaceName = _ref[0], rest = _ref.slice(1);
          if (!Object.prototype.hasOwnProperty.call(workspaces, workspaceName)) throw new MessageError(reporter.lang("workspaceUnknownWorkspace", workspaceName));
          var workspace = workspaces[workspaceName];
          try {
            yield child_spawn(NODE_BIN_PATH, [ YARN_BIN_PATH ].concat(rest), {
              stdio: "inherit",
              cwd: workspace.loc
            });
          } catch (err) {
            throw err;
          }
        })), commands_workspace_run.apply(this, arguments);
      }
      function _useless(message) {
        return {
          useless: !0,
          run() {
            throw new MessageError(message);
          },
          setFlags: () => {},
          hasWrapper: () => !0
        };
      }
      var commands_chalk = __webpack_require__(48075), getDocsInfo = name => "Visit " + commands_chalk.bold((name => `${YARN_DOCS}${name || ""}`)(name)) + " for documentation about this command.", commands = {
        access: access_namespaceObject,
        add: add_namespaceObject,
        audit: audit_namespaceObject,
        autoclean: autoclean_namespaceObject,
        bin: bin_namespaceObject,
        cache: cache_namespaceObject,
        check: check_namespaceObject,
        config: commands_config_namespaceObject,
        create: create_namespaceObject,
        dedupe: _useless("The dedupe command isn't necessary. `yarn install` will already dedupe."),
        exec: exec_namespaceObject,
        generateLockEntry: generate_lock_entry_namespaceObject,
        global: global_namespaceObject,
        help: help_namespaceObject,
        import: import_namespaceObject,
        info: info_namespaceObject,
        init: init_namespaceObject,
        install: install_namespaceObject,
        licenses: commands_licenses_namespaceObject,
        link: link_namespaceObject,
        lockfile: _useless("The lockfile command isn't necessary. `yarn install` will produce a lockfile."),
        login: login_namespaceObject,
        logout: logout_namespaceObject,
        list: list_namespaceObject,
        node: node_namespaceObject,
        outdated: outdated_namespaceObject,
        owner: owner_namespaceObject,
        pack: pack_namespaceObject,
        policies: policies_namespaceObject,
        prune: _useless("The prune command isn't necessary. `yarn install` will prune extraneous packages."),
        publish: publish_namespaceObject,
        remove: remove_namespaceObject,
        run: run_namespaceObject,
        tag: tag_namespaceObject,
        team: team_namespaceObject,
        unplug: unplug_namespaceObject,
        unlink: unlink_namespaceObject,
        upgrade: upgrade_namespaceObject,
        version: commands_version_namespaceObject,
        versions: versions_namespaceObject,
        why: why_namespaceObject,
        workspaces: workspaces_namespaceObject,
        workspace: workspace_namespaceObject,
        upgradeInteractive: upgrade_interactive_namespaceObject
      };
      for (var commands_key in commands) commands[commands_key].getDocsInfo = getDocsInfo(commands_key);
      for (var _key in cli_aliases) commands[_key] = commands[cli_aliases[_key]], commands[_key].getDocsInfo = getDocsInfo(_key);
      var cli_commands = commands;
      function forwardSignalAndExit(signal) {
        !function(signal) {
          for (var key of Object.keys(spawnedProcesses)) spawnedProcesses[key].kill(signal);
        }(signal), process.exit(1);
      }
      function handleSignals() {
        process.on("SIGTERM", (() => {
          forwardSignalAndExit("SIGTERM");
        }));
      }
      var cli_http = __webpack_require__(13685), net = __webpack_require__(41808), cli_path = __webpack_require__(71017), cli_commander = __webpack_require__(56302), cli_fs = __webpack_require__(57147), cli_invariant = __webpack_require__(46128), lockfile = __webpack_require__(89367), loudRejection = __webpack_require__(76886), onDeath = __webpack_require__(30891), cli_semver = __webpack_require__(92878), fn = "function" == typeof process.stdout.prependListener ? "prependListener" : "on";
      function findProjectRoot(base) {
        var prev = null, dir = base;
        do {
          if (cli_fs.existsSync(cli_path.join(dir, "package.json"))) return dir;
          prev = dir, dir = cli_path.dirname(dir);
        } while (dir !== prev);
        return base;
      }
      function main() {
        return _main.apply(this, arguments);
      }
      function _main() {
        return _main = asyncToGenerator_asyncToGenerator((function*(_ref) {
          var startArgs = _ref.startArgs, args = _ref.args, endArgs = _ref.endArgs;
          if (loudRejection(), handleSignals(), cli_commander.version(package_namespaceObject.i8, "-v, --version"), 
          cli_commander.usage("[command] [flags]"), cli_commander.option("--no-default-rc", "prevent Yarn from automatically detecting yarnrc and npmrc files"), 
          cli_commander.option("--use-yarnrc <path>", "specifies a yarnrc file that Yarn should use (.yarnrc only, not .npmrc)", ((val, acc) => (acc.push(val), 
          acc)), []), cli_commander.option("--verbose", "output verbose messages on internal operations"), 
          cli_commander.option("--offline", "trigger an error if any required dependencies are not available in local cache"), 
          cli_commander.option("--prefer-offline", "use network only if dependencies are not available in local cache"), 
          cli_commander.option("--enable-pnp, --pnp", "enable the Plug'n'Play installation"), 
          cli_commander.option("--disable-pnp", "disable the Plug'n'Play installation"), cli_commander.option("--strict-semver"), 
          cli_commander.option("--json", "format Yarn log messages as lines of JSON (see jsonlines.org)"), 
          cli_commander.option("--ignore-scripts", "don't run lifecycle scripts"), cli_commander.option("--har", "save HAR output of network traffic"), 
          cli_commander.option("--ignore-platform", "ignore platform checks"), cli_commander.option("--ignore-engines", "ignore engines check"), 
          cli_commander.option("--ignore-optional", "ignore optional dependencies"), cli_commander.option("--force", "install and build packages even if they were built before, overwrite lockfile"), 
          cli_commander.option("--skip-integrity-check", "run install without checking if node_modules is installed"), 
          cli_commander.option("--check-files", "install will verify file tree of packages for consistency"), 
          cli_commander.option("--no-bin-links", "don't generate bin links when setting up packages"), 
          cli_commander.option("--flat", "only allow one version of a package"), cli_commander.option("--prod, --production [prod]", "", boolify), 
          cli_commander.option("--no-lockfile", "don't read or generate a lockfile"), cli_commander.option("--pure-lockfile", "don't generate a lockfile"), 
          cli_commander.option("--frozen-lockfile", "don't generate a lockfile and fail if an update is needed"), 
          cli_commander.option("--update-checksums", "update package checksums from current repository"), 
          cli_commander.option("--link-duplicates", "create hardlinks to the repeated modules in node_modules"), 
          cli_commander.option("--link-folder <path>", "specify a custom folder to store global links"), 
          cli_commander.option("--global-folder <path>", "specify a custom folder to store global packages"), 
          cli_commander.option("--modules-folder <path>", "rather than installing modules into the node_modules folder relative to the cwd, output them here"), 
          cli_commander.option("--preferred-cache-folder <path>", "specify a custom folder to store the yarn cache if possible"), 
          cli_commander.option("--cache-folder <path>", "specify a custom folder that must be used to store the yarn cache"), 
          cli_commander.option("--mutex <type>[:specifier]", "use a mutex to ensure only one yarn instance is executing"), 
          cli_commander.option("--emoji [bool]", "enable emoji in output", boolify, "darwin" === process.platform || "Hyper" === process.env.TERM_PROGRAM || "HyperTerm" === process.env.TERM_PROGRAM || "Terminus" === process.env.TERM_PROGRAM), 
          cli_commander.option("-s, --silent", "skip Yarn console logs, other types of logs (script output) will be printed"), 
          cli_commander.option("--cwd <cwd>", "working directory to use", process.cwd()), 
          cli_commander.option("--proxy <host>", ""), cli_commander.option("--https-proxy <host>", ""), 
          cli_commander.option("--registry <url>", "override configuration registry"), cli_commander.option("--no-progress", "disable progress bar"), 
          cli_commander.option("--network-concurrency <number>", "maximum number of concurrent network requests", parseInt), 
          cli_commander.option("--network-timeout <milliseconds>", "TCP timeout for network requests", parseInt), 
          cli_commander.option("--non-interactive", "do not show interactive prompts"), cli_commander.option("--scripts-prepend-node-path [bool]", "prepend the node executable dir to the PATH in scripts", boolify), 
          cli_commander.option("--no-node-version-check", "do not warn when using a potentially unsupported Node version"), 
          cli_commander.option("--focus", "Focus on a single workspace by installing remote copies of its sibling workspaces."), 
          cli_commander.option("--otp <otpcode>", "one-time password for two factor authentication"), 
          cli_commander.option("--package-date-limit <time>", "only install package version that have release date before this"), 
          "-v" === args[0]) return console.log(package_namespaceObject.i8.trim()), void (process.exitCode = 0);
          var preCommandArgs, firstNonFlagIndex = args.findIndex(((arg, idx, arr) => {
            var isOption = arg.startsWith("-"), prev = idx > 0 && arr[idx - 1], prevOption = prev && prev.startsWith("-") && cli_commander.optionFor(prev), boundToPrevOption = prevOption && (prevOption.optional || prevOption.required);
            return !isOption && !boundToPrevOption;
          })), commandName = "";
          firstNonFlagIndex > -1 ? (preCommandArgs = args.slice(0, firstNonFlagIndex), commandName = args[firstNonFlagIndex], 
          args = args.slice(firstNonFlagIndex + 1)) : (preCommandArgs = args, args = []);
          var isKnownCommand = Object.prototype.hasOwnProperty.call(cli_commands, commandName), isHelp = arg => "--help" === arg || "-h" === arg, helpInPre = preCommandArgs.findIndex(isHelp), helpInArgs = args.findIndex(isHelp), setHelpMode = () => {
            isKnownCommand && args.unshift(commandName), commandName = "help", isKnownCommand = !0;
          };
          helpInPre > -1 ? (preCommandArgs.splice(helpInPre), setHelpMode()) : isKnownCommand && 0 === helpInArgs && (args.splice(helpInArgs), 
          setHelpMode()), commandName || (commandName = "install", isKnownCommand = !0), "set" === commandName && "version" === args[0] && (commandName = "policies", 
          args.splice(0, 1, "set-version"), isKnownCommand = !0), isKnownCommand || (args.unshift(commandName), 
          commandName = "run");
          var command = cli_commands[commandName], warnAboutRunDashDash = !1, PROXY_COMMANDS = {
            run: 1,
            create: 1,
            node: 0,
            workspaces: 1,
            workspace: 2
          };
          if (PROXY_COMMANDS.hasOwnProperty(commandName)) if (0 === endArgs.length) {
            var preservedArgs = PROXY_COMMANDS[commandName];
            "--into" === args[preservedArgs] && (preservedArgs += 2), endArgs = [ "--" ].concat(args.splice(preservedArgs));
          } else warnAboutRunDashDash = !0;
          args = [].concat(preCommandArgs, args), command.setFlags(cli_commander), cli_commander.parse([].concat(startArgs, [ "this-arg-will-get-stripped-later" ], getRcArgs(commandName, args), args)), 
          cli_commander.args = cli_commander.args.concat(endArgs.slice(1)), console.assert(cli_commander.args.length >= 1), 
          console.assert("this-arg-will-get-stripped-later" === cli_commander.args[0]), cli_commander.args.shift();
          var reporter = new (cli_commander.json ? json_reporter_JSONReporter : ConsoleReporter)({
            emoji: process.stdout.isTTY && cli_commander.emoji,
            verbose: cli_commander.verbose,
            noProgress: !cli_commander.progress,
            isSilent: boolifyWithDefault(process.env.YARN_SILENT, !1) || cli_commander.silent,
            nonInteractive: cli_commander.nonInteractive
          }), exit = exitCode => {
            process.exitCode = exitCode || 0, reporter.close();
          };
          reporter.initPeakMemoryCounter();
          var config = new Config(reporter), shouldWrapOutput = boolifyWithDefault(process.env.YARN_WRAP_OUTPUT, !0) && !cli_commander.json && command.hasWrapper(cli_commander, cli_commander.args) && !("init" === commandName && cli_commander[2]);
          if (shouldWrapOutput && reporter.header(commandName, {
            name: "yarn",
            version: package_namespaceObject.i8
          }), cli_commander.nodeVersionCheck && !cli_semver.satisfies(process.versions.node, "^4.8.0 || ^5.7.0 || ^6.2.2 || >=8.0.0") && reporter.warn(reporter.lang("unsupportedNodeVersion", process.versions.node, "^4.8.0 || ^5.7.0 || ^6.2.2 || >=8.0.0")), 
          command.noArguments && cli_commander.args.length) return reporter.error(reporter.lang("noArguments")), 
          reporter.info(command.getDocsInfo), void exit(1);
          cli_commander.yes && reporter.warn(reporter.lang("yesWarning")), !cli_commander.offline && isOffline() && reporter.warn(reporter.lang("networkWarning"));
          var run = () => (cli_invariant(command, "missing command"), warnAboutRunDashDash && reporter.warn(reporter.lang("dashDashDeprecation")), 
          command.run(config, reporter, cli_commander, cli_commander.args).then((exitCode => (shouldWrapOutput && reporter.footer(!1), 
          exitCode)))), runEventuallyWithFile = (mutexFilename, isFirstTime) => new Promise((resolve => {
            var lockFilename = mutexFilename || cli_path.join(config.cwd, ".yarn-single-instance");
            lockfile.lock(lockFilename, {
              realpath: !1
            }, ((err, release) => {
              err ? (isFirstTime && reporter.warn(reporter.lang("waitingInstance")), setTimeout((() => {
                resolve(runEventuallyWithFile(mutexFilename, !1));
              }), 200)) : (onDeath((() => {
                process.exitCode = 1;
              })), resolve(run().then((() => new Promise((resolve => release(resolve)))))));
            }));
          })), runEventuallyWithNetwork = mutexPort => new Promise(((resolve, reject) => {
            var connectionOptions = {
              port: +mutexPort || 31997,
              host: "localhost"
            };
            function startServer() {
              var clients = new Set, server = cli_http.createServer((function(request, response) {
                response.writeHead(200), response.end(JSON.stringify({
                  cwd: config.cwd,
                  pid: process.pid
                }));
              }));
              function killSockets() {
                try {
                  server.close();
                } catch (err) {}
                for (var socket of clients) try {
                  socket.destroy();
                } catch (err) {}
                setTimeout((() => {
                  if (console.error("Process stalled"), process._getActiveHandles) for (var handle of (console.error("Active handles:"), 
                  process._getActiveHandles())) console.error(`  - ${handle.constructor.name}`);
                  process.exit(1);
                }), 5e3).unref();
              }
              server.unref(), server.timeout = 0, server.on("error", (() => {
                cli_http.get(connectionOptions, (response => {
                  var buffers = [];
                  response.on("data", (buffer => {
                    buffers.push(buffer);
                  })), response.on("end", (() => {
                    try {
                      var _JSON$parse = JSON.parse(Buffer.concat(buffers).toString()), _cwd = _JSON$parse.cwd, pid = _JSON$parse.pid;
                      reporter.warn(reporter.lang("waitingNamedInstance", pid, _cwd));
                    } catch (error) {
                      return reporter.verbose(error), void reject(new Error(reporter.lang("mutexPortBusy", connectionOptions.port)));
                    }
                    var socket;
                    (socket = net.createConnection(connectionOptions)).on("error", (() => {})), socket.on("close", (() => {
                      startServer();
                    }));
                  })), response.on("error", (() => {
                    startServer();
                  }));
                })).on("error", (() => {
                  startServer();
                }));
              })), server.on("connection", (socket => {
                clients.add(socket), socket.on("close", (() => {
                  clients.delete(socket);
                }));
              })), server.listen(connectionOptions, (() => {
                onDeath(killSockets), run().then((res => {
                  killSockets(), resolve(res);
                }), (err => {
                  killSockets(), reject(err);
                }));
              }));
            }
            startServer();
          }));
          function onUnexpectedError(err) {
            function indent(str) {
              return "\n  " + str.trim().split("\n").join("\n  ");
            }
            var log = [];
            for (var registryName of (log.push(`Arguments: ${indent(process.argv.join(" "))}`), 
            log.push(`PATH: ${indent(process.env.PATH || "undefined")}`), log.push(`Yarn version: ${indent(package_namespaceObject.i8)}`), 
            log.push(`Node version: ${indent(process.versions.node)}`), log.push(`Platform: ${indent(process.platform + " " + process.arch)}`), 
            log.push(`Trace: ${indent(err.stack)}`), registryNames)) {
              var possibleLoc = cli_path.join(config.cwd, registries[registryName].filename), manifest = cli_fs.existsSync(possibleLoc) ? cli_fs.readFileSync(possibleLoc, "utf8") : "No manifest";
              log.push(`${registryName} manifest: ${indent(manifest)}`);
            }
            var lockLoc = cli_path.join(config.lockfileFolder || config.cwd, "yarn.lock"), lockfile = cli_fs.existsSync(lockLoc) ? cli_fs.readFileSync(lockLoc, "utf8") : "No lockfile";
            log.push(`Lockfile: ${indent(lockfile)}`);
            var errorReportLoc = function(log) {
              var errorReportLoc = config.enableMetaFolder ? cli_path.join(config.cwd, ".yarn-meta", "yarn-error.log") : cli_path.join(config.cwd, "yarn-error.log");
              try {
                cli_fs.writeFileSync(errorReportLoc, log.join("\n\n") + "\n");
              } catch (err) {
                return void reporter.error(reporter.lang("fileWriteError", errorReportLoc, err.message));
              }
              return errorReportLoc;
            }(log);
            reporter.error(reporter.lang("unexpectedError", err.message)), errorReportLoc && reporter.info(reporter.lang("bugReport", errorReportLoc));
          }
          var cwd = command.shouldRunInCurrentCwd ? cli_commander.cwd : findProjectRoot(cli_commander.cwd), resolvedFolderOptions = {};
          [ "linkFolder", "globalFolder", "preferredCacheFolder", "cacheFolder", "modulesFolder" ].forEach((folderOptionKey => {
            var folderOption = cli_commander[folderOptionKey], resolvedFolderOption = folderOption ? cli_path.resolve(cli_commander.cwd, folderOption) : folderOption;
            resolvedFolderOptions[folderOptionKey] = resolvedFolderOption;
          })), yield config.init(_extends({
            cwd: cwd,
            commandName: commandName
          }, resolvedFolderOptions, {
            enablePnp: cli_commander.pnp,
            disablePnp: cli_commander.disablePnp,
            enableDefaultRc: cli_commander.defaultRc,
            extraneousYarnrcFiles: cli_commander.useYarnrc,
            binLinks: cli_commander.binLinks,
            preferOffline: cli_commander.preferOffline,
            captureHar: cli_commander.har,
            ignorePlatform: cli_commander.ignorePlatform,
            ignoreEngines: cli_commander.ignoreEngines,
            ignoreScripts: cli_commander.ignoreScripts,
            offline: cli_commander.preferOffline || cli_commander.offline,
            looseSemver: !cli_commander.strictSemver,
            production: cli_commander.production,
            httpProxy: cli_commander.proxy,
            httpsProxy: cli_commander.httpsProxy,
            registry: cli_commander.registry,
            networkConcurrency: cli_commander.networkConcurrency,
            networkTimeout: cli_commander.networkTimeout,
            nonInteractive: cli_commander.nonInteractive,
            updateChecksums: cli_commander.updateChecksums,
            focus: cli_commander.focus,
            otp: cli_commander.otp,
            packageDateLimit: cli_commander.packageDateLimit
          })).then((() => {
            if (command.requireLockfile && !cli_fs.existsSync(cli_path.join(config.lockfileFolder, "yarn.lock"))) throw new MessageError(reporter.lang("noRequiredLockfile"));
            config.registries.yarn.getOption("no-progress") && reporter.disableProgress(), reporter.verbose(`current time: ${(new Date).toISOString()}`);
            var mutex = cli_commander.mutex;
            if (mutex && "string" == typeof mutex) {
              var mutexType, mutexSpecifier, separatorLoc = mutex.indexOf(":");
              if (-1 === separatorLoc ? (mutexType = mutex, mutexSpecifier = void 0) : (mutexType = mutex.substring(0, separatorLoc), 
              mutexSpecifier = mutex.substring(separatorLoc + 1)), "file" === mutexType) return runEventuallyWithFile(mutexSpecifier, !0).then(exit);
              if ("network" === mutexType) return runEventuallyWithNetwork(mutexSpecifier).then(exit);
              throw new MessageError(`Unknown single instance type ${mutexType}`);
            }
            return run().then(exit);
          })).catch((err => (reporter.verbose(err.stack), err instanceof ProcessTermError && reporter.isSilent ? exit(err.EXIT_CODE || 1) : (err instanceof MessageError ? reporter.error(err.message) : onUnexpectedError(err), 
          command.getDocsInfo && reporter.info(command.getDocsInfo), exit(err instanceof ProcessTermError && err.EXIT_CODE || 1)))));
        })), _main.apply(this, arguments);
      }
      function start() {
        return _start.apply(this, arguments);
      }
      function _start() {
        return (_start = asyncToGenerator_asyncToGenerator((function*() {
          var rc = getRcConfigForCwd(process.cwd(), process.argv.slice(2)), yarnPath = rc["yarn-path"] || rc.yarnPath;
          if (yarnPath && !boolifyWithDefault(process.env.YARN_IGNORE_PATH, !1)) {
            var argv = process.argv.slice(2), opts = {
              stdio: "inherit",
              env: Object.assign({}, process.env, {
                YARN_IGNORE_PATH: 1
              })
            }, exitCode = 0;
            process.on("SIGINT", (() => {})), handleSignals();
            try {
              exitCode = /\.[cm]?js$/.test(yarnPath) ? yield spawnp(process.execPath, [ yarnPath ].concat(argv), opts) : yield spawnp(yarnPath, argv, opts);
            } catch (firstError) {
              try {
                exitCode = yield forkp(yarnPath, argv, opts);
              } catch (error) {
                throw firstError;
              }
            }
            process.exitCode = exitCode;
          } else {
            var doubleDashIndex = process.argv.findIndex((element => "--" === element)), startArgs = process.argv.slice(0, 2), args = process.argv.slice(2, -1 === doubleDashIndex ? process.argv.length : doubleDashIndex), endArgs = -1 === doubleDashIndex ? [] : process.argv.slice(doubleDashIndex);
            yield main({
              startArgs: startArgs,
              args: args,
              endArgs: endArgs
            });
          }
        }))).apply(this, arguments);
      }
      process.stdout[fn]("error", (err => {
        if ("EPIPE" !== err.code && "ERR_STREAM_DESTROYED" !== err.code) throw err;
      }));
      var autoRun = !0;
      autoRun && start().catch((error => {
        console.error(error.stack || error.message || error), process.exitCode = 1;
      }));
      var cli = start;
    },
    39491: function(module) {
      module.exports = require("assert");
    },
    14300: function(module) {
      module.exports = require("buffer");
    },
    32081: function(module) {
      module.exports = require("child_process");
    },
    22057: function(module) {
      module.exports = require("constants");
    },
    6113: function(module) {
      module.exports = require("crypto");
    },
    9523: function(module) {
      module.exports = require("dns");
    },
    13639: function(module) {
      module.exports = require("domain");
    },
    82361: function(module) {
      module.exports = require("events");
    },
    57147: function(module) {
      module.exports = require("fs");
    },
    13685: function(module) {
      module.exports = require("http");
    },
    95687: function(module) {
      module.exports = require("https");
    },
    41808: function(module) {
      module.exports = require("net");
    },
    22037: function(module) {
      module.exports = require("os");
    },
    71017: function(module) {
      module.exports = require("path");
    },
    85477: function(module) {
      module.exports = require("punycode");
    },
    63477: function(module) {
      module.exports = require("querystring");
    },
    14521: function(module) {
      module.exports = require("readline");
    },
    12781: function(module) {
      module.exports = require("stream");
    },
    71576: function(module) {
      module.exports = require("string_decoder");
    },
    24404: function(module) {
      module.exports = require("tls");
    },
    76224: function(module) {
      module.exports = require("tty");
    },
    57310: function(module) {
      module.exports = require("url");
    },
    73837: function(module) {
      module.exports = require("util");
    },
    59796: function(module) {
      module.exports = require("zlib");
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.exports;
  }
  __webpack_require__.m = __webpack_modules__, __webpack_require__.x = function() {
    var __webpack_exports__ = __webpack_require__.O(void 0, [ 503 ], (function() {
      return __webpack_require__(67755);
    }));
    return __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
  }, deferred = [], __webpack_require__.O = function(result, chunkIds, fn, priority) {
    if (!chunkIds) {
      var notFulfilled = 1 / 0;
      for (i = 0; i < deferred.length; i++) {
        chunkIds = deferred[i][0], fn = deferred[i][1], priority = deferred[i][2];
        for (var fulfilled = !0, j = 0; j < chunkIds.length; j++) (!1 & priority || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((function(key) {
          return __webpack_require__.O[key](chunkIds[j]);
        })) ? chunkIds.splice(j--, 1) : (fulfilled = !1, priority < notFulfilled && (notFulfilled = priority));
        if (fulfilled) {
          deferred.splice(i--, 1);
          var r = fn();
          void 0 !== r && (result = r);
        }
      }
      return result;
    }
    priority = priority || 0;
    for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
    deferred[i] = [ chunkIds, fn, priority ];
  }, __webpack_require__.d = function(exports, definition) {
    for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: definition[key]
    });
  }, __webpack_require__.f = {}, __webpack_require__.e = function(chunkId) {
    return Promise.all(Object.keys(__webpack_require__.f).reduce((function(promises, key) {
      return __webpack_require__.f[key](chunkId, promises), promises;
    }), []));
  }, __webpack_require__.u = function(chunkId) {
    return "lib/vendors.js";
  }, __webpack_require__.o = function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, function() {
    var installedChunks = {
      459: 1
    };
    __webpack_require__.O.require = function(chunkId) {
      return installedChunks[chunkId];
    };
    __webpack_require__.f.require = function(chunkId, promises) {
      installedChunks[chunkId] || function(chunk) {
        var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
        for (var moduleId in moreModules) __webpack_require__.o(moreModules, moduleId) && (__webpack_require__.m[moduleId] = moreModules[moduleId]);
        runtime && runtime(__webpack_require__);
        for (var i = 0; i < chunkIds.length; i++) installedChunks[chunkIds[i]] = 1;
        __webpack_require__.O();
      }(require("../" + __webpack_require__.u(chunkId)));
    };
  }(), next = __webpack_require__.x, __webpack_require__.x = function() {
    return __webpack_require__.e(503), next();
  };
  var __webpack_exports__ = __webpack_require__.x();
  module.exports = __webpack_exports__;
}();