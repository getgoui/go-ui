import { newSpecPage } from '@stencil/core/testing';
import { GoInput } from '../go-input';
describe('go-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoInput],
      html: `<go-input></go-input>`,
    });
    expect(page.root).toBeTruthy();
  });
  it('passes through attributes to native control', async () => {
    const attrs = {
      disabled: 'true',
      max: '123',
      maxlength: '10',
      min: '0',
      minlength: '1',
      name: 'test',
      pattern: 'test',
      placeholder: 'test',
      readonly: 'true',
      required: 'true',
      size: '20px',
      step: '1',
      value: '123',
    };
    const page = await newSpecPage({
      components: [GoInput],
      html: `<go-input type="text" ${Object.keys(attrs)
        .map((key) => {
          return `${key}="${attrs[key]}"`;
        })
        .join(' ')}></go-input>`,
    });
    const nativeControl = page.root.querySelector('input');
    const keys = Object.keys(attrs);
    const booleanAttrs = ['required', 'disabled', 'readonly'];
    keys.forEach((key) => {
      if (booleanAttrs.includes(key)) {
        expect(nativeControl).toHaveAttribute(key);
        return;
      }
      expect(nativeControl).toEqualAttribute(key, attrs[key]);
    });
  });
});
