import { PrerenderConfig } from '@stencil/core/internal';
// import goDoc from '@go-ui/core/dist/docs/go-ui.json';

// const goComponents = goDoc.components.map(component => component.tag);
// const excludeComponents = [];
export const config: PrerenderConfig = {
  hydrateOptions(url) {
    return {
      // excludeComponents: [...goComponents, ...excludeComponents],
    };
  },
};
