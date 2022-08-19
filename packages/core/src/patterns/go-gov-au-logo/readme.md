## API

<!-- Auto Generated Below -->


## Usage

### Go-gov-au-logo

<div>
  <div>
    <go-gov-au-logo href="/">
      <img
        slot="main-brand"
        src="https://www.dfat.gov.au/sites/default/files/australian-government-strip-black_1f3cd3f7-26d5-3bec-a76c-a0dc0c4c5764.png"
        alt="Australian government"
      />
      <img
        slot="main-brand-on-dark"
        src="https://www.dfat.gov.au/sites/default/files/australian-government-strip-white_2eb9cce7-dabd-3b4f-ba0f-d70d77e45427.png"
        alt="Australian government on dark background"
      />
    </go-gov-au-logo>
  </div>

  <go-gov-au-logo>
    <img
      slot="main-brand"
      src="https://www.dfat.gov.au/sites/default/files/australian-government-strip-black_1f3cd3f7-26d5-3bec-a76c-a0dc0c4c5764.png"
      alt="Australian government"
    />
    <img
      slot="main-brand-on-dark"
      src="https://www.dfat.gov.au/sites/default/files/australian-government-strip-white_2eb9cce7-dabd-3b4f-ba0f-d70d77e45427.png"
      alt="Australian government on dark background"
    />
    <div slot="co-brand">Go UI</div>
  </go-gov-au-logo>
</div>
<div>
  <go-gov-au-logo href="/">
    <img
      slot="main-brand"
      src="https://www.dfat.gov.au/sites/default/files/australian-government-strip-black_1f3cd3f7-26d5-3bec-a76c-a0dc0c4c5764.png"
      alt="Australian government"
    />
    <img
      slot="main-brand-on-dark"
      src="https://www.dfat.gov.au/sites/default/files/australian-government-strip-white_2eb9cce7-dabd-3b4f-ba0f-d70d77e45427.png"
      alt="Australian government on dark background"
    />
    <img slot="co-brand" src="https://via.placeholder.com/100" alt="Co brand" />
  </go-gov-au-logo>
</div>



## Properties

| Property | Attribute | Description                                                                                                                                                       | Type     | Default     |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `height` | `height`  | Set height of the logo group. Slots will be scaled to this height. Width is set to auto to avoid image distortion.                                                | `string` | `'3rem'`    |
| `href`   | `href`    | If href is provided, logo will be wrapped inside an anchor (`a`) tag. By default, all attributes except `class` and `style` are passed through to the anchor tag. | `string` | `undefined` |


## Slots

| Slot              | Description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `"co-brand"`      | Add co-branding agency logo / elements here.                                                           |
| `"crest"`         | This should be where you reference the Australian Government crest img resource (on light background). |
| `"crest-on-dark"` | This should be where you reference the Australian Government crest img resource (on dark background).  |


----------------------------------------------


