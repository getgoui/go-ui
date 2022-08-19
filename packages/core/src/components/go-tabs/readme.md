## go-tabs API

<!-- Auto Generated Below -->


## Usage

### Go-tabs

<div class="container">
  <go-tabs>
    <go-tab label="First tab">
      <p>Tab 1 content</p>
    </go-tab>
    <go-tab label="Second tab">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, esse laboriosam tempore vel, deserunt nulla, corporis eaque dolore ad laudantium
        animi minima reprehenderit aliquam voluptate minus dolorem nobis fugiat molestiae.
      </p>
    </go-tab>
    <go-tab label="Third tab">
      <p>Tab 3 content</p>
    </go-tab>
  </go-tabs>
</div>


### Go-tabs-manual

<div class="container">
  <go-tabs manual="true" id="tabs">
    <go-tab label="First tab">Loading...</go-tab>
    <go-tab label="Second tab">Loading...</go-tab>
    <go-tab label="Third tab">Loading...</go-tab>
  </go-tabs>
</div>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelector('#tabs');
    tabs.addEventListener('tabChange', function (e) {
      const { index, tabEl, panelEl } = e.detail;
      console.log(`Tab ${index + 1} activated.`);
      panelEl.innerHTML = `Loading...`;
      setTimeout(() => {
        panelEl.innerHTML = 'Dynamic tab ' + (index + 1) + ' content ';
      }, 1500);
    });
  });
</script>


### Go-tabs-vertical

<div class="container">
  <go-tabs vertical="true">
    <go-tab label="First tab">
      <p>Tab 1 content</p>
    </go-tab>
    <go-tab label="Second tab">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, esse laboriosam tempore vel, deserunt nulla, corporis eaque dolore ad laudantium
        animi minima reprehenderit aliquam voluptate minus dolorem nobis fugiat molestiae.
      </p>
    </go-tab>
    <go-tab label="Third tab">
      <p>Tab 3 content</p>
    </go-tab>
  </go-tabs>
</div>



## Properties

| Property        | Attribute         | Description                                                                                                                                                                              | Type      | Default     |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `manual`        | `manual`          | By default, tabs are automatically activated and their panel is displayed when they receive focus. If `manual` is true, users need to activate a tab by pressing the Enter or Space key. | `boolean` | `false`     |
| `tabGroupLabel` | `tab-group-label` | Provides a label that describes the purpose of the set of tabs.                                                                                                                          | `string`  | `undefined` |
| `vertical`      | `vertical`        | Set tabs orientation to vertical                                                                                                                                                         | `boolean` | `false`     |


## Events

| Event       | Description      | Type                        |
| ----------- | ---------------- | --------------------------- |
| `tabChange` | tab change event | `CustomEvent<ActivatedTab>` |


----------------------------------------------


