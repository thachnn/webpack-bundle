declare module 'webpack-merge' {
  import unique from 'webpack-merge/dist/unique';
  import { CustomizeRule, CustomizeRuleString, ICustomizeOptions, Key } from 'webpack-merge/dist/types';

  function merge<Configuration extends object>(
    firstConfiguration: Configuration | Configuration[],
    ...configurations: Configuration[]
  ): Configuration;
  function mergeWithCustomize<Configuration extends object>(
    options: ICustomizeOptions
  ): (firstConfiguration: Configuration | Configuration[], ...configurations: Configuration[]) => Configuration;
  function customizeArray(rules: { [s: string]: CustomizeRule | CustomizeRuleString }): (a: any, b: any, key: Key) => any;
  type Rules = {
    [s: string]: CustomizeRule | CustomizeRuleString | Rules;
  };
  function mergeWithRules(rules: Rules): (firstConfiguration: object | object[], ...configurations: object[]) => object;
  function customizeObject(rules: { [s: string]: CustomizeRule | CustomizeRuleString }): (a: any, b: any, key: Key) => any;
  export { customizeArray, customizeObject, CustomizeRule, merge, merge as default, mergeWithCustomize, mergeWithRules, unique };
}

declare module 'webpack-merge/dist/unique' {
  function mergeUnique(key: string, uniques: string[], getter: (a: object) => string): (a: [], b: [], k: string) => false | any[];
  export default mergeUnique;
}

declare module 'webpack-merge/dist/types' {
  export type Key = string;
  export type Customize = (a: any, b: any, key: Key) => any;
  export interface ICustomizeOptions {
    customizeArray?: Customize;
    customizeObject?: Customize;
  }
  export enum CustomizeRule {
    Match = 'match',
    Merge = 'merge',
    Append = 'append',
    Prepend = 'prepend',
    Replace = 'replace',
  }
  export type CustomizeRuleString = 'match' | 'merge' | 'append' | 'prepend' | 'replace';
}
