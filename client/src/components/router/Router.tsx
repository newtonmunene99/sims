import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface State {
  router: HTMLIonRouterElement;
}

export default createProviderConsumer<State>(
  {
    router: null
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
