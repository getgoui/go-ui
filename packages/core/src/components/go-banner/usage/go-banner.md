<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<wc-playground
    tag="go-banner"
    props="[
      {name: 'heading', type: 'string'},
      {name: 'dismissible', type: 'boolean'},
      {name: 'global', type: 'boolean'},
      {name: 'variant', type: 'select', options: ['info', 'critical', 'success']},
    ]"
    slots='[
    {
      "name": "default",
      "docs": "Banner content"
    },
    {
      "name": "icon",
      "docs": "Slot for banner icon"
    }
  ]'
  code="
  <go-banner variant='info' heading='Banner heading'>
    <go-icon slot='icon' name='lightbulb'></go-icon>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quis voluptatum commodi, earum laudantium dolorem deleniti animi, natus sed aperiam.
  </go-banner>
"
>
</wc-playground>
