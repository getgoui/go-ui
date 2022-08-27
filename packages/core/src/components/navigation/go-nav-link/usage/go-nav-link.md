<link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
<wc-playground
  tag="go-nav-link"
  props="[
  {
    name: 'item',
    type: 'object',
    value: {
      label: 'Link',
      url: '#',
      icon: {
        iconSet: 'bx',
        name: 'star',
        size: '1.5em'
      },
      linkAttrs: {
        title: 'Link title text'
      },
    },
  },
  {name: 'showArrow', type: 'boolean', value: false},
]"
>
  <go-nav-link></go-nav-link>
</wc-playground>
