# esbuild-plugin-relay

An [esbuild](https://esbuild.github.io/) plugin to transform tagged GraphQL template literals for [Relay](https://relay.dev/). Heavily inspired by [babel-plugin-relay](https://www.npmjs.com/package/babel-plugin-relay).

## Features

- Replaces `graphql` tagged template literals with imports to the artifacts generated by `relay-compiler`
- Supports CommonJS and ESM module formats
- Supports TypeScript projects
- Optionally warns you about outdated operations and fragments

## Installation

```sh
# Using NPM
npm install -D esbuild graphql esbuild-plugin-relay

# Using yarn
yarn add -D esbuild graphql esbuild-plugin-relay
```

## Usage

```js
// esbuild.config.js
import esbuild from "esbuild";
import relay from "esbuild-plugin-relay";

esbuild.build({
  // ...other options,
  plugins: [
    relay()
  ]
})
```

## Acknowledgements

This plugin is based on the official [babel-plugin-relay](https://www.npmjs.com/package/babel-plugin-relay).

[The Gist by Samuel Cormier-Iijima](https://gist.github.com/sciyoshi/34e5865f2523848f0d60b4cdd49382ee) was a great starting point.
