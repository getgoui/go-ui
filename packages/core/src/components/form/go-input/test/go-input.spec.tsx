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
      disabled: '',
      max: '123',
      maxlength: '10',
      min: '0',
      minlength: '1',
      name: 'test',
      pattern: 'test',
      placeholder: 'test',
      readonly: '',
      required: 'required',
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
    keys.forEach((key) => {
      if (key === 'required') {
        expect(nativeControl).toEqualAttribute(key, '');
        return;
      }
      expect(nativeControl).toEqualAttribute(key, attrs[key]);
    });
  });
});
