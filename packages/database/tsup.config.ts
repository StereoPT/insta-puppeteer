import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/server.ts"],
  format: ["esm"],
  outExtension: () => ({ js: ".js" }),
  outDir: "dist",
  clean: true,
  external: ["better-sqlite3"],
});
