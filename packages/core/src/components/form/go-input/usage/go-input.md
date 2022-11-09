<go-input id="test" type="text" label="Input field" hint="Please enter some text"></go-input>
<go-input type="text" label="Error state" hint="Please enter some text" error="This is an error"></go-input>
<go-input type="text" label="Disabled state" value="I'm not editable" disabled></go-input>
<go-input type="text" label="Readonly state" value="I'm not editable" readonly></go-input>
<go-input type="text" label="Custom icon">
  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-input>
<go-input type="text" label="Prefix slot" hint="icon-before won't work because prefix is present">
  <div slot="prefix">https://go-ui.com/</div>

  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-input>
<go-input type="text" label="Suffix slot" hint="icon-after won't work because suffix is present">
  <div slot="suffix">.com.au</div>

  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-input>