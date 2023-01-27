<wc-playground
  tag="go-card"
  props="[
    {name: 'cardTitle', type: 'string'},
    {name: 'cardSubtitle', type: 'string'},
    {name: 'mediaPosition', attr: 'media-position', type: 'select', options: [ 'left', 'right','top', 'bottom']},
    {name: 'href', attr: 'href', type: 'string'},
    {name: 'flat', attr: 'flat', type: 'boolean'},
    {name: 'border', attr: 'border', type: 'boolean'}
  ]"
  slots='[
  {
    "name": "custom-title",
    "docs": "Slot for custom card title"
  },
  {
    "name": "default",
    "docs": "Card content"
  },
  {
    "name": "footer",
    "docs": "Slot for card footer markup"
  },
  {
    "name": "media",
    "docs": "Slot for media markup for media card"
  },
  {
    "name": "pre-title",
    "docs": "Slot for content above the card title"
  }
]'
  code="
<go-card card-title='Basic card' card-subtitle='Subtitle' media-position='left'>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque natus autem veritatis architecto facilis

  <img src='//images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=600&h=600&q=80' alt='Photo' slot='media' />
  <div slot='pre-title'>Active 2 hours ago</div>
  <div slot='footer'>
    <go-button variant='primary'>Button</go-button>
  </div>
</go-card>
">
</wc-playground>
