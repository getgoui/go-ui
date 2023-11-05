<go-datepicker id="test" type="text" label="Date picker" hint="Please enter a date"  value="2000-01-01"></go-datepicker>
<go-datepicker type="text" label="Error state" hint="Please enter a date" error="This is an error"></go-datepicker>
<go-datepicker type="text" label="Disabled state" value="2000-01-01" disabled></go-datepicker>
<go-datepicker id="readonly-test" type="text" label="Readonly state" value="2000-01-01" readonly></go-datepicker>
<go-datepicker type="text" label="Custom icon">
<go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
<go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-datepicker>

<go-datepicker type="text" label="Prefix slot">
  <div slot="prefix">https://go-ui.com/</div>

<go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
<go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-datepicker>
<go-datepicker type="text" label="Suffix slot">

  <div slot="suffix">.com.au</div>
  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-datepicker>
