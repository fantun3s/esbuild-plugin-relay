import type { PluginBuild, Loader } from "esbuild";
import { CompileOptions } from "./compile";
import {loadConfig} from 'relay-config'
import {sep} from 'path'

export interface PluginOptions {
  artifactDirectory?: string;
  buildCommand?: string;
  condition?: string;
  devMode?: boolean;
  filter?: RegExp;
  module?: "cjs" | "esm";
  suffix?: string;
  loader?: Loader;
}

export function setup(
  build: PluginBuild,
  opts: PluginOptions
): { options: Required<PluginOptions>; compileOptions: CompileOptions } {
  const currentCwd = process.cwd();

  let relayConfig: any;
  try {
    process.chdir(build.initialOptions.absWorkingDir);
    relayConfig = loadConfig() || {};
  } catch (_err) {
  } finally {
    process.chdir(currentCwd);
  }

  relayConfig = Object.assign(
    {
      language: "javascript",
      artifactDirectory: "src/__generated__",
    },
    relayConfig || {}
  );

  let filter: RegExp;
  if (relayConfig.extensions && relayConfig.extensions.length) {
    filter = new RegExp(`${sep}*.(${relayConfig.extensions.join("|")})`);
  } else if (relayConfig.language == "typescript") {
    filter = /\.tsx/;
  } else {
    filter = /\.jsx/;
  }

  const options = Object.assign({ filter }, opts) as Required<PluginOptions>;
  const compileOptions = Object.assign(
    {
      artifactDirectory: relayConfig.artifactDirectory,
      devMode: process.env.NODE_ENV !== "production",
      module: "esm",
    },
    opts
  );

  return { options, compileOptions };
}
