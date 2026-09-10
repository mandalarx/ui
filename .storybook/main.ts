import type { StorybookConfig } from "@storybook/nextjs-vite"

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: { builder: { viteConfigPath: ".storybook/vite.config.ts" } },
  },
  staticDirs: ["../public"],
  docs: { defaultName: "Documentation" },
}

export default config
