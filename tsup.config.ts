import { defineConfig } from "tsup";
import fs from "node:fs";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    banner: {
      js: '"use client";',
    },
    external: ["react", "react-dom"],
    treeshake: true,
    minify: false,
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".js" : ".cjs",
      };
    },
    onSuccess: async () => {
      fs.copyFileSync("src/styles/base.css", "dist/styles.css");
    },
  },
  {
    entry: {
      schemas: "src/schemas/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: false,
    external: ["zod", "zod-to-json-schema"],
    treeshake: true,
    minify: false,
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".js" : ".cjs",
      };
    },
  },
]);
