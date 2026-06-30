import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts"],
  format: ["esm"],
  outExtension: () => ({ js: ".js" }),
  outDir: "dist",
  clean: true,
});
