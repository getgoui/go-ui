<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<wc-playground
  tag="go-badge"
  props="[
  {name: 'count', type: 'number'},
  {name: 'min', type: 'number'},
  {name: 'max', type: 'number'},
  {name: 'dotOnly', type: 'boolean'},
  {name: 'label', type: 'string'},
  ]"
  slots='[
  {
    "name": "default",
    "docs": "Element to receive the badge"
  },
  ]'
  code='
  <go-badge label="You have 9 unread messages" count="9" min="1" max="1000">
    <go-button variant="primary" icon aria-label="Example Button">
      <go-icon decorative name="favorite"></go-icon>
    </go-button>
  </go-badge>'
>
</wc-playground>
