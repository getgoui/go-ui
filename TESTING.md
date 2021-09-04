# Testing approach

We understand how time-consuming testing could be, but we also understand how it provides confidence that when other developers use our patterns/components, they get what they expected.

## Patterns vs Components

Components are the building blocks of this design system, the lego pieces if you will, whereas the Patterns are combinations of one or more components. Sometimes a component can be developed for a single pattern, other times a component can be used across many patterns.

## Component testing

Components are the smallest pieces we test, each component folder has its own `test` folder to hold the unit tests to ensure the component API does not have unintended breaking changes.

Run `npm run test.spec` to perform unit testing on all components.

## Pattern testing

Patterns are what design and development teams are going to "grab and use". Similar to components, each pattern inside the `patterns` folder contains a `test` folder to hold end-to-end tests that utilise [Jest](https://jestjs.io/) and [Puppeteer](https://github.com/puppeteer/puppeteer#readme).

### Automated a11y testing

Accessibility (A11y) is important to us, we ensure our patterns follow the a11y best practices and have them automatically tested against WCAG 2.0 (AA) and WCAG 2.1 (AA) tests. This does not guarantee the code is bulletproof though, so if you encounter any issues or have suggestion on how to improve a11y, please [submit an issue](https://github.com/gov-components/gov-components/issues/new?assignees=&labels=a11y%2C+bug&template=a11y-issue.md&title=%5BA11y+BUG%5D).

You can do something like the following to check a11y.

```ts
describe('confirm-button', () => {
  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html }); // html contains the demo code you wish to test.
    await expect(page).toPassA11y();
  }); 
```

Run `npm run test.e2e` to perform end-to-end testing with a11y checks.