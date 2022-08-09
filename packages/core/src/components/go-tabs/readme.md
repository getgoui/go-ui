## go-tabs API

<!-- Auto Generated Below -->


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


