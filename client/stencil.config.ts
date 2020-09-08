import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: "www",
      serviceWorker: null
    }
  ],
  plugins: [sass()],
  globalScript: "src/global/app.ts",
  globalStyle: "src/global/app.scss"
};
