<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

  <wc-playground
    tag="go-button"
    props="[
      {name: 'variant', type: 'select', value: 'neutral', 'options': ['neutral','primary','secondary','critical','text']},
      {name: 'outline', type: 'boolean', value: false},
      {name: 'outlineFill', type: 'boolean', value: false},
      {name: 'flat', type: 'boolean', value: false},
      {name: 'disabled', type: 'boolean', value: false},
      {name: 'round', type: 'boolean', value: false},
      {name: 'compact', type: 'boolean', value: false},
    ]"
    slots='[
        {
          "name": "default",
          "docs": "Button text"
        },
        {
          "name": "prefix",
          "docs": "Use this slot to prepend content to the button."
        },
        {
          "name": "suffix",
          "docs": "Use this slot to append content to the button."
        }
    ]'
    code='<go-button type="button">
      Button
    </go-button>'
  ></wc-playground> 