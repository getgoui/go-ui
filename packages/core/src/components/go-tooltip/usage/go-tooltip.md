<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<div class="container">
  <div>Scrollable area</div>
  <div style="overflow: hidden">
    <div style="height: 16rem; overflow: auto; padding-top: 4rem; border: 2px dashed currentColor; text-align: center">
      <section>
        <h2>Basic tooltip</h2>
        <go-button variant="primary" id="tooltip-trigger" type="button">Hover me</go-button>
      </section>
      <section>
        <h2>Arrow tooltip</h2>
        <go-button variant="primary" id="arrow-trigger" type="button" icon="true" round="true" aria-label="Help button">
          <go-icon name="live_help"></go-icon>
        </go-button>
      </section>
      <section>
        <h2>Inline tooltip</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <a href="#" id="inline-trigger">Eius aliquam cumqu minus iste tempora quo fuga laborume</a>
          placeat consectetur enim consequuntur veniam. Dicta cumque minima ipsam, quae temporibus quidem esse. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Recusandae ipsa nobis nemo maxime deleniti soluta et odit, maiores accusamus fugiat totam consequatur illum impedit architecto ea,
          iste nostrum, quaerat cumque?
        </p>
      </section>
      <section>
        <h2>Placement</h2>
        <go-button variant="primary" id="placement-trigger" type="button">Hover me</go-button>
      </section>
    </div>
  </div>
  <go-tooltip trigger-id="tooltip-trigger">Lorem ipsum dolor sit amet consectetur adipisicing </go-tooltip>
  <go-tooltip inline="true" trigger-id="inline-trigger">Hello world</go-tooltip>
  <go-tooltip inline="true" arrow="true" trigger-id="arrow-trigger">Hello world</go-tooltip>
  <go-tooltip arrow="true" trigger-id="placement-trigger">Top (default)</go-tooltip>
  <go-tooltip placement="bottom" arrow="true" trigger-id="placement-trigger">Bottom</go-tooltip>
  <go-tooltip placement="left" arrow="true" trigger-id="placement-trigger">Left</go-tooltip>
  <go-tooltip placement="right" arrow="true" trigger-id="placement-trigger">Right</go-tooltip>
</div>
