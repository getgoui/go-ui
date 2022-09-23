<go-button id="test">Toggle Dropdown</go-button>
<go-dropdown id="dd" trigger-id="test">
  <ul>
    <li><a href="#1">Test 1</a></li>
    <li><a href="#2">Test 2</a></li>
    <li><a href="#3">Test 3</a></li>
  </ul>
</go-dropdown>
<a href="#">another link</a>

<script>
  const button = document.querySelector('#test');
  const dd = document.querySelector('#dd');
  button.addEventListener('click', () => {
    dd.isActive = !dd.isActive;
  });
</script>