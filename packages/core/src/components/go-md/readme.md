## go-md API

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                                                                                                                                                                                                            | Type                | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----------- |
| `content`   | `content`    | Markdown content to be rendered                                                                                                                                                                                                                                                                        | `string`            | `undefined` |
| `inline`    | `inline`     | Render inline markdown                                                                                                                                                                                                                                                                                 | `boolean`           | `false`     |
| `mdOptions` | `md-options` | [markdown-it](https://github.com/markdown-it/markdown-it) options **Note**: if `use-go-ui` is set to true, these options will be overwritten                                                                                                                                                           | `Options \| string` | `undefined` |
| `sanitise`  | `sanitise`   | If set to true, `go-md` will use [DOMPurify](https://nodei.co/npm/dompurify/) to sanitise the output HTML before inserting it into the DOM                                                                                                                                                             | `boolean`           | `false`     |
| `src`       | `src`        | url to load remote markdown content if `src` is set, content in the `content` prop will be overwritten                                                                                                                                                                                                 | `string`            | `undefined` |
| `useGoUi`   | `use-go-ui`  | Use go-ui markdown renderer: - Only `typographer` is enabled in markdown-it options  - linkify with [`go-link`](https://go-ui.com/docs/components/go-link) - [container](https://github.com/markdown-it/markdown-it-container) banners with [`go-banner`](https://go-ui.com/docs/components/go-banner) | `boolean`           | `false`     |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `init`     |             | `CustomEvent<any>` |
| `rendered` |             | `CustomEvent<any>` |


----------------------------------------------


