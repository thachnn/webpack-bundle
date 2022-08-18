/// <reference types="node" />
/// <reference types="@nodelib/fs.walk" />

declare module 'fast-glob' {
  import * as taskManager from 'fast-glob/out/managers/tasks';
  import { Options as OptionsInternal } from 'fast-glob/out/settings';
  import { Entry as EntryInternal, FileSystemAdapter as FileSystemAdapterInternal, Pattern as PatternInternal } from 'fast-glob/out/types';
  type EntryObjectModePredicate = {
    [TKey in keyof Pick<OptionsInternal, 'objectMode'>]-?: true;
  };
  type EntryStatsPredicate = {
    [TKey in keyof Pick<OptionsInternal, 'stats'>]-?: true;
  };
  type EntryObjectPredicate = EntryObjectModePredicate | EntryStatsPredicate;
  function FastGlob(source: PatternInternal | PatternInternal[], options: OptionsInternal & EntryObjectPredicate): Promise<EntryInternal[]>;
  function FastGlob(source: PatternInternal | PatternInternal[], options?: OptionsInternal): Promise<string[]>;
  namespace FastGlob {
    type Options = OptionsInternal;
    type Entry = EntryInternal;
    type Task = taskManager.Task;
    type Pattern = PatternInternal;
    type FileSystemAdapter = FileSystemAdapterInternal;
    function sync(source: PatternInternal | PatternInternal[], options: OptionsInternal & EntryObjectPredicate): EntryInternal[];
    function sync(source: PatternInternal | PatternInternal[], options?: OptionsInternal): string[];
    function stream(source: PatternInternal | PatternInternal[], options?: OptionsInternal): NodeJS.ReadableStream;
    function generateTasks(source: PatternInternal | PatternInternal[], options?: OptionsInternal): Task[];
    function isDynamicPattern(source: PatternInternal, options?: OptionsInternal): boolean;
    function escapePath(source: PatternInternal): PatternInternal;
  }
  export = FastGlob;
}

declare module 'fast-glob/out/managers/tasks' {
  import Settings from 'fast-glob/out/settings';
  import { Pattern, PatternsGroup } from 'fast-glob/out/types';
  export type Task = {
    base: string;
    dynamic: boolean;
    patterns: Pattern[];
    positive: Pattern[];
    negative: Pattern[];
  };
  export function generate(patterns: Pattern[], settings: Settings): Task[];
  /**
   * Returns tasks grouped by basic pattern directories.
   *
   * Patterns that can be found inside (`./`) and outside (`../`) the current directory are handled separately.
   * This is necessary because directory traversal starts at the base directory and goes deeper.
   */
  export function convertPatternsToTasks(positive: Pattern[], negative: Pattern[], dynamic: boolean): Task[];
  export function getPositivePatterns(patterns: Pattern[]): Pattern[];
  export function getNegativePatternsAsPositive(patterns: Pattern[], ignore: Pattern[]): Pattern[];
  export function groupPatternsByBaseDirectory(patterns: Pattern[]): PatternsGroup;
  export function convertPatternGroupsToTasks(positive: PatternsGroup, negative: Pattern[], dynamic: boolean): Task[];
  export function convertPatternGroupToTask(base: string, positive: Pattern[], negative: Pattern[], dynamic: boolean): Task;
}

declare module 'fast-glob/out/settings' {
  import { FileSystemAdapter, Pattern } from 'fast-glob/out/types';
  export const DEFAULT_FILE_SYSTEM_ADAPTER: FileSystemAdapter;
  export type Options = {
    /**
     * Return the absolute path for entries.
     *
     * @default false
     */
    absolute?: boolean;
    /**
     * If set to `true`, then patterns without slashes will be matched against
     * the basename of the path if it contains slashes.
     *
     * @default false
     */
    baseNameMatch?: boolean;
    /**
     * Enables Bash-like brace expansion.
     *
     * @default true
     */
    braceExpansion?: boolean;
    /**
     * Enables a case-sensitive mode for matching files.
     *
     * @default true
     */
    caseSensitiveMatch?: boolean;
    /**
     * Specifies the maximum number of concurrent requests from a reader to read
     * directories.
     *
     * @default os.cpus().length
     */
    concurrency?: number;
    /**
     * The current working directory in which to search.
     *
     * @default process.cwd()
     */
    cwd?: string;
    /**
     * Specifies the maximum depth of a read directory relative to the start
     * directory.
     *
     * @default Infinity
     */
    deep?: number;
    /**
     * Allow patterns to match entries that begin with a period (`.`).
     *
     * @default false
     */
    dot?: boolean;
    /**
     * Enables Bash-like `extglob` functionality.
     *
     * @default true
     */
    extglob?: boolean;
    /**
     * Indicates whether to traverse descendants of symbolic link directories.
     *
     * @default true
     */
    followSymbolicLinks?: boolean;
    /**
     * Custom implementation of methods for working with the file system.
     *
     * @default fs.*
     */
    fs?: Partial<FileSystemAdapter>;
    /**
     * Enables recursively repeats a pattern containing `**`.
     * If `false`, `**` behaves exactly like `*`.
     *
     * @default true
     */
    globstar?: boolean;
    /**
     * An array of glob patterns to exclude matches.
     * This is an alternative way to use negative patterns.
     *
     * @default []
     */
    ignore?: Pattern[];
    /**
     * Mark the directory path with the final slash.
     *
     * @default false
     */
    markDirectories?: boolean;
    /**
     * Returns objects (instead of strings) describing entries.
     *
     * @default false
     */
    objectMode?: boolean;
    /**
     * Return only directories.
     *
     * @default false
     */
    onlyDirectories?: boolean;
    /**
     * Return only files.
     *
     * @default true
     */
    onlyFiles?: boolean;
    /**
     * Enables an object mode (`objectMode`) with an additional `stats` field.
     *
     * @default false
     */
    stats?: boolean;
    /**
     * By default this package suppress only `ENOENT` errors.
     * Set to `true` to suppress any error.
     *
     * @default false
     */
    suppressErrors?: boolean;
    /**
     * Throw an error when symbolic link is broken if `true` or safely
     * return `lstat` call if `false`.
     *
     * @default false
     */
    throwErrorOnBrokenSymbolicLink?: boolean;
    /**
     * Ensures that the returned entries are unique.
     *
     * @default true
     */
    unique?: boolean;
  };
  export default class Settings {
    readonly absolute: boolean;
    readonly baseNameMatch: boolean;
    readonly braceExpansion: boolean;
    readonly caseSensitiveMatch: boolean;
    readonly concurrency: number;
    readonly cwd: string;
    readonly deep: number;
    readonly dot: boolean;
    readonly extglob: boolean;
    readonly followSymbolicLinks: boolean;
    readonly fs: FileSystemAdapter;
    readonly globstar: boolean;
    readonly ignore: Pattern[];
    readonly markDirectories: boolean;
    readonly objectMode: boolean;
    readonly onlyDirectories: boolean;
    readonly onlyFiles: boolean;
    readonly stats: boolean;
    readonly suppressErrors: boolean;
    readonly throwErrorOnBrokenSymbolicLink: boolean;
    readonly unique: boolean;
    constructor(_options?: Options);
  }
}

declare module 'fast-glob/out/types' {
  import * as fsWalk from '@nodelib/fs.walk';
  export type ErrnoException = NodeJS.ErrnoException;
  export type Entry = fsWalk.Entry;
  export type EntryItem = string | Entry;
  export type Pattern = string;
  export type PatternRe = RegExp;
  export type PatternsGroup = Record<string, Pattern[]>;
  export type ReaderOptions = fsWalk.Options & {
    transform(entry: Entry): EntryItem;
    deepFilter: DeepFilterFunction;
    entryFilter: EntryFilterFunction;
    errorFilter: ErrorFilterFunction;
    fs: FileSystemAdapter;
    stats: boolean;
  };
  export type ErrorFilterFunction = fsWalk.ErrorFilterFunction;
  export type EntryFilterFunction = fsWalk.EntryFilterFunction;
  export type DeepFilterFunction = fsWalk.DeepFilterFunction;
  export type EntryTransformerFunction = (entry: Entry) => EntryItem;
  export type MicromatchOptions = {
    dot?: boolean;
    matchBase?: boolean;
    nobrace?: boolean;
    nocase?: boolean;
    noext?: boolean;
    noglobstar?: boolean;
    posix?: boolean;
    strictSlashes?: boolean;
  };
  export type FileSystemAdapter = fsWalk.FileSystemAdapter;
}
