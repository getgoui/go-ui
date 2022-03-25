import { Component, h } from '@stencil/core';

@Component({
  tag: 'go-tab',
  styleUrl: 'go-tab.scss',
})
export class GoTab {
  render() {
    return (
      <div role="tablist" aria-label="Entertainment">
        <button type="button" role="tab" aria-selected="true" aria-controls="nils-tab" id="nils">
          Nils Frahm
        </button>
        <button type="button" role="tab" aria-selected="false" aria-controls="agnes-tab" id="agnes" tabindex="-1">
          Agnes Obel
        </button>
        <button type="button" role="tab" aria-selected="false" aria-controls="complex-complex" id="complex" tabindex="-1" data-deletable="">
          Joke
        </button>
      </div>
    );
  }
}
