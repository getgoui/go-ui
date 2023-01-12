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
  const menu = document.querySelector('#dd');
  const result = document.querySelector('#result');
  menu.addEventListener('selected', (e) => {
    const text = e.detail.innerText;
    result.innerHTML = `selected: ${text}`
  })
</script>