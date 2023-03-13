<go-textarea id="txt-1" auto-grow label="Textarea" hint="This is a textarea field" maxlength="1000"></go-textarea>
<go-textarea label="Error state" hint="Please enter some text" error="This is an error" maxlength="1000"></go-textarea>
<go-textarea label="Disabled state" value="I'm not editable" disabled></go-textarea>
<go-textarea label="Readonly state" value="I'm not editable" readonly></go-textarea>
<go-textarea label="Custom icon">
  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-textarea>

<go-textarea label="Prefix slot">
  <div slot="prefix">https://go-ui.com/</div>
  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-textarea>
<go-textarea label="Suffix slot">
  <div slot="suffix">.com.au</div>
  <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
  <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
</go-textarea>
