expect.extend({
  async toPassA11y(page) {
    const axeConfig = {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        'landmark-one-main': { enabled: false },
        'page-has-heading-one': { enabled: false },
        'region': { enabled: false },
      },
      tags: ['wcag2aa', 'wcag21aa', 'best-practice'],
    };
    await page.addScriptTag({
      path: require.resolve('axe-core'),
    });
    const results = await page.evaluate((axeConfig) => {
      return window.axe.run(axeConfig);
    }, axeConfig);
    let message = '';
    let resultDisplay = '';
    if (results.violations.length > 0) {
      resultDisplay = results.violations
        .map(
          (violation) => `
* ${violation.help}
* (id: ${violation.id})
*
* Impact: ${violation.impact}
*
* Description:
*
*   ${violation.description}
*
* Elements:
*
*   ${violation.nodes.map((node) => node.html).join('\n*   ')}
*
* ${violation.helpUrl}
*
      `,
        )
        .join('\n');
      message = `
****************************************************
* A11y test failed, see below for more information *
****************************************************
*
* ${resultDisplay}
*
****************************************************
`;
    }

    return {
      message: () => message,
      pass: results.violations.length === 0,
    };
  },
});

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
