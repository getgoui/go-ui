<wc-playground
tag="go-card"
props="[
{name: 'heading', type: 'string'},
{name: 'subHeading', type: 'string'},
{name: 'mediaPosition', attr: 'media-position', type: 'select', options: [ 'left', 'right','top', 'bottom']},
{name: 'href', attr: 'href', type: 'string'},
{name: 'flat', attr: 'flat', type: 'boolean'},
{name: 'border', attr: 'border', type: 'boolean'}
]"
slots='[
{
"name": "heading",
"docs": "Slot for custom card heading"
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
"name": "pre-heading",
"docs": "Slot for content above the card heading"
}
]'
code="
<go-card heading='Basic card' sub-heading='Subheading' media-position='left'>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque natus autem veritatis architecto facilis

  <img src='//images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=600&h=600&q=80' alt='Photo' slot='media' />
  <div slot='pre-heading'>Active 2 hours ago</div>
  <div slot='footer'>
    <go-button variant='primary'>Button</go-button>
  </div>
</go-card>
">
</wc-playground>
