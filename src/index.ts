import type { Loader, Plugin } from "esbuild";
import * as fs from "fs";
import { compile } from "./compile";
import { PluginOptions, setup } from "./setup";

const extensionToLoader = {
  ts: 'ts',
  mts: 'ts',
  tsx: 'tsx',
  js: 'js',
  mjs: 'js',
  jsx: 'jsx',
}
export const relayPlugin = (opts?: PluginOptions): Plugin => ({
    name: "relay",
    setup(build) {
      const { options, compileOptions } = setup(build, opts);

      build.onLoad({ filter: options.filter}, async (args) => {
        let contents = await fs.promises.readFile(args.path, "utf8");
        const fileExtension = args.path.includes('.') && args.path.split('.').pop();
        if (contents.includes("graphql`")) {
          contents = compile(args.path, contents, compileOptions);
        }

        return {
          contents: contents,
          loader: options.loader || extensionToLoader[fileExtension] as Loader || 'jsx',
        };
      });
    },
})

export default relayPlugin
