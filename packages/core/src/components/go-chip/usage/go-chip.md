<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<div class="container">
  <go-chip>hello world</go-chip>
  <go-chip>
    <go-icon name="info_outline" slot="prefix"></go-icon>
    hello world
  </go-chip>

  <go-chip>
    <go-icon name="delete_outline" slot="suffix"></go-icon>
    hello world
  </go-chip>
  <hr />
  <go-chip>Neutral (default)</go-chip>
  <go-chip variant="primary">Primary</go-chip>
  <go-chip variant="secondary">Secondary</go-chip>
  <go-chip variant="success">Success</go-chip>
  <go-chip variant="critical">Critical</go-chip>

  <hr />
  <go-chip outline="true" variant="primary">Outline</go-chip>
  <go-chip outline="true" variant="secondary">Outline</go-chip>
  <go-chip outline="true" variant="success">Outline</go-chip>
  <go-chip outline="true" variant="critical">Outline</go-chip>
</div>
