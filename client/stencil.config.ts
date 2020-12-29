import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: "async",
  outputTargets: [
    {
      type: "www",
      dir: "www",
      copy: [{ src: "robots.txt" }],
      serviceWorker: null,
      prerenderConfig: "./prerender.config.ts",
    },
  ],
  plugins: [sass()],
  globalScript: "src/global/app.ts",
  globalStyle: "src/global/app.scss",
};
