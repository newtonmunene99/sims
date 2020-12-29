import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  hydrateOptions(url) {
    return {
      prettyHtml: true,
      language: 'en',
    };
  },
};
