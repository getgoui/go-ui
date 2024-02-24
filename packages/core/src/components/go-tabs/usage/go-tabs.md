<div class="container">
  <go-tabs id="tabs">
    <go-tab label="First tab">Loading...</go-tab>
    <go-tab label="Second tab">Loading...</go-tab>
    <go-tab label="Third tab">Loading...</go-tab>
  </go-tabs>
</div>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelector('#tabs');
    tabs.addEventListener('tabactivated', function (e) {
      const { index, tabEl, panelEl } = e.detail;
      console.log(`Tab ${index + 1} activated.`);
      panelEl.innerHTML = `Loading...`;
      setTimeout(() => {
        panelEl.innerHTML = 'Dynamic tab ' + (index + 1) + ' content ';
      }, 1500);
    });
  });
</script>
