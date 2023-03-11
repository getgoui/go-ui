<go-select name="select-1" label="Select" value="Banana" options="['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry']">
</go-select>

<go-select name="select-2" label="Set options via script" id="js-options-select">
</go-select>
<script>
  const select = document.querySelector('#js-options-select');
  select.options = ['', 'Apple', 'Banana', 'Blueberry Boysenberry Cherry Durian Eggplant',];
</script>

<go-select name="select-3" label="Suffix slot" options="['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry']">
  <div slot="suffix">.com.au</div>

  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-select>

<go-select name="select-4" label="Prefix slot" options="['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry']">
  <div slot="prefix">https://go-ui.com/</div>
  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-select>