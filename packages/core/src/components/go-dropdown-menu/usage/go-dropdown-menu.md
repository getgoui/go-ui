<div>
  <go-button id="test">Toggle Dropdown</go-button>
  <go-dropdown-menu id="dd" trigger-selector="#test">
    <go-dropdown-item>Item 1</go-dropdown-item>
    <go-dropdown-item>Item 2</go-dropdown-item>
    <go-dropdown-item>Item 3</go-dropdown-item>
  </go-dropdown-menu>
  <div id="result">
    Select a dropdown item
  </div>
</div>
<script>
  const menuItems = document.querySelectorAll('#dd go-dropdown-item');
  const result = document.querySelector('#result');
  menuItems.forEach((item, i) => {
    item.addEventListener('selected', (e) => {
      console.log('selected element', e.detail)
      result.innerHTML = `selected index: ${i}`
    })
  })
</script>
