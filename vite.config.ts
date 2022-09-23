import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    watch: false,
    setupFiles: "./setupTests.ts",
    coverage: {
      enabled: true,
      lines: 75,
      functions: 75,
      branches: 75,
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage/jest",
    },
  },
});
